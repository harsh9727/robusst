#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
import { FORM_EMAIL_COPY, formEmailTemplate } from "./lib/form-email-copy.mjs";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"];
const CANONICAL_PATHS = new Map([
  ["/success-stories", "/stories"],
  ["/solutions/cdp", "/solutions/customer-data-platform"],
  ["/solutions/cyber-security", "/solutions/cybersecurity"],
  ["/solutions/customized", "/solutions/customized-solutions"],
  ["/solutions/sales-tracking", "/solutions/sts-dms"],
  ["/solutions/voicesync", "/solutions/ai-call-center"],
]);
const LOCALIZED_DEFAULT_TITLES = {
  en: "Robusst | We monetize AI",
  fr: "Robusst | Nous monétisons l’IA",
  ru: "Robusst | Мы монетизируем ИИ",
  pt: "Robusst | Nós monetizamos IA",
  es: "Robusst | Monetizamos la IA",
  ar: "Robusst | نحقق الربح من الذكاء الاصطناعي",
};
const SHARED_LABELS = {
  en: {
    skip: "Skip to main content",
    close: "Close navigation menu",
    top: "Go to top",
    play: "Play video",
    dialog: "Close dialog",
    loading: "Loading scheduling widget…",
    previous: "Previous slide",
    next: "Next slide",
    llms: "LLM-readable site index",
    contactType: "Customer Service",
    login: "Login",
    dashboard: "Dashboard",
    ogBadge: "AI Solutions · Telecom & Banking",
  },
  fr: {
    skip: "Aller au contenu principal",
    close: "Fermer le menu de navigation",
    top: "Retour en haut",
    play: "Lire la vidéo",
    dialog: "Fermer la fenêtre",
    loading: "Chargement du module de planification…",
    previous: "Diapositive précédente",
    next: "Diapositive suivante",
    llms: "Index du site lisible par les LLM",
    contactType: "Service client",
    login: "Connexion",
    dashboard: "Tableau de bord",
    ogBadge: "Solutions IA · Télécoms et banque",
  },
  ru: {
    skip: "Перейти к основному содержанию",
    close: "Закрыть меню навигации",
    top: "Наверх",
    play: "Воспроизвести видео",
    dialog: "Закрыть окно",
    loading: "Загрузка виджета планирования…",
    previous: "Предыдущий слайд",
    next: "Следующий слайд",
    llms: "Индекс сайта для LLM",
    contactType: "Служба поддержки клиентов",
    login: "Вход",
    dashboard: "Панель управления",
    ogBadge: "ИИ-решения · Телеком и банки",
  },
  pt: {
    skip: "Ir para o conteúdo principal",
    close: "Fechar menu de navegação",
    top: "Voltar ao topo",
    play: "Reproduzir vídeo",
    dialog: "Fechar janela",
    loading: "A carregar o módulo de agendamento…",
    previous: "Diapositivo anterior",
    next: "Diapositivo seguinte",
    llms: "Índice do site legível por LLM",
    contactType: "Apoio ao cliente",
    login: "Iniciar sessão",
    dashboard: "Painel",
    ogBadge: "Soluções de IA · Telecomunicações e banca",
  },
  es: {
    skip: "Ir al contenido principal",
    close: "Cerrar menú de navegación",
    top: "Volver arriba",
    play: "Reproducir vídeo",
    dialog: "Cerrar ventana",
    loading: "Cargando el módulo de programación…",
    previous: "Diapositiva anterior",
    next: "Diapositiva siguiente",
    llms: "Índice del sitio legible por LLM",
    contactType: "Atención al cliente",
    login: "Iniciar sesión",
    dashboard: "Panel",
    ogBadge: "Soluciones de IA · Telecomunicaciones y banca",
  },
  ar: {
    skip: "الانتقال إلى المحتوى الرئيسي",
    close: "إغلاق قائمة التنقل",
    top: "العودة إلى الأعلى",
    play: "تشغيل الفيديو",
    dialog: "إغلاق النافذة",
    loading: "جارٍ تحميل أداة الجدولة…",
    previous: "الشريحة السابقة",
    next: "الشريحة التالية",
    llms: "فهرس الموقع القابل للقراءة بواسطة نماذج اللغة",
    contactType: "خدمة العملاء",
    login: "تسجيل الدخول",
    dashboard: "لوحة التحكم",
    ogBadge: "حلول الذكاء الاصطناعي · الاتصالات والخدمات المصرفية",
  },
};
const FORM_COPY = {
  en: [
    "Contact us",
    "Submit",
    "Submitting…",
    "Thank you. Your message has been sent.",
    "Something went wrong. Please try again.",
  ],
  fr: [
    "Contactez-nous",
    "Envoyer",
    "Envoi…",
    "Merci. Votre message a été envoyé.",
    "Une erreur s’est produite. Veuillez réessayer.",
  ],
  ru: [
    "Связаться с нами",
    "Отправить",
    "Отправка…",
    "Спасибо. Ваше сообщение отправлено.",
    "Произошла ошибка. Повторите попытку.",
  ],
  pt: [
    "Fale conosco",
    "Enviar",
    "Enviando…",
    "Obrigado. Sua mensagem foi enviada.",
    "Algo deu errado. Tente novamente.",
  ],
  es: [
    "Contáctanos",
    "Enviar",
    "Enviando…",
    "Gracias. Tu mensaje ha sido enviado.",
    "Algo salió mal. Inténtalo de nuevo.",
  ],
  ar: [
    "اتصل بنا",
    "إرسال",
    "جارٍ الإرسال…",
    "شكرًا لك. تم إرسال رسالتك.",
    "حدث خطأ. يُرجى المحاولة مرة أخرى.",
  ],
};
const LANGUAGE_OPTIONS = {
  en: ["English", "United Kingdom", "/flags/uk.webp", "United Kingdom flag"],
  fr: ["Français", "France", "/flags/france.webp", "Drapeau de la France"],
  ru: ["Русский", "Россия", "/flags/russia.webp", "Флаг России"],
  pt: ["Português", "Portugal", "/flags/portugal.webp", "Bandeira de Portugal"],
  es: ["Español", "España", "/flags/spain.webp", "Bandera de España"],
  ar: [
    "العربية",
    "المملكة العربية السعودية",
    "/flags/saudi_arabia.webp",
    "علم المملكة العربية السعودية",
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

function key(value) {
  return createHash("sha1").update(value).digest("hex").slice(0, 12);
}

function canonicalHref(href) {
  return CANONICAL_PATHS.get(href) ?? href;
}

function link(source, identity, overrides = {}) {
  const href = canonicalHref(overrides.href ?? source.href);
  const external = /^https:\/\//i.test(href);
  return {
    _key: key(identity),
    _type: "contentLink",
    label: overrides.label ?? source.label,
    kind: external ? "external" : "internal",
    href,
    ariaLabel: overrides.ariaLabel,
    iconKey: overrides.iconKey,
    openInNewTab: external,
  };
}

function cta(source, identity, style, overrides) {
  const item = link(source, `${identity}.link`, overrides);
  delete item._key;
  return { _type: "callToAction", link: item, style };
}

async function getActiveContent(schema, locale) {
  const url = new URL("/api/v1/content", process.env.CMS_BASE_URL);
  url.searchParams.set("schema", schema);
  url.searchParams.set("locale", locale);
  const response = await fetch(url, {
    headers: { "x-api-key": process.env.CMS_API_KEY },
  });
  if (!response.ok)
    throw new Error(
      `Active content request failed for ${schema}/${locale}: ${response.status}`,
    );
  const body = await response.json();
  if (!body.data?.content)
    throw new Error(`Active content is empty for ${schema}/${locale}`);
  return body.data.content;
}

function imageReference(assetByPath, publicPath) {
  const asset = assetByPath.get(publicPath);
  if (!asset) throw new Error(`No Sanity asset mapping for ${publicPath}`);
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset.sanityAssetId },
  };
}

