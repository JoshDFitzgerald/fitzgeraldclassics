import { load } from "cheerio";

export const EBAY_SELLER = "fitzgerald-classics";
export const EBAY_STORE_URL = `https://www.ebay.com/sch/i.html?_ssn=${EBAY_SELLER}&_sop=10&_ipg=240`;

export type EbayListing = {
  id: string;
  name: string;
  link: string;
  image: string;
  price: number;
  priceLabel: string;
  condition: string;
  acceptsOffers: boolean;
};

// Read only the seller's cards; never mix in advertisements or recommendations.
export function parseEbayListings(html: string): EbayListing[] {
  const $ = load(html);
  const listings = new Map<string, EbayListing>();
  $("li.s-card").each((_, element) => {
    const card = $(element);
    if (card.closest(".s-clipped").length) return;
    const sellerMatches = card.find(".s-card__attribute-row span").toArray().some((span) => $(span).text().trim().toLowerCase() === EBAY_SELLER);
    if (!sellerMatches) return;
    const name = card.find(".s-card__title").first().text().trim();
    const href = card.find('a[href*="/itm/"]').first().attr("href");
    const imageElement = card.find("img.s-card__image").first();
    const image = imageElement.attr("data-defer-load") || imageElement.attr("src");
    const priceLabel = card.find(".s-card__price").first().text().trim();
    const price = Number(priceLabel.replace(/[^0-9.]/g, ""));
    if (!name || name === "Shop on eBay" || !href || !image || !priceLabel.startsWith("$") || !Number.isFinite(price)) return;
    const linkUrl = new URL(href, "https://www.ebay.com");
    const id = linkUrl.pathname.match(/^\/itm\/(?:[^/]+\/)?(\d+)$/)?.[1];
    const imageUrl = new URL(image, "https://i.ebayimg.com");
    if (!id || linkUrl.hostname !== "www.ebay.com" || imageUrl.protocol !== "https:" || imageUrl.hostname !== "i.ebayimg.com") return;
    listings.set(id, {
      id, name, link: `https://www.ebay.com/itm/${id}`, image: imageUrl.href,
      price, priceLabel,
      condition: card.find(".s-card__subtitle").first().text().trim(),
      acceptsOffers: card.text().includes("or Best Offer"),
    });
  });
  const countHeading = $(".srp-controls__count-heading").first().text().trim();
  const count = countHeading.match(/^([\d,]+)\s+results?\b/i)?.[1];
  if (!count || Number(count.replaceAll(",", "")) !== listings.size) {
    throw new Error("eBay did not return a complete, recognizable seller catalog");
  }
  return [...listings.values()];
}
