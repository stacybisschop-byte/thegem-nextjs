/**
 * Migration script: reads all .md article files in /content and upserts them
 * into Sanity as article documents.
 *
 * Prerequisites:
 *   1. Sanity project at sanity.io/manage
 *   2. API token with Editor role
 *   3. .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *      SANITY_API_TOKEN
 *   4. Run: npm run migrate
 *
 * Safe to re-run. Uses createOrReplace, so existing documents are updated,
 * not duplicated. heroImageUrl is sourced from the HERO_IMAGES map below so
 * that re-running the migration doesn't wipe placeholder images.
 */

import { createClient } from '@sanity/client'
import matter from 'gray-matter'
import { readFileSync, readdirSync } from 'fs'
import { join, basename } from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

// ── Sanity client (write access) ─────────────────────────────────────────────

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// ── Article source directory ──────────────────────────────────────────────────
const MD_DIR = join(__dirname, '../content')

// ── Homepage feature config ────────────────────────────────────────────────────
// Three article slugs in the homepage Latest grid. 1 = large card, 2 and 3 = medium.
const FEATURED: Record<string, number> = {
  'chopard-cannes':         1,
  'cartier-family-history': 2,
  'tiffany-and-co-history': 3,
}

// ── Kicker extras map ─────────────────────────────────────────────────────────
const KICKER_EXTRAS: Record<string, string> = {
  'princess-diana-jewellery':    'Royal Jewellery',
  'marilyn-monroe-jewellery':    'Hollywood Glamour',
  'koh-i-noor':                  'Imperial Jewels',
  'hope-diamond':                'Cursed Stones',
  'elizabeth-taylor-jewellery':  'Hollywood Glamour',
  'lab-grown-vs-natural-diamonds': 'Buying',
  'engagement-ring-stones':      'Considered Buying',
  'where-to-buy-vintage-jewellery': 'Considered Buying',
  'how-to-wear-pearls':          'Modern Classics',
  'best-signet-rings-men':       'Considered Buying',
  'black-princes-ruby':          'Crown Jewels',
  'moonstone':                   'Stones',
  'precious-vs-semi-precious':   'Gemstone Knowledge',
  'jewellery-that-holds-value':  'Considered Buying',
  'viking-burial-jewellery':     'Archaeology',
  'tolkiens-gemstones':          'The Literary Tradition',
  'renaissance-pigment-stones':  'Pigments and Mining',
  'pyrite-and-the-gold-rush':    'Mineralogy',
  'layering-necklaces':          'Style Rules',
  'modern-womens-jewellery-edit': 'The Edit',
  'cartier-family-history':      'House Histories',
  'tiffany-and-co-history':      'House Histories',
  'chopard-cannes':              'House Histories',
  'pink-jewellery':              'A Reclamation',
  'how-to-care-for-your-jewellery': 'Complete Guide',
  'how-to-sell-your-jewellery':  'Complete Guide',
  'diamond-market-2026':         'Market Analysis',
}

