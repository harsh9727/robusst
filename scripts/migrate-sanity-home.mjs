#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const HERO_IMAGES = [1, 2, 3, 4].map(
  (number) => `/home/hero/hero-${number}.webp`,
);
const HERO_VIDEOS = [
  "/home/hero/hero-one-video.mp4",
  null,
  null,
  "/home/hero/hero-two-video.mp4",
];
const TRUSTED_LOGOS = [
  "ask",
  "BCH",
  "cement",
  "gravity",
  "gulf",
  "idemitsu",
  "kaff",
  "kei",
  "microtek",
  "ozone",
  "plaza-cabels",
  "prayag",
  "sirca",
  "sparsh",
  "surface",
  "tricolite",
  "harrison",
  "okaya",
  "airtel",
  "belgium",
  "claro",
  "ireland",
  "iu",
  "mnt",
  "mobily",
  "movistar",
  "smart",
  "tt",
].map(
  (name) =>
    `/home/${["airtel", "belgium", "claro", "ireland", "iu", "mnt", "mobily", "movistar", "smart", "tt"].includes(name) ? "success" : "trustedby"}/${name}.webp`,
);
const SUCCESS_IMAGES = [
  "mnt",
  "airtel",
  "mobily",
  "smart",
  "claro",
  "movistar",
  "ireland",
  "belgium",
  "tt",
  "iu",
].map((name) => `/home/success/${name}.webp`);
const INDUSTRY_IMAGES = [
  "telecom",
  "banking",
  "fmcg",
  "retails",
  "IT",
  "food",
  "travel",
  "pharma",
].map((name) => `/home/industry-serve/${name}.webp`);
const HELP_IMAGES = [
  "revenue",
  "operational",
  "customer-experience",
  "transformation",
  "cyber-security",
  "network",
].map((name) => `/home/howwehelp/${name}.webp`);
const EVENT_IMAGES = [1, 2, 3, 4, 5, 6, 7, 8].map(
  (number) => `/home/events/${number}.webp`,
);
const PRESENCE_COORDINATES = [
  [133.7751, -25.2744], [-3.435973, 55.378051], [53.847818, 23.424076],
  [37.9062, -0.0236], [8.6753, 9.082], [80.7718, 7.8731], [84.124, 28.3949],
  [90.3563, 23.685], [105.3188, 61.524], [67.7099, 33.9391], [43.6793, 33.2232],
  [47.4818, 29.3117], [55.9233, 21.4735], [22.9375, -30.5595], [108.2772, 14.0583],
  [113.9213, -0.7893], [2.2137, 46.2276], [40.4897, 9.145], [17.2283, 26.3351],
  [34.8888, -6.369], [57.5522, -20.3484], [166.9315, -0.5228], [78.9629, 20.5937],
];
const LOCALIZED_DEFAULT_TITLES = {
  en: "Robusst | We monetize AI",
  fr: "Robusst | Nous monétisons l’IA",
  ru: "Robusst | Мы монетизируем ИИ",
  pt: "Robusst | Nós monetizamos IA",
  es: "Robusst | Monetizamos la IA",
  ar: "Robusst | نحقق الربح من الذكاء الاصطناعي",
};
const COMPARISON_COPY = {
  en: ["Without Us", "Declining performance & inefficiency", "With Us", "Exponential growth & optimization"],
  fr: ["Sans nous", "Performance en baisse et inefficacité", "Avec nous", "Croissance exponentielle et optimisation"],
  ru: ["Без нас", "Снижение производительности и неэффективность", "С нами", "Экспоненциальный рост и оптимизация"],
  pt: ["Sem nós", "Desempenho em declínio e ineficiência", "Connosco", "Crescimento exponencial e otimização"],
  es: ["Sin nosotros", "Rendimiento decreciente e ineficiencia", "Con nosotros", "Crecimiento exponencial y optimización"],
  ar: ["بدوننا", "تراجع الأداء وعدم الكفاءة", "معنا", "نمو متسارع وتحسين مستمر"],
};
const ACTION_COPY = {
  en: {
    solution: "Learn more",
    solutionAria: "Learn more about",
    story: "Learn more",
  },
  fr: {
    solution: "En savoir plus",
    solutionAria: "En savoir plus sur",
    story: "En savoir plus",
  },
  ru: {
    solution: "Подробнее",
    solutionAria: "Подробнее о",
    story: "Подробнее",
  },
  pt: {
    solution: "Saiba mais",
    solutionAria: "Saiba mais sobre",
    story: "Saiba mais",
  },
  es: {
    solution: "Más información",
    solutionAria: "Más información sobre",
    story: "Más información",
  },
  ar: {
    solution: "اعرف المزيد",
    solutionAria: "اعرف المزيد عن",
    story: "اعرف المزيد",
  },
};
const VIDEO_LABELS = {
  en: ["Play video", "Close video"],
  fr: ["Lire la vidéo", "Fermer la vidéo"],
  ru: ["Воспроизвести видео", "Закрыть видео"],
  pt: ["Reproduzir vídeo", "Fechar vídeo"],
  es: ["Reproducir vídeo", "Cerrar vídeo"],
  ar: ["تشغيل الفيديو", "إغلاق الفيديو"],
};
const BLOG_COPY = {
  en: [
    "Latest AI Insights & Blogs",
    "View all articles",
    "No blog posts found. Check back soon.",
    "Read article",
  ],
  fr: [
    "Dernières analyses et actualités sur l’IA",
    "Voir tous les articles",
    "Aucun article disponible. Revenez bientôt.",
    "Lire l’article",
  ],
  ru: [
    "Последние материалы и блоги об ИИ",
    "Все статьи",
    "Статьи не найдены. Загляните позже.",
    "Читать статью",
  ],
  pt: [
    "Últimos insights e artigos sobre IA",
    "Ver todos os artigos",
    "Nenhum artigo encontrado. Volte em breve.",
    "Ler artigo",
  ],
  es: [
    "Últimas novedades y artículos sobre IA",
    "Ver todos los artículos",
    "No se encontraron artículos. Vuelve pronto.",
    "Leer artículo",
  ],
  ar: [
    "أحدث الرؤى والمدونات حول الذكاء الاصطناعي",
    "عرض جميع المقالات",
    "لا توجد مقالات حاليًا. تحقق مرة أخرى قريبًا.",
    "قراءة المقال",
  ],
};

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

