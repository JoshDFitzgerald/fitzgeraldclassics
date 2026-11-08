import ImageHero from "@/components/ImageHero";
import PartsCatalog, { type CatalogItem } from "@/components/PartsCatalog";
import { getPage, getVintageParts } from "@/lib/content";
import { getEbayListings } from "@/lib/ebay";
import { buildMetadata } from "@/lib/seo";

type PartsPage = {
  seoTitle: string;
  seoDescription: string;
  heroImage: string;
  heroAlt: string;
  headingLine1: string;
  headingLine2: string;
  subheading: string;
  intro: string;
  disclaimer: string;
  catalogHeading: string;
};
const page = () => getPage<PartsPage>("vintage-parts");
export const revalidate = 3600;

// One combined inventory: every eBay listing on this page, whatever its
// source, presented together. The same listing (same eBay item) is shown once.
function ebayItemKey(link: string) {
  const match = link.match(/\/itm\/(\d+)/);
  return match ? `itm-${match[1]}` : link;
}

export function generateMetadata() {
  const p = page();
  return buildMetadata({ title: p.seoTitle, description: p.seoDescription, path: "/vintage-hard-to-find-parts", image: p.heroImage });
}

export default async function VintagePartsPage() {
  const p = page();
  const { listings, checkedAt } = await getEbayListings();
  const checkedDate = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/Phoenix" }).format(new Date(checkedAt));

  const storeItems: CatalogItem[] = listings.map((listing) => ({
    key: ebayItemKey(listing.link),
    name: listing.name,
    link: listing.link,
    image: listing.image,
    imageContain: true,
    condition: listing.condition,
    price: listing.price,
    priceLabel: listing.priceLabel,
    acceptsOffers: listing.acceptsOffers,
  }));
  const curatedItems: CatalogItem[] = getVintageParts().map((part) => ({
    key: ebayItemKey(part.link),
    name: part.name,
    link: part.link,
    image: part.image,
    description: part.description,
    buttonLabel: part.buttonLabel,
  }));
  // Interleave the two collections, keeping each one's own order, and drop
  // any listing that appears in both so it is only shown once.
  const seen = new Set<string>();
  const items: CatalogItem[] = [];
  for (let i = 0; i < Math.max(storeItems.length, curatedItems.length); i++) {
    for (const item of [storeItems[i], curatedItems[i]]) {
      if (item && !seen.has(item.key)) {
        seen.add(item.key);
        items.push(item);
      }
    }
  }

  // A trailing "&" in the first heading line is shown in gold, like the original design.
  const line1 = p.headingLine1.replace(/\s*&\s*$/, "");
  const hasAmp = line1 !== p.headingLine1;
  return (
    <>
      <ImageHero image={p.heroImage} alt={p.heroAlt} overlay="bg-gradient-to-b from-black/40 to-transparent" className="h-[300px] md:h-[54vw] md:max-h-[780px]">
        <div className="px-[24px] pt-[28px] md:px-[92px] md:pt-[30px]">
          <h1 className="font-serif text-[36px] font-bold leading-[1.05] text-[#F5F1E8] md:text-[clamp(2.25rem,5.06vw,4.55rem)]">
            {line1} {hasAmp && <span className="text-gold">&amp;</span>}
            <br />
            {p.headingLine2}
          </h1>
          <p className="mt-[12px] max-w-[760px] font-serif text-[16px] text-[#F5F1E8] md:pl-[8px] md:text-[clamp(1rem,1.5vw,1.35rem)]">{p.subheading}</p>
        </div>
      </ImageHero>
      <section className="px-[20px] pb-[80px] pt-[48px] md:pb-[120px] md:pt-[100px]">
        <p className="mx-auto max-w-[760px] text-center text-lead leading-[1.5]">{p.intro}</p>
        <div className="mx-auto mt-[48px] max-w-[1200px] md:mt-[64px]">
          <h2 className="text-center font-serif text-[22px] font-bold uppercase tracking-[0.15em] text-gold md:text-[26px]">{p.catalogHeading}</h2>
          <p className="mt-[24px] text-[14px] leading-[1.6] text-muted">Listings checked {checkedDate}. Prices and availability may change; confirm details on eBay.</p>
          <PartsCatalog items={items} />
          <p className="mt-[16px] text-center text-[11px] text-muted">{p.disclaimer}</p>
        </div>
      </section>
    </>
  );
}
