import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { routing } from "~/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
import "~/styles/globals.css";
import type { Locale } from "~/i18n/config";
import { geist } from "~/utils/fonts";
import { getDiscoveryContent } from "~/sanity/queries/discovery";
import { getSiteSettings } from "~/sanity/queries/siteSettings";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";

// RTL locales
const RTL_LOCALES: string[] = ["ar"];

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
  const [messages, siteSettings, discovery] = await Promise.all([
    getMessages(),
    getSiteSettings(locale),
    getDiscoveryContent(locale),
  ]);
  if (
    !siteSettings ||
    !discovery.site ||
    !siteSettings.llmsLinkTitle ||
    !siteSettings.contactPointType
  ) {
    throw new Error(`Missing published Sanity site settings for ${locale}`);
  }
  const dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
  const { isEnabled: isDraftMode } = await draftMode();
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: discovery.site.siteName,
    url: baseUrl,
    logo: discovery.site.logo
      ? { "@type": "ImageObject", url: discovery.site.logo }
      : undefined,
    description: discovery.site.organizationDescription,
    areaServed: discovery.home?.presence.labels?.map((name) => ({
      "@type": "Place",
      name,
    })),
    knowsAbout: [
      ...(discovery.site.defaultSeo.keywords ?? []),
      ...(discovery.solutions?.items ?? []).map((item) => item.title),
    ],
    member: discovery.customers.map((name) => ({
      "@type": "Organization",
      name,
    })),
    sameAs: discovery.site.socialLinks?.map((link) => link.href),
    contactPoint: discovery.site.contactEmail
      ? {
          "@type": "ContactPoint",
          contactType: siteSettings.contactPointType,
          url: `${baseUrl}/${locale}/contact`,
          email: discovery.site.contactEmail,
          availableLanguage: [...routing.locales],
        }
      : undefined,
    hasOfferCatalog: discovery.solutions
      ? {
          "@type": "OfferCatalog",
          name: discovery.solutions.heading,
          itemListElement: discovery.solutions.items?.map((item) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "SoftwareApplication",
              name: item.title,
              description: item.description,
              url: `${baseUrl}/${locale}${item.href}`,
              applicationCategory: "BusinessApplication",
            },
          })),
        }
      : undefined,
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: discovery.site.siteName,
    url: `${baseUrl}/${locale}`,
    description: discovery.site.defaultSeo.description,
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: discovery.site.siteName,
      logo: discovery.site.logo
        ? { "@type": "ImageObject", url: discovery.site.logo }
        : undefined,
    },
  };

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
          title={siteSettings.llmsLinkTitle}
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
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
