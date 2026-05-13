'use client'

import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="primary-nav">
      <div className="nav-left">
        <Link href="/stories">Stories</Link>
        <Link href="/style">Style</Link>
        <Link href="/guides">Guides</Link>
      </div>

      <Link href="/" className="nav-logo">
        The <em>Gem</em>
      </Link>

      <div className="nav-right">
        <Link href="/about">About</Link>
        <Link href="#newsletter" className="subscribe-link">Subscribe</Link>
      </div>
    </nav>
  )
}
