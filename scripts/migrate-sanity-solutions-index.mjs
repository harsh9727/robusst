#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const APPROVED_SLUGS = [
  "branded-calling",
  "customer-data-platform",
  "cybersecurity",
  "sts-dms",
  "intelligent-noc",
  "ai-call-center",
  "network-monetization",
  "customized-solutions",
];
const RUSSIAN_BANNER = {
  title: "Наши решения на базе искусственного интеллекта",
  subtitle:
    "Узнайте, как работают наши решения на базе искусственного интеллекта.",
  video: "/pics/ai_video.mp4",
};
const CTA_LABEL = {
  en: "Learn more",
  fr: "En savoir plus",
  ru: "Подробнее",
  pt: "Saiba mais",
  es: "Más información",
  ar: "اعرف المزيد",
};
const CTA_ARIA_PREFIX = {
  en: "Learn more about",
  fr: "En savoir plus sur",
  ru: "Подробнее о",
  pt: "Saiba mais sobre",
  es: "Más información sobre",
  ar: "اعرف المزيد عن",
};
const ALT_PREFIX = {
  en: "Solution preview:",
  fr: "Aperçu de la solution :",
  ru: "Обзор решения:",
  pt: "Prévia da solução:",
  es: "Vista previa de la solución:",
  ar: "معاينة الحل:",
};
const SEO = {
  en: [
    "AI Solutions for Telecom and Banking | Robusst",
    "Explore Robusst AI solutions for branded calling, customer data, cybersecurity, sales tracking, network operations, voice automation, and monetization.",
  ],
  fr: [
    "Solutions d’IA pour télécoms et banques | Robusst",
    "Découvrez les solutions d’IA Robusst pour les appels de marque, les données clients, la cybersécurité, les ventes, les réseaux et l’automatisation vocale.",
  ],
  ru: [
    "ИИ-решения для телекома и банков | Robusst",
    "Изучите решения Robusst для брендированных звонков, клиентских данных, кибербезопасности, продаж, сетевых операций и голосовой автоматизации.",
  ],
  pt: [
    "Soluções de IA para telecom e bancos | Robusst",
    "Conheça as soluções de IA da Robusst para chamadas com marca, dados de clientes, cibersegurança, vendas, operações de rede e automação de voz.",
  ],
  es: [
    "Soluciones de IA para telecom y banca | Robusst",
    "Descubre las soluciones de IA de Robusst para llamadas con marca, datos de clientes, ciberseguridad, ventas, operaciones de red y automatización de voz.",
  ],
  ar: [
    "حلول الذكاء الاصطناعي للاتصالات والبنوك | Robusst",
    "استكشف حلول Robusst للمكالمات ذات العلامة التجارية وبيانات العملاء والأمن السيبراني والمبيعات وعمليات الشبكات والأتمتة الصوتية.",
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
async function activeContent(schema, locale) {
  const url = new URL("/api/v1/content", process.env.CMS_BASE_URL);
  url.searchParams.set("schema", schema);
  url.searchParams.set("locale", locale);
  const response = await fetch(url, {
    headers: { "x-api-key": process.env.CMS_API_KEY },
  });
  if (!response.ok)
    throw new Error(
      `Active ${schema} request failed for ${locale}: ${response.status}`,
    );
  return (await response.json()).data?.content;
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
function cta(locale, slug, title) {
  return {
    _type: "callToAction",
    style: "primary",
    link: {
      _type: "contentLink",
      label: CTA_LABEL[locale],
      ariaLabel: `${CTA_ARIA_PREFIX[locale]} ${title}`,
      kind: "internal",
      href: `/solutions/${slug}`,
    },
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
    const [solutionsPage, home] = await Promise.all([
      activeContent("solutionspage", locale),
      activeContent("home", locale),
    ]);
    const activeBanner = solutionsPage?.solutions_page?.banner;
    const activeSolutions = home?.solutions;
    if (!activeBanner || !activeSolutions?.items)
      throw new Error(`Active Solutions content is incomplete for ${locale}`);
    const banner = locale === "ru" ? RUSSIAN_BANNER : activeBanner;
    const slugs = activeSolutions.items.map((item) => item.slug);
    if (JSON.stringify(slugs) !== JSON.stringify(APPROVED_SLUGS))
      throw new Error(
        `Unexpected solution route order for ${locale}: ${slugs.join(", ")}`,
      );
    documents.push({
      _id: `solutionsPage-${locale}`,
      _type: "solutionsPage",
      internalTitle: `Solutions page — ${locale.toUpperCase()}`,
      language: locale,
      seo: {
        _type: "seo",
        metaTitle: SEO[locale][0],
        metaDescription: SEO[locale][1],
        noIndex: false,
      },
      translation: {
        _type: "translationWorkflow",
        status: locale === "en" ? "source" : "generated",
        sourceLanguage: "en",
        reviewNotes:
          locale === "en"
            ? "Canonical content migrated from the active production experience. Card alternative text and CTA accessibility copy were generated."
            : locale === "ru"
              ? "The active Russian banner was Spanish. Russian banner copy plus localized SEO, alt text, and CTA accessibility copy were generated; human review required."
              : "Migrated active production translation plus generated SEO, alt text, and CTA accessibility copy; human review required.",
      },
      banner: {
        _type: "fixedSection",
        internalName: "banner",
        title: banner.title,
        subtitle: banner.subtitle,
        video: {
          _type: "externalVideo",
          provider: "sanityFile",
          title: banner.title,
          videoFile: {
            _type: "file",
            asset: { _type: "reference", _ref: asset(assetMap, banner.video) },
          },
        },
      },
      solutionGrid: {
        _type: "fixedSection",
        internalName: "solutionGrid",
        items: activeSolutions.items.map((item) => ({
          _key: stableKey(`${locale}.${item.slug}`),
          _type: "contentCard",
          internalName: item.slug,
          title: item.title,
          description: item.description,
          image: image(
            assetMap,
            item.image,
            `${ALT_PREFIX[locale]} ${item.title}`,
          ),
          cta: cta(locale, item.slug, item.title),
        })),
      },
    });
  }
  documents.push({
    _id: "translation.metadata.solutionsPage",
    _type: "translation.metadata",
    schemaTypes: ["solutionsPage"],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `solutionsPage-${locale}` },
    })),
  });
  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        solutionsPages: 6,
        cardsPerLocale: 8,
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
  console.log(
    `Committed ${result.documentIds.length} Solutions index documents.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
