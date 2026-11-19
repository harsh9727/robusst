#!/usr/bin/env node

/*
 * Creates the Voice AI Demo page in Sanity for every locale and uploads its
 * orb image and agent video.
 *
 *   pnpm sanity:voice-demo:dry                       # dry run, no writes
 *   pnpm sanity:voice-demo:migrate                   # writes the pages
 *   pnpm sanity:voice-demo:migrate --with-navigation # also adds the Resources menu link
 *
 * Add --out=<file> to save the documents as JSON for review.
 * Add --dataset=<name> to choose a dataset. Writes to "production" also need
 * --allow-production. Staging and production read the same "production"
 * dataset, and the production header shows every Sanity menu link. Use
 * --with-navigation only after production serves the released page (see
 * src/sanity/pageRelease.ts and migration/M15_VOICE_AI_DEMO.md).
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
import {
  commitReferencedPageDocuments,
  splitReferencedPageDocuments,
} from "./lib/referenced-page-migration.mjs";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const PAGE_TYPE = "voiceDemoPage";
const PAGE_PATH = "/voice-ai-demo";
const NAVIGATION_KEY = "voiceAiDemo";
// Section names reuse existing ones so the page adds no new field paths to the
// dataset (Sanity allows at most 2000). See src/sanity/queries/voiceDemoPage.ts.
const SECTION_KEYS = [
  "banner",
  "solutionOverview",
  "listing",
  "keyValueProposition",
  "solutionGrid",
  "detailDialog",
  "businessOutcomes",
  "coreCapabilities",
  "cta",
];
const ASSETS = {
  orb: {
    url: "https://storage.googleapis.com/msgsndr/LK2LrQP5tkIZ3ahmumnr/media/698928520708e4d8649f0642.png",
    type: "image",
    filename: "voice-demo-orb.png",
  },
  video: {
    url: "https://storage.googleapis.com/msgsndr/LK2LrQP5tkIZ3ahmumnr/media/6989285267d749bf9ff413c4.mp4",
    type: "file",
    filename: "voice-demo-agent.mp4",
  },
};

function parseArgs(argv) {
  const options = {
    execute: false,
    withNavigation: false,
    allowProduction: false,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "development",
  };
  for (const argument of argv) {
    if (argument === "--execute") options.execute = true;
    else if (argument === "--with-navigation") options.withNavigation = true;
    else if (argument === "--allow-production") options.allowProduction = true;
    else if (argument.startsWith("--dataset="))
      options.dataset = argument.slice(10);
    else if (argument.startsWith("--out=")) options.out = argument.slice(6);
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

async function loadCopy(locale) {
  const file =
    locale === "en"
      ? "voice-demo.en.json"
      : `voice-demo.${locale}.generated.json`;
  return JSON.parse(
    await readFile(path.join(ROOT, "migration/translations", file), "utf8"),
  );
}

/** Fails early if a translation drifted from the English structure. */
function assertSameShape(source, translated, locale) {
  const shape = (value) =>
    JSON.stringify(value, (_key, item) =>
      typeof item === "string" ? "" : item,
    );
  if (shape(source) !== shape(translated))
    throw new Error(
      `voice-demo.${locale} does not match the English structure`,
    );
  const template = translated.dialects.footerTemplate;
  if (!template.includes("{count}") || !template.includes("{region}"))
    throw new Error(`voice-demo.${locale} footerTemplate lost a placeholder`);
}

function key(value) {
  return value
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
    .slice(0, 40);
}

function statistics(items, prefix) {
  return items.map((item, index) => ({
    _key: `${prefix}-${index}`,
    _type: "statistic",
    ...(item.prefix ? { prefix: item.prefix } : {}),
    value: item.value,
    ...(item.suffix ? { suffix: item.suffix } : {}),
    label: item.label,
  }));
}

