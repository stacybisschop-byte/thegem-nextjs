import { client } from '@/lib/sanity'

export const revalidate = 3600 // regenerate hourly

interface ArticleEntry {
  title: string
  slug: { current: string }
  pillar: string
  metaDescription?: string
}

export async function GET() {
  const articles = await client.fetch<ArticleEntry[]>(`
    *[_type == "article" && published == true]
    | order(pillar asc, publishedAt desc) {
      title,
      slug,
      pillar,
      metaDescription
    }
  `)

  const edit    = articles.filter((a) => a.pillar === 'Edit')
  const stories = articles.filter((a) => a.pillar === 'Stories')
  const guides  = articles.filter((a) => a.pillar === 'Guides')
  const style   = articles.filter((a) => a.pillar === 'Style')

  const lines: string[] = [
    '# The Gem',
    '',
    '> Editorial jewellery publication.',
    '> For people who buy beautiful things and want to know the story behind them.',
    '> Editor: Florence. London. Est. 2026.',
    '',
    '> Full content: https://thegem.press/llms-full.txt',
    '',
    '## About',
    '',
    'The Gem is an independent editorial publication covering the history, culture, and',
    'commerce of fine jewellery. Content is written by Florence, a magazine editor and',
    'writer based in London with fifteen years of experience in features journalism.',
    '',
    'All articles cite primary sources including the Gemological Institute of America (GIA),',
    'the Gemmological Association of Great Britain (Gem-A), the National Association of',
    'Jewellers (NAJ), and major auction house records (Christie\'s, Sotheby\'s, Bonhams).',
    '',
    'Affiliate relationships are disclosed on all commercial content.',
    '',
    '## Sections',
    '',
    '- Edit: Time-sensitive shop edits, trend pieces, and celebrity jewellery moments',
    '- Stories: Long-form jewellery history, provenance, and culture',
    '- Guides: Practical buying guides, market analysis, and ownership advice',
    '- Style: How to wear jewellery and build a wardrobe',
    '',
  ]

  if (edit.length) {
    lines.push('## Edit')
    lines.push('')
    for (const a of edit) {
      const desc = a.metaDescription ? ` — ${a.metaDescription}` : ''
      lines.push(`- [${a.title}](https://thegem.press/edit/${a.slug.current})${desc}`)
    }
    lines.push('')
  }

  if (stories.length) {
    lines.push('## Stories')
    lines.push('')
    for (const a of stories) {
      const desc = a.metaDescription ? ` — ${a.metaDescription}` : ''
      lines.push(`- [${a.title}](https://thegem.press/stories/${a.slug.current})${desc}`)
    }
    lines.push('')
  }

  if (guides.length) {
    lines.push('## Guides')
    lines.push('')
    for (const a of guides) {
      const desc = a.metaDescription ? ` — ${a.metaDescription}` : ''
      lines.push(`- [${a.title}](https://thegem.press/guides/${a.slug.current})${desc}`)
    }
    lines.push('')
  }

  if (style.length) {
    lines.push('## Style')
    lines.push('')
    for (const a of style) {
      const desc = a.metaDescription ? ` — ${a.metaDescription}` : ''
      lines.push(`- [${a.title}](https://thegem.press/style/${a.slug.current})${desc}`)
    }
    lines.push('')
  }

  lines.push(
    '## Contact',
    '',
    'Editorial: https://thegem.press/contact',
    'Affiliate disclosure: https://thegem.press/affiliate-disclosure',
    '',
    `## Last updated`,
    '',
    new Date().toISOString(),
  )

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
