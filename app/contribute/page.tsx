import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contribute',
  description: 'How to pitch The Gem. What we publish, what we pay, and what we are looking for from outside writers.',
  alternates: { canonical: '/contribute' },
  openGraph: {
    type: 'website',
    siteName: 'The Gem',
    locale: 'en_GB',
    url: '/contribute',
    title: 'Contribute',
    description: 'How to pitch The Gem. What we publish, what we pay, and what we are looking for from outside writers.',
    images: [{ url: '/og-cover-v2.webp', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/og-cover-v2.webp'],
  },
}

export default function ContributePage() {
  return (
    <div className="article-body" style={{ maxWidth: 720, margin: '80px auto', padding: '0 var(--pad-x) 80px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-accessible)', marginBottom: 24 }}>
        The Gem
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24 }}>
        Contribute
      </h1>

      <p>
        Most pieces on The Gem are written by Florence. We commission a small number of outside
        contributors each year â€” writers whose work we already know and admire, or who arrive with a
        story we couldn&rsquo;t have written ourselves.
      </p>

      <h2>What we publish</h2>
      <p>
        Long-form history and provenance pieces. Reported features on specific houses, makers, or
        markets. Considered buying guides written by people who actually buy. First-person essays
        only when the writer has unusual access or expertise.
      </p>
      <p>
        We do not publish: thin trend pieces, listicles, anything written to a brand brief, or generic
        round-ups assembled from press releases.
      </p>

      <h2>How to pitch</h2>
      <p>
        Send a short pitch â€” three to five paragraphs â€” to <a href="mailto:thegemmag@proton.me">thegemmag@proton.me</a>.
        Tell us what the piece is, why it matters, who you&rsquo;d talk to, and roughly how long it would
        be. Attach two or three published clips.
      </p>
      <p>
        Please do not send finished drafts on spec. We will not read them.
      </p>

      <h2>Rates</h2>
      <p>
        We pay competitively for commissioned work. The exact rate depends on length and complexity
        and is agreed before you start writing. We pay within thirty days of acceptance.
      </p>

      <h2>What you can expect</h2>
      <p>
        A reply within two weeks. Edits that take the piece seriously. Your byline, a short bio, and
        a link to wherever you want readers to find you next. Your piece treated as yours â€” we edit
        for clarity and fact, not voice.
      </p>
    </div>
  )
}

