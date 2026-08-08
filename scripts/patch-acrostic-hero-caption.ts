/**
 * One-off: add alt text and caption to the hero image uploaded in Studio
 * for the Acrostic Rings article. The image was added to the draft
 * (drafts.article-acrostic-rings) via Studio, so that's the document we patch.
 * Run: npx tsx scripts/patch-acrostic-hero-caption.ts
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local', quiet: true })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const ALT =
  'Two gold acrostic rings, each set with a row of different coloured gemstones — emerald, amethyst, ruby, sapphire, and opal — resting on the open page of a book.'

const CAPTION =
  "Two acrostic rings, same trick played two ways: a plain eternity band spelling its word out in a straight row of stones, and a fussier filigree setting doing it inside scrollwork around a central opal. Unreadable until you know to read the first letter of each stone, not the stone itself."

async function main() {
  const target = 'drafts.article-acrostic-rings'
  const doc = await client.fetch<{ _id: string; heroImage?: unknown } | null>(
    `*[_id == $id][0]{ _id, heroImage }`,
    { id: target }
  )
  if (!doc?.heroImage) {
    throw new Error(`No heroImage found on ${target} — has the image finished uploading?`)
  }

  await client
    .patch(target)
    .set({ 'heroImage.alt': ALT, 'heroImage.caption': CAPTION })
    .commit()

  console.log(`✅  Patched ${target} — heroImage.alt and heroImage.caption set.`)
}

main().catch((err) => { console.error(err); process.exit(1) })
