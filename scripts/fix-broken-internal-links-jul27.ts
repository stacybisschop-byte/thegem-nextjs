/**
 * One-off: fix broken internal links found live on site (six 404s reported
 * via Screaming Frog crawl, 2026-07-27; 7 inlinks total across 4 articles).
 * Each link's href pointed to a slug or pillar that doesn't match the
 * target article's actual live slug/pillar.
 *
 * Dry run (locate + count only, writes nothing):
 *   npx tsx scripts/fix-broken-internal-links-jul27.ts --dry-run
 * Execute:
 *   npx tsx scripts/fix-broken-internal-links-jul27.ts
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
    id: 'article-emerald-cut',
    replacements: [
      { from: '(/guides/sapphire-buying-guide)', to: '(/guides/sapphire-engagement-rings)', expectedCount: 1 },
    ],
  },
  {
    id: 'article-paraiba-tourmaline',
    replacements: [
      { from: '(/stories/diamond-market-2026)', to: '(/guides/diamond-market-2026)', expectedCount: 2 },
    ],
  },
  {
    id: 'article-how-to-buy-jewellery-at-auction',
    replacements: [
      { from: '(/guides/uk-jewellery-hallmarks)', to: '(/guides/jewellery-hallmarks-uk)', expectedCount: 1 },
      { from: '(/guides/jewellery-that-holds-its-value)', to: '(/guides/jewellery-that-holds-value)', expectedCount: 1 },
      { from: '(/guides/hatton-garden-buyers-guide)', to: '(/guides/hatton-garden-guide)', expectedCount: 1 },
    ],
  },
  {
    id: 'article-van-cleef-arpels-history',
    replacements: [
      { from: '(/guides/historic-jewellery-houses)', to: '(/stories/historic-jewellery-houses)', expectedCount: 1 },
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
  const EXPECTED_TOTAL = 7
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
    console.log('\nDry run clean: 7/7 confirmed. Re-run without --dry-run to execute.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
