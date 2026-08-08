/**
 * One-off: add alt text and caption to the hero image uploaded in Studio
 * for the Buckle Rings article. The image was added to the draft
 * (drafts.article-buckle-rings) via Studio, so that's the document we patch.
 * Run: npx tsx scripts/patch-buckle-hero-caption.ts
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
  "The gold buckle ring Oscar Wilde gave William Ward in 1876, photographed resting on one of Wilde's handwritten letters to Ward."

const CAPTION =
  "The ring itself: the buckle ring Wilde gave William Ward in 1876, stolen from Magdalen College in 2002 and returned in 2019 after Arthur Brand traced it through the wreckage of the Hatton Garden raid. Image courtesy of Magdalen College, Oxford."

async function main() {
  const target = 'drafts.article-buckle-rings'
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
