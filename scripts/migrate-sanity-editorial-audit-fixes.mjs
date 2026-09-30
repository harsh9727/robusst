#!/usr/bin/env node
import { createHash } from "node:crypto";
import path from "node:path";
import { createClient } from "@sanity/client";

const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const EXECUTE = process.argv.includes("--execute");
const ALLOW_PRODUCTION = process.argv.includes("--allow-production");

const PRESENCE_COORDINATES = [
  [133.7751, -25.2744], [-3.435973, 55.378051], [53.847818, 23.424076],
  [37.9062, -0.0236], [8.6753, 9.082], [80.7718, 7.8731], [84.124, 28.3949],
  [90.3563, 23.685], [105.3188, 61.524], [67.7099, 33.9391], [43.6793, 33.2232],
  [47.4818, 29.3117], [55.9233, 21.4735], [22.9375, -30.5595], [108.2772, 14.0583],
  [113.9213, -0.7893], [2.2137, 46.2276], [40.4897, 9.145], [17.2283, 26.3351],
  [34.8888, -6.369], [57.5522, -20.3484], [166.9315, -0.5228], [78.9629, 20.5937],
];

const COPY = {
  en: {
    role: "Editorial team",
    bio: "The Robusst editorial team shares practical insights on artificial intelligence, telecommunications, network monetization, and enterprise digital transformation.",
    postsHeading: "Articles by the Robusst Team",
    emptyPostsMessage: "No articles have been published by this author yet.",
    breadcrumbLabel: "Breadcrumb",
    homeLabel: "Home",
    blogLabel: "Blog",
    minuteReadLabel: "min read",
    wordsLabel: "words",
    relatedArticlesHeading: "Related Articles",
    bylineLabel: "By",
    authorProfileHeading: "About the author",
    articleSingularLabel: "article published",
    articlePluralLabel: "articles published",
    readArticleLabel: "Read article",
    calendlyLoadingLabel: "Loading scheduling widget…",
    previousSlideLabel: "Previous slide",
    nextSlideLabel: "Next slide",
    llmsLinkTitle: "LLM-readable site index",
    contactPointType: "Customer Service",
    loginPageTitle: "Login",
    dashboardPageTitle: "Dashboard",
    ogBadgeLabel: "AI Solutions · Telecom & Banking",
    infrastructureFlow: "Infrastructure & Flow",
    today: "Today",
    comparison: ["Without Us", "Declining performance & inefficiency", "With Us", "Exponential growth & optimization"],
  },
  fr: {
    role: "Équipe éditoriale",
    bio: "L’équipe éditoriale de Robusst partage des analyses pratiques sur l’intelligence artificielle, les télécommunications, la monétisation des réseaux et la transformation numérique des entreprises.",
    postsHeading: "Articles de l’équipe Robusst",
    emptyPostsMessage: "Aucun article n’a encore été publié par cet auteur.",
    breadcrumbLabel: "Fil d’Ariane",
    homeLabel: "Accueil",
    blogLabel: "Blog",
    minuteReadLabel: "min de lecture",
    wordsLabel: "mots",
    relatedArticlesHeading: "Articles connexes",
    bylineLabel: "Par",
    authorProfileHeading: "À propos de l’auteur",
    articleSingularLabel: "article publié",
    articlePluralLabel: "articles publiés",
    readArticleLabel: "Lire l’article",
    calendlyLoadingLabel: "Chargement du module de planification…",
    previousSlideLabel: "Diapositive précédente",
    nextSlideLabel: "Diapositive suivante",
    llmsLinkTitle: "Index du site lisible par les LLM",
    contactPointType: "Service client",
    loginPageTitle: "Connexion",
    dashboardPageTitle: "Tableau de bord",
    ogBadgeLabel: "Solutions IA · Télécoms et banque",
    infrastructureFlow: "Infrastructure et flux",
    today: "Aujourd’hui",
    comparison: ["Sans nous", "Performance en baisse et inefficacité", "Avec nous", "Croissance exponentielle et optimisation"],
  },
  ru: {
    role: "Редакционная команда",
    bio: "Редакционная команда Robusst делится практическими материалами об искусственном интеллекте, телекоммуникациях, монетизации сетей и цифровой трансформации предприятий.",
    postsHeading: "Статьи команды Robusst",
    emptyPostsMessage: "Этот автор пока не опубликовал ни одной статьи.",
    breadcrumbLabel: "Навигационная цепочка",
    homeLabel: "Главная",
    blogLabel: "Блог",
    minuteReadLabel: "мин чтения",
    wordsLabel: "слов",
    relatedArticlesHeading: "Похожие статьи",
    bylineLabel: "Автор",
    authorProfileHeading: "Об авторе",
    articleSingularLabel: "статья опубликована",
    articlePluralLabel: "статей опубликовано",
    readArticleLabel: "Читать статью",
    calendlyLoadingLabel: "Загрузка виджета планирования…",
    previousSlideLabel: "Предыдущий слайд",
    nextSlideLabel: "Следующий слайд",
    llmsLinkTitle: "Индекс сайта для LLM",
    contactPointType: "Служба поддержки клиентов",
    loginPageTitle: "Вход",
    dashboardPageTitle: "Панель управления",
    ogBadgeLabel: "ИИ-решения · Телеком и банки",
    infrastructureFlow: "Инфраструктура и поток",
    today: "Сегодня",
    comparison: ["Без нас", "Снижение производительности и неэффективность", "С нами", "Экспоненциальный рост и оптимизация"],
  },
  pt: {
    role: "Equipa editorial",
    bio: "A equipa editorial da Robusst partilha perspetivas práticas sobre inteligência artificial, telecomunicações, monetização de redes e transformação digital empresarial.",
    postsHeading: "Artigos da equipa Robusst",
    emptyPostsMessage: "Este autor ainda não publicou artigos.",
    breadcrumbLabel: "Navegação estrutural",
    homeLabel: "Início",
    blogLabel: "Blog",
    minuteReadLabel: "min de leitura",
    wordsLabel: "palavras",
    relatedArticlesHeading: "Artigos relacionados",
    bylineLabel: "Por",
    authorProfileHeading: "Sobre o autor",
    articleSingularLabel: "artigo publicado",
    articlePluralLabel: "artigos publicados",
    readArticleLabel: "Ler artigo",
    calendlyLoadingLabel: "A carregar o módulo de agendamento…",
    previousSlideLabel: "Diapositivo anterior",
    nextSlideLabel: "Diapositivo seguinte",
    llmsLinkTitle: "Índice do site legível por LLM",
    contactPointType: "Apoio ao cliente",
    loginPageTitle: "Iniciar sessão",
    dashboardPageTitle: "Painel",
    ogBadgeLabel: "Soluções de IA · Telecomunicações e banca",
    infrastructureFlow: "Infraestrutura e fluxo",
    today: "Hoje",
    comparison: ["Sem nós", "Desempenho em declínio e ineficiência", "Connosco", "Crescimento exponencial e otimização"],
  },
  es: {
    role: "Equipo editorial",
    bio: "El equipo editorial de Robusst comparte perspectivas prácticas sobre inteligencia artificial, telecomunicaciones, monetización de redes y transformación digital empresarial.",
    postsHeading: "Artículos del equipo Robusst",
    emptyPostsMessage: "Este autor todavía no ha publicado artículos.",
    breadcrumbLabel: "Migas de pan",
    homeLabel: "Inicio",
    blogLabel: "Blog",
    minuteReadLabel: "min de lectura",
    wordsLabel: "palabras",
    relatedArticlesHeading: "Artículos relacionados",
    bylineLabel: "Por",
    authorProfileHeading: "Sobre el autor",
    articleSingularLabel: "artículo publicado",
    articlePluralLabel: "artículos publicados",
    readArticleLabel: "Leer artículo",
    calendlyLoadingLabel: "Cargando el módulo de programación…",
    previousSlideLabel: "Diapositiva anterior",
    nextSlideLabel: "Diapositiva siguiente",
    llmsLinkTitle: "Índice del sitio legible por LLM",
    contactPointType: "Atención al cliente",
    loginPageTitle: "Iniciar sesión",
    dashboardPageTitle: "Panel",
    ogBadgeLabel: "Soluciones de IA · Telecomunicaciones y banca",
    infrastructureFlow: "Infraestructura y flujo",
    today: "Hoy",
    comparison: ["Sin nosotros", "Rendimiento decreciente e ineficiencia", "Con nosotros", "Crecimiento exponencial y optimización"],
  },
  ar: {
    role: "فريق التحرير",
    bio: "يشارك فريق تحرير Robusst رؤى عملية حول الذكاء الاصطناعي والاتصالات وتحقيق الدخل من الشبكات والتحول الرقمي للمؤسسات.",
    postsHeading: "مقالات فريق Robusst",
    emptyPostsMessage: "لم ينشر هذا الكاتب أي مقالات بعد.",
    breadcrumbLabel: "مسار التنقل",
    homeLabel: "الرئيسية",
    blogLabel: "المدونة",
    minuteReadLabel: "دقيقة قراءة",
    wordsLabel: "كلمة",
    relatedArticlesHeading: "مقالات ذات صلة",
    bylineLabel: "بقلم",
    authorProfileHeading: "نبذة عن الكاتب",
    articleSingularLabel: "مقال منشور",
    articlePluralLabel: "مقالات منشورة",
    readArticleLabel: "اقرأ المقال",
    calendlyLoadingLabel: "جارٍ تحميل أداة الجدولة…",
    previousSlideLabel: "الشريحة السابقة",
    nextSlideLabel: "الشريحة التالية",
    llmsLinkTitle: "فهرس الموقع القابل للقراءة بواسطة نماذج اللغة",
    contactPointType: "خدمة العملاء",
    loginPageTitle: "تسجيل الدخول",
    dashboardPageTitle: "لوحة التحكم",
    ogBadgeLabel: "حلول الذكاء الاصطناعي · الاتصالات والخدمات المصرفية",
    infrastructureFlow: "البنية التحتية والتدفق",
    today: "اليوم",
    comparison: ["بدوننا", "تراجع الأداء وعدم الكفاءة", "معنا", "نمو متسارع وتحسين مستمر"],
  },
};

