import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'The Gem accessibility statement. Our commitment to WCAG 2.1 AA compliance.',
  alternates: { canonical: '/accessibility' },
  openGraph: {
    type: 'website',
    siteName: 'The Gem',
    locale: 'en_GB',
    url: '/accessibility',
    title: 'Accessibility Statement',
    description: 'The Gem accessibility statement. Our commitment to WCAG 2.1 AA compliance.',
    images: [{ url: '/og-cover.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/og-cover.jpg'],
  },
}

const lastUpdated = '14 May 2026'

export default function AccessibilityPage() {
  return (
    <div className="article-body" style={{ maxWidth: 720, margin: '80px auto', padding: '0 var(--pad-x) 80px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-accessible)', marginBottom: 24 }}>
        Legal
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
        Accessibility Statement
      </h1>
      <p style={{ color: 'var(--ink-muted)', fontSize: 14, marginBottom: 48 }}>Last updated: {lastUpdated}</p>

      <h2>Our commitment</h2>
      <p>
        The Gem is committed to making thegem.press accessible to as many people as possible. We aim
        to comply with the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA.
      </p>

      <h2>What we do</h2>
      <p>
        We use semantic HTML throughout the site to ensure content is readable by screen readers and
        other assistive technologies. All images include descriptive alt text. The site is navigable
        by keyboard. We maintain sufficient colour contrast between text and background. Heading
        structure follows a logical hierarchy (H1, H2, H3) on all pages. The site is responsive and
        readable on screen sizes from 320px upwards.
      </p>

      <h2>Known limitations</h2>
      <p>
        The Gem launched in May 2026. As a small independent publication, we are in the process of a
        full accessibility audit. Known areas we are working to improve:
      </p>
      <p>
        Hero images on some articles are currently placeholder images without full descriptive captions.
        We are in the process of replacing these with properly described editorial photography.
      </p>
      <p>
        The Sanity Studio at thegem.press/studio is a third-party application. Its accessibility is
        governed by Sanity&rsquo;s own policies.
      </p>

      <h2>Feedback and contact</h2>
      <p>
        We welcome feedback on the accessibility of The Gem. If you experience any barriers or have
        suggestions for improvement, please contact us via the{' '}
        <a href="/contact">contact page</a> and mark your message "Accessibility".
      </p>
      <p>
        We aim to respond to accessibility feedback within 10 working days.
      </p>

      <h2>Enforcement</h2>
      <p>
        If you are not satisfied with our response to an accessibility complaint, you may contact the
        Equality Advisory and Support Service (EASS) at equalityadvisoryservice.com.
      </p>

      <p style={{ marginTop: 48, fontSize: 14, color: 'var(--ink-muted)' }}>
        This statement was prepared on {lastUpdated} and will be reviewed annually.
      </p>
    </div>
  )
}
