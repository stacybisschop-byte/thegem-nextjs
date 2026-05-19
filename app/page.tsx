import Image from 'next/image'
import Link from 'next/link'
import { getHomePageData } from '@/lib/queries'
import { urlForImage, articleHref } from '@/lib/sanity'
import ArticleCard from '@/components/ArticleCard'
import Newsletter from '@/components/Newsletter'
import styles from './home.module.css'

export const revalidate = 60

// ── Homepage FAQPage schema ────────────────────────────────────────────────
// These questions answer the brand + modifier searches AI systems process.
// Brand name in every answer so cited snippets contain unambiguous attribution.
const homepageFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is The Gem?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Gem is an independent editorial jewellery publication based in London, covering the history, culture, and commerce of fine jewellery. The Gem was founded in 2026 by Florence, a magazine writer and editor with fifteen years of experience.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who writes The Gem?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Gem is edited and primarily written by Florence, a magazine writer and editor based in London. Florence has fifteen years of experience in features journalism and specialises in jewellery history, provenance, and buying guides.',
      },
    },
    {
      '@type': 'Question',
      name: 'What topics does The Gem cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Gem covers three areas: Stories (long-form jewellery history and provenance, from royal jewels to celebrity collections), Guides (practical buying guides, market analysis, and ownership advice), and Style (how to wear jewellery and build a wardrobe in 2026).',
      },
    },
    {
      '@type': 'Question',
      name: 'Is The Gem free to read?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All content on The Gem is free to read. The Gem is supported by affiliate commissions on buying guides — affiliate relationships are disclosed on every article that contains them.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does The Gem have a newsletter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Gem publishes a weekly newsletter every Friday. Each issue contains one long piece worth reading, three things worth knowing, and one thing worth buying. It is free to subscribe.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does The Gem cover men\'s jewellery?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Gem covers jewellery for men and women. The Gem\'s Style section includes guides on wearing jewellery as a man in 2026, and the Guides section includes a dedicated piece on the best signet rings for men.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are The Gem\'s buying guides independent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Gem\'s editorial is independent. Buying guides recommend products and retailers the editor would recommend to a friend, regardless of commercial relationships. Where affiliate links are used, they are disclosed clearly in the article.',
      },
    },
  ],
}

