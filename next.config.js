/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = [
  "default-src 'self'",
  // Next.js needs unsafe-inline for its runtime; JSON-LD script tags also need it
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  // Fonts are self-hosted via next/font; add your Fathom script domain to script-src when wiring
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  // Sanity CDN + Unsplash placeholders (remove unsplash once real images are in)
  "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com",
  // Sanity API + Vercel vitals
  "connect-src 'self' https://*.api.sanity.io https://vitals.vercel-insights.com https://cdn.sanity.io",
  "media-src 'self'",
  // Sanity Studio needs to frame some Sanity-hosted content
  "frame-src 'self' https://www.sanity.io https://*.sanity.studio",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
]

const nextConfig = {
  images: {
    // AVIF first: ~15-25% smaller than WebP at matched quality. Browsers without
    // AVIF support fall through to WebP automatically.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },

  async headers() {
    return [
      {
        // Apply security headers to all routes except /studio
        // The Studio is a Sanity-controlled iframe environment with its own needs
        source: '/((?!studio).*)',
        headers: securityHeaders,
      },
    ]
  },

  async redirects() {
    try {
      const redirectMap = require('./redirects')
      return redirectMap
    } catch {
      return []
    }
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
