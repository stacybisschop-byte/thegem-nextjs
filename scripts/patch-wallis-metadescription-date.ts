/**
 * One-off: fix wrong month in the Wallis Simpson article's metaDescription.
 * It read "November 1987" but the sale was 2-3 April 1987 (confirmed by the
 * article body, FAQ, and sources footer). Only this field is affected.
 * Run: npx tsx scripts/patch-wallis-metadescription-date.ts
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

const OLD =
  "Wallis Simpson's jewellery sold for £31.4 million (about $50 million) at Sotheby's in November 1987. The full story of the collection and the woman who wore it."

const NEW =
  "Wallis Simpson's jewellery sold for £31.4 million (about $50 million) at Sotheby's in April 1987. The full story of the collection and the woman who wore it."

async function main() {
  const id = 'article-wallis-simpson-jewellery'
  const doc = await client.fetch<{ _id: string; metaDescription?: string } | null>(
    `*[_id == $id][0]{ _id, metaDescription }`,
    { id }
  )
  if (!doc) throw new Error(`Document ${id} not found`)
  if (doc.metaDescription !== OLD) {
    throw new Error(
      `metaDescription did not match expected old value.\nFound: ${doc.metaDescription}`
    )
  }

  await client.patch(id).set({ metaDescription: NEW }).commit()

  console.log(`✅  Patched ${id} — metaDescription updated to say "April 1987".`)
}

main().catch((err) => { console.error(err); process.exit(1) })
