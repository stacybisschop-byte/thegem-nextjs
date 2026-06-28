import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How The Gem collects, uses, and protects your personal data. Fully compliant with GDPR and UK GDPR. Your privacy, clearly explained.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    type: 'website',
    siteName: 'The Gem',
    locale: 'en_GB',
    url: '/privacy',
    title: 'Privacy Policy',
    description: 'How The Gem collects, uses, and protects your personal data. Fully compliant with GDPR and UK GDPR. Your privacy, clearly explained.',
    images: [{ url: '/og-cover-v2.webp', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/og-cover-v2.webp'],
  },
}

const lastUpdated = '14 May 2026'

export default function PrivacyPage() {
  return (
    <div className="article-body" style={{ maxWidth: 720, margin: '80px auto', padding: '0 var(--pad-x) 80px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-accessible)', marginBottom: 24 }}>
        Legal
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
        Privacy Policy
      </h1>
      <p style={{ color: 'var(--ink-muted)', fontSize: 14, marginBottom: 48 }}>Last updated: {lastUpdated}</p>

      <h2>Who we are</h2>
      <p>
        The Gem is an editorial jewellery publication operated by Florence Bisschop, based in London, England.
        When this policy refers to "we", "us", or "The Gem", it means the publication and its editor.
      </p>
      <p>
        You can contact us at any time via the <a href="/contact">contact page</a>. For data protection
        enquiries specifically, please mark your message "Data Protection".
      </p>

      <h2>What data we collect</h2>
      <p>We collect minimal personal data. The categories are:</p>
      <p>
        <strong>Newsletter subscriptions.</strong> If you subscribe to our newsletter via Beehiiv, we
        collect your email address. This is processed by Beehiiv Inc. under their own privacy policy.
        We use it only to send The Gem newsletter. You can unsubscribe at any time via the link in any
        email we send.
      </p>
      <p>
        <strong>Analytics data.</strong> We use Fathom Analytics, a privacy-first analytics service
        that does not use cookies, does not track individuals across sites, and does not sell data.
        Fathom processes aggregated, anonymised data about page visits. No personal data is stored.
        Fathom is GDPR compliant and processes data within the European Economic Area.
      </p>
      <p>
        <strong>Contact form submissions.</strong> If you use our contact form, we receive the message
        content and the email address you provide. We use this only to respond to your enquiry.
      </p>
      <p>
        <strong>Server logs.</strong> Our hosting provider (Vercel Inc.) collects standard server logs
        including IP addresses, browser type, and pages visited. These are retained for 30 days for
        security and performance purposes.
      </p>

      <h2>Legal basis for processing</h2>
      <p>
        <strong>Newsletter.</strong> Consent (Article 6(1)(a) UK GDPR). You provide explicit consent
        when you subscribe. You can withdraw consent at any time by unsubscribing.
      </p>
      <p>
        <strong>Analytics.</strong> Legitimate interests (Article 6(1)(f) UK GDPR). We have a
        legitimate interest in understanding how our content is used to improve it. Fathom&rsquo;s
        privacy-first approach means this does not materially affect your privacy.
      </p>
      <p>
        <strong>Contact form.</strong> Legitimate interests â€” responding to your enquiry.
      </p>

      <h2>How long we keep data</h2>
      <p>
        Newsletter subscriptions are held until you unsubscribe. Contact form submissions are retained
        for 12 months then deleted. Server logs are retained by Vercel for 30 days. Analytics data is
        anonymised and aggregated â€” no individual records are retained.
      </p>

      <h2>Third parties</h2>
      <p>We share data with the following third parties as part of running the publication:</p>
      <p>
        <strong>Vercel Inc.</strong> (hosting) â€” processes server logs. Privacy policy at vercel.com/legal/privacy-policy.
      </p>
      <p>
        <strong>Beehiiv Inc.</strong> (newsletter) â€” processes email addresses of subscribers.
        Privacy policy at beehiiv.com/privacy.
      </p>
      <p>
        <strong>Fathom Analytics</strong> â€” processes anonymised analytics. Privacy policy at usefathom.com/privacy.
      </p>
      <p>
        <strong>Sanity.io</strong> (content management) â€” stores article content. No personal
        data is stored in our content management system.
      </p>
      <p>
        <strong>Affiliate partners.</strong> Some articles contain affiliate links. When you click
        an affiliate link and make a purchase, the retailer may set their own cookies. We do not receive
        personal data from affiliate transactions â€” we receive a commission only. Affiliate relationships
        are disclosed in every article that contains them.
      </p>
      <p>We do not sell personal data. We do not use data for advertising or profiling.</p>

      <h2>Cookies</h2>
      <p>
        The Gem does not set first-party cookies. Fathom Analytics does not use cookies. If you
        click affiliate links, third-party retailers may set their own cookies â€” these are governed
        by their own privacy policies.
      </p>

      <h2>Your rights</h2>
      <p>Under UK GDPR, you have the following rights regarding your personal data:</p>
      <p>
        The right to access your data. The right to correct inaccurate data. The right to erasure
        ("the right to be forgotten"). The right to restrict processing. The right to data portability.
        The right to object to processing. The right to withdraw consent at any time (for data processed
        on a consent basis).
      </p>
      <p>
        To exercise any of these rights, contact us via the <a href="/contact">contact page</a>.
        We will respond within 30 days.
      </p>
      <p>
        You also have the right to lodge a complaint with the Information Commissioner&rsquo;s Office
        (ICO) at ico.org.uk if you believe we have handled your data unlawfully.
      </p>

      <h2>International transfers</h2>
      <p>
        Some of our third-party processors (Vercel, Beehiiv) are based in the United States. Data
        transfers are covered by Standard Contractual Clauses under UK GDPR and the UK-US Data Bridge
        where applicable.
      </p>

      <h2>Children</h2>
      <p>
        The Gem is not directed at children under 16. We do not knowingly collect personal data
        from anyone under 16.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top of this page reflects when
        it was last revised. Significant changes will be announced in the newsletter.
      </p>

      <h2>Contact</h2>
      <p>
        For any questions about this policy or how we handle your data, please use the{' '}
        <a href="/contact">contact page</a> and mark your message "Data Protection".
      </p>
    </div>
  )
}

