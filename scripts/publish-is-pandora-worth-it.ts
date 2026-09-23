/**
 * One-off: create Is Pandora Worth It? publishedAt is 23 Sep 2026 (today),
 * so the article goes live immediately (published: true).
 * Featured at order -7: the homepage hero (lowest featuredOrder wins slot 1),
 * ahead of The Georgian Poison Ring (-6).
 * Run: npx tsx scripts/publish-is-pandora-worth-it.ts
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

const SLUG = 'is-pandora-worth-it'
const DOC_ID = `article-${SLUG}`

const HERO = {
  path: join(__dirname, '../public/blog/is-pandora-worth-it.webp'),
  alt: 'A sterling silver Pandora snake chain bracelet with charms, including a house charm and a Pandora-stamped clip, resting in a lilac evil-eye trinket dish.',
}

async function main() {
  const file = join(__dirname, '../content/81-is-pandora-worth-it.md')
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
    filename: 'is-pandora-worth-it.webp',
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
    featured: true,
    featuredOrder: -7,
  }

  await client.createOrReplace(doc)
  console.log(`✅  ${DOC_ID} — created, published: ${published}, publishedAt: ${doc.publishedAt}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
