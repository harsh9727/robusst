/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://robusst.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,

  exclude: [
    "/api/*",
    "*/dashboard",
    "*/dashboard/*",
    "/*/login",
    "/*/poc_waitlist",
  ],

  // Transform: priorities per route type + locale-aware alternateRefs
  transform: async (config, path) => {
    const locales = ["en", "fr", "ru", "pt", "es", "ar"];
    const localeMatch = path.match(/^\/(en|fr|ru|pt|es|ar)(\/.*)?$/);

    if (!localeMatch) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.5,
        lastmod: new Date().toISOString(),
      };
    }

    const route = localeMatch[2] || "";

    // Homepage
    if (route === "") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
        alternateRefs: locales.map((l) => ({
          href: `${config.siteUrl}/${l}`,
          hreflang: l,
        })),
      };
    }

    // Top-level marketing pages: about, contact, partnership, careers
    if (["/about", "/contact", "/partnership", "/careers"].includes(route)) {
      return {
        loc: path,
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
        alternateRefs: locales.map((l) => ({
          href: `${config.siteUrl}/${l}${route}`,
          hreflang: l,
        })),
      };
    }

    // Solutions overview, platforms, stories listing
    if (["/solutions", "/platforms", "/stories"].includes(route)) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
        alternateRefs: locales.map((l) => ({
          href: `${config.siteUrl}/${l}${route}`,
          hreflang: l,
        })),
      };
    }

    // Individual solution pages — highest SEO value
    if (route.startsWith("/solutions/")) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.95,
        lastmod: new Date().toISOString(),
        alternateRefs: locales.map((l) => ({
          href: `${config.siteUrl}/${l}${route}`,
          hreflang: l,
        })),
      };
    }

    // Success stories (individual slugs) — great for LLM/AI crawlers
    if (route.startsWith("/stories/")) {
      return {
        loc: path,
        changefreq: "monthly",
        priority: 0.85,
        lastmod: new Date().toISOString(),
        alternateRefs: locales.map((l) => ({
          href: `${config.siteUrl}/${l}${route}`,
          hreflang: l,
        })),
      };
    }

    // Default fallback
    return {
      loc: path,
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: locales.map((l) => ({
        href: `${config.siteUrl}/${l}${route}`,
        hreflang: l,
      })),
    };
  },

  additionalPaths: async (config) => {
    const locales = ["en", "fr", "ru", "pt", "es", "ar"];
    const routes = [
      "",
      "/platforms",
      "/stories",
      "/about",
      "/careers",
      "/contact",
      "/partnership",
      "/solutions",
      "/solutions/ai-call-center",
      "/solutions/branded-calling",
      "/solutions/customer-data-platform",
      "/solutions/customized-solutions",
      "/solutions/cybersecurity",
      "/solutions/intelligent-noc",
      "/solutions/network-monetization",
      "/solutions/sts-dms",
    ];

    const paths = [];
    for (const locale of locales) {
      for (const route of routes) {
        paths.push({
          loc: `${config.siteUrl}/${locale}${route}`,
          changefreq:
            route === ""
              ? "daily"
              : route.startsWith("/solutions/")
                ? "weekly"
                : "weekly",
          priority:
            route === ""
              ? 1.0
              : route.startsWith("/solutions/")
                ? 0.95
                : ["/solutions", "/platforms", "/stories"].includes(route)
                  ? 0.9
                  : 0.8,
          lastmod: new Date().toISOString(),
          alternateRefs: locales.map((l) => ({
            href: `${config.siteUrl}/${l}${route}`,
            hreflang: l,
          })),
        });
      }
    }
    return paths;
  },

  robotsTxtOptions: {
    policies: [
      // Standard crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/*/dashboard", "/*/login", "/*/poc_waitlist"],
      },
      // OpenAI
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      // Anthropic Claude
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      // Google AI (Gemini)
      { userAgent: "Google-Extended", allow: "/" },
      // Perplexity
      { userAgent: "PerplexityBot", allow: "/" },
      // Common Crawl (used by many AI training datasets)
      { userAgent: "CCBot", allow: "/" },
      // Apple Intelligence
      { userAgent: "Applebot-Extended", allow: "/" },
      // Cohere
      { userAgent: "cohere-ai", allow: "/" },
      // Meta AI
      { userAgent: "FacebookBot", allow: "/" },
      // Microsoft Bing AI / Copilot
      { userAgent: "bingbot", allow: "/" },
      // Amazon Alexa
      { userAgent: "Amazonbot", allow: "/" },
    ],
    additionalSitemaps: ["https://robusst.com/sitemap.xml"],
  },
};
