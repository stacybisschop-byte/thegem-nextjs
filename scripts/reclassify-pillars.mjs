/**
 * One-off: reclassify specific articles out of the Style pillar into
 * Edit, Guides, or Stories, per the editorial category definitions.
 * Patches only the `pillar` field — no other fields are touched.
 *
 * Run: npx tsx scripts/reclassify-pillars.mjs
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const PATCHES = [
  // Style → Edit (shop edits, trend pieces)
  { id: 'article-ring-stacking-guide', target: 'Edit' },
  { id: 'article-layering-necklaces', target: 'Edit' },
  { id: 'article-modern-womens-jewellery-edit', target: 'Edit' },
  { id: 'article-pink-jewellery', target: 'Edit' },
  { id: 'article-mens-jewellery-guide', target: 'Edit' },

  // Style → Guides (practical, evergreen)
  { id: 'article-how-to-wear-a-brooch', target: 'Guides' },
  { id: 'article-how-to-wear-pearls', target: 'Guides' },
  { id: 'article-how-to-build-a-jewellery-collection', target: 'Guides' },

  // Style → Stories (cultural/historical essay)
  { id: 'article-floral-jewellery', target: 'Stories' },

  // Stories → Edit (shop edit, not a historical story)
  { id: 'article-kate-wimbledon-earrings', target: 'Edit' },
]

async function main() {
  let found = 0
  let skipped = 0
  let patched = 0
  let notFound = 0

  for (const { id, target } of PATCHES) {
    const doc = await client.fetch(`*[_id == $id][0]{ _id, title, pillar }`, { id })

    if (!doc) {
      console.log(`NOT FOUND — check ID: ${id}`)
      notFound++
      continue
    }

    found++
    console.log(`Found: ${doc._id} | ${doc.title} | current pillar: ${doc.pillar}`)

    if (doc.pillar === target) {
      console.log(`  SKIP — already correct`)
      skipped++
      continue
    }

    await client.patch(id).set({ pillar: target }).commit()
    console.log(`  PATCHED: ${doc._id} | ${doc.title} | ${doc.pillar} → ${target}`)
    patched++
  }

  console.log(`\n──────────────────────────────────────────`)
  console.log(`Total found: ${found}`)
  console.log(`Total skipped: ${skipped}`)
  console.log(`Total patched: ${patched}`)
  console.log(`Total not found: ${notFound}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
