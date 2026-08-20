#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const ROUTES_FILE = path.join(ROOT, "migration/baseline/routes.json");
const DEFAULT_OUTPUT = path.join(ROOT, "migration/audit/rendered-content.json");

function parseArgs(argv) {
  const options = {
    baseUrl: "https://www.robusst.com",
    output: DEFAULT_OUTPUT,
    locales: null,
    routeIds: null,
    concurrency: 8,
  };
  for (const argument of argv) {
    if (argument.startsWith("--base-url="))
      options.baseUrl = argument.slice(11).replace(/\/$/, "");
    else if (argument.startsWith("--output="))
      options.output = path.resolve(argument.slice(9));
    else if (argument.startsWith("--locales="))
      options.locales = argument.slice(10).split(",").filter(Boolean);
    else if (argument.startsWith("--routes="))
      options.routeIds = argument.slice(9).split(",").filter(Boolean);
    else if (argument.startsWith("--concurrency="))
      options.concurrency = Number.parseInt(argument.slice(14), 10);
    else throw new Error(`Unknown argument: ${argument}`);
  }
  return options;
}

function decodeEntities(value) {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    hellip: "…",
    laquo: "«",
    ldquo: "“",
    lsquo: "‘",
    lt: "<",
    nbsp: " ",
    ndash: "–",
    quot: '"',
    raquo: "»",
    rdquo: "”",
    rsquo: "’",
  };
  return value.replace(/&(#x?[\da-f]+|[a-z]+);/gi, (entity, code) => {
    if (code.startsWith("#")) {
      const hexadecimal = code[1]?.toLowerCase() === "x";
      const number = Number.parseInt(
        code.slice(hexadecimal ? 2 : 1),
        hexadecimal ? 16 : 10,
      );
      return Number.isFinite(number) ? String.fromCodePoint(number) : entity;
    }
    return named[code.toLowerCase()] ?? entity;
  });
}

function extractAttribute(html, attribute) {
  const match = html.match(
    new RegExp(`<html[^>]*\\s${attribute}=["']([^"']+)["']`, "i"),
  );
  return match?.[1] ?? null;
}

function extractTextSegments(html) {
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  const withoutNonContent = body
    .replace(/<!--([\s\S]*?)-->/g, " ")
    .replace(/<(script|style|template|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ");
  const segments = withoutNonContent
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]+>/g, "\n")
    .split(/\n+/)
    .map((value) => decodeEntities(value).replace(/\s+/g, " ").trim())
    .filter(
      (value) =>
        value &&
        value !== "Robusst" &&
        !/^[^\p{N}]$/u.test(value) &&
        !/^\$R[CLMSXB]\b/.test(value) &&
        !/^self\.__next_f\.push/.test(value),
    );

  const unique = [];
  const seen = new Set();
  for (const value of segments) {
    if (seen.has(value)) continue;
    seen.add(value);
    unique.push(value);
  }
  return unique;
}

function makeUrl(baseUrl, locale, routePath) {
  return `${baseUrl}/${locale}${routePath === "/" ? "" : routePath}`;
}

async function capturePage(item) {
  try {
    const response = await fetch(item.url, {
      headers: { "user-agent": "Robusst-Sanity-Migration-Audit/1.0" },
      redirect: "follow",
    });
    const html = await response.text();
    const textSegments = extractTextSegments(html);
    const normalizedBody = textSegments.join("\n");
    return {
      routeId: item.route.id,
      routePath: item.route.path,
      routeKind: item.route.kind,
      locale: item.locale,
      requestedUrl: item.url,
      finalUrl: response.url,
      status: response.status,
      contentType: response.headers.get("content-type"),
      language: extractAttribute(html, "lang"),
      direction: extractAttribute(html, "dir"),
      textSegments,
      textSegmentCount: textSegments.length,
      bodyTextSha256: createHash("sha256").update(normalizedBody).digest("hex"),
      error: null,
    };
  } catch (error) {
    return {
      routeId: item.route.id,
      routePath: item.route.path,
      routeKind: item.route.kind,
      locale: item.locale,
      requestedUrl: item.url,
      finalUrl: null,
      status: null,
      contentType: null,
      language: null,
      direction: null,
      textSegments: [],
      textSegmentCount: 0,
      bodyTextSha256: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const config = JSON.parse(await readFile(ROUTES_FILE, "utf8"));
  const locales = options.locales ?? config.locales;
  const routes = config.routes.filter(
    (route) =>
      (!options.routeIds || options.routeIds.includes(route.id)) &&
      (route.kind === "fixed" || route.id.startsWith("career-role--")),
  );
  const queue = locales.flatMap((locale) =>
    routes.map((route) => ({
      locale,
      route,
      url: makeUrl(options.baseUrl, locale, route.path),
    })),
  );
  const pages = [];
  let index = 0;
  async function worker() {
    while (index < queue.length) {
      const item = queue[index++];
      const page = await capturePage(item);
      pages.push(page);
      console.log(
        `${page.status ?? "ERR"} ${item.url} — ${page.textSegmentCount} text segments`,
      );
    }
  }
  await Promise.all(
    Array.from({ length: options.concurrency }, () => worker()),
  );
  pages.sort(
    (left, right) =>
      locales.indexOf(left.locale) - locales.indexOf(right.locale) ||
      routes.findIndex((route) => route.id === left.routeId) -
        routes.findIndex((route) => route.id === right.routeId),
  );

  const report = {
    schemaVersion: 1,
    auditType: "pre-sanity-rendered-content",
    baseUrl: options.baseUrl,
    generatedAt: new Date().toISOString(),
    locales,
    routes,
    summary: {
      pages: pages.length,
      successful: pages.filter((page) => page.status === 200 && !page.error)
        .length,
      errors: pages.filter((page) => page.error || page.status !== 200).length,
      textSegments: pages.reduce(
        (total, page) => total + page.textSegmentCount,
        0,
      ),
    },
    pages,
  };
  await mkdir(path.dirname(options.output), { recursive: true });
  await writeFile(options.output, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`\n${path.relative(ROOT, options.output)}`);
  console.log(JSON.stringify(report.summary, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
