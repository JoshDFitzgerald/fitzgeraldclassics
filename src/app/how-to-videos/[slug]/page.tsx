import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import Button from "@/components/Button";
import { getVideo, getVideos } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { youtubeEmbed, youtubeThumb } from "@/lib/youtube";

// Unknown or old video addresses (including a few that were already broken
// on the old site) send visitors to the full video list.
export const dynamicParams = true;

export function generateStaticParams() {
  return getVideos().map((v) => ({ slug: v.slug }));
}

async function load(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  return getVideo(decodeURIComponent(slug));
}

export async function generateMetadata({ params }: PageProps<"/how-to-videos/[slug]">) {
  const v = await load(params);
  if (!v) return {};
  return buildMetadata({ title: v.seoTitle || `${v.title} | Fitzgerald Classics`, description: v.seoDescription || v.recommendation, path: `/how-to-videos/${v.slug}`, image: youtubeThumb(v.youtubeId) });
}

export default async function VideoPage({ params }: PageProps<"/how-to-videos/[slug]">) {
  const v = await load(params);
  if (!v) permanentRedirect("/how-to-videos");
  const isShort = v.format.toLowerCase() === "short";
  return (
    <article className="mx-auto max-w-[1000px] px-[20px] pb-[80px] pt-[40px] md:pb-[120px] md:pt-[64px]">
      <Link href="/how-to-videos" className="text-[14px] text-gold hover:text-cream">
        ← All How-To Videos
      </Link>
      <p className="mt-[28px] text-[14px] uppercase tracking-[0.1em] text-muted">
        {v.creator} · {v.format}
      </p>
      <h1 className="mt-[10px] font-serif text-[28px] font-bold leading-[1.2] md:text-[44px]">{v.title}</h1>
      <div className={`mt-[28px] overflow-hidden bg-black ${isShort ? "mx-auto aspect-[9/16] max-w-[400px]" : "aspect-video"}`}>
        <iframe
          src={youtubeEmbed(v.youtubeId)}
          title={v.title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      {v.recommendation && <p className="mt-[28px] text-lead leading-[1.5]">{v.recommendation}</p>}
      <Button href={v.youtubeUrl} className="mt-[28px]">
        Watch on YouTube
      </Button>
    </article>
  );
}
