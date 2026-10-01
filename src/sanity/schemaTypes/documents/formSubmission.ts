import { defineField, defineType } from "sanity";
import { sanityLanguageIds } from "../../languages";

const submissionTypes = [
  { title: "Contact", value: "contact" },
  { title: "POC waitlist", value: "poc" },
  { title: "Partnership", value: "partner" },
] as const;

export const formSubmission = defineType({
  name: "formSubmission",
  title: "Form submission",
  type: "document",
  liveEdit: true,
  groups: [
    { name: "submission", title: "Submission", default: true },
    { name: "workflow", title: "Workflow" },
  ],
  fields: [
    defineField({
      name: "submissionType",
      title: "Form",
      type: "string",
      options: { list: [...submissionTypes] },
      readOnly: true,
      group: "submission",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      readOnly: true,
      group: "submission",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "locale",
      title: "Website language",
      type: "string",
      options: {
        list: sanityLanguageIds.map((value) => ({
          title: value.toUpperCase(),
          value,
        })),
      },
      readOnly: true,
      group: "submission",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sourcePath",
      title: "Source page",
      type: "string",
      readOnly: true,
      group: "submission",
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      readOnly: true,
      group: "submission",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
      group: "submission",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      readOnly: true,
      group: "submission",
    }),
    defineField({
      name: "companyName",
      title: "Company",
      type: "string",
      readOnly: true,
      group: "submission",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      readOnly: true,
      group: "submission",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 8,
      readOnly: true,
      group: "submission",
    }),
    defineField({
      name: "jobTitle",
      title: "Job title",
      type: "string",
      readOnly: true,
      group: "submission",
    }),
    defineField({
      name: "companyWebsite",
      title: "Company website",
      type: "string",
      readOnly: true,
      group: "submission",
    }),
    defineField({
      name: "partnerType",
      title: "Partner type",
      type: "string",
      options: {
        list: [
          { title: "Sales", value: "sales" },
          { title: "Technology", value: "tech" },
        ],
      },
      readOnly: true,
      group: "submission",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "In progress", value: "inProgress" },
          { title: "Resolved", value: "resolved" },
          { title: "Spam", value: "spam" },
        ],
        layout: "radio",
      },
      initialValue: "new",
      group: "workflow",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "notificationEmailStatus",
      title: "Internal notification email",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Sent", value: "sent" },
          { title: "Failed", value: "failed" },
        ],
      },
      readOnly: true,
      group: "workflow",
    }),
    defineField({
      name: "confirmationEmailStatus",
      title: "Submitter confirmation email",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Sent", value: "sent" },
          { title: "Failed", value: "failed" },
        ],
      },
      readOnly: true,
      group: "workflow",
    }),
    defineField({
      name: "emailLastAttemptAt",
      title: "Last email attempt",
      type: "datetime",
      readOnly: true,
      group: "workflow",
    }),
    defineField({
      name: "emailDeliveryError",
      title: "Email delivery error",
      type: "text",
      rows: 4,
      readOnly: true,
      group: "workflow",
    }),
    defineField({
      name: "internalNotes",
      title: "Internal notes",
      description: "Internal only. Never shown on the public website.",
      type: "text",
      rows: 6,
      group: "workflow",
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Oldest first",
      name: "submittedAtAsc",
      by: [{ field: "submittedAt", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      name: "name",
      email: "email",
      type: "submissionType",
      status: "status",
      submittedAt: "submittedAt",
    },
    prepare: ({ name, email, type, status, submittedAt }) => ({
      title: name || email || "Form submission",
      subtitle: [
        type?.toUpperCase(),
        status,
        submittedAt ? new Date(submittedAt).toLocaleString() : undefined,
      ]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
