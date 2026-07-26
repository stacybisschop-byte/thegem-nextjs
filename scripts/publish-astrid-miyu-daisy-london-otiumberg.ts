/**
 * One-off: create the Astrid & Miyu vs Daisy London vs Otiumberg comparison
 * guide, scheduled for its 4 August 2026 launch date. Not published
 * immediately — publishedAt is set in the future, so the article stays
 * hidden (all `published == true` queries exclude it) until the daily
 * /api/publish-due cron flips it live on/after that date.
 * Run: npx tsx scripts/publish-astrid-miyu-daisy-london-otiumberg.ts
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

const SLUG = 'astrid-miyu-daisy-london-otiumberg'
const DOC_ID = `article-${SLUG}`
const LAUNCH_DATE = '2026-08-04'

async function main() {
  const file = join(__dirname, '../content/63-astrid-miyu-daisy-london-otiumberg.md')
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
    heroImageUrl: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1600&q=85',
    heroImageAlt: 'Layered demi-fine jewellery pieces, representative of the Astrid & Miyu, Daisy London, and Otiumberg comparison.',
    body,
    bodyMigratedHash: createHash('sha256').update(body).digest('hex'),
    affiliateDisclosure: false,
  }

  await client.createOrReplace(doc)
  console.log(`✅  ${DOC_ID} — created, published: ${published}, publishedAt: ${doc.publishedAt}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
