import Image from "next/image";
import { getPage } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type HomePage = {
  seoTitle: string;
  seoDescription: string;
  heroImage: string;
  heroAlt: string;
  heading: string;
  subheading: string;
};

const page = () => getPage<HomePage>("home");

export function generateMetadata() {
  const p = page();
  return buildMetadata({ title: p.seoTitle, description: p.seoDescription, path: "/", image: p.heroImage });
}

export default function HomePage() {
  const p = page();
  return (
    <section className="relative h-[275px] overflow-hidden md:h-[min(43.4vw,625px)]">
      <Image src={p.heroImage} alt={p.heroAlt} fill priority sizes="100vw" className="object-cover object-[44.5%_47%]" />
      <div className="absolute left-[24px] top-[30px] md:left-[6.3vw] md:top-[46px]">
        <h1 className="max-w-[8ch] font-serif text-display font-bold leading-[1.05] tracking-[0.02em] text-gold [text-shadow:0_4px_8px_rgba(0,0,0,0.75)]">
          {p.heading}
        </h1>
        <p className="mt-[6px] hidden pl-[0.9vw] text-lead text-gold [text-shadow:0_2px_4px_rgba(0,0,0,0.9)] md:block">
          {p.subheading}
        </p>
      </div>
    </section>
  );
}
