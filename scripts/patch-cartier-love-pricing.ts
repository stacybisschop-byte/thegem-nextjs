/**
 * One-off: refresh UK retail prices and resale figures in the Cartier Love
 * bracelet guide (Oct 2026). Patches the live Sanity body in place, since it
 * was edited in Studio after the original migration. The local markdown body
 * was re-synced to the patched live body separately.
 * Run: npx tsx scripts/patch-cartier-love-pricing.ts
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

const DOC_ID = 'article-cartier-love-bracelet-guide'

const REPLACEMENTS: [string, string][] = [
  [
    'the retail price for a plain yellow gold Love bracelet in the UK currently sits above £6,500.',
    'the retail price for a plain yellow gold Love bracelet, classic model, is currently £7,050 in the UK.',
  ],
  [
    'for [60–75% of retail](/guides/jewellery-that-holds-value).',
    'for roughly [65–85% of current retail](/guides/jewellery-that-holds-value).',
  ],
  [
    'Their prices are typically 65–75% of new retail for pieces in good condition with papers.',
    'Their prices are typically 70–85% of current retail for pieces in good condition with papers.',
  ],
  [
    'A plain 18-carat yellow gold Cartier Love bracelet currently retails above £6,500 in the UK from Cartier directly. Pre-owned examples in good condition with original papers typically sell for 60–75% of retail, approximately £4,000–£5,000.',
    'A plain 18-carat yellow gold Cartier Love bracelet currently retails for £7,050 in the UK from Cartier directly in the classic model, with the medium model at £5,850, the small model at £4,550 and the Love bracelet on chain at £1,830. Pre-owned classic examples in good condition with original papers typically sell for 65–85% of current retail, approximately £4,600–£6,000.',
  ],
  [
    'The Love bracelet consistently retains 60–75% of its retail value on the secondary market in good condition with papers.',
    'The Love bracelet consistently retains roughly 65–85% of its current retail value on the secondary market in good condition with papers.',
  ],
  [
    'Cartier boutique retail pricing, UK, May 2026.',
    'Cartier UK retail pricing, October 2026; The RealReal resale data.',
  ],
]

async function main() {
  const doc = await client.getDocument<{ body: string }>(DOC_ID)
  if (!doc) throw new Error(`${DOC_ID} not found`)
  let body = doc.body
  for (const [from, to] of REPLACEMENTS) {
    if (!body.includes(from)) throw new Error(`Not found in live body: ${from.slice(0, 60)}...`)
    body = body.replace(from, to)
  }
  await client.patch(DOC_ID).set({ body }).commit()
  console.log(`✅  ${DOC_ID} — ${REPLACEMENTS.length} replacements applied`)
}

main().catch((err) => { console.error(err); process.exit(1) })
