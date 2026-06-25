import { createClient } from "@sanity/client";
import { writeFileSync } from "fs";
const client = createClient({ projectId: "qwjttp4n", dataset: "production", apiVersion: "2024-01-01", token: "skZAPbLiEc1moWfyIrEeJQkg5MzRGflUOH6QpI3VCYT7vPaMNPM3Oj0r8jHno7UsB11F17XaO6WbI3xBmrE68RXXfcRX5D4pQ0HTk4gEI7DhrbQKBI5J6r6IdAk5NvVUaQvSd9Yr0NT2MDFzlKwbiqq0RllNBO2usEazV4a347eNWCPr1pZP", useCdn: false });
const doc = await client.fetch('*[_type == "article" && slug.current == "where-to-buy-vintage-jewellery"][0]{ _id, body }');
writeFileSync("C:/Users/stacy/projects/thegem-nextjs/_geo_where-to-buy-vintage-jewellery.body.json", JSON.stringify(doc));
console.log("fetched _id:", doc._id, "body length:", doc.body.length);
