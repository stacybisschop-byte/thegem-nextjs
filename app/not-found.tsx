import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404: This page could not be found.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <>
      <div style={{ padding: '120px var(--pad-x) 80px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 300, marginBottom: 16 }}>
          404
        </h1>
        <p style={{ fontSize: 18, color: 'var(--ink-muted)', marginBottom: 24 }}>
          This page could not be found.
        </p>
        <Link href="/">Back to The Gem</Link>
      </div>
    </>
  )
}