const stableKey = (value) =>
  createHash("sha1").update(value).digest("hex").slice(0, 12);

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

function link(label, href, ariaLabel) {
  return {
    _type: "contentLink",
    label,
    kind: "internal",
    href,
    ariaLabel,
    openInNewTab: false,
  };
}
function cta(label, href, style = "primary", ariaLabel) {
  return {
    _type: "callToAction",
    link: link(label, href, ariaLabel),
    style,
  };
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
function fileReference(assetByPath, publicPath) {
  const asset = assetByPath.get(publicPath);
  if (!asset) throw new Error(`Missing mapped asset ${publicPath}`);
  return {
    _type: "file",
    asset: { _type: "reference", _ref: asset.sanityAssetId },
  };
}
function card(identity, title, description, fields = {}) {
  return {
    _key: stableKey(identity),
    _type: "contentCard",
    internalName: identity,
    title,
    description,
    ...fields,
  };
}
function section(internalName, fields = {}) {
  return { _type: "fixedSection", internalName, ...fields };
}
function metadataFor(baseline, locale) {
  const capture = baseline.captures.find(
    (item) =>
      item.locale === locale &&
      item.routeId === "home" &&
      item.viewport === "desktop",
  );
  const description = capture?.page.metas.find(
    (meta) => meta.name === "description",
  )?.content;
  if (!capture?.page.title || !description)
    throw new Error(`Missing home metadata for ${locale}`);
  return { title: capture.page.title, description };
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
  const [assetMap, baseline, englishHome, generatedFrench] = await Promise.all([
    readFile(
      path.join(ROOT, `migration/sanity/asset-map.${options.dataset}.json`),
      "utf8",
    ).then(JSON.parse),
    readFile(path.join(ROOT, "migration/baseline/report.json"), "utf8").then(
      JSON.parse,
    ),
    activeContent("home", "en"),
    readFile(
      path.join(ROOT, "migration/translations/home.fr.generated.json"),
      "utf8",
    ).then(JSON.parse),
  ]);
  const assetByPath = new Map(
    Object.values(assetMap.assets).flatMap((asset) =>
      asset.sourcePaths.map((sourcePath) => [sourcePath, asset]),
    ),
  );
  const documents = [];

  for (const locale of LOCALES) {
    const [home, commonResponse] = await Promise.all([
      activeContent("home", locale),
      activeContent("common", locale),
    ]);
    const common = commonResponse.common;
    if (locale === "fr" && !home.techStack) {
      home.techStack = structuredClone(englishHome.techStack);
      home.techStack.heading = generatedFrench.techStack.heading;
      home.techStack.description = generatedFrench.techStack.description;
      for (const group of home.techStack.items) {
        group.title = generatedFrench.techStack.groupTitles[group.id];
      }
      for (const sectionName of [
        "trustedBy",
        "ourPresence",
        "whyChooseUs",
        "eventsCoverage",
        "successStories",
        "industriesWeServe",
      ]) {
        home[sectionName] = structuredClone(generatedFrench[sectionName]);
      }
    }
    const meta = metadataFor(baseline, locale);
    meta.title = LOCALIZED_DEFAULT_TITLES[locale];
    if (locale !== "en") {
      meta.description = home.about.paragraphs.join(" ").slice(0, 165);
    }
    const heroItems = home.hero.slides.map((slide, index) =>
      card(`${locale}.hero.${index}`, slide.title, slide.description, {
        image: image(assetByPath, HERO_IMAGES[index], slide.title),
        video: HERO_VIDEOS[index]
          ? {
              _type: "externalVideo",
              provider: "sanityFile",
              title: slide.title,
              videoFile: fileReference(assetByPath, HERO_VIDEOS[index]),
              poster: image(assetByPath, HERO_IMAGES[index], slide.title),
            }
          : undefined,
        cta: cta(slide.ctaText, "#ourSolution", "text"),
      }),
    );
    const techGroups = home.techStack.items.map((group, groupIndex) => ({
      _key: stableKey(`${locale}.tech.${group.id}`),
      _type: "contentGroup",
      internalName: group.id,
      title: group.title,
      items: group.tools.map((tool, index) =>
        card(`${locale}.tech.${groupIndex}.${index}`, tool.title, undefined, {
          image: image(assetByPath, tool.icon, tool.title),
        }),
      ),
    }));
    const quickImageCards = (items, paths, root) =>
      items.map((item, index) =>
        card(`${locale}.${root}.${index}`, item.title, item.description, {
          image: image(assetByPath, paths[index], item.title),
        }),
      );
    const blogCopy = BLOG_COPY[locale];
    const homeDocument = {
      _id: `homePage-${locale}`,
      _type: "homePage",
      internalTitle: `Home page — ${locale.toUpperCase()}`,
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
      hero: section("hero", { items: heroItems }),
      trustedBy: section("trustedBy", {
        title: home.trustedBy.heading,
        logos: TRUSTED_LOGOS.map((publicPath, index) => {
          const name = path.basename(publicPath, ".webp").replaceAll("-", " ");
          return {
            _key: stableKey(`${locale}.trusted.${index}`),
            _type: "logoItem",
            name,
            logo: image(assetByPath, publicPath, name),
          };
        }),
      }),
      about: section("about", {
        title: home.about.heading,
        subtitle: home.about.subheading,
        paragraphs: home.about.paragraphs,
        labels: VIDEO_LABELS[locale],
        image: image(assetByPath, "/home/about/about.webp", home.about.heading),
        video: {
          _type: "externalVideo",
          provider: "youtube",
          videoId: "PeLsX14sqUY",
          title: home.about.heading,
        },
      }),
      solutions: section("solutions", {
        title: home.solutions.heading,
        subtitle: home.solutions.subheading,
        countPrefix: home.solutions.countPrefix,
        items: home.solutions.items.map((item, index) =>
          card(`${locale}.solution.${index}`, item.title, item.description, {
            image: image(assetByPath, item.image, item.title),
            features: item.points,
            cta: cta(
              ACTION_COPY[locale].solution,
              `/solutions/${item.slug}`,
              "text",
              `${ACTION_COPY[locale].solutionAria} ${item.title}`,
            ),
          }),
        ),
      }),
      results: section("results", {
        title: home.results.heading,
        subtitle: home.results.subheading,
        description: home.results.description,
        image: image(
          assetByPath,
          "/home/result/result.webp",
          home.results.heading,
        ),
        items: home.results.items.map((item, index) =>
          card(`${locale}.result.${index}`, item.title, undefined, {
            eyebrow: item.label,
          }),
        ),
      }),
      successStories: section("successStories", {
        title: home.successStories.heading,
        countPrefix: home.successStories.countPrefix,
        primaryCta: cta(common.viewAll, "/stories", "text"),
        paragraphs: [ACTION_COPY[locale].story],
        items: quickImageCards(
          home.successStories.items,
          SUCCESS_IMAGES,
          "story",
        ),
      }),
      techStack: section("techStack", {
        title: home.techStack.heading,
        description: home.techStack.description,
        groups: techGroups,
      }),
      industriesWeServe: section("industriesWeServe", {
        title: home.industriesWeServe.heading,
        items: quickImageCards(
          home.industriesWeServe.items,
          INDUSTRY_IMAGES,
          "industry",
        ),
      }),
      howWeHelp: section("howWeHelp", {
        title: home.howWeHelp.heading,
        subtitle: home.howWeHelp.subheading,
        items: quickImageCards(home.howWeHelp.items, HELP_IMAGES, "help"),
      }),
      eventsCoverage: section("eventsCoverage", {
        title: home.eventsCoverage.heading,
        subtitle: home.eventsCoverage.subheading,
        images: EVENT_IMAGES.map((publicPath, index) => ({
          ...image(
            assetByPath,
            publicPath,
            `${home.eventsCoverage.heading} ${index + 1}`,
          ),
          _key: stableKey(`${locale}.event.${index}`),
        })),
      }),
      whyChooseUs: section("whyChooseUs", {
        title: home.whyChooseUs.heading,
        labels: COMPARISON_COPY[locale],
        items: home.whyChooseUs.points.map((item, index) =>
          card(`${locale}.why.${index}`, item.title, item.description),
        ),
      }),
      blogs: section("blogs", {
        title: blogCopy[0],
        primaryCta: cta(blogCopy[1], "/blogs", "text"),
        paragraphs: [blogCopy[2], blogCopy[3]],
      }),
      ourPresence: section("ourPresence", {
        title: home.ourPresence.heading,
        subtitle: home.ourPresence.mobileListHeading,
        labels: home.ourPresence.countries,
        items: home.ourPresence.countries.map((title, index) =>
          card(`presence-${index + 1}`, title, undefined, {
            longitude: PRESENCE_COORDINATES[index][0],
            latitude: PRESENCE_COORDINATES[index][1],
          }),
        ),
      }),
      contact: section("contact", {
        title: home.contact.heading,
        subtitle: home.contact.subheading,
        primaryCta: cta(home.contact.ctaText, "/contact"),
      }),
    };
    documents.push(homeDocument);
  }
  documents.push({
    _id: "translation.metadata.homePage",
    _type: "translation.metadata",
    schemaTypes: ["homePage"],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `homePage-${locale}` },
    })),
  });

  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        homePages: LOCALES.length,
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
  console.log(`Committed ${result.documentIds.length} home documents.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
