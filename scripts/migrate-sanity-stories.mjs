#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const PAGE_SECTIONS = ["banner", "listing", "detailDialog", "cta"];
const COPY = {
  en: {
    explore: "Explore all AI Solutions",
    bannerAlt: "Robusst customer success stories",
  },
  fr: {
    explore: "Découvrir toutes les solutions d’IA",
    bannerAlt: "Études de cas clients Robusst",
  },
  ru: {
    explore: "Все решения на базе ИИ",
    bannerAlt: "Истории успеха клиентов Robusst",
  },
  pt: {
    explore: "Explorar todas as soluções de IA",
    bannerAlt: "Histórias de sucesso de clientes Robusst",
  },
  es: {
    explore: "Explorar todas las soluciones de IA",
    bannerAlt: "Casos de éxito de clientes Robusst",
  },
  ar: {
    explore: "استكشف جميع حلول الذكاء الاصطناعي",
    bannerAlt: "قصص نجاح عملاء Robusst",
  },
};
const SEO = {
  en: [
    "Success Stories and Customer Impact | Robusst",
    "Discover how telecom and technology organizations use Robusst solutions to improve engagement, operations, loyalty, provisioning, and revenue outcomes.",
  ],
  fr: [
    "Études de cas et impact client | Robusst",
    "Découvrez comment les opérateurs et entreprises technologiques utilisent Robusst pour améliorer l’engagement, les opérations, la fidélité et les revenus.",
  ],
  ru: [
    "Истории успеха и результаты клиентов | Robusst",
    "Узнайте, как телеком- и технологические компании используют решения Robusst для улучшения вовлеченности, операций, лояльности и доходов.",
  ],
  pt: [
    "Histórias de sucesso e impacto dos clientes | Robusst",
    "Descubra como empresas de telecom e tecnologia usam a Robusst para melhorar engajamento, operações, fidelidade, provisionamento e receita.",
  ],
  es: [
    "Casos de éxito e impacto en clientes | Robusst",
    "Descubre cómo empresas de telecomunicaciones y tecnología usan Robusst para mejorar la interacción, las operaciones, la fidelización y los ingresos.",
  ],
  ar: [
    "قصص النجاح وتأثير العملاء | Robusst",
    "اكتشف كيف تستخدم شركات الاتصالات والتقنية حلول Robusst لتحسين التفاعل والعمليات والولاء والتزويد ونتائج الإيرادات.",
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
  const body = await response.json();
  if (!body.data?.content)
    throw new Error(`Active ${schema} content is empty for ${locale}`);
  return body.data.content;
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
function card(locale, storyId, section, index, item) {
  return {
    _key: stableKey(`${locale}.${storyId}.${section}.${index}`),
    _type: "contentCard",
    internalName: `${section}-${index + 1}`,
    title: item.title,
    description: item.description,
  };
}
function cta(label) {
  return {
    _type: "callToAction",
    style: "primary",
    link: { _type: "contentLink", label, kind: "internal", href: "/solutions" },
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
  const generatedFrench = JSON.parse(
    await readFile(
      path.join(
        ROOT,
        "migration/translations/success-stories.fr.generated.json",
      ),
      "utf8",
    ),
  ).stories;
  const pageDocuments = [];
  const sectionDocuments = [];
  const storyDocuments = [];
  const metadataDocuments = [];
  for (const locale of LOCALES) {
    const [pageSource, storiesSource] = await Promise.all([
      activeContent("storypage", locale),
      activeContent("successstories", locale),
    ]);
    const stories =
      locale === "fr"
        ? [...storiesSource.story, ...generatedFrench].sort(
            (a, b) => Number(a.id) - Number(b.id),
          )
        : storiesSource.story;
    if (stories.length !== 12)
      throw new Error(
        `${locale} has ${stories.length} success stories; expected 12`,
      );
    const copy = COPY[locale];
    const sections = {
      banner: {
        _type: "fixedSection",
        internalName: "banner",
        title: pageSource.mainStoryPage.banner.heading,
        subtitle: pageSource.mainStoryPage.banner.subheading,
        image: image(assetMap, "/pics/banner.webp", copy.bannerAlt),
        primaryCta: cta(copy.explore),
      },
      listing: {
        _type: "fixedSection",
        internalName: "listing",
        labels: [pageSource.mainStoryPage.successStoryGrid.ctaText],
      },
      detailDialog: {
        _type: "fixedSection",
        internalName: "detailDialog",
        labels: [
          pageSource.storyPage.challengesTitle,
          pageSource.storyPage.solutionTitle,
        ],
      },
      cta: {
        _type: "fixedSection",
        internalName: "cta",
        primaryCta: cta(copy.explore),
      },
    };
    const pageDocument = {
      _id: `storiesPage-${locale}`,
      _type: "storiesPage",
      internalTitle: `Stories page — ${locale.toUpperCase()}`,
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
          locale === "fr"
            ? "Ten missing active French stories were generated. Migrated content, SEO, CTA, and alt text require human review."
            : locale === "en"
              ? "Canonical active content migrated; generated SEO and accessibility text require review."
              : "Migrated active translation plus generated SEO and accessibility text; human review required.",
      },
    };
    for (const sectionKey of PAGE_SECTIONS) {
      const sectionId = `fixedPageSection-storiesPage-${locale}-${sectionKey}`;
      sectionDocuments.push({
        _id: sectionId,
        _type: "fixedPageSection",
        internalTitle: `Stories ${sectionKey} — ${locale.toUpperCase()}`,
        pageType: "storiesPage",
        sectionKey,
        language: locale,
        content: sections[sectionKey],
      });
      pageDocument[sectionKey] = { _type: "reference", _ref: sectionId };
    }
    pageDocuments.push(pageDocument);
    for (const story of stories) {
      const title = `${story.title} | Robusst`;
      const description =
        story.description.length > 170
          ? `${story.description.slice(0, 167).trimEnd()}…`
          : story.description;
      storyDocuments.push({
        _id: `successStory-${story.id}-${locale}`,
        _type: "successStory",
        legacyId: story.id,
        title: story.title,
        customerName: story.companyName,
        customerLogo: image(assetMap, story.companyLogo, story.companyName),
        summary: story.description,
        challenges: story.cusomterChallenges.map((item, index) =>
          card(locale, story.id, "challenge", index, item),
        ),
        solutions: story.solutions.map((item, index) =>
          card(locale, story.id, "solution", index, item),
        ),
        seo: {
          _type: "seo",
          metaTitle:
            title.length > 65
              ? `${story.title.slice(0, 52).trimEnd()} | Robusst`
              : title,
          metaDescription:
            description.length < 50
              ? `${description} Discover the customer impact delivered with Robusst.`
              : description,
          noIndex: false,
        },
        language: locale,
        translation: {
          _type: "translationWorkflow",
          status: locale === "en" ? "source" : "generated",
          sourceLanguage: "en",
          reviewNotes:
            locale === "fr" && Number(story.id) > 2
              ? "Generated French success story; human review required."
              : locale === "en"
                ? "Canonical active success story migrated; generated SEO and logo alt text require review."
                : "Migrated active translation plus generated SEO and logo alt text; human review required.",
        },
      });
    }
  }
  metadataDocuments.push({
    _id: "translation.metadata.storiesPage",
    _type: "translation.metadata",
    schemaTypes: ["storiesPage"],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `storiesPage-${locale}` },
    })),
  });
  for (let id = 1; id <= 12; id += 1)
    metadataDocuments.push({
      _id: `translation.metadata.successStory-${id}`,
      _type: "translation.metadata",
      schemaTypes: ["successStory"],
      translations: LOCALES.map((locale) => ({
        _key: locale,
        _type: "internationalizedArrayReferenceValue",
        language: locale,
        value: { _type: "reference", _ref: `successStory-${id}-${locale}` },
      })),
    });
  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        storiesPages: pageDocuments.length,
        pageSections: sectionDocuments.length,
        successStories: storyDocuments.length,
        translationMetadata: metadataDocuments.length,
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
  for (const document of sectionDocuments)
    await client.createOrReplace(document, { visibility: "sync" });
  for (const document of storyDocuments)
    await client.createOrReplace(document, { visibility: "sync" });
  let transaction = client.transaction();
  for (const document of [...pageDocuments, ...metadataDocuments])
    transaction = transaction.createOrReplace(document);
  const result = await transaction.commit({ visibility: "sync" });
  console.log(
    `Committed ${sectionDocuments.length + storyDocuments.length + result.documentIds.length} Stories documents.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
