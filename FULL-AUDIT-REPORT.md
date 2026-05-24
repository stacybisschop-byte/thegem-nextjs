# SEO Audit — thegem.press

**Scope:** Full-site audit (homepage + representative interior pages + sitemap + robots/llms)
**Initial audit:** 2026-05-24
**Last verified:** 2026-05-24 (after fixes)
**Pages inspected:** `/`, `/about`, `/style/how-to-wear-a-brooch`, `/stories/paraiba-tourmaline`, `/stories/bulgari-history`, `/stories`, `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`
**Composite score:** ~88 / 100 — **Excellent**
**Score confidence:** Medium (PageSpeed API still rate-limited, no measured CWV)

---

## A) Audit Summary

The site went from ~55 (Needs Improvement) to ~88 (Excellent) after a single round of fixes. Every Critical and Warning finding from the initial audit has been resolved. Strong content foundations and security baseline were already in place; the lift came from fixing schema hygiene, adding canonicals + per-route OG metadata, removing the restricted FAQPage schema, and shipping `/llms-full.txt`.

### Original Top 3 Critical issues — all resolved

1. ~~Publisher URL mismatch (`thegem.co` vs `thegem.press`)~~ → **Resolved**, commit `d239d71`
2. ~~No `<link rel="canonical">` on any page~~ → **Resolved**, commit `d239d71`
3. ~~FAQPage JSON-LD on commercial pages~~ → **Resolved**, commit `d239d71`

### Original Top 3 Opportunities — all resolved

1. ~~Canonical tags + `og:url` site-wide~~ → **Resolved**, commit `d239d71`
2. ~~`Article.dateModified` precedes `datePublished`~~ → **Resolved**, commit `d239d71`
3. ~~Missing `BreadcrumbList`~~ → **Resolved**, commit `d239d71`

### Extra wins landed during the fix round

