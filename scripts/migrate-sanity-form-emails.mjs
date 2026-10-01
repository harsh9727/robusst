#!/usr/bin/env node

import path from "node:path";
import { createClient } from "@sanity/client";
import { FORM_EMAIL_COPY, formEmailTemplate } from "./lib/form-email-copy.mjs";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const execute = process.argv.includes("--execute");
const allowProduction = process.argv.includes("--allow-production");
const dataset =
  process.argv
    .find((argument) => argument.startsWith("--dataset="))
    ?.slice(10) ??
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  "development";

if (typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile(path.join(ROOT, ".env"));
  } catch {
    // CI provides environment variables directly.
  }
}
if (execute && dataset === "production" && !allowProduction) {
  throw new Error("Production writes require --allow-production");
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset,
  apiVersion: "2026-08-15",
  useCdn: false,
  token: execute
    ? process.env.SANITY_API_WRITE_TOKEN
    : process.env.SANITY_API_READ_TOKEN,
});
const settings = await client.fetch(
  '*[_type == "siteSettings"]{_id, language}',
);
const localizedSettings = settings.filter((setting) =>
  LOCALES.includes(setting.language),
);
if (localizedSettings.length !== LOCALES.length) {
  throw new Error(
    `Expected ${LOCALES.length} localized settings documents; found ${localizedSettings.length}`,
  );
}

console.log(
  JSON.stringify(
    {
      dataset,
      execute,
      settingsToUpdate: localizedSettings.length,
      locales: localizedSettings.map((setting) => setting.language).sort(),
    },
    null,
    2,
  ),
);

if (execute) {
  let transaction = client.transaction();
  for (const setting of localizedSettings) {
    const copy = FORM_EMAIL_COPY[setting.language];
    transaction = transaction.patch(setting._id, (patch) =>
      patch.set({
        contactFormEmail: formEmailTemplate(copy.contact),
        pocFormEmail: formEmailTemplate(copy.poc),
        partnerFormEmail: formEmailTemplate(copy.partner),
      }),
    );
  }
  await transaction.commit({ visibility: "sync" });
}
