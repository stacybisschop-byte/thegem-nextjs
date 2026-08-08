/**
 * One-off: create the Buckle Rings guide, scheduled for its 1 September 2026
 * launch date. Not published immediately — publishedAt is set in the future,
 * so the article stays hidden (all `published == true` queries exclude it)
 * until the daily /api/publish-due cron flips it live on/after that date.
 * Run: npx tsx scripts/publish-buckle-rings.ts
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

const SLUG = 'buckle-rings'
const DOC_ID = `article-${SLUG}`
const LAUNCH_DATE = '2026-09-01'

async function main() {
  const file = join(__dirname, '../content/75-buckle-rings.md')
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
    heroImageUrl: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600&q=85',
    heroImageAlt: 'A gold buckle ring sculpted to resemble a miniature belt and buckle, the sentimental Victorian motif symbolising fidelity and eternal love.',
    body,
    bodyMigratedHash: createHash('sha256').update(body).digest('hex'),
    affiliateDisclosure: false,
  }

  await client.createOrReplace(doc)
  console.log(`✅  ${DOC_ID} — created, published: ${published}, publishedAt: ${doc.publishedAt}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
