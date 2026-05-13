/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },

  async redirects() {
    // 301 redirects from the old gemstonesinsider.com URL structure.
    // Full list in /redirects.js — drop that file in this directory to activate.
    // Format: [{ source: '/old-path', destination: '/new-path', permanent: true }]
    try {
      const redirectMap = require('./redirects')
      return redirectMap
    } catch {
      return []
    }
  },
}

module.exports = nextConfig
