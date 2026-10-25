import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectPhotoGrid from "@/components/ProjectPhotoGrid";
import { getProject, getProjects } from "@/lib/content";
import { projectPath } from "@/lib/projectPath";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().filter((p) => p.highlightImages?.length).map((p) => ({ slug: p.slug }));
}

async function load(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const project = getProject(decodeURIComponent(slug));
  return project?.highlightImages?.length ? project : undefined;
}

export async function generateMetadata({ params }: PageProps<"/portfolio-collections/portfolio/[slug]/gallery">) {
  const p = await load(params);
  if (!p) return {};
  return buildMetadata({
    title: `${p.title} — Full Restoration Gallery`,
    description: `All ${p.photos.length} photographs from the ${p.title} project, from purchase day through renovation and its return from the paint and body shop.`,
    path: `${projectPath(p.slug)}/gallery`,
    image: p.coverImage,
  });
}

export default async function ProjectGalleryPage({ params }: PageProps<"/portfolio-collections/portfolio/[slug]/gallery">) {
  const p = await load(params);
  if (!p) notFound();
  return (
    <article className="px-[20px] pb-[80px] pt-[40px] md:px-[14px] md:pb-[100px]">
      <header className="mb-[36px] md:px-[32px]">
        <Link href={projectPath(p.slug)} className="text-gold underline underline-offset-4">← Back to the project story</Link>
        <h1 className="mt-[24px] font-serif text-[34px] font-bold leading-[1.2] md:text-[48px]">Full restoration gallery</h1>
        <p className="mt-[16px] text-[20px] text-gold">{p.title}</p>
        <p className="mt-[12px] text-[16px] text-muted">All {p.photos.length} photos, with captions, from the restoration journey.</p>
      </header>
      <ProjectPhotoGrid photos={p.photos} title={p.title} />
      <div className="mt-[36px] text-center">
        <Link href={projectPath(p.slug)} className="inline-block bg-gold px-[27px] py-[14px] text-[16px] font-bold text-ink hover:bg-cream">Back to the project story</Link>
      </div>
    </article>
  );
}
