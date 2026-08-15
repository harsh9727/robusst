#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const ROUTES_FILE = path.join(ROOT, "migration/baseline/routes.json");
const DEFAULT_REPORT = path.join(ROOT, "migration/baseline/report.json");
const DEFAULT_SCREENSHOTS = path.join(ROOT, "migration/baseline/screenshots");

function parseArgs(argv) {
  const options = {
    baseUrl: "https://www.robusst.com",
    report: DEFAULT_REPORT,
    screenshotsDir: DEFAULT_SCREENSHOTS,
    screenshots: false,
    locales: null,
    routeIds: null,
    viewports: null,
    limit: null,
    settleMs: 1800,
  };

  for (const arg of argv) {
    if (arg === "--screenshots") options.screenshots = true;
    else if (arg === "--no-screenshots") options.screenshots = false;
    else if (arg.startsWith("--base-url=")) options.baseUrl = arg.slice(11);
    else if (arg.startsWith("--report="))
      options.report = path.resolve(arg.slice(9));
    else if (arg.startsWith("--screenshots-dir="))
      options.screenshotsDir = path.resolve(arg.slice(18));
    else if (arg.startsWith("--locales="))
      options.locales = arg.slice(10).split(",").filter(Boolean);
    else if (arg.startsWith("--routes="))
      options.routeIds = arg.slice(9).split(",").filter(Boolean);
    else if (arg.startsWith("--viewports="))
      options.viewports = arg.slice(12).split(",").filter(Boolean);
    else if (arg.startsWith("--limit="))
      options.limit = Number.parseInt(arg.slice(8), 10);
    else if (arg.startsWith("--settle-ms="))
      options.settleMs = Number.parseInt(arg.slice(12), 10);
    else throw new Error(`Unknown argument: ${arg}`);
  }

  options.baseUrl = options.baseUrl.replace(/\/$/, "");
  return options;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        reject(new Error("Could not allocate a Chrome debugging port"));
        return;
      }
      const { port } = address;
      server.close(() => resolve(port));
    });
  });
}

async function waitForChrome(port, timeoutMs = 20_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return response.json();
    } catch {
      // Chrome is still starting.
    }
    await sleep(150);
  }
  throw new Error("Timed out waiting for headless Chrome");
}

class CdpSession {
  constructor(webSocketUrl) {
    this.socket = new WebSocket(webSocketUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
  }

  async connect() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener(
        "error",
        () => reject(new Error("Could not connect to Chrome DevTools")),
        { once: true },
      );
    });

    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(String(event.data));
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }

      const callbacks = this.listeners.get(message.method) ?? [];
      for (const callback of callbacks) callback(message.params ?? {});
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, callback) {
    const callbacks = this.listeners.get(method) ?? [];
    callbacks.push(callback);
    this.listeners.set(method, callbacks);
    return () => {
      this.listeners.set(
        method,
        (this.listeners.get(method) ?? []).filter((item) => item !== callback),
      );
    };
  }

  waitFor(method, timeoutMs = 45_000) {
    return new Promise((resolve, reject) => {
      let remove = () => {};
      const timeout = setTimeout(() => {
        remove();
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeoutMs);
      remove = this.on(method, (params) => {
        clearTimeout(timeout);
        remove();
        resolve(params);
      });
    });
  }

  close() {
    this.socket.close();
  }
}

function makeUrl(baseUrl, locale, routePath) {
  const suffix = routePath === "/" ? "" : routePath;
  return `${baseUrl}/${locale}${suffix}`;
}

function screenshotName(locale, routeId, viewportName) {
  return `${locale}__${routeId}__${viewportName}.jpg`;
}

