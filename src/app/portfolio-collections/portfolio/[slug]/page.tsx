import Image from "next/image";
import { notFound } from "next/navigation";
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
        <div className="mt-[40px] grid gap-x-[14px] gap-y-[32px] md:mt-[14px] md:gap-y-[20px] md:grid-cols-2">
          {p.photos.map((photo) => (
            <figure key={photo.image}>
              <div className="relative md:aspect-[3/4]">
                <Image
                  src={photo.image}
                  alt={photo.title || p.title}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-auto w-full md:absolute md:inset-0 md:h-full md:object-cover"
                />
              </div>
              {(photo.title || photo.caption) && (
                <figcaption className="pt-[14px]">
                  {photo.title && <p className="text-[16px] md:font-serif md:text-[16px] md:font-bold">{photo.title}</p>}
                  {photo.caption && <p className="mt-[14px] text-[14px] leading-[1.45] md:mt-[18px] md:text-[13px]">{photo.caption}</p>}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </article>
  );
}
