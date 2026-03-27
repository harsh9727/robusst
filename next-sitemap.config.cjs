/** @type {import('next-sitemap').IConfig} */

const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];

const ROUTES = [
  { path: "", changefreq: "daily", priority: 1.0 },
  { path: "/platforms", changefreq: "weekly", priority: 0.9 },
  { path: "/stories", changefreq: "weekly", priority: 0.9 },
  { path: "/solutions", changefreq: "weekly", priority: 0.9 },
  { path: "/about", changefreq: "monthly", priority: 0.8 },
  { path: "/careers", changefreq: "monthly", priority: 0.8 },
  { path: "/contact", changefreq: "monthly", priority: 0.8 },
  { path: "/partnership", changefreq: "monthly", priority: 0.8 },
  { path: "/solutions/ai-call-center", changefreq: "weekly", priority: 0.95 },
  { path: "/solutions/branded-calling", changefreq: "weekly", priority: 0.95 },
  {
    path: "/solutions/customer-data-platform",
    changefreq: "weekly",
    priority: 0.95,
  },
  {
    path: "/solutions/customized-solutions",
    changefreq: "weekly",
    priority: 0.95,
  },
  { path: "/solutions/cybersecurity", changefreq: "weekly", priority: 0.95 },
  { path: "/solutions/intelligent-noc", changefreq: "weekly", priority: 0.95 },
  {
    path: "/solutions/network-monetization",
    changefreq: "weekly",
    priority: 0.95,
  },
  { path: "/solutions/sts-dms", changefreq: "weekly", priority: 0.95 },
];

module.exports = {
  siteUrl: "https://www.robusst.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,

  // Disable auto-crawl (all routes are dynamic/SSR, nothing to crawl)
  sourceDir: ".next",
  outDir: "public",

  exclude: ["/**"], // exclude everything from auto-crawl, use additionalPaths only

  additionalPaths: async (config) => {
    const paths = [
      {
        loc: "/llms.txt",
        changefreq: "weekly",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      },
    ];

    for (const locale of LOCALES) {
      for (const { path: route, changefreq, priority } of ROUTES) {
        paths.push({
          loc: `${config.siteUrl}/${locale}${route}`,
          changefreq,
          priority,
          lastmod: new Date().toISOString(),
          alternateRefs: [
            // Per-locale hreflang entries
            ...LOCALES.map((l) => ({
              href: `${config.siteUrl}/${l}${route}`,
              hreflang: l,
              hrefIsAbsolute: true,
            })),
            // x-default always points to the English version (§4.2 fix)
            {
              href: `${config.siteUrl}/en${route}`,
              hreflang: "x-default",
              hrefIsAbsolute: true,
            },
          ],
        });
      }
    }

    return paths;
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        // Removed "/*/poc_waitlist" — Bingbot was blocked from crawling it.
        // Use <meta name="robots" content="noindex"> on the page itself if
        // you want to keep it unindexed without blocking crawlers (§5.3 fix).
        disallow: ["/api/", "/*/dashboard", "/*/login"],
      },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "FacebookBot", allow: "/" },
      { userAgent: "bingbot", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
    ],
    additionalSitemaps: ["https://www.robusst.com/sitemap.xml"],
  },
};
