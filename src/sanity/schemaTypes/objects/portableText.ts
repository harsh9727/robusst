import { defineArrayMember, defineField, defineType } from "sanity";

export const portableText = defineType({
  name: "portableText",
  title: "Rich content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading 1", value: "h1" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Heading 5", value: "h5" },
        { title: "Heading 6", value: "h6" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bulleted list", value: "bullet" },
        { title: "Numbered list", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
          { title: "Inline code", value: "code" },
        ],
        annotations: [
          defineField({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL or internal path",
                type: "string",
                validation: (rule) => rule.required(),
              }),
              defineField({
                name: "openInNewTab",
                title: "Open in new tab",
                type: "boolean",
                initialValue: false,
              }),
              defineField({
                name: "ariaLabel",
                title: "Accessibility label",
                type: "string",
              }),
            ],
          }),
          defineField({
            name: "textColor",
            title: "Text color",
            type: "object",
            fields: [
              defineField({
                name: "tone",
                title: "Approved tone",
                type: "string",
                options: {
                  list: [
                    { title: "Default", value: "default" },
                    { title: "Muted", value: "muted" },
                    { title: "Accent", value: "accent" },
                    { title: "Positive", value: "positive" },
                    { title: "Warning", value: "warning" },
                  ],
                },
                validation: (rule) => rule.required(),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({ type: "contentImage" }),
    defineArrayMember({
      name: "imageGallery",
      title: "Image gallery",
      type: "object",
      fields: [
        defineField({
          name: "images",
          title: "Images",
          type: "array",
          of: [defineArrayMember({ type: "contentImage" })],
          validation: (rule) => rule.required().min(2).max(20),
        }),
        defineField({
          name: "caption",
          title: "Gallery caption",
          type: "string",
        }),
      ],
      preview: { prepare: () => ({ title: "Image gallery" }) },
    }),
    defineArrayMember({
      name: "embed",
      title: "Embed",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Accessible title",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "url",
          title: "HTTPS embed URL",
          type: "url",
          validation: (rule) => rule.required().uri({ scheme: ["https"] }),
        }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
      preview: { select: { title: "title", subtitle: "url" } },
    }),
    defineArrayMember({
      name: "contentTable",
      title: "Table",
      type: "object",
      fields: [
        defineField({
          name: "caption",
          title: "Accessible caption",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "rows",
          title: "Rows",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "tableRow",
              fields: [
                defineField({
                  name: "cells",
                  title: "Cells",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                  validation: (rule) => rule.required().min(1),
                }),
              ],
              preview: {
                select: { cells: "cells" },
                prepare: ({ cells }) => ({
                  title: Array.isArray(cells) ? cells.join(" | ") : "Row",
                }),
              },
            }),
          ],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: "firstRowIsHeader",
          title: "First row is a header",
          type: "boolean",
          initialValue: true,
        }),
      ],
      preview: { select: { title: "caption" } },
    }),
    defineArrayMember({
      name: "callout",
      title: "Callout",
      type: "object",
      fields: [
        defineField({
          name: "tone",
          title: "Tone",
          type: "string",
          options: { list: ["info", "success", "warning", "critical"] },
          initialValue: "info",
          validation: (rule) => rule.required(),
        }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "body",
          title: "Body",
          type: "array",
          of: [defineArrayMember({ type: "block" })],
          validation: (rule) => rule.required(),
        }),
      ],
      preview: { select: { title: "title", subtitle: "tone" } },
    }),
    defineArrayMember({
      name: "portableCta",
      title: "Call to action",
      type: "callToAction",
    }),
    defineArrayMember({
      name: "codeBlock",
      title: "Code block",
      type: "object",
      fields: [
        defineField({ name: "filename", title: "Filename", type: "string" }),
        defineField({ name: "language", title: "Language", type: "string" }),
        defineField({
          name: "code",
          title: "Code",
          type: "text",
          rows: 12,
          validation: (rule) => rule.required(),
        }),
      ],
      preview: {
        select: { title: "filename", subtitle: "language" },
        prepare: ({ title, subtitle }) => ({
          title: title || "Code block",
          subtitle,
        }),
      },
    }),
  ],
});
