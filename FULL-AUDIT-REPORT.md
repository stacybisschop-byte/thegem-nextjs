# SEO Audit — thegem.press

**Scope:** Full-site audit (homepage + representative interior pages + sitemap + robots/llms)
**Initial audit:** 2026-05-24
**Last verified:** 2026-05-24 (after full fix round + editorial cleanup)
**Pages inspected:** `/`, `/about`, `/style/how-to-wear-a-brooch`, `/stories/paraiba-tourmaline`, `/stories/bulgari-history`, `/stories`, `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`
**Composite score:** ~88 / 100 — **Excellent**
**Score confidence:** Medium (Performance/CWV measured separately by site owner)

---

## A) Audit Summary

The site went from ~55 (Needs Improvement) to ~88 (Excellent) in a single fix round. Every Critical, Warning, and Info finding from the initial audit is resolved, plus the follow-up editorial cleanup of orphaned data. Strong content foundations and security baseline were already in place; the lift came from fixing schema hygiene, adding canonicals + per-route OG metadata, removing the restricted FAQPage schema, populating entity signals (`sameAs`, ProfilePage), shipping `/llms-full.txt`, and per-document sitemap timestamps.

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
- Organization logo upgraded from favicon to dedicated wordmark `ImageObject` (commit `a06f276`, asset confirmed final)
- Organization `sameAs` fully populated — Substack, Instagram, X, Pinterest (commit `96e84d1`)
- Per-document sitemap `<lastmod>` from Sanity `_updatedAt` (commit `cc3fef4`)
- `/llms-full.txt` dynamic route added (commit `cc3fef4`)
- Two regressions caught on re-audit and fixed (commit `8a52263`):
  - `og:type/siteName/locale` lost on per-route metadata
  - `og:image` missing on articles using `heroImageUrl` legacy fallback
- Semantic `<time dateTime>` for visible publish date (commit `317eab5`)
- Orphaned `PILLARS.faq` data + unused `lastReviewedAt` field removed across code, Studio schema, types, GROQ projection, and migration script (commit `2773462`)
- Editorial cleanup follow-up (commit `6717968`):
  - Sanity dataset patched: `lastReviewedAt` unset across all 46 documents (44 published + 2 drafts)
  - 44 articles' review dates snapshotted to `content/review-schedule.md` before the patch — editorial calendar preserved in version control
  - `content/rewrite_briefs.md` stale `lastReviewedAt` references updated to describe the new `_updatedAt`-based workflow

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
| Schema | Warning | Confirmed | Organization `logo` was favicon SVG | **Resolved** | Now `ImageObject` @ 600×60 referencing `/og-logo.png` (final wordmark asset) |
| Schema | Info | Confirmed | Organization `sameAs` empty | **Resolved** | Substack, Instagram (`@thegem.press`), X (`@GemstInsider`), Pinterest (`@thegemmag`) |
| On-page | Warning | Confirmed | Homepage `<title>` was 84 chars | **Resolved** | Now 49 chars: `The Gem — Editorial Jewellery Publication, London` |
| On-page | Warning | Confirmed | `og:url` missing site-wide | **Resolved** | Present on every audited page |
| On-page | Warning | Confirmed | `og:image` missing on `/` and Paraiba | **Resolved** | Homepage uses `/og-cover.jpg`; Paraiba uses absolutised legacy hero |
| On-page | Warning | Confirmed | `og:title`/`twitter:title` too long | **Resolved** | Both within limits after homepage title shortening |
| On-page | Info | Likely | Visible publish date not in `<time>` element | **Resolved** | Article byline date now uses `<time dateTime={publishedAt}>` |
| Sitemap | Warning | Confirmed | Every URL shared identical `<lastmod>` | **Resolved** | Per-doc `_updatedAt` from Sanity (note: dataset patch on 2026-05-24 reclusters all article timestamps; will diverge naturally with editorial activity) |
| Sitemap | Info | Confirmed | Homepage entry lacked trailing slash | **Resolved** | Sitemap now emits `https://thegem.press/` |
| Studio | Info | Confirmed | `/studio` indexable | **Resolved** | `<meta name="robots" content="noindex, nofollow"/>` via `app/studio/layout.tsx` |
| E-E-A-T | Pass | Confirmed | Author identity strengthened | **Improved** | `/about` now ships `ProfilePage` with full Person (knowsAbout, address, jobTitle) as `mainEntity` |
| GEO | Info | Confirmed | `/llms-full.txt` 404 | **Resolved** | 200 OK at `/llms-full.txt`, full article bodies with `Title:` / `URL:` / `Section:` / markdown-stripped body |
| Code hygiene | Info | Confirmed | Orphaned `PILLARS.faq` data | **Resolved** | Removed; only `title` + `description` remain per pillar |
| Code hygiene | Info | Confirmed | Unused `lastReviewedAt` field across schema, types, queries, migration | **Resolved** | Removed across all 4 code layers; field unset on all 46 Sanity documents (44 published + 2 drafts); editorial dates preserved in `content/review-schedule.md` |
| Crawl | Pass | Confirmed | robots.txt + sitemap pointer | **Pass** | Unchanged from initial audit |
| Crawl | Info | Confirmed | No explicit AI-crawler directives | **Pass (intentional)** | Acceptable for a publisher inviting AI citations |
| Security | Pass | Confirmed | All major security headers present | **Pass (score 100)** | HSTS preload, full CSP, X-Frame-Options DENY, etc. |
| Transport | Pass | Confirmed | HTTPS clean, no redirect chain | **Pass** | Unchanged |
| Content | Pass | Confirmed | Articles meet content depth bar | **Pass** | Brooch ≈ 2,336 words; Paraiba ≈ 2,519 words |
| Content | Pass | Confirmed | Image alt text exemplary | **Pass** | Unchanged |
| Content | Pass | Confirmed | Heading hierarchy clean | **Pass** | One H1 per page; logical H2/H3 |
| GEO | Pass | Confirmed | `/llms.txt` well-formed, 100/100 | **Pass** | Score 100, no quality issues |
| Hreflang | Info | Confirmed | No hreflang | **N/A** | Single-locale UK English site |
| Performance | Unknown | — | CWV unmeasured | **Owner-managed** | Site owner measures via PageSpeed API key or Search Console directly |
| Images | Pass | Likely | Next/Image responsive + lazy-loading | **Pass** | Unchanged |