export default async function HomePage() {
  const { latest, stories, guides, style, recent, storiesHeadline, guidesHeadline } =
    await getHomePageData()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
      />

      {/* ── Hero Feature ────────────────────────────────────────────── */}
      {latest[0] && (() => {
        const lead = latest[0]
        const src = lead.heroImage
          ? urlForImage(lead.heroImage).width(2400).height(1350).url()
          : lead.heroImageUrl ?? null
        const alt = lead.heroImage?.alt ?? lead.heroImageAlt ?? lead.title
        const kicker = `${lead.pillar}${lead.kickerExtra ? ` · ${lead.kickerExtra}` : ''}`
        return (
          <Link href={articleHref(lead)} className="hero-feature">
            {src && (
              <div className="image-wrap">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  priority
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
            <div className="scrim" />
            <div className="hero-feature-content">
              <div className="kicker">{kicker}</div>
              <h1
                dangerouslySetInnerHTML={{
                  __html: lead.title.replace(/\*([^*]+)\*/g, '<em>$1</em>'),
                }}
              />
              {lead.metaDescription && <p className="deck">{lead.metaDescription}</p>}
              <div className="meta">
                <span>By Florence</span>
                <span className="meta-dot" />
                <span>{lead.readMin ?? 10} min read</span>
              </div>
            </div>
          </Link>
        )
      })()}

      {/* ── Also New This Week (slots 2 + 3) ────────────────────────── */}
      {(latest[1] || latest[2]) && (
        <section className={styles.alsoNew}>
          <div className="section-head">
            <h2>Also new <em>this week</em></h2>
          </div>
          <div className={styles.alsoNewGrid}>
            {latest[1] && <ArticleCard article={latest[1]} size="medium" showExcerpt />}
            {latest[2] && <ArticleCard article={latest[2]} size="medium" showExcerpt />}
          </div>
        </section>
      )}

      {/* ── Editorial Break ─────────────────────────────────────────── */}
      <div className={styles.editorialBreak}>
        <span className="quote-mark">&ldquo;</span>
        <blockquote>
          For people who buy beautiful things,<br />
          and want to know the <em>story</em> behind them.
        </blockquote>
        <cite>— The Gem, since 2026</cite>
      </div>

      {/* ── Stories + Guides Pillar Pair ────────────────────────────── */}
      <div className="section-head">
        <h2>Two stories, one <em>obsession</em></h2>
        <Link href="/stories">More stories →</Link>
      </div>

      <section className={styles.pillarPair}>
        <div className={styles.pillarBlock}>
          {storiesHeadline && (
            <>
              <div className="pillar-label">The Stories</div>
              <Link href={articleHref(storiesHeadline)} className="headline-card">
                {(() => {
                  const src = storiesHeadline.heroImage
                    ? urlForImage(storiesHeadline.heroImage).width(800).height(533).url()
                    : storiesHeadline.heroImageUrl ?? null
                  const alt = storiesHeadline.heroImage?.alt ?? storiesHeadline.heroImageAlt ?? storiesHeadline.title
                  return src ? (
                    <div className="image-wrap">
                      <Image
                        src={src}
                        alt={alt}
                        width={800} height={533}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </div>
                  ) : null
                })()}
                <h3 dangerouslySetInnerHTML={{ __html: storiesHeadline.title }} />
                {storiesHeadline.metaDescription && <p>{storiesHeadline.metaDescription}</p>}
              </Link>
            </>
          )}
          <ul className={styles.pillarList}>
            {stories.slice(0, 9).map((a) => (
              <li key={a._id}>
                <Link href={articleHref(a)}>
                  <span className="title" dangerouslySetInnerHTML={{ __html: a.title }} />
                  <span className="read-time">{a.readMin ?? 10} min</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.pillarBlock}>
          {guidesHeadline && (
            <>
              <div className="pillar-label">The Guides</div>
              <Link href={articleHref(guidesHeadline)} className="headline-card">
                {(() => {
                  const src = guidesHeadline.heroImage
                    ? urlForImage(guidesHeadline.heroImage).width(800).height(533).url()
                    : guidesHeadline.heroImageUrl ?? null
                  const alt = guidesHeadline.heroImage?.alt ?? guidesHeadline.heroImageAlt ?? guidesHeadline.title
                  return src ? (
                    <div className="image-wrap">
                      <Image
                        src={src}
                        alt={alt}
                        width={800} height={533}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </div>
                  ) : null
                })()}
                <h3 dangerouslySetInnerHTML={{ __html: guidesHeadline.title }} />
                {guidesHeadline.metaDescription && <p>{guidesHeadline.metaDescription}</p>}
              </Link>
            </>
          )}
          <ul className={styles.pillarList}>
            {guides.slice(0, 9).map((a) => (
              <li key={a._id}>
                <Link href={articleHref(a)}>
                  <span className="title" dangerouslySetInnerHTML={{ __html: a.title }} />
                  <span className="read-time">{a.readMin ?? 10} min</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Style Edit ──────────────────────────────────────────────── */}
      {style.length > 0 && (
        <>
          <div className="section-head">
            <h2>The <em>Style</em> edit</h2>
            <Link href="/style">More style →</Link>
          </div>
          <section className={styles.styleEdit}>
            {style.map((a) => (
              <ArticleCard key={a._id} article={a} size="medium" showExcerpt />
            ))}
          </section>
        </>
      )}

      <Newsletter />

      {/* ── Recent Grid ─────────────────────────────────────────────── */}
      <div className={styles.recentGridSection}>
        <div className="section-head" style={{ padding: 0, marginBottom: 40 }}>
          <h2>More from the <em>magazine</em></h2>
          <Link href="/archive">Full archive →</Link>
        </div>
        <div className={styles.recentGrid}>
          {recent.map((a) => (
            <ArticleCard key={a._id} article={a} size="recent" />
          ))}
        </div>
      </div>
    </>
  )
}
