import type { NextConfig } from "next";

// Old Wix addresses that moved. Everything else keeps its original address.
const redirects = [
  // The old eBay store page was combined into the Vintage Parts page.
  { source: "/ebay-ecommerce", destination: "/vintage-hard-to-find-parts" },
  { source: "/blank", destination: "/how-to-videos" },
  { source: "/blank-0cusaw", destination: "/" },
  { source: "/portfolio-collections/portfolio", destination: "/portfolio" },
  // Old Wix sitemaps
  ...["pages", "blog-posts", "blog-categories", "portfolio-projects", "portfolio-collections", "dynamic-how-to-videos_p_1xxbfwz_0_5000"].map((s) => ({
    source: `/${s}-sitemap.xml`,
    destination: "/sitemap.xml",
  })),
];

const nextConfig: NextConfig = {
  // The Ask Fitz chat endpoint reads the site content in /content at
  // request time; make sure those files travel with it when deployed.
  outputFileTracingIncludes: {
    "/api/ask-fitz": ["./content/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "/media/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return redirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
