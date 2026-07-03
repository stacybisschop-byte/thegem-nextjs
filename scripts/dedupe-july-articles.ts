/**
 * One-off: remove 3 duplicate article docs found for July 2026 posts.
 * Run: npx tsx scripts/dedupe-july-articles.ts
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function main() {
  // historic-jewellery-houses: keep the Stories-pillar doc (already live),
  // copy over the richer metadata from the Guides duplicate, then delete the duplicate.
  await client
    .patch('article-historic-jewellery-houses')
    .set({
      heroImageBrief:
        "A flat-lay of archival jewellery house catalogues or reference books — Cartier red, Bulgari gold — on a marble surface. Formal, editorial, no single piece dominant. License from Getty. 16:9. Alt text: 'Archival jewellery house catalogues from Cartier, Bulgari, and Tiffany arranged on a marble surface.'",
      featured: false,
    })
    .commit()
  await client.delete('5kWihuCnV1iKvV2XGff59O')
  console.log('✅  historic-jewellery-houses — kept Stories doc, deleted Guides duplicate')

  // chaumet-history: keep the richer Studio doc, delete the migration duplicate.
  await client.delete('article-chaumet-history')
  console.log('✅  chaumet-history — deleted migration duplicate')

  // fine-jewellery-festival-layering: keep the richer Studio doc, delete the migration duplicate.
  await client.delete('article-fine-jewellery-festival-layering')
  console.log('✅  fine-jewellery-festival-layering — deleted migration duplicate')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
