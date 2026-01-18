/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://robusst-delta.vercel.app",
  generateRobotsTxt: true,
  exclude: [
    "/api/*",
    "*/dashboard",
    "*/dashboard/*",
    "/*/login", // Exclude login pages from sitemap
  ],

  // Define all supported locales
  alternateRefs: [
    { href: "https://robusst-delta.vercel.app/en", hreflang: "en" },
    { href: "https://robusst-delta.vercel.app/fr", hreflang: "fr" },
    { href: "https://robusst-delta.vercel.app/ru", hreflang: "ru" },
    { href: "https://robusst-delta.vercel.app/pt", hreflang: "pt" },
    { href: "https://robusst-delta.vercel.app/es", hreflang: "es" },
    { href: "https://robusst-delta.vercel.app/ar", hreflang: "ar" },
  ],

  // Additional paths to include that might not be auto-detected
  additionalPaths: async () => {
    const locales = ["en", "fr", "ru", "pt", "es", "ar"];
    const routes = [
      "", // home page
      "#",
      "/platforms",
      "/stories",
      "/brand",
    ];

    const paths = [];

    for (const locale of locales) {
      for (const route of routes) {
        paths.push({
          loc: `/${locale}${route}`,
          changefreq: "daily",
          priority: route === "" ? 1.0 : 0.7,
          lastmod: new Date().toISOString(),
          alternateRefs: locales.map((l) => ({
            href: `https://robusst-delta.vercel.app/${l}${route}`,
            hreflang: l,
          })),
        });
      }
    }

    return paths;
  },

  // Transform function to add alternate refs to auto-discovered pages
  transform: async (config, path) => {
    const locales = ["en", "fr", "ru", "pt", "es", "ar"];

    // Extract the route without locale prefix
    const localeMatch = path.match(/^\/(en|fr|ru|pt|es|ar)(\/.*)?$/);

    if (localeMatch) {
      const route = localeMatch[2] || "";

      return {
        loc: path,
        changefreq: "daily",
        priority: route === "" ? 1.0 : 0.7,
        lastmod: new Date().toISOString(),
        alternateRefs: locales.map((l) => ({
          href: `${config.siteUrl}/${l}${route}`,
          hreflang: l,
        })),
      };
    }

    // Default transformation for non-locale paths
    return {
      loc: path,
      changefreq: "daily",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "*/dashboard", "*/login"],
      },
    ],
    additionalSitemaps: ["https://robusst-delta.vercel.app/sitemap.xml"],
  },
};
