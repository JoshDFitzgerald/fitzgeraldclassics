import BlogList from "@/components/BlogList";
import { getPage, getPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type BlogPage = { seoTitle: string; seoDescription: string; heading: string };
const page = () => getPage<BlogPage>("blog");

export function generateMetadata() {
  const p = page();
  return buildMetadata({ title: p.seoTitle, description: p.seoDescription, path: "/blog" });
}

export default function BlogPage() {
  return <BlogList heading={page().heading} posts={getPosts()} />;
}