function uniqueBy(items, keyFor) {
  const seen = new Set();
  return items.filter((item) => {
    const key = keyFor(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function evaluate(session, expression) {
  const result = await session.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(
      result.exceptionDetails.text ?? "Browser evaluation failed",
    );
  }
  return result.result?.value;
}

async function activateLazyContent(session) {
  await evaluate(
    session,
    `new Promise((resolve) => {
      const total = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      const step = Math.max(window.innerHeight * 0.85, 600);
      let position = 0;
      let iterations = 0;
      const timer = setInterval(() => {
        position = Math.min(position + step, total);
        window.scrollTo(0, position);
        iterations += 1;
        if (position >= total || iterations >= 80) {
          clearInterval(timer);
          setTimeout(() => {
            window.scrollTo(0, 0);
            resolve(true);
          }, 250);
        }
      }, 60);
    })`,
  );
}

async function extractPage(session) {
  return evaluate(
    session,
    `(() => {
      const absolute = (value) => {
        try { return new URL(value, document.baseURI).href; } catch { return value; }
      };
      const metas = Array.from(document.querySelectorAll('meta')).map((node) => ({
        name: node.getAttribute('name'),
        property: node.getAttribute('property'),
        httpEquiv: node.getAttribute('http-equiv'),
        content: node.getAttribute('content'),
      })).filter((item) => item.name || item.property || item.httpEquiv);
      const links = Array.from(document.querySelectorAll('a[href]')).map((node) => ({
        href: absolute(node.getAttribute('href')),
        text: (node.textContent || '').replace(/\\s+/g, ' ').trim(),
        target: node.getAttribute('target'),
        rel: node.getAttribute('rel'),
      }));
      const images = Array.from(document.querySelectorAll('img')).map((node) => ({
        src: absolute(node.currentSrc || node.getAttribute('src') || ''),
        alt: node.getAttribute('alt'),
        width: node.naturalWidth || null,
        height: node.naturalHeight || null,
      }));
      const videos = Array.from(document.querySelectorAll('video')).map((node) => ({
        src: absolute(node.currentSrc || node.getAttribute('src') || ''),
        poster: absolute(node.getAttribute('poster') || ''),
        autoplay: node.autoplay,
        loop: node.loop,
        muted: node.muted,
      }));
      const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((node) => ({
        level: Number(node.tagName.slice(1)),
        text: (node.textContent || '').replace(/\\s+/g, ' ').trim(),
      })).filter((item) => item.text);
      const alternates = Array.from(document.querySelectorAll('link[rel="alternate"]')).map((node) => ({
        hrefLang: node.getAttribute('hreflang'),
        href: absolute(node.getAttribute('href')),
      }));
      const canonical = document.querySelector('link[rel="canonical"]')?.href ?? null;
      const jsonLd = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((node) => node.textContent || '');
      const bodyText = (document.body?.innerText || '').replace(/\\s+/g, ' ').trim();
      return {
        finalUrl: location.href,
        title: document.title,
        language: document.documentElement.lang || null,
        direction: document.documentElement.dir || null,
        canonical,
        alternates,
        metas,
        links,
        images,
        videos,
        headings,
        jsonLd,
        bodyText,
        bodyTextLength: bodyText.length,
        documentHeight: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
        documentWidth: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
      };
    })()`,
  );
}

async function captureScreenshot(session, outputPath) {
  const metrics = await session.send("Page.getLayoutMetrics");
  const width = Math.ceil(metrics.cssContentSize?.width ?? 1440);
  const measuredHeight = Math.ceil(metrics.cssContentSize?.height ?? 900);
  const height = Math.min(measuredHeight, 30_000);
  const result = await session.send("Page.captureScreenshot", {
    format: "jpeg",
    quality: 68,
    captureBeyondViewport: true,
    fromSurface: true,
    clip: { x: 0, y: 0, width, height, scale: 1 },
  });
  await writeFile(outputPath, Buffer.from(result.data, "base64"));
  return { width, height, truncated: measuredHeight > height };
}

async function captureOne({ session, url, locale, route, viewport, options }) {
  const network = { mainStatus: null, responses: [], failures: [] };
  const requests = new Map();

  const removeRequest = session.on("Network.requestWillBeSent", (event) => {
    requests.set(event.requestId, {
      type: event.type,
      url: event.request.url,
      loaderId: event.loaderId,
    });
  });
  const removeResponse = session.on("Network.responseReceived", (event) => {
    const response = event.response;
    if (event.type === "Document" && !network.mainStatus) {
      network.mainStatus = {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        mimeType: response.mimeType,
      };
    }
    if (response.status >= 400) {
      network.responses.push({
        type: event.type,
        status: response.status,
        url: response.url,
      });
    }
  });
  const removeFailure = session.on("Network.loadingFailed", (event) => {
    const request = requests.get(event.requestId);
    network.failures.push({
      type: event.type ?? request?.type ?? null,
      url: request?.url ?? null,
      errorText: event.errorText,
      canceled: event.canceled ?? false,
      loaderId: request?.loaderId ?? null,
    });
  });

  try {
    await session.send("Emulation.setDeviceMetricsOverride", {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: viewport.deviceScaleFactor,
      mobile: viewport.mobile,
      screenWidth: viewport.width,
      screenHeight: viewport.height,
    });
    await session.send("Emulation.setTouchEmulationEnabled", {
      enabled: viewport.mobile,
      maxTouchPoints: viewport.mobile ? 5 : 1,
    });

    const loaded = session.waitFor("Page.loadEventFired");
    const navigation = await session.send("Page.navigate", { url });
    await loaded;
    await sleep(options.settleMs);
    if (options.screenshots) {
      await activateLazyContent(session);
      await sleep(300);
    }

    network.failures = network.failures
      .filter(
        (failure) =>
          !navigation.loaderId || failure.loaderId === navigation.loaderId,
      )
      .map((failure) => ({
        type: failure.type,
        url: failure.url,
        errorText: failure.errorText,
        canceled: failure.canceled,
      }));

    const page = await extractPage(session);
    page.links = uniqueBy(
      page.links,
      (item) => `${item.href}\u0000${item.text}\u0000${item.target}`,
    );
    page.images = uniqueBy(
      page.images,
      (item) => `${item.src}\u0000${item.alt}`,
    );
    page.videos = uniqueBy(
      page.videos,
      (item) => `${item.src}\u0000${item.poster}`,
    );
    page.alternates = uniqueBy(
      page.alternates,
      (item) => `${item.hrefLang}\u0000${item.href}`,
    );
    page.bodyTextSha256 = createHash("sha256")
      .update(page.bodyText)
      .digest("hex");
    delete page.bodyText;

    let screenshot = null;
    if (options.screenshots) {
      await mkdir(options.screenshotsDir, { recursive: true });
      const fileName = screenshotName(locale, route.id, viewport.name);
      const outputPath = path.join(options.screenshotsDir, fileName);
      const dimensions = await captureScreenshot(session, outputPath);
      screenshot = {
        file: path.relative(ROOT, outputPath),
        ...dimensions,
      };
    }

    return {
      locale,
      routeId: route.id,
      routePath: route.path,
      requestedUrl: url,
      viewport: viewport.name,
      capturedAt: new Date().toISOString(),
      network,
      screenshot,
      page,
      error: null,
    };
  } catch (error) {
    return {
      locale,
      routeId: route.id,
      routePath: route.path,
      requestedUrl: url,
      viewport: viewport.name,
      capturedAt: new Date().toISOString(),
      network,
      screenshot: null,
      page: null,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    removeRequest();
    removeResponse();
    removeFailure();
  }
}

async function checkInternalLinks(baseUrl, captures) {
  const origin = new URL(baseUrl).origin;
  const urls = [
    ...new Set(
      captures
        .flatMap((capture) => capture.page?.links ?? [])
        .map((link) => link.href)
        .filter((href) => {
          try {
            return new URL(href).origin === origin;
          } catch {
            return false;
          }
        })
        .map((href) => {
          const url = new URL(href);
          url.hash = "";
          return url.href;
        }),
    ),
  ].sort();

  let nextIndex = 0;
  const results = [];
  async function worker() {
    while (nextIndex < urls.length) {
      const requestedUrl = urls[nextIndex++];
      try {
        const response = await fetch(requestedUrl, { redirect: "follow" });
        await response.body?.cancel();
        results.push({
          requestedUrl,
          status: response.status,
          finalUrl: response.url,
          contentType: response.headers.get("content-type"),
          error: null,
        });
      } catch (error) {
        results.push({
          requestedUrl,
          status: null,
          finalUrl: null,
          contentType: null,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }
  }

  await Promise.all(Array.from({ length: 8 }, () => worker()));
  results.sort((left, right) =>
    left.requestedUrl.localeCompare(right.requestedUrl),
  );
  return {
    checkedAt: new Date().toISOString(),
    count: results.length,
    results,
  };
}

async function captureGeneratedRoutes(baseUrl, routePaths) {
  const outputs = [];
  for (const routePath of routePaths) {
    const url = `${baseUrl}${routePath}`;
    try {
      const response = await fetch(url, { redirect: "follow" });
      const body = await response.text();
      outputs.push({
        requestedUrl: url,
        finalUrl: response.url,
        status: response.status,
        contentType: response.headers.get("content-type"),
        bodyLength: body.length,
        bodySha256: createHash("sha256").update(body).digest("hex"),
        body,
        error: null,
      });
    } catch (error) {
      outputs.push({
        requestedUrl: url,
        finalUrl: null,
        status: null,
        contentType: null,
        bodyLength: null,
        bodySha256: null,
        body: null,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return outputs;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const config = JSON.parse(await readFile(ROUTES_FILE, "utf8"));
  const locales = options.locales ?? config.locales;
  const routes = config.routes.filter(
    (route) => !options.routeIds || options.routeIds.includes(route.id),
  );
  const configuredViewports = config.viewports.filter(
    (viewport) =>
      !options.viewports || options.viewports.includes(viewport.name),
  );
  const viewports = options.screenshots
    ? configuredViewports
    : configuredViewports.filter((viewport) => viewport.name === "desktop");

  let captures = locales.flatMap((locale) =>
    routes.flatMap((route) =>
      viewports
        .filter(
          (viewport) =>
            route.kind !== "dynamic" ||
            locale === "en" ||
            viewport.name === "desktop",
        )
        .map((viewport) => ({ locale, route, viewport })),
    ),
  );
  if (Number.isFinite(options.limit))
    captures = captures.slice(0, options.limit);

  if (options.screenshots) {
    await rm(options.screenshotsDir, { recursive: true, force: true });
    await mkdir(options.screenshotsDir, { recursive: true });
  }
  await mkdir(path.dirname(options.report), { recursive: true });

  const port = await getFreePort();
  const userDataDir = path.join(
    "/tmp",
    `robusst-sanity-baseline-${process.pid}`,
  );
  const chrome = spawn(
    process.env.CHROME_BIN ?? "/usr/bin/google-chrome",
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      "--mute-audio",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${userDataDir}`,
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );

  let chromeStderr = "";
  chrome.stderr.on("data", (chunk) => {
    chromeStderr += String(chunk);
    if (chromeStderr.length > 20_000)
      chromeStderr = chromeStderr.slice(-20_000);
  });

  let session;
  try {
    await waitForChrome(port);
    const targetResponse = await fetch(
      `http://127.0.0.1:${port}/json/new?about:blank`,
      { method: "PUT" },
    );
    if (!targetResponse.ok) {
      throw new Error(
        `Could not create Chrome target: ${targetResponse.status}`,
      );
    }
    const target = await targetResponse.json();
    session = new CdpSession(target.webSocketDebuggerUrl);
    await session.connect();
    await session.send("Page.enable");
    await session.send("Runtime.enable");
    await session.send("Network.enable", {
      maxTotalBufferSize: 10_000_000,
      maxResourceBufferSize: 2_000_000,
    });

    const report = {
      schemaVersion: 1,
      baselineType: "pre-sanity-production",
      baseUrl: options.baseUrl,
      sourceGitSha: config.sourceGitSha,
      sourceBranch: config.sourceBranch,
      startedAt: new Date().toISOString(),
      completedAt: null,
      locales,
      routes,
      viewports,
      screenshotsEnabled: options.screenshots,
      generatedRoutes: await captureGeneratedRoutes(
        options.baseUrl,
        config.generatedRoutes,
      ),
      captures: [],
      internalLinkChecks: null,
      summary: null,
    };

    let completed = 0;
    for (const capture of captures) {
      const url = makeUrl(options.baseUrl, capture.locale, capture.route.path);
      process.stdout.write(
        `[${completed + 1}/${captures.length}] ${capture.viewport.name} ${url} ... `,
      );
      const captureOptions = {
        ...options,
        // Dynamic routes are screenshot once in both English viewports, while
        // their localized variants still receive a desktop status/metadata audit.
        screenshots:
          options.screenshots &&
          (capture.route.kind !== "dynamic" || capture.locale === "en"),
      };
      const result = await captureOne({
        session,
        url,
        ...capture,
        options: captureOptions,
      });
      report.captures.push(result);
      completed += 1;
      console.log(
        result.error
          ? `ERROR ${result.error}`
          : `${result.network.mainStatus?.status ?? "?"} ${result.page?.finalUrl ?? ""}`,
      );

      // Keep a usable partial report if the process is interrupted.
      report.completedAt = new Date().toISOString();
      report.summary = summarize(report.captures);
      await writeFile(options.report, `${JSON.stringify(report, null, 2)}\n`);
    }

    report.internalLinkChecks = await checkInternalLinks(
      options.baseUrl,
      report.captures,
    );
    report.completedAt = new Date().toISOString();
    report.summary = summarize(
      report.captures,
      report.internalLinkChecks.results,
    );
    await writeFile(options.report, `${JSON.stringify(report, null, 2)}\n`);
    console.log(`\nReport: ${path.relative(ROOT, options.report)}`);
    if (options.screenshots) {
      console.log(
        `Screenshots: ${path.relative(ROOT, options.screenshotsDir)}`,
      );
    }
    console.log(JSON.stringify(report.summary, null, 2));
  } finally {
    session?.close();
    chrome.kill("SIGTERM");
    if (chrome.exitCode === null) {
      await Promise.race([
        new Promise((resolve) => chrome.once("exit", resolve)),
        sleep(5_000),
      ]);
    }
    await rm(userDataDir, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 200,
    });
    if (chrome.exitCode && chrome.exitCode !== 0 && chromeStderr) {
      console.error(chromeStderr);
    }
  }
}

function summarize(captures, internalLinks = []) {
  const statuses = {};
  let captureErrors = 0;
  let failedRequests = 0;
  let httpErrors = 0;
  let screenshots = 0;

  for (const capture of captures) {
    if (capture.error) captureErrors += 1;
    const status = String(capture.network.mainStatus?.status ?? "unknown");
    statuses[status] = (statuses[status] ?? 0) + 1;
    failedRequests += capture.network.failures.length;
    httpErrors += capture.network.responses.length;
    if (capture.screenshot) screenshots += 1;
  }

  return {
    captures: captures.length,
    captureErrors,
    mainDocumentStatuses: statuses,
    failedRequests,
    httpErrorResponses: httpErrors,
    screenshots,
    internalLinksChecked: internalLinks.length,
    internalLinkErrors: internalLinks.filter(
      (link) => link.error || link.status >= 400,
    ).length,
    internalLinkRedirects: internalLinks.filter(
      (link) => link.requestedUrl !== link.finalUrl,
    ).length,
  };
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
