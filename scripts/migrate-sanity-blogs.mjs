#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
import { remark } from "remark";
import remarkGfm from "remark-gfm";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const EXECUTE = process.argv.includes("--execute");
const ALLOW_PRODUCTION = process.argv.includes("--allow-production");
const REFRESH_SOURCE = process.argv.includes("--refresh-source");
const SECTION_KEYS = ["hero", "listing", "emptyState", "articleUi", "cta"];

const INDEX_COPY = {
  en: {
    hero: [
      "AI & Telecom Blog",
      "Expert perspectives on AI-driven telecom transformation, network monetization, and enterprise digital strategy — from the Robusst team.",
    ],
    count: ["article published", "articles published"],
    read: "Read",
    empty: ["No articles yet", "No articles have been published yet."],
    ui: ["Home", "Blog", "min read", "words", "Related Articles"],
    cta: [
      "Want results like this for your enterprise?",
      "Talk to our team about deploying AI solutions for telecom & banking.",
      "Get in Touch →",
    ],
  },
  fr: {
    hero: [
      "Blog IA et télécommunications",
      "Découvrez les analyses de l’équipe Robusst sur la transformation des télécommunications par l’IA, la monétisation des réseaux et la stratégie numérique des entreprises.",
    ],
    count: ["article publié", "articles publiés"],
    read: "Lire",
    empty: [
      "Aucun article pour le moment",
      "Aucun article n’a encore été publié.",
    ],
    ui: ["Accueil", "Blog", "min de lecture", "mots", "Articles connexes"],
    cta: [
      "Vous souhaitez obtenir des résultats similaires pour votre entreprise ?",
      "Échangez avec notre équipe sur le déploiement de solutions d’IA pour les télécommunications et la banque.",
      "Nous contacter →",
    ],
  },
  ru: {
    hero: [
      "Блог об ИИ и телекоммуникациях",
      "Экспертные материалы команды Robusst о трансформации телекоммуникаций с помощью ИИ, монетизации сетей и цифровой стратегии предприятий.",
    ],
    count: ["статья опубликована", "статей опубликовано"],
    read: "Читать",
    empty: ["Статей пока нет", "Пока не опубликовано ни одной статьи."],
    ui: ["Главная", "Блог", "мин чтения", "слов", "Похожие статьи"],
    cta: [
      "Хотите получить такие же результаты для своей компании?",
      "Обсудите с нашей командой внедрение ИИ-решений для телекоммуникаций и банков.",
      "Связаться →",
    ],
  },
  pt: {
    hero: [
      "Blog de IA e telecomunicações",
      "Perspectivas da equipa Robusst sobre transformação das telecomunicações com IA, monetização de redes e estratégia digital empresarial.",
    ],
    count: ["artigo publicado", "artigos publicados"],
    read: "Ler",
    empty: ["Ainda não há artigos", "Ainda não foi publicado nenhum artigo."],
    ui: [
      "Início",
      "Blog",
      "min de leitura",
      "palavras",
      "Artigos relacionados",
    ],
    cta: [
      "Quer obter resultados semelhantes para a sua empresa?",
      "Fale com a nossa equipa sobre a implementação de soluções de IA para telecomunicações e banca.",
      "Entrar em contacto →",
    ],
  },
  es: {
    hero: [
      "Blog de IA y telecomunicaciones",
      "Perspectivas del equipo de Robusst sobre transformación de las telecomunicaciones con IA, monetización de redes y estrategia digital empresarial.",
    ],
    count: ["artículo publicado", "artículos publicados"],
    read: "Leer",
    empty: [
      "Todavía no hay artículos",
      "Todavía no se ha publicado ningún artículo.",
    ],
    ui: [
      "Inicio",
      "Blog",
      "min de lectura",
      "palabras",
      "Artículos relacionados",
    ],
    cta: [
      "¿Quieres obtener resultados similares para tu empresa?",
      "Habla con nuestro equipo sobre la implementación de soluciones de IA para telecomunicaciones y banca.",
      "Contactar →",
    ],
  },
  ar: {
    hero: [
      "مدونة الذكاء الاصطناعي والاتصالات",
      "رؤى خبراء فريق Robusst حول التحول في قطاع الاتصالات بالذكاء الاصطناعي وتحقيق الدخل من الشبكات والاستراتيجية الرقمية للمؤسسات.",
    ],
    count: ["مقال منشور", "مقالات منشورة"],
    read: "اقرأ",
    empty: ["لا توجد مقالات بعد", "لم يتم نشر أي مقالات بعد."],
    ui: ["الرئيسية", "المدونة", "دقيقة قراءة", "كلمة", "مقالات ذات صلة"],
    cta: [
      "هل تريد تحقيق نتائج مماثلة لمؤسستك؟",
      "تحدث مع فريقنا حول نشر حلول الذكاء الاصطناعي لقطاعي الاتصالات والخدمات المصرفية.",
      "تواصل معنا ←",
    ],
  },
};

