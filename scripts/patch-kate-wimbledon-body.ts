/**
 * Targeted patch: updates the `body` field in Sanity for the Kate Wimbledon
 * earrings article after restoring the Grimoire cross-link. Reads from the
 * local markdown source file and patches only the body — no other fields.
 *
 * Run: npx tsx scripts/patch-kate-wimbledon-body.ts
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

const MD_DIR = join(__dirname, '../content')
const docId = 'article-kate-wimbledon-earrings'
const file = '55-kate-wimbledon-earrings.md'

async function main() {
  const raw = readFileSync(join(MD_DIR, file), 'utf8')
  const { content } = matter(raw)
  const body = content.trim()

  await client.patch(docId).set({ body }).commit()
  console.log(`  ✅  Patched ${docId}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
