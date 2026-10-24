import Image from "next/image";
import Link from "next/link";
import { getPage, getVideos } from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";
import { youtubeThumb } from "@/lib/youtube";

type VideosPage = { seoTitle: string; seoDescription: string; heading: string; watchLabel: string };
const page = () => getPage<VideosPage>("how-to-videos");

export function generateMetadata() {
  const p = page();
  return buildMetadata({ title: p.seoTitle, description: p.seoDescription, path: "/how-to-videos" });
}

export default function VideosPage() {
  const p = page();
  return (
    <section className="px-[20px] pb-[80px] pt-[48px] md:px-[23px] md:pb-[120px] md:pt-[88px]">
      <h1 className="text-center font-serif text-[36px] font-bold leading-[1.1] md:text-[clamp(2.25rem,4.11vw,3.7rem)]">{p.heading}</h1>
      <div className="mt-[20px] space-y-[24px] text-[16px] leading-[1.5] md:mt-[22px] md:space-y-[34px] md:text-lead" dangerouslySetInnerHTML={{ __html: markdownToHtml(p.body) }} />
      <div className="mt-[40px] grid gap-[24px] sm:grid-cols-2 md:mt-[48px] lg:grid-cols-3">
        {getVideos().map((v) => (
          <Link key={v.slug} href={`/how-to-videos/${v.slug}`} className="group flex flex-col border border-white/10 bg-surface hover:border-gold/60">
            <div className="relative aspect-video overflow-hidden bg-black">
              <Image src={youtubeThumb(v.youtubeId)} alt={v.title} fill unoptimized sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute left-[12px] top-[12px] bg-ink/80 px-[8px] py-[3px] text-[11px] uppercase tracking-[0.1em] text-gold">{v.format}</span>
            </div>
            <div className="flex flex-1 flex-col p-[20px]">
              <h2 className="font-serif text-[19px] font-bold leading-[1.3] group-hover:text-gold">{v.title}</h2>
              <p className="mt-[6px] text-[13px] text-muted">{v.creator}</p>
              {v.recommendation && <p className="mt-[12px] line-clamp-3 text-[14px] leading-[1.5]">{v.recommendation}</p>}
              <span className="mt-auto self-start pt-[18px]">
                <span className="inline-flex items-center gap-[8px] bg-gold px-[16px] py-[8px] text-[13px] uppercase tracking-[0.05em] text-ink">→ {p.watchLabel}</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
