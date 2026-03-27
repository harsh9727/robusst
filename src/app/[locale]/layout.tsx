import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "~/i18n/routing";
import { Analytics } from "@vercel/analytics/next";

import "~/styles/globals.css";
import type { Locale } from "~/i18n/config";

import { geist } from "~/utils/fonts";
import { organizationJsonLd, websiteJsonLd } from "~/app/[locale]/metadata";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";

// RTL locales
const RTL_LOCALES: string[] = ["ar"];

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering for this locale
  setRequestLocale(locale);

  // Providing all messages to the client side
  const messages = await getMessages();

  const dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={geist.variable}
    >
      <head>
        {/* llms.txt discovery — AI crawlers find this like RSS feed links */}
        <link
          rel="llms"
          type="text/plain"
          href={`${baseUrl}/llms.txt`}
          title="LLM-readable site index"
        />

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
      </head>
      <body>
        {/* Skip-to-content link — WCAG 2.1 AA keyboard accessibility requirement */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-md focus:outline-none"
        >
          Skip to main content
        </a>

        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>

        <Analytics />
      </body>
    </html>
  );
}
