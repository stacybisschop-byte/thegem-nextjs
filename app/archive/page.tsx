import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import { articleHref } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Every piece published on The Gem, organised by section — Stories, Style, and Guides. Browse the full archive of fine jewellery writing.',
  alternates: { canonical: '/archive' },
  openGraph: {
    type: 'website',
    siteName: 'The Gem',
    locale: 'en_GB',
    url: '/archive',
    title: 'Archive',
    description: 'Every piece published on The Gem, organised by section — Stories, Style, and Guides. Browse the full archive of fine jewellery writing.',
    images: [{ url: '/og-cover.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/og-cover.jpg'],
  },
}

export const revalidate = 60

interface ArchiveItem {
  _id: string
  title: string
  slug: { current: string }
  pillar: 'Stories' | 'Guides' | 'Style'
  publishedAt?: string
  readMin?: number
}

async function getAllArticles(): Promise<ArchiveItem[]> {
  return client.fetch<ArchiveItem[]>(`
    *[_type == "article" && published == true]
    | order(publishedAt desc) {
      _id,
      title,
      slug,
      pillar,
      publishedAt,
      "readMin": round(length(body) / 1100)
    }
  `)
}

function formatDate(iso?: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

const PILLAR_ORDER: Array<ArchiveItem['pillar']> = ['Stories', 'Guides', 'Style']

const PILLAR_BLURB: Record<ArchiveItem['pillar'], string> = {
  Stories: 'The history of fine jewellery told through the objects themselves. How the Cullinan diamond was sent to England in a plain registered parcel. Why the Black Prince\'s Ruby in the Imperial State Crown is not a ruby. What Wallis Simpson\'s collection revealed when it sold at Sotheby\'s Geneva for £31 million. House histories, famous stones, royal jewellery, and the archaeology of what people have worn and why — from Viking burial hoards to the 1987 US Open.',
  Guides: 'Buying guides, market analysis, and honest assessments of what jewellery is actually worth. Platinum versus white gold — the maintenance costs most jewellers don\'t mention. How to navigate Hatton Garden without overpaying. What the Cartier Love bracelet costs pre-owned and how to authenticate one. The state of the diamond market in 2026, why lab-grown prices have fallen 75% since 2022, and what that means if you are buying or selling.',
  Style: 'Practical guidance on wearing fine jewellery well. How to layer necklaces without tangling them. Where to pin a brooch on a blazer. Which pearl types are worth knowing and why baroque now outperforms round. The seven pieces that constitute a working women\'s jewellery wardrobe, and the order to buy them in. Men\'s jewellery from signet rings to gold chains — what works, what doesn\'t, and what to ignore.',
}

export default async function ArchivePage() {
  const articles = await getAllArticles()

  const grouped: Record<ArchiveItem['pillar'], ArchiveItem[]> = {
    Stories: [],
    Guides: [],
    Style: [],
  }
  for (const a of articles) grouped[a.pillar].push(a)

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '80px var(--pad-x) 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-accessible)', marginBottom: 20 }}>
          The Gem
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
          The <em style={{ fontStyle: 'italic', color: 'var(--gold-large)' }}>archive</em>
        </h1>
        <p style={{ fontSize: 17, color: 'var(--ink-muted)', maxWidth: 560, margin: '0 auto' }}>
          Everything we&rsquo;ve published, in one place. {articles.length} {articles.length === 1 ? 'piece' : 'pieces'} and counting.
        </p>
      </div>

      {PILLAR_ORDER.map((pillar) => {
        const list = grouped[pillar]
        if (!list.length) return null
        return (
          <section key={pillar} style={{ marginBottom: 64 }}>
            <header style={{ borderBottom: '1px solid var(--border)', paddingBottom: 16, marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, letterSpacing: '-0.02em', marginBottom: 8 }}>
                {pillar}
              </h2>
              <p style={{ fontSize: 15, color: 'var(--ink-muted)' }}>{PILLAR_BLURB[pillar]}</p>
            </header>
            <ul style={{ listStyle: 'none' }}>
              {list.map((a) => (
                <li key={a._id} style={{ borderTop: '1px solid var(--border)', padding: '16px 0' }}>
                  <Link
                    href={articleHref({ pillar: a.pillar, slug: a.slug })}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, textDecoration: 'none', color: 'inherit' }}
                  >
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 350 }}>
                      {a.title}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-secondary)', whiteSpace: 'nowrap' }}>
                      {formatDate(a.publishedAt)}
                      {a.readMin ? ` · ${a.readMin} min` : ''}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
