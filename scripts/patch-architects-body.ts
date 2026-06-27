/**
 * One-off patch: updates the body field in Sanity for the architects-of-luxury article.
 * Run: npx tsx scripts/patch-architects-body.ts
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

const docId = '5kWihuCnV1iKvV2XGff59O'
const file = join(__dirname, '../content/46-architects-of-luxury.md')

async function main() {
  const raw = readFileSync(file, 'utf8')
  const { content } = matter(raw)
  const body = content.trim()

  console.log(`Patching ${docId}...`)
  await client.patch(docId).set({ body }).commit()
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
