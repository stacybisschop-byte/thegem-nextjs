import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPillarArticles } from '@/lib/queries'
import ArticleCard from '@/components/ArticleCard'

const PILLARS = {
  stories: {
    title: 'Stories',
    description: 'The history of fine jewellery told through the objects themselves. House histories, famous stones, royal collections, and the archaeology of what people wore.',
  },
  guides: {
    title: 'Guides',
    description: 'Buying guides and honest assessments of fine jewellery. Platinum vs white gold, Hatton Garden, Cartier Love pre-owned, and the diamond market in 2026.',
  },
  style: {
    title: 'Style',
    description: 'Practical guidance on wearing fine jewellery well. Layering necklaces, brooch placement, pearl types, and building a working jewellery wardrobe.',
  },
}

export async function generateMetadata({ params }: { params: { pillar: string } }): Promise<Metadata> {
  const pillar = PILLARS[params.pillar as keyof typeof PILLARS]
  if (!pillar) return {}
  const path = `/${params.pillar}`
  return {
    title: pillar.title,
    description: pillar.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: 'The Gem',
      locale: 'en_GB',
      url: path,
      title: pillar.title,
      description: pillar.description,
      images: [{ url: '/og-cover-v2.webp', width: 1200, height: 630 }],
    },
    twitter: {
      title: pillar.title,
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
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-accessible)', marginBottom: 20 }}>
          The Gem
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20, fontVariationSettings: "'opsz' 72, 'SOFT' 20" }}>
          {meta.title}
        </h1>
        <p style={{ fontSize: 18, color: 'var(--ink-muted)', maxWidth: 780, margin: '0 auto' }}>
          {meta.description}
        </p>
      </div>

      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--pad-x) 80px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} size="medium" showExcerpt />
        ))}
      </section>
    </>
  )
}
