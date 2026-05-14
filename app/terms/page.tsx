import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for The Gem, the editorial jewellery publication.',
}

const lastUpdated = '14 May 2026'

export default function TermsPage() {
  return (
    <div className="article-body" style={{ maxWidth: 720, margin: '80px auto', padding: '0 var(--pad-x) 80px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>
        Legal
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
        Terms of Use
      </h1>
      <p style={{ color: 'var(--ink-muted)', fontSize: 14, marginBottom: 48 }}>Last updated: {lastUpdated}</p>

      <h2>Acceptance of terms</h2>
      <p>
        By accessing or using thegem.press (the "Site"), you agree to be bound by these Terms of Use.
        If you do not agree, please do not use the Site. These terms are governed by the laws of
        England and Wales.
      </p>

      <h2>Who we are</h2>
      <p>
        The Gem is an editorial publication operated by Florence Bisschop, based in London, England.
        References to "we", "us", or "The Gem" refer to the publication and its editor.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on the Site — including articles, text, images, and the site design — is the
        intellectual property of The Gem or its respective rights holders, and is protected by
        copyright and other applicable laws.
      </p>
      <p>
        You may read, share, and link to content on the Site for personal, non-commercial purposes.
        You may not reproduce, republish, or distribute substantial portions of our content without
        written permission. Short quotations with clear attribution and a link back to the original
        article are permitted.
      </p>
      <p>
        To request permission to reproduce content, contact us via the{' '}
        <a href="/contact">contact page</a>.
      </p>

      <h2>Affiliate disclosure</h2>
      <p>
        Some articles on The Gem contain affiliate links. If you click an affiliate link and make a
        purchase, we may earn a small commission at no additional cost to you. Affiliate relationships
        never influence our editorial recommendations — we only recommend products and retailers we
        would recommend to a friend. All articles containing affiliate links are labelled as such.
      </p>

      <h2>Accuracy of information</h2>
      <p>
        We take care to ensure the accuracy of content published on the Site, including market prices,
        historical facts, and gemological information. However, we cannot guarantee that all content
        is current or error-free. Jewellery markets change, and prices and availability referenced in
        articles may not reflect current conditions.
      </p>
      <p>
        Nothing on the Site constitutes financial, investment, legal, or professional advice. The Gem
        is an editorial publication. Any purchasing decisions you make based on content on the Site
        are your own responsibility.
      </p>

      <h2>External links</h2>
      <p>
        The Site contains links to external websites. These are provided for reference only. We do
        not control external sites and are not responsible for their content, accuracy, or privacy
        practices. Inclusion of a link does not constitute endorsement.
      </p>

      <h2>User conduct</h2>
      <p>
        You agree not to use the Site in any way that is unlawful, harmful, or disruptive. You agree
        not to attempt to gain unauthorised access to any part of the Site or its underlying systems.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, The Gem is not liable for any loss or damage arising
        from your use of the Site or reliance on its content. This includes direct, indirect,
        incidental, and consequential losses.
      </p>

      <h2>Privacy</h2>
      <p>
        Our <a href="/privacy">Privacy Policy</a> explains how we collect and use personal data.
        It forms part of these terms.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. Continued use of the Site after changes are
        posted constitutes acceptance of the updated terms.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of England and Wales. Any disputes will be subject to
        the exclusive jurisdiction of the courts of England and Wales.
      </p>

      <h2>Contact</h2>
      <p>
        For any questions about these terms, contact us via the{' '}
        <a href="/contact">contact page</a>.
      </p>
    </div>
  )
}
