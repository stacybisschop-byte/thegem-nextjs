# The Gem: Editorial Category Definitions

This document defines the three content pillars used across The Gem. It supplements publishing-standards.md and should be read alongside it. Every article must be assigned to exactly one pillar value in Sanity.

The field in the Sanity schema is `pillar`. Valid values are `"Stories"`, `"Guides"`, and `"Edit"` (capitalised strings). The value `"Style"` is retired — zero documents currently hold this value. Do not assign new articles to `"Style"`.

---

## Stories (pillar: "Stories")

**What it is:** In-depth narrative journalism about the history of jewellery, the great houses, famous pieces, and notable people. The editorial heart of The Gem — the content that builds authority and cultural credibility.

**Reader intent:** The reader wants to learn something. They are not primarily here to buy.

**Commercial profile:** Lowest affiliate density of the three pillars. Commercial links may appear where natural (e.g. linking to a house's current collection at the end of a house history) but are never the primary purpose of the piece.

**Homepage position:** Third section, below The Edit and Guides. Stories are evergreen — found through search and direct navigation rather than needing front-page prominence.

**What belongs here:**
- House histories (Cartier, Van Cleef & Arpels, Garrard, Chaumet, Bulgari, Tiffany)
- Famous pieces and their stories (the Cullinan Diamond, the Cheapside Hoard, the Black Prince's Ruby)
- Historical and cultural essays (Victorian mourning jewellery, the language of flowers in fine jewellery, Art Deco)
- Notable people and their jewellery where the focus is the story, not the shopping (Diana, Wallis Simpson, Elizabeth Taylor)
- Origin and discovery stories

**What does not belong here:**
- Shopping edits or "where to buy" pieces → Edit
- Practical how-to guides → Guides
- Trend pieces where the primary purpose is purchase recommendation → Edit

**Decision test:** Is the primary question "what does this mean culturally or historically?" → Stories. Is it "what can I buy because of this?" → Edit.

**Current examples in Sanity:**
- Garrard: The Crown Jewellers and the Ring That Changed Everything
- Van Cleef & Arpels: The House That Invented Mystery
- The Cheapside Hoard: London's Greatest Lost Treasure
- The Tennis Bracelet: How a Diamond Fell Off Chris Evert's Wrist
- The Language of Flowers in Fine Jewellery (floral-jewellery)

---

## Edit (pillar: "Edit")

**What it is:** Time-sensitive, fashion-forward, commerce-first content. What is being worn now, what to buy because of it, trend-driven shop edits. This is the Vogue section of The Gem — reactive, current, and affiliate-dense.

**Reader intent:** The reader is browsing. They want to know what is current and where to buy it.

**Commercial profile:** Highest affiliate density. Every Edit piece should contain multiple outbound commercial links. Skimlinks and Awin click-through is the primary metric for this pillar.

**Homepage position:** Immediately below the hero and "Also new this week" rows. Placed first because Edit content is time-sensitive and drives immediate commercial activity.

**What belongs here:**
- Royal and celebrity jewellery moments (what Catherine wore, what appeared on the red carpet)
- Shop edits and trend-driven roundups (The Signet Ring Edit, The Snake Jewellery Edit)
- Seasonal and event-driven pieces (festival jewellery, Wimbledon, Christmas edit)
- "What to buy right now" pieces tied to a cultural moment
- Affordable and dupe-angle pieces
- Brand comparisons where the primary purpose is helping someone choose what to buy today

**What does not belong here:**
- Historical essays with no purchase angle → Stories
- Evergreen buying guides → Guides

**Decision test:** Will this article feel dated in three months? → Edit. Will it be equally useful in a year? → Guides or Stories.

**Current examples in Sanity:**
- Catherine's Wimbledon Earrings Are Everything Right Now
- Ring Stacking in 2026: The Rules, the Breaks, and What Actually Works (ring-stacking-guide)
- Layering Necklaces: The Rules (layering-necklaces)
- The Modern Women's Jewellery Edit (modern-womens-jewellery-edit)
- The Men's Jewellery Guide (mens-jewellery-guide)

---

## Guides (pillar: "Guides")

**What it is:** Practical, evergreen reference content. Guides help readers make informed decisions — about what to buy, how to wear it, how to care for it, and how to understand the market. Primary driver of organic Google search traffic.

**Reader intent:** The reader is researching. They have a specific question or decision to make and want the most useful, honest answer available.

**Commercial profile:** Medium-to-high affiliate density. Commercial links appear as part of practical advice — "where to buy" sections, product recommendations, retailer comparisons. Unlike Edit, the commercial content serves the reader's research rather than leading with a shopping hook.

**Homepage position:** Second section, immediately below The Edit and above Stories. Guides are evergreen and found primarily through search; homepage presence signals depth and credibility rather than currency.

**What belongs here:**
- Stone buying guides (Emerald, Sapphire, Ruby, Opal, Garnet)
- Metal and material comparisons (9ct vs 18ct Gold, Platinum vs White Gold, Lab-Grown vs Natural)
- How-to guides (How to Wear a Brooch, Layering Necklaces, Ring Stacking, Building a Collection)
- Market and retailer comparisons (Monica Vinader vs Mejuri vs Missoma)
- Investment and value guides (Jewellery That Holds Its Value, How to Buy at Auction)
- Engagement ring guides (Best Sapphire Rings, Best Under £2,000)
- Care and maintenance guides

**Decision test:** Will this article be equally useful to a reader in six months? → Guides. Does its value depend on being current? → Edit.

**Current examples in Sanity:**
- Emerald Buying Guide: What to Look For and What to Avoid
- Monica Vinader vs Mejuri vs Missoma: Which Is Worth Your Money?
- How to Wear a Brooch in 2026 Without Looking Like Your Grandmother (how-to-wear-a-brooch)
- How to Wear Pearls in 2026: The New Rules (how-to-wear-pearls)
- How to Build a Jewellery Collection (how-to-build-a-jewellery-collection)

---

## Quick decision guide

1. Tied to a current moment — an event, a celebrity appearance, a trend happening right now? → **Edit**
2. Primarily a practical guide helping someone make a decision or learn a skill, equally useful in a year? → **Guides**
3. Narrative piece about history, culture, a house, or a famous piece or person — where learning is the purpose? → **Stories**

---

## Pillar values in code

- Edit: `pillar: "Edit"` — URL path: `/edit/`
- Stories: `pillar: "Stories"` — URL path: `/stories/`
- Guides: `pillar: "Guides"` — URL path: `/guides/`

The value `"Style"` is retired. Zero documents currently hold this value. Do not assign it to new articles.

---

## Cross-links to Grimoire

getgrimoire.app is a companion app owned by the same publisher as The Gem. Cross-links from The Gem to Grimoire are deliberate editorial and SEO decisions between first-party properties. They do not require affiliate disclosure. Do not remove Grimoire cross-links.

---

## Publishing standards reference

This document defines pillar assignment. For voice, SEO, GEO, and pre-publish audit requirements, see publishing-standards.md. The pillar field in publishing-standards.md frontmatter should read `Edit` for Edit articles, not `Style`.
