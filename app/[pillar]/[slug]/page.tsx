import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getArticle, getAllArticleSlugs, getRelatedArticles } from '@/lib/queries'
import { urlForImage, readMin } from '@/lib/sanity'
import ArticleBody, { extractFAQs } from '@/components/ArticleBody'
import ArticleCard from '@/components/ArticleCard'
import Newsletter from '@/components/Newsletter'

interface Props {
  params: { pillar: string; slug: string }
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs.map(({ pillar, slug }) => ({ pillar, slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.pillar, params.slug)
  if (!article) return {}

  const ogImage = article.heroImage
    ? urlForImage(article.heroImage).width(1200).height(630).url()
    : undefined

  return {
    title: article.metaTitle ?? article.title,
    description: article.metaDescription,
    openGraph: {
      title: article.metaTitle ?? article.title,
      description: article.metaDescription,
      type: 'article',
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
  const faqs = extractFAQs(article.body)
  const readingMin = readMin(article.body)

  const heroSrc = article.heroImage
    ? urlForImage(article.heroImage).width(1600).height(900).url()
    : null

  const kicker = `${article.pillar} · ${article.kickerExtra ?? 'The Gem'}`
  const articleUrl = `https://thegem.press/${params.pillar}/${params.slug}`
  const pillarName = article.pillar.charAt(0).toUpperCase() + article.pillar.slice(1)

  // ── Structured data ────────────────────────────────────────────

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    author: {
      '@type': 'Person',
      name: article.author ?? 'Florence',
      url: 'https://thegem.press/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Gem',
      url: 'https://thegem.press',
    },
    datePublished: article.publishedAt,
    dateModified: article.lastReviewedAt ?? article.publishedAt,
    url: articleUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    articleSection: article.pillar,
    ...(heroSrc && { image: heroSrc }),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.article-hero .deck', '.article-body p:first-of-type'],
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thegem.press' },
      {
        '@type': 'ListItem',
        position: 2,
        name: pillarName,
        item: `https://thegem.press/${params.pillar}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  }

  const authorJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Florence',
    url: 'https://thegem.press/about',
    jobTitle: 'Founding Editor',
    worksFor: { '@type': 'Organization', name: 'The Gem', url: 'https://thegem.press' },
    description:
      'Magazine writer and editor based in London with fifteen years of experience.',
    knowsAbout: [
      'fine jewellery', 'gemstones', 'jewellery history', 'antique jewellery',
      'vintage jewellery', 'diamond grading', 'jewellery valuation',
    ],
  }

  const faqJsonLd =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(({ question, answer }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: answer },
          })),
        }
      : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(authorJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

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

      <header className="article-hero">
        <div className="kicker">{kicker}</div>
        <h1>{article.title}</h1>
        {article.metaDescription && <p className="deck">{article.metaDescription}</p>}
        <div className="article-meta">
          <span className="byline">By {article.author ?? 'Florence'}</span>
          <span className="meta-dot" />
          <span className="byline">{readingMin} min read</span>
          {article.publishedAt && (
            <>
              <span className="meta-dot" />
              <span className="byline">
                {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </>
          )}
        </div>
      </header>

      {heroSrc && (
        <div className="article-hero-image">
          <div className="image-wrap">
            <Image
              src={heroSrc}
              alt={article.heroImage?.alt ?? article.title}
              width={1600}
              height={900}
              priority
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
          {article.heroImage?.caption && <p className="caption">{article.heroImage.caption}</p>}
        </div>
      )}

      <article>
        <ArticleBody body={article.body} />
      </article>

      <div className="article-footer">
        <div className="avatar">F</div>
        <div className="bio">
          <strong>Florence</strong>
          <p>
            Founding editor of The Gem. Writes about jewellery, history, and what to actually buy.
            Lives near the King&apos;s Road in London with too many books.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related-section">
          <h2>Further <em>reading</em></h2>
          <p className="subhead">Pieces that pair well with this one.</p>
          <div className="related-grid">
            {related.map((a) => (
              <ArticleCard key={a._id} article={a} size="medium" showExcerpt={false} />
            ))}
          </div>
        </section>
      )}

      <Newsletter />
    </>
  )
}
