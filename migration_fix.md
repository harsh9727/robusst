# CMS Migration Guide — Static ISR Architecture

> **Audience:** The agent implementing this migration.
> **Scope:** Migrating all textual content from static JSON files to the in-house CMS while keeping the site fully static, SEO-intact, and on-demand revalidatable.
> **Start with:** Home page only. Do not touch any other schema until home is verified working end-to-end.

---

## Table of Contents

1. [Current State](#1-current-state)
2. [Target State](#2-target-state)
3. [The Core Architectural Rule](#3-the-core-architectural-rule)
4. [Phase 1 — Home Page Migration](#4-phase-1--home-page-migration)
5. [How to Handle Global Schemas (Header / Footer)](#5-how-to-handle-global-schemas-header--footer)
6. [SEO Preservation Rules](#6-seo-preservation-rules)
7. [Verification Checklist](#7-verification-checklist)

---

## 1. Current State

### What exists right now

**next-intl is being used as two things simultaneously — only one of them is correct:**

```
next-intl routing system ✅ (correct, keep forever)
  └─ defineRouting() → /en /fr /ru /pt /es /ar URL prefixes
  └─ Link, redirect, usePathname, useRouter → locale-aware navigation
  └─ setRequestLocale() → tells Server Components which locale is active
  └─ Middleware locale detection from Accept-Language header

next-intl translation system ❌ (being replaced by CMS)
  └─ getRequestConfig in request.ts → loads content from static JSON files
  └─ useTranslations() in components → reads those JSON values
  └─ locales/*/home.json, header.json, footer.json etc → static content files
```

**The critical bug in `request.ts`:**

```ts
// src/i18n/request.ts — CURRENT (BROKEN)
const home = await getCmsContent<Home_JsonType>("home", locale);
return {
  locale,
  messages: {
    ...(home ?? (await import(`../../locales/${locale}/home.json`)).default),
    // ...
  },
};
```

`getCmsContent` inside `getRequestConfig` does **not** participate in Next.js ISR fetch cache. The `next: { tags, revalidate }` options on the fetch are silently ignored here. This means:
- `revalidateTag("cms-home-en")` has zero effect on this fetch
- The page ISR cache (`force-static` + `revalidate: 300`) does not cover this data
- Build-time CMS timeouts come from here — all 6 locales × all pages fire concurrent CMS calls during static generation

**Additionally**, several imports in `request.ts` are missing `.default`:
```ts
// BROKEN — spreads the module object, not the JSON content
...(await import(`../../locales/${locale}/customizeSolution.json`)),
...(await import(`../../locales/${locale}/noc.json`)),
...(await import(`../../locales/${locale}/networkMonetization.json`)),
...(await import(`../../locales/${locale}/aiCall.json`)),
...(await import(`../../locales/${locale}/stsAndDms.json`)),
...(await import(`../../locales/${locale}/contact.json`)),
...(await import(`../../locales/${locale}/pocWaitlist.json`)),
...(await import(`../../locales/${locale}/successStories.json`)),
...(await import(`../../locales/${locale}/solutionsPage.json`)),

// CORRECT — must have .default
...(await import(`../../locales/${locale}/customizeSolution.json`)).default,
```

**Current home page:**

```ts
// src/app/[locale]/(default)/page.tsx — CURRENT
export const dynamic = "force-static";
export const revalidate = 300;

const Home = async ({ params }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  // No CMS fetch here — CMS data was fetched in request.ts (wrong layer)
  return (
    <>
      <Hero />          {/* reads from useTranslations() internally */}
      <About />         {/* reads from useTranslations() internally */}
      <Solutions />     {/* reads from useTranslations() internally */}
      {/* ... */}
    </>
  );
};
```

**Current home section components** all use `useTranslations()`:
```tsx
// e.g. components/sections/home/Hero/Hero.tsx — CURRENT
export function Hero() {
  const t = useTranslations("hero");
  return <h1>{t("slides.0.title")}</h1>;
}
```

### What the CMS returns for home schema

The CMS returns a deeply nested JSON object at `data.content`. The full shape for `home` is already typed in `src/types/api/home_json.types.ts` as `Home_JsonType`. The structure looks like:

```json
{
  "hero": { "slides": [{ "title": "...", "description": "...", "ctaText": "..." }] },
  "about": { "heading": "...", "subheading": "...", "paragraphs": ["..."] },
  "solutions": { "heading": "...", "items": [...] },
  "results": { "heading": "...", "items": [...] },
  "howWeHelp": { "heading": "...", "items": [...] },
  "successStories": { "heading": "...", "items": [...] },
  "techStack": { "heading": "...", "items": [...] },
  "trustedBy": { "heading": "..." },
  "ourPresence": { "heading": "...", "countries": [...] },
  "whyChooseUs": { "heading": "...", "points": [...] },
  "eventsCoverage": { "heading": "...", "subheading": "..." },
  "industriesWeServe": { "heading": "...", "items": [...] },
  "contact": { "heading": "...", "subheading": "...", "ctaText": "..." }
}
```

---

## 2. Target State

### After full migration (all schemas)

```
next-intl routing system    → unchanged, keep forever
next-intl translation system → empty, CMS handles all content

request.ts                  → returns { locale, messages: {} }
locales/ folder             → deleted entirely
public/blogs/*.md           → deleted (blogs come from CMS)

Every page.tsx              → fetches CMS schema via getCmsContent()
                              passes typed data as props to section components
                              ISR cache works correctly
                              revalidateTag works correctly

Section components          → accept typed props from CMS
                              no useTranslations() calls
                              static JSON fallback removed
```

### The two-layer cache works correctly in target state

```
CMS publishes content
  └─ POST /api/revalidate { event: "content.published", schema: "home", locale: "en" }
       └─ revalidateTag("cms-home-en", "max")   → invalidates fetch cache in page.tsx
       └─ revalidatePath("/en", "page")          → evicts Vercel CDN entry
            └─ next request re-renders /en
                 └─ getCmsContent("home", "en") → fresh CMS data
                 └─ new HTML cached in both layers
```

---

## 3. The Core Architectural Rule

**This rule applies to every schema migration. Never break it.**

| Layer | What goes here | What does NOT go here |
|-------|---------------|----------------------|
| `request.ts` / `getRequestConfig` | `locale` only. `messages: {}`. Nothing else. | CMS fetches. Any `getCmsContent` call. |
| `page.tsx` (Server Component) | `getCmsContent(schema, locale)`. Pass data as props. | `useTranslations()`. |
| `layout.tsx` (Server Component) | `getCmsContent` for global schemas (header, footer). | `useTranslations()` for CMS content. |
| Section components | Accept typed `data` prop from parent. Render it. | `useTranslations()` for CMS-managed content. `getCmsContent` calls. |

**Why `request.ts` must stay empty:**
`getRequestConfig` is called by next-intl middleware infrastructure, not by Next.js's render pipeline. `fetch()` calls inside it do not get tagged with ISR cache entries. `revalidateTag` cannot reach them. `revalidatePath` cannot reach them. The entire ISR system is bypassed.

**Why section components must not call `getCmsContent`:**
Fetching in deeply nested components makes it impossible to control cache scope at the page level. All CMS fetches must happen at the page or layout level so `revalidatePath("/en", "page")` covers them.

---

## 4. Phase 1 — Home Page Migration

**Complete these steps in order. Verify each step before moving to the next. Do not proceed to other schemas until home is working end-to-end.**

---

### Step 1 — Fix `request.ts` immediately

This fix is required before anything else. It stops the broken CMS fetch in the wrong layer and fixes the missing `.default` bugs.

**Replace `src/i18n/request.ts` entirely:**

```ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import type { Locale } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      // home intentionally omitted — fetched in page.tsx via getCmsContent
      // delete this schema's import once its page.tsx migration is complete
      ...(await import(`../../locales/${locale}/footer.json`)).default,
      ...(await import(`../../locales/${locale}/header.json`)).default,
      ...(await import(`../../locales/${locale}/platforms.json`)).default,
      ...(await import(`../../locales/${locale}/storyPage.json`)).default,
      ...(await import(`../../locales/${locale}/careers.json`)).default,
      ...(await import(`../../locales/${locale}/common.json`)).default,
      ...(await import(`../../locales/${locale}/partnership.json`)).default,
      ...(await import(`../../locales/${locale}/aboutPage.json`)).default,
      ...(await import(`../../locales/${locale}/cdp.json`)).default,
      ...(await import(`../../locales/${locale}/brand.json`)).default,
      ...(await import(`../../locales/${locale}/customizeSolution.json`)).default,
      ...(await import(`../../locales/${locale}/noc.json`)).default,
      ...(await import(`../../locales/${locale}/networkMonetization.json`)).default,
      ...(await import(`../../locales/${locale}/aiCall.json`)).default,
      ...(await import(`../../locales/${locale}/stsAndDms.json`)).default,
      ...(await import(`../../locales/${locale}/contact.json`)).default,
      ...(await import(`../../locales/${locale}/pocWaitlist.json`)).default,
      ...(await import(`../../locales/${locale}/successStories.json`)).default,
      ...(await import(`../../locales/${locale}/solutionsPage.json`)).default,
      ...(await import(`../../locales/${locale}/cybersecurity.json`)).default,
    },
  };
});
```

Note: `home.json` is intentionally not imported. The home page will fetch from CMS directly. Once other schemas are migrated, remove their imports from here one by one.

---

### Step 2 — Update `page.tsx` to fetch CMS data

**Replace `src/app/[locale]/(default)/page.tsx` entirely:**

```tsx
import React from "react";
import { setRequestLocale } from "next-intl/server";
import {
  Hero,
  TrustedBy,
  About,
  Solutions,
  Results,
  HowWeHelp,
  SuccessStories,
  EventsCoverage,
  OurPresence,
  Contact,
  WhyChooseUs,
  BlogsGrid,
  TechStack,
  IndustriesWeServe,
} from "~/components/sections/home";
import { FadeIn } from "~/components/ui/FadeIn";
import { locales } from "~/i18n/config";
import { getCmsContent } from "~/lib/cms/client";
import type { Home_JsonType } from "~/types/api/home_json.types";

// ── ISR configuration ──────────────────────────────────────────────────────
// force-static: prevents accidental SSR drift if any dependency changes
// revalidate: 5-minute safety net if the CMS webhook fails
export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ── Page ───────────────────────────────────────────────────────────────────
const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  // This fetch IS inside a Server Component.
  // ISR cache, revalidateTag, and revalidatePath all work correctly here.
  const cmsHome = await getCmsContent<Home_JsonType>("home", locale);

  // cmsHome is null if CMS is unreachable at runtime — components must
  // handle null gracefully (show nothing or a static fallback).
  // At BUILD TIME, getCmsContent throws loudly so the build fails fast.

  return (
    <>
      <FadeIn backgroundColor="bg-primary">
        <Hero data={cmsHome?.hero} />
      </FadeIn>

      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <TrustedBy data={cmsHome?.trustedBy} />
      </FadeIn>

      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <About data={cmsHome?.about} />
      </FadeIn>

      {/* wave dividers unchanged */}
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z" fill="#000000" />
        </svg>
      </div>

      <FadeIn delay={0.1} backgroundColor="bg-primary">
        <Solutions data={cmsHome?.solutions} />
      </FadeIn>

      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150" preserveAspectRatio="none">
          <path d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z" fill="#000000" stroke="none" />
        </svg>
      </div>

      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <Results data={cmsHome?.results} />
      </FadeIn>

      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150" preserveAspectRatio="none">
          <path d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z" fill="#000000" stroke="none" />
        </svg>
      </div>

      <FadeIn delay={0.1} backgroundColor="bg-primary">
        <SuccessStories data={cmsHome?.successStories} />
      </FadeIn>

      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150" preserveAspectRatio="none">
          <path d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z" fill="#000000" stroke="none" />
        </svg>
      </div>

      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <HowWeHelp data={cmsHome?.howWeHelp} />
      </FadeIn>

      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150" preserveAspectRatio="none">
          <path d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z" fill="#000000" stroke="none" />
        </svg>
      </div>

      <FadeIn delay={0.1} backgroundColor="bg-primary">
        <EventsCoverage data={cmsHome?.eventsCoverage} />
      </FadeIn>

      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150" preserveAspectRatio="none">
          <path d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z" fill="#000000" stroke="none" />
        </svg>
      </div>

      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <WhyChooseUs data={cmsHome?.whyChooseUs} />
      </FadeIn>

      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z" fill="#000000" />
        </svg>
      </div>

      <FadeIn delay={0.1} backgroundColor="bg-primary">
        <BlogsGrid />
      </FadeIn>

      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150" preserveAspectRatio="none">
          <path d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z" fill="#000000" stroke="none" />
        </svg>
      </div>

      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <OurPresence data={cmsHome?.ourPresence} />
      </FadeIn>

      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <Contact data={cmsHome?.contact} />
      </FadeIn>

      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <IndustriesWeServe data={cmsHome?.industriesWeServe} />
      </FadeIn>
    </>
  );
};

export default Home;
```

---

### Step 3 — Update every home section component

Open `src/components/sections/home/` and update each component. The pattern is identical for all of them. Use the CMS data type from `Home_JsonType` to get the exact shape for each section's prop.

**Pattern for every section component:**

```tsx
// BEFORE — reads from useTranslations() (next-intl messages)
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");
  const slides = // ... built from t() calls
  return <HeroSlider slides={slides} />;
}
```

```tsx
// AFTER — receives typed props from page.tsx, no useTranslations
import type { Home_JsonType } from "~/types/api/home_json.types";

interface HeroProps {
  data?: Home_JsonType["hero"];
}

export function Hero({ data }: HeroProps) {
  // data is null/undefined if CMS was unreachable — render nothing or a skeleton
  if (!data) return null;
  return <HeroSlider slides={data.slides} />;
}
```

**Components to update in `src/components/sections/home/`:**

Go through each directory and apply the pattern above. The sections and their CMS data keys are:

| Component file | CMS data key | Type path |
|---|---|---|
| `Hero/Hero.tsx` | `cmsHome.hero` | `Home_JsonType["hero"]` |
| `About/About.tsx` | `cmsHome.about` | `Home_JsonType["about"]` |
| `Solutions/Solutions.tsx` | `cmsHome.solutions` | `Home_JsonType["solutions"]` |
| `Results/Results.tsx` | `cmsHome.results` | `Home_JsonType["results"]` |
| `HowWeHelp/HowWeHelp.tsx` | `cmsHome.howWeHelp` | `Home_JsonType["howWeHelp"]` |
| `SuccessStories/SuccessStories.tsx` | `cmsHome.successStories` | `Home_JsonType["successStories"]` |
| `TechStack/TechStack.tsx` | `cmsHome.techStack` | `Home_JsonType["techStack"]` |
| `TrustedBy/TrustedBy.tsx` | `cmsHome.trustedBy` | `Home_JsonType["trustedBy"]` |
| `OurPresence/OurPresence.tsx` | `cmsHome.ourPresence` | `Home_JsonType["ourPresence"]` |
| `WhyChooseUs/WhyChooseUs.tsx` | `cmsHome.whyChooseUs` | `Home_JsonType["whyChooseUs"]` |
| `EventsCoverage/EventsCoverage.tsx` | `cmsHome.eventsCoverage` | `Home_JsonType["eventsCoverage"]` |
| `IndustriesWeServe/IndustriesWeServe.tsx` | `cmsHome.industriesWeServe` | `Home_JsonType["industriesWeServe"]` |
| `Contact/Contact.tsx` | `cmsHome.contact` | `Home_JsonType["contact"]` |

**Important:** After removing `useTranslations` from a component, check if it was the only `useTranslations` call. If yes, remove the import too. TypeScript will catch any remaining references.

---

### Step 4 — Run TypeScript to find all remaining `useTranslations` references

```bash
# From project root — find any remaining useTranslations in home sections
grep -rn "useTranslations" src/components/sections/home/ --include="*.tsx"

# Should return nothing after Step 3 is complete.
# If it returns files, those still need to be updated.
```

Also run:

```bash
pnpm typecheck
```

Fix all TypeScript errors before proceeding. Common ones:
- Component now expects `data` prop but call site doesn't pass it → already fixed in page.tsx above
- `data` type doesn't match what the component expects → check `Home_JsonType` for exact shape

---

### Step 5 — Build and verify locally

```bash
pnpm build
```

**What to look for:**

```
✓ Generating static pages (240/240)
● /[locale]    5m    1y   ← correct, home is ISR
● /[locale]/about  5m  1y
...
```

No errors. No `[CMS] getCmsContent threw` messages. All 240 pages generated successfully.

If the build succeeds but you see CMS timeout errors, the CMS is unreachable from your build environment. Check `CMS_BASE_URL` and `CMS_API_KEY` are set in your local `.env` and that the CMS server is accessible.

---

### Step 6 — Delete home.json files

Only do this after the build passes in Step 5.

```bash
# Delete home.json for all locales
rm locales/en/home.json
rm locales/fr/home.json
rm locales/ru/home.json
rm locales/pt/home.json
rm locales/es/home.json
rm locales/ar/home.json
```

Run `pnpm build` again. It must still pass. If it fails, something is still importing `home.json` — find it with:

```bash
grep -rn "home.json" src/ --include="*.ts" --include="*.tsx"
```

---

### Step 7 — Deploy and verify revalidation end-to-end

After deploying to Vercel, run this two-request sequence to confirm ISR + on-demand revalidation is working:

```bash
# 1. Change some text in the CMS for home schema, en locale
# 2. Trigger revalidation
curl -X POST 'https://www.robusst.com/api/revalidate?secret=QWERTYUIOP' \
  -H 'Content-Type: application/json' \
  -d '{"event":"content.published","schema":"home","locale":"en"}'

# Expected response:
# { "revalidated": true, "purgedTags": ["cms-home-en"], "purgedPaths": ["/en[page]"] }

# 3. First request — triggers background regeneration (stale content served)
curl -s -o /dev/null -w "%{http_code}" https://www.robusst.com/en

# 4. Wait 2 seconds
sleep 2

# 5. Second request — fresh content served
curl -I https://www.robusst.com/en
# x-vercel-cache: HIT (but now contains fresh CMS content)
```

Open the browser and confirm the text change from Step 1 is visible on the second request.

---

## 5. How to Handle Global Schemas (Header / Footer)

Header and footer appear on every page. They are fetched in `(default)/layout.tsx`, not in individual pages. The ISR behaviour is the same — fetch in a Server Component, pass as props.

**When the header/footer schemas exist in the CMS, apply this pattern:**

```tsx
// src/app/[locale]/(default)/layout.tsx
import { getCmsContent } from "~/lib/cms/client";
import type { HeaderType } from "~/types/api/header.types";
import type { FooterType } from "~/types/api/footer.types";
import { Footer, Header } from "~/components/layout";
import { Provider } from "~/components/wrapper";
import GoToTop from "~/components/common/GoToTop/GoToTop";

// These apply to the layout and all pages rendered inside it
export const dynamic = "force-static";
export const revalidate = 300;

export default async function DefaultLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch both in parallel — do not await sequentially
  const [header, footer] = await Promise.all([
    getCmsContent<HeaderType>("header", locale),
    getCmsContent<FooterType>("footer", locale),
  ]);

  return (
    <Provider>
      <GoToTop />
      <Header data={header} />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer data={footer} />
    </Provider>
  );
}
```

**Then update `Header` and `Footer` components** to accept typed `data` props, same pattern as the home sections:

```tsx
// src/components/layout/Header/Header.tsx
import type { HeaderType } from "~/types/api/header.types";

interface HeaderProps {
  data?: HeaderType | null;
}

export function Header({ data }: HeaderProps) {
  if (!data) return null; // or a static fallback skeleton
  return <nav>{/* render from data */}</nav>;
}
```

**Revalidation for layout schemas uses `"layout"` scope**, not `"page"`. This is already handled in `route.ts` via `LAYOUT_SCHEMAS = new Set(["header", "footer", "common"])`. When the CMS fires `content.published` for `header`, it calls:

```ts
revalidatePath("/en", "layout");  // evicts /en AND all pages under it
```

**Delete `locales/*/header.json` and `footer.json`** only after the layout migration is verified working. Remove their imports from `request.ts` at the same time.

---

## 6. SEO Preservation Rules

These rules must be followed throughout the migration. Violating any of them degrades SEO.

### Rule 1 — Every CMS page must have these three exports

```ts
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const dynamic = "force-static";
export const revalidate = 300;
```

`generateStaticParams` ensures every locale is pre-rendered at build time as static HTML. Without it, the first visitor after a deploy triggers a cold server render — crawlers that hit before that get no content.

`dynamic = "force-static"` prevents Next.js from silently falling into server-side rendering if any dependency changes in future. It throws a build error instead of silently degrading.

`revalidate = 300` is a 5-minute safety net so pages never go stale for more than 5 minutes even if the CMS webhook fails.

### Rule 2 — CMS fetch failures must never produce empty pages in production

`getCmsContent` returns `null` on failure at runtime. Every section component handles `null` gracefully — either renders `null` (nothing) or a minimal static fallback. An empty page is worse for SEO than a page with fallback static content.

Consider keeping a minimal hardcoded fallback in each component for the case where CMS is unreachable:

```tsx
const DEFAULT_HERO = {
  slides: [{ title: "AI Solutions to Skyrocket Revenue", description: "...", ctaText: "Explore More" }]
};

export function Hero({ data }: HeroProps) {
  const heroData = data ?? DEFAULT_HERO;
  return <HeroSlider slides={heroData.slides} />;
}
```

### Rule 3 — Never remove `generateMetadata` from any page

`generateMetadata` produces the `<title>`, `<meta description>`, Open Graph, and canonical tags. These are critical for SEO. They must remain in every page. If metadata is currently coming from static JSON, migrate it to CMS data the same way as content:

```ts
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const cmsHome = await getCmsContent<Home_JsonType>("home", locale);
  return {
    title: cmsHome?.meta?.title ?? "Robusst | AI-Powered Telecom Solutions",
    description: cmsHome?.meta?.description ?? "...",
  };
}
```

Note: `getCmsContent` uses the ISR fetch cache — calling it in both `generateMetadata` and the page component for the same `schema + locale` makes only one actual HTTP request (Next.js deduplicates fetch calls within a single render).

### Rule 4 — Build must always succeed before deleting static JSON

The sequence is always: migrate → build passes → verify → delete JSON. Never delete JSON first. If you delete JSON and then the CMS becomes unreachable during build, you have no fallback and the build fails with no recovery path.

### Rule 5 — `hreflang` alternate links must stay correct

Your pages generate `hreflang` alternate links from the locale list. These come from next-intl routing and `generateMetadata`. Confirm they are still present in the response headers after migration:

```bash
curl -I https://www.robusst.com/en | grep "link:"
# Should show all 6 locale alternates
```

### Rule 6 — Do not change URL structure

The URL structure (`/en`, `/fr`, `/en/solutions/cybersecurity` etc.) must stay identical throughout the migration. next-intl routing handles this and it is not being changed. Never rename routes during a CMS migration.

---

## 7. Verification Checklist

Run through this checklist after completing each phase of migration.

### After home page migration

- [ ] `request.ts` no longer imports `home.json` or calls `getCmsContent`
- [ ] All missing `.default` on JSON imports in `request.ts` are fixed
- [ ] `page.tsx` calls `getCmsContent<Home_JsonType>("home", locale)`
- [ ] All home section components accept typed `data` prop, no `useTranslations`
- [ ] `grep -rn "useTranslations" src/components/sections/home/` returns nothing
- [ ] `pnpm typecheck` passes with no errors
- [ ] `pnpm build` passes, all 240 pages generated, no CMS timeout errors
- [ ] `locales/*/home.json` deleted, build still passes after deletion
- [ ] Deployed to Vercel
- [ ] Two-request revalidation sequence confirms fresh content on second request
- [ ] Browser shows updated CMS content after revalidation
- [ ] Page source (`view-source:https://www.robusst.com/en`) contains actual text content (not blank)
- [ ] `x-nextjs-postponed` header absent from page responses
- [ ] All 6 locale variants render correctly (`/en`, `/fr`, `/ru`, `/pt`, `/es`, `/ar`)

### After each subsequent schema migration

- [ ] Schema removed from `request.ts` messages
- [ ] Page/layout fetches schema via `getCmsContent`
- [ ] Components updated to accept typed props
- [ ] Static JSON files deleted for that schema across all 6 locales
- [ ] Build passes after JSON deletion
- [ ] Deployed, revalidation verified working for that schema
- [ ] `locales/` directory empty after final schema (delete the folder)

### SEO spot checks (run after each deploy)

```bash
# Check page renders full HTML content (not blank)
curl -s https://www.robusst.com/en | grep -c "<h1\|<h2\|<p"
# Should return a number > 20

# Check hreflang tags present
curl -s https://www.robusst.com/en | grep hreflang
# Should show 6 locale links

# Check title tag present
curl -s https://www.robusst.com/en | grep "<title"
# Should show the page title

# Check ISR headers
curl -I https://www.robusst.com/en | grep -E "cache-control|x-vercel-cache"
# x-vercel-cache: HIT means page is being served from CDN (correct)
```
