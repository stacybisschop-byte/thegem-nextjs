# Publishing Standards — The Gem

Every piece passes the audit script (`audit.py`) before publication. This document is the human version of the same checks, for writers to use during drafting and editors to use during review. The two are designed to agree.

## Before you start writing

Confirm the brief has these locked:
- Primary keyword (one phrase, the search query you want to rank for)
- Working title (will become H1 — must contain the primary keyword)
- Slug (URL path — short, keyword-rich, no dates)
- Pillar (Stories / Guides / Style)
- Word count target (Stories 2,000–3,500; Guides 1,800–2,800)
- Hero image source and licensing plan

## While drafting — voice tests

### The read-aloud test
Read every section aloud. If anywhere it sounds like a press release, an Instagram caption, or a university essay, rewrite. The voice should sound like a smart friend telling you something she just discovered and wants you to know.

### The em-dash budget
Target: fewer than 3 em-dashes per 1,000 words. In practice that's 5–8 in a typical piece. Watch especially for the matched-pair pattern (`— aside —`) used as parentheticals; that's the single most distinctive AI signature in punctuation. Use commas, parentheses or sentence breaks instead.

### The banned vocabulary
Do not use, as default house style:
- *Delve, navigate (metaphorical), unleash, showcase, leverage (as verb), elevate, curate, boasts*
- *Tapestry, realm, landscape (as metaphor), intersection, journey (as metaphor)*
- *Vibrant, iconic, stunning, seamless, robust, comprehensive, myriad*
- *Luxe, must-have, investment piece (used straight), curated, obsessed*
- *Ultimately, essentially, fundamentally, moreover, furthermore, indeed, in essence*
- *Game-changer, deep dive, next-level*

Do not use, as default sentence construction:
- *It's not just X, it's Y* / *not only X but also Y*
- *Whether you're X or Y*
- *In a world where...*
- *Let's dive in / explore / break it down*
- *In this article we will...*
- *Picture this:*

### The closing test
The piece must not end with a reflective summary that restates what came before. End on an invitation, an observation, a question, a sharp image, or just stop. Closing summaries are the AI signature in structure.

## During drafting — SEO checks

Place the primary keyword in:
- The H1 (the title at the top of the body)
- The first 100 words of body copy (ideally the first sentence)
- The meta title (under 60 characters)
- The meta description (under 160 characters)
- At least one H2 subhead
- Image alt text on the hero image
- The URL slug

Heading hierarchy:
- Stories: 5–9 H2 sections, no H3s usually needed except in FAQ
- Guides: 4–7 H2 sections, including a Where to Buy section and an FAQ section with H3 questions

Links:
- Minimum 3 internal links to related pieces on the site (use placeholders like `/stories/cartier-family` if the target piece doesn't exist yet — the slug map is in the redirect file)
- Minimum 2 external links to authoritative sources (Royal Collection Trust, GIA, Christie's, museum archives, peer-reviewed sources, established trade publications). Avoid linking to competitor blogs.

## During drafting — GEO checks

Generative engines (ChatGPT, Perplexity, Google AI Overviews, Claude) cite pieces that are easy to extract from. Make extraction easy:

1. **Always include an FAQ section** with 4–8 H3 questions, each answered in 40–80 words, each answer a complete and quotable thought.
2. **Use specific numbers, dates, prices, named entities.** Vague pieces don't get cited. Specific ones do.
3. **Include a visible Sources block** at the foot of the article, even if sources are also linked inline. AI engines reward visible attribution.
4. **State the publication's position clearly** where there is one. Hedged claims don't get quoted; direct claims do.
5. **Use tables for comparisons.** Tables are extractable structures and AI engines lift them whole.
6. **Make at least one sentence per section quotable as a standalone summary** of that section's argument.

## Frontmatter — required fields

Every piece needs:

```yaml
title:               Working title (becomes the H1)
slug:                URL path (pillar/slug-with-keyword)
pillar:              Stories | Guides | Style
author:              Florence (or commissioned writer's byline)
published:           false (set true on go-live)
last_reviewed_at:    YYYY-MM (update on every refresh)
meta_title:          ≤ 60 chars, contains primary keyword
meta_description:    ≤ 160 chars, contains primary keyword
hero_image_brief:    Image direction + licensing + alt text
schema:              Article | Article + FAQPage | Article + Review
word_count:          Approximate, for tracking
status:              First draft | Edited | Fact-checked | Ready to publish
```

## Final pre-publish audit

Run the audit script:

```bash
python3 audit.py path/to/article.md --keyword "your primary keyword"
```

The script must report `PASS — ready to ship`. If it returns `WARN`, review what's flagged and decide whether to fix or accept. If it returns `FAIL`, fix before publishing — no exceptions.

After the audit passes, run one final human check:
- Read the piece aloud one more time
- Verify all factual claims against the cited sources (Sanity has draft mode for this)
- Verify all affiliate links work and have proper rel attributes
- Verify the hero image is licensed and credited
- Verify the redirect from the old URL (if it's a migration piece) points to this slug

## A note on Florence's voice

Florence is the editorial voice, not the protagonist of every piece. She shows up at:
- The thesis statement, usually in the first or second section ("What I find interesting about this...")
- Section transitions where an editorial judgment moves the reader's understanding forward
- Closing observations that land the piece on a clear position

She does *not* show up at:
- The opening of every section
- Inside every paragraph
- Every observation that could be made impersonally

Roughly one "I" or "I think" per major section is the right dose. More than that and the publication becomes a Substack; less and the pieces feel anonymous. Stories pieces carry her voice more visibly than Guides; Guides pieces carry it most where there is a position to take (resale value, ethical claims, what's overrated).

## What we'll never publish

- A piece with the audit script in FAIL
- A piece with broken affiliate disclosure
- A piece with uncredited photography
- A piece that mentions a real person we haven't checked against the public record
- A piece that recommends a retailer Florence wouldn't actually use
- A piece written entirely in one rhythm
