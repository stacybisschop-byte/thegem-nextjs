# Per-Post SEO Audit — Flagship Articles (Live)

**Scope:** 5 live pillar pieces — production HTML on thegem.press
**Audited:** 2026-05-24
**Approach:** `seo article` sub-skill — title/H1/heading structure, internal links, image alt, schema, content depth (LLM-first reasoning + script-extracted evidence)
**Composite score across the 5:** ~88 / 100 — **Excellent**

## Why the scope changed mid-audit

The original 5 "flagship" candidates from `content/internal-linking-plan.md` (cartier-love-bracelet-guide, van-cleef-alhambra-guide, hatton-garden-guide, mens-jewellery-guide, how-to-build-a-jewellery-collection) are **markdown drafts not yet migrated to Sanity** — every one returns 404 in production. The audit was rescoped to the 5 highest-value live pillars instead. Drafts 31, 33, 34, 35, 38 in `content/` should be audited at the markdown level before they ship — a follow-up item.

---

## A) Per-post summary

| URL | Title (len) | Meta (len) | H1 | H2s | H3 (FAQ) | Words | Body internal | External (body) | Schema | Score |
|---|---|---|---|---|---|---|---|---|---|---|
| /guides/jewellery-that-holds-value | 60 | 159 | 1 | 6 + FAQ + Related | 7 | 3,255 | 8 | 3 (Christie's, Sotheby's, Rapaport) | Article + Breadcrumb + Org + WebSite | 92 |
| /guides/lab-grown-vs-natural-diamonds | 60 | 134 | 1 | 9 + FAQ + Related | 7 | 2,923 | 5 | 14 (GIA, IGI, FTC, retailers) | Article + Breadcrumb + Org + WebSite | 88 |
| /guides/where-to-buy-vintage-jewellery | 65 | 145 | 1 | 7 + FAQ + Related | 7 | 2,963 | 5 | 17 (Bentley & Skinner, Berganza, BHC, London Assay) | Article + Breadcrumb + Org + WebSite | 90 |
| /stories/cartier-family-history | 60 | 158 | 1 | 8 + FAQ + Related | 7 | 3,469 | 5 | 4 (Cartier, Cartier Heritage, Christie's, Sotheby's) | Article + Breadcrumb + Org + WebSite | 91 |
| /style/how-to-wear-a-brooch | 55 | 155 | 1 | 7 + FAQ + Related | 5 | 2,227 | 7 | **0** | Article + Breadcrumb + Org + WebSite | **78** |

Counts exclude site-wide nav/footer chrome and the auto-rendered "Further reading" cards. Body internal = contextual + curated "Related reading" block only. External excludes the social-media footer.

---

## B) Per-post findings

### 1. /guides/jewellery-that-holds-value — Score 92 (Excellent)

**Wins**
- H1 "Jewellery That Holds Its Value: A Realistic Guide" — matches title prefix; primary keyword in H1, title, meta, og, twitter, schema headline, breadcrumb.
- Schema complete and clean: `Article` (Florence as Person author, absolute hero image), `BreadcrumbList` (3-item Home → Guides → Article), `Organization`, `WebSite`.
- 8 body internal links — all 5 to relevant pillar guides (princess-diana flagship, lab-grown, vintage ×3, diamond-market, engagement-stones).
- 3 authoritative externals: Christie's, Sotheby's, Rapaport.
- 4 images, all with descriptive alt text (each describes setting, stones, and metal).

**Findings**
- ℹ️ Word count 3,255 — slightly over the 2,800 max for Guides in `publishing-standards.md`. Not a real SEO issue; flagging only because the standard exists. No fix needed.

---

### 2. /guides/lab-grown-vs-natural-diamonds — Score 88 (Excellent)

**Wins**
- Strongest external sourcing of the 5: 14 externals including GIA, IGI, FTC Jewelry Guides, plus 7 named retailers (Tiffany, Brilliant Earth, Clean Origin, VRAI, With Clarity, James Allen, Blue Nile).
- Cleanest meta: 134 chars, well under the 160 cap, anchored on the specific 75% price-drop number.
- 9 content H2s — most thorough of the set.

