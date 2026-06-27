/**
 * One-off: update body and publish the ring stacking guide.
 * Run: npx tsx scripts/publish-ring-stacking.ts
 */

import { createClient } from '@sanity/client'
import matter from 'gray-matter'
import { readFileSync } from 'fs'
import { join } from 'path'
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
  const file = join(__dirname, '../content/41-ring-stacking-guide.md')
  const raw = readFileSync(file, 'utf8')
  const { content } = matter(raw)
  const body = content.trim()

  await client
    .patch('article-ring-stacking-guide')
    .set({ body, published: true })
    .commit()

  console.log('✅  article-ring-stacking-guide — body updated and published: true')
}

main().catch((err) => { console.error(err); process.exit(1) })
