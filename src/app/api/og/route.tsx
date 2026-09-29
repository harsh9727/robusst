import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { locales } from "~/i18n/config";
import { getSiteSettings } from "~/sanity/queries/siteSettings";
import { buildOgImageJsx } from "~/utils/og-template";

export const runtime = "edge";

const ogFont = fetch(new URL("./assets/DejaVuSans.ttf", import.meta.url)).then(
  (response) => response.arrayBuffer(),
);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const requestedLocale = searchParams.get("locale") ?? "en";
  const locale = locales.includes(requestedLocale as (typeof locales)[number])
    ? requestedLocale
    : "en";
  const settings = await getSiteSettings(locale);
  if (!settings)
    return new Response("Missing CMS social image settings", { status: 404 });
  const title = searchParams.get("title") ?? settings.defaultSeo.metaTitle;
  const description =
    searchParams.get("description") ??
    searchParams.get("excerpt") ??
    settings.defaultSeo.metaDescription;

  return new ImageResponse(
    buildOgImageJsx(
      title,
      description,
      settings.siteName,
      settings.ogBadgeLabel,
      settings.websiteDisplayUrl,
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "DejaVu Sans",
          data: await ogFont,
          style: "normal",
        },
      ],
    },
  );
}
