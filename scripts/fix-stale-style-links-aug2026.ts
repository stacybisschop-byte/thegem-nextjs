/**
 * One-off: fix stale /style/ internal links left over from the Style -> Edit
 * pillar rename. Located via a full-dataset audit (2026-08-11): 33 markdown
 * links across 15 articles still point at /style/{slug} even though the
 * target articles' slugs never changed, only their pillar prefix did.
 * See stale-style-links-report.md for the full audit and per-link
 * verification against the live Sanity dataset.
 *
 * Does NOT touch the 4 bare "thegem.press/style" plain-text mentions —
 * those are a separate, not-yet-approved change.
 *
 * Dry run (locate + count only, writes nothing):
 *   npx tsx scripts/fix-stale-style-links-aug2026.ts --dry-run
 * Execute:
 *   npx tsx scripts/fix-stale-style-links-aug2026.ts
 *
 * Not idempotent by design (see patchDoc). If a real run fails partway,
 * do NOT re-run blindly — the script prints which document IDs were
 * already committed before the failure; check those against Sanity
 * before deciding whether to patch the remainder by hand.
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

type Replacement = { from: string; to: string; expectedCount: number }

const PATCHES: { id: string; replacements: Replacement[] }[] = [
  {
    id: 'article-cartier-love-bracelet-guide',
    replacements: [
      { from: '(/style/mens-jewellery-guide)', to: '(/edit/mens-jewellery-guide)', expectedCount: 1 },
    ],
  },
  {
    id: 'article-diamond-market-2026',
    replacements: [
      { from: '(/style/pink-jewellery)', to: '(/edit/pink-jewellery)', expectedCount: 1 },
    ],
  },
  {
    id: '5kWihuCnV1iKvV2XGflFXv', // fine-jewellery-festival-layering
    replacements: [
      { from: '(/style/layering-necklaces)', to: '(/edit/layering-necklaces)', expectedCount: 1 },
      { from: '(/style/ring-stacking-guide)', to: '(/edit/ring-stacking-guide)', expectedCount: 1 },
      { from: '(/style/how-to-wear-a-brooch)', to: '(/guides/how-to-wear-a-brooch)', expectedCount: 1 },
    ],
  },
  {
    id: 'article-floral-jewellery',
    replacements: [
      { from: '(/style/how-to-wear-a-brooch)', to: '(/guides/how-to-wear-a-brooch)', expectedCount: 2 },
      { from: '(/style/pink-jewellery)', to: '(/edit/pink-jewellery)', expectedCount: 1 },
      { from: '(/style/modern-womens-jewellery-edit)', to: '(/edit/modern-womens-jewellery-edit)', expectedCount: 1 },
    ],
  },
  {
    id: 'article-how-to-build-a-jewellery-collection',
    replacements: [
      { from: '(/style/modern-womens-jewellery-edit)', to: '(/edit/modern-womens-jewellery-edit)', expectedCount: 1 },
      { from: '(/style/mens-jewellery-guide)', to: '(/edit/mens-jewellery-guide)', expectedCount: 1 },
    ],
  },
  {
    id: 'article-how-to-care-for-your-jewellery',
    replacements: [
      { from: '(/style/how-to-wear-pearls)', to: '(/guides/how-to-wear-pearls)', expectedCount: 1 },
    ],
  },
  {
    id: 'article-how-to-wear-a-brooch',
    replacements: [
      { from: '(/style/floral-jewellery)', to: '(/stories/floral-jewellery)', expectedCount: 2 },
      { from: '(/style/layering-necklaces)', to: '(/edit/layering-necklaces)', expectedCount: 1 },
      { from: '(/style/how-to-build-a-jewellery-collection)', to: '(/guides/how-to-build-a-jewellery-collection)', expectedCount: 1 },
    ],
  },
  {
    id: 'article-layering-necklaces',
    replacements: [
      { from: '(/style/how-to-wear-pearls)', to: '(/guides/how-to-wear-pearls)', expectedCount: 1 },
    ],
  },
  {
    id: 'article-mens-jewellery-guide',
    replacements: [
      { from: '(/style/how-to-build-a-jewellery-collection)', to: '(/guides/how-to-build-a-jewellery-collection)', expectedCount: 1 },
      { from: '(/style/layering-necklaces)', to: '(/edit/layering-necklaces)', expectedCount: 1 },
    ],
  },
  {
    id: 'article-modern-womens-jewellery-edit',
    replacements: [
      { from: '(/style/layering-necklaces)', to: '(/edit/layering-necklaces)', expectedCount: 2 },
      { from: '(/style/how-to-wear-pearls)', to: '(/guides/how-to-wear-pearls)', expectedCount: 1 },
    ],
  },
  {
    id: 'article-moonstone',
    replacements: [
      { from: '(/style/how-to-wear-pearls)', to: '(/guides/how-to-wear-pearls)', expectedCount: 1 },
    ],
  },
  {
    id: 'article-pink-jewellery',
    replacements: [
      { from: '(/style/how-to-wear-pearls)', to: '(/guides/how-to-wear-pearls)', expectedCount: 1 },
      { from: '(/style/modern-womens-jewellery-edit)', to: '(/edit/modern-womens-jewellery-edit)', expectedCount: 1 },
    ],
  },
  {
    id: 'article-platinum-vs-white-gold',
    replacements: [
      { from: '(/style/how-to-build-a-jewellery-collection)', to: '(/guides/how-to-build-a-jewellery-collection)', expectedCount: 1 },
    ],
  },
  {
    id: 'article-princess-diana-jewellery',
    replacements: [
      { from: '(/style/how-to-wear-pearls)', to: '(/guides/how-to-wear-pearls)', expectedCount: 2 },
    ],
  },
  {
    id: 'article-tennis-bracelet-history',
    replacements: [
      { from: '(/style/how-to-build-a-jewellery-collection)', to: '(/guides/how-to-build-a-jewellery-collection)', expectedCount: 1 },
    ],
  },
  {
    id: 'article-van-cleef-alhambra-guide',
    replacements: [
      { from: '(/style/how-to-build-a-jewellery-collection)', to: '(/guides/how-to-build-a-jewellery-collection)', expectedCount: 1 },
    ],
  },
  {
    id: 'article-victorian-mourning-jewellery',
    replacements: [
      { from: '(/style/floral-jewellery)', to: '(/stories/floral-jewellery)', expectedCount: 2 },
      { from: '(/style/how-to-wear-a-brooch)', to: '(/guides/how-to-wear-a-brooch)', expectedCount: 1 },
    ],
  },
]

function countOccurrences(haystack: string, needle: string): number {
  let count = 0
  let idx = haystack.indexOf(needle)
  while (idx > -1) {
    count++
    idx = haystack.indexOf(needle, idx + needle.length)
  }
  return count
}

async function patchDoc(id: string, replacements: Replacement[], dryRun: boolean): Promise<number> {
  const doc = await client.getDocument(id)
  if (!doc) throw new Error(`Document not found: ${id}`)
  let body: string = doc.body
  let docTotal = 0

  for (const { from, to, expectedCount } of replacements) {
    const actualCount = countOccurrences(body, from)
    if (actualCount === 0) {
      throw new Error(
        `${id}: expected substring not found: "${from}". Either the link was already fixed ` +
          `(this script is not idempotent — re-running after a successful patch will hit this) ` +
          `or the source text has changed since this script was written. Investigate before re-running.`
      )
    }
    if (actualCount !== expectedCount) {
      throw new Error(
        `${id}: expected ${expectedCount} occurrence(s) of "${from}" but found ${actualCount}. ` +
          `Refusing to guess — check the body manually.`
      )
    }
    body = body.split(from).join(to)
    docTotal += actualCount
    console.log(`  ${id}: "${from}" -> "${to}" (${actualCount} occurrence${actualCount === 1 ? '' : 's'})`)
  }

  if (dryRun) {
    console.log(`[dry run] would patch ${id} — ${docTotal} replacement(s)\n`)
  } else {
    await client.patch(id).set({ body }).commit()
    console.log(`patched ${id} — ${docTotal} replacement(s)\n`)
  }
  return docTotal
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const EXPECTED_TOTAL = 33
  let grandTotal = 0
  const completed: string[] = []

  console.log(dryRun ? '=== DRY RUN — no writes will be made ===\n' : '=== EXECUTING — will write to Sanity ===\n')

  try {
    for (const { id, replacements } of PATCHES) {
      grandTotal += await patchDoc(id, replacements, dryRun)
      completed.push(id)
    }
  } catch (err) {
    console.error(`\nFAILED after successfully ${dryRun ? 'checking' : 'patching'} ${completed.length}/${PATCHES.length} document(s):`)
    for (const id of completed) console.error(`  done: ${id}`)
    const remaining = PATCHES.map((p) => p.id).filter((id) => !completed.includes(id))
    for (const id of remaining) console.error(`  NOT done: ${id}`)
    if (!dryRun && completed.length > 0) {
      console.error(`\nDo NOT re-run this script — the ${completed.length} completed document(s) above are already ` +
        `patched and will fail the "substring not found" check. Verify their state in Sanity, then patch the ` +
        `remaining document(s) by hand or with a new targeted script.`)
    }
    throw err
  }

  console.log(`${dryRun ? '[dry run] total' : 'Total'} replacements: ${grandTotal} (expected ${EXPECTED_TOTAL})`)
  if (grandTotal !== EXPECTED_TOTAL) {
    throw new Error(`Replacement count mismatch: got ${grandTotal}, expected ${EXPECTED_TOTAL}`)
  }
  if (dryRun) {
    console.log('\nDry run clean: 33/33 confirmed. Re-run without --dry-run to execute.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
