import { defineArrayMember, defineField, defineType } from "sanity";
import { hideUnusedFixedSectionField } from "../fixedSectionFields";

export const seo = defineType({
  name: "seo",
  title: "SEO and social sharing",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description:
        "Aim for 65 characters or fewer. Localized titles may be longer when required for accuracy.",
      validation: (rule) => rule.required().min(15).max(120),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description:
        "Aim for 170 characters or fewer. Localized descriptions may be longer when required for accuracy.",
      validation: (rule) => rule.required().min(50).max(240),
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "socialTitle",
      title: "Social title",
      type: "string",
      description:
        "Aim for 70 characters or fewer; longer localized titles are supported.",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "socialDescription",
      title: "Social description",
      type: "text",
      rows: 3,
      description:
        "Aim for 200 characters or fewer; longer localized descriptions are supported.",
      validation: (rule) => rule.max(260),
    }),
    defineField({
      name: "socialImage",
      title: "Social image",
      type: "contentImage",
    }),
    defineField({
      name: "noIndex",
      title: "Prevent search indexing",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

export const translationWorkflow = defineType({
  name: "translationWorkflow",
  title: "Translation workflow",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "source",
      options: {
        list: [
          { title: "Canonical source", value: "source" },
          { title: "Generated — needs review", value: "generated" },
          { title: "Human reviewed", value: "reviewed" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sourceLanguage",
      title: "Source language",
      type: "string",
      initialValue: "en",
      readOnly: true,
    }),
    defineField({
      name: "reviewNotes",
      title: "Review notes",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "reviewedAt",
      title: "Reviewed at",
      type: "datetime",
      readOnly: true,
    }),
  ],
});

export const fixedSection = defineType({
  name: "fixedSection",
  title: "Fixed page section",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "internalName",
      title: "Internal name",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      hidden: hideUnusedFixedSectionField("eyebrow"),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      hidden: hideUnusedFixedSectionField("title"),
    }),
    defineField({
      name: "titleHighlight",
      title: "Highlighted title text",
      type: "string",
      hidden: hideUnusedFixedSectionField("titleHighlight"),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      hidden: hideUnusedFixedSectionField("subtitle"),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      hidden: hideUnusedFixedSectionField("description"),
    }),
    defineField({
      name: "additionalCopy",
      title: "Additional rich copy",
      type: "portableText",
      hidden: hideUnusedFixedSectionField("additionalCopy"),
    }),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 3 })],
      hidden: hideUnusedFixedSectionField("paragraphs"),
      validation: (rule) => rule.max(20),
    }),
    defineField({
      name: "labels",
      title: "Labels",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      hidden: hideUnusedFixedSectionField("labels"),
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: "countPrefix",
      title: "Count prefix",
      type: "string",
      hidden: hideUnusedFixedSectionField("countPrefix"),
    }),
    defineField({
      name: "image",
      title: "Primary image",
      type: "contentImage",
      hidden: hideUnusedFixedSectionField("image"),
    }),
    defineField({
      name: "images",
      title: "Gallery/images",
      type: "array",
      of: [defineArrayMember({ type: "contentImage" })],
      hidden: hideUnusedFixedSectionField("images"),
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "externalVideo",
      hidden: hideUnusedFixedSectionField("video"),
    }),
    defineField({
      name: "primaryCta",
      title: "Primary call to action",
      type: "callToAction",
      hidden: hideUnusedFixedSectionField("primaryCta"),
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary call to action",
      type: "callToAction",
      hidden: hideUnusedFixedSectionField("secondaryCta"),
    }),
    defineField({
      name: "statistics",
      title: "Statistics",
      type: "array",
      of: [defineArrayMember({ type: "statistic" })],
      hidden: hideUnusedFixedSectionField("statistics"),
      validation: (rule) => rule.max(12),
    }),
    defineField({
      name: "items",
      title: "Cards/items",
      type: "array",
      of: [defineArrayMember({ type: "contentCard" })],
      hidden: hideUnusedFixedSectionField("items"),
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "groups",
      title: "Fixed content groups",
      type: "array",
      of: [defineArrayMember({ type: "contentGroup" })],
      hidden: hideUnusedFixedSectionField("groups"),
      validation: (rule) => rule.max(20),
    }),
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [defineArrayMember({ type: "logoItem" })],
      hidden: hideUnusedFixedSectionField("logos"),
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [defineArrayMember({ type: "faqItem" })],
      hidden: hideUnusedFixedSectionField("faqs"),
      validation: (rule) => rule.max(30),
    }),
  ],
});

