import Link from "next/link";
import { siteConfig } from "@site-config";
import Button from "@/components/Button";
import { getPage } from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";

type EbayPage = { seoTitle: string; seoDescription: string; heading: string; storeHeading: string; storeButton: string; storeComingSoon: string; disclaimer: string };
const page = () => getPage<EbayPage>("ebay-ecommerce");

export function generateMetadata() {
  const p = page();
  return buildMetadata({ title: p.seoTitle, description: p.seoDescription, path: "/ebay-ecommerce" });
}

export default function EbayPage() {
  const p = page();
  return (
    <section className="px-[20px] pb-[80px] pt-[48px] md:pb-[160px] md:pt-[88px]">
      <div className="text-center">
        <h1 className="font-serif text-display-sm font-bold leading-[1.1] text-gold">{p.heading}</h1>
        <div
          className="mx-auto mt-[20px] max-w-[1050px] text-lead leading-[1.5] [&_a]:underline [&_a]:underline-offset-4"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(p.body) }}
        />
      </div>
      {/* TODO(backend): show live eBay listings (eBay Browse API or eBay Partner Network widget). */}
      <div className="mx-auto mt-[64px] max-w-[1050px] md:mt-[100px]">
        <h2 className="text-[24px] font-semibold md:text-[26px]">{p.storeHeading}</h2>
        <div className="mt-[20px] border-y border-white/15 px-[10px] py-[48px] text-center">
          {siteConfig.ebayStoreUrl ? (
            <Button href={siteConfig.ebayStoreUrl}>{p.storeButton}</Button>
          ) : (
            <>
              <p className="mx-auto max-w-[620px] text-[16px] leading-[1.6]">{p.storeComingSoon}</p>
              <Link href="/vintage-hard-to-find-parts" className="mt-[24px] inline-block bg-gold px-[27px] py-[13.5px] text-[16px] text-ink hover:bg-cream">
                Browse Vintage Parts
              </Link>
            </>
          )}
        </div>
        <p className="mt-[16px] text-center text-[11px] text-muted">{p.disclaimer}</p>
      </div>
    </section>
  );
}
