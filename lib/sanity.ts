// Import createClient directly from @sanity/client, NOT from next-sanity.
// next-sanity re-exports @sanity/client.createClient unchanged, but its barrel also
// pulls in @sanity/next-loader + visual-editing client components as a side effect,
// which drags @sanity/client + xstate + buffer polyfill (~50 kB gz) into the browser
// bundle on every content route. Switch back to next-sanity here only when wiring up
// Sanity live preview, visual editing, or draft mode.
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlForImage(source: SanityImage) {
  return builder.image(source)
}

// ---- TypeScript types --------------------------------------------------------

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  alt?: string
  caption?: string
}

export interface Article {
  _id: string
  _type: 'article'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: { current: string }
  pillar: 'Stories' | 'Guides' | 'Style'
  author: string
  published: boolean
  publishedAt?: string
  metaTitle?: string
  metaDescription?: string
  heroImage?: SanityImage
  heroImageUrl?: string
  heroImageAlt?: string
  heroCaption?: string
  kickerExtra?: string
  body: string
  affiliateDisclosure?: boolean
  featured?: boolean
  featuredOrder?: number
}

// Minimal projection used in cards/lists
export interface ArticleCard {
  _id: string
  title: string
  slug: { current: string }
  pillar: 'Stories' | 'Guides' | 'Style'
  metaDescription?: string
  heroImage?: SanityImage
  heroImageUrl?: string
  heroImageAlt?: string
  kickerExtra?: string
  publishedAt?: string
  readMin?: number
  featured?: boolean
  featuredOrder?: number
}

// Computed helpers

export function pillarPath(pillar: string): string {
  return pillar.toLowerCase()
}

export function articleHref(article: Pick<Article, 'pillar' | 'slug'>): string {
  return `/${pillarPath(article.pillar)}/${article.slug.current}`
}

// Estimate reading time from body length
export function readMin(body: string): number {
  const words = body.split(/\s+/).length
  return Math.max(2, Math.round(words / 220))
}