function link(label, href) {
  return {
    _type: "callToAction",
    style: "primary",
    link: {
      _type: "contentLink",
      label,
      kind: "internal",
      href,
    },
  };
}

function section(name, fields) {
  return { _type: "fixedSection", internalName: name, ...fields };
}

function buildDocument(locale, copy, english, assets) {
  const { hero, demo, dialectStrip, coverage, dialects, capabilities, cta } =
    copy;
  return {
    _id: `${PAGE_TYPE}-${locale}`,
    _type: PAGE_TYPE,
    internalTitle: `Voice AI Demo page — ${locale.toUpperCase()}`,
    language: locale,
    seo: {
      _type: "seo",
      metaTitle: copy.seo.metaTitle,
      metaDescription: copy.seo.metaDescription,
      keywords: copy.seo.keywords,
      socialTitle: copy.seo.socialTitle,
      socialDescription: copy.seo.socialDescription,
      noIndex: false,
    },
    translation: {
      _type: "translationWorkflow",
      status: locale === "en" ? "source" : "generated",
      sourceLanguage: "en",
      reviewNotes:
        locale === "en"
          ? "Canonical copy from the approved voice-demo.html landing page."
          : "Generated from the English source. Human review required, especially dialect and city names.",
    },
    banner: section("banner", {
      eyebrow: hero.eyebrow,
      title: hero.title,
      titleHighlight: hero.titleHighlight,
      subtitle: hero.subtitle,
      description: hero.ctaNote,
      // The hero button scrolls to the demo card and starts the call.
      primaryCta: link(hero.ctaLabel, "#voice-demo"),
      // Shown as cards, not statistics: the "Under" prefix would add a new
      // field path (content.statistics[].prefix) to the dataset.
      items: hero.statistics.map((item, index) => ({
        _key: `hero-${index}`,
        _type: "contentCard",
        internalName: english.hero.statistics[index].label,
        title: `${item.prefix ?? ""}${item.value}${item.suffix ?? ""}`,
        description: item.label,
      })),
    }),
    solutionOverview: section("solutionOverview", {
      title: demo.cardLabel,
      subtitle: demo.tagline,
      image: {
        _type: "contentImage",
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: assets.orb },
        },
        alt: demo.orbAlt,
      },
      video: {
        _type: "externalVideo",
        provider: "sanityFile",
        videoFile: {
          _type: "file",
          asset: { _type: "reference", _ref: assets.video },
        },
        title: demo.videoTitle,
      },
      // Order matters: see src/sanity/queries/voiceDemoPage.ts.
      labels: [
        demo.orbAriaLabel,
        demo.tapToTalk,
        demo.connecting,
        demo.speaking,
        demo.connected,
        demo.endCall,
        demo.statusStarting,
        demo.statusConnecting,
        demo.errorNeedsHttps,
        demo.errorLibrary,
        demo.errorUnreachable,
        demo.errorBusy,
        demo.errorFailed,
        demo.errorMicrophone,
      ],
    }),
    listing: section("listing", {
      title: dialectStrip.ariaLabel,
      eyebrow: dialectStrip.totalValue,
      subtitle: dialectStrip.totalLabel,
    }),
    keyValueProposition: section("keyValueProposition", {
      eyebrow: coverage.eyebrow,
      title: coverage.title,
      titleHighlight: coverage.titleHighlight,
      description: coverage.description,
      statistics: statistics(coverage.statistics, "coverage"),
    }),
    solutionGrid: section("solutionGrid", {
      title: dialects.title,
      description: dialects.description,
      labels: dialects.chips,
      paragraphs: [dialects.caveat],
      // Keys come from the English names so they stay stable across locales.
      groups: dialects.regions.map((region, regionIndex) => {
        const englishRegion = english.dialects.regions[regionIndex];
        return {
          _key: key(englishRegion.name),
          _type: "contentGroup",
          internalName: englishRegion.name,
          title: region.name,
          items: region.languages.map((language, languageIndex) => {
            const englishLanguage = englishRegion.languages[languageIndex];
            return {
              _key: `${key(englishRegion.name)}-${key(englishLanguage.name)}`,
              _type: "contentCard",
              internalName: englishLanguage.name,
              title: language.name,
              // One dialect per line. The query splits the lines.
              description: language.dialects.join("\n"),
            };
          }),
        };
      }),
    }),
    detailDialog: section("detailDialog", {
      // Order matters: see src/sanity/queries/voiceDemoPage.ts.
      labels: [
        dialects.regionsAriaLabel,
        dialects.moreLabel,
        dialects.footerTemplate,
      ],
    }),
    businessOutcomes: section("businessOutcomes", {
      items: copy.outcomes.map((outcome, index) => ({
        _key: key(english.outcomes[index].title),
        _type: "contentCard",
        internalName: english.outcomes[index].title,
        title: outcome.title,
        description: outcome.description,
        iconKey: outcome.iconKey,
      })),
    }),
    coreCapabilities: section("coreCapabilities", {
      eyebrow: capabilities.eyebrow,
      title: capabilities.title,
      titleHighlight: capabilities.titleHighlight,
      items: capabilities.items.map((item, index) => ({
        _key: key(english.capabilities.items[index].title),
        _type: "contentCard",
        internalName: english.capabilities.items[index].title,
        ...(item.badge ? { eyebrow: item.badge } : {}),
        title: item.title,
        description: item.description,
        iconKey: item.iconKey,
      })),
    }),
    cta: section("cta", {
      title: cta.title,
      description: cta.description,
      primaryCta: link(cta.ctaLabel, "/contact"),
    }),
  };
}

