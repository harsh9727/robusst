#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const COPY = {
  en: {
    close: "Close video",
    player: "Cybersecurity solutions video",
    module: "Module",
    features: "Key Features",
    matters: "Why it matters",
    core: "MDR Core",
    coreDescription: "Central Detection and Response Engine",
    faq: "Cybersecurity support team",
  },
  fr: {
    close: "Fermer la vidéo",
    player: "Vidéo sur les solutions de cybersécurité",
    module: "Module",
    features: "Fonctionnalités clés",
    matters: "Pourquoi c’est important",
    core: "Cœur MDR",
    coreDescription: "Moteur central de détection et de réponse",
    faq: "Équipe d’assistance cybersécurité",
  },
  ru: {
    close: "Закрыть видео",
    player: "Видео о решениях кибербезопасности",
    module: "Модуль",
    features: "Ключевые функции",
    matters: "Почему это важно",
    core: "Ядро MDR",
    coreDescription: "Центральный механизм обнаружения и реагирования",
    faq: "Команда поддержки кибербезопасности",
  },
  pt: {
    close: "Fechar vídeo",
    player: "Vídeo sobre soluções de cibersegurança",
    module: "Módulo",
    features: "Principais recursos",
    matters: "Por que isso importa",
    core: "Núcleo MDR",
    coreDescription: "Mecanismo central de detecção e resposta",
    faq: "Equipe de suporte de cibersegurança",
  },
  es: {
    close: "Cerrar vídeo",
    player: "Vídeo sobre soluciones de ciberseguridad",
    module: "Módulo",
    features: "Funciones clave",
    matters: "Por qué es importante",
    core: "Núcleo MDR",
    coreDescription: "Motor central de detección y respuesta",
    faq: "Equipo de soporte de ciberseguridad",
  },
  ar: {
    close: "إغلاق الفيديو",
    player: "فيديو حلول الأمن السيبراني",
    module: "الوحدة",
    features: "الميزات الرئيسية",
    matters: "لماذا هو مهم",
    core: "نواة MDR",
    coreDescription: "محرك مركزي للكشف والاستجابة",
    faq: "فريق دعم الأمن السيبراني",
  },
};
const SEO = {
  en: [
    "Cybersecurity Solutions for Telecom and Banking | Robusst",
    "Protect endpoints, identities, cloud, applications, and networks with real-time monitoring, managed detection, compliance, and AI-driven threat intelligence.",
  ],
  fr: [
    "Cybersécurité pour télécoms et banques | Robusst",
    "Protégez terminaux, identités, cloud, applications et réseaux grâce à la surveillance en temps réel, la détection managée et l’intelligence artificielle.",
  ],
  ru: [
    "Кибербезопасность для телекома и банков | Robusst",
    "Защитите конечные устройства, идентификационные данные, облако, приложения и сети с помощью мониторинга и обнаружения угроз на базе ИИ.",
  ],
  pt: [
    "Cibersegurança para telecom e bancos | Robusst",
    "Proteja endpoints, identidades, nuvem, aplicações e redes com monitoramento em tempo real, detecção gerenciada, conformidade e inteligência de ameaças.",
  ],
  es: [
    "Ciberseguridad para telecomunicaciones y banca | Robusst",
    "Protege endpoints, identidades, nube, aplicaciones y redes con monitorización en tiempo real, detección gestionada e inteligencia de amenazas con IA.",
  ],
  ar: [
    "حلول الأمن السيبراني للاتصالات والبنوك | Robusst",
    "احمِ الأجهزة والهويات والسحابة والتطبيقات والشبكات بالمراقبة الفورية والكشف المُدار والامتثال واستخبارات التهديدات المدعومة بالذكاء الاصطناعي.",
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
async function activeContent(locale) {
  const url = new URL("/api/v1/content", process.env.CMS_BASE_URL);
  url.searchParams.set("schema", "cybersecurity");
  url.searchParams.set("locale", locale);
  const response = await fetch(url, {
    headers: { "x-api-key": process.env.CMS_API_KEY },
  });
  if (!response.ok)
    throw new Error(
      `Active Cybersecurity request failed for ${locale}: ${response.status}`,
    );
  const body = await response.json();
  if (!body.data?.content?.cybersecurity_page)
    throw new Error(`Active Cybersecurity content is empty for ${locale}`);
  return body.data.content.cybersecurity_page;
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
function card(locale, section, index, title, description, extra = {}) {
  return {
    _key: stableKey(`${locale}.${section}.${index}`),
    _type: "contentCard",
    internalName: `${section}-${index + 1}`,
    title,
    description,
    ...extra,
  };
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
    const page = await activeContent(locale);
    const copy = COPY[locale];
    documents.push({
      _id: `cybersecurityPage-${locale}`,
      _type: "cybersecurityPage",
      internalTitle: `Cybersecurity page — ${locale.toUpperCase()}`,
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
            ? "Canonical active content migrated; generated SEO, media alt text, and dialog accessibility labels require review."
            : "Migrated active translation plus generated SEO, media alt text, and dialog accessibility labels; human review required.",
      },
      banner: {
        _type: "fixedSection",
        internalName: "banner",
        title: page.banner.title,
        description: page.banner.description,
        image: image(
          assetMap,
          page.banner.image,
          page.banner.imageAlt || page.banner.title,
        ),
      },
      whyChooseRobusst: {
        _type: "fixedSection",
        internalName: "whyChooseRobusst",
        title: page.whyChooseRobusst.title,
        subtitle: page.whyChooseRobusst.subtitle,
        description: page.whyChooseRobusst.description,
        labels: [page.whyChooseRobusst.playButtonText, copy.close],
        image: image(
          assetMap,
          page.whyChooseRobusst.videoThumbnail,
          page.whyChooseRobusst.videoThumbnailAlt ||
            page.whyChooseRobusst.title,
        ),
        video: {
          _type: "externalVideo",
          provider: "youtube",
          videoId: "YCq8tKqpvsI",
          title: copy.player,
        },
        items: page.whyChooseRobusst.points.map((item, index) =>
          card(locale, "whyChooseRobusst", index, item.title, item.description),
        ),
      },
      solutionModules: {
        _type: "fixedSection",
        internalName: "solutionModules",
        title: page.solutionModules.title,
        description: page.solutionModules.description,
        labels: [
          page.solutionModules.viewDetailsText,
          copy.module,
          copy.features,
          copy.matters,
          copy.core,
          copy.coreDescription,
        ],
        groups: page.solutionModules.modules.map((module, index) => ({
          _key: stableKey(`${locale}.module.${module.acronym}`),
          _type: "contentGroup",
          internalName: module.acronym,
          title: module.title,
          subtitle: module.detailedContent.subtitle,
          description: module.description,
          image: image(assetMap, module.imageSrc, module.title),
          labels: [
            module.detailedContent.description,
            module.detailedContent.whyItMatters,
            ...(module.detailedContent.features ?? []),
          ].filter(Boolean),
          items: (module.detailedContent.sections ?? []).map(
            (section, sectionIndex) =>
              card(
                locale,
                `module-${index + 1}`,
                sectionIndex,
                section.title,
                section.description,
              ),
          ),
        })),
      },
      threatIntelligence: {
        _type: "fixedSection",
        internalName: "threatIntelligence",
        title: page.threatIntelligence.title,
        subtitle: page.threatIntelligence.subtitle,
        image: image(
          assetMap,
          page.threatIntelligence.image,
          page.threatIntelligence.imageAlt || page.threatIntelligence.title,
        ),
        items: page.threatIntelligence.features.map((item, index) =>
          card(locale, "threatIntelligence", index, item.title, item.text, {
            iconKey: item.icon,
          }),
        ),
      },
      howItWorks: {
        _type: "fixedSection",
        internalName: "howItWorks",
        title: page.howItWorks.title,
        subtitle: page.howItWorks.subtitle,
        image: image(
          assetMap,
          page.howItWorks.image,
          page.howItWorks.imageAlt || page.howItWorks.title,
        ),
        items: page.howItWorks.steps.map((item, index) =>
          card(locale, "howItWorks", index, item.title, item.text),
        ),
      },
      businessOutcomes: {
        _type: "fixedSection",
        internalName: "businessOutcomes",
        title: page.businessOutcomes.title,
        subtitle: page.businessOutcomes.subtitle,
        image: image(
          assetMap,
          page.businessOutcomes.image,
          page.businessOutcomes.imageAlt || page.businessOutcomes.title,
        ),
        items: page.businessOutcomes.outcomes.map((item, index) =>
          card(locale, "businessOutcomes", index, item.title, item.text),
        ),
      },
      ourUsp: {
        _type: "fixedSection",
        internalName: "ourUsp",
        title: page.ourUSP.title,
        subtitle: page.ourUSP.subtitle,
        items: page.ourUSP.uspPoints.map((item, index) =>
          card(locale, "ourUsp", index, item.title, item.text),
        ),
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
    _id: "translation.metadata.cybersecurityPage",
    _type: "translation.metadata",
    schemaTypes: ["cybersecurityPage"],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `cybersecurityPage-${locale}` },
    })),
  });
  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        cybersecurityPages: 6,
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
    `Committed ${result.documentIds.length} Cybersecurity documents.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
