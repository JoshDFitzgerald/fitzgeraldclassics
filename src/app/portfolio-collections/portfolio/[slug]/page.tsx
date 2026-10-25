import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectPhotoGrid from "@/components/ProjectPhotoGrid";
import { getProject, getProjects } from "@/lib/content";
import { projectPath } from "@/lib/projectPath";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

async function load(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  return getProject(decodeURIComponent(slug));
}

export async function generateMetadata({ params }: PageProps<"/portfolio-collections/portfolio/[slug]">) {
  const p = await load(params);
  if (!p) return {};
  return buildMetadata({ title: p.seoTitle || p.title, description: p.seoDescription, path: projectPath(p.slug), image: p.coverImage });
}

export default async function ProjectPage({ params }: PageProps<"/portfolio-collections/portfolio/[slug]">) {
  const p = await load(params);
  if (!p) notFound();
  const photos = p.highlightImages ? p.photos.filter((photo) => p.highlightImages?.includes(photo.image)) : p.photos;
  const hasFullGallery = photos.length < p.photos.length;
  const galleryLink = hasFullGallery && (
    <Link href={`${projectPath(p.slug)}/gallery`} prefetch={false} className="inline-block bg-gold px-[27px] py-[14px] text-center text-[16px] font-bold text-ink hover:bg-cream">
      View the full restoration gallery
    </Link>
  );
  return (
    <article className="px-[20px] pb-[80px] pt-[40px] md:px-[14px] md:pb-[100px] md:pt-[14px]">
      <div className="grid gap-[14px] md:grid-cols-2">
        <div className="relative order-first aspect-[700/872] md:order-last">
          <Image src={p.coverImage} alt={p.coverAlt} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="pt-[30px] md:px-[32px] md:pt-[80px]">
          <h1 className="font-serif text-[34px] font-bold leading-[1.2] md:text-[clamp(2.25rem,5.4vw,4.9rem)] md:leading-[1.12]">{p.title}</h1>
          <div className="mt-[30px] space-y-[20px] text-[16px] leading-[1.45] md:mt-[80px] md:text-[18px]">
            {p.body.split(/\n\s*\n/).map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          {p.details.length > 0 && (
            <dl className="mt-[30px] space-y-[8px] text-[16px]">
              {p.details.map((d) => (
                <div key={d.label}>
                  <dt className="inline text-muted">{d.label}: </dt>
                  <dd className="inline">{d.text}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
      {p.photos.length > 0 && (
        <section className="mt-[40px] md:mt-[14px]" aria-label={hasFullGallery ? "Restoration highlights" : "Project photos"}>
          {hasFullGallery && (
            <div className="mb-[30px] border-t border-line pt-[30px]">
              <h2 className="font-serif text-[28px] font-bold">Restoration highlights</h2>
              <p className="mb-[20px] mt-[12px] text-[16px] text-muted">{photos.length} highlights from purchase day to fresh paint. Explore all {p.photos.length} photos in the full gallery.</p>
              {galleryLink}
            </div>
          )}
          <ProjectPhotoGrid photos={photos} title={p.title} />
          {hasFullGallery && <div className="mt-[36px] text-center">{galleryLink}</div>}
        </section>
      )}
    </article>
  );
}
