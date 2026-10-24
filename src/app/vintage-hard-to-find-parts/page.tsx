import Image from "next/image";
import ImageHero from "@/components/ImageHero";
import { getPage, getVintageParts } from "@/lib/content";
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
  catalogHeading: string;
};
const page = () => getPage<PartsPage>("vintage-parts");

export function generateMetadata() {
  const p = page();
  return buildMetadata({ title: p.seoTitle, description: p.seoDescription, path: "/vintage-hard-to-find-parts", image: p.heroImage });
}

export default function VintagePartsPage() {
  const p = page();
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
          <div className="mt-[24px] grid gap-[36px] md:grid-cols-3">
            {getVintageParts().map((part) => (
              <article key={part.link} className="flex min-w-0 flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#161616]">
                  <Image src={part.image} alt={part.name} fill sizes="(min-width: 768px) 400px, 100vw" unoptimized={part.image.startsWith("http")} className="object-cover" />
                </div>
                <h3 className="mb-[10px] mt-[16px] font-serif text-[20px] font-bold leading-[1.18]">{part.name}</h3>
                <p className="mb-[18px] text-[14px] leading-[1.55] text-[#f2f2f2]">{part.description}</p>
                <a href={part.link} target="_blank" rel="noopener noreferrer sponsored" className="mt-auto inline-flex min-h-[42px] min-w-[140px] items-center justify-center self-start bg-gold px-[22px] py-[11px] text-[14px] font-bold text-ink hover:bg-cream">
                  {part.buttonLabel || "View on eBay"}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
