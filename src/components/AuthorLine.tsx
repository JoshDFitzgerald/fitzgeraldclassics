import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/format";

// "D  Dan Fitzgerald · Oct 16, 2026 · 14 min read"
export default function AuthorLine({ post, small = false }: { post: Post; small?: boolean }) {
  return (
    <div className={`flex items-center gap-[10px] ${small ? "text-[12px]" : "text-[14px]"}`}>
      <span className={`flex shrink-0 items-center justify-center rounded-full bg-gold font-medium text-ink ${small ? "h-[28px] w-[28px] text-[13px]" : "h-[32px] w-[32px] text-[15px]"}`}>
        {post.author.charAt(0)}
      </span>
      <span className={small ? "leading-[1.4]" : ""}>
        {post.author}
        {small ? <br /> : " · "}
        {formatDate(post.date)} · {post.minutesToRead} min read
      </span>
    </div>
  );
}
