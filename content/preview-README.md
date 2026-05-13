# The Gem — Preview

A static preview of the homepage and two article pages, ready to view in your browser.

## What's here

```
thegem-preview/
├── index.html                                       Homepage
├── styles.css                                       Shared stylesheet
├── stories/
│   └── princess-diana-jewellery.html                Story flagship
└── guides/
    └── lab-grown-vs-natural-diamonds.html           Guide flagship
```

## How to preview

The site uses absolute paths (`/styles.css`, `/stories/...`) so it needs a local server — opening `index.html` by double-click won't load the stylesheet correctly. Two one-line options:

### Option A — Python (no install required if you have Python 3)

From the `thegem-preview/` folder:

```bash
python3 -m http.server 3001
```

Then open **http://localhost:3001** in your browser. I'm using port 3001 to avoid clashing with whatever you're running on `:3000`. Use any port that's free.

### Option B — Node (if you'd rather)

```bash
npx serve -p 3001
```

Same URL: **http://localhost:3001**.

## What to click

- Homepage hero CTA → Diana piece
- "Lab-grown vs natural" card in the Latest grid → Lab-Grown piece  
- Inside each article, the "Further reading" cards link to each other
- Most other links are placeholders pointing to `/stories`, `/guides` etc. — they'll 404 (no pages built yet) but the URL structure is what the final Next.js routes will be

## Replacing the placeholder images

Every image right now is an Unsplash URL embedded in CSS or inline `style="background-image: ..."`. To swap in real licensed photography:

1. In `index.html`, search for `images.unsplash.com` — there are about 8 image URLs to replace
2. In each article HTML, the hero image URL is in the `.article-hero-image .image` element
3. Production approach (later): images move to Sanity's asset pipeline, and these inline URLs become Sanity image references rendered through `next/image`

## Porting to your Next.js project

When you're ready to move this into your localhost:3000 build:

1. The CSS in `styles.css` can be dropped into your Next.js project as a global stylesheet (or split into CSS modules per component if you prefer)
2. Each section of `index.html` maps to a React component: `<Announce />`, `<Nav />`, `<Hero />`, `<LatestGrid />`, `<EditorialBreak />`, `<PillarPair />`, `<Newsletter />`, `<RecentGrid />`, `<Footer />`
3. The article template becomes a single component: `<ArticlePage />` that takes the article data (title, deck, body, hero image, related) from Sanity
4. Replace the Google Fonts `<link>` tag with `next/font` for production performance
5. Replace `<img>` and inline `background-image: url(...)` with `next/image` for the optimisation pipeline

Ping me when you're ready and I'll do the port in a follow-up — pages first, then components, with the Sanity schema feeding both.
