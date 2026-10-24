import type { MetadataRoute } from "next";
import { siteConfig } from "@site-config";
import { getBlogCategories, getPosts, getProjects, getVideos } from "@/lib/content";
import { projectPath } from "@/lib/projectPath";

// Lists every page so search engines can find them. Updates automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => `${siteConfig.url}${encodeURI(p)}`;
  const pages = ["/", "/about-us", "/portfolio", "/blog", "/contact", "/trusted-partners", "/ebay-ecommerce", "/fitzgerald-classics-garage", "/vintage-hard-to-find-parts", "/how-to-videos"];
  return [
    ...pages.map((p) => ({ url: url(p) })),
    ...getPosts().map((p) => ({ url: url(`/post/${p.slug}`), lastModified: p.date })),
    ...getBlogCategories().map((c) => ({ url: url(`/blog/categories/${c.slug}`) })),
    ...getProjects().map((p) => ({ url: url(projectPath(p.slug)) })),
    ...getVideos().map((v) => ({ url: url(`/how-to-videos/${v.slug}`) })),
  ];
}
