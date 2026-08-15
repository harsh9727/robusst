import { defineField, defineType } from "sanity";
import { sanityLanguageIds } from "../languages";

export const migrationConnectionTest = defineType({
  name: "migrationConnectionTest",
  title: "Migration connection test",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      readOnly: true,
      hidden: true,
      options: {
        list: sanityLanguageIds.map((id) => ({ title: id, value: id })),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      language: "language",
    },
    prepare: ({ title, language }) => ({
      title: title || "Untitled connection test",
      subtitle: language ? `Language: ${language}` : "Language not assigned",
    }),
  },
});
