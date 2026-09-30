"use client";

import { documentInternationalization } from "@sanity/document-internationalization";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { sanityEnv } from "./src/sanity/env";
import { sanityLanguages } from "./src/sanity/languages";
import { presentationResolve } from "./src/sanity/presentation/resolve";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { localizedPageTypeNames } from "./src/sanity/schemaTypes/documents/pages";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "robusst",
  title: "Robusst",
  basePath: "/studio",
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        initial: sanityEnv.previewOrigin,
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
      resolve: presentationResolve,
      allowOrigins: [
        "http://localhost:*",
        "https://www.robusst.com",
        "https://staging.robusst.com",
        "https://*.vercel.app",
      ],
    }),
    visionTool({ defaultApiVersion: sanityEnv.apiVersion }),
    documentInternationalization({
      supportedLanguages: [...sanityLanguages],
      schemaTypes: [
        "siteSettings",
        ...localizedPageTypeNames,
        "author",
        "blogPost",
        "jobPosting",
        "successStory",
      ],
      languageField: "language",
      weakReferences: false,
      bulkPublish: false,
    }),
  ],
  schema: { types: schemaTypes },
  document: {
    actions: (previousActions, context) => {
      if (context.schemaType === "formSubmission") {
        return previousActions.filter(
          (action) => action.action !== "duplicate",
        );
      }
      const protectedTypes = new Set([
        "siteSettings",
        "languageSettings",
        "fixedPageSection",
        ...localizedPageTypeNames,
      ]);
      if (!protectedTypes.has(context.schemaType)) return previousActions;
      return previousActions.filter(
        (action) => action.action !== "delete" && action.action !== "duplicate",
      );
    },
    newDocumentOptions: (previousOptions) => {
      const protectedTypes = new Set([
        "siteSettings",
        "languageSettings",
        "fixedPageSection",
        "formSubmission",
        ...localizedPageTypeNames,
      ]);
      return previousOptions.filter(
        (option) => !protectedTypes.has(option.templateId),
      );
    },
  },
});
