import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getHomePageData } from '@/lib/queries'
import { urlForImage, articleHref } from '@/lib/sanity'
import ArticleCard from '@/components/ArticleCard'
import Newsletter from '@/components/Newsletter'
import styles from './home.module.css'

export const metadata: Metadata = {
  description: 'The Gem is an editorial jewellery publication covering the history, culture, and commerce of fine jewellery. For people who buy beautiful things.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'The Gem',
    locale: 'en_GB',
    url: '/',
    description: 'The Gem is an editorial jewellery publication covering the history, culture, and commerce of fine jewellery. For people who buy beautiful things.',
    images: [{ url: '/og-cover.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/og-cover.jpg'],
  },
}

export const revalidate = 60

export default async function HomePage() {
  const { latest, stories, guides, style, recent, storiesHeadline, guidesHeadline } =
    await getHomePageData()

  return (
    <>
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
        <div className={styles.pillarLinks}>
          <Link href="/stories">More stories →</Link>
          <Link href="/guides">More guides →</Link>
        </div>
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
                        sizes="(max-width: 900px) 100vw, 650px"
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
                        sizes="(max-width: 900px) 100vw, 650px"
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
