import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

/*
 * Each section is a referenced fixedPageSection document. The section names
 * reuse existing ones to stay within Sanity's field-path limit (see
 * src/sanity/schemaTypes/documents/pages.ts), and this query maps them back to
 * readable names:
 *   banner = hero, solutionOverview = demo card, listing = dialect strip,
 *   keyValueProposition = coverage, solutionGrid = dialects,
 *   detailDialog = dialect interface labels, businessOutcomes = outcomes,
 *   coreCapabilities = capabilities, cta = closing call to action.
 * Hero statistics are cards (title = value, description = label), and each
 * language lists its dialects one per line in description.
 * detailDialog.labels: 0 regions tab-list accessibility label,
 *   1 "and more" chip, 2 region footer template with {count} and {region}.
 */
export const voiceDemoPageQuery = defineQuery(`
  *[_type == "voiceDemoPage" && language == $locale][0]{
    "hero": banner->content,
    "demo": solutionOverview->content,
    "strip": listing->content,
    "coverage": keyValueProposition->content,
    "dialects": solutionGrid->content,
    "dialectsUi": detailDialog->content,
    "outcomes": businessOutcomes->content,
    "capabilities": coreCapabilities->content,
    "cta": cta->content,
    seo
  }{
    "hero": {
      "eyebrow": hero.eyebrow,
      "title": hero.title,
      "titleHighlight": hero.titleHighlight,
      "subtitle": hero.subtitle,
      "ctaLabel": hero.primaryCta.link.label,
      "ctaHref": hero.primaryCta.link.href,
      "statistics": hero.items[]{"value": title, "label": description}
    },
    "demo": {
      "cardLabel": demo.title,
      "tagline": demo.subtitle,
      "orbImage": demo.image.image.asset->url,
      "orbImageAlt": demo.image.alt
    },
    "dialectStrip": {
      "ariaLabel": strip.title,
      "totalValue": strip.eyebrow,
      "totalLabel": strip.subtitle
    },
    "coverage": {
      "eyebrow": coverage.eyebrow,
      "title": coverage.title,
      "titleHighlight": coverage.titleHighlight,
      "description": coverage.description,
      "statistics": coverage.statistics[]{prefix, value, suffix, label}
    },
    "dialects": {
      "title": dialects.title,
      "description": dialects.description,
      "chips": dialects.labels,
      "caveat": dialects.paragraphs[0],
      "regions": dialects.groups[]{
        "name": title,
        "languages": items[]{"name": title, "dialects": string::split(description, "\n")}
      },
      "regionsAriaLabel": dialectsUi.labels[0],
      "moreLabel": dialectsUi.labels[1],
      "footerTemplate": dialectsUi.labels[2]
    },
    "outcomes": outcomes.items[]{title, description, "icon": iconKey},
    "capabilities": {
      "eyebrow": capabilities.eyebrow,
      "title": capabilities.title,
      "titleHighlight": capabilities.titleHighlight,
      "items": capabilities.items[]{"badge": eyebrow, title, description, "icon": iconKey}
    },
    "cta": {
      "title": cta.title,
      "description": cta.description,
      "label": cta.primaryCta.link.label,
      "href": cta.primaryCta.link.href
    },
    "seo": {"title": seo.metaTitle, "description": seo.metaDescription, "keywords": seo.keywords, "socialTitle": seo.socialTitle, "socialDescription": seo.socialDescription, "socialImage": seo.socialImage.image.asset->url, "noIndex": seo.noIndex}
  }
`);

export async function getVoiceDemoPage(locale: string) {
  return sanityClient.fetch(
    voiceDemoPageQuery,
    { locale },
    { next: { revalidate: 300, tags: [`sanity-voiceDemoPage-${locale}`] } },
  );
}