function keyFactory(prefix) {
  let index = 0;
  return () => `${prefix}-${++index}`;
}

function normalizeHref(href, locale) {
  try {
    const url = new URL(href);
    if (url.hostname === "www.robusst.com" || url.hostname === "robusst.com") {
      return (
        url.pathname.replace(/^\/(en|fr|ru|pt|es|ar)(?=\/|$)/, `/${locale}`) +
        url.search +
        url.hash
      );
    }
  } catch {
    /* Relative links are handled below. */
  }
  return href.replace(/^\/(en|fr|ru|pt|es|ar)(?=\/|$)/, `/${locale}`);
}

function portableTextFromMarkdown(markdown, locale, slug) {
  const tree = remark().use(remarkGfm).parse(markdown);
  const nextKey = keyFactory(`blog-${locale}-${slug.slice(0, 16)}`);

  function inline(nodes, markDefs = [], marks = []) {
    const spans = [];
    for (const node of nodes ?? []) {
      if (node.type === "text")
        spans.push({ _type: "span", _key: nextKey(), text: node.value, marks });
      else if (node.type === "strong")
        spans.push(...inline(node.children, markDefs, [...marks, "strong"]));
      else if (node.type === "emphasis")
        spans.push(...inline(node.children, markDefs, [...marks, "em"]));
      else if (node.type === "delete")
        spans.push(
          ...inline(node.children, markDefs, [...marks, "strike-through"]),
        );
      else if (node.type === "inlineCode")
        spans.push({
          _type: "span",
          _key: nextKey(),
          text: node.value,
          marks: [...marks, "code"],
        });
      else if (node.type === "break")
        spans.push({ _type: "span", _key: nextKey(), text: "\n", marks });
      else if (node.type === "link") {
        const markKey = nextKey();
        markDefs.push({
          _type: "link",
          _key: markKey,
          href: normalizeHref(node.url, locale),
          openInNewTab:
            /^https?:\/\//.test(node.url) && !node.url.includes("robusst.com"),
        });
        spans.push(...inline(node.children, markDefs, [...marks, markKey]));
      } else if (node.value)
        spans.push({
          _type: "span",
          _key: nextKey(),
          text: String(node.value),
          marks,
        });
    }
    return spans;
  }

  function block(node, extra = {}) {
    const markDefs = [];
    return {
      _type: "block",
      _key: nextKey(),
      style: node.type === "heading" ? `h${node.depth}` : "normal",
      markDefs,
      children: inline(node.children, markDefs),
      ...extra,
    };
  }

  function convert(nodes, listContext) {
    const result = [];
    for (const node of nodes ?? []) {
      if (node.type === "paragraph" || node.type === "heading")
        result.push(block(node, listContext ?? {}));
      else if (node.type === "list") {
        for (const item of node.children ?? [])
          result.push(
            ...convert(item.children, {
              listItem: node.ordered ? "number" : "bullet",
              level: 1,
            }),
          );
      } else if (node.type === "blockquote") {
        for (const child of node.children ?? [])
          if (child.type === "paragraph")
            result.push({ ...block(child), style: "blockquote" });
      } else if (node.type === "code")
        result.push({
          _type: "codeBlock",
          _key: nextKey(),
          language: node.lang ?? undefined,
          code: node.value,
        });
      else if (node.children)
        result.push(...convert(node.children, listContext));
    }
    return result;
  }

  return convert(tree.children);
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

function metadataDocument(id, schemaType, translations) {
  return {
    _id: id,
    _type: "translation.metadata",
    schemaTypes: [schemaType],
    translations: translations.map(({ language, documentId }) => ({
      _key: language,
      _type: "internationalizedArrayReferenceValue",
      language,
      value: { _type: "reference", _ref: documentId },
    })),
  };
}

function relatedSlugs(post, posts, limit = 3) {
  const tokens = (values) =>
    new Set(
      values
        .join(" ")
        .toLowerCase()
        .split(/\W+/)
        .filter((word) => word.length > 3),
    );
  const current = tokens([
    post.meta?.primaryKeyword ?? "",
    ...(post.tags ?? []),
  ]);
  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      slug: candidate.slug,
      score: [
        ...tokens([
          candidate.meta?.primaryKeyword ?? "",
          ...(candidate.tags ?? []),
        ]),
      ].filter((token) => current.has(token)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ slug }) => slug);
}