function editorialImage(assetByPath, publicPath, alt) {
  return {
    _type: "contentImage",
    image: imageReference(assetByPath, publicPath),
    alt,
  };
}

function homeMetadata(baseline, locale) {
  const capture = baseline.captures.find(
    (item) =>
      item.locale === locale &&
      item.routeId === "home" &&
      item.viewport === "desktop",
  );
  if (!capture) throw new Error(`No home metadata baseline for ${locale}`);
  const description = capture.page.metas.find(
    (meta) => meta.name === "description",
  )?.content;
  const keywords = capture.page.metas.find(
    (meta) => meta.name === "keywords",
  )?.content;
  return {
    title: capture.page.title,
    description,
    keywords: keywords?.split(",").map((item) => item.trim()),
  };
}

function partitionNavigation(header) {
  const groups = header.navigation.links;
  const solutions = groups.find((item) =>
    item.subMenu?.some((child) => child.href.includes("/solutions/")),
  );
  const resources = groups.find((item) => item.subMenu && item !== solutions);
  return {
    primary: groups.filter((item) => item.href),
    solutions: solutions?.subMenu ?? [],
    solutionsLabel: solutions?.label ?? "Solutions",
    resources: resources?.subMenu ?? [],
    resourcesLabel: resources?.label ?? "Resources",
  };
}

