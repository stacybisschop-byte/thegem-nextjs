/**
 * One-off: create the Ruby Buying Guide, scheduled for 26 Sep 2026. publishedAt
 * is in the future, so it is created with published: false and the publish-due
 * cron flips it live. Featured at order -8 so it becomes the homepage hero once
 * published (the homepage only shows published == true).
 * Run: npx tsx scripts/publish-ruby-buying-guide.ts
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

const SLUG = 'ruby-buying-guide'
const DOC_ID = `article-${SLUG}`

const HERO = {
  path: 'C:/Users/stacy/Downloads/pexels-abdul-matloob-3129300-13307186.jpg',
  alt: 'Rough, uncut ruby crystals in shades from pink to deep red, glowing on a dark reflective surface.',
}

async function main() {
  const file = join(__dirname, '../content/82-ruby-buying-guide.md')
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
    filename: 'pexels-abdul-matloob-3129300-13307186.jpg',
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
    featuredOrder: -8,
  }

  await client.createOrReplace(doc)
  console.log(`✅  ${DOC_ID} — created, published: ${published}, publishedAt: ${doc.publishedAt}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