function keyFor(...parts) {
  return createHash("sha1").update(parts.join("\0")).digest("hex").slice(0, 12);
}

function addMissingArrayKeys(value, documentId, pathParts = [], fixes = []) {
  if (Array.isArray(value)) {
    let changed = false;
    const next = value.map((item, index) => {
      if (!item || typeof item !== "object" || Array.isArray(item) || item._key) return item;
      changed = true;
      return {
        ...item,
        _key: keyFor(documentId, pathParts.join("."), String(index), item._type ?? "item"),
      };
    });
    if (changed) fixes.push({ path: pathParts.join("."), value: next });
    next.forEach((item, index) => addMissingArrayKeys(item, documentId, [...pathParts, String(index)], fixes));
    return fixes;
  }
  if (value && typeof value === "object")
    for (const [key, child] of Object.entries(value))
      if (!key.startsWith("_")) addMissingArrayKeys(child, documentId, [...pathParts, key], fixes);
  return fixes;
}

function socialIconKey(link) {
  const identity = `${link?.label ?? ""} ${link?.href ?? ""}`.toLowerCase();
  if (identity.includes("linkedin")) return "FaLinkedinIn";
  if (identity.includes("instagram")) return "FaInstagram";
  if (identity.includes("youtube")) return "IoLogoYoutube";
  return link?.iconKey ?? "Globe";
}

