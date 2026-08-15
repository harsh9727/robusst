#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readdir, readFile, stat, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import sharp from "sharp";
import ts from "typescript";

const execFileAsync = promisify(execFile);

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const PUBLIC = path.join(ROOT, "public");
const OUTPUT = path.join(ROOT, "migration/audit");
const BASELINE_REPORT = path.join(ROOT, "migration/baseline/report.json");
const ROUTES_FILE = path.join(ROOT, "migration/baseline/routes.json");
const RENDERED_CONTENT_REPORT = path.join(
  ROOT,
  "migration/audit/rendered-content.json",
);
const SOURCE_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx"];
const ASSET_EXTENSIONS = new Set([
  ".avif",
  ".bmp",
  ".csv",
  ".doc",
  ".docx",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".json",
  ".mov",
  ".mp3",
  ".mp4",
  ".pdf",
  ".png",
  ".svg",
  ".webm",
  ".webp",
  ".xls",
  ".xlsx",
  ".zip",
]);
const MIME_TYPES = {
  ".avif": "image/avif",
  ".bmp": "image/bmp",
  ".csv": "text/csv",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".json": "application/json",
  ".md": "text/markdown",
  ".mov": "video/quicktime",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ts": "text/typescript",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".zip": "application/zip",
};
const EDITORIAL_PROPERTY =
  /(?:^|_)(?:alt|answer|author|badge|button|caption|content|copy|credit|cta|description|disclaimer|email|empty|error|excerpt|eyebrow|faq|hashtag|heading|headline|helper|hint|keyword|label|location|message|name|phone|placeholder|publisher|question|role|seo|subtitle|success|summary|tagline|text|title|toast|tooltip)(?:$|_)/i;
const LINK_PROPERTY =
  /(?:^|_)(?:action|calendar|calendly|download|email|href|link|phone|slug|social|url|video|website)(?:$|_)/i;
const ASSET_PROPERTY =
  /(?:^|_)(?:asset|avatar|background|banner|cover|file|flag|icon|image|logo|media|picture|poster|thumbnail|video)(?:$|_)/i;
const TECHNICAL_PROPERTY =
  /^(?:align|as|cache|className|color|column|component|contentType|countryCode|currency|dataKey|defaultLocale|delay|dir|direction|duration|event|eventName|format|id|key|language|locale|method|mimeType|mode|name|namespace|orientation|position|reason|rel|role|route|schema|size|status|target|theme|type|value|variant)$/i;
const CONTENT_ATTRIBUTES = new Set([
  "alt",
  "aria-description",
  "aria-label",
  "aria-placeholder",
  "label",
  "placeholder",
  "title",
]);
const LINK_ATTRIBUTES = new Set(["href"]);
const ASSET_ATTRIBUTES = new Set(["poster", "src"]);
const IMPLEMENTATION_ATTRIBUTES = new Set([
  "accept",
  "action",
  "asChild",
  "autoComplete",
  "className",
  "crossOrigin",
  "d",
  "data-slot",
  "dir",
  "fill",
  "htmlFor",
  "id",
  "key",
  "method",
  "name",
  "pattern",
  "rel",
  "role",
  "stroke",
  "target",
  "type",
  "value",
  "viewBox",
]);
const LOCALE_VALUES = new Set([
  "en",
  "fr",
  "ru",
  "pt",
  "es",
  "ar",
  "ltr",
  "rtl",
]);
const HTTP_VALUES = new Set([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
]);
const SECTION_DOCUMENTS = {
  aicall: "aiCallCenterPage",
  brand: "brandedCallingPage",
  careersPage: "careersPage",
  cdp: "customerDataPlatformPage",
  common: "siteSettings",
  customizesolution: "customizedSolutionsPage",
  cybersecurity: "cybersecurityPage",
  feature: "siteSettings",
  home: "homePage",
  intelligentnoc: "intelligentNocPage",
  layout: "siteSettings",
  networkmonetization: "networkMonetizationPage",
  noc: "intelligentNocPage",
  partnership: "partnershipPage",
  platform: "platformsPage",
  solutions: "solutionsPage",
  storyPage: "storiesPage",
  successStories: "storiesPage",
  stsanddms: "stsDmsPage",
};

function relative(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function slug(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function urlSlug(value) {
  return value
    .replace(/['’]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function idFor(...parts) {
  return createHash("sha1")
    .update(parts.join("\u0000"))
    .digest("hex")
    .slice(0, 16);
}

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(filePath)));
    else files.push(filePath);
  }
  return files;
}

