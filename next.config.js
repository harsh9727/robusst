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
  },

  // ─── Security Headers ───────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
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

      // Catch-all: non-locale /solutions/* → /en/solutions/*
      // Placed AFTER the specific rules so they take priority
      {
        source: "/solutions/:path*",
        destination: "/en/solutions/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(config);
