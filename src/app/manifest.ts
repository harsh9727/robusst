import type { MetadataRoute } from "next";
import { getDiscoveryContent } from "~/sanity/queries/discovery";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const discovery = await getDiscoveryContent("en");
  const site = discovery.site;
  if (!site)
    throw new Error("Missing published English Sanity manifest settings");
  return {
    name: site.defaultSeo.title,
    short_name: site.siteName,
    description: site.organizationDescription,
    start_url: "/en",
    display: "standalone",
    background_color: "#0c1323",
    theme_color: "#0c1323",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    categories: ["business", "productivity", "utilities"],
    icons: site.favicon
      ? [
          {
            src: site.favicon,
            sizes: "32x32",
            type: "image/webp",
            purpose: "any",
          },
        ]
      : undefined,
    screenshots: site.defaultSeo.socialImage
      ? [
          {
            src: site.defaultSeo.socialImage,
            sizes: "1200x630",
            type: "image/webp",
            form_factor: "wide",
            label: site.defaultSeo.socialImageAlt ?? site.defaultSeo.title,
          },
        ]
      : undefined,
    related_applications: [],
    prefer_related_applications: false,
  };
}