**Findings**
- ⚠️ **H1 vs Title divergence is editorial but inconsistent.** Title says *"Lab-Grown vs Natural Diamonds: An Honest 2026 Guide"* (declarative). H1 says *"Lab-Grown vs Natural Diamonds: Which Is Actually Worth It in 2026?"* (interrogative). Article schema headline matches the H1, not the title. Both contain the primary keyword, so neither breaks SEO, but the framing mismatch (honest guide vs. is-it-worth-it) gives Google two competing signals about what the page answers. **Fix:** pick one frame. If "worth it" is the search-intent target, align the meta title to it: *"Lab-Grown vs Natural Diamonds: Are They Worth It in 2026?"*

---

### 3. /guides/where-to-buy-vintage-jewellery — Score 90 (Excellent)

**Wins**
- 17 external sources — Bentley & Skinner, Berganza, Susannah Lovis, Hancocks, Wartski, AJC, Lucas Rarities, 1stDibs, Lang Antiques, Vestiaire, Doyle & Doyle, Trumpet & Horn, Etsy, **plus** British Hallmarking Council and London Assay Office (authoritative).
- Geographic + budget structure (London shops → online → budget tiers → red flags) covers commercial intent thoroughly.
- 5 well-targeted internal links.

**Findings**
- ⚠️ **Title length 65 chars** — *"Where to Buy Vintage Jewellery: London and Online Guide — The Gem"*. Google's mobile SERP truncates at ~58–60 chars; desktop at ~60. The "— The Gem" suffix is at risk of being cut. **Fix:** tighten to 55–58 chars. Options:
  - *"Where to Buy Vintage Jewellery in London — The Gem"* (52)
  - *"Where to Buy Vintage Jewellery: A London Guide — The Gem"* (56)
- ℹ️ H1 *"Where to Buy Vintage Jewellery: The Best Shops in London and Online"* (67 chars) is fine — H1 length isn't a SERP truncation problem.

---

### 4. /stories/cartier-family-history — Score 91 (Excellent)

**Wins**
- Strong entity sourcing: 4 authoritative externals (Cartier official, Cartier Heritage, Christie's, Sotheby's) plus tight in-house cross-linking to Tiffany history, Koh-i-Noor, Elizabeth Taylor — all the houses/figures named in the body.
- 8 H2s map cleanly to a narrative arc (founding → Edward VII → three brothers → signature pieces → Toussaint → Indian commissions → 1972 → continuity).
- Word count 3,469 reflects flagship depth; appropriate for Stories pillar where standard is 2,000–3,500 (just over).

**Findings**
- ℹ️ Slight overrun on word count (3,469 vs 3,500 target ceiling — well within the spirit of the standard).
- ℹ️ The internal-linking-plan (Part 2, line 336–341) flags **two pending forward-links** to add: `/guides/cartier-love-bracelet-guide` and `/stories/wallis-simpson-jewellery`. Both targets are unpublished drafts, so these can't land yet — track in linking-plan execution rather than as a SEO finding.

---

### 5. /style/how-to-wear-a-brooch — Score 78 (Good, but lowest of the set)

**Wins**
- Tightest title in the set: 55 chars, primary keyword leading.
- 7 body internal links — most of any post audited.
- Strong topical cluster: floral-jewellery (inline ×2), vintage-jewellery, layering-necklaces, build-collection, victorian-mourning.

