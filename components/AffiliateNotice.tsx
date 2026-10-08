import Link from 'next/link'

export default function AffiliateNotice() {
  return (
    <div className="article-body" style={{ paddingBottom: 0 }}>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: '0.05em',
          color: 'var(--ink-muted)',
          textAlign: 'center',
        }}
      >
        This piece contains affiliate links. If you buy through them, The Gem may earn a small
        commission at no cost to you. <Link href="/affiliate-disclosure">How this works</Link>
      </p>
    </div>
  )
}
