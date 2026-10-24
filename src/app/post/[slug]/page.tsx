import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@site-config";
import AuthorLine from "@/components/AuthorLine";
import BlogTabs from "@/components/BlogTabs";
import PostCard from "@/components/PostCard";
import { getPost, getPosts } from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

async function load(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  return getPost(slug);
}

export async function generateMetadata({ params }: PageProps<"/post/[slug]">) {
  const p = await load(params);
  if (!p) return {};
  return buildMetadata({ title: p.seoTitle || p.title, description: p.seoDescription || p.excerpt, path: `/post/${p.slug}`, image: p.coverImage, type: "article" });
}

export default async function PostPage({ params }: PageProps<"/post/[slug]">) {
  const post = await load(params);
  if (!post) notFound();
  const url = `${siteConfig.url}/post/${post.slug}`;
  const recent = getPosts().filter((p) => p.slug !== post.slug).slice(0, 3);
  const share = [
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, icon: "M14 8h3V4h-3c-2.8 0-4 1.8-4 4.5V11H7v4h3v9h4v-9h3l1-4h-4V8.8c0-.5.3-.8 1-.8z" },
    { label: "Share on X", href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`, icon: "M4 4l7.2 9.6L4.3 20H6l6-5.4L16.4 20H20l-7.5-10L19 4h-1.7l-5.6 5L8 4H4z" },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, icon: "M5 9h3v11H5V9zm1.5-5A1.7 1.7 0 1 1 6.5 7.5 1.7 1.7 0 0 1 6.5 4zM10 9h3v1.6c.5-.9 1.6-1.8 3.3-1.8 3.4 0 3.7 2.2 3.7 5V20h-3v-5.4c0-1.3 0-3-1.8-3s-2.2 1.4-2.2 2.9V20h-3V9z" },
  ];
  return (
    <div className="mx-auto max-w-[980px] px-[20px] pb-[80px] pt-[32px] md:pt-[38px]">
      <div className="hidden md:block">
        <BlogTabs />
      </div>
      <article className="md:mt-[40px] md:border md:border-white/10 md:px-[100px] md:pb-[60px] md:pt-[60px]">
        <AuthorLine post={post} />
        <h1 className="mt-[20px] font-serif text-[26px] font-bold leading-[1.4] md:text-[40px]">{post.title}</h1>
        <div className="prose-article mt-[28px]" dangerouslySetInnerHTML={{ __html: markdownToHtml(post.body) }} />
        <div className="mt-[48px] flex items-center gap-[24px] border-t border-white/15 pt-[20px]">
          {share.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-cream hover:text-gold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={s.icon} />
              </svg>
            </a>
          ))}
        </div>
      </article>
      {recent.length > 0 && (
        <section className="mt-[48px]">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[20px]">Recent Posts</h2>
            <Link href="/blog" className="text-[14px] hover:text-gold">
              See All
            </Link>
          </div>
          <div className="mt-[20px] grid gap-[24px] md:grid-cols-3 md:gap-[32px]">
            {recent.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
