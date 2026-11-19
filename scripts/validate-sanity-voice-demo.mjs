#!/usr/bin/env node

/* Read-only check of the Voice AI Demo page in every locale. */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const PAGE_PATH = "/voice-ai-demo";

async function main() {
  if (typeof process.loadEnvFile === "function") {
    try {
      process.loadEnvFile(path.join(ROOT, ".env"));
    } catch {
      /* CI supplies environment variables. */
    }
  }
  const dataset =
    process.argv
      .find((argument) => argument.startsWith("--dataset="))
      ?.slice(10) ??
    process.env.NEXT_PUBLIC_SANITY_DATASET ??
    "development";
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    apiVersion: "2026-08-15",
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN,
  });
  const [pages, metadata, settings] = await Promise.all([
    client.fetch(`*[_type == "voiceDemoPage" && !(_id in path("drafts.**"))]{
      _id, language, seo,
      "hero": banner->content,
      "dialectStrip": listing->content,
      "coverage": keyValueProposition->content,
      "dialects": solutionGrid->content,
      "dialectsUi": detailDialog->content,
      "outcomes": businessOutcomes->content,
      "capabilities": coreCapabilities->content,
      "cta": cta->content,
      "orb": solutionOverview->content.image.image.asset->url
    }`),
    client.fetch(
      '*[_type == "translation.metadata" && "voiceDemoPage" in schemaTypes][0]{"references": translations[].value->_id}',
    ),
    client.fetch(
      '*[_type == "siteSettings" && !(_id in path("drafts.**"))]{language, "hasLink": $path in resourcesNavigation[].href}',
      { path: PAGE_PATH },
    ),
  ]);
  const issues = [];
  const english = pages.find((page) => page.language === "en");
  for (const locale of LOCALES) {
    const page = pages.find((item) => item.language === locale);
    if (!page) {
      issues.push(`${locale}: page document is missing`);
      continue;
    }
    const required = {
      "seo.metaTitle": page.seo?.metaTitle,
      "seo.metaDescription": page.seo?.metaDescription,
      "hero.title": page.hero?.title,
      "hero.primaryCta": page.hero?.primaryCta?.link?.label,
      "coverage.title": page.coverage?.title,
      "dialects.title": page.dialects?.title,
      "capabilities.title": page.capabilities?.title,
      "cta.title": page.cta?.title,
      "demo.image": page.orb,
    };
    for (const [field, value] of Object.entries(required))
      if (!value) issues.push(`${locale}: ${field} is empty`);
    if (page.seo?.noIndex) issues.push(`${locale}: page is marked noindex`);
    const ui = page.dialectsUi?.labels ?? [];
    if (
      ui.length !== 3 ||
      !ui[2]?.includes("{count}") ||
      !ui[2]?.includes("{region}")
    )
      issues.push(`${locale}: dialectsUi labels are incomplete`);
    if (
      english &&
      page.dialects?.groups?.length !== english.dialects?.groups?.length
    )
      issues.push(`${locale}: region count differs from English`);
    if (
      english &&
      page.capabilities?.items?.length !== english.capabilities?.items?.length
    )
      issues.push(`${locale}: capability count differs from English`);
    if (!metadata?.references?.includes(`voiceDemoPage-${locale}`))
      issues.push(`${locale}: missing from translation metadata`);
  }
  const navigation = Object.fromEntries(
    settings.map((setting) => [setting.language, setting.hasLink]),
  );
  const report = {
    dataset,
    checkedAt: new Date().toISOString(),
    pages: pages.map((page) => page._id).sort(),
    resourcesMenuLink: navigation,
    issues,
  };
  await mkdir(path.join(ROOT, "migration/sanity"), { recursive: true });
  await writeFile(
    path.join(ROOT, `migration/sanity/voice-demo-report.${dataset}.json`),
    `${JSON.stringify(report, null, 2)}\n`,
  );
  console.log(JSON.stringify(report, null, 2));
  if (issues.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
