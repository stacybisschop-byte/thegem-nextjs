import Link from 'next/link'
import Image from 'next/image'
import type { ArticleCard as ArticleCardType } from '@/lib/sanity'
import { urlForImage, articleHref } from '@/lib/sanity'

interface Props {
  article: ArticleCardType
  size?: 'large' | 'medium' | 'small' | 'recent'
  showExcerpt?: boolean
}

export default function ArticleCard({ article, size = 'medium', showExcerpt = true }: Props) {
  const href = articleHref(article)
  const kicker = `${article.pillar}${article.kickerExtra ? ` · ${article.kickerExtra}` : ''}`

  const heroSrc = article.heroImage
    ? urlForImage(article.heroImage).width(800).height(600).url()
    : null

  const cardClass = `article-card ${size}`

  if (size === 'recent') {
    return (
      <Link href={href} className="recent-card">
        <div className="image-wrap">
          {heroSrc ? (
            <Image
              src={heroSrc}
              alt={article.heroImage?.alt ?? article.title}
              width={400}
              height={500}
              className="image-fill"
            />
          ) : (
            <div className="image-fill" style={{ background: 'var(--border)' }} />
          )}
        </div>
        <div className="kicker">{article.pillar}</div>
        <h4
          dangerouslySetInnerHTML={{
            __html: article.title.replace(/\*([^*]+)\*/g, '<em>$1</em>'),
          }}
        />
        <div className="meta">
          <span>{article.readMin ?? 10} min read</span>
          <span className="meta-dot" />
          <span>
            {article.publishedAt
              ? new Date(article.publishedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
              : 'The Gem'}
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className={cardClass}>
      <div className="image-wrap" style={{ aspectRatio: size === 'large' ? '16/10' : '4/3' }}>
        {heroSrc ? (
          <Image
            src={heroSrc}
            alt={article.heroImage?.alt ?? article.title}
            fill
            className="image-fill"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="image-fill" style={{ background: 'var(--border)' }} />
        )}
      </div>
      <div className="kicker">{kicker}</div>
      <h3
        dangerouslySetInnerHTML={{
          __html: article.title.replace(/\*([^*]+)\*/g, '<em>$1</em>'),
        }}
      />
      {showExcerpt && article.metaDescription && (
        <p className="excerpt">{article.metaDescription}</p>
      )}
      <div className="meta">
        <span className="byline">By Florence</span>
        <span className="meta-dot" />
        <span className="byline">{article.readMin ?? 10} min read</span>
      </div>
    </Link>
  )
}
