import type { Post } from "@/lib/content";
import BlogTabs from "./BlogTabs";
import PostCard from "./PostCard";

export default function BlogList({ heading, description, posts, active }: { heading: string; description?: string; posts: Post[]; active?: string }) {
  return (
    <section className="mx-auto max-w-[1100px] px-[20px] pb-[80px] pt-[32px] md:pb-[120px] md:pt-[38px]">
      <BlogTabs active={active} />
      <h1 className="mt-[32px] text-[28px] font-semibold md:mt-[30px] md:text-[36px]">{heading}</h1>
      {description && <p className="mt-[8px] text-[16px]">{description}</p>}
      {posts.length === 0 ? (
        <p className="mt-[32px] text-muted">No posts in this category yet.</p>
      ) : (
        <div className="mt-[24px] grid gap-[24px] md:grid-cols-3 md:gap-[32px]">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </section>
  );
}
