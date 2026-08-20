import { defineField, defineType } from "sanity";

export const selectOption = defineType({
  name: "selectOption",
  title: "Select option",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Stable value",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Visible label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "value" } },
});
