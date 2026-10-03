/**
 * One-off: create A First-Timer's Guide to Buying Tiffany & Co. publishedAt is 9 Oct 2026 (future), so the
 * article is created with published: false and the publish-due cron flips it live.
 * Featured at order -12: becomes the homepage hero once published (lowest featuredOrder wins slot 1),
 * ahead of the Opal Buying Guide (-11).
 * Hero: public/blog/buying-tiffany-guide.webp is uploaded as heroImage if present,
 * otherwise the article is created without one.
 * Run: npx tsx scripts/publish-buying-tiffany-guide.ts
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

const SLUG = 'buying-tiffany-guide'
const DOC_ID = `article-${SLUG}`

const HERO = {
  path: join(__dirname, '../public/blog/buying-tiffany-guide.webp'),
  alt: 'A six-prong diamond solitaire engagement ring resting on a Tiffany Blue box, the Tiffany name blurred in the background.',
}

async function main() {
  const file = join(__dirname, '../content/86-buying-tiffany-guide.md')
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
      filename: 'buying-tiffany-guide.webp',
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
    featuredOrder: -12,
  }

  await client.createOrReplace(doc)
  console.log(`✅  ${DOC_ID} — created, published: ${published}, publishedAt: ${doc.publishedAt}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