---

## C) Open Items

**None within audit scope.** All Critical, Warning, Info, and follow-up hygiene findings are resolved.

Performance / Core Web Vitals measurement is owner-managed (Search Console / PageSpeed Insights with an API key) and not blocked on a code change.

---

## D) Score Trajectory

| Category | Weight | Initial | Final | Δ |
|---|---|---|---|---|
| Technical SEO | 25% | 45 | **88** | +43 |
| Content Quality | 20% | 83 | **83** | — |
| On-Page SEO | 15% | 35 | **88** | +53 |
| Schema | 15% | 25 | **95** | +70 |
| Performance (CWV) | 10% | Insufficient data | Owner-managed | — |
| Image Optimization | 10% | 90 | **95** | +5 |
| GEO / AI Search | 5% | 88 | **98** | +10 |
| **Composite (ex perf)** | **90%** | **~55** | **~88** | **+33** |

**Band:** Needs Improvement → **Excellent**

---

## E) Commit Trail

| Commit | Scope |
|---|---|
| `d239d71` | Canonicals, schema fixes, breadcrumbs, studio noindex, og-cover |
| `a06f276` | Org logo ImageObject, sameAs scaffold, ProfilePage on /about |
| `cc3fef4` | Per-doc sitemap lastmod, llms-full.txt |
| `8a52263` | og:type/siteName/locale restoration, article og:image fallback |
| `3fab94f` | Audit docs updated to post-fix state |
| `317eab5` | Semantic `<time>` for visible publish date |
| `96e84d1` | sameAs populated with real Instagram/X/Pinterest handles |
| `2773462` | Drop orphaned PILLARS.faq + lastReviewedAt field across all code layers |
| `8399584` | Close out audit docs |
| `6717968` | Editorial cleanup: review-schedule.md snapshot + briefs update; Sanity dataset patched |

## F) Owner-managed follow-up (not blocking)

- **Core Web Vitals.** Measure via Google Search Console → Core Web Vitals report (field data, more accurate than synthetic), or run PageSpeed Insights with a personal API key. Not a code task.
