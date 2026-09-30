#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
import {
  commitReferencedPageDocuments,
  splitReferencedPageDocuments,
} from "./lib/referenced-page-migration.mjs";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const YOUTUBE_VIDEO_ID = "jeLPsaU15to";
const AUXILIARY_COPY = {
  en: {
    closeVideo: "Close video",
    videoTitle: "AI Voice Bot demonstration",
    whyItMatters: "Why it matters",
    infrastructureFlow: "Infrastructure & Flow",
  },
  fr: {
    closeVideo: "Fermer la vidéo",
    videoTitle: "Démonstration du bot vocal IA",
    whyItMatters: "Pourquoi est-ce important ?",
    infrastructureFlow: "Infrastructure et flux",
  },
  ru: {
    closeVideo: "Закрыть видео",
    videoTitle: "Демонстрация голосового ИИ-бота",
    whyItMatters: "Почему это важно",
    infrastructureFlow: "Инфраструктура и поток",
  },
  pt: {
    closeVideo: "Fechar vídeo",
    videoTitle: "Demonstração do bot de voz com IA",
    whyItMatters: "Por que isso é importante",
    infrastructureFlow: "Infraestrutura e fluxo",
  },
  es: {
    closeVideo: "Cerrar vídeo",
    videoTitle: "Demostración del bot de voz con IA",
    whyItMatters: "Por qué es importante",
    infrastructureFlow: "Infraestructura y flujo",
  },
  ar: {
    closeVideo: "إغلاق الفيديو",
    videoTitle: "عرض توضيحي للوكيل الصوتي بالذكاء الاصطناعي",
    whyItMatters: "لماذا يهم ذلك",
    infrastructureFlow: "البنية التحتية والتدفق",
  },
};
const MEDIA_LABELS = {
  en: {
    interface: "interface",
    analytics: "analytics",
    faq: "AI Voice Bot support team",
  },
  fr: {
    interface: "interface",
    analytics: "analyses",
    faq: "Équipe d’assistance du bot vocal IA",
  },
  ru: {
    interface: "интерфейс",
    analytics: "аналитика",
    faq: "Команда поддержки голосового ИИ-бота",
  },
  pt: {
    interface: "interface",
    analytics: "análises",
    faq: "Equipe de suporte do bot de voz com IA",
  },
  es: {
    interface: "interfaz",
    analytics: "análisis",
    faq: "Equipo de soporte del bot de voz con IA",
  },
  ar: {
    interface: "واجهة النظام",
    analytics: "التحليلات",
    faq: "فريق دعم الوكيل الصوتي بالذكاء الاصطناعي",
  },
};
const SEO = {
  en: [
    "AI Voice Bot and Call Center Automation | Robusst",
    "Automate customer conversations with enterprise AI voice agents, multilingual support, real-time analytics, secure deployment, and CRM integration.",
  ],
  fr: [
    "Bot vocal IA et automatisation des centres d’appels | Robusst",
    "Automatisez les conversations clients avec des agents vocaux IA, un support multilingue, des analyses en temps réel et une intégration CRM sécurisée.",
  ],
  ru: [
    "Голосовой ИИ-бот и автоматизация колл-центра | Robusst",
    "Автоматизируйте общение с клиентами с помощью голосовых ИИ-агентов, многоязычной поддержки, аналитики и безопасной интеграции с CRM.",
  ],
  pt: [
    "Bot de voz com IA e automação de call center | Robusst",
    "Automatize conversas com agentes de voz com IA, suporte multilíngue, análises em tempo real, implantação segura e integração com CRM.",
  ],
  es: [
    "Bot de voz con IA y automatización de call center | Robusst",
    "Automatiza conversaciones con agentes de voz con IA, soporte multilingüe, análisis en tiempo real, despliegue seguro e integración con CRM.",
  ],
  ar: [
    "وكيل صوتي بالذكاء الاصطناعي وأتمتة مراكز الاتصال | Robusst",
    "أتمت محادثات العملاء باستخدام وكلاء صوت بالذكاء الاصطناعي ودعم متعدد اللغات وتحليلات فورية ونشر آمن وتكامل مع CRM.",
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
async function activeAiCall(locale) {
  const url = new URL("/api/v1/content", process.env.CMS_BASE_URL);
  url.searchParams.set("schema", "aicall");
  url.searchParams.set("locale", locale);
  const response = await fetch(url, {
    headers: { "x-api-key": process.env.CMS_API_KEY },
  });
  if (!response.ok)
    throw new Error(
      `Active AI Call request failed for ${locale}: ${response.status}`,
    );
  const body = await response.json();
  if (!body.data?.content?.ai_call_page)
    throw new Error(`Active AI Call content is empty for ${locale}`);
  return body.data.content.ai_call_page;
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
function cards(locale, section, values) {
  return values.map((item, index) => ({
    _key: stableKey(`${locale}.${section}.${index}`),
    _type: "contentCard",
    internalName: `${section}-${index + 1}`,
    title: item.title,
    description: item.description,
    iconKey: item.icon,
  }));
}
function block(locale, pathValue, text) {
  return [
    {
      _key: stableKey(`${locale}.${pathValue}.block`),
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: stableKey(`${locale}.${pathValue}.span`),
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
  const [assetMap, generatedArabic] = await Promise.all([
    readFile(
      path.join(ROOT, `migration/sanity/asset-map.${options.dataset}.json`),
      "utf8",
    ).then(JSON.parse),
    readFile(
      path.join(
        ROOT,
        "migration/translations/ai-call-center.ar.generated.json",
      ),
      "utf8",
    ).then(JSON.parse),
  ]);
  const documents = [];
  for (const locale of LOCALES) {
    const active = await activeAiCall(locale);
    const page =
      locale === "ar" ? { ...active, ...generatedArabic.content } : active;
    const copy = AUXILIARY_COPY[locale];
    documents.push({
      _id: `aiCallCenterPage-${locale}`,
      _type: "aiCallCenterPage",
      internalTitle: `AI Call Center page — ${locale.toUpperCase()}`,
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
            ? "Canonical content migrated from the active production experience. Generic local-image alt text and hardcoded modal accessibility copy require review."
            : locale === "ar"
              ? "Seven rendered sections were absent from the active Arabic payload and were generated from English. SEO, accessibility labels, and replacement alt text also require human review."
              : "Migrated active production translation plus generated SEO and accessibility completion; human review required.",
      },
      banner: {
        _type: "fixedSection",
        internalName: "banner",
        title: page.banner.title,
        subtitle: page.banner.subtitle,
        description: page.banner.description,
        image: image(
          assetMap,
          page.banner.image,
          page.banner.imageAlt || page.banner.title,
        ),
      },
      businessProblem: {
        _type: "fixedSection",
        internalName: "businessProblem",
        title: page.businessProblem.title,
        subtitle: page.businessProblem.subtitle,
        image: image(
          assetMap,
          page.businessProblem.videoThumbnail,
          page.businessProblem.videoThumbnailAlt || page.businessProblem.title,
        ),
        video: {
          _type: "externalVideo",
          provider: "youtube",
          videoId: YOUTUBE_VIDEO_ID,
          title: copy.videoTitle,
        },
        labels: [
          page.businessProblem.playButtonText,
          copy.closeVideo,
          copy.videoTitle,
        ],
        items: cards(locale, "businessProblem", page.businessProblem.problems),
      },
      solutionOverview: {
        _type: "fixedSection",
        internalName: "solutionOverview",
        title: page.solutionOverview.title,
        titleHighlight: page.solutionOverview.titleHighlight,
        image: image(
          assetMap,
          page.solutionOverview.image,
          page.solutionOverview.imageAlt || page.solutionOverview.title,
        ),
        items: cards(
          locale,
          "solutionOverview",
          page.solutionOverview.solutions,
        ),
      },
      keyValueProposition: {
        _type: "fixedSection",
        internalName: "keyValueProposition",
        title: page.keyValueProposition.title,
        subtitle: page.keyValueProposition.subtitle,
        statistics: page.keyValueProposition.stats.map((stat, index) => ({
          _key: stableKey(`${locale}.stat.${index}`),
          _type: "statistic",
          value: Number(stat.number),
          suffix: stat.suffix,
          label: stat.label,
        })),
      },
      coreCapabilities: {
        _type: "fixedSection",
        internalName: "coreCapabilities",
        title: page.coreCapabilities.title,
        subtitle: page.coreCapabilities.subtitle,
        images: [17, 18].map((number) =>
          image(
            assetMap,
            `/solutions/aicall/${number}.webp`,
            `${page.coreCapabilities.title} — ${number === 17 ? MEDIA_LABELS[locale].interface : MEDIA_LABELS[locale].analytics}`,
          ),
        ),
        items: cards(
          locale,
          "coreCapabilities",
          page.coreCapabilities.capabilities,
        ),
      },
      advancedAiIntelligence: {
        _type: "fixedSection",
        internalName: "advancedAiIntelligence",
        title: page.advancedAIIntelligence.title,
        subtitle: page.advancedAIIntelligence.subtitle,
        items: cards(
          locale,
          "advancedAiIntelligence",
          page.advancedAIIntelligence.features,
        ),
      },
      enterpriseArchitecture: {
        _type: "fixedSection",
        internalName: "enterpriseArchitecture",
        title: page.enterpriseArchitecture.title,
        subtitle: page.enterpriseArchitecture.subtitle,
        labels: [copy.infrastructureFlow],
        image: image(
          assetMap,
          page.enterpriseArchitecture.image,
          page.enterpriseArchitecture.imageAlt ||
            page.enterpriseArchitecture.title,
        ),
        items: cards(
          locale,
          "enterpriseArchitecture",
          page.enterpriseArchitecture.components,
        ),
      },
      solutionGrid: {
        _type: "fixedSection",
        internalName: "solutionGrid",
        title: page.solutionGrid.title,
        labels: [page.solutionGrid.viewDetailsText, copy.whyItMatters],
        groups: page.solutionGrid.solutions.map((solution, index) => ({
          _key: stableKey(`${locale}.grid.${solution.acronym}`),
          _type: "contentGroup",
          internalName: solution.acronym,
          title: solution.title,
          subtitle: solution.detailedContent.subtitle,
          description: solution.description,
          image: image(assetMap, solution.imageSrc, solution.title),
          labels: [
            solution.detailedContent.description,
            solution.detailedContent.whyItMatters,
          ],
          items: solution.detailedContent.sections.map(
            (section, sectionIndex) => ({
              _key: stableKey(`${locale}.grid.${index}.${sectionIndex}`),
              _type: "contentCard",
              internalName: `${solution.acronym}-${sectionIndex + 1}`,
              title: section.title,
              description: section.description,
            }),
          ),
        })),
      },
      customDevelopment: {
        _type: "fixedSection",
        internalName: "customDevelopment",
        title: page.customDevelopment.title,
        subtitle: page.customDevelopment.subtitle,
        image: image(
          assetMap,
          "/solutions/aicall/14.webp",
          page.customDevelopment.title,
        ),
        primaryCta: cta(page.customDevelopment.cta, "/poc_waitlist"),
        items: cards(
          locale,
          "customDevelopment",
          page.customDevelopment.features,
        ),
      },
      idealUseCases: {
        _type: "fixedSection",
        internalName: "idealUseCases",
        title: page.idealUseCases.title,
        subtitle: page.idealUseCases.subtitle,
        items: cards(locale, "idealUseCases", page.idealUseCases.useCases),
      },
      futureAutomation: {
        _type: "fixedSection",
        internalName: "futureAutomation",
        title: page.futureAutomation.title,
        description: page.futureAutomation.description,
        primaryCta: cta(
          page.futureAutomation.ctaText,
          page.futureAutomation.ctaLink,
        ),
      },
      faq: {
        _type: "fixedSection",
        internalName: "faq",
        image: image(
          assetMap,
          "/solutions/aicall/8.webp",
          MEDIA_LABELS[locale].faq,
        ),
        faqs: page.faq.map((faq, index) => ({
          _key: stableKey(`${locale}.faq.${index}`),
          _type: "faqItem",
          question: faq.question,
          answer: block(locale, `faq.${index}`, faq.answer),
        })),
      },
    });
  }
  documents.push({
    _id: "translation.metadata.aiCallCenterPage",
    _type: "translation.metadata",
    schemaTypes: ["aiCallCenterPage"],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `aiCallCenterPage-${locale}` },
    })),
  });
  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        aiCallCenterPages: 6,
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
  const result = await commitReferencedPageDocuments(
    client,
    splitReferencedPageDocuments(documents, {
      pageType: "aiCallCenterPage",
      pageTitle: "AI Call Center",
      sectionKeys: [
        "banner",
        "businessProblem",
        "solutionOverview",
        "keyValueProposition",
        "coreCapabilities",
        "advancedAiIntelligence",
        "enterpriseArchitecture",
        "solutionGrid",
        "customDevelopment",
        "idealUseCases",
        "futureAutomation",
        "faq",
      ],
    }),
  );
  console.log(
    `Committed ${result.documentIds.length} AI Call Center documents.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
