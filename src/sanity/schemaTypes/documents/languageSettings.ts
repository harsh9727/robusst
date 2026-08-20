import { defineField, defineType } from "sanity";
import { sanityLanguages } from "../../languages";

export const languageOption = defineType({
  name: "languageOption",
  title: "Language option",
  type: "object",
  fields: [
    defineField({
      name: "nativeName",
      title: "Native language name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "countryName",
      title: "Country/region name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "flag",
      title: "Flag",
      type: "contentImage",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "switchLabel",
      title: "Accessibility label",
      description: "Example: Switch language to English",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "nativeName",
      subtitle: "countryName",
      media: "flag.image",
    },
  },
});

export const languageSettings = defineType({
  name: "languageSettings",
  title: "Language switcher",
  type: "document",
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal title",
      type: "string",
      readOnly: true,
      initialValue: "Language switcher",
      validation: (rule) => rule.required(),
    }),
    ...sanityLanguages.map((language) =>
      defineField({
        name: language.id,
        title: language.title,
        type: "languageOption",
        validation: (rule) => rule.required(),
      }),
    ),
  ],
  preview: {
    prepare: () => ({
      title: "Language switcher",
      subtitle: "Six fixed supported languages",
    }),
  },
});
