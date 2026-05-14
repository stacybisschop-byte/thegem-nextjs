import type { Metadata } from 'next'
import Newsletter from '@/components/Newsletter'

export const metadata: Metadata = {
  title: 'The Newsletter',
  description: 'One letter from Florence every Friday morning. A long piece worth reading, three things worth knowing, one thing worth buying. Free.',
}

export default function NewsletterPage() {
  return (
    <>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px var(--pad-x) 40px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-accessible)', marginBottom: 20 }}>
          The Gem · Every Friday
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24 }}>
          One letter from <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Florence</em>, every Friday morning.
        </h1>
        <p style={{ fontSize: 18, color: 'var(--ink-muted)', lineHeight: 1.6, maxWidth: 560, margin: '0 auto' }}>
          A long piece worth reading, three things worth knowing, one thing worth buying. Free.
          No nonsense. Roughly twelve minutes of your week.
        </p>
      </div>

      <div className="article-body" style={{ maxWidth: 720, margin: '0 auto', padding: '0 var(--pad-x) 40px' }}>
        <h2>What you&rsquo;ll get</h2>
        <p>
          <strong>The long read.</strong> One piece chosen from the week&rsquo;s publishing — usually a
          history, a market analysis, or a considered guide. The kind of thing worth setting aside
          fifteen minutes for, not skimming on a phone.
        </p>
        <p>
          <strong>Three things worth knowing.</strong> Short notes on what&rsquo;s moving in the
          jewellery world — an auction result, a maker we&rsquo;ve been watching, a piece of news that
          actually matters. Curated, not aggregated.
        </p>
        <p>
          <strong>One thing worth buying.</strong> A single recommendation each week. Often a
          specific piece from a specific maker; sometimes a category or a vintage source. Affiliate
          links are used where available and always disclosed.
        </p>

        <h2>How often</h2>
        <p>
          Once a week. Friday morning, London time. No bonus emails, no autoresponder sequences, no
          launches. You can unsubscribe with one click from any issue.
        </p>

        <h2>The fine print</h2>
        <p>
          Your email is processed by Beehiiv on our behalf. We do not sell it, share it, or use it
          for anything other than sending this newsletter. See our{' '}
          <a href="/privacy">privacy policy</a> for the full position.
        </p>
      </div>

      <Newsletter />
    </>
  )
}
