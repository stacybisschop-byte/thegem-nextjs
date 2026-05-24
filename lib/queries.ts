import { client } from './sanity'
import type { Article, ArticleCard } from './sanity'

// ---- Fragment: card fields (used everywhere we show a card/list item) --------
const CARD_FIELDS = `
  _id,
  title,
  slug,
  pillar,
  metaDescription,
  heroImage { asset, hotspot, alt, caption },
  heroImageUrl,
  heroImageAlt,
  kickerExtra,
  publishedAt,
  "readMin": round(length(body) / 1100),
  featured,
  featuredOrder
`

// ---- Fragment: full article --------------------------------------------------
const FULL_ARTICLE_FIELDS = `
  _id,
  _updatedAt,
  title,
  slug,
  pillar,
  author,
  published,
  publishedAt,
  metaTitle,
  metaDescription,
  heroImage { asset, hotspot, alt, caption },
  heroImageUrl,
  heroImageAlt,
  kickerExtra,
  body,
  affiliateDisclosure
`

// ---- Homepage ----------------------------------------------------------------

export interface HomePageData {
  latest: ArticleCard[]        // up to 3 featured articles for the Latest grid
  stories: ArticleCard[]       // up to 10 stories for the pillar list
  guides: ArticleCard[]        // up to 10 guides for the pillar list
  style: ArticleCard[]         // up to 5 style articles for the Style Edit block
  recent: ArticleCard[]        // up to 4 recent articles for the Recent grid
  storiesHeadline: ArticleCard | null
  guidesHeadline: ArticleCard | null
}

export async function getHomePageData(): Promise<HomePageData> {
  // Over-fetch so we can drop the headline articles from the list views below.
  const data = await client.fetch<HomePageData>(
    `{
      "latest": *[_type == "article" && published == true && featured == true]
               | order(featuredOrder asc)[0...3] { ${CARD_FIELDS} },

      "storiesHeadline": *[_type == "article" && published == true && pillar == "Stories" && featured != true]
               | order(publishedAt desc)[0] { ${CARD_FIELDS} },

      "guidesHeadline": *[_type == "article" && published == true && pillar == "Guides" && featured != true]
               | order(publishedAt desc)[0] { ${CARD_FIELDS} },

      "stories": *[_type == "article" && published == true && pillar == "Stories"]
               | order(publishedAt desc)[0...11] { ${CARD_FIELDS} },

      "guides": *[_type == "article" && published == true && pillar == "Guides"]
               | order(publishedAt desc)[0...11] { ${CARD_FIELDS} },

      "style": *[_type == "article" && published == true && pillar == "Style"]
               | order(publishedAt desc)[0...5] { ${CARD_FIELDS} },

      "recent": *[_type == "article" && published == true && featured != true]
               | order(publishedAt desc)[0...6] { ${CARD_FIELDS} },
    }`,
    {},
    { next: { revalidate: 60 } }
  )

  const storiesHeadId = data.storiesHeadline?._id
  const guidesHeadId = data.guidesHeadline?._id
  const headlineIds = new Set([storiesHeadId, guidesHeadId].filter(Boolean) as string[])

  return {
    ...data,
    stories: data.stories.filter((a) => a._id !== storiesHeadId).slice(0, 10),
    guides: data.guides.filter((a) => a._id !== guidesHeadId).slice(0, 10),
    recent: data.recent.filter((a) => !headlineIds.has(a._id)).slice(0, 4),
  }
}

// ---- Article page -----------------------------------------------------------

export async function getArticle(
  pillar: string,
  slug: string
): Promise<Article | null> {
  const pillarCapitalised = pillar.charAt(0).toUpperCase() + pillar.slice(1)
  const data = await client.fetch<Article | null>(
    `*[_type == "article" && slug.current == $slug && pillar == $pillar && published == true][0] {
      ${FULL_ARTICLE_FIELDS}
    }`,
    { slug, pillar: pillarCapitalised },
    { next: { revalidate: 60 } }
  )
  return data ?? null
}

// ---- Static params ----------------------------------------------------------

export async function getAllArticleSlugs(): Promise<
  Array<{ pillar: string; slug: string }>
> {
  const articles = await client.fetch<Array<{ pillar: string; slug: { current: string } }>>(
    `*[_type == "article" && published == true] { pillar, slug }`,
    {},
    { cache: 'force-cache' }
  )
  return articles.map((a) => ({
    pillar: a.pillar.toLowerCase(),
    slug: a.slug.current,
  }))
}

// Sitemap variant: includes _updatedAt so each URL gets an accurate per-document lastmod.
// Uses time-based revalidation (1h) to keep the sitemap fresh without indefinite caching.
export async function getAllArticlesForSitemap(): Promise<
  Array<{ pillar: string; slug: string; updatedAt: string }>
> {
  const articles = await client.fetch<
    Array<{ pillar: string; slug: { current: string }; _updatedAt: string }>
  >(
    `*[_type == "article" && published == true] { pillar, slug, _updatedAt }`,
    {},
    { next: { revalidate: 3600 } }
  )
  return articles.map((a) => ({
    pillar: a.pillar.toLowerCase(),
    slug: a.slug.current,
    updatedAt: a._updatedAt,
  }))
}

// ---- Related articles -------------------------------------------------------

export async function getRelatedArticles(
  currentId: string,
  pillar: string,
  count = 3
): Promise<ArticleCard[]> {
  return client.fetch<ArticleCard[]>(
    `*[_type == "article" && published == true && pillar == $pillar && _id != $currentId]
      | order(publishedAt desc)[0...$count] { ${CARD_FIELDS} }`,
    { currentId, pillar, count },
    { next: { revalidate: 60 } }
  )
}

// ---- Pillar index -----------------------------------------------------------

export async function getPillarArticles(pillar: string): Promise<ArticleCard[]> {
  const pillarCapitalised = pillar.charAt(0).toUpperCase() + pillar.slice(1)
  return client.fetch<ArticleCard[]>(
    `*[_type == "article" && published == true && pillar == $pillar]
      | order(publishedAt desc) { ${CARD_FIELDS} }`,
    { pillar: pillarCapitalised },
    { next: { revalidate: 60 } }
  )
}
