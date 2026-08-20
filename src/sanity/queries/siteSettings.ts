import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

const linkProjection = `{
  label,
  kind,
  href,
  ariaLabel,
  openInNewTab
}`;

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings" && language == $locale][0]{
    siteName,
    tagline,
    organizationDescription,
    logo{
      alt,
      "url": image.asset->url
    },
    skipLinkLabel,
    announcementText,
    announcement${linkProjection},
    primaryNavigation[]${linkProjection},
    solutionsNavigationLabel,
    solutionsNavigation[]${linkProjection},
    resourcesNavigationLabel,
    resourcesNavigation[]${linkProjection},
    headerPrimaryCta{
      style,
      link${linkProjection}
    },
    headerSecondaryCta{
      style,
      link${linkProjection}
    },
    mobileMenuTitle,
    mobileMenuOpenLabel,
    mobileMenuCloseLabel,
    footerHeading,
    footerDescription,
    footerCta{
      style,
      link${linkProjection}
    },
    quickLinksHeading,
    quickLinks[]${linkProjection},
    solutionLinksHeading,
    solutionLinks[]${linkProjection},
    socialLinksHeading,
    socialLinks[]${linkProjection},
    copyright,
    footerHashtag,
    contactEmail,
    careersEmail,
    salesCareersEmail,
    whatsappLink,
    calendlyUrl,
    youtubeChannel,
    sharedContactForm,
    viewAllLabel,
    notFoundTitle,
    notFoundDescription,
    notFoundAction{
      style,
      link${linkProjection}
    },
    goToTopLabel,
    playVideoLabel,
    closeDialogLabel,
    defaultSeo,
    language,
    translation
  }
`);

export const languageSettingsQuery = defineQuery(`
  *[_id == "languageSettings"][0]{
    en{nativeName, countryName, switchLabel, flag{alt, "url": image.asset->url}},
    fr{nativeName, countryName, switchLabel, flag{alt, "url": image.asset->url}},
    ru{nativeName, countryName, switchLabel, flag{alt, "url": image.asset->url}},
    pt{nativeName, countryName, switchLabel, flag{alt, "url": image.asset->url}},
    es{nativeName, countryName, switchLabel, flag{alt, "url": image.asset->url}},
    ar{nativeName, countryName, switchLabel, flag{alt, "url": image.asset->url}}
  }
`);

export async function getSiteSettings(locale: string) {
  return sanityClient.fetch(
    siteSettingsQuery,
    { locale },
    { next: { revalidate: 300, tags: [`sanity-siteSettings-${locale}`] } },
  );
}

export async function getLanguageSettings() {
  return sanityClient.fetch(
    languageSettingsQuery,
    {},
    { next: { revalidate: 300, tags: ["sanity-languageSettings"] } },
  );
}
