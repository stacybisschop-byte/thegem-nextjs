import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPillarArticles } from '@/lib/queries'
import ArticleCard from '@/components/ArticleCard'

const PILLARS = {
  stories: {
    title: 'Stories',
    description: 'History, provenance, and the strange lives of remarkable jewels.',
  },
  guides: {
    title: 'Guides',
    description: 'Practical buying guides, market analysis, and everything you need to know before you spend.',
  },
  style: {
    title: 'Style',
    description: 'How to wear jewellery in 2026. Rules, references, and the edit worth building.',
  },
}

export async function generateMetadata({ params }: { params: { pillar: string } }): Promise<Metadata> {
  const pillar = PILLARS[params.pillar as keyof typeof PILLARS]
  if (!pillar) return {}
  return { title: pillar.title, description: pillar.description }
}

export default async function PillarPage({ params }: { params: { pillar: string } }) {
  const meta = PILLARS[params.pillar as keyof typeof PILLARS]
  if (!meta) notFound()

  const articles = await getPillarArticles(params.pillar)

  return (
    <>
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