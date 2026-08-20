import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

export const contactPageQuery = defineQuery(`
  *[_type == "contactPage" && language == $locale][0]{
    "banner": {
      "heading": hero.title,
      "subtitle": hero.subtitle,
      "image": hero.image.image.asset->url,
      "imageAlt": hero.image.alt
    },
    "seo": {"title": seo.metaTitle, "description": seo.metaDescription, "keywords": seo.keywords, "socialTitle": seo.socialTitle, "socialDescription": seo.socialDescription, "socialImage": seo.socialImage.image.asset->url, "noIndex": seo.noIndex},
    "form": {
      "heading": form.title,
      "formInvalidMessage": form.formInvalidMessage,
      "fields": {
        "name": {"label": form.nameLabel, "required": "true"},
        "companyName": {"label": form.companyLabel, "required": "false"},
        "email": {"label": form.emailLabel, "required": "true"},
        "phone": {"label": form.phoneLabel, "required": "true"},
        "country": {
          "label": form.countryLabel,
          "required": "true",
          "placeholder": form.countryPlaceholder,
          "searchPlaceholder": form.countrySearchPlaceholder,
          "emptyMessage": form.countryEmptyMessage,
          "options": form.countryOptions[]{value, label}
        },
        "message": {
          "label": form.messageLabel,
          "required": "true",
          "wordLimit": form.messageWordLimitLabel
        }
      },
      "submit": {"button": form.submitLabel, "submitting": form.submittingLabel},
      "success": {"title": form.successTitle, "message": form.successMessage},
      "error": {"title": form.errorTitle, "message": form.errorMessage},
      "validation": {
        "emailInvalid": form.invalidEmailMessage,
        "nameRequired": form.nameRequiredMessage,
        "phoneInvalid": form.invalidPhoneMessage,
        "emailRequired": form.emailRequiredMessage,
        "nameMinLength": form.nameMinLengthMessage,
        "phoneRequired": form.phoneRequiredMessage,
        "countryRequired": form.countryRequiredMessage,
        "messageMaxWords": form.messageMaxWordsMessage,
        "messageMinWords": form.messageMinWordsMessage,
        "messageRequired": form.messageRequiredMessage
      }
    }
  }
`);

export async function getContactPage(locale: string) {
  return sanityClient.fetch(
    contactPageQuery,
    { locale },
    { next: { revalidate: 300, tags: [`sanity-contactPage-${locale}`] } },
  );
}
