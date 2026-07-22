import type { Metadata } from 'next'
import Link from 'next/link'
import { client, articleHref } from '@/lib/sanity'

export const revalidate = 60

interface SearchResult {
  _id: string
  title: string
  slug: { current: string }
  pillar: 'Stories' | 'Guides' | 'Edit'
  metaDescription?: string
  publishedAt?: string
  readMin?: number
}

async function searchArticles(term: string): Promise<SearchResult[]> {
  const pattern = term
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => `${word}*`)
    .join(' ')

  if (!pattern) return []

  return client.fetch<SearchResult[]>(
    `*[_type == "article" && published == true && (
      title match $pattern ||
      metaDescription match $pattern ||
      pillar match $pattern
    )] {
      _id,
      title,
      slug,
      pillar,
      metaDescription,
      publishedAt,
      "readMin": round(length(body) / 1100),
      "titleMatch": title match $pattern
    } | order(titleMatch desc, publishedAt desc)`,
    { pattern }
  )
}

function formatDate(iso?: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `Search results for "${q}"` : 'Search',
    robots: { index: false, follow: true },
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const term = (q ?? '').trim()
  const results = term ? await searchArticles(term) : []

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '80px var(--pad-x) 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-accessible)', marginBottom: 20 }}>
          The Gem
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24 }}>
          Search
        </h1>
        <form action="/search" method="get" style={{ display: 'flex', justifyContent: 'center' }}>
          <input
            type="text"
            name="q"
            defaultValue={term}
            placeholder="Search articles…"
            autoFocus
            style={{
              width: '100%',
              maxWidth: 440,
              padding: '12px 16px',
              fontSize: 16,
              fontFamily: 'var(--font-body)',
              border: '1px solid var(--border)',
              background: 'var(--cream)',
              color: 'var(--ink)',
            }}
          />
        </form>
      </div>

      {term && (
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 24, textAlign: 'center' }}>
          {results.length
            ? `${results.length} ${results.length === 1 ? 'result' : 'results'} for "${term}"`
            : `No results for "${term}"`}
        </p>
      )}

      {!term && (
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', textAlign: 'center' }}>
          Or browse{' '}
          <Link href="/edit" style={{ textDecoration: 'underline' }}>Edit</Link>,{' '}
          <Link href="/guides" style={{ textDecoration: 'underline' }}>Guides</Link>,{' '}
          <Link href="/stories" style={{ textDecoration: 'underline' }}>Stories</Link>, or the{' '}
          <Link href="/archive" style={{ textDecoration: 'underline' }}>full archive</Link>.
        </p>
      )}

      {results.length > 0 && (
        <ul style={{ listStyle: 'none' }}>
          {results.map((a) => (
            <li key={a._id} style={{ borderTop: '1px solid var(--border)', padding: '20px 0' }}>
              <Link href={articleHref({ pillar: a.pillar, slug: a.slug })} style={{ display: 'block', color: 'inherit' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 350 }}>
                    {a.title}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-secondary)', whiteSpace: 'nowrap' }}>
                    {a.pillar} · {formatDate(a.publishedAt)}
                    {a.readMin ? ` · ${a.readMin} min` : ''}
                  </span>
                </div>
                {a.metaDescription && (
                  <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginTop: 8, maxWidth: 640 }}>
                    {a.metaDescription}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
