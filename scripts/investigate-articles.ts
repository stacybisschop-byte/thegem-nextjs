/**
 * Investigation script: fetch document IDs and relevant body sections for
 * the four articles targeted for commercial link insertion.
 *
 * Run: npx tsx scripts/investigate-articles.ts
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

const SLUGS = [
  'cartier-love-bracelet-guide',
  'van-cleef-alhambra-guide',
  'lab-grown-vs-natural-diamonds',
  'jewellery-that-holds-value',
]

// Keywords to find the relevant sections in each body
const SECTION_KEYWORDS: Record<string, string[]> = {
  'cartier-love-bracelet-guide': ['Where to buy pre-owned', '1stDibs', 'WP Diamonds', 'Vestiaire', 'Certified Pre-Owned', 'Where to buy a pre-owned Cartier'],
  'van-cleef-alhambra-guide': ['Buying pre-owned', '1stDibs', "Christie's", "Sotheby's", 'Bonhams', 'Vestiaire', 'Van Cleef Alhambra in the UK'],
  'lab-grown-vs-natural-diamonds': ['Brilliant Earth', 'Clean Origin', 'Vrai', 'Blue Nile', 'James Allen', 'Leibish', 'GIA', 'where to buy'],
  'jewellery-that-holds-value': ["Christie's", "Sotheby's", 'Bonhams', '1stDibs', 'Worthy', 'resale', 'auction'],
}

function extractContext(body: string, keywords: string[]): string {
  const lines = body.split('\n')
  const matchedLines = new Set<number>()

  for (const kw of keywords) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].toLowerCase().includes(kw.toLowerCase())) {
        // Include 2 lines before and after each match
        for (let j = Math.max(0, i - 2); j <= Math.min(lines.length - 1, i + 2); j++) {
          matchedLines.add(j)
        }
      }
    }
  }

  if (matchedLines.size === 0) return '  (no matches found)\n'

  const sorted = [...matchedLines].sort((a, b) => a - b)
  const chunks: string[][] = []
  let current: number[] = []

  for (let k = 0; k < sorted.length; k++) {
    if (k === 0 || sorted[k] !== sorted[k - 1] + 1) {
      if (current.length) chunks.push(current)
      current = [sorted[k]]
    } else {
      current.push(sorted[k])
    }
  }
  if (current.length) chunks.push(current)

  return chunks
    .map((chunk) => {
      const lineNums = `L${chunk[0] + 1}–L${chunk[chunk.length - 1] + 1}`
      const text = chunk.map((i) => `  ${String(i + 1).padStart(4)}: ${lines[i]}`).join('\n')
      return `  [${lineNums}]\n${text}`
    })
    .join('\n\n  ---\n\n')
}

async function main() {
  console.log('Fetching documents from Sanity...\n')

  for (const slug of SLUGS) {
    const docId = `article-${slug}`
    const doc = await client.fetch<{ _id: string; slug: { current: string }; body: string } | null>(
      `*[_id == $id][0]{ _id, slug, body }`,
      { id: docId },
    )

    console.log('═'.repeat(80))
    console.log(`Slug:    ${slug}`)
    console.log(`Doc ID:  ${docId}`)

    if (!doc) {
      console.log('  ⚠️  DOCUMENT NOT FOUND in Sanity')
      continue
    }

    console.log(`Found:   _id=${doc._id}  slug.current=${doc.slug?.current}`)
    console.log(`Body length: ${doc.body?.length ?? 0} characters\n`)

    const keywords = SECTION_KEYWORDS[slug] ?? []
    console.log(`Relevant sections (keywords: ${keywords.join(', ')}):\n`)
    console.log(extractContext(doc.body ?? '', keywords))
    console.log()
  }

  console.log('═'.repeat(80))
  console.log('Investigation complete.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
