import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import '../styles/globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', display: 'swap', axes: ['opsz', 'SOFT'] })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap', weight: ['400', '600'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap', weight: ['400'], preload: false })

export const metadata: Metadata = {
  metadataBase: new URL('https://thegem.press'),
  title: {
    default: 'The Gem — Fine Jewellery: Reviews, Style & Guides, London',
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
  other: {
    'p:domain_verify': 'b9a6901bde74566737f6c9a46df6ad95',
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Gem',
  url: 'https://thegem.press',
  description: 'Editorial jewellery publication. For people who buy beautiful things and want to know the story behind them.',
  logo: {
    '@type': 'ImageObject',
    url: 'https://thegem.press/og-logo.png',
    width: 600,
    height: 60,
  },
  foundingDate: '2026',
  address: { '@type': 'PostalAddress', addressLocality: 'London', addressCountry: 'GB' },
  sameAs: [
    'https://thegemmag.substack.com',
    'https://www.instagram.com/thegem.press/',
    'https://x.com/GemstInsider',
    'https://www.pinterest.com/thegemmag',
  ],
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
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EM8L6SR6S7"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EM8L6SR6S7');
        `}</Script>
        <Script
          src="https://s.skimresources.com/js/305061X1793253.skimlinks.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
