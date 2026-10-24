import Image from "next/image";
import Button from "@/components/Button";
import { getPage, getPartners } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type PartnersPage = { seoTitle: string; seoDescription: string; heading: string; intro: string; badge: string; buttonLabel: string };
const page = () => getPage<PartnersPage>("trusted-partners");

export function generateMetadata() {
  const p = page();
  return buildMetadata({ title: p.seoTitle, description: p.seoDescription, path: "/trusted-partners" });
}

export default function TrustedPartnersPage() {
  const p = page();
  return (
    <section className="px-[20px] pb-[80px] pt-[40px] md:px-[134px] md:pb-[120px] md:pt-[90px]">
      <div className="text-center">
        <h1 className="mx-auto max-w-[11ch] font-serif text-display font-bold leading-[1.05] text-gold">{p.heading}</h1>
        <p className="mx-auto mt-[24px] max-w-[830px] text-lead leading-[1.5] md:mt-[40px]">{p.intro}</p>
      </div>
      <div className="mt-[48px] space-y-[32px] md:mt-[118px] md:space-y-[58px]">
        {getPartners().map((partner) => (
          <article key={partner.name} className="grid gap-[28px] border border-gold/45 bg-surface p-[24px] md:grid-cols-[1fr_300px] md:gap-[60px] md:px-[45px] md:py-[50px]">
            <div className="flex flex-col">
              <p className="self-start bg-gold px-[10px] py-[4px] text-[12px] font-semibold uppercase tracking-[0.08em] text-ink md:text-[15px]">{p.badge}</p>
              <h2 className="mt-[16px] font-serif text-[clamp(1.875rem,5.31vw,4.78rem)] font-bold leading-[1.05]">{partner.name}</h2>
              <p className="mt-[10px] text-[13px] uppercase tracking-[0.08em] text-gold md:text-[17px]">Category: {partner.category}</p>
              <p className="mt-[28px] text-[16px] leading-[1.5] md:mt-auto md:pt-[90px] md:text-lead">{partner.description}</p>
            </div>
            <div className="flex flex-col gap-[20px] md:pt-[20px]">
              {partner.logo && (
                <div className="relative h-[80px] w-full max-w-[270px] md:h-[110px] md:mx-auto">
                  <Image src={partner.logo} alt={`${partner.name} logo`} fill sizes="270px" className="object-contain object-left md:object-center" />
                </div>
              )}
              <div className="text-[14px] leading-[1.6] text-muted md:mt-auto md:pt-[60px] md:text-[17px]">
                {partner.contact.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <div className="mt-[12px]">
                  {partner.address.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
              <Button href={partner.website} className="mt-[8px] self-start">
                {p.buttonLabel}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
