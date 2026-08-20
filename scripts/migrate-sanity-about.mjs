#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const LOCALIZED_DEFAULT_TITLES = {
  en: "About Robusst | AI-Powered Telecom Solutions",
  fr: "À propos de Robusst | Solutions télécoms alimentées par l’IA",
  ru: "О компании Robusst | ИИ-решения для телекоммуникаций",
  pt: "Sobre a Robusst | Soluções de IA para telecomunicações",
  es: "Sobre Robusst | Soluciones de IA para telecomunicaciones",
  ar: "عن Robusst | حلول اتصالات مدعومة بالذكاء الاصطناعي",
};
const stableKey = (value) =>
  createHash("sha1").update(value).digest("hex").slice(0, 12);

function parseArgs(argv) {
  const options = {
    execute: false,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "development",
    allowProduction: false,
  };
  for (const argument of argv) {
    if (argument === "--execute") options.execute = true;
    else if (argument === "--allow-production") options.allowProduction = true;
    else if (argument.startsWith("--dataset="))
      options.dataset = argument.slice(10);
    else throw new Error(`Unknown argument: ${argument}`);
  }
  if (
    options.execute &&
    options.dataset === "production" &&
    !options.allowProduction
  )
    throw new Error("Production writes require --allow-production");
  return options;
}

async function activeAbout(locale) {
  const url = new URL("/api/v1/content", process.env.CMS_BASE_URL);
  url.searchParams.set("schema", "aboutpage");
  url.searchParams.set("locale", locale);
  const response = await fetch(url, {
    headers: { "x-api-key": process.env.CMS_API_KEY },
  });
  if (!response.ok)
    throw new Error(
      `Active About request failed for ${locale}: ${response.status}`,
    );
  const body = await response.json();
  if (!body.data?.content?.aboutPage)
    throw new Error(`Active About content is empty for ${locale}`);
  return body.data.content.aboutPage;
}

function assetIndex(assetMap) {
  return new Map(
    Object.values(assetMap.assets).flatMap((asset) =>
      asset.sourcePaths.map((sourcePath) => [sourcePath, asset]),
    ),
  );
}
function image(assetByPath, publicPath, alt) {
  const asset = assetByPath.get(publicPath);
  if (!asset) throw new Error(`Missing mapped asset ${publicPath}`);
  return {
    _type: "contentImage",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: asset.sanityAssetId },
    },
    alt,
  };
}
function section(internalName, fields) {
  return { _type: "fixedSection", internalName, ...fields };
}
function cards(locale, root, items, includeDescription = true) {
  return items.map((item, index) => ({
    _key: stableKey(`${locale}.${root}.${index}`),
    _type: "contentCard",
    internalName: `${root}-${index + 1}`,
    title: item.title,
    description: includeDescription ? item.description : undefined,
    iconKey: item.icon,
  }));
}
function metadataFor(baseline, locale, about) {
  const capture = baseline.captures.find(
    (item) =>
      item.locale === locale &&
      item.routeId === "about" &&
      item.viewport === "desktop",
  );
  const baselineDescription = capture?.page.metas.find(
    (meta) => meta.name === "description",
  )?.content;
  const localizedDescription =
    `${about.hero.description} ${about.hero.subDescription}`
      .trim()
      .slice(0, 170);
  return {
    title: LOCALIZED_DEFAULT_TITLES[locale],
    description: locale === "en" ? baselineDescription : localizedDescription,
  };
}

async function main() {
  if (typeof process.loadEnvFile === "function") {
    try {
      process.loadEnvFile(path.join(ROOT, ".env"));
    } catch {
      /* CI supplies environment variables. */
    }
  }
  const options = parseArgs(process.argv.slice(2));
  if (
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    !process.env.CMS_BASE_URL ||
    !process.env.CMS_API_KEY
  )
    throw new Error(
      "Missing Sanity or active-content environment configuration",
    );
  if (options.execute && !process.env.SANITY_API_WRITE_TOKEN)
    throw new Error("Missing SANITY_API_WRITE_TOKEN");
  const [assetMap, baseline] = await Promise.all([
    readFile(
      path.join(ROOT, `migration/sanity/asset-map.${options.dataset}.json`),
      "utf8",
    ).then(JSON.parse),
    readFile(path.join(ROOT, "migration/baseline/report.json"), "utf8").then(
      JSON.parse,
    ),
  ]);
  const assetByPath = assetIndex(assetMap);
  const documents = [];
  for (const locale of LOCALES) {
    const about = await activeAbout(locale);
    const meta = metadataFor(baseline, locale, about);
    documents.push({
      _id: `aboutPage-${locale}`,
      _type: "aboutPage",
      internalTitle: `About page — ${locale.toUpperCase()}`,
      seo: {
        _type: "seo",
        metaTitle: meta.title,
        metaDescription: meta.description,
        noIndex: false,
      },
      language: locale,
      translation: {
        _type: "translationWorkflow",
        status: locale === "en" ? "source" : "generated",
        sourceLanguage: "en",
        reviewNotes:
          locale === "en"
            ? "Canonical content migrated from the active production experience."
            : "Migrated from active production content; human language review required.",
      },
      hero: section("hero", {
        title: about.hero.title,
        description: about.hero.description,
        paragraphs: [about.hero.subDescription],
        image: image(assetByPath, "/about/team.webp", about.hero.title),
      }),
      mission: section("mission", {
        title: about.mission.heading,
        paragraphs: about.mission.paragraphs,
        image: image(assetByPath, about.mission.image, about.mission.heading),
      }),
      vision: section("vision", {
        title: about.vision.heading,
        labels: about.vision.items,
        image: image(assetByPath, about.vision.image, about.vision.heading),
      }),
      purpose: section("purpose", {
        title: about.ourPurpose.heading,
        paragraphs: about.ourPurpose.paragraphs,
        image: image(
          assetByPath,
          "/pics/about_office.webp",
          about.ourPurpose.heading,
        ),
      }),
      values: section("values", {
        title: about.values.heading,
        items: cards(locale, "value", about.values.items),
      }),
      whatDefinesUs: section("whatDefinesUs", {
        title: about.whatDefinesUs.heading,
        paragraphs: about.whatDefinesUs.paragraphs,
        image: image(
          assetByPath,
          "/pics/full_office.webp",
          about.whatDefinesUs.heading,
        ),
      }),
      challenges: section("challenges", {
        title: about.challenges.heading,
        paragraphs: about.challenges.paragraphs,
        items: cards(locale, "challenge", about.challenges.items, false),
      }),
    });
  }
  documents.push({
    _id: "translation.metadata.aboutPage",
    _type: "translation.metadata",
    schemaTypes: ["aboutPage"],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `aboutPage-${locale}` },
    })),
  });
  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        aboutPages: 6,
        translationMetadata: 1,
      },
      null,
      2,
    ),
  );
  if (!options.execute) return;
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: options.dataset,
    apiVersion: "2026-08-15",
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
  });
  let transaction = client.transaction();
  for (const document of documents)
    transaction = transaction.createOrReplace(document);
  const result = await transaction.commit({ visibility: "sync" });
  console.log(`Committed ${result.documentIds.length} About documents.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
