# Internal Linking Plan

A bidirectional pass across all 35 unique articles (the duplicates of princess-diana and lab-grown collapse on slug). Goal: every article carries 3–5 Related reading links + 1–2 contextual inline links.

## Approach

- **Inline links** go inside the body where a topic is mentioned and the reader's natural next click would be to that piece. One or two per article. Linked text should read naturally — never "click here" or "see this guide." Match the existing pink-jewellery and cartier-family-history style.
- **Related reading block** sits between the FAQ and Sources block (or before the Sources block where no FAQ closing exists). 3–5 entries. Format:
  ```
  ## Related reading

  - [Article Title](/pillar/slug) — one-line description of the connection
  ```
- The description should explain the *why* of the link, not just describe the target article. e.g. "the parallel story of a Hollywood collection sold at auction" not "an article about Elizabeth Taylor's jewellery."
- Skip links to articles in the same direct genealogy if it would feel forced. Quality over count.

## Housekeeping before execution

- **Duplicate files to delete:** `01-princess-diana-jewellery.md`, `01-princess-diana-jewellery-v2.md` (keep v3), `02-lab-grown-vs-natural-diamonds.md` (keep v2). They share slugs and are overwritten in Sanity each migration; leaving them risks editing the wrong file.
- **Slug map for reference** (all live or scheduled, by pillar):

### Stories
princess-diana-jewellery · marilyn-monroe-jewellery · koh-i-noor · hope-diamond · elizabeth-taylor-jewellery · black-princes-ruby · moonstone · viking-burial-jewellery · tolkiens-gemstones · renaissance-pigment-stones · pyrite-and-the-gold-rush · cartier-family-history · tiffany-and-co-history · chopard-cannes · bulgari-history · victorian-mourning-jewellery · wallis-simpson-jewellery · cullinan-diamond · tennis-bracelet-history · garrard-history

### Guides
lab-grown-vs-natural-diamonds · engagement-ring-stones · where-to-buy-vintage-jewellery · best-signet-rings-men · precious-vs-semi-precious · jewellery-that-holds-value · how-to-care-for-your-jewellery · how-to-sell-your-jewellery · diamond-market-2026 · van-cleef-alhambra-guide · cartier-love-bracelet-guide · hatton-garden-guide · platinum-vs-white-gold · jewellery-hallmarks-uk

### Style
how-to-wear-pearls · layering-necklaces · modern-womens-jewellery-edit · pink-jewellery · floral-jewellery · how-to-wear-a-brooch · mens-jewellery-guide · how-to-build-a-jewellery-collection · ring-stacking-guide

---

## Part 1 — The 16 articles with zero links (priority)

### bulgari-history
**Inline:**
- The Elizabeth Taylor / Cleopatra opening section → link `Elizabeth Taylor` to `/stories/elizabeth-taylor-jewellery` on first mention.
- Closing section on LVMH and "every family-founded luxury house" → link `Cartier` or "every family-founded luxury house" to `/stories/cartier-family-history`.

