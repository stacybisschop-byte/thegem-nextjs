# Per-Post SEO Action Plan — Flagship Articles

Companion to `PER-POST-AUDIT.md`. Prioritized by impact ÷ effort.

## P0 — Critical (do first)

### 1. Add 2+ authoritative external sources to `/style/how-to-wear-a-brooch`

**Why:** Article currently has zero authoritative externals in the body, failing `content/publishing-standards.md` §Links. Drops the article's composite score from 88 to 78. E-E-A-T signal weakened.

**Where to look for natural fits in the existing body:**
- *"Lapel"* section → V&A's lapel-brooch entries (men's tailoring history).
- *"The grandmother question"* / Victorian context → V&A or British Museum Victorian brooch collection; Christie's or Sotheby's past auction results for a representative Victorian piece.
- *"What to buy"* section → an authority on jewellery history (Diana Scarisbrick's *Brooches* monograph, or a museum exhibition catalogue).

**Acceptance:** body contains ≥ 2 anchored external links to museum / auction house / scholarly source, with `rel="noopener noreferrer"` (matches existing pattern on the other 4 articles).

**Effort:** 30–45 minutes (research + 2 well-placed inline links + a Sources block addition).

---

## P1 — Warnings (fix next)

### 2. Trim title on `/guides/where-to-buy-vintage-jewellery`

**Current:** `Where to Buy Vintage Jewellery: London and Online Guide — The Gem` (65 chars)
**Target:** ≤ 60 chars. Suggested:
- *"Where to Buy Vintage Jewellery in London — The Gem"* (52)
- *"Where to Buy Vintage Jewellery: A London Guide — The Gem"* (56)

**Where:** Sanity → article → `metaTitle` field on the `where-to-buy-vintage-jewellery` document. No code change.

**Effort:** 2 minutes in Studio, then redeploy or wait for ISR.

---

### 3. Align title and H1 on `/guides/lab-grown-vs-natural-diamonds`

**Current:**
- meta `<title>`: *"Lab-Grown vs Natural Diamonds: An Honest 2026 Guide"*
- H1 / schema headline: *"Lab-Grown vs Natural Diamonds: Which Is Actually Worth It in 2026?"*

**Pick one frame and use it everywhere.** If the target query is "is a lab diamond worth it" → align the meta title to the H1. If it's "honest comparison guide" → align the H1 to the meta title.

**Where:** Sanity → article → `metaTitle` field, or article `title` field. No code change.

**Effort:** 5 minutes including thinking about which framing wins for CTR vs. relevance.

---

### 4. Rewrite the awkward "[pillar] jewellery" FAQ question across all articles

**Current (in 26 article markdowns):**
> ### Where can I read more about guides jewellery on The Gem?
> ### Where can I read more about stories jewellery on The Gem?
> ### Where can I read more about style jewellery on The Gem?

The pillar slug is being interpolated as a modifier — ungrammatical.

**Suggested replacement (pick one, apply consistently):**
- Pillar-agnostic: *"Where else can I read about jewellery on The Gem?"*
- Pillar-aware: *"Where can I read more guides on The Gem?"* / *"…more stories on The Gem?"* / *"…more style writing on The Gem?"*

**Where:** Edit each of the 26 affected markdown files in `content/*.md` (search for "Where can I read more about"), then run `npm run migrate` to push to Sanity. Or write a small Sanity dataset patch script that does the find-and-replace on `body` field.

**Acceptance:** zero hits for `Where can I read more about \w+ jewellery on The Gem` across `content/*.md` and across `_originalBlocks` in production Sanity dataset.

**Effort:** 30 minutes if scripted; 90 minutes if done by hand.

---

## P2 — Quality improvement

### 5. Fix the "Further reading" auto-card algorithm so it surfaces topically-related articles

**Problem:** `getRelatedArticles` in `lib/queries.ts:148` sorts by `publishedAt desc` within the same pillar. Because the migration stamped every article with `publishedAt: 2026-05-24T14:00:40.052Z`, the order is non-deterministic but consistently picks the same 3 cards under every Guides article (and similarly for Stories and Style). Auto-cards stop reinforcing the topical clusters that the in-body "Related reading" block already encodes.

**Options (pick one):**

**A. Cheapest — restagger `publishedAt` in Sanity.**
- One-off dataset patch that sets each article's `publishedAt` to a unique timestamp reflecting genuine editorial order (or `_createdAt`).
- Cards will then rotate to the 3 most recent per pillar — still not *topical* but at least varies.
- Effort: 30 minutes.

**B. Better — drive related cards from the curated in-body "Related reading" block.**
- Add a `relatedSlugs: string[]` field to the article Sanity schema (`sanity/schemaTypes/article.ts`).
- Editor populates it manually OR a one-time script parses the body's "Related reading" markdown block and writes the slugs into the field.
- Update `getRelatedArticles` (or rename to `getCuratedRelated`) to fetch by slug rather than pillar-publishedAt.
- Fall back to the existing pillar query when `relatedSlugs` is empty.
- Effort: ~3 hours including schema migration, query update, and one-off body-parsing script.

**C. Best long-term — lift the curated list into structured content.**
- Same as B, but the editor maintains the list in Sanity directly and the article body markdown removes the "Related reading" block (the cards section now renders it).
- Avoids the duplicate maintenance burden between markdown body and the structured field.
- Effort: same as B plus removing the markdown block from each `content/*.md` and re-migrating (~4 hours total).

**Open question (already raised in `internal-linking-plan.md`):** worth a 5-minute architectural decision before picking B vs. C.

---

## P3 — Out-of-scope, but track

### 6. Migrate and re-audit the 5 unpublished pillar drafts

The 5 originally-selected "flagship" pieces are markdown drafts that haven't been migrated to Sanity:

- `content/34-cartier-love-bracelet-guide.md` → `/guides/cartier-love-bracelet-guide`
- `content/31-van-cleef-alhambra-guide.md` → `/guides/van-cleef-alhambra-guide`
- `content/35-hatton-garden-guide.md` → `/guides/hatton-garden-guide`
- `content/33-mens-jewellery-guide.md` → `/style/mens-jewellery-guide`
- `content/38-how-to-build-a-jewellery-collection.md` → `/style/how-to-build-a-jewellery-collection`

(plus 7 other drafts in the same batch: 32 victorian-mourning, 36 wallis-simpson, 37 platinum-vs-white-gold, 39 cullinan, 40 hallmarks-uk, 41 ring-stacking, 42 tennis-bracelet, 43 garrard.)

**Recommended sequence:**
1. Run the audit script from `publishing-standards.md` against each draft markdown locally.
2. Apply the inline-link + Related-reading additions from `content/internal-linking-plan.md` Part 1.
3. `npm run migrate` to push to Sanity.
4. Confirm appearance in the sitemap.
5. Re-run **this** per-post audit on the live URLs.

**Effort:** the inline-linking plan estimates ~2.5 hours total for all 16 articles in Part 1 + 27 in Part 2.

---

## Definition of done

This audit round closes when:
- [ ] Brooch has ≥ 2 authoritative external sources in the body.
- [ ] Vintage title is ≤ 60 chars in production.
- [ ] Lab-grown title and H1 use the same framing.
- [ ] Zero hits for "Where can I read more about \w+ jewellery on The Gem" in production HTML.
- [ ] Either restaggered `publishedAt` OR curated related-cards algorithm shipped.

Items P0, P1.2, P1.3 are pure Sanity edits and can ship in a single editorial pass. P1.4 and P2.5 are the substantive work.
