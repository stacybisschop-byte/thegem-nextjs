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
          <h5>The Magazine</h5>
          <ul>
            <li><Link href="/stories">Stories</Link></li>
            <li><Link href="/style">Style</Link></li>
            <li><Link href="/guides">Guides</Link></li>
            <li><Link href="/archive">Archive</Link></li>
          </ul>
        </div>
        <div>
          <h5>About</h5>
          <ul>
            <li><Link href="/about">About Florence</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/contribute">Contribute</Link></li>
            <li><Link href="/press">Press</Link></li>
          </ul>
        </div>
        <div>
          <h5>Subscribe</h5>
          <ul>
            <li><Link href="/newsletter">Newsletter</Link></li>
            <li><a href="https://www.instagram.com/thegem.press/" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="https://www.pinterest.com/thegemmag" target="_blank" rel="noopener">Pinterest</a></li>
            <li><Link href="/rss">RSS</Link></li>
          </ul>
        </div>
        <div>
          <h5>Legal</h5>
          <ul>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/accessibility">Accessibility</Link></li>
            <li><Link href="/affiliate-disclosure">Affiliate disclosure</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-base">
        <span>© The Gem, {new Date().getFullYear()} · London</span>
        <span>Designed and built with care</span>
      </div>
    </footer>
  )
}
