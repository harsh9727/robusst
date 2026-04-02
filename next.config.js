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

// ─── Cache Tag Header Helper ──────────────────────────────────────────────────
// Generates headers for all three request variants Next.js App Router produces
// for every page:
//   1. /path          → HTML (full page navigation)
//   2. /path.rsc      → RSC payload (client-side navigation)
//   3. /path.segments/:path* → Segment prefetch (PPR / segment prefetching)
//
// All three must carry the Vercel-Cache-Tag so that invalidate-by-tags hits
// every cached entry for that page, not just the HTML entry.
/**
 * @param {string} source
 * @param {string} tag
 */
function cmsTagEntries(source, tag) {
  const header = [{ key: "Vercel-Cache-Tag", value: tag }];
  return [
    { source, headers: header },
    { source: `${source}.rsc`, headers: header },
    { source: `${source}.segments/:path*`, headers: header },
  ];
}

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
    // Each call to cmsTagEntries() produces THREE header rules per page:
    //   • /locale/path          (HTML)
    //   • /locale/path.rsc      (RSC payload for client-side nav)
    //   • /locale/path.segments/:path* (segment prefetch)
    //
    // Without all three, Vercel CDN caches RSC / segment responses untagged,
    // so invalidate-by-tags never purges them and users keep seeing stale content.
    const cmsTagHeaders = [];

    for (const locale of locales) {
      // Home
      cmsTagHeaders.push(...cmsTagEntries(`/${locale}`, `cms-home-${locale}`));

      // About
      cmsTagHeaders.push(
        ...cmsTagEntries(`/${locale}/about`, `cms-aboutPage-${locale}`),
      );

      // Contact
      cmsTagHeaders.push(
        ...cmsTagEntries(`/${locale}/contact`, `cms-contact-${locale}`),
      );

      // Partnership
      cmsTagHeaders.push(
        ...cmsTagEntries(`/${locale}/partnership`, `cms-partnership-${locale}`),
      );

      // Platforms
      cmsTagHeaders.push(
        ...cmsTagEntries(`/${locale}/platforms`, `cms-platforms-${locale}`),
      );

      // Careers
      cmsTagHeaders.push(
        ...cmsTagEntries(`/${locale}/careers`, `cms-careers-${locale}`),
      );

      // POC Waitlist
      cmsTagHeaders.push(
        ...cmsTagEntries(
          `/${locale}/poc_waitlist`,
          `cms-pocWaitlist-${locale}`,
        ),
      );

      // Solutions index
      cmsTagHeaders.push(
        ...cmsTagEntries(`/${locale}/solutions`, `cms-solutionsPage-${locale}`),
      );

      // Solutions sub-pages
      cmsTagHeaders.push(
        ...cmsTagEntries(
          `/${locale}/solutions/ai-call-center`,
          `cms-aiCall-${locale}`,
        ),
      );
      cmsTagHeaders.push(
        ...cmsTagEntries(
          `/${locale}/solutions/branded-calling`,
          `cms-brand-${locale}`,
        ),
      );
      cmsTagHeaders.push(
        ...cmsTagEntries(
          `/${locale}/solutions/customer-data-platform`,
          `cms-cdp-${locale}`,
        ),
      );
      cmsTagHeaders.push(
        ...cmsTagEntries(
          `/${locale}/solutions/customized-solutions`,
          `cms-customizeSolution-${locale}`,
        ),
      );
      cmsTagHeaders.push(
        ...cmsTagEntries(
          `/${locale}/solutions/cybersecurity`,
          `cms-cybersecurity-${locale}`,
        ),
      );
      cmsTagHeaders.push(
        ...cmsTagEntries(
          `/${locale}/solutions/intelligent-noc`,
          `cms-noc-${locale}`,
        ),
      );
      cmsTagHeaders.push(
        ...cmsTagEntries(
          `/${locale}/solutions/network-monetization`,
          `cms-networkMonetization-${locale}`,
        ),
      );
      cmsTagHeaders.push(
        ...cmsTagEntries(
          `/${locale}/solutions/sts-dms`,
          `cms-stsAndDms-${locale}`,
        ),
      );

      // Stories
      cmsTagHeaders.push(
        ...cmsTagEntries(`/${locale}/stories`, `cms-storyPage-${locale}`),
      );

      // Blogs list
      cmsTagHeaders.push(
        ...cmsTagEntries(`/${locale}/blogs`, `cms-blog-list-${locale}`),
      );

      // Blog posts (wildcard — tags every post under this locale)
      cmsTagHeaders.push(
        {
          source: `/${locale}/blogs/:slug`,
          headers: [
            { key: "Vercel-Cache-Tag", value: `cms-blog-list-${locale}` },
          ],
        },
        {
          source: `/${locale}/blogs/:slug.rsc`,
          headers: [
            { key: "Vercel-Cache-Tag", value: `cms-blog-list-${locale}` },
          ],
        },
        {
          source: `/${locale}/blogs/:slug.segments/:path*`,
          headers: [
            { key: "Vercel-Cache-Tag", value: `cms-blog-list-${locale}` },
          ],
        },
      );
    }

    return [
      // Security headers applied to every route
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // CMS cache tags applied per page/locale (HTML + RSC + segments)
      ...cmsTagHeaders,
    ];
  },

  // ─── PostHog Reverse-Proxy Rewrites ─────────────────────────────────────────
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
