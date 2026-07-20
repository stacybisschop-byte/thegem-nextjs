import { createClient } from "@sanity/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const docs = await client.fetch(
  `*[_type == "article" && published == true]{ _id, "slug": slug.current, title, pillar, body } | order(slug.current asc)`
);

console.log(`Total published articles: ${docs.length}\n`);

// Split markdown body into prose paragraphs: drop headings, blockquotes, list
// items, and code fences — those aren't "paragraphs" in the readability sense.
function proseParagraphs(body) {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .filter((p) => !/^#{1,6}\s/.test(p))
    .filter((p) => !/^>/.test(p))
    .filter((p) => !/^[-*+]\s/.test(p))
    .filter((p) => !/^\d+\.\s/.test(p))
    .filter((p) => !/^```/.test(p))
    .filter((p) => !/^\|/.test(p)); // tables
}

// Full distribution across the whole corpus, mirroring the vendor's 50-300 band.
let allCounts = [];
let under50 = 0, in50to300 = 0, over300 = 0;

for (const doc of docs) {
  if (!doc.body) continue;
  const paras = proseParagraphs(doc.body);
  for (const p of paras) {
    const words = p.split(/\s+/).length;
    allCounts.push(words);
    if (words < 50) under50++;
    else if (words <= 300) in50to300++;
    else over300++;
  }
}

const total = allCounts.length;
console.log(`Total prose paragraphs across corpus: ${total}`);
console.log(`  < 50 words:    ${under50} (${((under50 / total) * 100).toFixed(1)}%)`);
console.log(`  50-300 words:  ${in50to300} (${((in50to300 / total) * 100).toFixed(1)}%)`);
console.log(`  > 300 words:   ${over300} (${((over300 / total) * 100).toFixed(1)}%)`);
console.log(`  median: ${allCounts.sort((a, b) => a - b)[Math.floor(total / 2)]} words`);
console.log(`  mean: ${(allCounts.reduce((a, b) => a + b, 0) / total).toFixed(1)} words`);

// Genuinely hard-to-scan paragraphs — long AND mixing ideas, not just "> some word count"
const LONG_THRESHOLD = 180;
const VERY_LONG_THRESHOLD = 260;
const results = [];

for (const doc of docs) {
  if (!doc.body) continue;
  const paras = proseParagraphs(doc.body);
  const longOnes = paras
    .map((p, i) => ({ index: i, words: p.split(/\s+/).length, text: p }))
    .filter((p) => p.words > LONG_THRESHOLD);

  if (longOnes.length > 0) {
    results.push({
      slug: doc.slug,
      title: doc.title,
      pillar: doc.pillar,
      totalParas: paras.length,
      longCount: longOnes.length,
      maxWords: Math.max(...longOnes.map((p) => p.words)),
      longOnes,
    });
  }
}

results.sort((a, b) => b.maxWords - a.maxWords);

console.log(`\nArticles with at least one paragraph over ${LONG_THRESHOLD} words: ${results.length}`);
for (const r of results) {
  const flag = r.maxWords > VERY_LONG_THRESHOLD ? " <<< very dense" : "";
  console.log(`${r.slug} | ${r.pillar} | ${r.longCount}/${r.totalParas} | ${r.maxWords}${flag}`);
}