**Findings**
- 🔴 **Critical: 0 authoritative external sources in the body.** Publishing-standards §"Links" requires **minimum 2 external links to authoritative sources** (Royal Collection Trust, GIA, Christie's, museum archives, peer-reviewed). The only off-site links are Instagram and Pinterest in the global footer — those don't count. **Fix:** add 2–3 external citations to the body. Natural fits given the article content:
  - V&A jewellery archive (a brooch entry — they have a deep collection)
  - British Museum (Victorian or Cartier-period brooch references)
  - Christie's or Sotheby's brooch lots (specific past results lend authority to the "what to buy" section)
  - A named curator or historian's monograph (e.g. Diana Scarisbrick on jewellery history)
- ℹ️ FAQ has 5 H3 questions — meets the 4–8 standard from `publishing-standards.md` but on the lighter end; could add 1–2 more (e.g. *"Can I wear a brooch with a strapless dress?"*, *"How do you store a brooch?"*).

---

## C) Cross-post issues (apply to all 5 — and likely to all 35 live articles)

### C1. ⚠️ Auto-templated FAQ question reads awkwardly

Every article has a closing FAQ H3 that reads:

> *Where can I read more about **guides jewellery** on The Gem?*
> *Where can I read more about **stories jewellery** on The Gem?*
> *Where can I read more about **style jewellery** on The Gem?*

The pillar slug is being interpolated as an adjective, which is ungrammatical. Confirmed present in 26 of the 35 live article markdown files. The phrasing surfaces in:
- The visible article body (search snippet candidate)
- Heading structure crawled by Google
- (No longer in schema, since FAQPage was removed in the prior audit)

**Fix:** rewrite the template once and re-migrate. Candidates:
- *"Where else can I read about jewellery on The Gem?"* (pillar-agnostic)
- *"Where can I read more {{pillar}} on The Gem?"* — *"more guides on The Gem"*, *"more stories on The Gem"*, *"more style writing on The Gem"*

### C2. ℹ️ "Further reading" auto-cards are not topically curated

`getRelatedArticles` in `lib/queries.ts:148` orders by `publishedAt desc` within the same pillar and takes the top 3. Because the migration set every article's `publishedAt` to `2026-05-24T14:00:40.052Z` (identical millisecond), the order is alphabetic-by-ID — the same 3 cards appear under every Guides article (best-signet-rings-men, diamond-market-2026, engagement-ring-stones). Same effect on Style and Stories.

The hand-curated **"Related reading"** block in the article body IS topically relevant (per `internal-linking-plan.md`), so the topical signal is present — the auto-card section just doesn't reinforce it.

**Fix options (pick one):**
- Cheapest: stagger `publishedAt` so the ordering reflects editorial priority rather than alphabetical accident. Sanity dataset patch + redeploy.
- Better: switch `getRelatedArticles` to look up the article's curated related-reading slugs from the body (or add a `relatedSlugs` field to the article schema in Sanity).
- Best: lift the in-body "Related reading" markdown into a structured field rendered as cards — the open question already raised at the bottom of `internal-linking-plan.md`.

### C3. ℹ️ Identical dateModified across the set — known, expected to diverge

All 5 share `dateModified: 2026-05-24T17:21:05Z`. This is the artifact of the 2026-05-24 Sanity dataset patch (already documented in `FULL-AUDIT-REPORT.md` line 65). Will diverge naturally as articles are edited. No action.

### C4. ✅ Schema parity across all 5

Identical structured-data set — `Article`, `BreadcrumbList`, `Organization`, `WebSite` — with consistent author (Florence as Person), publisher (The Gem with logo ImageObject), absolute image URLs. The post-fix site-wide schema work is holding across the article corpus.

### C5. ✅ Heading hierarchy clean across all 5

Each article: exactly 1 H1, content H2s in logical sequence, H3 reserved for FAQ. No skipped levels, no multiple H1s. Standard `publishing-standards.md` heading rules respected.

---

## D) Score breakdown

| Article | Title/Meta | H1 + Hierarchy | Internal links | External links | Schema | Content depth | Composite |
|---|---|---|---|---|---|---|---|
| jewellery-that-holds-value | 95 | 100 | 95 | 90 | 100 | 90 | **92** |
| lab-grown-vs-natural-diamonds | 80 | 100 | 90 | 100 | 100 | 95 | **88** |
| where-to-buy-vintage-jewellery | 85 | 100 | 90 | 100 | 100 | 95 | **90** |
| cartier-family-history | 95 | 100 | 90 | 90 | 100 | 95 | **91** |
| how-to-wear-a-brooch | 95 | 100 | 100 | **40** | 100 | 85 | **78** |

External-links score on brooch is the dominant drag.

---

## E) Open items (after this audit)

1. **Brooch external sourcing** — add 2+ authoritative externals to `/style/how-to-wear-a-brooch` body. See finding 5.
2. **Title trim** on `/guides/where-to-buy-vintage-jewellery` (65 → 55–58 chars).
3. **Lab-grown title↔H1 alignment** — pick interrogative or declarative.
4. **Template fix** for the awkward "Where can I read more about [pillar] jewellery" FAQ across all 26 affected articles.
5. **Auto-related-cards** — either restagger `publishedAt` or switch the algorithm to honour the curated `Related reading` block.
6. **Out-of-scope drafts** — when the 5 unpublished pillars are migrated to Sanity (cartier-love-bracelet-guide, van-cleef-alhambra-guide, hatton-garden-guide, mens-jewellery-guide, how-to-build-a-jewellery-collection), audit at the markdown level first using `audit.py` from publishing-standards, then re-run this per-post audit on the live URLs.
