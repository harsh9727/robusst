import type { Metadata } from "next";

import { siteConfig } from "~/config";

interface Props {
  title:
    | string
    | {
        template: string;
        default: string;
      };
  description: string;
  /**
   * The path segment after the locale, e.g. "/" for the home page or
   * "/solutions/ai-call-center" for a solution page.
   * Do NOT include the locale prefix — generateSeo adds it automatically.
   */
  path?: string;
  /**
   * The current page locale (e.g. "en", "ar", "fr").
   * Used to build the canonical URL and the hreflang alternates map.
   */
  locale?: string;
  /**
   * @deprecated Pass `path` + `locale` instead. Kept for backwards-compatibility.
   * When supplied it is used as-is for the canonical URL (no hreflang map generated).
   */
  url?: string;
  image?: string;
  keywords?: string[];
  robots?: {
    index?: boolean;
    follow?: boolean;
    noindex?: boolean;
    nofollow?: boolean;
  };
  author?: string;
  openGraphType?: "website" | "article" | "book" | "profile";
}

/** All locales the site supports — keep in sync with src/i18n/config.ts */
const SUPPORTED_LOCALES = ["en", "ar", "es", "fr", "pt", "ru"] as const;

export const generateSeo = ({
  title,
  description,
  path = "/",
  locale = "en",
  url,
  image,
  keywords,
  robots,
  author,
  openGraphType = "website",
}: Props): Metadata => {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const defaultImage = siteConfig.ogImage?.url ?? "";
  const imageUrl = image ?? defaultImage;

  // Normalise path: must start with "/" and must NOT end with "/"
  const normalisedPath = "/" + path.replace(/^\//, "").replace(/\/$/, "");

  // Canonical points to the current locale's URL.
  // Fall back to the legacy `url` prop if the caller passed it directly.
  const canonicalUrl =
    url ??
    `${baseUrl}/${locale}${normalisedPath === "/" ? "" : normalisedPath}`;

  // Build the hreflang alternates map (only when we have a path + locale).
  const languages: Partial<Record<string, string>> = {};
  if (!url) {
    for (const loc of SUPPORTED_LOCALES) {
      languages[loc] =
        `${baseUrl}/${loc}${normalisedPath === "/" ? "" : normalisedPath}`;
    }
    // x-default falls back to the English version
    languages["x-default"] =
      `${baseUrl}/en${normalisedPath === "/" ? "" : normalisedPath}`;
  }

  const metadata: Metadata = {
    title,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title,
      description,
      siteName: siteConfig.name,
      url: canonicalUrl,
      locale: locale === "ar" ? "ar_SA" : `${locale}_${locale.toUpperCase()}`,
      type: openGraphType,
      images: [
        {
          url: imageUrl,
          width: siteConfig.ogImage?.width ?? 1200,
          height: siteConfig.ogImage?.height ?? 630,
          alt: description,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle ?? "@robusst",
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: siteConfig.ogImage?.width ?? 1200,
          height: siteConfig.ogImage?.height ?? 630,
          alt: description,
        },
      ],
    },
    alternates: {
      canonical: canonicalUrl,
      ...(Object.keys(languages).length > 0 && { languages }),
    },
  };

  if (keywords && keywords.length > 0) {
    metadata.keywords = keywords;
  }

  if (robots) {
    metadata.robots = {
      index: robots.index ?? undefined,
      follow: robots.follow ?? undefined,
    };
  }

  if (author) {
    metadata.authors = [{ name: author }];
    metadata.creator = author;
  }

  return metadata;
};
