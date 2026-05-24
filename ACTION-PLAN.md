# Action Plan — thegem.press SEO

Ordered by execution priority. Each item maps to a concrete code change in this Next.js repo.

---

## 1 · Immediate blockers (do first)

### 1.1 Fix Article `publisher.url` — `thegem.co` → `thegem.press` 🔴
- **Impact:** Splits brand entity in Google's Knowledge Graph; weakens E-E-A-T attribution.
- **Where:** Wherever Article JSON-LD is generated (likely `lib/seo.ts` / `lib/schema.ts` or in route-level metadata). Search the repo for `thegem.co`.
- **Verify:** Open `https://search.google.com/test/rich-results` against `/stories/paraiba-tourmaline` → publisher URL should read `https://thegem.press`.

### 1.2 Add canonical tags site-wide 🔴
- **Impact:** Prevents duplicate content issues with query-string variants, trailing-slash variants, www/non-www edge cases. Currently missing on every page audited.
- **Where:**
  - In `app/layout.tsx`, set `export const metadata: Metadata = { metadataBase: new URL('https://thegem.press'), ... }`.
  - In each route's `generateMetadata()` (or static `metadata`), add `alternates: { canonical: '/stories/paraiba-tourmaline' }` (path is fine once `metadataBase` is set).
- **Verify:** `curl -s https://thegem.press/stories/paraiba-tourmaline | grep canonical` returns `<link rel="canonical" href="https://thegem.press/stories/paraiba-tourmaline" />`.

### 1.3 Remove `FAQPage` JSON-LD from `/` and `/stories` 🔴
- **Impact:** FAQPage rich results are restricted to government/health authority sites since 2023-08-08. The schema is ignored by Google and signals outdated SEO. The visible FAQ HTML can stay — it still helps users and AI answer engines.
- **Where:** Remove the `@type: FAQPage` block from the page that renders the home FAQ section and from the `/stories` index page. Grep for `"FAQPage"` in `app/`, `lib/`, `components/`.

---

## 2 · Quick wins (this sprint)

### 2.1 Fix `Article.dateModified` logic ⚠️
- **Current:** Brooch `datePublished: 2026-05-24` but `dateModified: 2026-05-01` (modified *before* published — impossible).
- **Fix:** Use Sanity's `_updatedAt` for `dateModified` and `_createdAt` (or `publishedAt`) for `datePublished`. If `_updatedAt < publishedAt` (true for never-edited posts), set `dateModified = datePublished` or omit it.

### 2.2 Shorten homepage `<title>` ⚠️
- **Current (84 chars):** `"The Gem — For people who buy beautiful things and want to know the story behind them"`
- **Target (≤ 60):** `"The Gem — Editorial Jewellery Publication, London"` (49 chars)
- The long tagline stays — move it to the meta description and `og:description` (current desc is already 125 chars — fine).

### 2.3 Add `og:url` and consistent `og:image` to every page ⚠️
- **Where:** Once `metadataBase` is set (1.2), Next.js fills `og:url` automatically when you supply `openGraph: { url: '/...' }` per route. Add `openGraph.images` per page using the article hero (or a site-wide fallback for `/`, `/stories`, `/style`, `/guides`).
- **Spec:** 1200×630, ≤ 1 MB, absolute URL.

### 2.4 Make Article `image` an absolute URL ⚠️
- **Current (Paraiba):** `"image": "/blog/paraiba-tourmaline.webp"`
- **Fix:** Prepend `https://thegem.press` (or use Sanity CDN URL with explicit dimensions). Schema.org image URLs must be absolute.

---

## 3 · Strategic (next month)

### 3.1 Add `BreadcrumbList` JSON-LD on `/stories/*`, `/style/*`, `/guides/*` ⚠️
- **Why:** Enables SERP breadcrumb display ("thegem.press › Stories › Hope Diamond" instead of `https://thegem.press/stories/hope-diamond`). Improves CTR and crawl context.
- **Shape:**
  ```json
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Stories", "item": "https://thegem.press/stories"},
      {"@type": "ListItem", "position": 2, "name": "Paraiba Tourmaline", "item": "https://thegem.press/stories/paraiba-tourmaline"}
    ]
  }
  ```

### 3.2 Render publish/modified date visibly in article HTML ⚠️
- **Why:** Google has been clear that schema dates not visible to users can be flagged as deceptive. Currently `datePublished` exists in JSON-LD only.
- **Fix:** Add `<time dateTime={datePublished}>May 2026</time>` near the byline in the article component.

### 3.3 Replace Organization `logo` SVG-favicon with a proper logo image ⚠️
- **Why:** Knowledge Panel logo eligibility prefers an image that *looks like a logo* (wordmark or symbol) with declared `width`/`height`. The current favicon is a 32-ish-px glyph.
- **Fix:** Add a dedicated `/og/logo.png` (e.g. 600×60) and reference it in the Organization schema with `width: 600, height: 60`.

### 3.4 Per-URL `<lastmod>` in sitemap ⚠️
- **Current:** All 36 URLs share `2026-05-24T14:02:24.979Z` (build timestamp).
- **Fix:** In `app/sitemap.ts`, fetch Sanity `_updatedAt` per content URL and use that. Static routes (`/`, `/about`) can keep the build timestamp.

### 3.5 Add `ProfilePage` schema for `/about` ℹ️
- **Why:** Strengthens Florence as the author entity → boosts E-E-A-T on every article she writes.
- **Reference:** [templates.json](C:\Users\stacy\.claude\skills\seo\resources\schema\templates.json) — ProfilePage block.

### 3.6 Populate Organization `sameAs` ℹ️
- Add the canonical URL for every owned identity surface as you launch them: Instagram, LinkedIn, the newsletter (Substack), any Wikipedia/Wikidata entry.

---

## 4 · Optional / nice-to-have

- **Add `/llms-full.txt`** — a single concatenated full-text dump for AI ingestion. The skeleton `/llms.txt` is already there and scores 100/100.
- **Sitemap homepage URL** — change `<loc>https://thegem.press</loc>` to `<loc>https://thegem.press/</loc>` for consistency with internal links.
- **Provision Google PageSpeed Insights API key** so CWV can be measured on demand. Set `PAGESPEED_API_KEY` in `.env`.

---

## Verification checklist after deploying fixes

- [ ] `curl -s https://thegem.press/stories/paraiba-tourmaline | grep -E 'canonical|og:url|publisher'` — canonical present, og:url present, publisher URL `thegem.press`
- [ ] Rich Results Test passes for an Article URL with no `FAQPage` ignored-type warning
- [ ] Schema Markup Validator on `/` shows no `FAQPage` block
- [ ] `python <skill>/scripts/social_meta.py https://thegem.press/ --json` reports score 100, no missing OG tags
- [ ] Sitemap shows distinct `<lastmod>` values across URLs
- [ ] Search Console → Page indexing report unchanged or improved after 2 weeks
