import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "qwjttp4n",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skZAPbLiEc1moWfyIrEeJQkg5MzRGflUOH6QpI3VCYT7vPaMNPM3Oj0r8jHno7UsB11F17XaO6WbI3xBmrE68RXXfcRX5D4pQ0HTk4gEI7DhrbQKBI5J6r6IdAk5NvVUaQvSd9Yr0NT2MDFzlKwbiqq0RllNBO2usEazV4a347eNWCPr1pZP",
  useCdn: false,
});

const docs = await client.fetch(
  `*[_type == "article" && published == true]{ _id, "slug": slug.current, title, body } | order(slug.current asc)`
);

console.log(`Total published articles: ${docs.length}\n`);

const rows = docs.map(d => ({
  slug: d.slug,
  title: d.title,
  emdashes: (d.body.match(/—/g) || []).length,
  hasInBrief: d.body.includes("> *In Brief:"),
  hasFAQ: d.body.includes("## Frequently asked questions") || d.body.includes("### "),
}));

// Sort by em-dash count descending
rows.sort((a, b) => b.emdashes - a.emdashes);

console.log("slug | em-dashes | In Brief? | FAQ?");
console.log("-----|-----------|-----------|-----");
for (const r of rows) {
  console.log(`${r.slug} | ${r.emdashes} | ${r.hasInBrief ? "YES" : "no"} | ${r.hasFAQ ? "yes" : "no"}`);
}

const needsEmDash = rows.filter(r => r.emdashes > 4);
const needsInBrief = rows.filter(r => !r.hasInBrief);
console.log(`\nArticles with >4 em-dashes: ${needsEmDash.length}`);
console.log(`Articles missing In Brief: ${needsInBrief.length}`);
