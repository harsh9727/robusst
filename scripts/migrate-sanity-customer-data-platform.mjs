#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const COPY = {
  en: {
    view: "View Details",
    module: "Module",
    center: "Customer Data Platform solution overview",
    faq: "Customer Data Platform support team",
    today: "Today",
  },
  fr: {
    view: "Voir les détails",
    module: "Module",
    center: "Aperçu de la solution Customer Data Platform",
    faq: "Équipe d’assistance Customer Data Platform",
    today: "Aujourd’hui",
  },
  ru: {
    view: "Подробнее",
    module: "Модуль",
    center: "Обзор решения Customer Data Platform",
    faq: "Команда поддержки Customer Data Platform",
    today: "Сегодня",
  },
  pt: {
    view: "Ver detalhes",
    module: "Módulo",
    center: "Visão geral da solução Customer Data Platform",
    faq: "Equipe de suporte da Customer Data Platform",
    today: "Hoje",
  },
  es: {
    view: "Ver detalles",
    module: "Módulo",
    center: "Vista general de la solución Customer Data Platform",
    faq: "Equipo de soporte de Customer Data Platform",
    today: "Hoy",
  },
  ar: {
    view: "عرض التفاصيل",
    module: "الوحدة",
    center: "نظرة عامة على حل منصة بيانات العملاء",
    faq: "فريق دعم منصة بيانات العملاء",
    today: "اليوم",
  },
};
const SEO = {
  en: [
    "Customer Data Platform for Telecom and Banking | Robusst",
    "Unify customer data for real-time insights, precise segmentation, personalized journeys, churn reduction, and measurable growth with the Robusst Customer Data Platform.",
  ],
  fr: [
    "Customer Data Platform pour télécoms et banques | Robusst",
    "Unifiez les données clients pour obtenir des analyses en temps réel, une segmentation précise, des parcours personnalisés et une croissance mesurable avec Robusst.",
  ],
  ru: [
    "Customer Data Platform для телекома и банков | Robusst",
    "Объединяйте клиентские данные для аналитики в реальном времени, точной сегментации, персонализированных сценариев и снижения оттока с Robusst.",
  ],
  pt: [
    "Customer Data Platform para telecom e bancos | Robusst",
    "Unifique dados de clientes para insights em tempo real, segmentação precisa, jornadas personalizadas, redução de churn e crescimento mensurável com a Robusst.",
  ],
  es: [
    "Customer Data Platform para telecom y banca | Robusst",
    "Unifica los datos de clientes para obtener información en tiempo real, segmentación precisa, experiencias personalizadas y reducir la pérdida de clientes.",
  ],
  ar: [
    "منصة بيانات العملاء للاتصالات والبنوك | Robusst",
    "وحّد بيانات العملاء للحصول على رؤى فورية وتقسيم دقيق وتجارب مخصصة وتقليل فقدان العملاء وتحقيق نمو قابل للقياس مع منصة Robusst.",
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
async function activeCdp(locale) {
  const url = new URL("/api/v1/content", process.env.CMS_BASE_URL);
  url.searchParams.set("schema", "cdp");
  url.searchParams.set("locale", locale);
  const response = await fetch(url, {
    headers: { "x-api-key": process.env.CMS_API_KEY },
  });
  if (!response.ok)
    throw new Error(
      `Active CDP request failed for ${locale}: ${response.status}`,
    );
  const body = await response.json();
  if (!body.data?.content?.cdp_page)
    throw new Error(`Active CDP content is empty for ${locale}`);
  return body.data.content.cdp_page;
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
function cta(label, href) {
  return {
    _type: "callToAction",
    style: "primary",
    link: { _type: "contentLink", label, kind: "internal", href },
  };
}
function cards(
  locale,
  section,
  values,
  map = (item) => ({ title: item.title, description: item.description }),
) {
  return values.map((item, index) => ({
    _key: stableKey(`${locale}.${section}.${index}`),
    _type: "contentCard",
    internalName: `${section}-${index + 1}`,
    ...map(item),
  }));
}
function block(locale, index, text) {
  return [
    {
      _key: stableKey(`${locale}.faq.${index}.block`),
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: stableKey(`${locale}.faq.${index}.span`),
          _type: "span",
          marks: [],
          text,
        },
      ],
    },
  ];
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
    const page = await activeCdp(locale);
    const copy = COPY[locale];
    if (locale === "en")
      page.banner.description = page.banner.description.replace("anxd", "and");
    if (locale === "ru")
      page.banner.description =
        "Расширенная Customer Data Platform (CDP) от Robusst позволяет телеком-операторам и предприятиям объединять разрозненные клиентские данные в единое представление в реальном времени. Ускоряйте рост, увеличивайте доход и снижайте отток с помощью ИИ-аналитики и омниканальной персонализации при соблюдении требований конфиденциальности и нормативов.";
    documents.push({
      _id: `customerDataPlatformPage-${locale}`,
      _type: "customerDataPlatformPage",
      internalTitle: `Customer Data Platform page — ${locale.toUpperCase()}`,
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
            ? "Canonical active content migrated. The source typo anxd was corrected; generated alt and dialog labels require review."
            : locale === "ru"
              ? "The English fragment in the Russian banner description was replaced. Migrated translation plus generated SEO, media alt text, and dialog labels require human review."
              : "Migrated active translation plus generated SEO, media alt text, and dialog labels; human review required.",
      },
      banner: {
        _type: "fixedSection",
        internalName: "banner",
        title: page.banner.heading,
        subtitle: page.banner.subheading,
        description: page.banner.description,
        image: image(assetMap, "/solutions/cdp/17.webp", page.banner.heading),
      },
      whyChooseRobusst: {
        _type: "fixedSection",
        internalName: "whyChooseRobusst",
        title: page.whyChooseRobusst.heading,
        image: image(
          assetMap,
          "/solutions/cdp/2.webp",
          page.whyChooseRobusst.heading,
        ),
        items: cards(
          locale,
          "whyChooseRobusst",
          page.whyChooseRobusst.features,
          (item) => ({ title: item.title }),
        ),
      },
      industryApplications: {
        _type: "fixedSection",
        internalName: "industryApplications",
        title: page.industryApplications.heading,
        subtitle: page.industryApplications.subheading,
        items: cards(
          locale,
          "industryApplications",
          page.industryApplications.industries,
        ),
      },
      provenImpact: {
        _type: "fixedSection",
        internalName: "provenImpact",
        title: page.provenImpact.heading,
        image: image(
          assetMap,
          "/solutions/cdp/11.webp",
          `${page.provenImpact.heading} — Robusst`,
        ),
        items: cards(
          locale,
          "provenImpact",
          page.provenImpact.stats,
          (item) => ({
            title: item.value,
            subtitle: item.label,
            description: item.description,
          }),
        ),
      },
      telecomUseCases: {
        _type: "fixedSection",
        internalName: "telecomUseCases",
        title: page.telecomUseCases.heading,
        description: page.telecomUseCases.description,
        labels: page.telecomUseCases.useCases,
        image: image(
          assetMap,
          "/solutions/cdp/3.webp",
          page.telecomUseCases.heading,
        ),
      },
      personalizedExperience: {
        _type: "fixedSection",
        internalName: "personalizedExperience",
        eyebrow: page.personalizedExperience.badge,
        title: page.personalizedExperience.heading,
        labels: page.personalizedExperience.useCases.map((item) => item.text),
        image: image(
          assetMap,
          "/solutions/cdp/8.webp",
          page.personalizedExperience.heading,
        ),
      },
      solutionGrid: {
        _type: "fixedSection",
        internalName: "solutionGrid",
        title: page.solutionGrid.heading,
        image: image(assetMap, "/solutions/cdp/10.webp", copy.center),
        labels: [copy.view, copy.module],
        groups: page.solutionGrid.modules.map((module) => ({
          _key: stableKey(`${locale}.module.${module.acronym}`),
          _type: "contentGroup",
          internalName: module.acronym,
          title: module.title,
          subtitle: module.detailedContent.subtitle,
          description: module.description,
          image: image(assetMap, module.imageSrc, module.title),
          labels: [module.detailedContent.description],
          items: [],
        })),
      },
      benefitsUseCases: {
        _type: "fixedSection",
        internalName: "benefitsUseCases",
        title: page.benefitsUseCases.heading,
        subtitle: page.benefitsUseCases.subheading,
        image: image(
          assetMap,
          "/solutions/cdp/1.webp",
          page.benefitsUseCases.heading,
        ),
        items: cards(
          locale,
          "benefitsUseCases",
          page.benefitsUseCases.benefits,
        ),
      },
      accelerateValue: {
        _type: "fixedSection",
        internalName: "accelerateValue",
        title: page.accelerateValue.heading,
        image: image(
          assetMap,
          "/solutions/cdp/4.webp",
          page.accelerateValue.heading,
        ),
        items: cards(locale, "accelerateValue", page.accelerateValue.features),
      },
      keyFeaturesCapabilities: {
        _type: "fixedSection",
        internalName: "keyFeaturesCapabilities",
        title: page.keyFeaturesCapabilities.heading,
        subtitle: page.keyFeaturesCapabilities.subheading,
        image: image(
          assetMap,
          "/solutions/cdp/5.webp",
          page.keyFeaturesCapabilities.heading,
        ),
        items: cards(
          locale,
          "keyFeaturesCapabilities",
          page.keyFeaturesCapabilities.features,
        ),
      },
      cta: {
        _type: "fixedSection",
        internalName: "cta",
        title: page.ctaSection.heading,
        description: page.ctaSection.description,
        labels: [copy.today],
        image: image(
          assetMap,
          "/solutions/cdp/2.webp",
          page.ctaSection.heading,
        ),
        primaryCta: cta(page.ctaSection.primaryCta, "/contact"),
        secondaryCta: cta(page.ctaSection.secondaryCta, "/contact"),
      },
      faq: {
        _type: "fixedSection",
        internalName: "faq",
        image: image(assetMap, "/pics/contact.webp", copy.faq),
        faqs: page.faq.map((faq, index) => ({
          _key: stableKey(`${locale}.faq.${index}`),
          _type: "faqItem",
          question: faq.question,
          answer: block(locale, index, faq.answer),
        })),
      },
    });
  }
  documents.push({
    _id: "translation.metadata.customerDataPlatformPage",
    _type: "translation.metadata",
    schemaTypes: ["customerDataPlatformPage"],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `customerDataPlatformPage-${locale}` },
    })),
  });
  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        customerDataPlatformPages: 6,
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
    `Committed ${result.documentIds.length} Customer Data Platform documents.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