**Related reading:**
- [Cartier: A Family History](/stories/cartier-family-history) — the parallel four-generation family story that became the most-cited template for a luxury jewellery dynasty
- [Tiffany & Co: A History](/stories/tiffany-and-co-history) — the American counterpart at the same first-tier level, with a very different relationship to design history
- [Elizabeth Taylor's Jewellery](/stories/elizabeth-taylor-jewellery) — Taylor's wider collection beyond the Bulgari pieces, and the auction that redefined celebrity jewellery
- [Chopard at Cannes](/stories/chopard-cannes) — another house whose modern identity rests on a specific patronage relationship
- [Jewellery That Holds Its Value](/guides/jewellery-that-holds-value) — the strategic case for signed pieces from named houses

---

### how-to-wear-a-brooch
**Inline:**
- The "What to buy" section mentions "the pansy brooches covered in the Language of Flowers piece" → link `Language of Flowers piece` to `/style/floral-jewellery`.
- "Victorian and Edwardian pieces" → link to `/guides/where-to-buy-vintage-jewellery`.

**Related reading:**
- [The Language of Flowers in Fine Jewellery](/style/floral-jewellery) — the Victorian floriography vocabulary that gave brooch motifs their original meaning
- [Where to Buy Vintage Jewellery in the UK](/guides/where-to-buy-vintage-jewellery) — the practical sourcing guide for Victorian and Edwardian estate brooches
- [Layering Necklaces in 2026](/style/layering-necklaces) — the parallel style guide on composition and proportion
- [How to Build a Jewellery Collection](/style/how-to-build-a-jewellery-collection) — where a brooch fits in a considered collection
- [Victorian Mourning Jewellery](/stories/victorian-mourning-jewellery) — the heritage context for inherited and estate brooch pieces

---

### van-cleef-alhambra-guide
**Inline:**
- "consistently retains 70–85% of its retail price" passage → link to `/guides/jewellery-that-holds-value`.
- The pre-owned section reference to "specialist pre-owned fine jewellery dealers" → link `vintage jewellery dealers` to `/guides/where-to-buy-vintage-jewellery`.

**Related reading:**
- [Jewellery That Holds Its Value](/guides/jewellery-that-holds-value) — the broader strategic framework the Alhambra is a canonical example of
- [The Cartier Love Bracelet: A Buyer's Guide](/guides/cartier-love-bracelet-guide) — the parallel iconic modern piece, with similar resale dynamics and similar authentication risks
- [Where to Buy Vintage Jewellery in the UK](/guides/where-to-buy-vintage-jewellery) — the wider context for pre-owned fine jewellery buying
- [How to Build a Jewellery Collection](/style/how-to-build-a-jewellery-collection) — where an Alhambra purchase fits in a deliberate collection
- [Jewellery Hallmarks UK](/guides/jewellery-hallmarks-uk) — how to verify the 18-carat gold content on an Alhambra piece

---

### victorian-mourning-jewellery
**Inline:**
- The section on Whitby jet and contemporary buying → link `at most specialist dealers` or `the antique market` to `/guides/where-to-buy-vintage-jewellery`.
- Closing paragraph mentioning Queen Victoria → link to `/stories/princess-diana-jewellery` only if natural (probably skip; instead link in the FAQ block).

**Related reading:**
- [Princess Diana's Jewellery](/stories/princess-diana-jewellery) — the modern royal jewellery story whose mourning resonance most readers will recognise
- [The Language of Flowers in Fine Jewellery](/style/floral-jewellery) — the parallel Victorian decorative vocabulary, used in mourning brooches and pansy motifs
- [Where to Buy Vintage Jewellery in the UK](/guides/where-to-buy-vintage-jewellery) — practical sourcing for the antique mourning pieces described here
- [How to Wear a Brooch in 2026](/style/how-to-wear-a-brooch) — how Victorian mourning brooches read in contemporary wear
- [Renaissance Pigment Stones](/stories/renaissance-pigment-stones) — the parallel story of materials valued for their cultural meaning rather than their hardness or sparkle

---

### mens-jewellery-guide
**Inline:**
- Signet ring section → link "the best signet rings for men" or `the signet ring is the oldest continuously worn` to `/guides/best-signet-rings-men`.
- The "Cartier Love bracelet (which requires a separate guide and has one)" line → link `has one` to `/guides/cartier-love-bracelet-guide`.
- "Hatton Garden has several workshops" → link to `/guides/hatton-garden-guide`.

**Related reading:**
- [The Best Signet Rings for Men](/guides/best-signet-rings-men) — the longer-form guide to choosing and commissioning a signet
- [The Cartier Love Bracelet: A Buyer's Guide](/guides/cartier-love-bracelet-guide) — the dedicated guide to one of the strongest men's investment pieces
- [Hatton Garden: A Buyer's Guide](/guides/hatton-garden-guide) — where to commission bespoke pieces, particularly signet rings
- [How to Build a Jewellery Collection](/style/how-to-build-a-jewellery-collection) — the foundation-first logic adapted from women's collection-building
- [Layering Necklaces in 2026](/style/layering-necklaces) — chain layering principles that apply across gender

---

### cartier-love-bracelet-guide
**Inline:**
- "Cipullo … Cartier New York" passage → link `Cartier` to `/stories/cartier-family-history`.
- "60–75% of retail" passage → link to `/guides/jewellery-that-holds-value`.
- "Vestiaire Collective and similar resellers" or the pre-owned section header → link `pre-owned market` to `/guides/where-to-buy-vintage-jewellery`.

**Related reading:**
- [Cartier: A Family History](/stories/cartier-family-history) — the house context the Love bracelet emerged from
- [The Van Cleef Alhambra: A Buyer's Guide](/guides/van-cleef-alhambra-guide) — the parallel modern iconic piece with comparable value-retention and authentication dynamics
- [Jewellery That Holds Its Value](/guides/jewellery-that-holds-value) — the strategic framework that explains the Love bracelet's price stability
- [The Men's Jewellery Edit](/style/mens-jewellery-guide) — where the Love bracelet sits as one of the strongest men's pieces
- [Where to Buy Vintage Jewellery in the UK](/guides/where-to-buy-vintage-jewellery) — the broader sourcing context for pre-owned fine jewellery

---

### hatton-garden-guide
**Inline:**
- "GIA-certified stones" passage → link `the 4Cs` to `/guides/engagement-ring-stones` or `/guides/lab-grown-vs-natural-diamonds`.
- Bespoke section mentioning signet rings → link to `/guides/best-signet-rings-men`.
- "Gray's Antique Market in Mayfair and Camden Passage" → link `antique jewellery specifically` to `/guides/where-to-buy-vintage-jewellery`.

**Related reading:**
- [Engagement Ring Stones Beyond Diamond](/guides/engagement-ring-stones) — the stone-choice decisions that should happen before a Hatton Garden visit
- [Lab-Grown vs Natural Diamonds](/guides/lab-grown-vs-natural-diamonds) — both categories trade in Hatton Garden; how to compare them
- [Where to Buy Vintage Jewellery in the UK](/guides/where-to-buy-vintage-jewellery) — the parallel guide for the antique market
- [The Best Signet Rings for Men](/guides/best-signet-rings-men) — how to commission a signet ring from a Hatton Garden workshop
- [The Diamond Market in 2026](/guides/diamond-market-2026) — the wider price context for Hatton Garden buying decisions

---

### wallis-simpson-jewellery
**Inline:**
- The panther section / Cartier patronage → link `Cartier` to `/stories/cartier-family-history` on first major mention.
- The sale section comparing the Sotheby's result to other auctions → link `Elizabeth Taylor` (in the "what the sale did" paragraph, or build a sentence) to `/stories/elizabeth-taylor-jewellery`.

**Related reading:**
- [Cartier: A Family History](/stories/cartier-family-history) — the house Wallis's patronage helped define
- [Elizabeth Taylor's Jewellery](/stories/elizabeth-taylor-jewellery) — the parallel celebrity collection sold at major auction, with significant overlap in Cartier provenance
- [Chopard at Cannes](/stories/chopard-cannes) — another study in how a specific patronage relationship shapes a house's identity
- [Jewellery That Holds Its Value](/guides/jewellery-that-holds-value) — the secondary-market case for signed pieces with documented provenance
- [Tiffany & Co: A History](/stories/tiffany-and-co-history) — the New York house Schlumberger designed for after Wallis's main commissioning years

---

### platinum-vs-white-gold
**Inline:**
- "750 hallmark" passage → link to `/guides/jewellery-hallmarks-uk`.
- The diamond-setting section mentioning "D–H range" → link `colour grade` or `engagement ring stone choices` to `/guides/engagement-ring-stones`.
- Maintenance / rhodium replating discussion → link `rhodium replating` once to `/guides/how-to-care-for-your-jewellery`.

**Related reading:**
- [UK Jewellery Hallmarks Explained](/guides/jewellery-hallmarks-uk) — how to verify the metal you've been told you're buying
- [Engagement Ring Stones Beyond Diamond](/guides/engagement-ring-stones) — the stone-side of the same engagement-ring decision
- [How to Care for Your Jewellery](/guides/how-to-care-for-your-jewellery) — the ongoing maintenance both metals require
- [How to Build a Jewellery Collection](/style/how-to-build-a-jewellery-collection) — where the platinum-vs-gold call sits in foundation-piece buying
- [Lab-Grown vs Natural Diamonds](/guides/lab-grown-vs-natural-diamonds) — the parallel category-comparison decision

---

### how-to-build-a-jewellery-collection
**Inline:**
- "The pieces that hold value are: signed pieces …" → link `signed pieces from recognised houses` to `/guides/jewellery-that-holds-value`.
- The inheritance section mentioning "A jeweller in Hatton Garden" → link to `/guides/hatton-garden-guide`.
- Closing reference to selling or resale → link to `/guides/how-to-sell-your-jewellery`.

**Related reading:**
- [Jewellery That Holds Its Value](/guides/jewellery-that-holds-value) — the strategic underpinning for everything in this guide
- [Hatton Garden: A Buyer's Guide](/guides/hatton-garden-guide) — where most of the foundation pieces should be bought
- [How to Sell Your Jewellery](/guides/how-to-sell-your-jewellery) — the closing-side of the same considered framework
- [The Modern Women's Jewellery Edit](/style/modern-womens-jewellery-edit) — the specific piece recommendations that fit this framework
- [The Men's Jewellery Edit](/style/mens-jewellery-guide) — the parallel foundation framework for men

---

### cullinan-diamond
**Inline:**
- Type IIa section listing "Cullinan, the Koh-i-Noor, the Regent" → link `Koh-i-Noor` to `/stories/koh-i-noor`.
- Crown context paragraph → link to `/stories/black-princes-ruby` ("immediately below the Black Prince's Ruby").
- Closing on the mine still in operation, or earlier on coronation — possibly link to `/stories/princess-diana-jewellery` only if natural; otherwise skip.

**Related reading:**
- [The Koh-i-Noor Diamond](/stories/koh-i-noor) — the parallel Type IIa stone with a much older and more contested history
- [The Hope Diamond](/stories/hope-diamond) — another stone whose physical properties became inseparable from its provenance
- [The Black Prince's Ruby](/stories/black-princes-ruby) — the other major stone in the Imperial State Crown, set immediately above Cullinan II
- [Garrard: The Crown Jewellers](/stories/garrard-history) — the house responsible for the settings that hold the Cullinan stones
- [Tolkien's Gemstones](/stories/tolkiens-gemstones) — the literary tradition that drew on stones of this scale

---

### jewellery-hallmarks-uk
**Inline:**
- Date letter section / antique dating → link `antique pieces` or "dating antique pieces" to `/guides/where-to-buy-vintage-jewellery`.
- "the assay offices offer a testing service" passage → link `selling a piece` or similar to `/guides/how-to-sell-your-jewellery`.
- Metal fineness intro → link `platinum` to `/guides/platinum-vs-white-gold` where natural.

**Related reading:**
- [Where to Buy Vintage Jewellery in the UK](/guides/where-to-buy-vintage-jewellery) — using hallmarks to date and verify antique pieces in the field
- [How to Sell Your Jewellery](/guides/how-to-sell-your-jewellery) — the hallmark check as part of preparing pieces for sale
- [Platinum vs White Gold](/guides/platinum-vs-white-gold) — the metal-choice context that the fineness mark documents
- [Hatton Garden: A Buyer's Guide](/guides/hatton-garden-guide) — where to take pieces for testing and re-hallmarking
- [Precious vs Semi-Precious Stones](/guides/precious-vs-semi-precious) — the parallel classification system applied to stones rather than metals

---

### ring-stacking-guide
**Inline:**
- "Most jewellers who specialise in stacking … Hatton Garden workshops" → link `Hatton Garden workshops` to `/guides/hatton-garden-guide`.
- The signet-finger section → link `signet` to `/guides/best-signet-rings-men`.
- Eternity-band section → possibly link `engagement ring` to `/guides/engagement-ring-stones`.

**Related reading:**
- [Layering Necklaces in 2026](/style/layering-necklaces) — the parallel layering guide for the other major jewellery surface
- [How to Build a Jewellery Collection](/style/how-to-build-a-jewellery-collection) — where stacking rings fit in a deliberate collection
- [The Best Signet Rings for Men](/guides/best-signet-rings-men) — the anchor piece for many men's right-hand stacks
- [Hatton Garden: A Buyer's Guide](/guides/hatton-garden-guide) — where to have rings sized per position in the stack
- [The Modern Women's Jewellery Edit](/style/modern-womens-jewellery-edit) — the wardrobe context for stacking decisions

---

### tennis-bracelet-history
**Inline:**
- The Cartier 1920s line bracelets reference → link `Cartier catalogues from the 1920s` to `/stories/cartier-family-history`.
- "Lab-grown diamond tennis bracelets are available at significantly lower price points" → link `Lab-grown diamond` to `/guides/lab-grown-vs-natural-diamonds`.
- "The 4Cs" wherever it appears in the buying section → link to `/guides/engagement-ring-stones`.

**Related reading:**
- [The Cartier Love Bracelet: A Buyer's Guide](/guides/cartier-love-bracelet-guide) — the parallel iconic modern bracelet with a comparable buying decision
- [Jewellery That Holds Its Value](/guides/jewellery-that-holds-value) — where a diamond tennis bracelet sits in the resale landscape
- [Lab-Grown vs Natural Diamonds](/guides/lab-grown-vs-natural-diamonds) — the substitution most relevant to tennis bracelet pricing
- [How to Build a Jewellery Collection](/style/how-to-build-a-jewellery-collection) — the foundation case for a tennis bracelet as a first bracelet
- [How to Care for Your Jewellery](/guides/how-to-care-for-your-jewellery) — the annual clasp check the Evert incident was a reminder to do

---

### garrard-history
**Inline:**
- The 1981 ring section first paragraph → link `Diana` to `/stories/princess-diana-jewellery`.
- Crown Jeweller appointment passage mentioning "the Imperial State Crown" or Crown Jewels → link `Black Prince's Ruby` (if mentioned) or `Crown Jewels` to `/stories/black-princes-ruby` or `/stories/cullinan-diamond`.
- The "oldest jewellery house" claim → link comparable houses `Cartier` to `/stories/cartier-family-history` and `Tiffany` to `/stories/tiffany-and-co-history`.

**Related reading:**
- [Princess Diana's Jewellery](/stories/princess-diana-jewellery) — the wider story of the woman who chose Garrard catalogue item nine
- [Cartier: A Family History](/stories/cartier-family-history) — the parallel four-generation house at a similar tier
- [Tiffany & Co: A History](/stories/tiffany-and-co-history) — the American counterpart in the same conversation
- [Bulgari: A History](/stories/bulgari-history) — the Roman house whose family-to-LVMH arc parallels Garrard's ownership changes
- [The Cullinan Diamond](/stories/cullinan-diamond) — one of the major stones Garrard worked with during its Crown Jeweller tenure

---

### floral-jewellery (already published)
**Inline:**
- Forget-me-not section / Victorian floriography → link `Victorian` to `/stories/victorian-mourning-jewellery` (overlapping era and decorative tradition).
- Pansy / brooch references → link `pansy brooches` or similar to `/style/how-to-wear-a-brooch`.
- Pink topaz / morganite / coloured-stone passage if present → link `pink stones` to `/style/pink-jewellery`.

**Related reading:**
- [How to Wear a Brooch in 2026](/style/how-to-wear-a-brooch) — the practical guide to wearing the Victorian floral brooches discussed here
- [Victorian Mourning Jewellery](/stories/victorian-mourning-jewellery) — the parallel Victorian decorative vocabulary, drawing on the same period and the same coded language
- [Pink Jewellery: A Reclamation](/style/pink-jewellery) — the contemporary case for coloured floral pieces
- [Where to Buy Vintage Jewellery in the UK](/guides/where-to-buy-vintage-jewellery) — sourcing antique floral brooches and pendants
- [The Modern Women's Jewellery Edit](/style/modern-womens-jewellery-edit) — where floral pieces sit in a contemporary wardrobe

---

## Part 2 — Forward links to add to the 27 older articles

The older articles already have 3+ links each, but they were written before the new pieces existed. These are forward-link insertions only — add to existing Related reading blocks (or as inline mentions). Don't restructure what's there.

### princess-diana-jewellery
- **Inline:** opening Garrard reference → link `Garrard` to `/stories/garrard-history` (first mention in the body, around line 18–20 of v3).
- **Add to Related reading:**
  - [Garrard: The Crown Jewellers](/stories/garrard-history) — the house that produced the engagement ring Diana chose from a catalogue
  - [The Cullinan Diamond](/stories/cullinan-diamond) — the largest stone in the Crown Jewels she occasionally wore through Royal Collection pieces
  - [Victorian Mourning Jewellery](/stories/victorian-mourning-jewellery) — the wider royal mourning tradition the Spencer family observed
- **Delete:** `01-princess-diana-jewellery.md` and `01-princess-diana-jewellery-v2.md` (keep v3).

### marilyn-monroe-jewellery
- **Add to Related reading:**
  - [Wallis Simpson's Jewellery](/stories/wallis-simpson-jewellery) — the contemporary celebrity collection most directly comparable in scale and auction history
  - [The Cartier Love Bracelet: A Buyer's Guide](/guides/cartier-love-bracelet-guide) — the modern iconic piece equivalent in cultural reach
  - [Tennis Bracelet: A History](/stories/tennis-bracelet-history) — the Evert incident as a later chapter in the same celebrity-jewellery narrative

### koh-i-noor
- **Inline:** Type IIa mention if present → link `the Cullinan` to `/stories/cullinan-diamond`.
- **Add to Related reading:**
  - [The Cullinan Diamond](/stories/cullinan-diamond) — the other defining Type IIa stone in the Crown Jewels, with an equally consequential cutting decision
  - [Garrard: The Crown Jewellers](/stories/garrard-history) — the house that worked the Koh-i-Noor into its current setting

### hope-diamond
- **Add to Related reading:**
  - [The Cullinan Diamond](/stories/cullinan-diamond) — the parallel famous-stone story with a very different outcome (no curse, just a sceptre)
  - [Wallis Simpson's Jewellery](/stories/wallis-simpson-jewellery) — the auction-market story most comparable in scale to the Hope's documented sales
  - [Garrard: The Crown Jewellers](/stories/garrard-history) — the contemporary equivalent house for the kind of work the Hope passed through

### elizabeth-taylor-jewellery
- **Inline:** Cartier / Bulgari mentions in the body → link `Bulgari` to `/stories/bulgari-history` first time it appears.
- **Add to Related reading:**
  - [Bulgari: A History](/stories/bulgari-history) — the house whose Roman flagship Taylor learned Italian in, with detail on the pieces in her collection
  - [Wallis Simpson's Jewellery](/stories/wallis-simpson-jewellery) — the only twentieth-century celebrity collection sold at a higher number per piece than Taylor's

### black-princes-ruby
- **Inline:** Crown Jewels context → link `the Cullinan II diamond beneath it` to `/stories/cullinan-diamond`.
- **Add to Related reading:**
  - [The Cullinan Diamond](/stories/cullinan-diamond) — the diamond set immediately below the Ruby in the Imperial State Crown
  - [Garrard: The Crown Jewellers](/stories/garrard-history) — the house that maintained the setting

### moonstone
- **Add to Related reading:**
  - [Victorian Mourning Jewellery](/stories/victorian-mourning-jewellery) — the Victorian period in which moonstone became a fashionable mourning-adjacent stone
  - [Floral Jewellery](/style/floral-jewellery) — the parallel Victorian decorative vocabulary

### viking-burial-jewellery
- **Add to Related reading:**
  - [Victorian Mourning Jewellery](/stories/victorian-mourning-jewellery) — the modern Western equivalent of grave-goods jewellery culture
  - [UK Jewellery Hallmarks Explained](/guides/jewellery-hallmarks-uk) — the documentation system that eventually replaced the maker's own mark on pre-hallmarking pieces

### tolkiens-gemstones
- **Add to Related reading:**
  - [The Cullinan Diamond](/stories/cullinan-diamond) — the real-world large-stone tradition Tolkien drew on for the Silmarils
  - [The Black Prince's Ruby](/stories/black-princes-ruby) — the closest historical analogue to a named, narrated stone

### renaissance-pigment-stones
- **Add to Related reading:**
  - [Victorian Mourning Jewellery](/stories/victorian-mourning-jewellery) — the parallel material-meaning story in a different period

### pyrite-and-the-gold-rush
- **Add to Related reading:**
  - [UK Jewellery Hallmarks Explained](/guides/jewellery-hallmarks-uk) — the verification system that made fool's-gold confusion impossible to sustain in the precious metal trade

### cartier-family-history
- **Inline:** Mention of "Cartier Love bracelet" if present → link to `/guides/cartier-love-bracelet-guide`. Wallis section (if present) → link to `/stories/wallis-simpson-jewellery`.
- **Add to Related reading:**
  - [The Cartier Love Bracelet: A Buyer's Guide](/guides/cartier-love-bracelet-guide) — the dedicated buyer's guide to the house's most-traded modern piece
  - [Wallis Simpson's Jewellery](/stories/wallis-simpson-jewellery) — the patronage relationship that consolidated the Cartier panther as a defining motif
  - [Bulgari: A History](/stories/bulgari-history) — the parallel Roman family house, with a different relationship to the Place Vendôme tradition

### tiffany-and-co-history
- **Add to Related reading:**
  - [Bulgari: A History](/stories/bulgari-history) — the parallel European house at the same tier
  - [Garrard: The Crown Jewellers](/stories/garrard-history) — the British counterpart in the same conversation
  - [Wallis Simpson's Jewellery](/stories/wallis-simpson-jewellery) — Schlumberger context

### chopard-cannes
- **Add to Related reading:**
  - [Bulgari: A History](/stories/bulgari-history) — the parallel Mediterranean house, with overlapping Cannes ambassadorship
  - [Wallis Simpson's Jewellery](/stories/wallis-simpson-jewellery) — the historical template for a celebrity-jewellery relationship of this scale

### lab-grown-vs-natural-diamonds (v2)
- **Inline:** 4Cs section → link `Hatton Garden` to `/guides/hatton-garden-guide`.
- **Add to Related reading:**
  - [Hatton Garden: A Buyer's Guide](/guides/hatton-garden-guide) — where both categories trade side by side
  - [Tennis Bracelet: A History](/stories/tennis-bracelet-history) — the category where lab-grown has made the most visible price impact
  - [Platinum vs White Gold](/guides/platinum-vs-white-gold) — the setting decision that pairs with the stone decision
- **Delete:** `02-lab-grown-vs-natural-diamonds.md` (keep v2).

### engagement-ring-stones
- **Inline:** Diamond / 4Cs / GIA passage → link `Hatton Garden` to `/guides/hatton-garden-guide`. Setting metal discussion → link to `/guides/platinum-vs-white-gold`.
- **Add to Related reading:**
  - [Hatton Garden: A Buyer's Guide](/guides/hatton-garden-guide) — where to source the stones discussed here
  - [Platinum vs White Gold](/guides/platinum-vs-white-gold) — the setting decision that pairs with the stone decision

### where-to-buy-vintage-jewellery
- **Inline:** Hallmark discussion or "Camden Passage" passage → link `hallmarks` to `/guides/jewellery-hallmarks-uk`.
- **Add to Related reading:**
  - [UK Jewellery Hallmarks Explained](/guides/jewellery-hallmarks-uk) — how to read the marks on vintage pieces in the field
  - [Victorian Mourning Jewellery](/stories/victorian-mourning-jewellery) — a substantial subcategory of the vintage market covered separately
  - [How to Wear a Brooch in 2026](/style/how-to-wear-a-brooch) — the wearing-side guide for the brooches in the vintage market

### best-signet-rings-men
- **Inline:** Hatton Garden mention → link to `/guides/hatton-garden-guide`. General mens jewellery context → link to `/style/mens-jewellery-guide`.
- **Add to Related reading:**
  - [Hatton Garden: A Buyer's Guide](/guides/hatton-garden-guide) — where to commission the bespoke signet described here
  - [The Men's Jewellery Edit](/style/mens-jewellery-guide) — the wider men's framework the signet anchors
  - [Ring Stacking in 2026](/style/ring-stacking-guide) — how a signet works as the anchor piece in a right-hand stack

### precious-vs-semi-precious
- **Add to Related reading:**
  - [UK Jewellery Hallmarks Explained](/guides/jewellery-hallmarks-uk) — the parallel classification system, applied to metals rather than stones
  - [Hatton Garden: A Buyer's Guide](/guides/hatton-garden-guide) — the trade context where both categories are sold

### jewellery-that-holds-value
- **Inline:** Signed pieces / Cartier / Van Cleef mentions → link `Cartier Love bracelet` to `/guides/cartier-love-bracelet-guide`, `Van Cleef Alhambra` to `/guides/van-cleef-alhambra-guide`.
- **Add to Related reading:**
  - [The Cartier Love Bracelet: A Buyer's Guide](/guides/cartier-love-bracelet-guide) — one of the canonical examples worked through in detail
  - [The Van Cleef Alhambra: A Buyer's Guide](/guides/van-cleef-alhambra-guide) — the other canonical example
  - [Tennis Bracelet: A History](/stories/tennis-bracelet-history) — a more accessible value-retaining category

### how-to-care-for-your-jewellery
- **Add to Related reading:**
  - [Platinum vs White Gold](/guides/platinum-vs-white-gold) — the rhodium replating schedule and other metal-specific care
  - [UK Jewellery Hallmarks Explained](/guides/jewellery-hallmarks-uk) — verifying the metal you're caring for
  - [Tennis Bracelet: A History](/stories/tennis-bracelet-history) — the annual clasp check covered here in context

### how-to-sell-your-jewellery
- **Inline:** Provenance / verification section → link `hallmarks` to `/guides/jewellery-hallmarks-uk`.
- **Add to Related reading:**
  - [UK Jewellery Hallmarks Explained](/guides/jewellery-hallmarks-uk) — the documentation buyers will look for
  - [Jewellery That Holds Its Value](/guides/jewellery-that-holds-value) — the categories most likely to sell at strong percentages of retail
  - [Hatton Garden: A Buyer's Guide](/guides/hatton-garden-guide) — where dealers will buy directly

### diamond-market-2026
- **Inline:** Lab-grown discussion → link to `/guides/lab-grown-vs-natural-diamonds`. Hatton Garden mention → link.
- **Add to Related reading:**
  - [Hatton Garden: A Buyer's Guide](/guides/hatton-garden-guide) — where the market context lands at retail
  - [Tennis Bracelet: A History](/stories/tennis-bracelet-history) — the category most affected by current price dynamics
  - [The Cullinan Diamond](/stories/cullinan-diamond) — the historical anchor at the top of the diamond market

### how-to-wear-pearls
- **Add to Related reading:**
  - [How to Build a Jewellery Collection](/style/how-to-build-a-jewellery-collection) — where pearls sit as a foundation piece
  - [The Men's Jewellery Edit](/style/mens-jewellery-guide) — pearl necklaces for men, covered briefly

### layering-necklaces
- **Add to Related reading:**
  - [Ring Stacking in 2026](/style/ring-stacking-guide) — the parallel layering guide for the hand
  - [How to Build a Jewellery Collection](/style/how-to-build-a-jewellery-collection) — the foundation chain that anchors any layering composition
  - [The Men's Jewellery Edit](/style/mens-jewellery-guide) — chain weight and length guidance from the men's side

### modern-womens-jewellery-edit
- **Add to Related reading:**
  - [How to Build a Jewellery Collection](/style/how-to-build-a-jewellery-collection) — the framework piece these pieces fit
  - [The Men's Jewellery Edit](/style/mens-jewellery-guide) — the parallel framework for men
  - [Ring Stacking in 2026](/style/ring-stacking-guide) — the stacking choices the edit assumes

### pink-jewellery
- **Add to Related reading:**
  - [Floral Jewellery](/style/floral-jewellery) — the parallel decorative-vocabulary piece, with significant overlap in stone selection
  - [How to Wear a Brooch in 2026](/style/how-to-wear-a-brooch) — where pink brooches sit in contemporary wear

---

## Execution notes

- **Order of execution:** Part 1 first (the gap is most visible there), Part 2 second. Within Part 1, the highest-traffic pillar pieces first: cartier-love-bracelet-guide, van-cleef-alhambra-guide, hatton-garden-guide, mens-jewellery-guide, how-to-build-a-jewellery-collection.
- **Re-run `npm run migrate`** after each batch of edits so Sanity reflects the updates.
- **No frontmatter changes needed** — these are body-only edits.
- **Watch for duplicate Sources blocks** when adding the Related reading section: it goes *before* the `---` divider that introduces Sources, not after.
- **Audit script:** if you have `audit.py`, re-run it on each edited article to confirm the 3-internal-link minimum is met and nothing else has broken. (I didn't see audit.py in the repo but publishing-standards.md references it.)
- **Estimated effort:** Part 1 = ~16 articles × 5 minutes each ≈ 80 minutes. Part 2 = ~27 articles × 3 minutes each ≈ 80 minutes. Total ~2.5 hours of focused work, doable in one session.

## Open question for next session

Should we add a section to the article body schema in `sanity/schemaTypes/article.ts` for structured related-reading (rather than embedding the links in the markdown body)? That would let the homepage and pillar pages auto-render related cards rather than relying on inline markdown. Worth a 5-minute discussion before executing the plan.
