import Image from "next/image";
import Link from "next/link";
import { getPage, getProjects } from "@/lib/content";
import { projectPath } from "@/lib/projectPath";
import { buildMetadata } from "@/lib/seo";

type PortfolioPage = { seoTitle: string; seoDescription: string; heading: string; intro: string };
const page = () => getPage<PortfolioPage>("portfolio");

export function generateMetadata() {
  const p = page();
  return buildMetadata({ title: p.seoTitle, description: p.seoDescription, path: "/portfolio" });
}

export default function PortfolioPage() {
  const p = page();
  const projects = getProjects();
  return (
    <section className="px-[20px] pb-[80px] pt-[40px] md:px-[23px] md:pb-[100px] md:pt-[68px]">
      <div className="md:flex md:items-start md:gap-[24px]">
        <h1 className="font-serif text-display-sm font-bold leading-[1.1]">{p.heading}</h1>
        <p className="mt-[12px] max-w-[580px] text-[16px] leading-[1.5] text-gold md:mt-[10px] md:text-[clamp(1rem,1.5vw,1.35rem)]">{p.intro}</p>
      </div>
      <div className="mt-[32px] grid gap-[40px] md:mt-[30px] md:grid-cols-3 md:gap-[13px]">
        {projects.map((pr) => (
          <Link key={pr.slug} href={projectPath(pr.slug)} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={pr.coverImage} alt={pr.coverAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              {pr.status && (
                <span className={`absolute left-[12px] top-[12px] z-10 inline-flex items-center gap-[9px] border bg-[#0a0a0a]/95 px-[12px] py-[10px] text-[11px] font-semibold uppercase leading-none tracking-[0.12em] sm:left-[16px] sm:top-[16px] sm:text-[12px] ${pr.status === "completed" ? "border-gold/35 border-l-[3px] border-l-[#81955a] text-cream" : "border-gold/55 text-gold"}`}>
                  {pr.status === "completed" ? (
                    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#81955a]">
                      <path d="M3 8.5 6.2 11.5 13 4.5" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span aria-hidden="true" className="h-[9px] w-[9px] shrink-0 rounded-full bg-gold" />
                  )}
                  {pr.status === "completed" ? "Completed" : "In Progress"}
                </span>
              )}
            </div>
            <h2 className="mt-[20px] max-w-[22ch] font-serif text-[22px] font-bold leading-[1.35] md:text-[24px]">{pr.title}</h2>
            <div className="mt-[20px] space-y-[24px] text-[16px] leading-[1.4] md:mt-[34px] md:text-[17px]">
              {pr.body.split(/\n\s*\n/).map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
