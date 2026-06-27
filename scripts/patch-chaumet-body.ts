/**
 * One-off patch: updates the body field in Sanity for the Chaumet article.
 * Run: npx tsx scripts/patch-chaumet-body.ts
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

const docId = 'gAUm5QERsAwlhfMhQI4K3J'
const file = join(__dirname, '../content/48-chaumet-history.md')

async function main() {
  const raw = readFileSync(file, 'utf8')
  const { content } = matter(raw)

  console.log(`Patching ${docId} (chaumet-history)...`)
  await client.patch(docId).set({ body: content.trim() }).commit()
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
