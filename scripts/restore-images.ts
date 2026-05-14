/**
 * Restore placeholder hero images to Sanity.
 * Pushes the original Unsplash URLs used in the HTML preview
 * into a heroImageUrl field on each article document.
 *
 * Run with:
 *   $env:NEXT_PUBLIC_SANITY_PROJECT_ID = "qwjttp4n"
 *   $env:NEXT_PUBLIC_SANITY_DATASET = "production"
 *   $env:SANITY_API_TOKEN = "your_editor_token"
 *   npx tsx scripts/restore-images.ts
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

// Original Unsplash URLs from the HTML preview
// These are free-to-use placeholder images — replace with licensed
// editorial photography by uploading to Sanity Studio
const IMAGE_MAP: Record<string, { url: string; alt: string }> = {
  'princess-diana-jewellery': {
    url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1600&q=85',
    alt: 'Fine jewellery displayed on a pale surface',
  },
  'lab-grown-vs-natural-diamonds': {
    url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=85',
    alt: 'A round brilliant-cut diamond examined with a loupe',
  },
  'marilyn-monroe-jewellery': {
    url: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600&q=85',
    alt: 'Diamond and gold jewellery on a dark background',
  },
  'engagement-ring-stones': {
    url: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1600&q=85',
    alt: 'An engagement ring with a coloured stone centre',
  },
  'koh-i-noor': {
    url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=85',
    alt: 'A large faceted diamond against a dark background',
  },
  'hope-diamond': {
    url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&q=85',
    alt: 'A deep blue gemstone',
  },
  'elizabeth-taylor-jewellery': {
    url: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=1600&q=85',
    alt: 'Fine jewellery on display',
  },
  'where-to-buy-vintage-jewellery': {
    url: 'https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=1600&q=85',
    alt: 'Vintage jewellery displayed in a case',
  },
  'how-to-wear-pearls': {
    url: 'https://images.unsplash.com/photo-1610631066894-62452ccb927c?w=1600&q=85',
    alt: 'A pearl necklace against a neutral background',
  },
  'best-signet-rings-men': {
    url: 'https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?w=1600&q=85',
    alt: 'A gold signet ring on a surface',
  },
  'black-princes-ruby': {
    url: 'https://images.unsplash.com/photo-1583937443351-c6b1c2c4f7f5?w=1600&q=85',
    alt: 'A large red gemstone',
  },
  'moonstone': {
    url: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=1600&q=85',
    alt: 'A moonstone with its characteristic adularescence',
  },
  'precious-vs-semi-precious': {
    url: 'https://images.unsplash.com/photo-1551732998-9573f695fdbb?w=1600&q=85',
    alt: 'An array of coloured gemstones',
  },
  'jewellery-that-holds-value': {
    url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=85',
    alt: 'Fine gold jewellery on a neutral surface',
  },
  'viking-burial-jewellery': {
    url: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=1600&q=85',
    alt: 'Ancient metalwork jewellery',
  },
  'tolkiens-gemstones': {
    url: 'https://images.unsplash.com/photo-1551122080-2eb3f8d97f2c?w=1600&q=85',
    alt: 'A faceted gemstone with deep internal colour',
  },
  'renaissance-pigment-stones': {
    url: 'https://images.unsplash.com/photo-1542039217-5e7eed30b97a?w=1600&q=85',
    alt: 'Lapis lazuli, the source of ultramarine pigment',
  },
  'pyrite-and-the-gold-rush': {
    url: 'https://images.unsplash.com/photo-1611735341450-74d61e660ad2?w=1600&q=85',
    alt: "Pyrite crystals — nature's most famous impostor",
  },
  'layering-necklaces': {
    url: 'https://images.unsplash.com/photo-1611755644068-2c0f8b4b8c7e?w=1600&q=85',
    alt: 'Multiple necklaces layered together',
  },
  'modern-womens-jewellery-edit': {
    url: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1600&q=85',
    alt: 'Contemporary fine jewellery selection',
  },
  'cartier-family-history': {
    url: 'https://images.unsplash.com/photo-1606293926249-ed22a4f97c64?w=1600&q=85',
    alt: 'Fine jewellery from a luxury house',
  },
  'tiffany-and-co-history': {
    url: 'https://images.unsplash.com/photo-1561591437281-460bfbe1220a?w=1600&q=85',
    alt: 'A diamond solitaire in a classic setting',
  },
  'pink-jewellery': {
    url: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1600&q=85',
    alt: 'Pink gemstone jewellery',
  },
  'how-to-care-for-your-jewellery': {
    url: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=1600&q=85',
    alt: 'Jewellery cleaning and care',
  },
  'how-to-sell-your-jewellery': {
    url: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=1600&q=85',
    alt: 'A jewellery valuation session',
  },
  'diamond-market-2026': {
    url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=85',
    alt: 'A GIA-certified round brilliant diamond',
  },
}

async function restore() {
  console.log('\n📸  Restoring placeholder hero images to Sanity...\n')

  let success = 0
  let failed = 0

  for (const [slug, { url, alt }] of Object.entries(IMAGE_MAP)) {
    const docId = `article-${slug}`
    try {
      await client
        .patch(docId)
        .set({ heroImageUrl: url, heroImageAlt: alt })
        .commit()
      console.log(`  ✅  ${slug}`)
      success++
    } catch (err) {
      console.error(`  ❌  ${slug}:`, err)
      failed++
    }
  }

  console.log(`\n──────────────────────────────`)
  console.log(`Done: ${success} updated, ${failed} failed`)
  console.log(`\nImages will appear on the site within 60 seconds.`)
  console.log(`Replace these with licensed editorial photography by`)
  console.log(`uploading to Sanity Studio → each article → Hero Image.`)
}

restore().catch(console.error)
