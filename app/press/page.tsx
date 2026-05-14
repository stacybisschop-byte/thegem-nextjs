import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Press',
  description: 'Press information for The Gem — what we cover, how to send samples and pitches, and our editorial standards.',
}

export default function PressPage() {
  return (
    <div className="article-body" style={{ maxWidth: 720, margin: '80px auto', padding: '0 var(--pad-x) 80px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-accessible)', marginBottom: 24 }}>
        The Gem
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24 }}>
        Press
      </h1>

      <p>
        Thank you for considering The Gem. This page covers what we cover, what we don&rsquo;t, and how
        to reach us. For anything not addressed here, email <a href="mailto:thegemmag@proton.me">thegemmag@proton.me</a>.
      </p>

      <h2>What we cover</h2>
      <p>
        Fine jewellery and the houses, makers, and stones behind it. Historical pieces, market
        analysis, considered buying guides, and the cultural context of how jewellery is made,
        worn, and valued. We&rsquo;re interested in craft, provenance, and the story; less interested in
        what is simply new.
      </p>

      <h2>Editorial independence</h2>
      <p>
        All editorial decisions are made independently. We do not accept paid placement. Where a
        piece contains affiliate links, that is disclosed at the top of the article. See our{' '}
        <a href="/affiliate-disclosure">affiliate disclosure</a> for the full position.
      </p>
      <p>
        Sending us a sample, hosting us at an event, or arranging an interview does not guarantee
        coverage. If a piece featured in an article was provided by the maker, we say so in the
        article.
      </p>

      <h2>Sending samples</h2>
      <p>
        We accept samples for editorial review by prior arrangement only. Please email us first
        with the piece, the maker, and what you&rsquo;d like considered. We&rsquo;ll let you know whether it
        fits an upcoming piece before anything is shipped.
      </p>

      <h2>Launches and pitches</h2>
      <p>
        Pitches are read but rarely answered individually. Please keep them short and lead with the
        story, not the product. We are most likely to cover launches that have an angle beyond
        availability — a new technique, an unusual stone, a meaningful change in approach.
      </p>

      <h2>Interviews</h2>
      <p>
        Florence is occasionally available for interviews about jewellery, the publication, and the
        wider market. Please email <a href="mailto:thegemmag@proton.me">thegemmag@proton.me</a> with the
        outlet, the angle, and your deadline.
      </p>

      <h2>Logos and assets</h2>
      <p>
        High-resolution logos and a short publication bio are available on request from{' '}
        <a href="mailto:thegemmag@proton.me">thegemmag@proton.me</a>.
      </p>
    </div>
  )
}