function authorDocument(locale, sourcePost) {
  const copy = COPY[locale];
  const image = sourcePost.authorImage ?? sourcePost.coverImage;
  return {
    _id: `author-robusst-team-${locale}`,
    _type: "author",
    name: sourcePost.authorName ?? "Robusst Team",
    slug: { _type: "slug", current: "robusst-team" },
    role: copy.role,
    bio: copy.bio,
    image,
    postsHeading: copy.postsHeading,
    emptyPostsMessage: copy.emptyPostsMessage,
    website: "https://www.robusst.com",
    socialLinks: [],
    seo: {
      _type: "seo",
      metaTitle: `${sourcePost.authorName ?? "Robusst Team"} | Robusst`,
      metaDescription: copy.bio,
      socialTitle: sourcePost.authorName ?? "Robusst Team",
      socialDescription: copy.bio,
      socialImage: image,
      noIndex: false,
    },
    language: locale,
    translation: {
      _type: "translationWorkflow",
      status: locale === "en" ? "source" : "generated",
      sourceLanguage: "en",
      reviewNotes: locale === "en" ? "Canonical author profile." : "Generated author profile translation requires human review.",
    },
  };
}

async function main() {
  if (typeof process.loadEnvFile === "function") process.loadEnvFile(path.join(process.cwd(), ".env"));
  const dataset = process.argv.find((value) => value.startsWith("--dataset="))?.slice(10) ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? "development";
  if (dataset === "production" && !ALLOW_PRODUCTION) throw new Error("Production migration requires --allow-production");
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset,
    apiVersion: "2026-08-15",
    token: EXECUTE ? process.env.SANITY_API_WRITE_TOKEN : process.env.SANITY_API_READ_TOKEN,
    useCdn: false,
    perspective: "raw",
  });
  const [posts, pages, settings, homePages, aiPages, cdpPages, rawDocuments] = await Promise.all([
    client.fetch('*[_type == "blogPost"]{_id,language,authorName,authorImage,coverImage}'),
    client.fetch('*[_type == "blogIndexPage"]{_id,language}'),
    client.fetch('*[_type == "siteSettings"]{_id,language,socialLinks}'),
    client.fetch('*[_type == "homePage"]{_id,language,"countries":ourPresence.labels}'),
    client.fetch('*[_type == "aiCallCenterPage"]{_id,language,"sectionId":enterpriseArchitecture._ref}'),
    client.fetch('*[_type == "customerDataPlatformPage"]{_id,language}'),
    client.fetch('*[!(_id in path("_.**")) && !(_type match "sanity.*")]'),
  ]);
  const sourceByLocale = new Map(LOCALES.map((locale) => [locale, posts.find((post) => post.language === locale)]));
  for (const locale of LOCALES) if (!sourceByLocale.get(locale)) throw new Error(`Missing ${locale} blog source`);

  const authors = LOCALES.map((locale) => authorDocument(locale, sourceByLocale.get(locale)));
  const metadata = {
    _id: "translation.metadata.author-robusst-team",
    _type: "translation.metadata",
    schemaTypes: ["author"],
    translations: LOCALES.map((language) => ({
      _key: language,
      _type: "internationalizedArrayReferenceValue",
      language,
      value: { _type: "reference", _ref: `author-robusst-team-${language}` },
    })),
  };
  const keyFixes = rawDocuments.flatMap((document) =>
    addMissingArrayKeys(document, document._id).map((fix) => ({ documentId: document._id, ...fix })),
  );
  const summary = {
    dataset,
    execute: EXECUTE,
    authors: authors.length,
    postsToLink: posts.filter((post) => LOCALES.includes(post.language)).length,
    blogPagesToUpdate: pages.length,
    siteSettingsToUpdate: settings.length,
    presenceMapsToUpdate: homePages.length,
    comparisonSectionsToUpdate: homePages.length,
    architectureSectionsToUpdate: aiPages.length,
    cdpCtasToUpdate: cdpPages.length,
    arraysMissingKeys: keyFixes.length,
  };
  console.log(JSON.stringify(summary, null, 2));
  if (!EXECUTE) return;

  for (const author of authors) await client.createIfNotExists(author, { visibility: "sync" });
  await client.createOrReplace(metadata, { visibility: "sync" });
  for (const post of posts) {
    if (!LOCALES.includes(post.language)) continue;
    await client.patch(post._id).setIfMissing({ author: { _type: "reference", _ref: `author-robusst-team-${post.language}` } }).commit({ visibility: "sync" });
  }
  for (const page of pages) {
    const copy = COPY[page.language];
    if (!copy) continue;
    await client.patch(page._id).setIfMissing({
      blogUi: {
        _type: "blogUiCopy",
        breadcrumbLabel: copy.breadcrumbLabel,
        homeLabel: copy.homeLabel,
        blogLabel: copy.blogLabel,
        minuteReadLabel: copy.minuteReadLabel,
        wordsLabel: copy.wordsLabel,
        relatedArticlesHeading: copy.relatedArticlesHeading,
        bylineLabel: copy.bylineLabel,
        authorProfileHeading: copy.authorProfileHeading,
        articleSingularLabel: copy.articleSingularLabel,
        articlePluralLabel: copy.articlePluralLabel,
        readArticleLabel: copy.readArticleLabel,
      },
    }).commit({ visibility: "sync" });
  }
  for (const homePage of homePages) {
    if (homePage.countries?.length !== PRESENCE_COORDINATES.length)
      throw new Error(`${homePage._id} has an unexpected country count`);
    const items = homePage.countries.map((title, index) => ({
      _key: keyFor(homePage._id, "ourPresence.items", String(index)),
      _type: "contentCard",
      internalName: `presence-${index + 1}`,
      title,
      longitude: PRESENCE_COORDINATES[index][0],
      latitude: PRESENCE_COORDINATES[index][1],
    }));
    await client.patch(homePage._id).setIfMissing({
      "ourPresence.items": items,
      "whyChooseUs.labels": COPY[homePage.language].comparison,
    }).commit({ visibility: "sync" });
  }
  for (const page of aiPages) {
    const copy = COPY[page.language];
    if (copy && page.sectionId)
      await client.patch(page.sectionId).setIfMissing({ "content.labels": [copy.infrastructureFlow] }).commit({ visibility: "sync" });
  }
  for (const page of cdpPages) {
    const copy = COPY[page.language];
    if (copy)
      await client.patch(page._id).setIfMissing({ "cta.labels": [copy.today] }).commit({ visibility: "sync" });
  }
  for (const setting of settings) {
    const copy = COPY[setting.language];
    if (!copy) continue;
    const socialLinks = (setting.socialLinks ?? []).map((link) => ({
      ...link,
      iconKey: socialIconKey(link),
    }));
    await client.patch(setting._id).setIfMissing({
      linkedinCompanyId: "106457875",
      linkedinFollowCounter: false,
      calendlyLoadingLabel: copy.calendlyLoadingLabel,
      previousSlideLabel: copy.previousSlideLabel,
      nextSlideLabel: copy.nextSlideLabel,
      llmsLinkTitle: copy.llmsLinkTitle,
      twitterSiteHandle: "@robusst",
      twitterCreatorHandle: "@robusst",
      contactPointType: copy.contactPointType,
      loginPageTitle: copy.loginPageTitle,
      dashboardPageTitle: copy.dashboardPageTitle,
      ogBadgeLabel: copy.ogBadgeLabel,
      websiteDisplayUrl: "robusst.com",
    }).set({ socialLinks }).commit({ visibility: "sync" });
  }
  for (const fix of keyFixes)
    await client.patch(fix.documentId).set({ [fix.path]: fix.value }).commit({ visibility: "sync" });

  const invalidDraft = await client.fetch('*[_id == "drafts.careersPage-ar"][0]');
  if (invalidDraft?.contact?.items) {
    const items = invalidDraft.contact.items.map((item) => {
      const link = item?.cta?.link;
      if (!item?.title || (link?.label && link?.href)) return item;
      return {
        ...item,
        cta: {
          _type: "callToAction",
          style: item.cta?.style ?? "text",
          link: {
            _type: "contentLink",
            kind: "email",
            label: item.title,
            href: `mailto:${item.title}`,
            openInNewTab: false,
          },
        },
      };
    });
    await client.patch(invalidDraft._id).set({ "contact.items": items }).commit({ visibility: "sync" });
  }
  console.log("Editorial audit fixes committed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
