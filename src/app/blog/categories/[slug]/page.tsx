import { notFound } from "next/navigation";
import BlogList from "@/components/BlogList";
import { getBlogCategories, getPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogCategories().map((c) => ({ slug: c.slug }));
}

async function load(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  return getBlogCategories().find((c) => c.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/blog/categories/[slug]">) {
  const c = await load(params);
  if (!c) return {};
  return buildMetadata({ title: c.name, description: c.description, path: `/blog/categories/${c.slug}` });
}

export default async function CategoryPage({ params }: PageProps<"/blog/categories/[slug]">) {
  const c = await load(params);
  if (!c) notFound();
  const posts = getPosts().filter((p) => p.categories.includes(c.name));
  return <BlogList heading={c.name} description={c.description} posts={posts} active={c.slug} />;
}
