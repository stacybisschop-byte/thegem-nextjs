import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getHomePageData } from '@/lib/queries'
import { urlForImage, articleHref } from '@/lib/sanity'
import ArticleCard from '@/components/ArticleCard'
import Newsletter from '@/components/Newsletter'

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
            <div className="hero-feature-text">
              <div className="kicker">{kicker}</div>
              <h1
                dangerouslySetInnerHTML={{
                  __html: lead.title.replace(/\*([^*]+)\*/g, '<em>$1</em>'),
                }}
              />
              {lead.metaDescription && <p className="deck">{lead.metaDescription}</p>}
              <span className="hero-read-more">Read More</span>
            </div>
            {src && (
              <div className="image-wrap">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
          </Link>
        )
      })()}

      {/* ── Also New This Week (slots 2 + 3) ────────────────────────── */}
      {(latest[1] || latest[2]) && (
        <section className="alsoNew">
          <div className="section-head">
            <h2>Also new <em>this week</em></h2>
          </div>
          <div className="alsoNewGrid">
            {latest[1] && <ArticleCard article={latest[1]} size="medium" showExcerpt />}
            {latest[2] && <ArticleCard article={latest[2]} size="medium" showExcerpt />}
          </div>
        </section>
      )}

      {/* ── Editorial Break ─────────────────────────────────────────── */}
      <div className="editorialBreak">
        <span className="quote-mark">&ldquo;</span>
        <blockquote>
          For people who buy beautiful things,<br />
          and want to know the <em>story</em> behind them.
        </blockquote>
        <cite>— The Gem, since 2026</cite>
      </div>

      {/* ── The Guides ──────────────────────────────────────────────── */}
      <div className="section-head">
        <h2>The <em>Guides</em></h2>
        <Link href="/guides">More guides →</Link>
      </div>

      <section className="guidesGrid">
        {guidesHeadline && (() => {
          const src = guidesHeadline.heroImage
            ? urlForImage(guidesHeadline.heroImage).width(1200).height(800).url()
            : guidesHeadline.heroImageUrl ?? null
          const alt = guidesHeadline.heroImage?.alt ?? guidesHeadline.heroImageAlt ?? guidesHeadline.title
          const kicker = `${guidesHeadline.pillar}${guidesHeadline.kickerExtra ? ` · ${guidesHeadline.kickerExtra}` : ''}`
          return (
            <Link href={articleHref(guidesHeadline)} className="guide-card guide-card--featured">
              {src && (
                <div className="image-wrap">
                  <Image
                    src={src}
                    alt={alt}
                    width={1200}
                    height={800}
                    sizes="(max-width: 768px) 100vw, 60vw"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
              )}
              <div className="kicker">{kicker}</div>
              <h3 dangerouslySetInnerHTML={{ __html: guidesHeadline.title.replace(/\*([^*]+)\*/g, '<em>$1</em>') }} />
              {guidesHeadline.metaDescription && <p className="excerpt">{guidesHeadline.metaDescription}</p>}
            </Link>
          )
        })()}
        <div className="guide-card-grid">
          {guides.slice(0, 6).map((a) => {
            const src = a.heroImage
              ? urlForImage(a.heroImage).width(600).height(400).url()
              : a.heroImageUrl ?? null
            const alt = a.heroImage?.alt ?? a.heroImageAlt ?? a.title
            return (
              <Link key={a._id} href={articleHref(a)} className="guide-card guide-card--small">
                {src && (
                  <div className="image-wrap">
                    <Image
                      src={src}
                      alt={alt}
                      width={600}
                      height={400}
                      sizes="(max-width: 768px) 100vw, 20vw"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                )}
                <h3 dangerouslySetInnerHTML={{ __html: a.title.replace(/\*([^*]+)\*/g, '<em>$1</em>') }} />
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── From the Magazine (Stories) ──────────────────────────────── */}
      <div className="section-head">
        <h2>From the <em>magazine</em></h2>
        <Link href="/stories">More stories →</Link>
      </div>

      <section className="pillarSingle">
        <div className="pillarBlock">
          {storiesHeadline && (
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
          )}
          <ul className="pillarList">
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
      </section>

      {/* ── Style Edit ──────────────────────────────────────────────── */}
      {style.length > 0 && (
        <>
          <div className="section-head">
            <h2>The <em>Style</em> edit</h2>
            <Link href="/style">More style →</Link>
          </div>
          <section className="styleEdit">
            {style.map((a) => (
              <ArticleCard key={a._id} article={a} size="medium" showExcerpt />
            ))}
          </section>
        </>
      )}

      <Newsletter />

      {/* ── Recent Grid ─────────────────────────────────────────────── */}
      <div className="recentGridSection">
        <div className="section-head" style={{ padding: 0, marginBottom: 40 }}>
          <h2>More from the <em>magazine</em></h2>
          <Link href="/archive">Full archive →</Link>
        </div>
        <div className="recentGrid">
          {recent.map((a) => (
            <ArticleCard key={a._id} article={a} size="recent" />
          ))}
        </div>
      </div>
    </>
  )
}
