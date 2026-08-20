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
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://assets.calendly.com https://platform.linkedin.com https://snap.licdn.com https://us-assets.i.posthog.com",
      "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://platform.linkedin.com https://snap.licdn.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      "frame-src 'self' http://localhost:* https://*.vercel.app https://www.robusst.com https://staging.robusst.com https://calendly.com https://js.stripe.com https://www.youtube.com https://youtube.com https://www.linkedin.com https://lnkd.in",
      "connect-src 'self' https://*.api.sanity.io wss://*.api.sanity.io https://*.sanity.io https://cdn.sanity.io https://us.i.posthog.com https://us-assets.i.posthog.com https://api.stripe.com https://ingest.robusst.com https://www.linkedin.com https://snap.licdn.com",
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
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

// ─── Cache Tag Header Helper ──────────────────────────────────────────────────
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
  compress: true,
  productionBrowserSourceMaps: true,

  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  experimental: {
    optimizeCss: true,

    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "react-icons",
      "recharts",
      "swiper",
    ],

    ppr: false,

    // ── Reduce build concurrency ──────────────────────────────────
    // Limits static generation to 2 parallel workers instead of the default 11.
    // Prevents hammering the CMS server (simple-cms-silk.vercel.app) with
    // simultaneous requests during build, which causes ECONNRESET / fetch failed
    // errors across locales (ru, ar, es, fr, etc.).
    workerThreads: false,
    cpus: 2,
  },

  // ─── Security Headers + Vercel CDN Cache Tags ──────────────────────────────
  async headers() {
    const locales = ["en", "fr", "ru", "pt", "es", "ar"];

    const cmsTagHeaders = [];

    for (const locale of locales) {
      cmsTagHeaders.push(...cmsTagEntries(`/${locale}`, `cms-home-${locale}`));
      cmsTagHeaders.push(
        ...cmsTagEntries(`/${locale}/about`, `cms-aboutPage-${locale}`),
      );
      cmsTagHeaders.push(
        ...cmsTagEntries(`/${locale}/contact`, `cms-contact-${locale}`),
      );
      cmsTagHeaders.push(
        ...cmsTagEntries(`/${locale}/partnership`, `cms-partnership-${locale}`),
      );
      cmsTagHeaders.push(
        ...cmsTagEntries(`/${locale}/platforms`, `cms-platforms-${locale}`),
      );
      cmsTagHeaders.push(
        ...cmsTagEntries(`/${locale}/careers`, `cms-careers-${locale}`),
      );
      cmsTagHeaders.push(
        ...cmsTagEntries(
          `/${locale}/poc_waitlist`,
          `cms-pocWaitlist-${locale}`,
        ),
      );
      cmsTagHeaders.push(
        ...cmsTagEntries(`/${locale}/solutions`, `cms-solutionsPage-${locale}`),
      );
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
      cmsTagHeaders.push(
        ...cmsTagEntries(`/${locale}/stories`, `cms-storyPage-${locale}`),
      );
      cmsTagHeaders.push(
        ...cmsTagEntries(`/${locale}/blogs`, `cms-blog-list-${locale}`),
      );

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

    return [{ source: "/(.*)", headers: securityHeaders }, ...cmsTagHeaders];
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

  // ─── 301 Redirects ──────────────────────────────────────────────────────────
  async redirects() {
    return [
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
