/**
 * One-off: create The Autumn Jewellery Edit. publishedAt is 20 Sep 2026 (already
 * past), so the article goes live immediately (published: true).
 * Run: npx tsx scripts/publish-autumn-jewellery-edit.ts
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

const SLUG = 'autumn-jewellery-edit'
const DOC_ID = `article-${SLUG}`

const HERO = {
  path: 'C:/Users/stacy/Downloads/pexels-wendywei-3085575.jpg',
  alt: 'A gold oval signet-style ring engraved with a bee, resting among dried autumn flowers and leaves.',
}

async function main() {
  const file = join(__dirname, '../content/78-autumn-jewellery-edit.md')
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

  console.log('Uploading hero image...')
  const heroAsset = await client.assets.upload('image', readFileSync(HERO.path), {
    filename: 'pexels-wendywei-3085575.jpg',
  })

  const publishedAt = new Date(fm.published_at)
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
    heroImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: heroAsset._id },
      alt: HERO.alt,
    },
    body,
    bodyMigratedHash: createHash('sha256').update(body).digest('hex'),
    affiliateDisclosure: false,
  }

  await client.createOrReplace(doc)
  console.log(`✅  ${DOC_ID} — created, published: ${published}, publishedAt: ${doc.publishedAt}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
