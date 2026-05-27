import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'How The Gem uses affiliate links and why it does not influence our editorial coverage.',
  alternates: { canonical: '/affiliate-disclosure' },
  openGraph: {
    type: 'website',
    siteName: 'The Gem',
    locale: 'en_GB',
    url: '/affiliate-disclosure',
    title: 'Affiliate Disclosure',
    description: 'How The Gem uses affiliate links and why it does not influence our editorial coverage.',
    images: [{ url: '/og-cover.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/og-cover.jpg'],
  },
}

const lastUpdated = '14 May 2026'

export default function AffiliateDisclosurePage() {
  return (
    <div className="article-body" style={{ maxWidth: 720, margin: '80px auto', padding: '0 var(--pad-x) 80px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-accessible)', marginBottom: 24 }}>
        Legal
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
        Affiliate Disclosure
      </h1>
      <p style={{ color: 'var(--ink-muted)', fontSize: 14, marginBottom: 48 }}>Last updated: {lastUpdated}</p>

      <h2>The short version</h2>
      <p>
        Some articles on The Gem contain affiliate links. If you click one and make a purchase, we
        may receive a small commission from the retailer at no additional cost to you. Affiliate
        relationships never influence which pieces, makers, or brands we cover.
      </p>

      <h2>How we choose what to feature</h2>
      <p>
        Editorial decisions on The Gem are made independently. We choose pieces, makers, and stories
        based on craft, design, history, and what we think our readers will find interesting — not
        based on whether a retailer offers an affiliate programme. A piece is not more likely to be
        featured because there is a commission attached, and a piece is not excluded because there is not.
      </p>
      <p>
        Where an affiliate link is available, we use it. Where one is not, we link to the maker or
        retailer directly. The reader experience and the recommendation are the same either way.
      </p>

      <h2>Which articles contain affiliate links</h2>
      <p>
        Articles that contain affiliate links carry a brief disclosure near the top of the page. We do
        not bury this — if there is a commercial relationship in play, you will see it before you click.
      </p>
      <p>
        Editorial features, interviews, and essays generally do not contain affiliate links. Shopping
        guides, gift edits, and round-ups are the most likely to.
      </p>

      <h2>Affiliate networks we work with</h2>
      <p>
        We work with a small number of established affiliate networks, including Awin, Skimlinks, and
        direct partnerships with selected retailers. When you click an affiliate link, the retailer
        may set their own cookies to attribute the referral. We do not receive any personal data
        about you from these transactions — only an aggregate commission report.
      </p>

      <h2>Sponsored content</h2>
      <p>
        Sponsored content is a different thing entirely. Where a piece has been paid for by a brand
        or maker, it is clearly labelled as <em>Sponsored</em> or <em>Partner content</em> at the top
        of the article. Sponsored content is rare on The Gem and is always editorially reviewed.
      </p>

      <h2>Gifts and press samples</h2>
      <p>
        From time to time, makers and brands send pieces for review or photography. Receiving a sample
        does not guarantee coverage, and we disclose when a piece featured in an article was provided
        by the maker. We do not accept paid placement disguised as editorial.
      </p>

      <h2>Questions</h2>
      <p>
        If you have any questions about affiliate links, sponsored content, or our editorial
        independence, please use the <a href="/contact">contact page</a>. We are happy to answer.
      </p>
    </div>
  )
}
