import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

export const partnershipPageQuery = defineQuery(`
  *[_type == "partnershipPage" && language == $locale][0]{
    "banner": {
      "heading": banner.title,
      "image": banner.image.image.asset->url,
      "imageAlt": banner.image.alt,
      "ctaLabel": banner.primaryCta.link.label,
      "ctaHref": banner.primaryCta.link.href
    },
    "partner": {
      "heading": partnerProgram.title,
      "cards": partnerProgram.items[]{
        title,
        description,
        "buttonText": cta.link.label,
        "buttonHref": cta.link.href
      }
    },
    "formSection": {
      "heading": formIntro.title,
      "subtitle": formIntro.description,
      "form": {
        "nameLabel": form.nameLabel,
        "jobTitleLabel": form.jobTitleLabel,
        "emailLabel": form.emailLabel,
        "phoneLabel": form.phoneLabel,
        "companyNameLabel": form.companyLabel,
        "websiteLabel": form.websiteLabel,
        "partnerTypeLabel": form.partnerTypeLabel,
        "partnerTypePlaceholder": form.partnerTypePlaceholder,
        "partnerTypeOptions": form.partnerTypeOptions[]{value, label},
        "privacyText": form.privacyText,
        "submitButton": form.submitLabel,
        "submittingLabel": form.submittingLabel,
        "successMessage": form.successMessage,
        "submissionFailedMessage": form.submissionFailedMessage,
        "unexpectedErrorMessage": form.unexpectedErrorMessage,
        "formInvalidMessage": form.formInvalidMessage,
        "nameRequiredMessage": form.nameRequiredMessage,
        "nameMinLengthMessage": form.nameMinLengthMessage,
        "emailRequiredMessage": form.emailRequiredMessage,
        "emailInvalidMessage": form.invalidEmailMessage,
        "partnerTypeRequiredMessage": form.partnerTypeRequiredMessage
      }
    },
    "seo": {
      "title": seo.metaTitle,
      "description": seo.metaDescription,
      "keywords": seo.keywords,
      "socialImage": coalesce(
        seo.socialImage.image.asset->url,
        *[_type == "siteSettings" && language == $locale][0].defaultSeo.socialImage.image.asset->url
      ),
      "noIndex": seo.noIndex
    }
  }
`);

export async function getPartnershipPage(locale: string) {
  return sanityClient.fetch(
    partnershipPageQuery,
    { locale },
    { next: { revalidate: 300, tags: [`sanity-partnershipPage-${locale}`] } },
  );
}
