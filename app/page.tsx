import Image from 'next/image'
import Link from 'next/link'
import { getHomePageData } from '@/lib/queries'
import { urlForImage, articleHref } from '@/lib/sanity'
import ArticleCard from '@/components/ArticleCard'
import Newsletter from '@/components/Newsletter'

export const revalidate = 60 // ISR: revalidate every minute

export default async function HomePage() {
  const { latest, stories, guides, style, recent, storiesHeadline, guidesHeadline } =
    await getHomePageData()

  return (
    <>
      {/* ── Latest Grid ─────────────────────────────────────────────── */}
      <section className="latest-grid">
        {latest[0] && (
          <ArticleCard article={latest[0]} size="large" showExcerpt />
        )}
        {latest[1] && (
          <ArticleCard article={latest[1]} size="medium" showExcerpt />
        )}
        {latest[2] && (
          <ArticleCard article={latest[2]} size="medium" showExcerpt />
        )}
      </section>

      {/* ── Editorial Break ─────────────────────────────────────────── */}
      <div className="editorial-break">
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

      <section className="pillar-pair">
        {/* Stories */}
        <div className="pillar-block">
          {storiesHeadline && (
            <>
              <div className="pillar-label">The Stories · Cursed Stones</div>
              <Link href={articleHref(storiesHeadline)} className="headline-card">
                {storiesHeadline.heroImage && (
                  <div className="image-wrap">
                    <Image
                      src={urlForImage(storiesHeadline.heroImage).width(800).height(533).url()}
                      alt={storiesHeadline.heroImage.alt ?? storiesHeadline.title}
                      width={800}
                      height={533}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                )}
                <h3 dangerouslySetInnerHTML={{ __html: storiesHeadline.title }} />
                {storiesHeadline.metaDescription && (
                  <p>{storiesHeadline.metaDescription}</p>
                )}
              </Link>
            </>
          )}
          <ul className="pillar-list">
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

        {/* Guides */}
        <div className="pillar-block">
          {guidesHeadline && (
            <>
              <div className="pillar-label">The Guides · Considered Buying</div>
              <Link href={articleHref(guidesHeadline)} className="headline-card">
                {guidesHeadline.heroImage && (
                  <div className="image-wrap">
                    <Image
                      src={urlForImage(guidesHeadline.heroImage).width(800).height(533).url()}
                      alt={guidesHeadline.heroImage.alt ?? guidesHeadline.title}
                      width={800}
                      height={533}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                )}
                <h3 dangerouslySetInnerHTML={{ __html: guidesHeadline.title }} />
                {guidesHeadline.metaDescription && (
                  <p>{guidesHeadline.metaDescription}</p>
                )}
              </Link>
            </>
          )}
          <ul className="pillar-list">
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
          <section className="style-edit">
            {style.map((a) => (
              <ArticleCard key={a._id} article={a} size="medium" showExcerpt />
            ))}
          </section>
        </>
      )}

      {/* ── Newsletter ──────────────────────────────────────────────── */}
      <Newsletter />

      {/* ── Recent Grid ─────────────────────────────────────────────── */}
      <div className="recent-grid-section">
        <div className="section-head" style={{ padding: 0, marginBottom: 40 }}>
          <h2>More from the <em>magazine</em></h2>
          <Link href="/archive">Full archive →</Link>
        </div>
        <div className="recent-grid">
          {recent.map((a) => (
            <ArticleCard key={a._id} article={a} size="recent" />
          ))}
        </div>
      </div>
    </>
  )
}
