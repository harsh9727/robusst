#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const PLATFORM_IMAGES = {
  cdp: "/platform/platform/cdp.webp",
  cpm: "/platform/platform/cmp-2.webp",
  kyc: "/platform/platform/KYC-1.webp",
  noc: "/platform/platform/noc-1.webp",
};
const SEO = {
  en: [
    "Robusst Platforms | Enterprise AI Infrastructure",
    "Scalable, cloud-native enterprise platforms for network operations, customer data, campaign management, KYC, and AI-powered telecom automation.",
  ],
  fr: [
    "Plateformes Robusst | Infrastructure d’IA d’entreprise",
    "Des plateformes d’entreprise cloud natives et évolutives pour les opérations réseau, les données clients, les campagnes, le KYC et l’automatisation télécom.",
  ],
  ru: [
    "Платформы Robusst | Корпоративная ИИ-инфраструктура",
    "Масштабируемые облачные платформы для сетевых операций, клиентских данных, управления кампаниями, KYC и автоматизации телекоммуникаций.",
  ],
  pt: [
    "Plataformas Robusst | Infraestrutura de IA empresarial",
    "Plataformas empresariais escaláveis e nativas da nuvem para operações de rede, dados de clientes, campanhas, KYC e automação de telecomunicações.",
  ],
  es: [
    "Plataformas Robusst | Infraestructura de IA empresarial",
    "Plataformas empresariales escalables y nativas de la nube para operaciones de red, datos de clientes, campañas, KYC y automatización de telecomunicaciones.",
  ],
  ar: [
    "منصات Robusst | بنية الذكاء الاصطناعي للمؤسسات",
    "منصات مؤسسية سحابية قابلة للتوسع لعمليات الشبكات وبيانات العملاء وإدارة الحملات والتحقق من الهوية وأتمتة الاتصالات.",
  ],
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

async function activePlatforms(locale) {
  const url = new URL("/api/v1/content", process.env.CMS_BASE_URL);
  url.searchParams.set("schema", "platforms");
  url.searchParams.set("locale", locale);
  const response = await fetch(url, {
    headers: { "x-api-key": process.env.CMS_API_KEY },
  });
  if (!response.ok)
    throw new Error(
      `Active Platforms request failed for ${locale}: ${response.status}`,
    );
  const body = await response.json();
  if (!body.data?.content?.platforms)
    throw new Error(`Active Platforms content is empty for ${locale}`);
  return body.data.content.platforms;
}
function asset(assetMap, publicPath) {
  const mapped = Object.values(assetMap.assets).find((item) =>
    item.sourcePaths.includes(publicPath),
  );
  if (!mapped) throw new Error(`Missing mapped asset ${publicPath}`);
  return mapped.sanityAssetId;
}
function image(assetMap, publicPath, alt) {
  return {
    _type: "contentImage",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: asset(assetMap, publicPath) },
    },
    alt,
  };
}
function cards(locale, platform, group, values) {
  return values.map((title, index) => ({
    _key: stableKey(`${locale}.${platform}.${group}.${index}`),
    _type: "contentCard",
    internalName: `${group}-${index + 1}`,
    title,
  }));
}
function platformSection(locale, name, content, common, assetMap) {
  return {
    _type: "fixedSection",
    internalName: name,
    title: content.heading,
    subtitle: content.subHeading,
    image: image(assetMap, PLATFORM_IMAGES[name], content.heading),
    groups: [
      {
        _key: "keyModules",
        _type: "contentGroup",
        internalName: "keyModules",
        title: common.keyModules,
        items: cards(locale, name, "module", content.keyModules),
      },
      {
        _key: "clientBenefits",
        _type: "contentGroup",
        internalName: "clientBenefits",
        title: common.clientBenefits,
        items: cards(locale, name, "benefit", content.clientBenefits),
      },
    ],
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
  const assetMap = JSON.parse(
    await readFile(
      path.join(ROOT, `migration/sanity/asset-map.${options.dataset}.json`),
      "utf8",
    ),
  );
  const documents = [];
  for (const locale of LOCALES) {
    const platforms = await activePlatforms(locale);
    documents.push({
      _id: `platformsPage-${locale}`,
      _type: "platformsPage",
      internalTitle: `Platforms page — ${locale.toUpperCase()}`,
      seo: {
        _type: "seo",
        metaTitle: SEO[locale][0],
        metaDescription: SEO[locale][1],
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
      banner: {
        _type: "fixedSection",
        internalName: "banner",
        title: platforms.banner.heading,
        subtitle: platforms.banner.subHeading,
        video: {
          _type: "externalVideo",
          provider: "sanityFile",
          title: platforms.banner.heading,
          videoFile: {
            _type: "file",
            asset: {
              _type: "reference",
              _ref: asset(assetMap, "/platform/banner/banner.webm"),
            },
          },
        },
      },
      cdp: platformSection(
        locale,
        "cdp",
        platforms.cdp,
        platforms.common,
        assetMap,
      ),
      cpm: platformSection(
        locale,
        "cpm",
        platforms.cpm,
        platforms.common,
        assetMap,
      ),
      kyc: platformSection(
        locale,
        "kyc",
        platforms.kyc,
        platforms.common,
        assetMap,
      ),
      noc: platformSection(
        locale,
        "noc",
        platforms.noc,
        platforms.common,
        assetMap,
      ),
      whyChoose: {
        _type: "fixedSection",
        internalName: "whyChoose",
        title: platforms.whychoose.heading,
        items: platforms.whychoose.benefits.map((benefit, index) => ({
          _key: stableKey(`${locale}.why.${index}`),
          _type: "contentCard",
          internalName: `benefit-${index + 1}`,
          title: benefit.title,
          description: benefit.description,
        })),
      },
    });
  }
  documents.push({
    _id: "translation.metadata.platformsPage",
    _type: "translation.metadata",
    schemaTypes: ["platformsPage"],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `platformsPage-${locale}` },
    })),
  });
  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        platformsPages: 6,
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
  console.log(`Committed ${result.documentIds.length} Platforms documents.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
