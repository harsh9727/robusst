import type { Metadata, Viewport } from "next";
import "~/styles/globals.css";

import { Analytics } from "@vercel/analytics/next";
import { organizationJsonLd, websiteJsonLd } from "./[locale]/metadata";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://robusst.com";

// ─── Viewport ────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1323" },
  ],
};

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: "Robusst — AI-Powered Telecom & Banking Solutions",
    template: "%s | Robusst",
  },

  description:
    "Robusst helps telecom & banking enterprises monetize AI, optimize networks, reduce revenue leakage, and accelerate digital transformation with intelligent, scalable solutions.",

  keywords: [
    "Telecom AI Solutions",
    "Banking Digital Transformation",
    "Communication Service Provider",
    "Network Monetization",
    "Branded Calling",
    "Anti-SPAM Solutions",
    "Customer Data Platform",
    "Cyber Security for Telecom",
    "AI Call Center",
    "VoiceSync Enterprise",
    "Revenue Assurance",
    "Intelligent NOC",
    "Sales Tracking",
    "Distributor Management",
    "CSP Digital Transformation",
    "5G Network Solutions",
    "Telecom Revenue Leakage",
  ],

  authors: [{ name: "Robusst Team" }],
  creator: "Robusst",
  publisher: "Robusst",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Robusst",
    title: "Robusst — AI-Powered Telecom & Banking Solutions",
    description:
      "Helping telecom & banking enterprises monetize AI, optimize networks, and accelerate digital transformation with intelligent, scalable solutions.",
    images: [
      {
        url: `${baseUrl}/opengraph-image.webp`,
        width: 1200,
        height: 630,
        alt: "Robusst — AI-Powered Telecom & Banking Solutions",
        type: "image/webp",
      },
    ],
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    site: "@robusst",
    creator: "@robusst",
    title: "Robusst — AI-Powered Telecom & Banking Solutions",
    description:
      "Helping telecom & banking enterprises monetize AI, optimize networks, and accelerate digital transformation.",
    images: [
      {
        url: `${baseUrl}/opengraph-image.webp`,
        width: 1200,
        height: 630,
        alt: "Robusst — AI-Powered Telecom & Banking Solutions",
      },
    ],
  },

  // Crawler directives
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-16.webp", sizes: "16x16", type: "image/webp" },
      { url: "/favicon-32.webp", sizes: "32x32", type: "image/webp" },
      { url: "/favicon-48.webp", sizes: "48x48", type: "image/webp" },
    ],
    apple: "/favicon-48.webp",
  },

  // PWA manifest
  manifest: "/manifest.json",

  // Canonical for root — child pages override via their own generateMetadata
  alternates: {
    canonical: baseUrl,
  },

  category: "Technology",

  other: {
    "og:site_name": "Robusst",
    "article:publisher": "https://www.linkedin.com/company/robusst",
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        {/* llms.txt discovery — AI crawlers find this like RSS feed links */}
        <link
          rel="llms"
          type="text/plain"
          href={`${baseUrl}/llms.txt`}
          title="LLM-readable site index"
        />
      </head>
      <body>
        {/* Organization Schema — helps LLMs and search engines understand the business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        {/* Website Schema — enables sitelinks search box in Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />

        {/* Skip-to-content link — WCAG 2.1 AA keyboard accessibility requirement */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-md focus:outline-none"
        >
          Skip to main content
        </a>

        <Analytics />
        {children}
      </body>
    </html>
  );
}
