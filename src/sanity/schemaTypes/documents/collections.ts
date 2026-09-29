import { defineArrayMember, defineField, defineType } from "sanity";
import { sanityLanguageIds } from "../../languages";
import {
  uniqueSlugWithinLanguage,
  uniqueStringWithinLanguage,
} from "../validation";

const languageField = defineField({
  name: "language",
  title: "Language",
  type: "string",
  readOnly: true,
  hidden: true,
  options: { list: sanityLanguageIds.map((id) => ({ title: id, value: id })) },
  validation: (rule) => rule.required(),
});

const translationField = defineField({
  name: "translation",
  title: "Translation workflow",
  type: "translationWorkflow",
  validation: (rule) => rule.required(),
});

export const author = defineType({
  name: "author",
  title: "Author profile",
  type: "document",
  groups: [
    { name: "profile", title: "Profile", default: true },
    { name: "seo", title: "SEO" },
    { name: "workflow", title: "Workflow" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Display name",
      type: "string",
      group: "profile",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Profile slug",
      type: "slug",
      group: "profile",
      options: { source: "name", maxLength: 120 },
      validation: (rule) =>
        rule.required().custom(uniqueSlugWithinLanguage("author")),
    }),
    defineField({
      name: "role",
      title: "Role/title",
      type: "string",
      group: "profile",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 5,
      group: "profile",
      validation: (rule) => rule.required().min(40).max(1200),
    }),
    defineField({
      name: "image",
      title: "Profile image",
      type: "contentImage",
      group: "profile",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "postsHeading",
      title: "Author articles heading",
      description: "Localized heading used on this author's profile page.",
      type: "string",
      group: "profile",
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: "emptyPostsMessage",
      title: "No-articles message",
      type: "string",
      group: "profile",
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
      group: "profile",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      group: "profile",
      of: [defineArrayMember({ type: "contentLink" })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
      validation: (rule) => rule.required(),
    }),
    { ...languageField, group: "workflow" },
    { ...translationField, group: "workflow" },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image.image" },
  },
});

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "content", title: "Article", default: true },
    { name: "seo", title: "SEO" },
    { name: "workflow", title: "Workflow" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 180 },
      validation: (rule) =>
        rule.required().custom(uniqueSlugWithinLanguage("blogPost")),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 4,
      group: "content",
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "contentImage",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "updatedAtEditorial",
      title: "Editorially updated at",
      type: "datetime",
      group: "content",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      options: {
        disableNew: true,
        filter: ({ document }) => ({
          filter: "language == $language",
          params: { language: document.language },
        }),
      },
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Legacy author name",
      description:
        "Retained for migration history. Edit the Author profile instead.",
      type: "string",
      group: "content",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "authorImage",
      title: "Legacy author image",
      description:
        "Retained for migration history. Edit the Author profile instead.",
      type: "contentImage",
      group: "content",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "portableText",
      group: "content",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "relatedPosts",
      title: "Related posts",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "blogPost" }],
          options: { disableNew: true },
        }),
      ],
      validation: (rule) => rule.unique().max(6),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
      validation: (rule) => rule.required(),
    }),
    { ...languageField, group: "workflow" },
    { ...translationField, group: "workflow" },
  ],
  orderings: [
    {
      title: "Publication date, newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "language", media: "coverImage.image" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle?.toUpperCase(),
      media,
    }),
  },
});

export const jobPosting = defineType({
  name: "jobPosting",
  title: "Job posting",
  type: "document",
  groups: [
    { name: "content", title: "Job", default: true },
    { name: "seo", title: "SEO" },
    { name: "workflow", title: "Workflow" },
  ],
  fields: [
    defineField({
      name: "legacyId",
      title: "Legacy route ID",
      description: "Preserved for /careers/roles/[id].",
      type: "string",
      group: "content",
      validation: (rule) =>
        rule
          .required()
          .custom(uniqueStringWithinLanguage("jobPosting", "legacyId")),
    }),
    defineField({
      name: "title",
      title: "Job title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "employmentType",
      title: "Employment type",
      type: "string",
      group: "content",
      options: { list: ["full-time", "part-time", "contract", "internship"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "employmentTypeLabel",
      title: "Localized employment-type label",
      description: "Visible translated label for the locked employment type.",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "workplaceType",
      title: "Workplace type",
      type: "string",
      group: "content",
      options: { list: ["onsite", "hybrid", "remote", "offsite"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "workplaceTypeLabel",
      title: "Localized workplace-type label",
      description: "Visible translated label for the locked workplace type.",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "portableText",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "responsibilities",
      title: "Responsibilities",
      type: "portableText",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "requirements",
      title: "Requirements",
      type: "portableText",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "applyCta",
      title: "Apply action",
      type: "callToAction",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "applicationEmail",
      title: "Application email",
      type: "string",
      group: "content",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "applicationWhatsapp",
      title: "WhatsApp link",
      type: "url",
      group: "content",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "expiresAt",
      title: "Expires at",
      type: "datetime",
      group: "content",
    }),
    defineField({
      name: "open",
      title: "Accepting applications",
      type: "boolean",
      group: "content",
      initialValue: true,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
      validation: (rule) => rule.required(),
    }),
    { ...languageField, group: "workflow" },
    { ...translationField, group: "workflow" },
  ],
  preview: {
    select: {
      title: "title",
      department: "department",
      language: "language",
      open: "open",
    },
    prepare: ({ title, department, language, open }) => ({
      title,
      subtitle: [department, language?.toUpperCase(), open ? "Open" : "Closed"]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});

export const successStory = defineType({
  name: "successStory",
  title: "Success story",
  type: "document",
  groups: [
    { name: "content", title: "Story", default: true },
    { name: "seo", title: "SEO" },
    { name: "workflow", title: "Workflow" },
  ],
  fields: [
    defineField({
      name: "legacyId",
      title: "Legacy ID",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "customerName",
      title: "Customer",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "customerLogo",
      title: "Customer logo",
      type: "contentImage",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "challenges",
      title: "Customer challenges",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "contentCard" })],
      validation: (rule) => rule.required().min(1).max(12),
    }),
    defineField({
      name: "solutions",
      title: "Solutions",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "contentCard" })],
      validation: (rule) => rule.required().min(1).max(12),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
      validation: (rule) => rule.required(),
    }),
    { ...languageField, group: "workflow" },
    { ...translationField, group: "workflow" },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "customerName",
      media: "customerLogo.image",
    },
  },
});