// ── Hero image map ────────────────────────────────────────────────────────────
// Placeholder hero images per article. Local paths under /blog/ resolve to
// files in public/blog/. Remote URLs (Unsplash, etc.) require their hostname
// in next.config.js images.remotePatterns.
//
// To replace a placeholder with licensed photography, upload the asset to the
// article's heroImage field in Sanity Studio — that field takes precedence
// over heroImageUrl at render time.
const HERO_IMAGES: Record<string, { url: string; alt: string }> = {
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
    url: 'https://images.unsplash.com/photo-1705326455036-0fab8ecba04d?w=2400&q=80&fit=crop&crop=entropy',
    alt: 'A close-up of a gold ring on a white surface',
  },
  'black-princes-ruby': {
    url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=85',
    alt: 'A large faceted gemstone against a dark background',
  },
  'moonstone': {
    url: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=1600&q=85',
    alt: 'A moonstone with its characteristic adularescence',
  },
  'precious-vs-semi-precious': {
    url: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1600&q=85',
    alt: 'A selection of contemporary fine jewellery',
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
    url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&q=85',
    alt: 'A deep blue gemstone',
  },
  'renaissance-pigment-stones': {
    url: 'https://images.unsplash.com/photo-1611735341450-74d61e660ad2?w=1600&q=85',
    alt: 'Raw mineral crystals',
  },
  'pyrite-and-the-gold-rush': {
    url: 'https://images.unsplash.com/photo-1611735341450-74d61e660ad2?w=1600&q=85',
    alt: "Pyrite crystals — nature's most famous impostor",
  },
  'layering-necklaces': {
    url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1600&q=85',
    alt: 'Fine jewellery displayed on a pale surface',
  },
  'modern-womens-jewellery-edit': {
    url: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1600&q=85',
    alt: 'Contemporary fine jewellery selection',
  },
  'cartier-family-history': {
    url: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600&q=85',
    alt: 'Diamond and gold jewellery on a dark background',
  },
  'tiffany-and-co-history': {
    url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=85',
    alt: 'A round brilliant-cut diamond examined with a loupe',
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
  'chopard-cannes': {
    url: '/blog/chopard-cannes.jpg',
    alt: 'Demi Moore wearing a Chopard diamond bib necklace on the red carpet at Cannes 2026.',
  },
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function slugFromFrontmatter(rawSlug: string): string {
  return rawSlug.includes('/') ? rawSlug.split('/').pop()! : rawSlug
}

function pillarFromFrontmatter(rawSlug: string, rawPillar?: string): string {
  if (rawPillar) return rawPillar
  if (rawSlug.startsWith('stories/')) return 'Stories'
  if (rawSlug.startsWith('guides/')) return 'Guides'
  if (rawSlug.startsWith('style/')) return 'Style'
  return 'Stories'
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function migrate() {
  let files: string[]
  try {
    files = readdirSync(MD_DIR)
      .filter((f) => f.endsWith('.md'))
      .sort()
  } catch {
    console.error(`❌  Could not read directory: ${MD_DIR}`)
    console.error('    Adjust MD_DIR in the script to point at your .md files.')
    process.exit(1)
  }

  console.log(`\n📂  Found ${files.length} markdown files in ${MD_DIR}\n`)

  let successCount = 0
  let skipCount = 0

  for (const file of files) {
    const raw = readFileSync(join(MD_DIR, file), 'utf8')
    const { data: fm, content } = matter(raw)

    if (!fm.slug) {
      console.warn(`  ⚠️  Skipping ${file} — no slug in frontmatter`)
      skipCount++
      continue
    }

    const slug = slugFromFrontmatter(fm.slug)
    const pillar = pillarFromFrontmatter(fm.slug, fm.pillar)
    const docId = `article-${slug}`
    const hero = HERO_IMAGES[slug]

    const doc = {
      _id: docId,
      _type: 'article',
      title: fm.title ?? basename(file, '.md'),
      slug: { _type: 'slug', current: slug },
      pillar,
      author: fm.author ?? 'Florence',
      published: true,
      publishedAt: new Date().toISOString(),
      lastReviewedAt: fm.last_reviewed_at
        ? `${fm.last_reviewed_at}-01`
        : undefined,
      metaTitle: fm.meta_title ?? undefined,
      metaDescription: fm.meta_description ?? undefined,
      heroImageBrief: fm.hero_image_brief ?? undefined,
      heroImageUrl: hero?.url ?? undefined,
      heroImageAlt: hero?.alt ?? undefined,
      kickerExtra: KICKER_EXTRAS[slug] ?? undefined,
      body: content.trim(),
      affiliateDisclosure: content.includes('affiliate') ? true : false,
      ...(FEATURED[slug] != null && {
        featured: true,
        featuredOrder: FEATURED[slug],
      }),
    }

    try {
      await client.createOrReplace(doc)
      const featuredTag = FEATURED[slug] != null ? ` ⭐ featured(${FEATURED[slug]})` : ''
      const imageTag = hero ? ' 📸' : ''
      console.log(`  ✅  ${pillar} · ${slug}${featuredTag}${imageTag}`)
      successCount++
    } catch (err) {
      console.error(`  ❌  Failed: ${slug}`, err)
    }
  }

  console.log(`\n──────────────────────────────────────────`)
  console.log(`Migration complete: ${successCount} uploaded, ${skipCount} skipped`)
  console.log(`\nNext steps:`)
  console.log(`  1. Visit /studio to verify documents in Sanity`)
  console.log(`  2. Replace placeholder hero images with licensed photography`)
  console.log(`     (upload to each article's Hero Image field in Studio)`)
  console.log(`  3. Adjust FEATURED / KICKER_EXTRAS / HERO_IMAGES in this script`)
  console.log(`     when adding a new article`)
}

migrate().catch(console.error)
