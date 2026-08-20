#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const SECTION_KEYS = [
  "banner",
  "businessOutcomes",
  "aiNetwork",
  "networkChaos",
  "intelligentNoc",
  "coreCapabilities",
  "networkOperationsChaos",
  "intelligentDiffNoc",
  "chaosControl",
  "frameworkAdaa",
  "lifecycleAutomation",
  "integratedComponents",
  "deploymentModels",
  "keyBenefits",
  "humanInLoop",
  "faq",
];
const FAQ_ALT = {
  en: "Intelligent NOC support team",
  fr: "Équipe d’assistance NOC intelligent",
  ru: "Команда поддержки интеллектуального NOC",
  pt: "Equipe de suporte do NOC inteligente",
  es: "Equipo de soporte de NOC inteligente",
  ar: "فريق دعم مركز عمليات الشبكة الذكي",
};
const SEO = {
  en: [
    "Intelligent NOC and AI Network Operations | Robusst",
    "Transform network operations with AI-powered monitoring, predictive incident management, lifecycle automation, and measurable reductions in downtime and operating costs.",
  ],
  fr: [
    "NOC intelligent et opérations réseau par IA | Robusst",
    "Transformez les opérations réseau avec la surveillance par IA, la gestion prédictive des incidents, l’automatisation du cycle de vie et moins d’indisponibilité.",
  ],
  ru: [
    "Интеллектуальный NOC и сетевые операции с ИИ | Robusst",
    "Трансформируйте сетевые операции с помощью ИИ-мониторинга, прогнозного управления инцидентами, автоматизации жизненного цикла и сокращения простоев.",
  ],
  pt: [
    "NOC inteligente e operações de rede com IA | Robusst",
    "Transforme operações de rede com monitoramento por IA, gestão preditiva de incidentes, automação do ciclo de vida e redução mensurável do tempo de inatividade.",
  ],
  es: [
    "NOC inteligente y operaciones de red con IA | Robusst",
    "Transforma las operaciones de red con monitorización mediante IA, gestión predictiva de incidentes, automatización del ciclo de vida y menos tiempo de inactividad.",
  ],
  ar: [
    "مركز عمليات شبكة ذكي ومدعوم بالذكاء الاصطناعي | Robusst",
    "حوّل عمليات الشبكة بالمراقبة المدعومة بالذكاء الاصطناعي وإدارة الحوادث التنبؤية وأتمتة دورة الحياة وتقليل فترات التوقف والتكاليف.",
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
  url.searchParams.set("schema", "noc");
  url.searchParams.set("locale", locale);
  const response = await fetch(url, {
    headers: { "x-api-key": process.env.CMS_API_KEY },
  });
  if (!response.ok)
    throw new Error(
      `Active Intelligent NOC request failed for ${locale}: ${response.status}`,
    );
  const body = await response.json();
  if (!body.data?.content?.noc_page)
    throw new Error(`Active Intelligent NOC content is empty for ${locale}`);
  return body.data.content.noc_page;
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
function cards(
  locale,
  section,
  values,
  map = (item) => ({ title: item.title, description: item.description }),
) {
  return values.map((item, index) =>
    card(
      locale,
      section,
      index,
      map(item).title,
      map(item).description,
      map(item).extra,
    ),
  );
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
  const generatedFrench = JSON.parse(
    await readFile(
      path.join(
        ROOT,
        "migration/translations/intelligent-noc.fr.generated.json",
      ),
      "utf8",
    ),
  ).content;
  const pageDocuments = [];
  const sectionDocuments = [];
  for (const locale of LOCALES) {
    const activePage = await activeContent(locale);
    const page =
      locale === "fr" ? { ...activePage, ...generatedFrench } : activePage;
    const chaosGroups = [
      page.networkChaos.todaysChallenges,
      page.networkChaos.intelligentSolution,
    ];
    const pageDocument = {
      _id: `intelligentNocPage-${locale}`,
      _type: "intelligentNocPage",
      internalTitle: `Intelligent NOC page — ${locale.toUpperCase()}`,
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
            ? "Canonical active content migrated; generated SEO and media alt text require review."
            : "Migrated active translation plus generated SEO and missing media alt text; human review required.",
      },
      banner: {
        _type: "fixedSection",
        internalName: "banner",
        title: page.banner.title,
        description: page.banner.description,
        image: image(
          assetMap,
          "/solutions/noc/banner.webp",
          page.banner.imageAlt || page.banner.title,
        ),
      },
      businessOutcomes: {
        _type: "fixedSection",
        internalName: "businessOutcomes",
        title: page.businessOutcomes.title,
        description: page.businessOutcomes.description,
        items: page.businessOutcomes.outcomes.map((item, index) =>
          card(locale, "businessOutcomes", index, item.value, item.label, {
            subtitle: item.suffix,
          }),
        ),
      },
      aiNetwork: {
        _type: "fixedSection",
        internalName: "aiNetwork",
        eyebrow: page.aiNetwork.badge,
        title: page.aiNetwork.title,
        titleHighlight: page.aiNetwork.titleHighlight,
        labels: page.aiNetwork.bulletPoints,
        paragraphs: page.aiNetwork.industryTags,
        image: image(
          assetMap,
          "/solutions/noc/2.webp",
          page.aiNetwork.imageAlt || page.aiNetwork.title,
        ),
      },
      networkChaos: {
        _type: "fixedSection",
        internalName: "networkChaos",
        title: page.networkChaos.title,
        subtitle: page.networkChaos.subtitle,
        groups: chaosGroups.map((group, groupIndex) => ({
          _key: stableKey(`${locale}.networkChaos.${groupIndex}`),
          _type: "contentGroup",
          internalName:
            groupIndex === 0 ? "todaysChallenges" : "intelligentSolution",
          title: group.title,
          items: group.items.map((item, index) =>
            card(
              locale,
              `networkChaos-${groupIndex}`,
              index,
              item.text,
              undefined,
              { iconKey: item.icon },
            ),
          ),
        })),
      },
      intelligentNoc: {
        _type: "fixedSection",
        internalName: "intelligentNoc",
        eyebrow: page.intelligentNOC.badge,
        title: page.intelligentNOC.titleLine1,
        titleHighlight: page.intelligentNOC.titleLine2,
        subtitle: page.intelligentNOC.titleLine3,
        description: page.intelligentNOC.description,
        image: image(
          assetMap,
          "/solutions/noc/3.webp",
          page.intelligentNOC.imageAlt || page.intelligentNOC.titleLine1,
        ),
      },
      coreCapabilities: {
        _type: "fixedSection",
        internalName: "coreCapabilities",
        title: page.coreCapabilities.title,
        items: cards(
          locale,
          "coreCapabilities",
          page.coreCapabilities.capabilities,
        ),
      },
      networkOperationsChaos: {
        _type: "fixedSection",
        internalName: "networkOperationsChaos",
        title: page.networkOperationsChaos.title,
        image: image(
          assetMap,
          "/solutions/noc/5.webp",
          page.networkOperationsChaos.imageAlt ||
            page.networkOperationsChaos.title,
        ),
        items: cards(
          locale,
          "networkOperationsChaos",
          page.networkOperationsChaos.items,
          (item) => ({
            title: item.title,
            description: item.description,
            extra: { iconKey: item.icon },
          }),
        ),
      },
      intelligentDiffNoc: {
        _type: "fixedSection",
        internalName: "intelligentDiffNoc",
        title: page.intelligentDiffNOC.title,
        items: cards(
          locale,
          "intelligentDiffNoc",
          page.intelligentDiffNOC.features,
        ),
      },
      chaosControl: {
        _type: "fixedSection",
        internalName: "chaosControl",
        title: page.chaosControl.title,
        image: image(
          assetMap,
          "/solutions/noc/4.webp",
          page.chaosControl.imageAlt || page.chaosControl.title,
        ),
        items: cards(
          locale,
          "chaosControl",
          page.chaosControl.items,
          (item) => ({
            title: item.title,
            description: item.description,
            extra: { iconKey: item.icon },
          }),
        ),
      },
      frameworkAdaa: {
        _type: "fixedSection",
        internalName: "frameworkAdaa",
        title: page.frameworkADAA.title,
        subtitle: page.frameworkADAA.subtitle,
        description: page.frameworkADAA.subtitleDescription,
        items: cards(locale, "frameworkAdaa", page.frameworkADAA.features),
      },
      lifecycleAutomation: {
        _type: "fixedSection",
        internalName: "lifecycleAutomation",
        title: page.lifecycleAutomation.title,
        description: page.lifecycleAutomation.description,
        items: page.lifecycleAutomation.steps.map((item, index) =>
          card(locale, "lifecycleAutomation", index, item.title),
        ),
      },
      integratedComponents: {
        _type: "fixedSection",
        internalName: "integratedComponents",
        title: page.integratedComponents.title,
        subtitle: page.integratedComponents.subtitle,
        groups: [
          page.integratedComponents.featuresLeft,
          page.integratedComponents.featuresRight,
        ].map((values, groupIndex) => ({
          _key: stableKey(`${locale}.integratedComponents.${groupIndex}`),
          _type: "contentGroup",
          internalName: groupIndex === 0 ? "left" : "right",
          title: groupIndex === 0 ? "Left" : "Right",
          items: values.map((value, index) =>
            card(locale, `integrated-${groupIndex}`, index, value),
          ),
        })),
      },
      deploymentModels: {
        _type: "fixedSection",
        internalName: "deploymentModels",
        title: page.deploymentModels.title,
        description: page.deploymentModels.description,
        items: cards(
          locale,
          "deploymentModels",
          page.deploymentModels.models,
          (item) => ({
            title: item.title,
            description: item.description,
            extra: { iconKey: item.icon },
          }),
        ),
      },
      keyBenefits: {
        _type: "fixedSection",
        internalName: "keyBenefits",
        title: page.keyBenefits.title,
        items: cards(locale, "keyBenefits", page.keyBenefits.features),
      },
      humanInLoop: {
        _type: "fixedSection",
        internalName: "humanInLoop",
        title: page.humanInLoop.titleLine1,
        titleHighlight: page.humanInLoop.titleLine2,
        description: page.humanInLoop.description,
        image: image(
          assetMap,
          "/solutions/noc/6.webp",
          page.humanInLoop.imageAlt || page.humanInLoop.titleLine1,
        ),
      },
      faq: {
        _type: "fixedSection",
        internalName: "faq",
        image: image(
          assetMap,
          "/successStories/provision.webp",
          FAQ_ALT[locale],
        ),
        faqs: page.faq.map((faq, index) => ({
          _key: stableKey(`${locale}.faq.${index}`),
          _type: "faqItem",
          question: faq.question,
          answer: block(locale, index, faq.answer),
        })),
      },
    };
    for (const sectionKey of SECTION_KEYS) {
      const sectionId = `fixedPageSection-intelligentNocPage-${locale}-${sectionKey}`;
      sectionDocuments.push({
        _id: sectionId,
        _type: "fixedPageSection",
        internalTitle: `Intelligent NOC ${sectionKey} — ${locale.toUpperCase()}`,
        pageType: "intelligentNocPage",
        sectionKey,
        language: locale,
        content: pageDocument[sectionKey],
      });
      pageDocument[sectionKey] = {
        _type: "reference",
        _ref: sectionId,
        _weak: true,
      };
    }
    pageDocuments.push(pageDocument);
  }
  const metadataDocument = {
    _id: "translation.metadata.intelligentNocPage",
    _type: "translation.metadata",
    schemaTypes: ["intelligentNocPage"],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `intelligentNocPage-${locale}` },
    })),
  };
  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        intelligentNocPages: 6,
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
  let pageTransaction = client.transaction();
  for (const document of pageDocuments)
    pageTransaction = pageTransaction.createOrReplace(document);
  await pageTransaction.commit({ visibility: "sync" });
  for (const document of sectionDocuments)
    await client.createOrReplace(document, { visibility: "sync" });
  let strongReferenceTransaction = client.transaction();
  for (const document of pageDocuments) {
    for (const sectionKey of SECTION_KEYS) delete document[sectionKey]._weak;
    strongReferenceTransaction =
      strongReferenceTransaction.createOrReplace(document);
  }
  await strongReferenceTransaction.commit({ visibility: "sync" });
  await client.createOrReplace(metadataDocument, { visibility: "sync" });
  console.log(
    `Committed ${pageDocuments.length + sectionDocuments.length + 1} Intelligent NOC documents.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
