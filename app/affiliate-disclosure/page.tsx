import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'How The Gem uses affiliate links, and why commercial relationships never decide what we recommend.',
  alternates: { canonical: '/affiliate-disclosure' },
  openGraph: {
    type: 'website',
    siteName: 'The Gem',
    locale: 'en_GB',
    url: '/affiliate-disclosure',
    title: 'Affiliate Disclosure',
    description: 'How The Gem uses affiliate links, and why commercial relationships never decide what we recommend.',
    images: [{ url: '/og-cover-v2.webp', width: 1200, height: 630 }],
  },
  twitter: {
    description: 'How The Gem uses affiliate links, and why commercial relationships never decide what we recommend.',
    images: ['/og-cover-v2.webp'],
  },
}

const lastUpdated = '8 October 2026'

export default function AffiliateDisclosurePage() {
  return (
    <div className="article-body" style={{ maxWidth: 720, margin: '80px auto', padding: '0 var(--pad-x) 80px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--chocolate-fondant)', marginBottom: 24 }}>
        Legal
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
        Affiliate Disclosure
      </h1>
      <p style={{ color: 'var(--ink-muted)', fontSize: 14, marginBottom: 48 }}>Last updated: {lastUpdated}</p>

      <h2>The short version</h2>
      <p>
        Some articles and newsletters from The Gem contain affiliate links. If you click one and buy
        something, we may receive a small commission from the retailer at no extra cost to you.
        Affiliate relationships never decide which pieces, makers or brands we cover.
      </p>

      <h2>How we choose what to feature</h2>
      <p>
        Editorial decisions on The Gem are made independently. We choose pieces, makers and stories
        on craft, design, history and what we think readers will find worth their time. Whether a
        retailer runs an affiliate programme plays no part. A piece is not more likely to be featured
        because a commission is attached, and it is not left out because there isn&apos;t one.
      </p>
      <p>
        Where an affiliate link is available, we use it. Where one is not, we link to the maker or
        retailer directly. The recommendation is the same either way.
      </p>

      <h2>Where you&apos;ll find affiliate links</h2>
      <p>
        Any article containing affiliate links carries a short notice near the top of the page, before
        the first link. We do not bury it.
      </p>
      <p>
        The Edit and Guides are where affiliate links most often appear: curated selections and buying
        advice. Stories, our house histories and cultural pieces, generally do not contain them.
      </p>

      <h2>The newsletter</h2>
      <p>
        The Friday newsletter may also contain affiliate links. When it does, the letter says so.
      </p>

      <h2>Affiliate networks we work with</h2>
      <p>
        We work with Awin and with selected retailers directly, and may add other established networks
        over time. When you click an affiliate link, the retailer may set its own cookies to attribute
        the referral. We do not receive personal data about you from these transactions, only an
        aggregate commission report.
      </p>

      <h2>Sponsored content</h2>
      <p>
        Sponsored content is a different thing entirely. Where a brand or maker has paid for a piece, it
        is clearly labelled <em>Sponsored</em> or <em>Partner content</em> at the top of the article.
        Sponsored content is rare on The Gem and is always editorially reviewed.
      </p>

      <h2>Gifts and press samples</h2>
      <p>
        From time to time, makers and brands send pieces for review or photography. Receiving a sample
        does not guarantee coverage, and we disclose when a piece featured in an article was provided
        by the maker. We do not accept paid placement disguised as editorial.
      </p>

      <h2>Questions</h2>
      <p>
        If you have any questions about affiliate links, sponsored content or our editorial
        independence, please use the <a href="/contact">contact page</a>. We are happy to answer.
      </p>
    </div>
  )
}

