import type { StructureBuilder, StructureResolver } from "sanity/structure";
import { localizedPageTypeNames } from "./schemaTypes/documents/pages";

const pageTitles: Record<(typeof localizedPageTypeNames)[number], string> = {
  homePage: "Home",
  aboutPage: "About",
  blogIndexPage: "Blog listing",
  careersPage: "Careers",
  contactPage: "Contact",
  partnershipPage: "Partnership",
  platformsPage: "Platforms",
  pocWaitlistPage: "POC waitlist",
  solutionsPage: "Solutions listing",
  aiCallCenterPage: "AI Call Center",
  brandedCallingPage: "Branded Calling",
  customerDataPlatformPage: "Customer Data Platform",
  customizedSolutionsPage: "Customized Solutions",
  cybersecurityPage: "Cybersecurity",
  intelligentNocPage: "Intelligent NOC",
  networkMonetizationPage: "Network Monetization",
  stsDmsPage: "STS/DMS",
  storiesPage: "Success Stories listing",
};

function translatedDocuments(S: StructureBuilder, type: string, title: string) {
  return S.listItem()
    .title(title)
    .schemaType(type)
    .child(
      S.documentList()
        .title(`${title} translations`)
        .schemaType(type)
        .filter("_type == $type")
        .params({ type })
        .defaultOrdering([{ field: "language", direction: "asc" }]),
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Robusst content")
    .items([
      translatedDocuments(S, "siteSettings", "Site settings"),
      S.listItem()
        .title("Language switcher")
        .schemaType("languageSettings")
        .child(
          S.document()
            .schemaType("languageSettings")
            .documentId("languageSettings"),
        ),
      S.divider(),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items(
              localizedPageTypeNames.map((type) =>
                translatedDocuments(S, type, pageTitles[type]),
              ),
            ),
        ),
      S.divider(),
      translatedDocuments(S, "blogPost", "Blog posts"),
      translatedDocuments(S, "jobPosting", "Job postings"),
      translatedDocuments(S, "successStory", "Success stories"),
      S.divider(),
      S.listItem()
        .title("Form submissions")
        .schemaType("formSubmission")
        .child(
          S.documentList()
            .title("Form submissions")
            .schemaType("formSubmission")
            .filter('_type == "formSubmission"')
            .defaultOrdering([{ field: "submittedAt", direction: "desc" }]),
        ),
    ]);
