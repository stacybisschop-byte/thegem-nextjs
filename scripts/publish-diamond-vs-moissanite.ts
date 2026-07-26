/**
 * One-off: create the diamond vs moissanite guide, scheduled for its
 * 18 August 2026 launch date. Not published immediately — publishedAt is set
 * in the future, so the article stays hidden (all `published == true`
 * queries exclude it) until the daily /api/publish-due cron flips it live
 * on/after that date.
 * Run: npx tsx scripts/publish-diamond-vs-moissanite.ts
 */

import { createClient } from '@sanity/client'
import matter from 'gray-matter'
import { readFileSync } from 'fs'
import { join } from 'path'
import { createHash } from 'crypto'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local', quiet: true })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const SLUG = 'diamond-vs-moissanite'
const DOC_ID = `article-${SLUG}`
const LAUNCH_DATE = '2026-08-18'

async function main() {
  const file = join(__dirname, '../content/69-diamond-vs-moissanite.md')
  const raw = readFileSync(file, 'utf8')
  const { data: fm, content } = matter(raw)
  const body = content.trim()

  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "article" && slug.current == $slug][0]{ _id }`,
    { slug: SLUG }
  )
  if (existing && existing._id !== DOC_ID) {
    throw new Error(`Slug collision: ${existing._id} already owns ${SLUG}`)
  }

  const publishedAt = new Date(`${LAUNCH_DATE}T00:00:00.000Z`)
  const published = publishedAt.getTime() <= Date.now()

  const doc = {
    _id: DOC_ID,
    _type: 'article',
    title: fm.title,
    slug: { _type: 'slug', current: SLUG },
    pillar: fm.pillar,
    author: fm.author ?? 'Florence',
    published,
    publishedAt: publishedAt.toISOString(),
    metaTitle: fm.meta_title,
    metaDescription: fm.meta_description,
    heroImageUrl: 'https://images.unsplash.com/photo-1561151743-ee18310c2230?w=2400&q=80&fit=crop&crop=entropy',
    heroImageAlt: 'A solitaire diamond ring worn on a hand.',
    body,
    bodyMigratedHash: createHash('sha256').update(body).digest('hex'),
    affiliateDisclosure: false,
  }

  await client.createOrReplace(doc)
  console.log(`✅  ${DOC_ID} — created, published: ${published}, publishedAt: ${doc.publishedAt}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
