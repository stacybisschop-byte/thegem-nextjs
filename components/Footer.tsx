import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-logo">The <em>Gem</em></div>
          <p className="footer-tag">For people who buy beautiful things and want to know the story behind them.</p>
        </div>
        <div>
          <h2>The Magazine</h2>
          <ul>
            <li><Link href="/stories">Stories</Link></li>
            <li><Link href="/edit">Edit</Link></li>
            <li><Link href="/guides">Guides</Link></li>
            <li><Link href="/archive">Archive</Link></li>
          </ul>
        </div>
        <div>
          <h2>About</h2>
          <ul>
            <li><Link href="/about">About Florence</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/contribute">Contribute</Link></li>
            <li><Link href="/press">Press</Link></li>
          </ul>
        </div>
        <div>
          <h2>Subscribe</h2>
          <ul>
            <li><Link href="/newsletter">Newsletter</Link></li>
            <li><a href="https://www.instagram.com/thegem.press/" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="https://www.pinterest.com/thegemmag" target="_blank" rel="noopener">Pinterest</a></li>
            <li><Link href="/rss">RSS</Link></li>
          </ul>
        </div>
        <div>
          <h2>Legal</h2>
          <ul>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/accessibility">Accessibility</Link></li>
            <li><Link href="/affiliate-disclosure">Affiliate disclosure</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-base">
        <p className="footer-disclosure">Some links on The Gem are <Link href="/affiliate-disclosure">affiliate links</Link>. We earn a small commission on purchases made through them, at no cost to you.</p>
        <span>© The Gem, {new Date().getFullYear()} · London</span>
        <span>Designed and built with care</span>
      </div>
    </footer>
  )
}