function scriptKind(filePath) {
  if (filePath.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (filePath.endsWith(".jsx")) return ts.ScriptKind.JSX;
  if (filePath.endsWith(".js")) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

function resolveModule(importer, specifier, sourceSet) {
  if (
    !specifier ||
    specifier.startsWith("node:") ||
    specifier.startsWith("@")
  ) {
    return null;
  }

  let base;
  if (specifier === "public") base = path.join(PUBLIC, "index");
  else if (specifier.startsWith("public/")) base = path.join(ROOT, specifier);
  else if (specifier.startsWith("~/"))
    base = path.join(SRC, specifier.slice(2));
  else if (specifier.startsWith("."))
    base = path.resolve(path.dirname(importer), specifier);
  else return null;

  const candidates = [
    base,
    ...SOURCE_EXTENSIONS.map((extension) => `${base}${extension}`),
    ...SOURCE_EXTENSIONS.map((extension) =>
      path.join(base, `index${extension}`),
    ),
  ];
  return candidates.find((candidate) => sourceSet.has(candidate)) ?? null;
}

function isRouteRoot(filePath) {
  const file = relative(filePath);
  if (!file.startsWith("src/app/")) return false;
  return /\/(?:layout|page|route|not-found|metadata|sitemap|robots)\.(?:ts|tsx|js|jsx)$/.test(
    file,
  );
}

function rootName(filePath) {
  const file = relative(filePath)
    .replace(/^src\/app\//, "")
    .replace(/\/(?:page|layout|route|metadata)\.(?:ts|tsx|js|jsx)$/, "")
    .replace(/\.(?:ts|tsx|js|jsx)$/, "")
    .replace(/\([^/]+\)\//g, "")
    .replace(/\[locale\]\/?/, "")
    .replace(/\[([^\]]+)\]/g, ":$1");
  return file || "home";
}

function getPropertyName(node) {
  const parent = node.parent;
  if (
    (ts.isPropertyAssignment(parent) ||
      ts.isPropertyDeclaration(parent) ||
      ts.isPropertySignature(parent)) &&
    parent.initializer === node
  ) {
    return parent.name?.getText().replace(/^['"]|['"]$/g, "") ?? null;
  }
  if (ts.isVariableDeclaration(parent) && parent.initializer === node) {
    return parent.name.getText();
  }
  if (ts.isJsxAttribute(parent) && parent.initializer === node) {
    return parent.name.getText();
  }
  if (ts.isArrayLiteralExpression(parent)) {
    const grandparent = parent.parent;
    if (ts.isPropertyAssignment(grandparent)) return grandparent.name.getText();
    if (ts.isVariableDeclaration(grandparent))
      return grandparent.name.getText();
  }
  return null;
}

function jsxAttributeFor(node) {
  let current = node.parent;
  for (
    let depth = 0;
    current && depth < 3;
    depth += 1, current = current.parent
  ) {
    if (ts.isJsxAttribute(current)) return current.name.getText();
    if (ts.isJsxElement(current) || ts.isJsxSelfClosingElement(current)) break;
  }
  return null;
}

function callNameFor(node) {
  let current = node.parent;
  while (
    current &&
    !ts.isCallExpression(current) &&
    !ts.isSourceFile(current)
  ) {
    current = current.parent;
  }
  return ts.isCallExpression(current) ? current.expression.getText() : null;
}

function looksLikeAsset(value) {
  const clean = value.split(/[?#]/)[0] ?? value;
  return ASSET_EXTENSIONS.has(path.extname(clean).toLowerCase());
}

function looksLikeUrl(value) {
  return /^(?:https?:\/\/|mailto:|tel:|\/[^/]|\.\.?\/)/i.test(value);
}

function looksLikeEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function looksLikePhone(value) {
  return /^(?:tel:|https?:\/\/wa\.me\/|\+?[\d][\d\s().-]{7,})/i.test(value);
}

function looksLikeHumanCopy(value) {
  if (!/[\p{L}\p{N}]/u.test(value)) return false;
  if (/^[a-z][a-zA-Z0-9_.-]*$/.test(value) && !value.includes(" "))
    return false;
  if (/^[A-Z0-9_:-]+$/.test(value) && !value.includes(" ")) return false;
  return (
    value.includes(" ") ||
    /[.!?,;:'’]/.test(value) ||
    /^[A-Z][a-z]{2,}$/.test(value)
  );
}

function isModuleSpecifier(node) {
  const parent = node.parent;
  return (
    (ts.isImportDeclaration(parent) && parent.moduleSpecifier === node) ||
    (ts.isExportDeclaration(parent) && parent.moduleSpecifier === node) ||
    (ts.isExternalModuleReference(parent) && parent.expression === node)
  );
}

function isPropertyName(node) {
  const parent = node.parent;
  return (
    ((ts.isPropertyAssignment(parent) || ts.isPropertySignature(parent)) &&
      parent.name === node) ||
    (ts.isPropertyAccessExpression(parent) && parent.name === node)
  );
}

function isTypePosition(node) {
  let current = node.parent;
  for (
    let depth = 0;
    current && depth < 4;
    depth += 1, current = current.parent
  ) {
    if (ts.isTypeNode(current)) return true;
    if (ts.isExpression(current) || ts.isStatement(current)) return false;
  }
  return false;
}

function classifyLiteral(node, value, active) {
  const normalized = normalizeText(value);
  const property = getPropertyName(node);
  const attribute = jsxAttributeFor(node);
  const callName = callNameFor(node);
  const apiModule = node.getSourceFile().fileName.includes("/src/app/api/");

  if (!normalized)
    return {
      classification: "implementation",
      kind: "empty",
      reason: "empty string",
    };
  if (isModuleSpecifier(node)) {
    return {
      classification: "implementation",
      kind: "moduleSpecifier",
      reason: "module resolution specifier",
    };
  }
  if (isPropertyName(node)) {
    return {
      classification: "implementation",
      kind: "objectKey",
      reason: "object/property key",
    };
  }
  if (isTypePosition(node)) {
    return {
      classification: "implementation",
      kind: "typeLiteral",
      reason: "TypeScript type discriminator",
    };
  }
  if (/\$\{process\.env\./.test(normalized)) {
    return {
      classification: "implementation",
      kind: "environmentExpression",
      reason: "environment-derived infrastructure value",
    };
  }
  if (normalized === "use client" || normalized === "use server") {
    return {
      classification: "implementation",
      kind: "directive",
      reason: "framework directive",
    };
  }
  if (looksLikeAsset(normalized)) {
    return {
      classification: "asset",
      kind: "assetReference",
      reason: "content asset reference",
    };
  }
  if (property && ASSET_PROPERTY.test(property)) {
    if (
      /^(?:#|rgba?\(|(?:linear|radial)-gradient\(|\(prefers-|size-)/i.test(
        normalized,
      )
    ) {
      return {
        classification: "implementation",
        kind: "visualStyle",
        reason: "fixed visual-system value",
      };
    }
    if (/video/i.test(property) && !looksLikeUrl(normalized)) {
      return {
        classification: "sanityEditorial",
        kind: "mediaIdentifier",
        reason: "editor-managed external video identifier",
      };
    }
    if (looksLikeUrl(normalized)) {
      return {
        classification: "sanityEditorial",
        kind: "mediaLink",
        reason: "editor-managed media destination",
      };
    }
    return {
      classification: "implementation",
      kind: "assetSelector",
      reason: "implementation asset/icon selector",
    };
  }
  if (attribute && IMPLEMENTATION_ATTRIBUTES.has(attribute)) {
    return {
      classification: "implementation",
      kind: "jsxAttribute",
      reason: `implementation JSX attribute ${attribute}`,
    };
  }
  if (attribute && CONTENT_ATTRIBUTES.has(attribute)) {
    return {
      classification: "sanityEditorial",
      kind: "accessibilityOrUiCopy",
      reason: `user-facing JSX attribute ${attribute}`,
    };
  }
  if (attribute && LINK_ATTRIBUTES.has(attribute)) {
    if (/^(?:#|javascript:)/i.test(normalized)) {
      return {
        classification: "implementation",
        kind: "interactionTarget",
        reason: "in-page technical interaction target",
      };
    }
    return {
      classification: "sanityEditorial",
      kind: "link",
      reason: "rendered editorial link destination",
    };
  }
  if (attribute && ASSET_ATTRIBUTES.has(attribute)) {
    return looksLikeAsset(normalized)
      ? {
          classification: "asset",
          kind: "assetReference",
          reason: "rendered content asset",
        }
      : {
          classification: "sanityEditorial",
          kind: "mediaLink",
          reason: "rendered media destination",
        };
  }
  if (ts.isJsxText(node) || ts.isJsxExpression(node.parent)) {
    return {
      classification: "sanityEditorial",
      kind: "visibleCopy",
      reason: "rendered JSX copy",
    };
  }
  if (apiModule && /^(?:PARTNER_)?SHEET_NAME$/.test(property ?? "")) {
    return {
      classification: "implementation",
      kind: "serverContractValue",
      reason: "Google Sheets integration tab name",
    };
  }
  if (callName && /^console\.(?:debug|error|info|log|warn)$/.test(callName)) {
    return {
      classification: "implementation",
      kind: "serverDiagnostic",
      reason: "non-user-facing diagnostic message",
    };
  }
  if (
    /^https?:\/\/(?:[^/]+\.)?(?:googleapis\.com|schema\.org)(?:\/|$)/i.test(
      normalized,
    )
  ) {
    return {
      classification: "implementation",
      kind: "serviceVocabularyUrl",
      reason: "fixed service scope or schema vocabulary URL",
    };
  }
  if (
    property &&
    (EDITORIAL_PROPERTY.test(property) || LINK_PROPERTY.test(property))
  ) {
    if (
      /^(?:code|error|status)$/i.test(property) &&
      /^[a-z0-9_:-]+$/i.test(normalized)
    ) {
      return {
        classification: "controlledTechnical",
        kind: "responseCode",
        reason:
          "stable machine-readable response code; visible message is editorial",
      };
    }
    if (TECHNICAL_PROPERTY.test(property) && !looksLikeHumanCopy(normalized)) {
      return {
        classification: "controlledTechnical",
        kind: "technicalValue",
        reason: `stable value for ${property}`,
      };
    }
    return {
      classification: "sanityEditorial",
      kind:
        looksLikeUrl(normalized) ||
        looksLikeEmail(normalized) ||
        looksLikePhone(normalized)
          ? "link"
          : "copy",
      reason: `editorial property ${property}`,
    };
  }
  if (
    callName &&
    /^(?:toast\.(?:success|error|info|warning)|alert)$/.test(callName)
  ) {
    return {
      classification: "sanityEditorial",
      kind: "notification",
      reason: `user-visible ${callName} message`,
    };
  }
  if (callName && /(?:getTranslations|useTranslations|^t$)/.test(callName)) {
    return {
      classification: "controlledTechnical",
      kind: "translationKey",
      reason: "stable translation lookup key; translated label is editorial",
    };
  }
  if (
    callName &&
    /(?:fetch|revalidatePath|redirect|replace|push)$/.test(callName)
  ) {
    return {
      classification: "implementation",
      kind: "runtimePath",
      reason: `runtime path used by ${callName}`,
    };
  }
  if (LOCALE_VALUES.has(normalized)) {
    return {
      classification: "controlledTechnical",
      kind: "localeCode",
      reason: "stable locale/direction code",
    };
  }
  if (HTTP_VALUES.has(normalized)) {
    return {
      classification: "implementation",
      kind: "httpMethod",
      reason: "HTTP method",
    };
  }
  if (/^(?:application|audio|image|multipart|text|video)\//.test(normalized)) {
    return {
      classification: "implementation",
      kind: "mimeType",
      reason: "MIME type",
    };
  }
  if (
    /^(?:NEXT_|POSTHOG_|GOOGLE_|DATABASE_|VERCEL_|NODE_ENV)/.test(normalized)
  ) {
    return {
      classification: "implementation",
      kind: "environmentKey",
      reason: "environment variable name",
    };
  }
  if (/^(?:https?:\/\/)?(?:localhost|127\.0\.0\.1)(?::\d+)?/.test(normalized)) {
    return {
      classification: "implementation",
      kind: "developmentUrl",
      reason: "development infrastructure URL",
    };
  }
  if (apiModule) {
    return {
      classification: "implementation",
      kind: "serverContractValue",
      reason: "non-user-facing server integration/format value",
    };
  }
  if (
    looksLikeUrl(normalized) ||
    looksLikeEmail(normalized) ||
    looksLikePhone(normalized)
  ) {
    if (/^\/(?:api|_next)(?:\/|$)/.test(normalized)) {
      return {
        classification: "implementation",
        kind: "apiPath",
        reason: "stable application/API path",
      };
    }
    return {
      classification: "sanityEditorial",
      kind: "link",
      reason: "public user-facing destination/contact value",
    };
  }
  if (TECHNICAL_PROPERTY.test(property ?? "")) {
    return {
      classification: "controlledTechnical",
      kind: "technicalValue",
      reason: `stable value for ${property}`,
    };
  }
  if (looksLikeHumanCopy(normalized)) {
    return active
      ? {
          classification: "sanityEditorial",
          kind: "copy",
          reason: "human-readable literal in active application module",
        }
      : {
          classification: "inactiveContent",
          kind: "copy",
          reason: "human-readable literal in unreachable module",
        };
  }
  return {
    classification: "implementation",
    kind: "codeLiteral",
    reason: "non-editorial implementation token",
  };
}

function propertyAccessChain(node) {
  const parts = [];
  let current = node;
  while (
    ts.isPropertyAccessExpression(current) ||
    ts.isElementAccessExpression(current)
  ) {
    if (ts.isPropertyAccessExpression(current))
      parts.unshift(current.name.text);
    else if (
      current.argumentExpression &&
      ts.isStringLiteral(current.argumentExpression)
    )
      parts.unshift(current.argumentExpression.text);
    else parts.unshift("[]");
    current = current.expression;
  }
  if (!ts.isIdentifier(current)) return null;
  return { root: current.text, parts };
}

function sourceLocation(sourceFile, node) {
  const start = sourceFile.getLineAndCharacterOfPosition(
    node.getStart(sourceFile),
  );
  return { line: start.line + 1, column: start.character + 1 };
}

function documentForFile(file, routes = []) {
  const normalized = relative(file);
  if (
    normalized === "src/app/layout.tsx" ||
    normalized.includes("components/layout/")
  ) {
    return "siteSettings";
  }
  const sectionMatch = normalized.match(/src\/components\/sections\/([^/]+)/);
  if (sectionMatch)
    return SECTION_DOCUMENTS[sectionMatch[1]] ?? `${slug(sectionMatch[1])}Page`;
  if (normalized.includes("components/common/")) return "siteSettings";
  if (normalized.includes("components/feature/")) return "siteSettings";
  if (normalized.includes("/blogs/"))
    return normalized.endsWith(".md") ? "blogPost" : "blogIndexPage";
  if (normalized.includes("/careers/roles/")) return "jobPosting";
  if (normalized.includes("/careers/")) return "careersPage";
  if (normalized.includes("/about/")) return "aboutPage";
  if (normalized.includes("/contact/")) return "contactPage";
  if (normalized.includes("/partnership/")) return "partnershipPage";
  if (normalized.includes("/platforms/")) return "platformsPage";
  if (normalized.includes("/poc_waitlist/")) return "pocWaitlistPage";
  if (normalized.includes("/stories/")) return "storiesPage";
  if (normalized.includes("/solutions/ai-call-center/"))
    return "aiCallCenterPage";
  if (normalized.includes("/solutions/branded-calling/"))
    return "brandedCallingPage";
  if (normalized.includes("/solutions/customer-data-platform/"))
    return "customerDataPlatformPage";
  if (normalized.includes("/solutions/customized-solutions/"))
    return "customizedSolutionsPage";
  if (normalized.includes("/solutions/cybersecurity/"))
    return "cybersecurityPage";
  if (normalized.includes("/solutions/intelligent-noc/"))
    return "intelligentNocPage";
  if (normalized.includes("/solutions/network-monetization/"))
    return "networkMonetizationPage";
  if (normalized.includes("/solutions/sts-dms/")) return "stsDmsPage";
  if (normalized.includes("/solutions/")) return "solutionsPage";
  if (normalized.includes("src/app/[locale]/(default)/page")) return "homePage";
  if (normalized.includes("src/app/")) return "siteSettings";
  if (
    normalized === "src/constants.ts" ||
    normalized === "src/config/index.ts" ||
    normalized === "public/index.ts"
  ) {
    return "siteSettings";
  }
  if (routes.length === 1) return `${slug(routes[0]) || "home"}Page`;
  return "siteSettings";
}

function destinationFor(file, node, kind, routes) {
  const document = documentForFile(file, routes);
  const normalized = relative(file);
  const section = normalized.match(
    /(?:sections|layout|feature|common)\/([^/]+)(?:\/([^/.]+))?/,
  );
  const property = getPropertyName(node) ?? jsxAttributeFor(node) ?? kind;
  const sectionPath = section
    ? [section[1], section[2]].filter(Boolean).map(slug).join(".")
    : "content";
  const group =
    kind === "link" || kind === "mediaLink"
      ? "links"
      : kind === "assetReference"
        ? "media"
        : "copy";
  return `${document}.${sectionPath}.${group}.${slug(property || kind) || "value"}`;
}

function normalizeAssetReference(value, sourceFile) {
  const clean = value.trim().replace(/[?#].*$/, "");
  if (/^https?:\/\//i.test(clean)) {
    const url = new URL(clean);
    if (url.hostname === "www.robusst.com" || url.hostname === "robusst.com") {
      const publicPath = decodeURIComponent(url.pathname);
      return {
        type: publicPath.startsWith("/_next/static/media/")
          ? "deployedBuildAsset"
          : "publicPath",
        publicPath,
        remoteUrl: null,
      };
    }
    return { type: "remote", publicPath: null, remoteUrl: value };
  }
  if (clean.startsWith("/"))
    return {
      type: "publicPath",
      publicPath: decodeURIComponent(clean),
      remoteUrl: null,
    };
  if (clean.startsWith(".")) {
    const absolute = path.resolve(path.dirname(sourceFile), clean);
    if (absolute.startsWith(PUBLIC)) {
      return {
        type: "publicPath",
        publicPath: `/${relative(absolute).replace(/^public\//, "")}`,
        remoteUrl: null,
      };
    }
    return {
      type: "sourceImport",
      publicPath: null,
      sourcePath: relative(absolute),
      remoteUrl: null,
    };
  }
  return { type: "identifier", publicPath: null, remoteUrl: null };
}

async function fileExists(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

async function inspectPublicFile(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const fileStat = await stat(filePath);
  const checksum = createHash("sha256")
    .update(await readFile(filePath))
    .digest("hex");
  const metadata = {
    bytes: fileStat.size,
    sha256: checksum,
    mimeType: MIME_TYPES[extension] ?? "application/octet-stream",
    width: null,
    height: null,
    durationSeconds: null,
  };

  if (
    [".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"].includes(
      extension,
    )
  ) {
    try {
      const image = await sharp(filePath).metadata();
      metadata.width = image.width ?? null;
      metadata.height = image.height ?? null;
    } catch {
      // Keep dimensions null and let migration validation report unsupported media.
    }
  } else if ([".mov", ".mp3", ".mp4", ".webm"].includes(extension)) {
    try {
      const { stdout } = await execFileAsync("ffprobe", [
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "default=noprint_wrappers=1:nokey=1",
        filePath,
      ]);
      const duration = Number.parseFloat(stdout.trim());
      metadata.durationSeconds = Number.isFinite(duration) ? duration : null;
    } catch {
      // Keep duration null and let migration validation report malformed media.
    }
  }

  return metadata;
}

function addAssetOccurrence(assetOccurrences, details) {
  const normalized = normalizeAssetReference(
    details.value,
    details.absoluteFile,
  );
  const key =
    normalized.publicPath ??
    normalized.remoteUrl ??
    normalized.sourcePath ??
    details.value;
  assetOccurrences.push({
    id: idFor(
      details.file,
      details.line,
      details.column,
      details.value,
      details.origin,
    ),
    value: details.value,
    key,
    ...normalized,
    origin: details.origin,
    source: { file: details.file, line: details.line, column: details.column },
    active: details.active,
    routes: details.routes,
    locale: details.locale ?? null,
    altText: details.altText ?? null,
    sanityDestination: details.destination,
  });
}

async function main() {
  const allSrc = (await walk(SRC)).filter((file) =>
    SOURCE_EXTENSIONS.includes(path.extname(file)),
  );
  const publicIndex = path.join(PUBLIC, "index.ts");
  const sourceFiles = [
    ...allSrc,
    ...((await fileExists(publicIndex)) ? [publicIndex] : []),
  ];
  const sourceSet = new Set(sourceFiles);
  const parsed = new Map();
  const graph = new Map();

  for (const file of sourceFiles) {
    const source = await readFile(file, "utf8");
    const ast = ts.createSourceFile(
      file,
      source,
      ts.ScriptTarget.Latest,
      true,
      scriptKind(file),
    );
    parsed.set(file, { source, ast });
    const dependencies = new Set();
    const visit = (node) => {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        const dependency = resolveModule(
          file,
          node.moduleSpecifier.text,
          sourceSet,
        );
        if (dependency) dependencies.add(dependency);
      }
      if (
        ts.isCallExpression(node) &&
        node.expression.kind === ts.SyntaxKind.ImportKeyword
      ) {
        const argument = node.arguments[0];
        if (argument && ts.isStringLiteral(argument)) {
          const dependency = resolveModule(file, argument.text, sourceSet);
          if (dependency) dependencies.add(dependency);
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(ast);
    graph.set(file, dependencies);
  }

  const roots = sourceFiles.filter(isRouteRoot);
  const routesByFile = new Map(sourceFiles.map((file) => [file, new Set()]));
  for (const root of roots) {
    const route = rootName(root);
    const visited = new Set();
    const stack = [root];
    while (stack.length) {
      const file = stack.pop();
      if (!file || visited.has(file)) continue;
      visited.add(file);
      routesByFile.get(file)?.add(route);
      for (const dependency of graph.get(file) ?? []) stack.push(dependency);
    }
  }

  const textEntries = [];
  const exceptionEntries = [];
  const assetOccurrences = [];
  const cmsFieldOccurrences = [];
  const blogSources = [];
  let renderedContentPages = [];

  for (const [file, { ast }] of parsed) {
    const routes = [...(routesByFile.get(file) ?? [])].sort();
    const active = routes.length > 0;
    const visit = (node) => {
      if (
        (ts.isPropertyAccessExpression(node) ||
          ts.isElementAccessExpression(node)) &&
        !ts.isPropertyAccessExpression(node.parent) &&
        !ts.isElementAccessExpression(node.parent)
      ) {
        const chain = propertyAccessChain(node);
        if (chain && /^(?:data|cms[A-Z0-9_])/i.test(chain.root)) {
          const location = sourceLocation(ast, node);
          const document = documentForFile(file, routes);
          const fieldParts = [...chain.parts];
          while (
            ["[]", "at", "filter", "find", "map", "reduce", "slice"].includes(
              fieldParts.at(-1),
            )
          )
            fieldParts.pop();
          const fieldPath = fieldParts.join(".");
          const finalField = fieldParts.at(-1) ?? "value";
          const normalizedField = finalField.replace(
            /([a-z0-9])([A-Z])/g,
            "$1_$2",
          );
          if (!fieldPath) {
            ts.forEachChild(node, visit);
            return;
          }
          cmsFieldOccurrences.push({
            id: idFor(
              relative(file),
              location.line,
              location.column,
              chain.root,
              fieldPath,
            ),
            source: { file: relative(file), ...location },
            active,
            routes,
            dataRoot: chain.root,
            sourceExpression: node.getText(ast),
            sourceFieldPath: fieldPath,
            fieldKind: ASSET_PROPERTY.test(normalizedField)
              ? "asset"
              : LINK_PROPERTY.test(normalizedField)
                ? "link"
                : EDITORIAL_PROPERTY.test(normalizedField)
                  ? "copy"
                  : "structuredContent",
            sanityDocumentType: document,
            sanityFieldPath: `content.${fieldPath}`,
            sanityDestination: `${document}.content.${fieldPath}`,
            migrationAction: active
              ? "model-in-fixed-sanity-schema"
              : "exclude-unless-reactivated",
          });
        }
      }

      if (ts.isNumericLiteral(node)) {
        const property = getPropertyName(node);
        const location = sourceLocation(ast, node);
        const object = ts.isPropertyAssignment(node.parent)
          ? node.parent.parent
          : null;
        const hasEditorialSibling =
          object &&
          ts.isObjectLiteralExpression(object) &&
          object.properties.some(
            (item) =>
              ts.isPropertyAssignment(item) &&
              EDITORIAL_PROPERTY.test(item.name.getText()),
          );
        const editorial =
          ts.isJsxExpression(node.parent) ||
          (hasEditorialSibling &&
            /^(?:amount|count|metric|number|percentage|stat|value|year)$/i.test(
              property ?? "",
            ));
        const base = {
          id: idFor(
            relative(file),
            location.line,
            location.column,
            "numericLiteral",
            node.text,
          ),
          origin: "source",
          value: node.text,
          kind: editorial ? "numericContent" : "numericImplementation",
          classification: editorial ? "sanityEditorial" : "implementation",
          reason: editorial
            ? "user-visible numeric value in a content object or JSX"
            : "layout, timing, protocol, or calculation number",
          source: { file: relative(file), ...location },
          active,
          routes,
        };
        if (editorial) {
          textEntries.push({
            ...base,
            sanityDestination: destinationFor(
              file,
              node,
              "numericContent",
              routes,
            ),
            migrationAction: "migrate",
          });
        } else {
          exceptionEntries.push({
            ...base,
            exceptionReason: base.reason,
          });
        }
      }

      if (ts.isTemplateExpression(node)) {
        const value = normalizeText(node.getText(ast));
        const location = sourceLocation(ast, node);
        const classification = classifyLiteral(node, value, active);
        const base = {
          id: idFor(
            relative(file),
            location.line,
            location.column,
            "templateExpression",
            value,
          ),
          origin: "source",
          value,
          sourceExpression: node.getText(ast),
          kind:
            classification.classification === "sanityEditorial"
              ? "composedCopy"
              : "templateExpression",
          classification: classification.classification,
          reason: classification.reason,
          source: { file: relative(file), ...location },
          active,
          routes,
        };
        if (classification.classification === "sanityEditorial") {
          textEntries.push({
            ...base,
            sanityDestination: destinationFor(
              file,
              node,
              "composedCopy",
              routes,
            ),
            migrationAction:
              "replace-composed-copy-with-sanity-template-fields",
          });
        } else if (classification.classification === "inactiveContent") {
          textEntries.push({
            ...base,
            sanityDestination: null,
            migrationAction: "exclude-unless-reactivated",
          });
        } else {
          exceptionEntries.push({
            ...base,
            exceptionReason: classification.reason,
          });
        }
      }

      if (ts.isStringLiteralLike(node) || ts.isJsxText(node)) {
        const raw = ts.isJsxText(node) ? node.getText(ast) : node.text;
        const value = normalizeText(raw);
        if (!value) return;
        const location = sourceLocation(ast, node);
        const classification = classifyLiteral(node, value, active);
        const base = {
          id: idFor(
            relative(file),
            location.line,
            location.column,
            classification.kind,
            value,
          ),
          origin: "source",
          value,
          kind: classification.kind,
          classification: classification.classification,
          reason: classification.reason,
          source: { file: relative(file), ...location },
          active,
          routes,
        };
        if (classification.classification === "asset") {
          addAssetOccurrence(assetOccurrences, {
            value,
            absoluteFile: file,
            file: relative(file),
            ...location,
            origin: "sourceLiteral",
            active,
            routes,
            destination: destinationFor(file, node, "assetReference", routes),
          });
        } else if (
          [
            "sanityEditorial",
            "controlledTechnical",
            "inactiveContent",
          ].includes(classification.classification)
        ) {
          textEntries.push({
            ...base,
            sanityDestination:
              classification.classification === "sanityEditorial"
                ? destinationFor(file, node, classification.kind, routes)
                : null,
            migrationAction:
              classification.classification === "sanityEditorial"
                ? "migrate"
                : classification.classification === "controlledTechnical"
                  ? "keep-key-in-code-move-label-to-sanity"
                  : "exclude-unless-reactivated",
          });
        } else {
          exceptionEntries.push({
            ...base,
            exceptionReason: classification.reason,
          });
        }
      }

      if (
        ts.isImportDeclaration(node) &&
        ts.isStringLiteral(node.moduleSpecifier) &&
        looksLikeAsset(node.moduleSpecifier.text)
      ) {
        const location = sourceLocation(ast, node.moduleSpecifier);
        addAssetOccurrence(assetOccurrences, {
          value: node.moduleSpecifier.text,
          absoluteFile: file,
          file: relative(file),
          ...location,
          origin: "staticImport",
          active,
          routes,
          destination: destinationFor(
            file,
            node.moduleSpecifier,
            "assetReference",
            routes,
          ),
        });
      }
      ts.forEachChild(node, visit);
    };
    visit(ast);
  }

  const markdownFiles = (await walk(path.join(PUBLIC, "blogs"))).filter(
    (file) => file.endsWith(".md"),
  );
  for (const file of markdownFiles) {
    const source = await readFile(file, "utf8");
    const parsedMarkdown = matter(source);
    const fileName = path.basename(file);
    const route = `blog--${urlSlug(parsedMarkdown.data.title ?? fileName)}`;
    const sourceRef = { file: relative(file), line: 1, column: 1 };
    blogSources.push({
      sourceFile: relative(file),
      sourceSlug: fileName.replace(/\.md$/, ""),
      productionSlugCandidate: urlSlug(parsedMarkdown.data.title ?? ""),
      title: parsedMarkdown.data.title ?? null,
    });
    const addFrontmatter = (value, keyPath) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) =>
          addFrontmatter(item, `${keyPath}.${index}`),
        );
        return;
      }
      if (value && typeof value === "object") {
        Object.entries(value).forEach(([key, item]) =>
          addFrontmatter(item, keyPath ? `${keyPath}.${key}` : key),
        );
        return;
      }
      if (value === null || value === undefined) return;
      const text = String(value);
      if (looksLikeAsset(text)) {
        addAssetOccurrence(assetOccurrences, {
          value: text,
          absoluteFile: file,
          file: relative(file),
          line: 1,
          column: 1,
          origin: "markdownFrontmatter",
          active: true,
          routes: [route],
          destination: `blogPost.${keyPath}`,
        });
      } else {
        textEntries.push({
          id: idFor(relative(file), keyPath, text),
          origin: "markdownFrontmatter",
          value: text,
          kind: keyPath.toLowerCase().includes("date")
            ? "date"
            : LINK_PROPERTY.test(keyPath)
              ? "link"
              : "copy",
          classification: "sanityEditorial",
          reason: `published blog frontmatter ${keyPath}`,
          source: sourceRef,
          active: true,
          routes: [route],
          sanityDestination: `blogPost.${keyPath}`,
          migrationAction: "migrate",
        });
      }
    };
    addFrontmatter(parsedMarkdown.data, "");
    textEntries.push({
      id: idFor(relative(file), "portableTextBody"),
      origin: "markdownBody",
      value: parsedMarkdown.content.trim(),
      kind: "portableTextBody",
      classification: "sanityEditorial",
      reason: "published blog body converted to Portable Text",
      source: sourceRef,
      active: true,
      routes: [route],
      sanityDestination: "blogPost.body",
      migrationAction: "convert-markdown-to-portable-text",
    });
    for (const match of parsedMarkdown.content.matchAll(
      /!?\[[^\]]*\]\(([^)\s]+)(?:\s+[^)]*)?\)/g,
    )) {
      const target = match[1];
      if (!target) continue;
      if (looksLikeAsset(target)) {
        addAssetOccurrence(assetOccurrences, {
          value: target,
          absoluteFile: file,
          file: relative(file),
          line: 1,
          column: 1,
          origin: "markdownBody",
          active: true,
          routes: [route],
          destination: "blogPost.body.assets",
        });
      }
    }
  }

  if (await fileExists(BASELINE_REPORT)) {
    const report = JSON.parse(await readFile(BASELINE_REPORT, "utf8"));
    for (const capture of report.captures ?? []) {
      const routeDocument = capture.routeId.startsWith("blog--")
        ? "blogPost"
        : capture.routeId.startsWith("career-role--")
          ? "jobPosting"
          : `${slug(capture.routeId)}Page`;
      const renderedSource = {
        route: capture.routeId,
        locale: capture.locale,
        url: capture.requestedUrl,
      };
      const addRenderedText = (value, kind, destination, suffix) => {
        const normalized = normalizeText(value ?? "");
        if (!normalized) return;
        textEntries.push({
          id: idFor("rendered", capture.requestedUrl, suffix, normalized),
          origin: "renderedBaseline",
          value: normalized,
          kind,
          classification: "sanityEditorial",
          reason: "rendered production value, including CMS-fed content",
          source: renderedSource,
          active: true,
          routes: [capture.routeId],
          locale: capture.locale,
          sanityDestination: `${routeDocument}.${destination}`,
          migrationAction: "migrate-or-generate-localized-document",
        });
      };
      addRenderedText(capture.page?.title, "seoTitle", "seo.title", "title");
      for (const [index, meta] of (capture.page?.metas ?? []).entries()) {
        const key = meta.name ?? meta.property ?? meta.httpEquiv;
        if (
          !key ||
          !meta.content ||
          !/^(?:description|keywords|author|application-name|og:(?:title|description|site_name|locale)|twitter:(?:title|description))$/i.test(
            key,
          )
        )
          continue;
        addRenderedText(
          meta.content,
          "seoMetadata",
          `seo.${slug(key)}`,
          `meta-${index}-${key}`,
        );
      }
      for (const [index, heading] of (capture.page?.headings ?? []).entries()) {
        addRenderedText(
          heading.text,
          `h${heading.level}`,
          `rendered.headings.${index}`,
          `heading-${index}`,
        );
      }
      for (const [index, link] of (capture.page?.links ?? []).entries()) {
        addRenderedText(
          link.text,
          "linkLabel",
          `rendered.links.${index}.label`,
          `link-label-${index}`,
        );
        if (link.href && !/^(?:javascript:|#)/.test(link.href)) {
          addRenderedText(
            link.href,
            "link",
            `rendered.links.${index}.destination`,
            `link-href-${index}`,
          );
        }
      }
      for (const [index, image] of (capture.page?.images ?? []).entries()) {
        addRenderedText(
          image.alt,
          "imageAlt",
          `rendered.images.${index}.alt`,
          `image-alt-${index}`,
        );
        if (image.src) {
          addAssetOccurrence(assetOccurrences, {
            value: image.src,
            absoluteFile: BASELINE_REPORT,
            file: relative(BASELINE_REPORT),
            line: 1,
            column: 1,
            origin: "renderedBaseline",
            active: true,
            routes: [capture.routeId],
            locale: capture.locale,
            altText: image.alt,
            destination: `${routeDocument}.rendered.images.${index}.asset`,
          });
        }
      }
      for (const [index, video] of (capture.page?.videos ?? []).entries()) {
        for (const [field, value] of [
          ["src", video.src],
          ["poster", video.poster],
        ]) {
          if (!value || (field === "poster" && value === capture.requestedUrl))
            continue;
          addAssetOccurrence(assetOccurrences, {
            value,
            absoluteFile: BASELINE_REPORT,
            file: relative(BASELINE_REPORT),
            line: 1,
            column: 1,
            origin: "renderedBaseline",
            active: true,
            routes: [capture.routeId],
            destination: `${routeDocument}.rendered.videos.${index}.${field}`,
          });
        }
      }
    }
  }

  if (await fileExists(RENDERED_CONTENT_REPORT)) {
    const renderedReport = JSON.parse(
      await readFile(RENDERED_CONTENT_REPORT, "utf8"),
    );
    renderedContentPages = renderedReport.pages ?? [];
    const alreadyCaptured = new Set(
      textEntries
        .filter((entry) => entry.origin === "renderedBaseline")
        .map(
          (entry) =>
            `${entry.source.route}\u0000${entry.locale}\u0000${entry.value}`,
        ),
    );
    for (const page of renderedReport.pages ?? []) {
      const routeDocument = page.routeId.startsWith("career-role--")
        ? "jobPosting"
        : `${slug(page.routeId)}Page`;
      for (const [index, value] of page.textSegments.entries()) {
        const normalized = normalizeText(value);
        const key = `${page.routeId}\u0000${page.locale}\u0000${normalized}`;
        if (!normalized || alreadyCaptured.has(key)) continue;
        textEntries.push({
          id: idFor(
            "rendered-crawl",
            page.requestedUrl,
            String(index),
            normalized,
          ),
          origin: "renderedCrawl",
          value: normalized,
          kind: "visibleCopy",
          classification: "sanityEditorial",
          reason:
            "server-rendered production copy, including CMS-fed paragraphs and list items",
          source: {
            route: page.routeId,
            locale: page.locale,
            url: page.requestedUrl,
            segment: index,
          },
          active: true,
          routes: [page.routeId],
          locale: page.locale,
          sanityDestination: `${routeDocument}.rendered.body.segment-${index}`,
          migrationAction: "migrate-or-generate-localized-document",
        });
      }
    }
  }

  const publicFiles = await walk(PUBLIC);
  const publicAssetFiles = publicFiles.filter((file) =>
    ASSET_EXTENSIONS.has(path.extname(file).toLowerCase()),
  );
  const occurrenceGroups = Map.groupBy(assetOccurrences, (item) => item.key);
  const assets = [];
  for (const [key, occurrences] of occurrenceGroups) {
    const first = occurrences[0];
    const publicPath = first.publicPath;
    const absolutePublicPath =
      publicPath && first.type === "publicPath"
        ? path.join(PUBLIC, publicPath.replace(/^\//, ""))
        : null;
    const altTextByLocale = Object.fromEntries(
      [
        ...Map.groupBy(
          occurrences.filter((item) => item.locale && item.altText !== null),
          (item) => item.locale,
        ).entries(),
      ].map(([locale, items]) => [
        locale,
        [...new Set(items.map((item) => item.altText))],
      ]),
    );
    const capturedAltValues = Object.values(altTextByLocale).flat();
    assets.push({
      id: idFor("asset", key),
      key,
      type: first.type,
      publicPath,
      remoteUrl: first.remoteUrl ?? null,
      sourcePath: first.sourcePath ?? null,
      extension:
        path
          .extname(publicPath ?? first.remoteUrl ?? first.sourcePath ?? "")
          .toLowerCase() || null,
      exists: absolutePublicPath
        ? await fileExists(absolutePublicPath)
        : first.type === "remote" || first.type === "deployedBuildAsset"
          ? null
          : await fileExists(path.join(ROOT, first.sourcePath ?? "")),
      active: occurrences.some((item) => item.active),
      routes: [...new Set(occurrences.flatMap((item) => item.routes))].sort(),
      sanityDestinations: [
        ...new Set(
          occurrences.map((item) => item.sanityDestination).filter(Boolean),
        ),
      ].sort(),
      altTextByLocale,
      altTextStatus:
        capturedAltValues.length === 0
          ? "not-captured"
          : capturedAltValues.some((value) => !value)
            ? "missing"
            : "present-for-rendered-occurrences",
      sha256: null,
      mimeType: null,
      bytes: null,
      width: null,
      height: null,
      durationSeconds: null,
      sanityAssetId: null,
      sanityCdnUrl: null,
      migrationStatus: "pending",
      qaStatus: "pending",
      occurrences,
      migrationAction: occurrences.some((item) => item.active)
        ? "upload-to-sanity-and-replace-reference"
        : "exclude-unless-reactivated",
    });
  }

  const referencedPublic = new Set(
    assets.map((asset) => asset.publicPath).filter(Boolean),
  );
  const publicInventory = [];
  for (const file of publicFiles) {
    const publicPath = `/${relative(file).replace(/^public\//, "")}`;
    const extension = path.extname(file).toLowerCase();
    const metadata = await inspectPublicFile(file);
    const references = assets.find((asset) => asset.publicPath === publicPath);
    const category =
      file === publicIndex
        ? "sourceAssetRegistry"
        : extension === ".md"
          ? "blogSourceContent"
          : ASSET_EXTENSIONS.has(extension)
            ? "contentAsset"
            : "staticInfrastructureFile";
    publicInventory.push({
      publicPath,
      category,
      extension,
      ...metadata,
      referenced: referencedPublic.has(publicPath),
      active: references?.active ?? extension === ".md",
      sanityAssetId: null,
      sanityCdnUrl: null,
      migrationStatus: "pending",
      qaStatus: "pending",
      migrationAction:
        category === "blogSourceContent"
          ? "convert-to-portable-text"
          : category === "sourceAssetRegistry"
            ? "remove-after-sanity-cutover"
            : references?.active
              ? "upload-to-sanity"
              : "review-unreferenced-public-file",
    });
  }

  const activePublicByChecksum = new Map(
    publicInventory
      .filter((item) => item.category === "contentAsset" && item.active)
      .map((item) => [item.sha256, item.publicPath]),
  );
  for (const item of publicInventory) {
    if (item.category !== "contentAsset") continue;
    const duplicateOf = activePublicByChecksum.get(item.sha256);
    item.duplicateOf =
      duplicateOf && duplicateOf !== item.publicPath ? duplicateOf : null;
    if (item.active) {
      item.classification = "active-content-asset";
      item.migrationAction = "upload-to-sanity";
    } else if (item.duplicateOf) {
      item.classification = "inactive-duplicate";
      item.migrationAction = "exclude-and-use-active-duplicate";
    } else if (item.referenced) {
      item.classification = "inactive-dead-code-asset";
      item.migrationAction = "exclude-unless-component-reactivated";
    } else {
      item.classification = "inactive-unreferenced-asset";
      item.migrationAction = "exclude-from-sanity-migration";
    }
  }

  const publicByPath = new Map(
    publicInventory.map((item) => [item.publicPath, item]),
  );
  for (const asset of assets) {
    const publicFile = asset.publicPath
      ? publicByPath.get(asset.publicPath)
      : null;
    if (!publicFile) continue;
    asset.sha256 = publicFile.sha256;
    asset.mimeType = publicFile.mimeType;
    asset.bytes = publicFile.bytes;
    asset.width = publicFile.width;
    asset.height = publicFile.height;
    asset.durationSeconds = publicFile.durationSeconds;
  }

  const reachability = sourceFiles.map((file) => ({
    file: relative(file),
    kind: file.endsWith(".tsx") ? "tsx" : file.endsWith(".ts") ? "ts" : "js",
    active: (routesByFile.get(file)?.size ?? 0) > 0,
    routes: [...(routesByFile.get(file) ?? [])].sort(),
    imports: [...(graph.get(file) ?? [])].map(relative).sort(),
    classification:
      (routesByFile.get(file)?.size ?? 0) > 0
        ? "reachable-from-app-entry"
        : file.endsWith(".tsx")
          ? "inactive-or-dead-component"
          : "unreachable-support-module",
  }));

  for (const entry of textEntries) {
    entry.localizationRequirement =
      entry.classification === "sanityEditorial"
        ? ["en", "fr", "ru", "pt", "es", "ar"]
        : [];
    entry.documentType = entry.sanityDestination?.split(".")[0] ?? null;
    entry.fieldPath = entry.sanityDestination
      ? entry.sanityDestination.split(".").slice(1).join(".")
      : null;
    entry.migrationStatus = "pending";
    entry.qaStatus = "pending";
  }

  textEntries.sort((left, right) => {
    const leftSource = left.source.file ?? left.source.url ?? "";
    const rightSource = right.source.file ?? right.source.url ?? "";
    return (
      leftSource.localeCompare(rightSource) ||
      (left.source.line ?? 0) - (right.source.line ?? 0)
    );
  });
  exceptionEntries.sort(
    (left, right) =>
      left.source.file.localeCompare(right.source.file) ||
      left.source.line - right.source.line,
  );
  assets.sort((left, right) => left.key.localeCompare(right.key));
  publicInventory.sort((left, right) =>
    left.publicPath.localeCompare(right.publicPath),
  );
  reachability.sort((left, right) => left.file.localeCompare(right.file));

  const activeEditorial = textEntries.filter(
    (entry) => entry.active && entry.classification === "sanityEditorial",
  );
  const inactiveContent = textEntries.filter(
    (entry) => entry.classification === "inactiveContent",
  );
  const controlledTechnical = textEntries.filter(
    (entry) => entry.classification === "controlledTechnical",
  );
  const activeAssets = assets.filter((asset) => asset.active);
  const missingActiveAssets = activeAssets.filter(
    (asset) => asset.exists === false,
  );
  const componentFiles = reachability.filter((entry) => entry.kind === "tsx");

  await mkdir(OUTPUT, { recursive: true });
  await writeFile(
    path.join(OUTPUT, "content-manifest.json"),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        generatedAt: new Date().toISOString(),
        rules: {
          sanityEditorial:
            "Migrate the value to the listed fixed-schema Sanity destination.",
          controlledTechnical:
            "Keep the stable key/value in code; expose only its user-facing label in Sanity.",
          inactiveContent:
            "Do not migrate unless the unreachable component is intentionally reactivated.",
        },
        summary: {
          entries: textEntries.length,
          activeEditorial: activeEditorial.length,
          controlledTechnical: controlledTechnical.length,
          inactiveContent: inactiveContent.length,
          entriesWithoutRequiredDestination: activeEditorial.filter(
            (entry) => !entry.sanityDestination,
          ).length,
        },
        entries: textEntries,
      },
      null,
      2,
    )}\n`,
  );
  await writeFile(
    path.join(OUTPUT, "asset-manifest.json"),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        generatedAt: new Date().toISOString(),
        summary: {
          uniqueReferencedAssets: assets.length,
          activeReferencedAssets: activeAssets.length,
          missingActiveAssets: missingActiveAssets.length,
          publicFiles: publicInventory.length,
          publicContentAssets: publicAssetFiles.length,
          unreferencedPublicContentAssets: publicInventory.filter(
            (item) => item.category === "contentAsset" && !item.referenced,
          ).length,
        },
        assets,
        publicInventory,
      },
      null,
      2,
    )}\n`,
  );
  await writeFile(
    path.join(OUTPUT, "technical-exceptions.json"),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        generatedAt: new Date().toISOString(),
        policy:
          "Only non-editorial implementation literals are exempt. Stable technical values with user-facing labels are listed in the content manifest as controlledTechnical.",
        summary: {
          occurrences: exceptionEntries.length,
          activeOccurrences: exceptionEntries.filter((entry) => entry.active)
            .length,
          reasons: Object.fromEntries(
            [
              ...Map.groupBy(
                exceptionEntries,
                (entry) => entry.exceptionReason,
              ).entries(),
            ]
              .map(([reason, entries]) => [reason, entries.length])
              .sort((left, right) => right[1] - left[1]),
          ),
        },
        entries: exceptionEntries,
      },
      null,
      2,
    )}\n`,
  );
  const routeConfig = JSON.parse(await readFile(ROUTES_FILE, "utf8"));
  const productionBlogSlugs = routeConfig.routes
    .filter((route) => route.id.startsWith("blog--"))
    .map((route) => route.path.replace(/^\/blogs\//, ""));
  const blogRouteMap = blogSources.map((source) => {
    const productionSlug = productionBlogSlugs.includes(
      source.productionSlugCandidate,
    )
      ? source.productionSlugCandidate
      : null;
    return {
      ...source,
      productionSlug,
      matched: Boolean(productionSlug),
      localizedRoutes: productionSlug
        ? routeConfig.locales.map(
            (locale) => `/${locale}/blogs/${productionSlug}`,
          )
        : [],
      sanityDestination: productionSlug
        ? `blogPost[slug.current=="${productionSlug}"]`
        : null,
      migrationAction: productionSlug
        ? "convert-to-portable-text-and-preserve-production-slug"
        : "manual-route-match-required",
    };
  });
  await writeFile(
    path.join(OUTPUT, "blog-route-map.json"),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        generatedAt: new Date().toISOString(),
        summary: {
          markdownSources: blogRouteMap.length,
          productionSlugs: productionBlogSlugs.length,
          matched: blogRouteMap.filter((entry) => entry.matched).length,
          unmatchedSources: blogRouteMap.filter((entry) => !entry.matched)
            .length,
          unmatchedProductionSlugs: productionBlogSlugs.filter(
            (productionSlug) =>
              !blogRouteMap.some(
                (entry) => entry.productionSlug === productionSlug,
              ),
          ),
        },
        entries: blogRouteMap,
      },
      null,
      2,
    )}\n`,
  );

  const cmsFieldGroups = Map.groupBy(
    cmsFieldOccurrences,
    (item) => `${item.sanityDestination}\u0000${item.active}`,
  );
  const cmsFields = [...cmsFieldGroups.values()]
    .map((occurrences) => ({
      id: idFor("cms-field", occurrences[0].sanityDestination),
      sanityDocumentType: occurrences[0].sanityDocumentType,
      sanityFieldPath: occurrences[0].sanityFieldPath,
      sanityDestination: occurrences[0].sanityDestination,
      fieldKinds: [
        ...new Set(occurrences.map((item) => item.fieldKind)),
      ].sort(),
      active: occurrences.some((item) => item.active),
      routes: [...new Set(occurrences.flatMap((item) => item.routes))].sort(),
      migrationAction: occurrences.some((item) => item.active)
        ? "model-in-fixed-sanity-schema"
        : "exclude-unless-reactivated",
      migrationStatus: "pending",
      qaStatus: "pending",
      occurrences,
    }))
    .sort((left, right) =>
      left.sanityDestination.localeCompare(right.sanityDestination),
    );
  await writeFile(
    path.join(OUTPUT, "cms-field-map.json"),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        generatedAt: new Date().toISOString(),
        summary: {
          fields: cmsFields.length,
          activeFields: cmsFields.filter((field) => field.active).length,
          inactiveFields: cmsFields.filter((field) => !field.active).length,
          activeFieldsWithoutDestination: cmsFields.filter(
            (field) => field.active && !field.sanityDestination,
          ).length,
        },
        fields: cmsFields,
      },
      null,
      2,
    )}\n`,
  );

  const localeAuditEntries = [];
  const pagesByRoute = Map.groupBy(
    renderedContentPages,
    (page) => page.routeId,
  );
  for (const [routeId, pages] of pagesByRoute) {
    const englishPage = pages.find((page) => page.locale === "en");
    if (!englishPage) continue;
    const englishSegments = new Set(
      englishPage.textSegments.filter(
        (value) =>
          value.length >= 4 &&
          /\p{L}/u.test(value) &&
          !looksLikeUrl(value) &&
          !looksLikeEmail(value),
      ),
    );
    for (const page of pages) {
      if (page.locale === "en") continue;
      const exactEnglishCarryovers = page.textSegments.filter((value) =>
        englishSegments.has(value),
      );
      localeAuditEntries.push({
        routeId,
        locale: page.locale,
        requestedUrl: page.requestedUrl,
        textSegmentCount: page.textSegmentCount,
        exactEnglishCarryoverCount: exactEnglishCarryovers.length,
        exactEnglishCarryovers,
        reviewStatus:
          exactEnglishCarryovers.length > 0
            ? "needs-translation-review"
            : "no-exact-english-carryover-detected",
      });
    }
  }
  await writeFile(
    path.join(OUTPUT, "locale-completeness.json"),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        generatedAt: new Date().toISOString(),
        method:
          "Heuristic comparison of exact visible English segments against each non-English rendered page. Brand names, product names, and technical terms can be valid carryovers and require review.",
        summary: {
          auditedPages: localeAuditEntries.length,
          pagesNeedingReview: localeAuditEntries.filter(
            (entry) => entry.reviewStatus === "needs-translation-review",
          ).length,
          exactEnglishCarryoverOccurrences: localeAuditEntries.reduce(
            (total, entry) => total + entry.exactEnglishCarryoverCount,
            0,
          ),
        },
        entries: localeAuditEntries,
      },
      null,
      2,
    )}\n`,
  );
  await writeFile(
    path.join(OUTPUT, "component-reachability.json"),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        generatedAt: new Date().toISOString(),
        roots: roots.map((file) => ({
          file: relative(file),
          route: rootName(file),
        })),
        summary: {
          sourceModules: reachability.length,
          activeModules: reachability.filter((entry) => entry.active).length,
          inactiveModules: reachability.filter((entry) => !entry.active).length,
          componentModules: componentFiles.length,
          activeComponentModules: componentFiles.filter((entry) => entry.active)
            .length,
          inactiveComponentModules: componentFiles.filter(
            (entry) => !entry.active,
          ).length,
        },
        modules: reachability,
      },
      null,
      2,
    )}\n`,
  );

  const summary = {
    text: {
      total: textEntries.length,
      activeEditorial: activeEditorial.length,
      controlledTechnical: controlledTechnical.length,
      inactiveContent: inactiveContent.length,
      withoutDestination: activeEditorial.filter(
        (entry) => !entry.sanityDestination,
      ).length,
    },
    assets: {
      unique: assets.length,
      active: activeAssets.length,
      missingActive: missingActiveAssets.length,
      publicFiles: publicInventory.length,
      publicContentAssets: publicAssetFiles.length,
      unreferencedPublicContentAssets: publicInventory.filter(
        (item) => item.category === "contentAsset" && !item.referenced,
      ).length,
    },
    reachability: {
      sourceModules: reachability.length,
      activeModules: reachability.filter((entry) => entry.active).length,
      inactiveModules: reachability.filter((entry) => !entry.active).length,
      activeComponents: componentFiles.filter((entry) => entry.active).length,
      inactiveComponents: componentFiles.filter((entry) => !entry.active)
        .length,
    },
    technicalExceptions: exceptionEntries.length,
  };
  console.log(JSON.stringify(summary, null, 2));
  if (missingActiveAssets.length) {
    console.log("\nMissing active assets:");
    for (const asset of missingActiveAssets) console.log(`- ${asset.key}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
