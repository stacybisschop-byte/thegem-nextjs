/**
 * One-off, part 2 of the stale /style/ cleanup (part 1: scripts/fix-stale-style-links-aug2026.ts,
 * committed as fd6731a). Fixes the reused boilerplate FAQ sentence left over from the Style ->
 * Edit pillar rename: "The Gem's Style section covers how to wear jewellery, build a wardrobe,
 * and interpret trends... thegem.press/style" -> "...Edit section... thegem.press/edit".
 *
 * how-to-wear-pearls is filed under Guides in Sanity, but this sentence is a cross-reference to
 * the Edit section's content (not a claim about this article's own category), so it gets the
 * same replacement as the other three - confirmed with the user, not a mechanical field lookup.
 *
 * Does NOT touch the heading line ("Where can I read more style writing on The Gem?") - out of
 * scope, confirmed to stay as-is.
 *
 * Dry run (locate + count only, writes nothing):
 *   npx tsx scripts/fix-style-boilerplate-sentence-aug2026.ts --dry-run
 * Execute:
 *   npx tsx scripts/fix-style-boilerplate-sentence-aug2026.ts
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

const FROM =
  "The Gem's Style section covers how to wear jewellery, build a wardrobe, and interpret trends — for men and women. The full archive is at thegem.press/style."
const TO =
  "The Gem's Edit section covers how to wear jewellery, build a wardrobe, and interpret trends — for men and women. The full archive is at thegem.press/edit."

const DOC_IDS = [
  'article-layering-necklaces',
  'article-modern-womens-jewellery-edit',
  'article-pink-jewellery',
  'article-how-to-wear-pearls',
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

async function patchDoc(id: string, dryRun: boolean): Promise<void> {
  const doc = await client.getDocument(id)
  if (!doc) throw new Error(`Document not found: ${id}`)
  const body: string = doc.body

  const actualCount = countOccurrences(body, FROM)
  if (actualCount === 0) {
    throw new Error(
      `${id}: expected sentence not found. Either it was already fixed ` +
        `(this script is not idempotent — re-running after a successful patch will hit this) ` +
        `or the source text has changed since this script was written. Investigate before re-running.`
    )
  }
  if (actualCount !== 1) {
    throw new Error(`${id}: expected exactly 1 occurrence but found ${actualCount}. Refusing to guess — check the body manually.`)
  }

  const newBody = body.split(FROM).join(TO)

  if (dryRun) {
    console.log(`[dry run] would patch ${id}`)
    console.log(`  - "${FROM}"`)
    console.log(`  + "${TO}"\n`)
  } else {
    await client.patch(id).set({ body: newBody }).commit()
    console.log(`patched ${id}\n`)
  }
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const completed: string[] = []

  console.log(dryRun ? '=== DRY RUN — no writes will be made ===\n' : '=== EXECUTING — will write to Sanity ===\n')

  try {
    for (const id of DOC_IDS) {
      await patchDoc(id, dryRun)
      completed.push(id)
    }
  } catch (err) {
    console.error(`\nFAILED after successfully ${dryRun ? 'checking' : 'patching'} ${completed.length}/${DOC_IDS.length} document(s):`)
    for (const id of completed) console.error(`  done: ${id}`)
    const remaining = DOC_IDS.filter((id) => !completed.includes(id))
    for (const id of remaining) console.error(`  NOT done: ${id}`)
    if (!dryRun && completed.length > 0) {
      console.error(`\nDo NOT re-run this script — the ${completed.length} completed document(s) above are already ` +
        `patched and will fail the "sentence not found" check. Verify their state in Sanity, then patch the ` +
        `remaining document(s) by hand or with a new targeted script.`)
    }
    throw err
  }

  console.log(dryRun ? `Dry run clean: ${completed.length}/${DOC_IDS.length} confirmed. Re-run without --dry-run to execute.` : `Total documents patched: ${completed.length}/${DOC_IDS.length}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
