/**
 * Targeted patch: updates the `body` field in Sanity for the four articles
 * that received commercial link insertions. Reads from the local markdown
 * source files and patches only the body — no other fields are touched.
 *
 * Run: npx tsx scripts/patch-affiliate-links.ts
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

const ARTICLES: { file: string; slug: string }[] = [
  { file: '34-cartier-love-bracelet-guide.md',       slug: 'cartier-love-bracelet-guide' },
  { file: '31-van-cleef-alhambra-guide.md',          slug: 'van-cleef-alhambra-guide' },
  { file: '02-lab-grown-vs-natural-diamonds-v2.md',  slug: 'lab-grown-vs-natural-diamonds' },
  { file: '14-jewellery-that-holds-value.md',        slug: 'jewellery-that-holds-value' },
]

async function main() {
  console.log('Patching body fields in Sanity...\n')

  for (const { file, slug } of ARTICLES) {
    const docId = `article-${slug}`
    const raw = readFileSync(join(MD_DIR, file), 'utf8')
    const { content } = matter(raw)
    const body = content.trim()

    try {
      await client.patch(docId).set({ body }).commit()
      console.log(`  ✅  Patched ${docId}`)
    } catch (err) {
      console.error(`  ❌  Failed to patch ${docId}:`, err)
      process.exit(1)
    }
  }

  console.log('\nAll patches complete.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
