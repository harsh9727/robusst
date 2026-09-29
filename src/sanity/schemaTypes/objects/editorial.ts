import { defineArrayMember, defineField, defineType } from "sanity";

const supportedIconKeys = [
  "Activity",
  "AlertTriangle",
  "BadgeCheck",
  "Ban",
  "BarChart3",
  "BellOff",
  "BellRing",
  "Boxes",
  "Brain",
  "BrainCircuit",
  "Building2",
  "Cable",
  "CalendarDays",
  "Car",
  "ClipboardCheck",
  "Clock",
  "Cloud",
  "Cpu",
  "Database",
  "DollarSign",
  "FaChartLine",
  "FaTags",
  "FileSearch",
  "FileText",
  "Fingerprint",
  "FaInstagram",
  "FaLinkedinIn",
  "GaugeCircle",
  "Gift",
  "GitBranch",
  "Globe",
  "Globe2",
  "Handshake",
  "Headphones",
  "Headset",
  "Heart",
  "HeartHandshake",
  "HeartPulse",
  "Home",
  "Landmark",
  "Languages",
  "Layers",
  "LayoutDashboard",
  "Link2",
  "Lock",
  "LuBrainCircuit",
  "LuNetwork",
  "IoLogoYoutube",
  "MapPin",
  "MapPinned",
  "MdFeedback",
  "MdSecurity",
  "Megaphone",
  "MessageSquare",
  "MessageSquareText",
  "Milk",
  "Network",
  "Paintbrush",
  "Pencil",
  "Percent",
  "Phone",
  "PhoneCall",
  "Pill",
  "Plane",
  "Plug",
  "Radio",
  "RefreshCcw",
  "RefreshCw",
  "Rocket",
  "Route",
  "SearchX",
  "Server",
  "Settings",
  "Settings2",
  "ShieldAlert",
  "ShieldCheck",
  "Shirt",
  "ShoppingBag",
  "ShoppingCart",
  "Signal",
  "Sliders",
  "Smartphone",
  "Sparkles",
  "Star",
  "Tags",
  "Target",
  "Timer",
  "TrendingUp",
  "Truck",
  "Tv",
  "UserCheck",
  "UserPlus",
  "Users",
  "Wallet",
  "Wifi",
  "Wine",
  "Workflow",
  "Wrench",
  "Zap",
] as const;

export const contentImage = defineType({
  name: "contentImage",
  title: "Editorial image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true, metadata: ["blurhash", "lqip", "palette"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      description: "Describe the image's purpose. Do not repeat nearby copy.",
      type: "string",
      validation: (rule) => rule.required().min(2).max(240),
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({ name: "credit", title: "Credit", type: "string" }),
  ],
  preview: {
    select: { title: "alt", media: "image", subtitle: "caption" },
  },
});

