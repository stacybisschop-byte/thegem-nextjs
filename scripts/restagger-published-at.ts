/**
 * One-off data patch: restagger `publishedAt` across all article documents so
 * that the "Further reading" auto-cards rotate naturally.
 *
 * Why: `getRelatedArticles` (lib/queries.ts) sorts by `publishedAt desc` within
 * pillar and takes the top 3. After the initial migration every article shared
 * the same `publishedAt` timestamp (2026-05-24T14:00:40.052Z), so the same 3
 * cards appeared under every Guides / Stories / Style article. Staggering the
 * timestamps gives the algorithm something to sort by.
 *
 * Order: pillar asc, then slug.current asc. The first doc in that order gets
 * 2026-05-20T10:00:00.000Z; each subsequent doc steps back 3 days.
 *
 * Note: `scripts/migrate-to-sanity.ts` overwrites `publishedAt` on every run
 * for articles without a `publishDate` in their frontmatter (it uses the
 * current time). This restagger will be clobbered the next time that script
 * runs. Re-run this script after each migrate, or update the migrate script
 * separately to preserve existing publishedAt values.
 *
 * Run: npx tsx scripts/restagger-published-at.ts
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

const ANCHOR_ISO = '2026-05-20T10:00:00.000Z'
const STEP_DAYS = 3
const MS_PER_DAY = 24 * 60 * 60 * 1000

interface Doc {
  _id: string
  slug: { current: string }
  pillar: 'Stories' | 'Guides' | 'Style'
  _createdAt: string
  publishedAt?: string
}

function offsetFromAnchor(index: number): string {
  const anchorMs = new Date(ANCHOR_ISO).getTime()
  return new Date(anchorMs - index * STEP_DAYS * MS_PER_DAY).toISOString()
}

async function main() {
  // Step 1: query all non-draft article documents
  const docs = await client.fetch<Doc[]>(
    `*[_type == "article" && !(_id in path("drafts.**"))] {
      _id, slug, pillar, _createdAt, publishedAt
    }`
  )
  console.log(`Found ${docs.length} article documents.\n`)

  // Step 2: sort by pillar, then slug
  const sorted = [...docs].sort((a, b) => {
    if (a.pillar !== b.pillar) return a.pillar.localeCompare(b.pillar)
    return a.slug.current.localeCompare(b.slug.current)
  })

  // Step 3: assign staggered publishedAt and queue patches in one transaction
  let tx = client.transaction()
  sorted.forEach((doc, i) => {
    const newPublishedAt = offsetFromAnchor(i)
    console.log(
      `  [${String(i + 1).padStart(2)}/${sorted.length}] ` +
      `${doc.pillar.padEnd(7)} · ${doc.slug.current.padEnd(40)} ` +
      `→ ${newPublishedAt}`,
    )
    tx = tx.patch(doc._id, (p) => p.set({ publishedAt: newPublishedAt }))
  })

  // Step 4: commit
  console.log('\nCommitting transaction...')
  const result = await tx.commit()
  console.log(`Patched ${result.results.length} documents.\n`)

  // Step 5: verify — top 3 Guides by publishedAt desc should now be distinct
  const sample = await client.fetch<Array<{ slug: { current: string }; publishedAt: string }>>(
    `*[_type == "article" && pillar == "Guides" && !(_id in path("drafts.**"))]
      | order(publishedAt desc)[0...3] {
      slug, publishedAt
    }`,
  )
  console.log('Verification — top 3 Guides by publishedAt desc:')
  sample.forEach((s) => {
    console.log(`  ${s.slug.current.padEnd(40)} ${s.publishedAt}`)
  })

  const distinctCount = new Set(sample.map((s) => s.publishedAt)).size
  if (distinctCount === sample.length && sample.length === 3) {
    console.log('\n✅ All three timestamps distinct.')
  } else {
    console.log(`\n❌ Distinct timestamps: ${distinctCount}/${sample.length}`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
