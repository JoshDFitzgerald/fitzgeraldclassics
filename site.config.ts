// Site-wide settings. Edit this file to change the business name, menu,
// footer text, social links, affiliate IDs, or the site's colors.

export const siteConfig = {
  name: "Fitzgerald Classics",
  tagline: "Preserving Americana, one car at a time.",
  mission: "Education first. Commerce supports the mission.",
  url: "https://www.fitzgeraldclassics.com",

  // Used when a page doesn't set its own description or share image.
  defaultDescription:
    "Fitzgerald Classics brings classic car restoration to life with stories, how-tos, and gear from our online hub for enthusiasts across the United States.",
  defaultShareImage: "/images/site/home-hero-1966-corvette-garage.png",

  logo: {
    image: "/images/site/logo-fitzgerald-classics-route-66.webp",
    alt: "Fitzgerald Classics logo featuring Route 66 and two classic American cars",
  },

  // The slide-out menu, top to bottom.
  nav: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact" },
    { label: "Trusted Partners", href: "/trusted-partners" },
    { label: "eBay eCommerce", href: "/ebay-ecommerce" },
    { label: "The Garage", href: "/fitzgerald-classics-garage" },
    { label: "Vintage Parts", href: "/vintage-hard-to-find-parts" },
    { label: "How-To Videos", href: "/how-to-videos" },
  ],

  social: {
    facebook: "https://www.facebook.com/profile.php?id=61594520112307",
    instagram: "https://instagram.com/fitzgeraldclassics",
  },

  // "{year}" is replaced with the current year.
  copyright:
    "© {year} Fitzgerald Classics. Veteran Owned. 10% of merchandise and eBay profits support Tunnel to Towers Foundation. As an Amazon Associate, Fitzgerald Classics earns from qualifying purchases.",

  affiliates: {
    amazonTag: "fitzgeraldcla-20",
    ebayCampaignId: "5339219494",
  },

  // Link to all of Fitzgerald Classics' listings, below the individual item cards.
  ebayStoreUrl: "https://www.ebay.com/sch/i.html?_ssn=fitzgerald-classics",

  // The "Ask Fitz" button in the corner of every page.
  askFitz: {
    label: "Ask Fitz",
    teaser: "Have a question about your classic car?",
    greeting:
      "Welcome to Fitzgerald Classics. I’m Fitz, your classic car restoration assistant. What are you working on today?",
  },

  googleSiteVerification: "vj-8FEwO3GEryTsRNbFFo6UxjWj6YL2Z2HaHuZWjeiU",

  colors: {
    background: "#0A0A0A", // page background
    surface: "#1A1A1A", // cards and alternate sections
    line: "#383838", // subtle borders
    muted: "#B8B8B0", // secondary text
    text: "#F5F5F0", // main text and headings
    gold: "#C5A059", // accent: buttons, menu, highlights
    rust: "#7A2F23", // buttons inside blog articles
  },
};

export type SiteConfig = typeof siteConfig;
