/**
 * One-off: create the Famous Sapphires story, scheduled for its 3 September 2026
 * launch date. Not published immediately — publishedAt is set in the future,
 * so the article stays hidden (all `published == true` queries exclude it)
 * until the daily /api/publish-due cron flips it live on/after that date.
 *
 * Uploads the five supplied photos to Sanity (hero + four inline body images),
 * and marks the piece featured/featuredOrder -4 so it becomes the top card in
 * the homepage Latest grid once it goes live (ahead of the current top pick,
 * featuredOrder -3).
 *
 * Run: npx tsx scripts/publish-famous-sapphires.ts
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

const SLUG = 'famous-sapphires'
const DOC_ID = `article-${SLUG}`
const LAUNCH_DATE = '2026-09-03'
const TOP_FEATURED_ORDER = -4 // lower than the current top pick (-3) so this leads the homepage

const IMAGE_DIR = "C:\\Users\\stacy\\Downloads\\The World's Most Famous Sapphires"

const HERO = {
  file: 'The Blue Belle of Asia.jpg',
  alt: 'A large cushion-cut blue sapphire set as the centrepiece of a diamond tassel necklace, photographed on black.',
}

const INLINE_IMAGES: Record<string, { file: string; alt: string }> = {
  'star-of-india': {
    file: 'star-of-india.webp',
    alt: 'The Star of India, a large blue star sapphire cabochon showing a six-rayed asterism, photographed on black.',
  },
  'logan-sapphire': {
    file: 'Logan_Sapphire.jpg',
    alt: 'The Logan Sapphire, a large cushion-cut blue sapphire set in a diamond halo brooch.',
  },
  'albert-brooch': {
    file: 'albertbrooch.jpg',
    alt: "Prince Albert's Sapphire Brooch, an oval blue sapphire surrounded by a ring of diamonds set in gold.",
  },
  'diana-ring': {
    file: 'princess-diana-ring.jpg',
    alt: 'Princess Diana wearing her sapphire and diamond engagement ring, resting her hand against her face.',
  },
}

async function uploadImage(filename: string) {
  const path = join(IMAGE_DIR, filename)
  const buffer = readFileSync(path)
  const asset = await client.assets.upload('image', buffer, { filename })
  return asset
}

async function main() {
  const file = join(__dirname, '../content/76-famous-sapphires.md')
  const raw = readFileSync(file, 'utf8')
  const { data: fm, content } = matter(raw)
  let body = content.trim()

  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "article" && slug.current == $slug][0]{ _id }`,
    { slug: SLUG }
  )
  if (existing && existing._id !== DOC_ID) {
    throw new Error(`Slug collision: ${existing._id} already owns ${SLUG}`)
  }

  console.log('Uploading hero image...')
  const heroAsset = await uploadImage(HERO.file)

  for (const [token, img] of Object.entries(INLINE_IMAGES)) {
    console.log(`Uploading ${img.file}...`)
    const asset = await uploadImage(img.file)
    const placeholder = `![${img.alt}](IMAGE:${token})`
    const replacement = `![${img.alt}](${asset.url})`
    if (!body.includes(placeholder)) {
      throw new Error(`Placeholder not found in body for token: ${token}`)
    }
    body = body.replace(placeholder, replacement)
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
    heroImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: heroAsset._id },
      alt: HERO.alt,
    },
    kickerExtra: 'Famous Stones',
    body,
    bodyMigratedHash: createHash('sha256').update(body).digest('hex'),
    affiliateDisclosure: false,
    featured: true,
    featuredOrder: TOP_FEATURED_ORDER,
  }

  await client.createOrReplace(doc)
  console.log(`\u2705  ${DOC_ID} — created, published: ${published}, publishedAt: ${doc.publishedAt}, featuredOrder: ${TOP_FEATURED_ORDER}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