export const formCopy = defineType({
  name: "formCopy",
  title: "Form copy",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Form title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "nameLabel", title: "Name label", type: "string" }),
    defineField({
      name: "namePlaceholder",
      title: "Name placeholder",
      type: "string",
    }),
    defineField({
      name: "companyLabel",
      title: "Company label",
      type: "string",
    }),
    defineField({
      name: "jobTitleLabel",
      title: "Job-title label",
      type: "string",
    }),
    defineField({
      name: "websiteLabel",
      title: "Website label",
      type: "string",
    }),
    defineField({
      name: "partnerTypeLabel",
      title: "Partner-type label",
      type: "string",
    }),
    defineField({
      name: "partnerTypePlaceholder",
      title: "Partner-type placeholder",
      type: "string",
    }),
    defineField({
      name: "partnerTypeOptions",
      title: "Partner-type options",
      type: "array",
      of: [defineArrayMember({ type: "selectOption" })],
      validation: (rule) => rule.max(10),
    }),
    defineField({
      name: "privacyText",
      title: "Privacy notice",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "emailLabel", title: "Email label", type: "string" }),
    defineField({ name: "phoneLabel", title: "Phone label", type: "string" }),
    defineField({
      name: "countryLabel",
      title: "Country label",
      type: "string",
    }),
    defineField({
      name: "countryPlaceholder",
      title: "Country-select placeholder",
      type: "string",
    }),
    defineField({
      name: "countrySearchPlaceholder",
      title: "Country search placeholder",
      type: "string",
    }),
    defineField({
      name: "countryEmptyMessage",
      title: "No-country-results message",
      type: "string",
    }),
    defineField({
      name: "countryOptions",
      title: "Localized country options",
      type: "array",
      of: [defineArrayMember({ type: "selectOption" })],
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "messageLabel",
      title: "Message label",
      type: "string",
    }),
    defineField({
      name: "messagePlaceholder",
      title: "Message placeholder",
      type: "string",
    }),
    defineField({
      name: "submitLabel",
      title: "Submit label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submittingLabel",
      title: "Submitting label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "successMessage",
      title: "Success message",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "errorMessage",
      title: "Generic error message",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submissionFailedMessage",
      title: "Submission-failed message",
      type: "string",
    }),
    defineField({
      name: "unexpectedErrorMessage",
      title: "Unexpected-error message",
      type: "string",
    }),
    defineField({
      name: "partnerTypeRequiredMessage",
      title: "Partner-type-required message",
      type: "string",
    }),
    defineField({
      name: "formInvalidMessage",
      title: "Form-invalid message",
      type: "string",
    }),
    defineField({
      name: "messageWordLimitLabel",
      title: "Message word-count label",
      type: "string",
    }),
    defineField({
      name: "successTitle",
      title: "Success title",
      type: "string",
    }),
    defineField({
      name: "errorTitle",
      title: "Error title",
      type: "string",
    }),
    defineField({
      name: "requiredMessage",
      title: "Generic required-field message",
      type: "string",
    }),
    defineField({
      name: "nameRequiredMessage",
      title: "Name-required message",
      type: "string",
    }),
    defineField({
      name: "nameMinLengthMessage",
      title: "Name minimum-length message",
      type: "string",
    }),
    defineField({
      name: "emailRequiredMessage",
      title: "Email-required message",
      type: "string",
    }),
    defineField({
      name: "phoneRequiredMessage",
      title: "Phone-required message",
      type: "string",
    }),
    defineField({
      name: "countryRequiredMessage",
      title: "Country-required message",
      type: "string",
    }),
    defineField({
      name: "messageRequiredMessage",
      title: "Message-required message",
      type: "string",
    }),
    defineField({
      name: "messageMinWordsMessage",
      title: "Message minimum-words message",
      type: "string",
    }),
    defineField({
      name: "messageMaxWordsMessage",
      title: "Message maximum-words message",
      type: "string",
    }),
    defineField({
      name: "invalidEmailMessage",
      title: "Invalid-email message",
      type: "string",
    }),
    defineField({
      name: "invalidPhoneMessage",
      title: "Invalid-phone message",
      type: "string",
    }),
  ],
});
