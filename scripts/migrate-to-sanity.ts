/**
 * Migration script: reads all 26 .md article files and upserts them
 * into Sanity as article documents.
 *
 * Prerequisites:
 *   1. Create a Sanity project at sanity.io/manage
 *   2. Create an API token with Editor role
 *   3. Copy .env.local.example → .env.local and fill in credentials
 *   4. Run: npm run migrate
 *
 * This script is safe to re-run — it uses createOrReplace, so
 * existing documents are updated, not duplicated.
 */

import { createClient } from '@sanity/client'
import matter from 'gray-matter'
import { readFileSync, readdirSync } from 'fs'
import { join, basename } from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

// ── Sanity client (write access) ─────────────────────────────────────────────

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// ── Article source directory ──────────────────────────────────────────────────
// Adjust this path to wherever your .md files live.
const MD_DIR = join(__dirname, '../content')

// ── Homepage feature config ────────────────────────────────────────────────────
// Specifies which three articles go in the homepage Latest grid and what order.
// 1 = large card, 2 and 3 = medium cards.
const FEATURED: Record<string, number> = {
  'chopard-cannes':         1,
  'cartier-family-history': 2,
  'tiffany-and-co-history': 3,
}

// ── Kicker extras map ─────────────────────────────────────────────────────────
const KICKER_EXTRAS: Record<string, string> = {
  'princess-diana-jewellery':    'Royal Jewellery',
  'marilyn-monroe-jewellery':    'Hollywood Glamour',
  'koh-i-noor':                  'Imperial Jewels',
  'hope-diamond':                'Cursed Stones',
  'elizabeth-taylor-jewellery':  'Hollywood Glamour',
  'lab-grown-vs-natural-diamonds': 'Buying',
  'engagement-ring-stones':      'Considered Buying',
  'where-to-buy-vintage-jewellery': 'Considered Buying',
  'how-to-wear-pearls':          'Modern Classics',
  'best-signet-rings-men':       'Considered Buying',
  'black-princes-ruby':          'Crown Jewels',
  'moonstone':                   'Stones',
  'precious-vs-semi-precious':   'Gemstone Knowledge',
  'jewellery-that-holds-value':  'Considered Buying',
  'viking-burial-jewellery':     'Archaeology',
  'tolkiens-gemstones':          'The Literary Tradition',
  'renaissance-pigment-stones':  'Pigments and Mining',
  'pyrite-and-the-gold-rush':    'Mineralogy',
  'layering-necklaces':          'Style Rules',
  'modern-womens-jewellery-edit': 'The Edit',
  'cartier-family-history':      'House Histories',
  'tiffany-and-co-history':      'House Histories',
  'chopard-cannes':              'House Histories',
  'pink-jewellery':              'A Reclamation',
  'how-to-care-for-your-jewellery': 'Complete Guide',
  'how-to-sell-your-jewellery':  'Complete Guide',
  'diamond-market-2026':         'Market Analysis',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function slugFromFrontmatter(rawSlug: string): string {
  // frontmatter slug is like "stories/princess-diana-jewellery"
  // we want just the article part
  return rawSlug.includes('/') ? rawSlug.split('/').pop()! : rawSlug
}

function pillarFromFrontmatter(rawSlug: string, rawPillar?: string): string {
  if (rawPillar) return rawPillar
  if (rawSlug.startsWith('stories/')) return 'Stories'
  if (rawSlug.startsWith('guides/')) return 'Guides'
  if (rawSlug.startsWith('style/')) return 'Style'
  return 'Stories'
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function migrate() {
  // Read all .md files in the source directory
  let files: string[]
  try {
    files = readdirSync(MD_DIR)
      .filter((f) => f.endsWith('.md'))
      .sort()
  } catch {
    console.error(`❌  Could not read directory: ${MD_DIR}`)
    console.error('    Adjust MD_DIR in the script to point at your .md files.')
    process.exit(1)
  }

  console.log(`\n📂  Found ${files.length} markdown files in ${MD_DIR}\n`)

  let successCount = 0
  let skipCount = 0

  for (const file of files) {
    const raw = readFileSync(join(MD_DIR, file), 'utf8')
    const { data: fm, content } = matter(raw)

    if (!fm.slug) {
      console.warn(`  ⚠️  Skipping ${file} — no slug in frontmatter`)
      skipCount++
      continue
    }

    const slug = slugFromFrontmatter(fm.slug)
    const pillar = pillarFromFrontmatter(fm.slug, fm.pillar)
    const docId = `article-${slug}`

    const doc = {
      _id: docId,
      _type: 'article',
      title: fm.title ?? basename(file, '.md'),
      slug: { _type: 'slug', current: slug },
      pillar,
      author: fm.author ?? 'Florence',
      published: true,
      publishedAt: new Date().toISOString(),
      lastReviewedAt: fm.last_reviewed_at
        ? `${fm.last_reviewed_at}-01`
        : undefined,
      metaTitle: fm.meta_title ?? undefined,
      metaDescription: fm.meta_description ?? undefined,
      heroImageBrief: fm.hero_image_brief ?? undefined,
      kickerExtra: KICKER_EXTRAS[slug] ?? undefined,
      body: content.trim(),
      affiliateDisclosure: content.includes('affiliate') ? true : false,
      ...(FEATURED[slug] != null && {
        featured: true,
        featuredOrder: FEATURED[slug],
      }),
    }

    try {
      await client.createOrReplace(doc)
      const featuredTag = FEATURED[slug] != null ? ` ⭐ featured(${FEATURED[slug]})` : ''
      console.log(`  ✅  ${pillar} · ${slug}${featuredTag}`)
      successCount++
    } catch (err) {
      console.error(`  ❌  Failed: ${slug}`, err)
    }
  }

  console.log(`\n──────────────────────────────────────────`)
  console.log(`Migration complete: ${successCount} uploaded, ${skipCount} skipped`)
  console.log(`\nNext steps:`)
  console.log(`  1. Visit /studio to verify documents in Sanity`)
  console.log(`  2. Add hero images in the Studio (hero_image_brief has the photography brief)`)
  console.log(`  3. Adjust featured/featuredOrder for the homepage Latest grid`)
  console.log(`  4. Set published: true for all articles you want live`)
}

migrate().catch(console.error)
