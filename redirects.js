module.exports = [
  { source: '/stories/cartier-family', destination: '/stories/cartier-family-history', permanent: true },

  { source: '/style/ring-stacking-guide', destination: '/edit/ring-stacking-guide', permanent: true },
  { source: '/style/layering-necklaces', destination: '/edit/layering-necklaces', permanent: true },
  { source: '/style/modern-womens-jewellery-edit', destination: '/edit/modern-womens-jewellery-edit', permanent: true },
  { source: '/style/pink-jewellery', destination: '/edit/pink-jewellery', permanent: true },
  { source: '/style/mens-jewellery-guide', destination: '/edit/mens-jewellery-guide', permanent: true },
  { source: '/style/how-to-wear-a-brooch', destination: '/guides/how-to-wear-a-brooch', permanent: true },
  { source: '/style/how-to-wear-pearls', destination: '/guides/how-to-wear-pearls', permanent: true },
  { source: '/style/how-to-build-a-jewellery-collection', destination: '/guides/how-to-build-a-jewellery-collection', permanent: true },
  { source: '/style/floral-jewellery', destination: '/stories/floral-jewellery', permanent: true },
  { source: '/style/signet-ring-edit', destination: '/edit/signet-ring-edit', permanent: true },
  { source: '/style/fine-jewellery-festival-layering', destination: '/edit/fine-jewellery-festival-layering', permanent: true },
  { source: '/style', destination: '/edit', permanent: true },

  // Fallback for any /style/ URL not covered by a specific redirect above
  // (stale search/backlinks, old bookmarks) — sends to the pillar index
  // rather than letting it fall through to a tracked 404.
  { source: '/style/:path*', destination: '/edit', permanent: true },
]
