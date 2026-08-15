"use client";

import { documentInternationalization } from "@sanity/document-internationalization";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { sanityEnv } from "./src/sanity/env";
import { sanityLanguages } from "./src/sanity/languages";
import { schemaTypes } from "./src/sanity/schemaTypes";
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
      },
      allowOrigins: [
        "http://localhost:*",
        "https://www.robusst.com",
        "https://*.vercel.app",
      ],
    }),
    visionTool({ defaultApiVersion: sanityEnv.apiVersion }),
    documentInternationalization({
      supportedLanguages: [...sanityLanguages],
      schemaTypes: ["migrationConnectionTest"],
      languageField: "language",
      weakReferences: false,
      bulkPublish: false,
    }),
  ],
  schema: { types: schemaTypes },
});