function socialLinks(footer, locale) {
  const active = {
    LinkedIn: {
      href: "https://www.linkedin.com/company/robusst",
      iconKey: "FaLinkedinIn",
    },
    Instagram: {
      href: "https://www.instagram.com/robusst",
      iconKey: "FaInstagram",
    },
    YouTube: {
      href: "https://www.youtube.com/channel/UCReJgLXmPU9g3cm47msi-Ng",
      iconKey: "IoLogoYoutube",
    },
  };
  return Object.entries(active).map(([platform, config]) => {
    const source = footer.social.links.find(
      (item) => item.platform === platform,
    ) ?? { platform, ariaLabel: platform };
    return link(
      { href: config.href, label: platform },
      `${locale}.social.${platform}`,
      {
        ariaLabel: source.ariaLabel,
        iconKey: config.iconKey,
      },
    );
  });
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
  for (const name of [
    "NEXT_PUBLIC_SANITY_PROJECT_ID",
    "CMS_BASE_URL",
    "CMS_API_KEY",
  ])
    if (!process.env[name]) throw new Error(`Missing ${name}`);
  if (options.execute && !process.env.SANITY_API_WRITE_TOKEN)
    throw new Error("Missing SANITY_API_WRITE_TOKEN");

  const [assetMap, baseline] = await Promise.all([
    readFile(
      path.join(ROOT, `migration/sanity/asset-map.${options.dataset}.json`),
      "utf8",
    ).then(JSON.parse),
    readFile(path.join(ROOT, "migration/baseline/report.json"), "utf8").then(
      JSON.parse,
    ),
  ]);
  const assetByPath = new Map(
    Object.values(assetMap.assets).flatMap((asset) =>
      asset.sourcePaths.map((sourcePath) => [sourcePath, asset]),
    ),
  );
  const documents = [];

  for (const locale of LOCALES) {
    const [headerResponse, footerResponse, commonResponse] = await Promise.all([
      getActiveContent("header", locale),
      getActiveContent("footer", locale),
      getActiveContent("common", locale),
    ]);
    const header = headerResponse.header;
    const footer = footerResponse.footer;
    const common = commonResponse.common;
    const navigation = partitionNavigation(header);
    const [quickCategory, solutionCategory] = footer.linkCategories;
    const announcementParts = common.join_poc.title.split(/\.\.\./);
    const metadata = homeMetadata(baseline, locale);
    metadata.title = LOCALIZED_DEFAULT_TITLES[locale];
    if (locale !== "en") metadata.description = footer.cta.subheading;
    const form = FORM_COPY[locale];
    documents.push({
      _id: `siteSettings-${locale}`,
      _type: "siteSettings",
      internalTitle: `Site settings — ${locale.toUpperCase()}`,
      siteName: footer.branding.companyName,
      tagline: footer.branding.tagline,
      organizationDescription: footer.cta.subheading,
      logo: editorialImage(assetByPath, "/logo.webp", header.logo.alt),
      darkLogo: editorialImage(assetByPath, "/logo.webp", header.logo.alt),
      favicon: imageReference(assetByPath, "/favicon-32.webp"),
      skipLinkLabel: SHARED_LABELS[locale].skip,
      announcementText: `${announcementParts[0].trim()}...`,
      announcement: link(
        {
          label:
            announcementParts.slice(1).join("...").trim() ||
            header.cta.primary.label,
          href: "/poc_waitlist",
        },
        `${locale}.announcement`,
      ),
      primaryNavigation: navigation.primary.map((item, index) =>
        link(item, `${locale}.primary.${index}`),
      ),
      solutionsNavigationLabel: navigation.solutionsLabel,
      solutionsNavigation: navigation.solutions.map((item, index) =>
        link(item, `${locale}.solutions.${index}`),
      ),
      resourcesNavigationLabel: navigation.resourcesLabel,
      resourcesNavigation: navigation.resources.map((item, index) =>
        link(item, `${locale}.resources.${index}`),
      ),
      headerPrimaryCta: cta(
        header.cta.primary,
        `${locale}.header.primary`,
        "secondary",
        { href: "/poc_waitlist" },
      ),
      headerSecondaryCta: cta(
        header.cta.secondary,
        `${locale}.header.secondary`,
        "primary",
      ),
      mobileMenuTitle: header.mobile.sheetTitle,
      mobileMenuOpenLabel: header.mobile.menuAriaLabel,
      mobileMenuCloseLabel: SHARED_LABELS[locale].close,
      footerHeading: footer.cta.heading,
      footerDescription: footer.cta.subheading,
      footerCta: cta(
        { label: footer.cta.buttonText, href: "/contact" },
        `${locale}.footer.cta`,
        "primary",
      ),
      quickLinksHeading: quickCategory.category,
      quickLinks: quickCategory.links.map((item, index) =>
        link(item, `${locale}.quick.${index}`),
      ),
      solutionLinksHeading: solutionCategory.category,
      solutionLinks: solutionCategory.links.map((item, index) =>
        link(item, `${locale}.footerSolutions.${index}`),
      ),
      linkedinCompanyId: "106457875",
      linkedinFollowCounter: false,
      socialLinksHeading: footer.social.heading,
      socialLinks: socialLinks(footer, locale),
      copyright: footer.legal.copyright,
      footerHashtag: "#Let'sMonetizeAI",
      contactEmail: "contact@robusst.com",
      careersEmail: "careers@robusst.com",
      salesCareersEmail: "sales.hiring@robusst.com",
      whatsappLink: "https://wa.me/919079215052",
      calendlyUrl:
        "https://calendly.com/contact-robusst/30min?hide_gdpr_banner=1&embed_type=Inline",
      youtubeChannel:
        "https://www.youtube.com/channel/UCReJgLXmPU9g3cm47msi-Ng",
      sharedContactForm: {
        _type: "formCopy",
        title: form[0],
        submitLabel: form[1],
        submittingLabel: form[2],
        successMessage: form[3],
        errorMessage: form[4],
      },
      contactFormEmail: formEmailTemplate(FORM_EMAIL_COPY[locale].contact),
      pocFormEmail: formEmailTemplate(FORM_EMAIL_COPY[locale].poc),
      partnerFormEmail: formEmailTemplate(FORM_EMAIL_COPY[locale].partner),
      viewAllLabel: common.viewAll,
      notFoundTitle: common.notFound,
      notFoundDescription: common.notFoundDescription,
      notFoundAction: cta(
        { label: common.notFoundAction, href: "/" },
        `${locale}.notFound`,
        "primary",
      ),
      goToTopLabel: SHARED_LABELS[locale].top,
      playVideoLabel: SHARED_LABELS[locale].play,
      closeDialogLabel: SHARED_LABELS[locale].dialog,
      calendlyLoadingLabel: SHARED_LABELS[locale].loading,
      previousSlideLabel: SHARED_LABELS[locale].previous,
      nextSlideLabel: SHARED_LABELS[locale].next,
      llmsLinkTitle: SHARED_LABELS[locale].llms,
      twitterSiteHandle: "@robusst",
      twitterCreatorHandle: "@robusst",
      contactPointType: SHARED_LABELS[locale].contactType,
      loginPageTitle: SHARED_LABELS[locale].login,
      dashboardPageTitle: SHARED_LABELS[locale].dashboard,
      ogBadgeLabel: SHARED_LABELS[locale].ogBadge,
      websiteDisplayUrl: "robusst.com",
      defaultSeo: {
        _type: "seo",
        metaTitle: metadata.title,
        metaDescription: metadata.description,
        keywords: metadata.keywords,
        socialTitle: metadata.title,
        socialDescription: metadata.description,
        socialImage: editorialImage(
          assetByPath,
          "/opengraph-image.webp",
          metadata.title,
        ),
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
            : "Migrated from the active production experience; human language review required.",
      },
    });
  }

  const languageDocument = {
    _id: "languageSettings",
    _type: "languageSettings",
    internalTitle: "Language switcher",
  };
  for (const [
    locale,
    [nativeName, countryName, flagPath, flagAlt],
  ] of Object.entries(LANGUAGE_OPTIONS)) {
    languageDocument[locale] = {
      _type: "languageOption",
      nativeName,
      countryName,
      flag: editorialImage(assetByPath, flagPath, flagAlt),
      switchLabel: `${nativeName} — ${countryName}`,
    };
  }
  documents.push(languageDocument);
  documents.push({
    _id: "translation.metadata.siteSettings",
    _type: "translation.metadata",
    schemaTypes: ["siteSettings"],
    translations: LOCALES.map((locale) => ({
      _key: locale,
      _type: "internationalizedArrayReferenceValue",
      language: locale,
      value: { _type: "reference", _ref: `siteSettings-${locale}` },
    })),
  });

  console.log(
    JSON.stringify(
      {
        mode: options.execute ? "execute" : "dry-run",
        dataset: options.dataset,
        documents: documents.length,
        siteSettings: LOCALES.length,
        languageSettings: 1,
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
  console.log(`Committed ${result.documentIds.length} global documents.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
