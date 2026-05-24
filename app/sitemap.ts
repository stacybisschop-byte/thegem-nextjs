import { MetadataRoute } from 'next'
import { getAllArticlesForSitemap } from '@/lib/queries'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const records = await getAllArticlesForSitemap()
  const buildDate = new Date()

  const articles = records.map(({ pillar, slug, updatedAt }) => ({
    url: `https://thegem.press/${pillar}/${slug}`,
    lastModified: new Date(updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://thegem.press/',
      lastModified: buildDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://thegem.press/stories',
      lastModified: buildDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://thegem.press/guides',
      lastModified: buildDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://thegem.press/style',
      lastModified: buildDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://thegem.press/about',
      lastModified: buildDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    ...articles,
  ]
}
