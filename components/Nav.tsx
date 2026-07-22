import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="primary-nav">
      <div className="nav-left">
        <Link href="/stories">Stories</Link>
        <Link href="/edit">Edit</Link>
        <Link href="/guides">Guides</Link>
      </div>

      <Link href="/" className="nav-logo">
        The <em>Gem</em>
      </Link>

      <div className="nav-right">
        <Link href="/search" aria-label="Search" className="nav-search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </Link>
        <Link href="/about">About</Link>
        <Link href="#newsletter" className="subscribe-link">Subscribe</Link>
      </div>
    </nav>
  )
}
