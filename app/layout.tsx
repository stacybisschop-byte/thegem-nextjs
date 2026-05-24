import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import '../styles/globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', display: 'swap', axes: ['opsz', 'SOFT', 'WONK'] })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap', weight: ['300', '400', '500', '600', '700'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap', weight: ['400', '500'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://thegem.press'),
  title: {
    default: 'The Gem — Editorial Jewellery Publication, London',
    template: '%s — The Gem',
  },
  description:
    'The Gem is an editorial jewellery publication for people who buy beautiful things and want to know the story behind them. Covers the history, culture, and commerce of fine jewellery. Based in London.',
  openGraph: {
    siteName: 'The Gem',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.svg',
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Gem',
  url: 'https://thegem.press',
  description: 'Editorial jewellery publication. For people who buy beautiful things and want to know the story behind them.',
  logo: 'https://thegem.press/favicon.svg',
  foundingDate: '2026',
  address: { '@type': 'PostalAddress', addressLocality: 'London', addressCountry: 'GB' },
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
    <html lang="en" className={`${fraunces.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}>
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
        <Analytics />
      </body>
      <Script
        src="https://tracker.metricool.com/resources/be.js"
        strategy="afterInteractive"
      />
      <Script id="metricool-init" strategy="afterInteractive">
        {`beTracker.t({hash:"1fe944ce138ee4b75030a9cc864d7681"})`}
      </Script>
    </html>
  )
}
