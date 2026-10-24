import type { NextConfig } from "next";

// Old Wix addresses that moved. Everything else keeps its original address.
const redirects = [
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
