/**
 * One-off: create and publish the De Beers Venetia mine pause article.
 * Run: npx tsx scripts/publish-de-beers-venetia.ts
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

const SLUG = 'de-beers-venetia-mine-pause'
const DOC_ID = `article-${SLUG}`

async function main() {
  const file = join(__dirname, '../content/60-de-beers-venetia-mine-pause.md')
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

  const doc = {
    _id: DOC_ID,
    _type: 'article',
    title: fm.title,
    slug: { _type: 'slug', current: SLUG },
    pillar: fm.pillar,
    author: fm.author ?? 'Florence',
    published: true,
    publishedAt: (fm.publishDate instanceof Date
      ? fm.publishDate
      : new Date(`${fm.publishDate}T00:00:00.000Z`)
    ).toISOString(),
    metaTitle: fm.meta_title,
    metaDescription: fm.meta_description,
    heroImageBrief: fm.hero_image_brief,
    heroImageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=85',
    heroImageAlt: 'Rough and polished diamonds, representing a diamond mining operation.',
    body,
    bodyMigratedHash: createHash('sha256').update(body).digest('hex'),
    affiliateDisclosure: false,
  }

  await client.createOrReplace(doc)
  console.log(`✅  ${DOC_ID} — created and published`)
}

main().catch((err) => { console.error(err); process.exit(1) })
