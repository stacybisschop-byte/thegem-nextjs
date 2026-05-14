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
  description:
    'The Gem is an editorial jewellery publication covering the history, culture, and commerce of fine jewellery. Based in London.',
  openGraph: {
    siteName: 'The Gem',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Gem',
  url: 'https://thegem.press',
  description:
    'Editorial jewellery publication. For people who buy beautiful things and want to know the story behind them.',
  logo: 'https://thegem.press/logo.png',
  foundingDate: '2026',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'London',
    addressCountry: 'GB',
  },
  sameAs: [],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'The Gem',
  url: 'https://thegem.press',
  description: 'Editorial jewellery publication based in London.',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://thegem.press/search?q={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
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
