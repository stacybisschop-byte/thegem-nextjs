import { client } from '@/lib/sanity'

export const revalidate = 3600 // regenerate hourly

interface ArticleFull {
  title: string
  slug: { current: string }
  pillar: 'Stories' | 'Guides' | 'Edit'
  body: string
}

// Lightweight markdown → plain text. Article bodies are plain markdown
// (no frontmatter, no embedded HTML) per the publishing pipeline.
function stripMarkdown(md: string): string {
  return md
    .replace(/```[\w-]*\n([\s\S]*?)```/g, '$1') // fenced code → content
    .replace(/`([^`]+)`/g, '$1')                 // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')        // images dropped
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')     // links → text
    .replace(/^#{1,6}\s+/gm, '')                 // heading markers
    .replace(/^>\s?/gm, '')                      // blockquote markers
    .replace(/(\*\*|__)(.+?)\1/g, '$2')          // bold
    .replace(/(\*|_)(.+?)\1/g, '$2')             // italic
    .replace(/^[\t ]*[-*+]\s+/gm, '')            // unordered list markers
    .replace(/^[\t ]*\d+\.\s+/gm, '')            // ordered list markers
    .replace(/^-{3,}\s*$/gm, '')                 // horizontal rules
    .replace(/\n{3,}/g, '\n\n')                  // collapse blank lines
    .trim()
}

export async function GET() {
  const articles = await client.fetch<ArticleFull[]>(`
    *[_type == "article" && published == true]
    | order(pillar asc, publishedAt desc) {
      title,
      slug,
      pillar,
      body
    }
  `)

  const blocks = articles.map((a) => {
    const path = `${a.pillar.toLowerCase()}/${a.slug.current}`
    const body = stripMarkdown(a.body ?? '')
    return [
      '---',
      `Title: ${a.title}`,
      `URL: https://thegem.press/${path}`,
      `Section: ${a.pillar}`,
      '---',
      body,
    ].join('\n')
  })

  const header = [
    '# The Gem — Full Content Index',
    '> Summary version: https://thegem.press/llms.txt',
    `> Last updated: ${new Date().toISOString().slice(0, 10)}`,
  ].join('\n')

  return new Response([header, ...blocks].join('\n\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
