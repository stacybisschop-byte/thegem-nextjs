import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'How to get in touch with The Gem — for editorial enquiries, corrections, press, and reader questions.',
}

export default function ContactPage() {
  return (
    <div className="article-body" style={{ maxWidth: 720, margin: '80px auto', padding: '0 var(--pad-x) 80px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-accessible)', marginBottom: 24 }}>
        The Gem
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24 }}>
        Contact
      </h1>

      <p>
        The Gem is edited by Florence in London. The fastest way to reach us is by email.
      </p>

      <h2>General enquiries</h2>
      <p>
        Editorial, reader questions, corrections, and everything else: <a href="mailto:thegemmag@proton.me">thegemmag@proton.me</a>.
        We read every email. Most replies go out within a couple of days.
      </p>

      <h2>Press</h2>
      <p>
        For press samples, launches, and pitch information, please see our <a href="/press">press page</a>{' '}
        before sending. It explains what we cover, what we don&rsquo;t, and how to send things.
      </p>

      <h2>Contributing</h2>
      <p>
        We accept a small number of pitches each month from writers whose work we already admire.
        Guidelines are on the <a href="/contribute">contribute page</a>.
      </p>

      <h2>Data protection</h2>
      <p>
        For questions about how we handle your data, see our <a href="/privacy">privacy policy</a>, or
        email us with the subject line <em>Data Protection</em>.
      </p>

      <h2>Corrections</h2>
      <p>
        If you spot something wrong — a date, a name, a sourcing error — please tell us. We correct
        promptly and note material changes at the foot of the affected article.
      </p>
    </div>
  )
}
