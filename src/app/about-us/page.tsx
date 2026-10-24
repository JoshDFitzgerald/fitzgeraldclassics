import Image from "next/image";
import Button from "@/components/Button";
import { getPage } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type Link = { label: string; link: string };
type AboutPage = {
  seoTitle: string;
  seoDescription: string;
  story: { eyebrow: string; heading: string; text: string; image: string; imageAlt: string };
  philosophy: { heading: string; paragraphs: string[]; button: Link; image: string; imageAlt: string };
  partners: { heading: string; text: string; button: Link };
};

const page = () => getPage<AboutPage>("about-us");

export function generateMetadata() {
  const p = page();
  return buildMetadata({ title: p.seoTitle, description: p.seoDescription, path: "/about-us", image: p.story.image });
}

export default function AboutPage() {
  const { story, philosophy, partners } = page();
  return (
    <>
      {/* Our story */}
      <section className="px-[24px] pb-[64px] pt-[40px] md:grid md:grid-cols-[45%_1fr] md:items-center md:gap-[6.4%] md:px-0 md:pb-[92px] md:pt-[92px]">
        <div className="relative aspect-[648/862] w-full">
          <Image src={story.image} alt={story.imageAlt} fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
        </div>
        <div className="mt-[32px] md:mt-0 md:pr-[45px]">
          <p className="text-[20px] font-medium uppercase tracking-[0.1em] text-muted md:text-[clamp(1.25rem,1.875vw,1.69rem)]">{story.eyebrow}</p>
          <h1 className="mt-[8px] font-serif text-display font-bold leading-[1.05] md:mt-[23px]">{story.heading}</h1>
          <p className="mt-[24px] text-lead leading-[1.5] md:mt-[36px]">{story.text}</p>
        </div>
      </section>

      {/* Heritage & philosophy */}
      <section className="bg-surface px-[24px] py-[64px] md:grid md:grid-cols-[1fr_478px] md:gap-[7%] md:px-[91px] md:py-[91px]">
        <div>
          <h2 className="max-w-[15ch] font-serif text-section font-bold leading-[1.1]">{philosophy.heading}</h2>
          <div className="mt-[32px] grid gap-[24px] md:mt-[48px] md:grid-cols-2 md:gap-[50px]">
            {philosophy.paragraphs.map((t) => (
              <p key={t} className="text-[16px] leading-[1.6] md:text-[18px]">
                {t}
              </p>
            ))}
          </div>
          <Button href={philosophy.button.link} variant="outline" className="mt-[40px] uppercase md:mt-[80px] md:w-[189px] md:normal-case">
            {philosophy.button.label}
          </Button>
        </div>
        <div className="relative mt-[48px] aspect-[478/611] w-full md:mt-0">
          <Image src={philosophy.image} alt={philosophy.imageAlt} fill sizes="(min-width: 768px) 478px, 100vw" className="object-cover" />
        </div>
      </section>

      {/* Partner call-to-action */}
      <section className="px-[24px] py-[64px] text-center md:px-[45px] md:pb-[110px] md:pt-[109px]">
        <h2 className="mx-auto max-w-[964px] font-serif text-display-sm font-bold uppercase leading-[1.1] tracking-[0.02em] text-gold">
          {partners.heading}
        </h2>
        <p className="mx-auto mt-[24px] max-w-[720px] text-lead leading-[1.5] md:mt-[40px]">{partners.text}</p>
        <Button href={partners.button.link} className="mt-[32px] uppercase md:mt-[56px] md:normal-case">
          {partners.button.label}
        </Button>
      </section>
    </>
  );
}