async function fetchJson(url, apiKey) {
  const response = await fetch(url, { headers: { "x-api-key": apiKey } });
  if (!response.ok)
    throw new Error(
      `${url} returned ${response.status}: ${await response.text()}`,
    );
  return response.json();
}

async function main() {
  if (typeof process.loadEnvFile === "function") {
    try {
      process.loadEnvFile(path.join(ROOT, ".env"));
    } catch {
      /* CI supplies environment variables. */
    }
  }
  const dataset =
    process.argv
      .find((argument) => argument.startsWith("--dataset="))
      ?.slice(10) ??
    process.env.NEXT_PUBLIC_SANITY_DATASET ??
    "development";
  if (dataset === "production" && !ALLOW_PRODUCTION)
    throw new Error("Production migration requires --allow-production");
  const [assetMap, routeMap] = await Promise.all([
    readFile(
      path.join(ROOT, `migration/sanity/asset-map.${dataset}.json`),
      "utf8",
    ).then(JSON.parse),
    readFile(
      path.join(ROOT, "migration/audit/blog-route-map.json"),
      "utf8",
    ).then(JSON.parse),
  ]);
  const assetByPath = new Map(
    Object.values(assetMap.assets).flatMap((asset) =>
      asset.sourcePaths.map((sourcePath) => [sourcePath, asset]),
    ),
  );
  const expectedSlugs = routeMap.entries
    .map((entry) => entry.productionSlug)
    .sort();
  const cmsBaseUrl = process.env.CMS_BASE_URL;
  const cmsApiKey = process.env.CMS_API_KEY;
  const snapshotPath = path.join(
    ROOT,
    "migration/sanity/blog-source.snapshot.json",
  );
  let localizedPosts;
  if (!REFRESH_SOURCE) {
    try {
      localizedPosts = JSON.parse(await readFile(snapshotPath, "utf8")).locales;
    } catch {
      localizedPosts = undefined;
    }
  }
  if (!localizedPosts) {
    if (!cmsBaseUrl || !cmsApiKey)
      throw new Error(
        "CMS_BASE_URL and CMS_API_KEY are required while capturing the transitional blog source",
      );
    localizedPosts = {};
    for (const locale of LOCALES) {
      const listUrl = new URL("/api/v1/blogs", cmsBaseUrl);
      listUrl.searchParams.set("locale", locale);
      const list = (await fetchJson(listUrl, cmsApiKey)).data?.posts ?? [];
      const slugs = list.map((post) => post.slug).sort();
      if (JSON.stringify(slugs) !== JSON.stringify(expectedSlugs))
        throw new Error(
          `${locale} blog slugs do not match the 15 audited production routes`,
        );
      localizedPosts[locale] = [];
      for (const listedPost of list) {
        const postUrl = new URL(`/api/v1/blogs/${listedPost.slug}`, cmsBaseUrl);
        postUrl.searchParams.set("locale", locale);
        const post = (await fetchJson(postUrl, cmsApiKey)).data;
        if (!post?.body)
          throw new Error(`${locale}/${listedPost.slug} has no body`);
        localizedPosts[locale].push(post);
      }
    }
    await writeFile(
      snapshotPath,
      `${JSON.stringify(
        {
          schemaVersion: 1,
          capturedAt: new Date().toISOString(),
          source: "active-transitional-blog-api",
          routeMap: "migration/audit/blog-route-map.json",
          locales: localizedPosts,
        },
        null,
        2,
      )}\n`,
    );
  }
  for (const locale of LOCALES) {
    const slugs = (localizedPosts[locale] ?? [])
      .map((post) => post.slug)
      .sort();
    if (JSON.stringify(slugs) !== JSON.stringify(expectedSlugs))
      throw new Error(`${locale} snapshot does not match the audited routes`);
  }

  const documents = [];
  const sectionDocuments = [];
  for (const locale of LOCALES) {
    const copy = INDEX_COPY[locale];
    const sectionContent = {
      hero: {
        _type: "fixedSection",
        internalName: "hero",
        title: copy.hero[0],
        description: copy.hero[1],
      },
      listing: {
        _type: "fixedSection",
        internalName: "listing",
        labels: [...copy.count, copy.read],
      },
      emptyState: {
        _type: "fixedSection",
        internalName: "emptyState",
        title: copy.empty[0],
        description: copy.empty[1],
      },
      articleUi: {
        _type: "fixedSection",
        internalName: "articleUi",
        labels: copy.ui,
      },
      cta: {
        _type: "fixedSection",
        internalName: "cta",
        title: copy.cta[0],
        description: copy.cta[1],
        primaryCta: {
          _type: "callToAction",
          style: "primary",
          link: {
            _type: "link",
            label: copy.cta[2],
            href: "/contact",
            kind: "internal",
          },
        },
      },
    };
    const pageId = `blogIndexPage-${locale}`;
    const page = {
      _id: pageId,
      _type: "blogIndexPage",
      internalTitle: `Blog listing — ${locale.toUpperCase()}`,
      language: locale,
      translation: {
        _type: "translationWorkflow",
        status: locale === "en" ? "source" : "generated",
        sourceLanguage: "en",
        reviewNotes:
          locale === "en"
            ? "Canonical active blog source."
            : "Generated blog UI copy and migrated active localized posts require human review.",
      },
      seo: {
        _type: "seo",
        metaTitle: `${copy.hero[0]} | Robusst`,
        metaDescription: copy.hero[1],
        keywords: localizedPosts[locale]
          .flatMap((post) => [post.meta?.primaryKeyword, ...(post.tags ?? [])])
          .filter(Boolean)
          .slice(0, 20),
        socialTitle: copy.hero[0],
        socialDescription: copy.hero[1],
        socialImage: image(assetByPath, "/opengraph-image.webp", copy.hero[0]),
        noIndex: false,
      },
    };
    for (const sectionKey of SECTION_KEYS) {
      const sectionId = `fixedPageSection-blogIndexPage-${locale}-${sectionKey}`;
      sectionDocuments.push({
        _id: sectionId,
        _type: "fixedPageSection",
        internalTitle: `Blog listing ${sectionKey} — ${locale.toUpperCase()}`,
        pageType: "blogIndexPage",
        sectionKey,
        language: locale,
        content: sectionContent[sectionKey],
      });
      page[sectionKey] = { _type: "reference", _ref: sectionId };
    }
    documents.push(page);
  }
  documents.push(
    metadataDocument(
      "translation.metadata.blogIndexPage",
      "blogIndexPage",
      LOCALES.map((language) => ({
        language,
        documentId: `blogIndexPage-${language}`,
      })),
    ),
  );

  for (const locale of LOCALES) {
    for (const post of localizedPosts[locale]) {
      const documentId = `blogPost-${locale}-${post.slug}`;
      const relatedPosts = relatedSlugs(post, localizedPosts[locale]).map(
        (slug) => ({
          _key: slug,
          _type: "reference",
          _ref: `blogPost-${locale}-${slug}`,
          _weak: true,
        }),
      );
      documents.push({
        _id: documentId,
        _type: "blogPost",
        title: post.title,
        slug: { _type: "slug", current: post.slug },
        excerpt: post.excerpt,
        coverImage: image(assetByPath, "/opengraph-image.webp", post.title),
        publishedAt: post.publishedAt,
        updatedAtEditorial: post.updatedAt,
        authorName: post.author?.name ?? "Robusst Team",
        authorImage: image(
          assetByPath,
          "/logo.webp",
          post.author?.name ?? "Robusst Team",
        ),
        categories: post.tags ?? [],
        body: portableTextFromMarkdown(post.body, locale, post.slug),
        relatedPosts,
        seo: {
          _type: "seo",
          metaTitle: post.meta?.metaTitle ?? post.title,
          metaDescription: post.meta?.metaDescription ?? post.excerpt,
          keywords: [post.meta?.primaryKeyword, ...(post.tags ?? [])].filter(
            Boolean,
          ),
          socialTitle: post.title,
          socialDescription: post.excerpt,
          socialImage: image(assetByPath, "/opengraph-image.webp", post.title),
          noIndex: false,
        },
        language: locale,
        translation: {
          _type: "translationWorkflow",
          status: locale === "en" ? "source" : "generated",
          sourceLanguage: "en",
          reviewNotes:
            locale === "en"
              ? "Migrated from the active English blog and audited Markdown source."
              : "Migrated active localized blog content; human language and link review required.",
        },
      });
    }
  }
  for (const slug of expectedSlugs)
    documents.push(
      metadataDocument(
        `translation.metadata.blogPost-${slug}`,
        "blogPost",
        LOCALES.map((language) => ({
          language,
          documentId: `blogPost-${language}-${slug}`,
        })),
      ),
    );

  const summary = {
    dataset,
    execute: EXECUTE,
    blogIndexPages: 6,
    referencedPageSections: sectionDocuments.length,
    blogPosts: 90,
    translationMetadata: 16,
    portableTextBlocks: documents
      .filter((document) => document._type === "blogPost")
      .reduce((total, document) => total + document.body.length, 0),
  };
  console.log(JSON.stringify(summary, null, 2));
  if (!EXECUTE) return;
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    apiVersion: "2026-08-15",
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
  });
  for (const document of [...sectionDocuments, ...documents])
    await client.createOrReplace(document, { visibility: "sync" });
  console.log(
    `Committed ${sectionDocuments.length + documents.length} blog documents to ${dataset}.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
