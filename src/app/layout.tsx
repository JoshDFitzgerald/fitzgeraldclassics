import type { Metadata } from "next";
import type { CSSProperties } from "react";
import localFont from "next/font/local";
import { siteConfig } from "@site-config";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AskFitz from "@/components/AskFitz";
import "./globals.css";

// Font files are stored in the repo (src/fonts) so the site builds without internet access.
const libreCaslon = localFont({
  variable: "--font-libre-caslon",
  src: [
    { path: "../fonts/libre-caslon-text-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/libre-caslon-text-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

const inter = localFont({
  variable: "--font-inter",
  src: "../fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.defaultDescription,
  verification: { google: siteConfig.googleSiteVerification },
  alternates: { types: { "application/rss+xml": "/blog-feed.xml" } },
};

const { colors } = siteConfig;
const themeVars = {
  "--c-background": colors.background,
  "--c-surface": colors.surface,
  "--c-line": colors.line,
  "--c-muted": colors.muted,
  "--c-text": colors.text,
  "--c-gold": colors.gold,
  "--c-rust": colors.rust,
} as CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" style={themeVars} className={`${libreCaslon.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 pt-[48px] md:pt-[58px]">{children}</main>
        <SiteFooter />
        <AskFitz />
      </body>
    </html>
  );
}
