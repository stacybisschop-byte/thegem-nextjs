/**
 * One-off: create the Sapphire Buying Guide, scheduled for its 5 September 2026
 * launch date. Not published immediately — publishedAt is set in the future,
 * so the article stays hidden (all `published == true` queries exclude it)
 * until the daily /api/publish-due cron flips it live on/after that date.
 *
 * Uploads the four supplied photos to Sanity (kashmir-sapphire as hero, the
 * other three as inline origin-section images).
 *
 * Run: npx tsx scripts/publish-sapphire-buying-guide.ts
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

const SLUG = 'sapphire-buying-guide'
const DOC_ID = `article-${SLUG}`
const LAUNCH_DATE = '2026-09-05'

const IMAGE_DIR = 'C:\\Users\\stacy\\Downloads\\Sapphire buying guide'

const HERO = {
  file: 'kashmir-sapphire.jpg',
  alt: 'A cushion-cut blue sapphire photographed against a neutral background.',
}

const INLINE_IMAGES: Record<string, { file: string; alt: string }> = {
  'burma-sapphire': {
    file: 'burma-sapphire.jpg',
    alt: 'A deep, saturated royal-blue Burmese sapphire, photographed loose against a neutral background.',
  },
  'ceylon-sapphire': {
    file: 'ceylon-yellow-sapphie.webp',
    alt: 'A vivid yellow Ceylon sapphire, illustrating the wide colour range Sri Lankan mines produce beyond blue.',
  },
  'madagascar-sapphire': {
    file: 'Madagascar-teal-sapphire.webp',
    alt: 'A teal-toned Madagascar sapphire, showing the blue-green colour range associated with the deposit.',
  },
}

async function uploadImage(filename: string) {
  const path = join(IMAGE_DIR, filename)
  const buffer = readFileSync(path)
  const asset = await client.assets.upload('image', buffer, { filename })
  return asset
}

async function main() {
  const file = join(__dirname, '../content/77-sapphire-buying-guide.md')
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
    kickerExtra: 'Considered Buying',
    body,
    bodyMigratedHash: createHash('sha256').update(body).digest('hex'),
    affiliateDisclosure: false,
  }

  await client.createOrReplace(doc)
  console.log(`\u2705  ${DOC_ID} — created, published: ${published}, publishedAt: ${doc.publishedAt}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
