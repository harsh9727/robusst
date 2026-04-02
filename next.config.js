import "./src/env.js";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// ─── Security Headers ─────────────────────────────────────────────────────────

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://assets.calendly.com https://platform.linkedin.com https://us-assets.i.posthog.com",
      "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      "frame-src https://calendly.com https://js.stripe.com",
      "connect-src 'self' https://us.i.posthog.com https://us-assets.i.posthog.com https://api.stripe.com https://ingest.robusst.com",
      "media-src 'self' blob:",
      "worker-src 'self' blob:",
    ].join("; "),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

// ─── Next.js Config ───────────────────────────────────────────────────────────

/** @type {import("next").NextConfig} */
const config = {
  // Enable gzip / brotli compression
  compress: true,

  // Enable source maps in production (downloaded only by DevTools, not users)
  productionBrowserSourceMaps: true,

  // Image optimisation (remove unoptimized:true to let Next.js resize & compress)
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  experimental: {
    // Inline critical CSS and defer the rest (uses Critters under the hood)
    optimizeCss: true,

    // Tree-shake heavy packages at the import level
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "react-icons",
      "recharts",
      "swiper",
    ],
    ppr: false, // Disable PPR so revalidatePath works correctly for CMS-driven ISR
  },

  // ─── Security Headers + Vercel CDN Cache Tags ──────────────────────────────
  async headers() {
    const locales = ["en", "fr", "ru", "pt", "es", "ar"];

    // ── Vercel-Cache-Tag entries ─────────────────────────────────────────────
    // These tag each page's CDN cache entry so dangerouslyDeleteByTag() in
    // /api/revalidate can drop the Vercel CDN Cache (Layer 1) immediately on
    // a CMS publish event. Tag names must exactly match the `cms-{schema}-{locale}`
    // pattern used by cmsTag() in src/lib/cms/client.ts.
    //
    // Add a block here for each schema as it is migrated to CMS.
    const cmsTagHeaders = [];

    // Home pages
    for (const locale of locales) {
      cmsTagHeaders.push({
        source: `/${locale}`,
        headers: [{ key: "Vercel-Cache-Tag", value: `cms-home-${locale}` }],
      });
    }

    // About pages
    for (const locale of locales) {
      cmsTagHeaders.push({
        source: `/${locale}/about`,
        headers: [
          { key: "Vercel-Cache-Tag", value: `cms-aboutPage-${locale}` },
        ],
      });
    }

    // Contact pages
    for (const locale of locales) {
      cmsTagHeaders.push({
        source: `/${locale}/contact`,
        headers: [{ key: "Vercel-Cache-Tag", value: `cms-contact-${locale}` }],
      });
    }

    // Partnership pages
    for (const locale of locales) {
      cmsTagHeaders.push({
        source: `/${locale}/partnership`,
        headers: [
          { key: "Vercel-Cache-Tag", value: `cms-partnership-${locale}` },
        ],
      });
    }

    // Platforms pages
    for (const locale of locales) {
      cmsTagHeaders.push({
        source: `/${locale}/platforms`,
        headers: [
          { key: "Vercel-Cache-Tag", value: `cms-platforms-${locale}` },
        ],
      });
    }

    // Careers pages
    for (const locale of locales) {
      cmsTagHeaders.push({
        source: `/${locale}/careers`,
        headers: [{ key: "Vercel-Cache-Tag", value: `cms-careers-${locale}` }],
      });
    }

    // POC Waitlist pages
    for (const locale of locales) {
      cmsTagHeaders.push({
        source: `/${locale}/poc_waitlist`,
        headers: [
          { key: "Vercel-Cache-Tag", value: `cms-pocWaitlist-${locale}` },
        ],
      });
    }

    // Solutions index pages
    for (const locale of locales) {
      cmsTagHeaders.push({
        source: `/${locale}/solutions`,
        headers: [
          { key: "Vercel-Cache-Tag", value: `cms-solutionsPage-${locale}` },
        ],
      });
    }

    // Solutions sub-pages
    for (const locale of locales) {
      cmsTagHeaders.push({
        source: `/${locale}/solutions/ai-call-center`,
        headers: [{ key: "Vercel-Cache-Tag", value: `cms-aiCall-${locale}` }],
      });
      cmsTagHeaders.push({
        source: `/${locale}/solutions/branded-calling`,
        headers: [{ key: "Vercel-Cache-Tag", value: `cms-brand-${locale}` }],
      });
      cmsTagHeaders.push({
        source: `/${locale}/solutions/customer-data-platform`,
        headers: [{ key: "Vercel-Cache-Tag", value: `cms-cdp-${locale}` }],
      });
      cmsTagHeaders.push({
        source: `/${locale}/solutions/customized-solutions`,
        headers: [
          { key: "Vercel-Cache-Tag", value: `cms-customizeSolution-${locale}` },
        ],
      });
      cmsTagHeaders.push({
        source: `/${locale}/solutions/cybersecurity`,
        headers: [
          { key: "Vercel-Cache-Tag", value: `cms-cybersecurity-${locale}` },
        ],
      });
      cmsTagHeaders.push({
        source: `/${locale}/solutions/intelligent-noc`,
        headers: [{ key: "Vercel-Cache-Tag", value: `cms-noc-${locale}` }],
      });
      cmsTagHeaders.push({
        source: `/${locale}/solutions/network-monetization`,
        headers: [
          {
            key: "Vercel-Cache-Tag",
            value: `cms-networkMonetization-${locale}`,
          },
        ],
      });
      cmsTagHeaders.push({
        source: `/${locale}/solutions/sts-dms`,
        headers: [
          { key: "Vercel-Cache-Tag", value: `cms-stsAndDms-${locale}` },
        ],
      });
    }

    // Stories pages
    for (const locale of locales) {
      cmsTagHeaders.push({
        source: `/${locale}/stories`,
        headers: [
          { key: "Vercel-Cache-Tag", value: `cms-storyPage-${locale}` },
        ],
      });
    }

    return [
      // Security headers applied to every route
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // CMS cache tags applied per page/locale
      ...cmsTagHeaders,
    ];
  },

  // ─── PostHog Reverse-Proxy Rewrites ─────────────────────────────────────────
  // Proxying PostHog through our own domain improves cache TTL and avoids
  // ad-blocker false-positives.
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },

  // ─── 301 Redirects for Broken / Renamed URLs ────────────────────────────────
  async redirects() {
    return [
      // Success stories (renamed to /stories)
      {
        source: "/success-stories",
        destination: "/en/stories",
        permanent: true,
      },
      {
        source: "/en/success-stories",
        destination: "/en/stories",
        permanent: true,
      },

      // CDP (slug renamed)
      {
        source: "/solutions/cdp",
        destination: "/en/solutions/customer-data-platform",
        permanent: true,
      },
      {
        source: "/en/solutions/cdp",
        destination: "/en/solutions/customer-data-platform",
        permanent: true,
      },

      // Customized solutions (slug renamed)
      {
        source: "/solutions/customized",
        destination: "/en/solutions/customized-solutions",
        permanent: true,
      },
      {
        source: "/en/solutions/customized",
        destination: "/en/solutions/customized-solutions",
        permanent: true,
      },

      // Sales tracking → STS-DMS (renamed)
      {
        source: "/solutions/sales-tracking",
        destination: "/en/solutions/sts-dms",
        permanent: true,
      },
      {
        source: "/en/solutions/sales-tracking",
        destination: "/en/solutions/sts-dms",
        permanent: true,
      },

      // VoiceSync → STS-DMS (page removed/merged)
      {
        source: "/solutions/voicesync",
        destination: "/en/solutions/sts-dms",
        permanent: true,
      },
      {
        source: "/en/solutions/voicesync",
        destination: "/en/solutions/sts-dms",
        permanent: true,
      },

      // Cyber-security → cybersecurity (slug normalisation)
      {
        source: "/solutions/cyber-security",
        destination: "/en/solutions/cybersecurity",
        permanent: true,
      },
      {
        source: "/en/solutions/cyber-security",
        destination: "/en/solutions/cybersecurity",
        permanent: true,
      },

      {
        source:
          "/solutions/:path((?!.*\\.(?:webp|webm|mp4|svg|png|jpg|jpeg|gif|ico|css|js|woff|woff2|txt|xml|json)$).*)*",
        destination: "/en/solutions/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(config);
