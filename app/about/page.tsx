import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Florence',
  description:
    'About Florence, founding editor of The Gem. Magazine writer and editor based in London with fifteen years of experience.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    siteName: 'The Gem',
    locale: 'en_GB',
    url: '/about',
    title: 'About Florence',
    description:
      'About Florence, founding editor of The Gem. Magazine writer and editor based in London with fifteen years of experience.',
    images: [{ url: '/og-cover.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/og-cover.jpg'],
  },
}

const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Florence',
    url: 'https://thegem.press/about',
    jobTitle: 'Founding Editor',
    worksFor: {
      '@type': 'Organization',
      name: 'The Gem',
      url: 'https://thegem.press',
    },
    description:
      'Florence is the founding editor of The Gem, a London-based editorial publication on fine jewellery. She has fifteen years of experience as a magazine writer and editor.',
    knowsAbout: [
      'fine jewellery',
      'gemstones',
      'jewellery history',
      'antique jewellery',
      'vintage jewellery',
      'diamond grading',
      'jewellery valuation',
      'Cartier',
      'Tiffany & Co',
      'Victorian jewellery',
      'Art Deco jewellery',
      'jewellery investment',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      addressCountry: 'GB',
    },
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />

      <div
        className="article-body"
        style={{ maxWidth: 720, margin: '80px auto', padding: '0 var(--pad-x) 80px' }}
      >
        <header style={{ marginBottom: '3em' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gold-accessible)',
              marginBottom: 24,
            }}
          >
            The Gem · About
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              fontVariationSettings: "'opsz' 72, 'SOFT' 20",
            }}
          >
            About{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold-large)', fontWeight: 200 }}>
              Florence
            </em>
          </h1>
        </header>

        <p>
          A few years ago I bought a Victorian mourning brooch at an antiques fair in Suffolk for
          £40. Black enamel, a small woven plait of hair under glass, an inscription on the back
          that I had to take to a museum in Bath to decipher from copperplate. It had belonged to
          a Sarah Cooke, who lost her husband Edward in 1862, and who I&rsquo;m fairly sure went
          on to live another forty years and remarry someone called Joseph. That brooch sits in a
          bowl on my dresser. It cost less than a nice dinner. It&rsquo;s the most interesting
          thing I own.
        </p>

        <p>
          This is what I think jewellery is for. Not the stone. The stone is sometimes nice,
          sometimes spectacular, sometimes worth more than a small flat in Glasgow. But the stone
          is also a slightly absurd lump of crystallised carbon, or a chunk of beryl that grew in
          a Brazilian pocket of rock, and on its own it tells you nothing. What I want to
          know &mdash; what I think most people who buy beautiful things actually want to
          know &mdash; is the story behind it. Who wore it first. Why it was made the way it was
          made. What it meant to wear a black diamond in 1840, or rubies in mourning, or pearls
          at a coronation. Whether the curse on a particular diamond is real (it isn&rsquo;t),
          and why people kept believing in it anyway (a much more interesting question).
        </p>

        <p>
          The Gem exists because I couldn&rsquo;t find a publication that took both halves of
          this seriously: the beauty and the history, the aspiration and the strange. There are
          jewellery sites that read like trade catalogues, and history sites that treat anything
          decorative as somehow lesser. Neither felt like home. So I built this one.
        </p>

        <h2>A bit about me</h2>

        <p>
          I grew up in Yorkshire, came to London for university, and never quite left. I trained
          as a magazine writer and editor and have been doing one or the other for fifteen years.
          I live near the King&rsquo;s Road in a flat with too many books and one very specific
          cat. I spend most Saturdays at auction previews or in the jewellery rooms of the
          V&amp;A, both of which I recommend even &mdash; especially &mdash; if you have no plans
          to buy anything. The pieces I own are a complete mess: a Cartier-something from my
          grandmother, a signet I bought myself for my thirtieth that I wear every day, several
          rings that cost about £30 each and that I love equally, and the Sarah Cooke brooch.
        </p>

        <h2>What you&rsquo;ll find here</h2>

        <p>
          Long-form writing on the history and provenance of particular pieces, from royal jewels
          to celebrity collections to the strange and the spectacular. Style writing on how people
          actually wear things in 2026, men and women, formally and not. And proper buying guides,
          the kind I&rsquo;d write for a friend who&rsquo;d asked me where to begin. The guides
          carry affiliate links and I&rsquo;ll tell you that openly. They never recommend a brand
          I wouldn&rsquo;t recommend to that friend.
        </p>

        <p>
          I write most of what&rsquo;s here, with occasional commissions from people whose work I
          admire: photographers, jewellers, historians, the woman who runs the antiques stall
          where I bought the brooch. If you&rsquo;ve come across something I should know about,
          I&rsquo;d like to hear from you. The <a href="/contact">contact page</a> works.
        </p>

        <p
          style={{
            marginTop: '3em',
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 22,
            fontWeight: 300,
          }}
        >
          &mdash; Florence
        </p>
      </div>
    </>
  )
}
