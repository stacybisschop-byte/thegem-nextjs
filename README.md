# The Gem — Next.js + Sanity

Editorial jewellery publication. 26 articles across Stories, Guides, and Style pillars.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Sanity v3** (CMS + embedded Studio at `/studio`)
- **react-markdown** (article body rendering)
- **Vercel** (deployment target)

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Sanity project

1. Go to [sanity.io/manage](https://sanity.io/manage) → **New project**
2. Name it `the-gem`, choose the **Production** dataset
3. Copy the **Project ID**

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token_here
```

For the write token: `sanity.io/manage → API → Tokens → Add API token` (Editor role).

### 4. Deploy the Sanity schema

```bash
npx sanity deploy
```

This deploys the schema to your Sanity project. The Studio then appears at `/studio` in your Next.js app.

### 5. Migrate the 26 articles

Point the migration script at your markdown files (edit `MD_DIR` in `scripts/migrate-to-sanity.ts` if needed):

```bash
npm run migrate
```

This reads every `.md` file, parses frontmatter, and upserts each article as a Sanity document. Safe to re-run.

### 6. Start the dev server

```bash
npm run dev
# → http://localhost:3000         (the publication)
# → http://localhost:3000/studio  (Sanity Studio)
```

---

## Project structure

```
app/
  layout.tsx              Root layout (Nav + Footer + global CSS)
  page.tsx                Homepage (ISR, revalidates every 60s)
  [pillar]/[slug]/page.tsx Article template (SSG via generateStaticParams)
  studio/[[...tool]]/page.tsx Embedded Sanity Studio

components/
  Nav.tsx                 Sticky navigation
  Footer.tsx              Footer with links
  ArticleCard.tsx         Card component (large, medium, recent variants)
  ArticleBody.tsx         Renders markdown body + extracts FAQ pairs
  Newsletter.tsx          Beehiiv-ready subscribe form (demo mode until wired)

lib/
  sanity.ts               Client config, TypeScript interfaces, helpers
  queries.ts              All GROQ queries (homepage, article, pillar index)

sanity/
  schemaTypes/
    article.ts            Complete article document schema
    index.ts              Schema exports

scripts/
  migrate-to-sanity.ts    One-time migration script for the 26 .md files

styles/
  globals.css             Full design system (Fraunces + Plus Jakarta Sans)

redirects.js              (Place the file from outputs/ here to activate 301s)
```

---

## Content editing

Once the migration runs, everything lives in Sanity Studio at `/studio`.

**To add a new article:**
1. Open Studio → click **+** → Article
2. Fill in title, slug, pillar, meta description, hero image, body (paste Markdown)
3. Set **Published** to `true`
4. Save — the article is live within ~60 seconds (ISR revalidation)

**To feature an article on the homepage:**
1. Open the article in Studio
2. Check **Featured (Homepage Latest)**
3. Set **Featured Order**: 1 = large card, 2 and 3 = medium cards

---

## Adding hero images

The `heroImageBrief` field in Sanity Studio contains the photography brief for each article.
The article page falls back gracefully if no image is set — grey placeholder fills the slot.

To add real images:
1. Open an article in Studio → **Hero Image** field → upload
2. Fill in the **Alt Text** and **Caption** sub-fields

---

## Wiring Beehiiv

In `components/Newsletter.tsx`, replace the `handleSubmit` function's TODO with a real Beehiiv POST:

```ts
const res = await fetch(`https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
  body: JSON.stringify({ email }),
})
```

Store `BEEHIIV_PUBLICATION_ID` and `BEEHIIV_API_KEY` in `.env.local`.

---

## Deploying to Vercel

```bash
npx vercel
```

Set the same env vars in the Vercel project dashboard that you have in `.env.local`.

After first deploy, add your custom domain and then submit a **Change of Address** request in Google Search Console (from gemstonesinsider.com to the new domain).

---

## The 301 redirects

The `redirects.js` file (in `/outputs/redirects.js`) contains 101 redirects from the old gemstonesinsider.com URL structure. Copy it to the project root and `next.config.js` will pick it up automatically.
