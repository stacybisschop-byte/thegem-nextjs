# SEO Audit — thegem.press

**Scope:** Full-site audit (homepage + representative interior pages + sitemap + robots/llms)
**Date:** 2026-05-24
**Pages inspected:** `/`, `/style/how-to-wear-a-brooch`, `/stories/paraiba-tourmaline`, `/stories`, `sitemap.xml`, `robots.txt`, `llms.txt`
**Overall directional score:** ~55 / 100 — **Needs Improvement**
**Score confidence:** Low (PageSpeed API rate-limited, no measured CWV)

---

## A) Audit Summary

The site has strong content foundations (substantial editorial pieces, excellent image alt text, semantic HTML, llms.txt present) and an excellent security/transport baseline (HSTS preload, full CSP, HTTPS clean). However, several **schema and indexing hygiene issues** drag the score down — most are quick-win fixes in the Next.js metadata layer.

### Top 3 issues (Critical)

1. **Publisher URL mismatch in Article schema** — every Article block declares `publisher.url: "https://thegem.co"` while the site lives on `thegem.press`. Confirmed on brooch + Paraiba articles.
2. **No `<link rel="canonical">` on any inspected page** — homepage, articles, and section index all lack canonical tags.
3. **FAQPage schema on commercial pages** — homepage and `/stories` ship FAQPage JSON-LD. Google restricted this to gov/healthcare in August 2023; it's dead code that signals outdated SEO knowledge.

### Top 3 opportunities (Quick wins)

1. Add canonical tags + `og:url` site-wide via Next.js Metadata `metadataBase` + `alternates.canonical`.
2. Fix `Article.dateModified` logic — currently set to a date *earlier* than `datePublished` on multiple articles.
3. Add a `BreadcrumbList` JSON-LD block on `/stories/*`, `/style/*`, `/guides/*` for SERP breadcrumb display.

---

## B) Findings Table

| Area | Severity | Confidence | Finding | Evidence | Fix |
|---|---|---|---|---|---|
| Schema | Critical | Confirmed | Article `publisher.url` points to wrong domain | `"publisher": {"url": "https://thegem.co"}` on `/style/how-to-wear-a-brooch` and `/stories/paraiba-tourmaline`; site canonical domain is `thegem.press` | Replace `thegem.co` with `https://thegem.press` in the shared Article schema generator |
| Indexing | Critical | Confirmed | No `<link rel="canonical">` tags | parse_html.py reports `canonical: null` on `/`, `/stories`, `/style/how-to-wear-a-brooch`, `/stories/paraiba-tourmaline` | Set `metadataBase` once in `app/layout.tsx` and add `alternates: { canonical: '/...' }` per route, or per-route `generateMetadata` |
| Schema | Critical | Confirmed | FAQPage JSON-LD on commercial pages | `@type: FAQPage` blocks on `/` and `/stories` | Remove `FAQPage` JSON-LD entirely (restricted to gov/healthcare since 2023-08). Keep the visible FAQ HTML — it still helps users and AI engines |
| Schema | Warning | Confirmed | `dateModified` precedes `datePublished` | Brooch: `datePublished: 2026-05-24`, `dateModified: 2026-05-01`. Paraiba: same pattern | Ensure `dateModified >= datePublished`. If unknown, omit `dateModified` |
| Schema | Warning | Confirmed | Article `image` uses relative URL on Paraiba | `"image": "/blog/paraiba-tourmaline.webp"` in JSON-LD | Schema images must be absolute — prepend the canonical origin |
| Schema | Warning | Confirmed | No `BreadcrumbList` schema | Grep `breadcrumb`: absent on brooch + Paraiba HTML | Add per-route `BreadcrumbList` JSON-LD with positioned items for SERP breadcrumbs |
| Schema | Warning | Confirmed | Organization `logo` is the favicon SVG | `"logo": "https://thegem.press/favicon.svg"` in Organization block | Use a dedicated logo image with explicit dimensions (e.g. 600×60 PNG) — Knowledge Panel logo eligibility requires a raster/SVG image, ideally non-favicon |
| Schema | Info | Confirmed | Organization `sameAs` is empty | `"sameAs": []` | Add canonical social/identity URLs (Instagram, LinkedIn, Wikipedia, Substack, etc.) once they exist — strong entity-disambiguation signal |
| On-page | Warning | Confirmed | Homepage `<title>` 84 chars (exceeds ~60 SERP cutoff) | `"The Gem — For people who buy beautiful things and want to know the story behind them"` | Shorten to ≤ 60 chars, e.g. `"The Gem — Editorial Jewellery Publication, London"`. Move the long tagline to meta description |
| On-page | Warning | Confirmed | `og:url` missing on every inspected page | social_meta.py: og:url not present | Add `openGraph.url` to Next.js Metadata; set `metadataBase` once |
| On-page | Warning | Confirmed | `og:image` missing on homepage and Paraiba | Confirmed via meta extraction. Present on brooch only | Add per-route `openGraph.images` — use the same hero image as the page |
| On-page | Warning | Confirmed | `og:title` / `twitter:title` 84 chars | social_meta.py issues | Use a shorter `openGraph.title` (≤ 60) distinct from the page `<title>` if needed |
| Sitemap | Warning | Confirmed | Every URL shares identical `<lastmod>` | All 36 URLs have lastmod `2026-05-24T14:02:24.979Z` | Use per-URL `lastModified` (Sanity `_updatedAt` for content; build date only for static routes) — Google de-emphasises lastmod that "always equals now" |
| Sitemap | Info | Confirmed | Homepage entry lacks trailing slash | `<loc>https://thegem.press</loc>` while internal links use `https://thegem.press/` | Standardise on `https://thegem.press/` |
| Crawl | Pass | Confirmed | robots.txt valid, sitemap declared, no over-blocking | robots_checker.py: `Allow: /`, `Disallow: /studio/ /api/`, sitemap pointer present | — |
| Crawl | Info | Confirmed | No explicit AI-crawler directives | 11 AI bots inherit `*` rules (allowed) | This is fine *if* you want AI citations (you do — llms.txt is present). No action needed |
| Security | Pass | Confirmed | All major security headers present | HSTS preload, full CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy locked down | Score: 100 |
| Transport | Pass | Confirmed | HTTPS clean, no redirect chain | redirect_checker.py: 0 hops, 245 ms TTFB | — |
| Content | Pass | Confirmed | Articles meet content depth bar | Brooch ≈ 2,336 words, Paraiba ≈ 2,519 words | — |
| Content | Pass | Confirmed | Image alt text is exemplary | Every image in parsed sample has a long, descriptive alt (e.g. "A late Victorian or Edwardian amethyst and seed pearl brooch in yellow gold scrollwork...") | — |
| Content | Pass | Confirmed | Heading hierarchy is clean | One `<h1>` per page; logical `<h2>`/`<h3>` use across all inspected pages | — |
| Content | Pass | Confirmed | Semantic landmarks present | `<main>`, `<nav>`, `<article>` on article routes | — |
| GEO | Pass | Confirmed | `/llms.txt` exists, well-formed, 100% quality score | llms_txt_checker.py: 200, 36 entries indexed, no quality issues | — |
| GEO | Info | Confirmed | `/llms-full.txt` missing (404) | llms_txt_checker.py: `full_status: 404` | Optional — add a long-form llms-full.txt with full article text concatenated, for deeper LLM ingestion |
| E-E-A-T | Pass | Likely | Author identity present | Article.author = "Florence"; About page exists; FAQ block names her, role, experience | Add ProfilePage schema for `/about` to strengthen author entity |
| E-E-A-T | Warning | Likely | No visible byline date in HTML on articles | `<time>` element absent on brooch + Paraiba (datePublished only in JSON-LD) | Render the publish date visibly on each article (above the fold). Google has flagged invisible-date schema |
| Hreflang | Info | Confirmed | No `hreflang` tags | None on any inspected page | Not required — single-locale UK English site. Only add if you launch other regions |
| Performance | Unknown | — | CWV unmeasured | Google PageSpeed Insights API rate-limited during audit; CrUX field data not retrieved | Re-run `pagespeed.py` with a `PAGESPEED_API_KEY`, or check Search Console → Core Web Vitals report directly |
| Images | Pass | Likely | Next/Image responsive + lazy-loading | All below-fold images have `loading="lazy"`; using `_next/image` URL transformer | — |

