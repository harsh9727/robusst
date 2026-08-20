import type { Metadata, Viewport } from "next";
import "~/styles/globals.css";
import { getDiscoveryContent } from "~/sanity/queries/discovery";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";

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

export async function generateMetadata(): Promise<Metadata> {
  const discovery = await getDiscoveryContent("en");
  const site = discovery.site;
  if (!site)
    throw new Error("Missing published English Sanity discovery settings");
  const socialImage = site.defaultSeo.socialImage;
  const linkedin = site.socialLinks?.find(
    (link) => link.label === "LinkedIn",
  )?.href;
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: site.defaultSeo.title,
      template: "%s",
    },
    description: site.defaultSeo.description,
    keywords: site.defaultSeo.keywords ?? undefined,
    authors: [{ name: site.siteName }],
    creator: site.siteName,
    publisher: site.siteName,
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
      type: "website",
      locale: "en",
      url: baseUrl,
      siteName: site.siteName,
      title: site.defaultSeo.socialTitle ?? site.defaultSeo.title,
      description:
        site.defaultSeo.socialDescription ?? site.defaultSeo.description,
      images: socialImage
        ? [
            {
              url: socialImage,
              alt: site.defaultSeo.socialImageAlt ?? site.defaultSeo.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: site.defaultSeo.socialTitle ?? site.defaultSeo.title,
      description:
        site.defaultSeo.socialDescription ?? site.defaultSeo.description,
      images: socialImage
        ? [
            {
              url: socialImage,
              alt: site.defaultSeo.socialImageAlt ?? site.defaultSeo.title,
            },
          ]
        : undefined,
    },
    robots: {
      index: !site.defaultSeo.noIndex,
      follow: !site.defaultSeo.noIndex,
      googleBot: {
        index: !site.defaultSeo.noIndex,
        follow: !site.defaultSeo.noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: site.favicon
      ? { icon: site.favicon, apple: site.favicon }
      : undefined,
    manifest: "/manifest.webmanifest",
    alternates: { canonical: baseUrl },
    verification: { yandex: "3ae71aac18015c45" },
    other: {
      "og:site_name": site.siteName,
      ...(linkedin ? { "article:publisher": linkedin } : {}),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
