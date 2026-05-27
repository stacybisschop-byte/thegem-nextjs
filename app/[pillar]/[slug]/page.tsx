import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getArticle, getAllArticleSlugs, getRelatedArticles } from '@/lib/queries'
import { urlForImage, readMin } from '@/lib/sanity'
import ArticleBody from '@/components/ArticleBody'
import ArticleCard from '@/components/ArticleCard'
import Newsletter from '@/components/Newsletter'
import styles from './article.module.css'

interface Props {
  params: { pillar: string; slug: string }
}

// Pre-render all published article routes at build time
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs.map(({ pillar, slug }) => ({ pillar, slug }))
}

// Dynamic Open Graph metadata per article
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.pillar, params.slug)
  if (!article) return {}

  // og:image must be absolute. Prefer Sanity heroImage, fall back to legacy
  // /blog/*.webp via heroImageUrl prefixed with the canonical origin.
  const sanityOgImage = article.heroImage
    ? urlForImage(article.heroImage).width(1200).height(630).url()
    : undefined
  const fallbackOgImage = !sanityOgImage && article.heroImageUrl
    ? article.heroImageUrl.startsWith('http')
      ? article.heroImageUrl
      : `https://thegem.press${article.heroImageUrl.startsWith('/') ? article.heroImageUrl : `/${article.heroImageUrl}`}`
    : undefined
  const ogImage = sanityOgImage ?? fallbackOgImage
  const path = `/${params.pillar}/${params.slug}`

  return {
    title: article.metaTitle ?? article.title,
    description: article.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      siteName: 'The Gem',
      locale: 'en_GB',
      url: path,
      title: article.metaTitle ?? article.title,
      description: article.metaDescription,
      publishedTime: article.publishedAt,
      authors: [article.author ?? 'Florence'],
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle ?? article.title,
      description: article.metaDescription,
      ...(ogImage && { images: [ogImage] }),
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticle(params.pillar, params.slug)
  if (!article) notFound()

  const related = await getRelatedArticles(article._id, article.pillar, 3)
  const wordCount = article.body.split(/\s+/).length
  const readingMin = readMin(article.body)

  const heroSrc = article.heroImage
    ? urlForImage(article.heroImage).width(1600).height(900).url()
    : article.heroImageUrl ?? null
  const heroAlt = article.heroImage?.alt ?? article.heroImageAlt ?? article.title

  const kicker = `${article.pillar} · ${article.kickerExtra ?? 'The Gem'}`

  // Schema image must be an absolute URL — heroImageUrl fallback may be relative.
  const schemaImage = heroSrc
    ? heroSrc.startsWith('http')
      ? heroSrc
      : `https://thegem.press${heroSrc.startsWith('/') ? heroSrc : `/${heroSrc}`}`
    : null

  // dateModified must be >= datePublished. Use Sanity's _updatedAt; clamp to
  // publishedAt for posts that have never been edited (where _updatedAt < publishedAt).
  const datePublished = article.publishedAt
  const dateModified =
    article._updatedAt && datePublished && article._updatedAt >= datePublished
      ? article._updatedAt
      : datePublished

  // JSON-LD structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    author: { '@type': 'Person', name: article.author ?? 'Florence' },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    publisher: {
      '@type': 'Organization',
      name: 'The Gem',
      url: 'https://thegem.press',
    },
    ...(schemaImage && { image: schemaImage }),
  }

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
        name: article.pillar,
        item: `https://thegem.press/${params.pillar}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://thegem.press/${params.pillar}/${params.slug}`,
      },
    ],
  }

  return (
    <>
      {/* ── Structured Data ──────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── Affiliate Disclosure ─────────────────────────────────────── */}
      {article.affiliateDisclosure && (
        <div
          style={{
            background: 'rgba(184,149,106,0.08)',
            borderTop: '1px solid var(--gold)',
            padding: '12px var(--pad-x)',
            textAlign: 'center',
            fontSize: 13,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.05em',
            color: 'var(--ink-muted)',
          }}
        >
          This article contains affiliate links. We earn a small commission on purchases made through them.
          We only recommend retailers we&apos;d send a friend to.
        </div>
      )}

      {/* ── Article Hero ─────────────────────────────────────────────── */}
      <header className={styles.articleHero}>
        <div className="kicker">{kicker}</div>
        <h1>{article.title}</h1>
        {article.metaDescription && (
          <p className="deck">{article.metaDescription}</p>
        )}
        <div className={styles.articleMeta}>
          <span className="byline">By {article.author ?? 'Florence'}</span>
          <span className="meta-dot" />
          <span className="byline">{readingMin} min read</span>
          {article.publishedAt && (
            <>
              <span className="meta-dot" />
              <time className="byline" dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </>
          )}
        </div>
      </header>

      {/* ── Hero Image ───────────────────────────────────────────────── */}
      {heroSrc && (
        <div className={styles.articleHeroImage}>
          <div className="image-wrap">
            <Image
              src={heroSrc}
              alt={heroAlt}
              width={1600}
              height={900}
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
          {article.heroImage?.caption && (
            <p className="caption">{article.heroImage.caption}</p>
          )}
        </div>
      )}

      {/* ── Article Body ─────────────────────────────────────────────── */}
      <article>
        <ArticleBody body={article.body} />
      </article>

      {/* ── Author Bio ───────────────────────────────────────────────── */}
      <div className={styles.articleFooter}>
        <div className="avatar">F</div>
        <div className="bio">
          <strong>Florence</strong>
          <p>
            Founding editor of The Gem. Writes about jewellery, history, and what to actually buy.
            Lives near the King&apos;s Road in London with too many books.
          </p>
        </div>
      </div>

      {/* ── Related Articles ─────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <h2>Further <em>reading</em></h2>
          <p className="subhead">Pieces that pair well with this one.</p>
          <div className={styles.relatedGrid}>
            {related.map((a) => (
              <ArticleCard key={a._id} article={a} size="medium" showExcerpt={false} />
            ))}
          </div>
        </section>
      )}

      {/* ── Newsletter ───────────────────────────────────────────────── */}
      <Newsletter />
    </>
  )
}