---

## C) Prioritized Action Plan

See **ACTION-PLAN.md** for the executable list. High-level order:

1. **Immediate (this week)** — fix the 3 Critical schema/canonical issues. All three are config-level changes in the Next.js metadata layer, not content work.
2. **Quick wins (this sprint)** — homepage title shortening, og:url + og:image consistency, dateModified logic, absolute image URLs in schema.
3. **Strategic** — BreadcrumbList schema, proper Organization logo, visible publish dates, per-URL sitemap lastmod.
4. **Measurement gap** — provision a PageSpeed Insights API key and re-run CWV; verify the publisher domain fix in Search Console's Rich Results test.

---

## D) Unknowns and Follow-ups

| Item | What's missing | How to resolve |
|---|---|---|
| Core Web Vitals | LCP / INP / CLS — PageSpeed API rate-limited | Re-run `python <skill>/scripts/pagespeed.py https://thegem.press/ --strategy mobile --json --api-key <KEY>` or read Search Console CWV report directly |
| Indexed page count vs sitemap | Don't know how many of the 36 URLs are actually indexed | Check Search Console → Pages report |
| Backlink profile | No external link data collected | Run `seo links https://thegem.press` (separate workflow) |
| Image weight / LCP candidate | Lazy/responsive verified, but transfer size not measured | Inspect Network panel on `/`, focus on the brooch hero |

---

## Category Scores (directional)

> Per rubric: scores are directional summaries, not absolute truth. Schema score is arithmetically harsh because the Article schema *does* work — most issues are sub-optimal rather than blocking.

| Category | Weight | Score | Notes |
|---|---|---|---|
| Technical SEO | 25% | 45 | Strong transport/headers/robots; pulled down by missing canonical + publisher URL mismatch |
| Content Quality | 20% | 83 | Long-form, well-structured, strong alt text, identifiable author |
| On-Page SEO | 15% | 35 | Title too long, no canonical, og:url/og:image gaps |
| Schema | 15% | 25 | Article schema works but multiple hygiene issues + restricted FAQPage |
| Performance (CWV) | 10% | Insufficient data | PageSpeed rate-limited |
| Image Optimization | 10% | 90 | Excellent alts, Next/Image responsive — transfer size unverified |
| GEO / AI Search | 5% | 88 | llms.txt present + complete; only `llms-full.txt` missing |
| **Composite** (excluding perf) | **90%** | **~55** | **Needs Improvement** — but high upside on quick wins |

---

## Environment Limitations

- **PageSpeed Insights API rate-limited** during audit (no API key configured). Performance category marked `Insufficient data`.
- All other technical checks ran successfully against the live site.
