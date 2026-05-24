# Action Plan — thegem.press SEO

Status as of 2026-05-24, post-fix round. Original audit items below are mostly resolved; remaining items are marked **Open** at the top.

---

## Currently open

### O1 · Confirm Instagram + Pinterest handles ⚠️

**Where:** `app/layout.tsx`, the `orgSchema.sameAs` array (look for the two `TODO` lines)

**Why:** Populated `sameAs` is the strongest entity-disambiguation signal for the Knowledge Graph. Substack is in; the other two are placeholders.

**What to do:** Once accounts are claimed, replace each TODO with the real URL. Example:

```ts
sameAs: [
  'https://thegemmag.substack.com',
  'https://www.instagram.com/thegem.press',         // ← actual handle
  'https://www.pinterest.co.uk/thegempress',        // ← actual handle
],
```

Also update the bare `https://instagram.com` / `https://pinterest.com` links in `components/Footer.tsx:33-34` to point at the real handles.

### O2 · Measure Core Web Vitals ℹ️

**Why:** Performance category is the only category in the audit still showing `Insufficient data`. PageSpeed Insights API kept rate-limiting because no API key was configured.

**What to do (pick one):**
- Provision a PageSpeed Insights API key (free tier is generous), set it as `PAGESPEED_API_KEY` in `.env`, re-run `python <skill>/scripts/pagespeed.py https://thegem.press/ --strategy mobile --json --api-key <KEY>`.
- Or check **Google Search Console → Core Web Vitals** report directly for field data (more accurate than synthetic Lighthouse runs anyway).

### O3 · Optional polish (no urgency) ℹ️

These are all "nice to have", none blocking:

- **Proper wordmark logo** at `/og-logo.png` (the current 600×60 file is a placeholder per the original task; if you've replaced it with a real wordmark, this is done — please verify the file).
- **Render publish date visibly** in article HTML. Currently `datePublished` exists in JSON-LD only. Google has flagged schema dates that aren't visible to users — adding `<time dateTime={publishedAt}>May 2026</time>` near the byline matches.
- **`PILLARS.faq` data orphaned** in `app/[pillar]/page.tsx`. The arrays survived the FAQPage removal because they're authored editorial copy that could be repurposed as visible HTML. If you don't intend to render them, they can be deleted.
- **`lastReviewedAt` field** still in Sanity schema and projection but no longer consumed by the Article JSON-LD (now uses `_updatedAt`). Leave it if you want manual editorial-review override; otherwise drop from schema.

---

## Completed (commit reference)

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
- ✅ `og:type` / `og:site_name` / `og:locale` restored on every per-route `openGraph` block (Next.js doesn't merge — see commit `8a52263`)
- ✅ Sitemap per-doc `<lastmod>` from `_updatedAt`; trailing slash on homepage URL

### Schema enrichment — `a06f276` and `cc3fef4`

- ✅ Organization `logo` upgraded from favicon SVG to dedicated `ImageObject` at `/og-logo.png` (600×60)
- ✅ Organization `sameAs` populated with Substack (Instagram + Pinterest pending — see O1)
- ✅ `ProfilePage` schema on `/about` with rich Person (knowsAbout, address, jobTitle) nested as `mainEntity` — replaces the prior standalone Person, single entity for Florence
- ✅ `/llms-full.txt` dynamic route mirroring `llms.txt` pattern — full article bodies, markdown stripped

### Studio + crawl — `d239d71`

- ✅ `/studio` ships `<meta name="robots" content="noindex, nofollow"/>` via `app/studio/layout.tsx` (belt-and-braces alongside the existing `robots.txt` `Disallow: /studio/`)

---

## Verification

Run after any future deploy to confirm the SEO baseline is still intact:

```bash
# Canonicals + OG
curl -s https://thegem.press/stories/paraiba-tourmaline | grep -E 'canonical|og:url|og:image|og:type|og:site_name'

# Studio noindex
curl -s https://thegem.press/studio | grep -E 'robots'

# llms files
curl -sI https://thegem.press/llms.txt
curl -sI https://thegem.press/llms-full.txt

# Distinct sitemap lastmod count
curl -s https://thegem.press/sitemap.xml | grep -oE '<lastmod>[^<]+</lastmod>' | sort -u | wc -l

# Schema validity (browser)
# https://search.google.com/test/rich-results?url=https%3A%2F%2Fthegem.press%2Fstories%2Fparaiba-tourmaline
```