- Studio `noindex` via `app/studio/layout.tsx` (commit `d239d71`)
- ProfilePage on `/about` with rich Person nested as `mainEntity` (commit `a06f276`)
- Organization logo upgraded from favicon to dedicated ImageObject (commit `a06f276`)
- Organization `sameAs` populated (Substack confirmed; Instagram/Pinterest left as TODOs pending real handles)
- Per-document sitemap `<lastmod>` from Sanity `_updatedAt` (commit `cc3fef4`)
- `/llms-full.txt` dynamic route added (commit `cc3fef4`)
- Two regressions caught on re-audit and fixed (commit `8a52263`):
  - `og:type/siteName/locale` lost on per-route metadata (Next.js openGraph doesn't merge)
  - `og:image` missing on articles using `heroImageUrl` legacy fallback

---

## B) Findings Table

| Area | Severity | Confidence | Finding | Status | Evidence |
|---|---|---|---|---|---|
| Schema | Critical | Confirmed | Article `publisher.url` was `https://thegem.co` | **Resolved** | Now `https://thegem.press` on `/stories/paraiba-tourmaline` and `/stories/bulgari-history` |
| Indexing | Critical | Confirmed | No `<link rel="canonical">` tags | **Resolved** | Canonical present on `/`, `/about`, `/stories`, all article routes |
| Schema | Critical | Confirmed | FAQPage JSON-LD on commercial pages | **Resolved** | No `FAQPage` in JSON-LD type list on any audited page |
| Schema | Warning | Confirmed | `dateModified` preceded `datePublished` | **Resolved** | Paraiba: pub `14:00:40` → mod `14:01:23`; logic clamps to `>= datePublished` |
| Schema | Warning | Confirmed | Article `image` was relative URL | **Resolved** | Paraiba schema image now `https://thegem.press/blog/paraiba-tourmaline.webp` |
| Schema | Warning | Confirmed | No `BreadcrumbList` schema | **Resolved** | 3-item on article routes (Home → Section → Article), 2-item on section indexes |
| Schema | Warning | Confirmed | Organization `logo` was favicon SVG | **Resolved** | Now `ImageObject` @ 600×60 referencing `/og-logo.png` |
| Schema | Info | Confirmed | Organization `sameAs` empty | **Partial** | Substack added (`https://thegemmag.substack.com`); Instagram + Pinterest TODOs pending real handles |
| On-page | Warning | Confirmed | Homepage `<title>` was 84 chars | **Resolved** | Now 49 chars: `The Gem — Editorial Jewellery Publication, London` |
| On-page | Warning | Confirmed | `og:url` missing site-wide | **Resolved** | Present on every audited page |
| On-page | Warning | Confirmed | `og:image` missing on `/` and Paraiba | **Resolved** | Homepage uses `/og-cover.jpg`; Paraiba uses absolutised legacy hero |
| On-page | Warning | Confirmed | `og:title`/`twitter:title` too long | **Resolved** | Both within limits after homepage title shortening |
| Sitemap | Warning | Confirmed | Every URL shared identical `<lastmod>` | **Resolved** | 32 distinct timestamps across 36 URLs (per-doc `_updatedAt` from Sanity) |
| Sitemap | Info | Confirmed | Homepage entry lacked trailing slash | **Resolved** | Sitemap now emits `https://thegem.press/` |
| Studio | Info | Confirmed | `/studio` indexable | **Resolved** | `<meta name="robots" content="noindex, nofollow"/>` via `app/studio/layout.tsx` |
| E-E-A-T | Pass | Confirmed | Author identity strengthened | **Improved** | `/about` now ships `ProfilePage` with full Person (knowsAbout, address, jobTitle) as `mainEntity` |
| GEO | Info | Confirmed | `/llms-full.txt` 404 | **Resolved** | 200 OK at `/llms-full.txt`, full article bodies with `Title:` / `URL:` / `Section:` / markdown-stripped body |
| Crawl | Pass | Confirmed | robots.txt + sitemap pointer | **Pass** | Unchanged from initial audit |
| Crawl | Info | Confirmed | No explicit AI-crawler directives | **Pass (intentional)** | Acceptable for a publisher inviting AI citations |
| Security | Pass | Confirmed | All major security headers present | **Pass (score 100)** | HSTS preload, full CSP, X-Frame-Options DENY, etc. |
| Transport | Pass | Confirmed | HTTPS clean, no redirect chain | **Pass** | Unchanged |
| Content | Pass | Confirmed | Articles meet content depth bar | **Pass** | Brooch ≈ 2,336 words; Paraiba ≈ 2,519 words |
| Content | Pass | Confirmed | Image alt text exemplary | **Pass** | Unchanged |
| Content | Pass | Confirmed | Heading hierarchy clean | **Pass** | One H1 per page; logical H2/H3 |
| GEO | Pass | Confirmed | `/llms.txt` well-formed, 100/100 | **Pass** | Score 100, no quality issues |
| Hreflang | Info | Confirmed | No hreflang | **N/A** | Single-locale UK English site |
| Performance | Unknown | — | CWV unmeasured | **Open** | PageSpeed Insights API rate-limited at audit time. Re-run with `PAGESPEED_API_KEY` or read Search Console directly |
| Images | Pass | Likely | Next/Image responsive + lazy-loading | **Pass** | Unchanged |

---

## C) Remaining Action Items

See `ACTION-PLAN.md`. Three items remain:

1. **Add real Instagram + Pinterest handles** to Organization `sameAs` (TODOs in `app/layout.tsx`)
2. **Measure Core Web Vitals** — provision `PAGESPEED_API_KEY` or check Search Console
3. **Optional polish** — proper wordmark logo, render publish date visibly in article HTML

---

## D) Score Trajectory

| Category | Weight | Initial | Post-fix | Δ |
|---|---|---|---|---|
| Technical SEO | 25% | 45 | **88** | +43 |
| Content Quality | 20% | 83 | **83** | — |
| On-Page SEO | 15% | 35 | **88** | +53 |
| Schema | 15% | 25 | **90** | +65 |
| Performance (CWV) | 10% | Insufficient data | Insufficient data | — |
| Image Optimization | 10% | 90 | **95** | +5 |
| GEO / AI Search | 5% | 88 | **98** | +10 |
| **Composite (ex perf)** | **90%** | **~55** | **~88** | **+33** |

**Band:** Needs Improvement → **Excellent**

---

## Environment Limitations

- **PageSpeed Insights API** remained rate-limited across two audit runs (no API key configured). Performance category still `Insufficient data`. Recommended next step: provision `PAGESPEED_API_KEY` in `.env`, or read CWV directly from Google Search Console → Page Experience report.
- All other technical checks ran successfully against the live site.

## Commit Trail

| Commit | Scope |
|---|---|
| `d239d71` | Canonicals, schema fixes, breadcrumbs, studio noindex, og-cover |
| `a06f276` | Org logo ImageObject, sameAs, ProfilePage on /about |
| `cc3fef4` | Per-doc sitemap lastmod, llms-full.txt |
| `8a52263` | og:type/siteName/locale restoration, article og:image fallback |
