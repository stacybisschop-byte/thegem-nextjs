/**
 * One-off: add three catalogue-plate screenshots to the "The 1987 sale and
 * its aftermath" section of the Wallis Simpson article body, one after each
 * of the section's first three paragraphs, illustrating the range of lots
 * sold. Uploads each local image as a Sanity asset and inserts a markdown
 * image line.
 * Run: npx tsx scripts/patch-wallis-catalogue-images.ts
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
const IMAGE_DIR = 'C:\\Users\\stacy\\Downloads\\Duchess of Windsor'

const INSERTIONS: Array<{ anchor: string; file: string; filename: string; alt: string }> = [
  {
    anchor:
      "Mohamed Al-Fayed, who had bought the lease on the Windsor house from the City of Paris, organised the sale with Sotheby's.\n\n",
    file: 'Screenshot 2026-08-09 225247.png',
    filename: 'wallis-sale-charms-hairpins.png',
    alt: "A group of gold charms, hairpins, and gem-set button earrings from the 1987 Sotheby's sale catalogue, including cross- and heart-shaped charms, a ladybird, and cabochon-ruby cluster hairpins.",
  },
  {
    anchor:
      'drove prices to levels that had not been anticipated.\n\n',
    file: 'Screenshot 2026-08-09 225305.png',
    filename: 'wallis-sale-pearl-diamond-lots.png',
    alt: "A group of lots from the 1987 Sotheby's sale catalogue: pearl and diamond earclips, a diamond and enamel coronet brooch, a pavé diamond ring, and coral and diamond shell-shaped earclips.",
  },
  {
    anchor:
      'Some are in the Cartier archive, bought back by the house and not for resale.\n\n',
    file: 'Screenshot 2026-08-09 225437.png',
    filename: 'wallis-sale-coral-dragonfly-cuff.png',
    alt: "A coral and diamond dragonfly brooch and a coral, diamond, and cabochon cuff bracelet with stylised carved heads, from the 1987 Sotheby's sale catalogue.",
  },
]

async function uploadImage(filename: string, assetFilename: string) {
  const buffer = readFileSync(`${IMAGE_DIR}\\${filename}`)
  return client.assets.upload('image', buffer, { filename: assetFilename })
}

async function main() {
  const doc = await client.fetch<{ body?: string } | null>(`*[_id == $id][0]{ body }`, { id: ID })
  if (!doc?.body) throw new Error(`Document ${ID} not found or has no body`)

  let body = doc.body

  for (const { anchor, file, filename, alt } of INSERTIONS) {
    if (!body.includes(anchor)) {
      throw new Error(`Anchor not found for ${file}: "${anchor.slice(0, 60)}..."`)
    }
    if (body.includes(alt)) {
      throw new Error(`Image already appears inserted for ${file} (alt text found).`)
    }
    console.log(`Uploading ${file}...`)
    const asset = await uploadImage(file, filename)
    const imageMarkdown = `![${alt}](${asset.url})\n\n`
    body = body.replace(anchor, anchor + imageMarkdown)
  }

  await client.patch(ID).set({ body }).commit()
  console.log(`✅  Patched ${ID} — inserted 3 catalogue images into "The 1987 sale and its aftermath".`)
}

main().catch((err) => { console.error(err); process.exit(1) })
