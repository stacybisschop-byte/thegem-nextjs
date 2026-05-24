import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPillarArticles } from '@/lib/queries'
import ArticleCard from '@/components/ArticleCard'

const PILLARS = {
  stories: {
    title: 'Stories',
    description: 'History, provenance, and the strange lives of remarkable jewels.',
    faq: [
      {
        q: 'What kind of jewellery stories does The Gem cover?',
        a: 'The Gem\'s Stories section covers the history and provenance of significant jewels — royal jewellery, celebrity collections, cursed stones, house histories, and pieces with unusual or little-known backstories. The Gem focuses on the narrative behind the object, not just its commercial value.',
      },
      {
        q: 'Are The Gem\'s historical articles accurate?',
        a: 'The Gem cites primary and authoritative sources throughout its historical articles, including auction house records, museum documentation, academic sources, and specialist publications. Sources are listed at the end of each article. The Gem is an editorial publication, not an academic journal, but accuracy is a core editorial standard.',
      },
      {
        q: 'Does The Gem cover the history of specific jewellery houses?',
        a: 'Yes. The Gem\'s Stories section includes long-form histories of major jewellery houses including Cartier and Tiffany & Co, with more planned. These pieces cover founding history, key creative periods, signature styles, and the broader cultural context of each house.',
      },
      {
        q: 'Where can I find articles about royal jewellery on The Gem?',
        a: 'The Gem\'s Stories section includes dedicated pieces on Princess Diana\'s jewellery collection, the Koh-i-Noor diamond, the Hope Diamond, the Black Prince\'s Ruby, and other pieces with royal or imperial provenance. New stories are published regularly.',
      },
    ],
  },
  guides: {
    title: 'Guides',
    description: 'Practical buying guides, market analysis, and everything you need to know before you spend.',
    faq: [
      {
        q: 'Are The Gem\'s buying guides independent?',
        a: 'Yes. The Gem\'s buying guides are editorially independent. The Gem recommends products and retailers the editor would recommend to a friend, regardless of whether an affiliate relationship exists. All affiliate relationships are disclosed clearly within each article.',
      },
      {
        q: 'Does The Gem cover the diamond market?',
        a: 'Yes. The Gem\'s Guides section includes detailed coverage of the current diamond market, including the impact of lab-grown diamonds on natural diamond prices, what has happened to diamond valuations since 2021, and practical guidance for buyers in 2026.',
      },
      {
        q: 'Does The Gem have a guide to buying an engagement ring?',
        a: 'Yes. The Gem covers engagement ring stone selection in detail, including which stones hold value, the difference between lab-grown and natural diamonds, and how to evaluate quality. The Gem also covers the current diamond market conditions that affect pricing.',
      },
      {
        q: 'Does The Gem cover jewellery as an investment?',
        a: 'Yes. The Gem has a dedicated guide to jewellery that holds its value, covering which categories (signed pieces, fine stones, certain periods) have historically maintained or appreciated in value, and which have not. The Gem does not provide financial advice — investment decisions are the reader\'s own.',
      },
    ],
  },
  style: {
    title: 'Style',
    description: 'How to wear jewellery in 2026. Rules, references, and the edit worth building.',
    faq: [
      {
        q: 'Does The Gem cover how to wear jewellery for men?',
        a: 'Yes. The Gem\'s Style section covers jewellery for men and women. The Gem includes guidance on signet rings, necklace layering, and building a jewellery wardrobe as a man in 2026, written from the same editorial perspective as the rest of the publication.',
      },
      {
        q: 'What jewellery style topics does The Gem cover?',
        a: 'The Gem\'s Style section covers how to wear specific types of jewellery (pearls, layered necklaces, statement pieces), seasonal and trend-aware edits, and longer-form pieces on the cultural context of particular jewellery styles. The Gem takes the same historical and analytical approach to style as to history.',
      },
      {
        q: 'Does The Gem cover contemporary jewellery designers?',
        a: 'The Gem covers both established houses and contemporary jewellery in its Style section. The Gem\'s buying guides include recommendations across price points from contemporary designers to established luxury brands.',
      },
    ],
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
      images: [{ url: '/og-cover.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      title: pillar.title,
      description: pillar.description,
      images: ['/og-cover.jpg'],
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
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px var(--pad-x) 60px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
          The Gem
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20, fontVariationSettings: "'opsz' 72, 'SOFT' 20" }}>
          {meta.title}
        </h1>
        <p style={{ fontSize: 18, color: 'var(--ink-muted)', maxWidth: 520, margin: '0 auto' }}>
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