/** Collects field paths the way Sanity counts attributes (path + datatype). */
function collectPaths(value, prefix, paths) {
  const type =
    value === null ? "null" : Array.isArray(value) ? "array" : typeof value;
  paths.add(`${prefix}:${type}`);
  if (Array.isArray(value))
    for (const item of value) collectPaths(item, `${prefix}[]`, paths);
  else if (value && typeof value === "object")
    for (const [field, item] of Object.entries(value))
      collectPaths(item, prefix ? `${prefix}.${field}` : field, paths);
  return paths;
}

/** Counts field paths that the written documents would add to the dataset. */
async function countNewPaths(client, writtenDocuments) {
  const existingPaths = new Set();
  for (const document of await client.fetch("*[]"))
    collectPaths(document, "", existingPaths);
  const added = new Set();
  for (const document of writtenDocuments)
    for (const fieldPath of collectPaths(document, "", new Set()))
      if (!existingPaths.has(fieldPath)) added.add(fieldPath);
  return [...added].sort();
}

async function uploadAsset(client, asset) {
  const response = await fetch(asset.url);
  if (!response.ok)
    throw new Error(`Download failed (${response.status}): ${asset.url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  // Sanity deduplicates uploads by content hash, so re-runs reuse the asset.
  const document = await client.assets.upload(asset.type, buffer, {
    filename: asset.filename,
    source: { name: "voice-demo-migration", id: asset.url, url: asset.url },
  });
  return document._id;
}

async function checkAsset(asset) {
  const response = await fetch(asset.url, { method: "HEAD" });
  if (!response.ok)
    throw new Error(
      `Asset is not reachable (${response.status}): ${asset.url}`,
    );
  return {
    url: asset.url,
    contentType: response.headers.get("content-type"),
    bytes: Number(response.headers.get("content-length") ?? 0),
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
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  if (options.execute && !process.env.SANITY_API_WRITE_TOKEN)
    throw new Error("Missing SANITY_API_WRITE_TOKEN");

  const english = await loadCopy("en");
  const copies = {};
  for (const locale of LOCALES) {
    copies[locale] = await loadCopy(locale);
    assertSameShape(english, copies[locale], locale);
  }

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: options.dataset,
    apiVersion: "2026-08-15",
    useCdn: false,
    perspective: "raw",
    token: options.execute
      ? process.env.SANITY_API_WRITE_TOKEN
      : process.env.SANITY_API_READ_TOKEN,
  });

  const assets = options.execute
    ? {
        orb: await uploadAsset(client, ASSETS.orb),
        video: await uploadAsset(client, ASSETS.video),
      }
    : { orb: "image-dry-run", video: "file-dry-run" };
  const assetCheck = options.execute
    ? null
    : {
        orb: await checkAsset(ASSETS.orb),
        video: await checkAsset(ASSETS.video),
      };

  const documents = LOCALES.map((locale) =>
    buildDocument(locale, copies[locale], english, assets),
  );
  documents.push({
    _id: `translation.metadata.${PAGE_TYPE}`,
    _type: "translation.metadata",
    schemaTypes: [PAGE_TYPE],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `${PAGE_TYPE}-${locale}` },
    })),
  });

  const split = splitReferencedPageDocuments(documents, {
    pageType: PAGE_TYPE,
    sectionKeys: SECTION_KEYS,
    pageTitle: "Voice AI Demo",
  });

  const settings = await client.fetch(
    '*[_type == "siteSettings" && language in $locales && !(_id in path("drafts.**"))]',
    { locales: LOCALES },
  );
  const navigationPatches = [];
  for (const setting of settings) {
    const current = setting.resourcesNavigation ?? [];
    if (current.some((item) => item.href === PAGE_PATH)) continue;
    navigationPatches.push({
      id: setting._id,
      document: setting,
      resourcesNavigation: [
        ...current,
        {
          _key: NAVIGATION_KEY,
          _type: "contentLink",
          label: copies[setting.language].navigationLabel,
          kind: "internal",
          href: PAGE_PATH,
          openInNewTab: false,
        },
      ],
    });
  }

  const writtenDocuments = [
    ...split.sectionDocuments,
    ...split.pageDocuments,
    ...split.otherDocuments,
    ...(options.withNavigation
      ? navigationPatches.map((patch) => ({
          ...patch.document,
          resourcesNavigation: patch.resourcesNavigation,
        }))
      : []),
  ];
  const newPaths = await countNewPaths(client, writtenDocuments);

  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        newFieldPaths: newPaths,
        dataset: options.dataset,
        pages: split.pageDocuments.map((document) => document._id),
        sectionDocuments: split.sectionDocuments.length,
        translationMetadata: 1,
        assets: assetCheck ?? assets,
        navigation: {
          willUpdate: options.withNavigation,
          settingsNeedingLink: navigationPatches.map((patch) => patch.id),
          labels: Object.fromEntries(
            LOCALES.map((locale) => [locale, copies[locale].navigationLabel]),
          ),
        },
      },
      null,
      2,
    ),
  );
  if (options.out) {
    await writeFile(
      options.out,
      `${JSON.stringify(writtenDocuments, null, 2)}\n`,
    );
    console.log(`Wrote ${writtenDocuments.length} documents to ${options.out}`);
  }
  if (!options.execute) return;

  // A dataset over the field-path limit rejects every write, including
  // editors publishing in Studio. Never add paths without a deliberate review.
  if (newPaths.length > 0)
    throw new Error(
      `Refusing to write: ${newPaths.length} new field paths. Reuse existing fields instead.`,
    );

  const result = await commitReferencedPageDocuments(client, split);
  console.log(
    `Committed ${result.documentIds.length} Voice AI Demo documents.`,
  );
  if (options.withNavigation && navigationPatches.length) {
    let transaction = client.transaction();
    for (const patch of navigationPatches)
      transaction = transaction.patch(patch.id, (builder) =>
        builder.set({ resourcesNavigation: patch.resourcesNavigation }),
      );
    await transaction.commit({ visibility: "sync" });
    console.log(
      `Added the Resources link in ${navigationPatches.length} locales.`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
