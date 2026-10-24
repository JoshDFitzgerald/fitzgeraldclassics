import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/content";
import AuthorLine from "./AuthorLine";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.slug}`} className="group flex flex-col border border-white/10 bg-[#111] transition-colors hover:border-gold/60">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={post.coverImage} alt={post.coverAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col px-[24px] pb-[28px] pt-[20px]">
        <AuthorLine post={post} small />
        <h2 className="mt-[14px] line-clamp-3 font-serif text-[22px] font-bold leading-[1.35] group-hover:text-gold">{post.title}</h2>
        <p className="mt-[10px] line-clamp-3 text-[14px] leading-[1.5]">{post.excerpt}</p>
      </div>
    </Link>
  );
}
