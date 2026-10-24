import { siteConfig } from "@site-config";
import { getPosts } from "@/lib/content";

// RSS feed for blog subscribers (same address as the old site).
export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = getPosts()
    .map((p) => {
      const link = `${siteConfig.url}/post/${p.slug}`;
      return `<item><title>${esc(p.title)}</title><link>${link}</link><guid>${link}</guid><pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate><dc:creator>${esc(p.author)}</dc:creator><description>${esc(p.excerpt)}</description><enclosure url="${siteConfig.url}${encodeURI(p.coverImage)}" length="0" type="image/${p.coverImage.split(".").pop()?.replace("jpg", "jpeg")}"/></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><title>${esc(siteConfig.name)}</title><link>${siteConfig.url}/blog</link><description>${esc(siteConfig.tagline)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