export const contentFile = defineType({
  name: "contentFile",
  title: "Editorial file",
  type: "object",
  fields: [
    defineField({
      name: "file",
      title: "File",
      type: "file",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Download label",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
  ],
});

export const contentLink = defineType({
  name: "contentLink",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Visible label",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "kind",
      title: "Link type",
      type: "string",
      initialValue: "internal",
      options: {
        layout: "radio",
        list: [
          { title: "Internal page", value: "internal" },
          { title: "External website", value: "external" },
          { title: "Email", value: "email" },
          { title: "Phone", value: "phone" },
          { title: "Download", value: "download" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Destination",
      description:
        "Internal links must start with /. Email and phone values may use mailto: or tel:.",
      type: "string",
      hidden: ({ parent }) => parent?.kind === "download",
      validation: (rule) =>
        rule.custom((value, context) => {
          const kind =
            context.parent &&
            typeof context.parent === "object" &&
            "kind" in context.parent
              ? context.parent.kind
              : undefined;
          if (kind === "download") return true;
          if (!value) return "A destination is required";
          if (
            kind === "internal" &&
            !value.startsWith("/") &&
            !value.startsWith("#")
          )
            return "Internal destinations must start with / or #";
          if (kind === "external" && !/^https:\/\//i.test(value))
            return "External destinations must use HTTPS";
          return true;
        }),
    }),
    defineField({
      name: "download",
      title: "Download",
      type: "contentFile",
      hidden: ({ parent }) => parent?.kind !== "download",
    }),
    defineField({
      name: "ariaLabel",
      title: "Accessibility label",
      type: "string",
    }),
    defineField({
      name: "iconKey",
      title: "Icon",
      description: "Optional icon used when the link is rendered as an icon.",
      type: "string",
      options: {
        list: supportedIconKeys.map((value) => ({ title: value, value })),
      },
      validation: (rule) =>
        rule.custom((value) =>
          !value || (supportedIconKeys as readonly string[]).includes(value)
            ? true
            : "Choose a supported icon",
        ),
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in a new tab",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.kind === "internal",
    }),
  ],
});

export const callToAction = defineType({
  name: "callToAction",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "link",
      title: "Link",
      type: "contentLink",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "style",
      title: "Fixed visual style",
      type: "string",
      initialValue: "primary",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Text", value: "text" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "link.label", subtitle: "link.href" } },
});

export const externalVideo = defineType({
  name: "externalVideo",
  title: "Video",
  type: "object",
  fields: [
    defineField({
      name: "provider",
      title: "Provider",
      type: "string",
      initialValue: "youtube",
      options: { list: ["youtube", "vimeo", "sanityFile"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "videoId",
      title: "YouTube/Vimeo video ID",
      type: "string",
      hidden: ({ parent }) => parent?.provider === "sanityFile",
    }),
    defineField({
      name: "videoFile",
      title: "Uploaded video",
      type: "file",
      options: { accept: "video/*" },
      hidden: ({ parent }) => parent?.provider !== "sanityFile",
    }),
    defineField({
      name: "title",
      title: "Accessible title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "poster", title: "Poster", type: "contentImage" }),
    defineField({
      name: "transcript",
      title: "Transcript",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
  ],
});

export const statistic = defineType({
  name: "statistic",
  title: "Statistic",
  type: "object",
  fields: [
    defineField({ name: "prefix", title: "Prefix", type: "string" }),
    defineField({
      name: "value",
      title: "Value",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "suffix", title: "Suffix", type: "string" }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "string" }),
  ],
  preview: {
    select: {
      title: "label",
      value: "value",
      prefix: "prefix",
      suffix: "suffix",
    },
    prepare: ({ title, value, prefix, suffix }) => ({
      title,
      subtitle: `${prefix ?? ""}${value ?? ""}${suffix ?? ""}`,
    }),
  },
});

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "question" } },
});

export const contentCard = defineType({
  name: "contentCard",
  title: "Content card",
  type: "object",
  fields: [
    defineField({
      name: "internalName",
      title: "Internal name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({
      name: "latitude",
      title: "Map latitude",
      type: "number",
      validation: (rule) => rule.min(-90).max(90),
    }),
    defineField({
      name: "longitude",
      title: "Map longitude",
      type: "number",
      validation: (rule) => rule.min(-180).max(180),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({ name: "image", title: "Image", type: "contentImage" }),
    defineField({ name: "video", title: "Video", type: "externalVideo" }),
    defineField({
      name: "iconKey",
      title: "Icon",
      description: "Choose an icon supported by the website.",
      type: "string",
      options: {
        list: supportedIconKeys.map((value) => ({ title: value, value })),
      },
      validation: (rule) =>
        rule.custom((value) =>
          !value || (supportedIconKeys as readonly string[]).includes(value)
            ? true
            : "Choose a supported icon",
        ),
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "cta", title: "Call to action", type: "callToAction" }),
  ],
  preview: {
    select: { title: "title", subtitle: "internalName", media: "image.image" },
  },
});

export const contentGroup = defineType({
  name: "contentGroup",
  title: "Content group",
  type: "object",
  fields: [
    defineField({
      name: "internalName",
      title: "Internal name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({ name: "image", title: "Image", type: "contentImage" }),
    defineField({
      name: "labels",
      title: "Additional labels/copy",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(20),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [defineArrayMember({ type: "contentCard" })],
      validation: (rule) => rule.required().max(40),
    }),
  ],
  preview: { select: { title: "title", subtitle: "internalName" } },
});

export const logoItem = defineType({
  name: "logoItem",
  title: "Logo",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Organization name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "contentImage",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
  ],
  preview: { select: { title: "name", media: "logo.image" } },
});
