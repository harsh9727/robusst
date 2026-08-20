import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "~/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
import "~/styles/globals.css";
import type { Locale } from "~/i18n/config";
import { geist } from "~/utils/fonts";
import { organizationJsonLd, websiteJsonLd } from "~/app/[locale]/metadata";
import { getSiteSettings } from "~/sanity/queries/siteSettings";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";

// RTL locales
const RTL_LOCALES: string[] = ["ar"];

// All supported locales — used to generate hreflang link tags.
// hreflang tells Google which language/region variant of a page to serve
// and prevents duplicate content penalties across your 6 locale variants.
const SUPPORTED_LOCALES = ["en", "ar", "es", "fr", "pt", "ru"] as const;

// BCP-47 locale → ISO 3166 region mapping for hreflang values.
// Google requires full BCP-47 tags (e.g. "pt-BR") where region matters.
// For languages without a dominant single region, bare language codes are fine.
const HREFLANG_MAP: Record<string, string> = {
  en: "en",
  ar: "ar",
  es: "es",
  fr: "fr",
  pt: "pt-BR",
  ru: "ru",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// ISR: lock to static rendering; safety net for CMS-driven pages
export const dynamic = "force-static";
export const revalidate = 300; // 5-minute baseline (webhook is primary)

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const [messages, siteSettings] = await Promise.all([
    getMessages(),
    getSiteSettings(locale),
  ]);
  if (!siteSettings) {
    throw new Error(`Missing published Sanity site settings for ${locale}`);
  }
  const dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";

  // We use the pathname "/" for the layout-level hreflang tags (root alternates).
  // Individual pages that have their own generateMetadata should emit their own
  // hreflang alternates via Next.js metadata.alternates.languages — these layout
  // tags serve as a safe fallback for pages that don't override metadata.
  const currentPath = "/";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={geist.variable}
    >
      <head>
        {/*
         * llms.txt discovery link
         * AI crawlers (Anthropic, OpenAI, Perplexity) look for this like RSS autodiscovery.
         * The rel="llms" convention is emerging — keep it alongside the direct /llms.txt URL.
         */}
        <link
          rel="llms"
          type="text/plain"
          href={`${baseUrl}/llms.txt`}
          title="LLM-readable site index"
        />

        {/*
         * Hreflang alternate link tags
         * These tell Google which locale to serve for each language/region.
         * x-default points to the canonical English version as the fallback.
         * All variants must cross-reference each other (which this loop handles).
         */}
        {SUPPORTED_LOCALES.map((loc) => (
          <link
            key={loc}
            rel="alternate"
            hrefLang={HREFLANG_MAP[loc]}
            href={`${baseUrl}/${loc}${currentPath}`}
          />
        ))}
        {/* x-default: canonical fallback for users whose locale isn't explicitly listed */}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${baseUrl}/en${currentPath}`}
        />

        {/*
         * Organization Schema
         * Anchors Robusst as a business entity in Google's Knowledge Graph.
         * Also consumed by LLM crawlers for entity recognition.
         */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        {/*
         * WebSite Schema
         * Enables Google's Sitelinks Search Box in brand SERPs.
         */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body>
        {/* Skip-to-content — WCAG 2.1 AA keyboard accessibility requirement */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-md focus:outline-none"
        >
          {siteSettings.skipLinkLabel}
        </a>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
