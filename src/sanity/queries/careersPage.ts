import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

const careersProjection = `{
  "banner": {
    "body": banner.description,
    "heading": banner.title,
    "image": banner.image.image.asset->url,
    "imageAlt": banner.image.alt,
    "primaryCta": banner.primaryCta.link.label,
    "primaryHref": banner.primaryCta.link.href,
    "secondaryCta": banner.secondaryCta.link.label,
    "secondaryHref": banner.secondaryCta.link.href
  },
  "riseWithUs": {
    "heading": riseWithUs.title,
    "cards": riseWithUs.items[]{title, "description": description}
  },
  "weMakeDifference": {
    "heading": weMakeDifference.title,
    "bodyOne": weMakeDifference.paragraphs[0],
    "bodyTwo": weMakeDifference.paragraphs[1],
    "image": weMakeDifference.image.image.asset->url,
    "imageAlt": weMakeDifference.image.alt
  },
  "whatWeOffer": {
    "heading": whatWeOffer.title,
    "sections": whatWeOffer.items[]{title, description},
    "image": whatWeOffer.image.image.asset->url,
    "imageAlt": whatWeOffer.image.alt
  },
  "values": {
    "heading": values.title,
    "cards": values.items[]{title, "desc": description}
  },
  "readyToJoinUs": {
    "heading": readyToJoin.title,
    "bodyOne": readyToJoin.paragraphs[0],
    "bodyTwo": readyToJoin.paragraphs[1],
    "image": readyToJoin.image.image.asset->url,
    "imageAlt": readyToJoin.image.alt
  },
  "lifeAtRobusst": {
    "heading": lifeAtRobusst.title,
    "images": lifeAtRobusst.images[]{"url": image.asset->url, alt}
  },
  "ourHiringProcess": {
    "heading": hiringProcess.title,
    "body": hiringProcess.description,
    "images": hiringProcess.images[]{"url": image.asset->url, alt}
  },
  "currentOpenings": {
    "heading": currentOpenings.title,
    "viewJobCta": currentOpenings.labels[0],
    "applyNowCta": currentOpenings.labels[1]
  },
  "contact": {
    "heading": contact.title,
    "questionsPrompt": contact.subtitle,
    "description": contact.description,
    "emailUs": contact.labels[0],
    "followUs": contact.labels[1],
    "latestJobOpenings": contact.labels[2],
    "image": contact.image.image.asset->url,
    "imageAlt": contact.image.alt,
    "emails": contact.items[]{"label": title, "href": "mailto:" + title},
    "linkedin": *[_type == "siteSettings" && language == $locale][0].socialLinks[label == "LinkedIn"][0]{label, href, ariaLabel, openInNewTab}
  },
  "rolePage": {
    "applyNowCta": rolePage.labels[0],
    "overviewHeading": rolePage.labels[1],
    "keyResponsibilitiesHeading": rolePage.labels[2],
    "requirementsHeading": rolePage.labels[3]
  },
  "jobOpenings": *[_type == "jobPosting" && language == $locale && open == true] | order(publishedAt desc){
    "id": legacyId,
    "positionTitle": title,
    "shortDesc": summary,
    department,
    "roleType": employmentTypeLabel,
    "localtion": workplaceTypeLabel,
    "roleOverView": overview[].children[].text,
    "responsibilities": responsibilities[].children[].text,
    "requirements": requirements[].children[].text,
    "applyLabel": applyCta.link.label,
    "applyHref": applyCta.link.href
  }
}`;

export const careersPageQuery = defineQuery(`
  *[_type == "careersPage" && language == $locale][0]{
    "careers": ${careersProjection},
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

export const careerJobIdsQuery = defineQuery(`
  *[_type == "jobPosting" && language == "en" && open == true]{"id": legacyId}
`);

export const careerJobQuery = defineQuery(`
  {
    "job": *[_type == "jobPosting" && language == $locale && legacyId == $id && open == true][0]{
      "id": legacyId,
      "positionTitle": title,
      "shortDesc": summary,
      department,
      "roleType": employmentTypeLabel,
      "localtion": workplaceTypeLabel,
      "roleOverView": overview[].children[].text,
      "responsibilities": responsibilities[].children[].text,
      "requirements": requirements[].children[].text,
      "applyLabel": applyCta.link.label,
      "applyHref": applyCta.link.href,
      publishedAt,
      expiresAt,
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
    },
    "rolePage": *[_type == "careersPage" && language == $locale][0]{
      "applyNowCta": rolePage.labels[0],
      "overviewHeading": rolePage.labels[1],
      "keyResponsibilitiesHeading": rolePage.labels[2],
      "requirementsHeading": rolePage.labels[3]
    },
    "notFound": *[_type == "siteSettings" && language == $locale][0].notFoundTitle
  }
`);

export async function getCareersPage(locale: string) {
  return sanityClient.fetch(
    careersPageQuery,
    { locale },
    {
      next: {
        revalidate: 300,
        tags: [`sanity-careersPage-${locale}`, `sanity-jobPosting-${locale}`],
      },
    },
  );
}

export async function getCareerJobIds() {
  return sanityClient.fetch(
    careerJobIdsQuery,
    {},
    { next: { revalidate: 300 } },
  );
}

export async function getCareerJob(locale: string, id: string) {
  return sanityClient.fetch(
    careerJobQuery,
    { locale, id },
    {
      next: {
        revalidate: 300,
        tags: [`sanity-careersPage-${locale}`, `sanity-jobPosting-${locale}`],
      },
    },
  );
}
