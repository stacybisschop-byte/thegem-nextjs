import type { Metadata } from 'next'
import '../styles/globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://thegem.press'),
  title: {
    default: 'The Gem — For people who buy beautiful things and want to know the story behind them',
    template: '%s — The Gem',
  },
  description: 'The Gem is an editorial jewellery publication at the intersection of fashion, history, and what to actually buy.',
  openGraph: {
    siteName: 'The Gem',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="announce">
          Issue No. 01 · The launch issue is here <span>·</span>{' '}
          <a href="/stories/princess-diana-jewellery">Read the Diana flagship</a>
        </div>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
