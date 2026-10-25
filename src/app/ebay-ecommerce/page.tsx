import { siteConfig } from "@site-config";
import Button from "@/components/Button";
import EbayCatalog from "@/components/EbayCatalog";
import { getPage } from "@/lib/content";
import { getEbayListings } from "@/lib/ebay";
import { markdownToHtml } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";

type EbayPage = { seoTitle: string; seoDescription: string; heading: string; storeHeading: string; storeButton: string; disclaimer: string };
const page = () => getPage<EbayPage>("ebay-ecommerce");
export const revalidate = 3600;

export function generateMetadata() {
  const p = page();
  return buildMetadata({ title: p.seoTitle, description: p.seoDescription, path: "/ebay-ecommerce" });
}

export default async function EbayPage() {
  const p = page();
  const { listings, checkedAt } = await getEbayListings();
  const checkedDate = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/Phoenix" }).format(new Date(checkedAt));
  return (
    <section className="px-[20px] pb-[80px] pt-[48px] md:pb-[160px] md:pt-[88px]">
      <div className="text-center">
        <h1 className="font-serif text-display-sm font-bold leading-[1.1] text-gold">{p.heading}</h1>
        <div
          className="mx-auto mt-[20px] max-w-[1050px] text-lead leading-[1.5] [&_a]:underline [&_a]:underline-offset-4"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(p.body) }}
        />
      </div>
      <div className="mx-auto mt-[64px] max-w-[1200px] md:mt-[100px]">
        <h2 className="text-[24px] font-semibold md:text-[26px]">{p.storeHeading}</h2>
        <p className="mt-[12px] text-[14px] leading-[1.6] text-muted">Listings checked {checkedDate}. Prices and availability may change; confirm details on eBay.</p>
        <EbayCatalog listings={listings} />
        {siteConfig.ebayStoreUrl && <div className="mt-[40px] text-center"><Button href={siteConfig.ebayStoreUrl}>{p.storeButton}</Button></div>}
        <p className="mt-[16px] text-center text-[11px] text-muted">{p.disclaimer}</p>
      </div>
    </section>
  );
}
