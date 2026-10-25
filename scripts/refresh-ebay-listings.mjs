import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { EBAY_SELLER, EBAY_STORE_URL, parseEbayListings } from "../src/lib/ebay-parser.ts";

// Run with Node.js 22.6+ (or the provided Node.js 24 runtime).
const response = await fetch(EBAY_STORE_URL, { signal: AbortSignal.timeout(20000) });
if (!response.ok) throw new Error(`eBay returned ${response.status}; saved listings were not changed`);
const listings = parseEbayListings(await response.text());
const imageDirectory = new URL("../public/images/ebay/", import.meta.url);
await mkdir(imageDirectory, { recursive: true });
const savedListings = [];
for (const listing of listings) {
  const imageResponse = await fetch(listing.image, { signal: AbortSignal.timeout(20000) });
  if (!imageResponse.ok || !imageResponse.headers.get("content-type")?.startsWith("image/jpeg")) throw new Error(`Invalid photo for item ${listing.id}; saved catalog was not changed`);
  const photo = Buffer.from(await imageResponse.arrayBuffer());
  if (photo[0] !== 0xff || photo[1] !== 0xd8) throw new Error(`Invalid JPEG for item ${listing.id}`);
  const hash = createHash("sha256").update(photo).digest("hex").slice(0, 10);
  const name = `${listing.id}-${hash}.jpg`;
  await writeFile(new URL(name, imageDirectory), photo);
  savedListings.push({ ...listing, sourceImage: listing.image, image: `/images/ebay/${name}` });
}
const catalog = { seller: EBAY_SELLER, checkedAt: new Date().toISOString(), listings: savedListings };
await writeFile(fileURLToPath(new URL("../content/ebay-listings.json", import.meta.url)), `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Saved ${listings.length} verified ${EBAY_SELLER} listings.`);
