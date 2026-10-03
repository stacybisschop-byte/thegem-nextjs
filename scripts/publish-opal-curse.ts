/**
 * One-off: create The Opal Curse. publishedAt is 3 Oct 2026 (today), so the
 * article goes live immediately (published: true).
 * Featured at order -10: the homepage hero (lowest featuredOrder wins slot 1),
 * ahead of Best Pearl Necklaces (-9).
 * Hero: public/blog/opal-curse.webp is uploaded as heroImage if present,
 * otherwise the article is created without one.
 * Run: npx tsx scripts/publish-opal-curse.ts
 */

import { createClient } from '@sanity/client'
import matter from 'gray-matter'
import { existsSync, readFileSync } from 'fs'
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

const SLUG = 'opal-curse'
const DOC_ID = `article-${SLUG}`

const HERO = {
  path: join(__dirname, '../public/blog/opal-curse.webp'),
  alt: 'Two gold pendant necklaces resting on an open book: a large arrowhead-shaped opal and a gold disc set with a small opal.',
}

async function main() {
  const file = join(__dirname, '../content/84-opal-curse.md')
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

  let heroImage
  if (existsSync(HERO.path)) {
    console.log('Uploading hero image...')
    const heroAsset = await client.assets.upload('image', readFileSync(HERO.path), {
      filename: 'opal-curse.webp',
    })
    heroImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: heroAsset._id },
      alt: HERO.alt,
    }
  } else {
    console.log('No hero image found, creating without one.')
  }

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
    ...(heroImage ? { heroImage } : {}),
    body,
    bodyMigratedHash: createHash('sha256').update(body).digest('hex'),
    affiliateDisclosure: false,
    featured: true,
    featuredOrder: -10,
  }

  await client.createOrReplace(doc)
  console.log(`✅  ${DOC_ID} — created, published: ${published}, publishedAt: ${doc.publishedAt}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
