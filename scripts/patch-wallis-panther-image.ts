/**
 * One-off: add the Cartier panther-on-sapphire image to the "The panther and
 * Cartier" section of the Wallis Simpson article body. Uploads the local
 * image as a Sanity asset and inserts a markdown image line after the
 * paragraph describing the panther-on-cabochon-sapphire bracelet.
 * Run: npx tsx scripts/patch-wallis-panther-image.ts
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local', quiet: true })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const ID = 'article-wallis-simpson-jewellery'
const IMAGE_PATH = 'C:\\Users\\stacy\\Downloads\\Duchess of Windsor\\cartier panther.jpg'
const ALT =
  'A gloved hand holding a Cartier panther clip: a diamond panther crouched atop a large cabochon sapphire, set in white gold.'

const ANCHOR =
  'a three-dimensional panther crouched on a large cabochon sapphire that she wore as a bracelet. The pieces were made by Cartier\'s London and Paris workshops, designed under the direction of Jeanne Toussaint — the designer known within the house as La Panthère, who had been responsible for the panther motif almost since its inception.\n\n'

async function main() {
  const doc = await client.fetch<{ body?: string } | null>(
    `*[_id == $id][0]{ body }`,
    { id: ID }
  )
  if (!doc?.body) throw new Error(`Document ${ID} not found or has no body`)

  if (!doc.body.includes(ANCHOR)) {
    throw new Error('Anchor paragraph not found in body — body text may have changed since this script was written.')
  }
  if (doc.body.includes(ALT)) {
    throw new Error('Image already appears to be inserted (alt text found in body).')
  }

  console.log('Uploading image...')
  const buffer = readFileSync(IMAGE_PATH)
  const asset = await client.assets.upload('image', buffer, { filename: 'cartier-panther-sapphire.jpg' })

  const imageMarkdown = `![${ALT}](${asset.url})\n\n`
  const newBody = doc.body.replace(ANCHOR, ANCHOR + imageMarkdown)

  await client.patch(ID).set({ body: newBody }).commit()

  console.log(`✅  Patched ${ID} — inserted panther image after the Toussaint paragraph.`)
}

main().catch((err) => { console.error(err); process.exit(1) })
