import Link from "next/link";
import { getBlogCategories } from "@/lib/content";

// Category menu shown above the blog list and articles.
export default function BlogTabs({ active }: { active?: string }) {
  const tabs = [{ href: "/blog", name: "All Posts", slug: undefined as string | undefined }, ...getBlogCategories().map((c) => ({ href: `/blog/categories/${c.slug}`, name: c.name, slug: c.slug }))];
  return (
    <nav aria-label="Blog categories" className="-mx-[20px] overflow-x-auto px-[20px]">
      <ul className="flex min-w-max gap-[28px] text-[14px] md:gap-[30px] md:text-[14px]">
        {tabs.map((t) => (
          <li key={t.href}>
            <Link href={t.href} className={t.slug === active ? "text-gold" : "text-cream hover:text-gold"}>
              {t.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
