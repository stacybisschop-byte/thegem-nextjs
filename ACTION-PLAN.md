# Action Plan — thegem.press SEO

**Status as of 2026-05-24:** All audit-scope items resolved. Site moved from ~55 (Needs Improvement) to ~88 (Excellent) across 8 commits.

This file is now primarily a historical record of what was done, plus a verification block for future re-audits.

---

## Open

**Nothing within audit scope.**

### Owner-managed (not blocking)

- **Core Web Vitals measurement.** Use Google Search Console → Core Web Vitals (field data) or PageSpeed Insights with a personal API key. Not a code change.
- **`content/rewrite_briefs.md`** still mentions the (now removed) `lastReviewedAt` field on lines 300 and 368. Editorial planning copy — update or leave as historical context.
- **Sanity dataset cleanup (optional).** Removed `lastReviewedAt` may still exist as a value on legacy article documents. Harmless. To clear:
  ```bash
  sanity documents query '*[_type=="article" && defined(lastReviewedAt)]._id' \
    | xargs -I{} sanity documents patch {} --unset lastReviewedAt
  ```

---

## Completed

### Critical — all resolved in `d239d71`

- ✅ Article `publisher.url`: `thegem.co` → `https://thegem.press`
- ✅ Canonical tags site-wide via `metadataBase` + per-route `alternates.canonical`
- ✅ `FAQPage` JSON-LD removed from `/`, `/stories`, article pages

### Warning — resolved across `d239d71`, `cc3fef4`, `8a52263`

- ✅ `Article.dateModified` now derived from Sanity `_updatedAt`, clamped to ≥ `datePublished`
- ✅ Article `image` made absolute (Sanity CDN when available; legacy `/blog/*.webp` prefixed with canonical origin)
- ✅ `BreadcrumbList` on article routes (Home → Section → Article) and section indexes (Home → Section)
- ✅ Homepage `<title>` 84 → 49 chars; long tagline moved to description
- ✅ `og:url` added to every route via `metadataBase` + per-route `openGraph.url`
- ✅ `og:image` added site-wide (homepage/indexes use `/og-cover.jpg`; article pages use Sanity hero or absolutised `heroImageUrl`)
- ✅ `og:type` / `og:site_name` / `og:locale` restored on every per-route `openGraph` block
- ✅ Sitemap per-doc `<lastmod>` from `_updatedAt`; trailing slash on homepage URL

### Schema enrichment — `a06f276`, `cc3fef4`, `96e84d1`

- ✅ Organization `logo` upgraded from favicon SVG to dedicated wordmark `ImageObject` at `/og-logo.png` (600×60, final asset)
- ✅ Organization `sameAs` fully populated: Substack, Instagram (`@thegem.press`), X (`@GemstInsider`), Pinterest (`@thegemmag`). Footer Instagram + Pinterest links also updated to match
- ✅ `ProfilePage` schema on `/about` with rich Person (knowsAbout, address, jobTitle) nested as `mainEntity` — replaces the prior standalone Person, single entity for Florence
- ✅ `/llms-full.txt` dynamic route mirroring `llms.txt` pattern — full article bodies, markdown stripped

### Visible-HTML / hygiene — `317eab5`, `2773462`

- ✅ Article byline publish date uses semantic `<time dateTime={publishedAt}>` instead of `<span>`, so the on-page date pairs with the JSON-LD `datePublished`
- ✅ Orphaned `PILLARS.faq` data removed from `app/[pillar]/page.tsx`
- ✅ Unused `lastReviewedAt` field removed across Studio schema, TS interface, GROQ projection, migration script

### Studio + crawl — `d239d71`

- ✅ `/studio` ships `<meta name="robots" content="noindex, nofollow"/>` via `app/studio/layout.tsx` (belt-and-braces alongside the existing `robots.txt` `Disallow: /studio/`)

---

## Verification block

Run any of these after a future deploy to confirm the SEO baseline is still intact:

```bash
# Canonicals + OG
curl -s https://thegem.press/stories/paraiba-tourmaline \
  | grep -E 'canonical|og:url|og:image|og:type|og:site_name'

# Studio noindex
curl -s https://thegem.press/studio | grep -E 'robots'

# llms files
curl -sI https://thegem.press/llms.txt
curl -sI https://thegem.press/llms-full.txt

# Distinct sitemap lastmod count (should be > 1 — confirms per-doc timestamps)
curl -s https://thegem.press/sitemap.xml | grep -oE '<lastmod>[^<]+</lastmod>' | sort -u | wc -l

# Schema validity (browser)
# https://search.google.com/test/rich-results?url=https%3A%2F%2Fthegem.press%2Fstories%2Fparaiba-tourmaline
```
