import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parseEbayListings } from "../src/lib/ebay-parser.ts";

const html = readFileSync(new URL("./fixtures/ebay-seller.html", import.meta.url), "utf8");

test("extracts verified seller cards and strips unrelated tracking from item links", () => {
  const listings = parseEbayListings(html);
  assert.equal(listings.length, 2);
  assert.equal(listings[0].name, "!957 Nash Metropolitan OEM Parking Lights SOLD FOR PARTS ONLY");
  assert.equal(listings[0].condition, "Parts Only");
  assert.equal(listings[0].price, 10);
  assert.equal(listings[0].acceptsOffers, true);
  assert.equal(listings[0].link, "https://www.ebay.com/itm/920004746795");
  assert.equal(new URL(listings[0].image).hostname, "i.ebayimg.com");
});

test("does not include advertisements or another seller's cards", () => {
  const extra = '<li class="s-card"><div class="s-card__title">Advertisement</div><div class="s-card__attribute-row"><span>another-seller</span></div><a href="https://www.ebay.com/itm/123">Ad</a><img class="s-card__image" src="https://i.ebayimg.com/ad.jpg"><span class="s-card__price">$1.00</span></li>';
  assert.equal(parseEbayListings(html + extra).length, 2);
});

test("rejects incomplete catalogs rather than silently dropping items", () => {
  assert.throws(() => parseEbayListings(html.replace("2 results", "3 results")), /complete/);
});

test("rejects redirects and non-eBay image destinations", () => {
  assert.throws(() => parseEbayListings(html.replaceAll("i.ebayimg.com", "untrusted.example")), /complete/);
  assert.throws(() => parseEbayListings(html.replaceAll("www.ebay.com/itm/", "untrusted.example/itm/")), /complete/);
});

test("recognizes an explicitly empty store without showing old listings", () => {
  assert.deepEqual(parseEbayListings('<h1 class="srp-controls__count-heading">0 results</h1>'), []);
});

test("rejects error pages and unexpected markup", () => {
  assert.throws(() => parseEbayListings("<h1>Please verify your browser</h1>"), /recognizable/);
});
