/**
 * One-off: read the current `publishedAt` value for every article in Sanity,
 * and write the corresponding `publishDate: YYYY-MM-DD` line into the
 * frontmatter of each matching content/*.md file that doesn't already have one.
 *
 * Why: scripts/migrate-to-sanity.ts uses `resolveSchedule()` to compute
 * Sanity's `publishedAt` field. When no `publishDate` exists in the
 * frontmatter, it defaults to "now" — which clobbers the staggered values
 * that scripts/restagger-published-at.ts just wrote. Adding `publishDate` to
 * the frontmatter pins each article's `publishedAt` to a known date that
 * survives subsequent migrations.
 *
 * String-level edit (no YAML round-trip) preserves all other frontmatter
 * formatting exactly — line ordering, quoting style, indentation, and
 * unusual block-scalar fields (`hero_image_brief`, `status`, etc.) are
 * untouched.
 *
 * Run: npx tsx scripts/sync-publish-dates.ts
 */

import { createClient } from '@sanity/client'
import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const MD_DIR = join(__dirname, '../content')

interface SanityDoc {
  slug: { current: string }
  publishedAt?: string
}

/**
 * Extract the slug from a frontmatter `slug:` line.
 * The markdown files use `slug: pillar/article-name`; Sanity stores just
 * `article-name`. Strip a leading `pillar/` if present and strip quotes.
 */
function normaliseSlug(raw: string): string {
  const trimmed = raw.trim().replace(/^['"]|['"]$/g, '')
  return trimmed.includes('/') ? trimmed.split('/').pop()! : trimmed
}

interface FrontmatterScan {
  hasFrontmatter: boolean
  slug: string | null
  hasPublishDate: boolean
  publishedLineIdx: number | null
  frontmatterEndIdx: number | null
}

function scanFrontmatter(lines: string[]): FrontmatterScan {
  if (lines[0]?.trim() !== '---') {
    return {
      hasFrontmatter: false,
      slug: null,
      hasPublishDate: false,
      publishedLineIdx: null,
      frontmatterEndIdx: null,
    }
  }
  let slug: string | null = null
  let hasPublishDate = false
  let publishedLineIdx: number | null = null
  let frontmatterEndIdx: number | null = null

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (line.trim() === '---') {
      frontmatterEndIdx = i
      break
    }
    if (/^slug\s*:/.test(line)) {
      slug = normaliseSlug(line.replace(/^slug\s*:/, ''))
    } else if (/^publishDate\s*:/.test(line)) {
      hasPublishDate = true
    } else if (/^published\s*:/.test(line)) {
      publishedLineIdx = i
    }
  }

  return {
    hasFrontmatter: frontmatterEndIdx !== null,
    slug,
    hasPublishDate,
    publishedLineIdx,
    frontmatterEndIdx,
  }
}

async function main() {
  // Step 1: fetch slug → publishedAt from Sanity
  const docs = await client.fetch<SanityDoc[]>(
    `*[_type == "article" && !(_id in path("drafts.**"))] {
      slug, publishedAt
    }`,
  )

  const dateBySlug = new Map<string, string>()
  for (const d of docs) {
    if (d.slug?.current && d.publishedAt) {
      dateBySlug.set(d.slug.current, d.publishedAt.slice(0, 10))
    }
  }
  console.log(`Fetched ${dateBySlug.size} (slug, publishedAt) pairs from Sanity.\n`)

  // Step 2: walk content/*.md
  const files = readdirSync(MD_DIR).filter((f) => f.endsWith('.md')).sort()

  const updated: string[] = []
  const skippedHasDate: string[] = []
  const skippedNotArticle: string[] = []
  const skippedNoMatch: string[] = []
  const skippedNoPublishedLine: string[] = []

  for (const file of files) {
    const path = join(MD_DIR, file)
    const raw = readFileSync(path, 'utf8')

    // Detect line ending so we can preserve it on rewrite
    const eol = raw.includes('\r\n') ? '\r\n' : '\n'
    const lines = raw.split(/\r?\n/)

    const scan = scanFrontmatter(lines)

    if (!scan.hasFrontmatter || !scan.slug) {
      skippedNotArticle.push(file)
      continue
    }
    if (scan.hasPublishDate) {
      skippedHasDate.push(file)
      continue
    }

    const dateStr = dateBySlug.get(scan.slug)
    if (!dateStr) {
      skippedNoMatch.push(`${file} (slug=${scan.slug})`)
      continue
    }
    if (scan.publishedLineIdx === null) {
      skippedNoPublishedLine.push(`${file} (slug=${scan.slug})`)
      continue
    }

    // Insert `publishDate: YYYY-MM-DD` immediately after the `published:` line
    const newLines = [
      ...lines.slice(0, scan.publishedLineIdx + 1),
      `publishDate: ${dateStr}`,
      ...lines.slice(scan.publishedLineIdx + 1),
    ]
    writeFileSync(path, newLines.join(eol), 'utf8')
    updated.push(`${file.padEnd(45)} slug=${scan.slug.padEnd(40)} publishDate: ${dateStr}`)
  }

  console.log(`Updated ${updated.length} files:`)
  updated.forEach((s) => console.log(`  ${s}`))
  if (skippedHasDate.length) {
    console.log(`\nSkipped (already has publishDate): ${skippedHasDate.length}`)
    skippedHasDate.forEach((s) => console.log(`  ${s}`))
  }
  if (skippedNotArticle.length) {
    console.log(`\nSkipped (not an article — no frontmatter slug): ${skippedNotArticle.length}`)
    skippedNotArticle.forEach((s) => console.log(`  ${s}`))
  }
  if (skippedNoMatch.length) {
    console.log(`\nSkipped (no Sanity match for slug): ${skippedNoMatch.length}`)
    skippedNoMatch.forEach((s) => console.log(`  ${s}`))
  }
  if (skippedNoPublishedLine.length) {
    console.log(`\nSkipped (no \`published:\` line found): ${skippedNoPublishedLine.length}`)
    skippedNoPublishedLine.forEach((s) => console.log(`  ${s}`))
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
