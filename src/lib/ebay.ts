import savedCatalog from "../../content/ebay-listings.json";
import { siteConfig } from "@site-config";
import { EBAY_SELLER, EBAY_STORE_URL, parseEbayListings, type EbayListing } from "./ebay-parser";

export async function getEbayListings(): Promise<{ listings: EbayListing[]; checkedAt: string }> {
  let listings: EbayListing[] = savedCatalog.listings;
  let checkedAt = savedCatalog.checkedAt;
  if (savedCatalog.seller !== EBAY_SELLER) throw new Error("Saved eBay catalog belongs to a different seller");
  try {
    const response = await fetch(EBAY_STORE_URL, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`eBay returned ${response.status}`);
    listings = parseEbayListings(await response.text());
    checkedAt = new Date().toISOString();
  } catch {
    // Keep verified cards visible if eBay is temporarily unavailable or changes its markup.
    // The displayed check date continues to identify when this catalog was verified.
    console.warn(`Using saved eBay listings verified on ${savedCatalog.checkedAt}`);
  }
  return {
    checkedAt,
    listings: listings.map((listing) => {
      const link = new URL(listing.link);
      link.searchParams.set("campid", siteConfig.affiliates.ebayCampaignId);
      const savedImage = savedCatalog.listings.find((saved) => saved.id === listing.id && saved.sourceImage === listing.image);
      return { ...listing, image: savedImage?.image || listing.image, link: link.href };
    }),
  };
}
