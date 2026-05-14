import { client } from '@/lib/sanity'

export const revalidate = 3600

interface FeedItem {
  title: string
  slug: { current: string }
  pillar: 'Stories' | 'Guides' | 'Style'
  metaDescription?: string
  publishedAt?: string
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const articles = await client.fetch<FeedItem[]>(`
    *[_type == "article" && published == true]
    | order(publishedAt desc)[0...50] {
      title,
      slug,
      pillar,
      metaDescription,
      publishedAt
    }
  `)

  const site = 'https://thegem.press'
  const lastBuild = new Date().toUTCString()

  const items = articles
    .map((a) => {
      const url = `${site}/${a.pillar.toLowerCase()}/${a.slug.current}`
      const pub = a.publishedAt ? new Date(a.publishedAt).toUTCString() : lastBuild
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pub}</pubDate>
      <category>${a.pillar}</category>${
        a.metaDescription ? `\n      <description>${escapeXml(a.metaDescription)}</description>` : ''
      }
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Gem</title>
    <link>${site}</link>
    <description>Editorial jewellery publication. For people who buy beautiful things and want to know the story behind them.</description>
    <atom:link href="${site}/rss" rel="self" type="application/rss+xml" />
    <language>en-gb</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
