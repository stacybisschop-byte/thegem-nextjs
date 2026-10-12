import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPillarArticles } from '@/lib/queries'
import ArticleCard from '@/components/ArticleCard'

const PILLARS = {
  stories: {
    title: 'Stories',
    metaTitle: 'Stories: Jewellery History & House Archives',
    description: 'The history of fine jewellery told through the objects themselves. House histories, famous stones, royal collections, and the archaeology of what people wore.',
    // On-page intro with internal links to cornerstone pieces. Kept separate
    // from `description`, which stays plain text for meta/OG tags.
    intro: (
      <>
        Stories is The Gem&apos;s archive of jewellery history: the great houses, the famous
        stones, and the people who wore them. Start with the{' '}
        <Link href="/stories/cartier-family-history">history of Cartier</Link> or{' '}
        <Link href="/stories/van-cleef-arpels-history">Van Cleef &amp; Arpels</Link>, follow{' '}
        <Link href="/stories/koh-i-noor">the Koh-i-Noor diamond</Link> through 700 years of
        argument, or see how <Link href="/stories/victorian-mourning-jewellery">Victorian mourning
        jewellery</Link> turned grief into gold. When a story makes you want to buy, our{' '}
        <Link href="/guides">jewellery buying guides</Link> cover the practical side.
      </>
    ),
  },
  guides: {
    title: 'Guides',
    metaTitle: 'Guides: Fine Jewellery Buying Advice',
    description: 'Buying guides and honest assessments of fine jewellery. Platinum vs white gold, Hatton Garden, Cartier Love pre-owned, and the diamond market in 2026.',
    intro: (
      <>
        Guides is independent, research-led buying advice on fine jewellery. Compare{' '}
        <Link href="/guides/lab-grown-vs-natural-diamonds">lab-grown and natural diamonds</Link>,
        choose between <Link href="/guides/platinum-vs-white-gold">platinum and white gold</Link>,
        learn to read <Link href="/guides/jewellery-hallmarks-uk">UK jewellery hallmarks</Link>,
        weigh up a <Link href="/guides/cartier-love-bracelet-guide">Cartier Love bracelet</Link>,
        and find out which jewellery{' '}
        <Link href="/guides/jewellery-that-holds-value">actually holds its value</Link>. For the
        history behind the houses, read our <Link href="/stories">jewellery history stories</Link>;
        for what to wear now, see <Link href="/edit">The Edit</Link>.
      </>
    ),
  },
  edit: {
    title: 'The Edit',
    metaTitle: 'The Edit: Seasonal Jewellery Style Picks',
    description: 'What is being worn now, what to buy because of it. Shop edits, trend pieces, and fashion-forward jewellery from Florence.',
    intro: (
      <>
        The Edit is The Gem&apos;s curated selection of fine jewellery to wear now, chosen by season
        and occasion. Browse the <Link href="/edit/autumn-jewellery-edit">autumn jewellery
        edit</Link>, learn the rules of <Link href="/edit/layering-necklaces">layering
        necklaces</Link> and <Link href="/edit/ring-stacking-guide">ring stacking</Link>, find
        what works for <Link href="/edit/jewellery-office-styling">office jewellery</Link>, or
        start with the <Link href="/edit/mens-jewellery-guide">men&apos;s jewellery edit</Link>.
        Before you buy, our <Link href="/guides">fine jewellery buying guides</Link> explain what
        you are paying for.
      </>
    ),
  },
}

export async function generateMetadata({ params }: { params: { pillar: string } }): Promise<Metadata> {
  const pillar = PILLARS[params.pillar as keyof typeof PILLARS]
  if (!pillar) return {}
  const path = `/${params.pillar}`
  return {
    title: pillar.metaTitle,
    description: pillar.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: 'The Gem',
      locale: 'en_GB',
      url: path,
      title: pillar.metaTitle,
      description: pillar.description,
      images: [{ url: '/og-cover-v2.webp', width: 1200, height: 630 }],
    },
    twitter: {
      title: pillar.metaTitle,
      description: pillar.description,
      images: ['/og-cover-v2.webp'],
    },
  }
}

export default async function PillarPage({ params }: { params: { pillar: string } }) {
  const meta = PILLARS[params.pillar as keyof typeof PILLARS]
  if (!meta) notFound()

  const articles = await getPillarArticles(params.pillar)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://thegem.press/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: meta.title,
        item: `https://thegem.press/${params.pillar}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px var(--pad-x) 60px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--chocolate-fondant)', marginBottom: 20 }}>
          The Gem
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20, fontVariationSettings: "'opsz' 72, 'SOFT' 20" }}>
          {meta.title}
        </h1>
        <p className="pillar-intro">
          {meta.intro}
        </p>
      </div>

      <section className="pillar-grid">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} size="medium" showExcerpt />
        ))}
      </section>
    </>
  )
}
