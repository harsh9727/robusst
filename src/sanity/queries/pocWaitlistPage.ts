import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

export const pocWaitlistPageQuery = defineQuery(`
  *[_type == "pocWaitlistPage" && language == $locale][0]{
    "pocWaitlist": {
      "banner": {
        "heading": hero.title,
        "subtitle": hero.subtitle,
        "image": hero.image.image.asset->url,
        "imageAlt": hero.image.alt,
        "ctaText": hero.primaryCta.link.label,
        "ctaHref": hero.primaryCta.link.href
      },
      "form": {
        "heading": form.title,
        "fields": {
          "name": {"label": form.nameLabel, "required": form.nameRequiredMessage},
          "companyName": {"label": form.companyLabel},
          "email": {"label": form.emailLabel, "required": form.emailRequiredMessage},
          "phone": {"label": form.phoneLabel, "required": form.phoneRequiredMessage},
          "country": {"label": form.countryLabel, "required": form.countryRequiredMessage, "placeholder": form.countryPlaceholder},
          "message": {"label": form.messageLabel, "required": form.messageRequiredMessage, "wordLimit": form.messageWordLimitLabel}
        },
        "countrySearchPlaceholder": form.countrySearchPlaceholder,
        "countryEmptyMessage": form.countryEmptyMessage,
        "countryOptions": form.countryOptions[]{value, label},
        "formInvalidMessage": form.formInvalidMessage,
        "submit": {"button": form.submitLabel, "submitting": form.submittingLabel},
        "success": {"title": form.successTitle, "message": form.successMessage},
        "error": {"title": form.errorTitle, "message": form.errorMessage},
        "validation": {
          "nameRequired": form.nameRequiredMessage,
          "nameMinLength": form.nameMinLengthMessage,
          "emailRequired": form.emailRequiredMessage,
          "emailInvalid": form.invalidEmailMessage,
          "phoneRequired": form.phoneRequiredMessage,
          "phoneInvalid": form.invalidPhoneMessage,
          "countryRequired": form.countryRequiredMessage,
          "messageRequired": form.messageRequiredMessage,
          "messageMinWords": form.messageMinWordsMessage,
          "messageMaxWords": form.messageMaxWordsMessage
        }
      }
    },
    "seo": {
      "title": seo.metaTitle,
      "description": seo.metaDescription,
      "keywords": seo.keywords,
      "socialImage": coalesce(
        seo.socialImage.image.asset->url,
        hero.image.image.asset->url,
        *[_type == "siteSettings" && language == $locale][0].defaultSeo.socialImage.image.asset->url
      ),
      "noIndex": seo.noIndex
    }
  }
`);

export async function getPocWaitlistPage(locale: string) {
  return sanityClient.fetch(
    pocWaitlistPageQuery,
    { locale },
    {
      next: {
        revalidate: 300,
        tags: [`sanity-pocWaitlistPage-${locale}`],
      },
    },
  );
}
