# robusst.com — Full Optimization Report
**Target: 100/100 across Performance, Accessibility, Best Practices, SEO**
**Sources: PageSpeed Insights (Mobile + Desktop) · Bing Webmaster Tools**
**Date: March 25, 2026**

---

## Table of Contents

1. [Performance (Mobile: 50 → 100 | Desktop: 62 → 100)](#1-performance)
2. [Accessibility (76/77 → 100)](#2-accessibility)
3. [Best Practices (77 → 100)](#3-best-practices)
4. [SEO (85 → 100)](#4-seo)
5. [Bing Webmaster Issues](#5-bing-webmaster-issues)
6. [Priority Action Order](#6-priority-action-order)

---

## 1. Performance

### 1.1 Render-Blocking CSS — Est. savings: 620 ms (Mobile) / 30 ms (Desktop)

**Issue:** Four CSS chunks (`0o7s~nivrs1sq.css`, `0oh_s-k_2~ea..css`, `00yh8bs7oxnmh.css`, `14oiz0gl8tr~w.css`) totalling ~31 KiB are loaded synchronously in the critical path, blocking the browser from painting anything until they are downloaded and parsed. On mobile this adds over 2 seconds of blocking time.

**Fix:** These are Next.js chunked stylesheets. The root cause is that Next.js is splitting CSS into multiple files that all get injected as render-blocking `<link rel="stylesheet">` tags.

```js
// next.config.js
const nextConfig = {
  experimental: {
    optimizeCss: true,       // enables critters for CSS inlining/critical extraction
  },
};
```

Additionally, review your CSS imports. If you are importing large libraries (e.g., Swiper full CSS) at the top level, scope them to the component:

```tsx
// BAD — imported globally, always blocks
import 'swiper/css';

// GOOD — dynamic import inside the component that uses it
useEffect(() => { import('swiper/css'); }, []);
```

For the specific chunks, consider using `<link rel="preload" as="style">` combined with `onload` for non-critical CSS:

```html
<link rel="preload" href="/chunks/0oh_s-k_2~ea..css" as="style"
      onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/chunks/0oh_s-k_2~ea..css"></noscript>
```

---

### 1.2 Largest Contentful Paint (LCP) — 7.1 s Mobile / 1.6 s Desktop

**Issue:** The LCP element on desktop is the `<h1>` tag with text "AI Solutions to Skyrocket Revenue & Delight Customers". The LCP breakdown shows 2,740 ms spent in **Element Render Delay** — meaning the browser has already received the HTML but something is blocking the element from rendering (JavaScript execution, CSS, or fonts).

**Fix:**

**a) The hero video is blocking LCP text rendering.** The `<video autoplay loop muted playsinline>` in the hero section causes layout recalculations that delay text paint. Add a `poster` attribute and lazy-load the video:

```tsx
// src/components/sections/home/Hero/Hero.tsx
<video
  src="/home/hero/hero-one-video.mp4"
  autoPlay loop muted playsInline
  poster="/home/hero/hero-1.webp"   // Add poster — shows immediately, no decode delay
  preload="none"                     // Don't preload video bytes on initial load
  className="h-full w-full object-cover object-top"
/>
```

**b) Preload the LCP font.** If the H1 uses a custom font (check `src/utils/fonts.ts`), ensure it is preloaded:

```tsx
// src/app/layout.tsx
<link
  rel="preload"
  href="/fonts/your-heading-font.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

**c) Use `next/font` properly** — ensure fonts defined in `src/utils/fonts.ts` use `display: 'swap'` and are passed to the root layout so they are inlined as CSS variables, not loaded as external stylesheets.

---

### 1.3 Total Blocking Time (TBT) — 980 ms Mobile / 2,120 ms Desktop

**Issue:** TBT measures the total time the main thread is blocked by long tasks (>50 ms). The report identifies 12–13 long tasks. The primary offenders on desktop are:

- `chunks/17hd6p4vnhx01.js` — 1,685 ms CPU (Next.js runtime/polyfill bundle)
- Calendly embed JS — 1,413 ms CPU
- Unattributable — 438 ms

**Fix:**

**a) Load Calendly lazily.** This is your #1 TBT killer on desktop (1,413 ms). The Calendly widget should never load on initial page load.

```tsx
// src/components/feature/CalendlyFormEmbed/CalendlyFormEmbed.tsx
import dynamic from 'next/dynamic';

const CalendlyWidget = dynamic(
  () => import('./CalendlyWidgetInner'),
  { ssr: false, loading: () => <div className="h-96 animate-pulse bg-gray-100 rounded" /> }
);

// Only render when user scrolls to the section or clicks a button
const [showCalendly, setShowCalendly] = useState(false);

// Use IntersectionObserver
useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) setShowCalendly(true);
  }, { rootMargin: '200px' });
  if (ref.current) observer.observe(ref.current);
  return () => observer.disconnect();
}, []);
```

**b) Break up `chunks/17hd6p4vnhx01.js`.** This is the Next.js framework bundle. The 1,685 ms parse time indicates it is too large. Ensure you have proper code splitting:

```js
// next.config.js
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'react-icons',
      'recharts',
      'swiper',
    ],
  },
};
```

**c) Load PostHog, LinkedIn, and Stripe asynchronously** — these third parties collectively add hundreds of ms to TBT. Load them after user interaction or after a delay:

```tsx
// Load analytics after page is fully interactive
useEffect(() => {
  const timer = setTimeout(() => {
    // Initialize PostHog
    // Load LinkedIn SDK
    // Load Stripe
  }, 3000); // 3 second defer
  return () => clearTimeout(timer);
}, []);
```

---

### 1.4 Forced Reflow

**Issue:** JavaScript in `chunks/17hd6p4vnhx01.js`, `chunks/0v124zn1.~mpy.js`, and several other chunks reads layout properties (like `offsetWidth`) after modifying the DOM, causing the browser to stop and recalculate layout synchronously. Total reflow time: ~170 ms.

**Fix:** Batch DOM reads and writes. Use the `requestAnimationFrame` pattern to separate reads from writes:

```ts
// BAD — forces synchronous reflow
element.style.width = '200px';
const height = element.offsetHeight; // forces reflow!

// GOOD — batch reads then writes
let height: number;
// Read phase
requestAnimationFrame(() => {
  height = element.offsetHeight;
  // Write phase (separate frame)
  requestAnimationFrame(() => {
    element.style.height = `${height}px`;
  });
});
```

If using GSAP (which is in your dependencies), use `gsap.set()` and `gsap.getProperty()` rather than reading raw DOM layout properties.

---

### 1.5 Network Dependency Chain — Max latency: 1,084 ms (Mobile)

**Issue:** The browser must download `/en` HTML → then download 4 CSS chunks in sequence, with the longest chain reaching 1,084 ms before anything can render.

**Fix:** Inline critical CSS and use HTTP/2 server push or `103 Early Hints`. For Next.js on Vercel, Early Hints are supported automatically if you enable the flag:

```js
// next.config.js
const nextConfig = {
  experimental: {
    earlyHints: true,
  },
};
```

Also consider merging the 4 small CSS chunks — files of 1.5–1.9 KiB are too small to be separate HTTP requests; the connection overhead exceeds the transfer cost.

---

### 1.6 Inefficient Cache Lifetimes — Est. savings: 401–402 KiB

**Issue:** Third-party assets (Stripe: 2–5 min TTL, PostHog scripts: 5 min TTL, Calendly: 5 min TTL, LinkedIn: 1 day TTL) expire quickly, meaning returning visitors re-download them.

**Fix:** You cannot control third-party cache headers. Instead, **self-host critical third-party scripts** where possible:

**Self-host PostHog** (recommended — they support this):
```ts
// posthog init with reverse proxy
posthog.init('YOUR_KEY', {
  api_host: '/ingest',           // proxy through your own domain
  ui_host: 'https://us.posthog.com',
});
```

```js
// next.config.js — add rewrites
async rewrites() {
  return [
    { source: '/ingest/static/:path*', destination: 'https://us-assets.i.posthog.com/static/:path*' },
    { source: '/ingest/:path*', destination: 'https://us.i.posthog.com/:path*' },
  ];
},
```

For LinkedIn and Stripe, ensure you are not loading duplicate copies. The report shows LinkedIn's `in.js` being loaded 3 times — deduplicate this.

---

### 1.7 Image Delivery — Est. savings: 92 KiB (Mobile) / 195 KiB (Desktop)

**Issue:** Multiple images are served at full resolution but displayed at smaller dimensions. Examples:

| Image | File Size | Source Dims | Display Dims | Wasted |
|-------|-----------|-------------|--------------|--------|
| sales-data.webp | 46.3 KiB | 1035×1024 | 945×630 | 20.3 KiB |
| result.webp | 44.0 KiB | 1080×596 | 634×792 | 9.7 KiB |
| antispam.webp | 26.3 KiB | 739×732 | 650×630 | 6.4 KiB |
| logo.webp | 7.8 KiB | — | — | 5.8 KiB (over-compressed) |
| Partner logos (iu, ireland, claro, smart, mobily, tt, movistar, airtel) | ~5–7 KiB each | 500×282 | 199×112 | ~4–6 KiB each |

**Fix:** Use Next.js `<Image>` component with proper `sizes` prop so the browser only downloads the appropriate resolution:

```tsx
import Image from 'next/image';

// For images with fill layout (most of your cases)
<Image
  src="/home/oursolution/sales-data.webp"
  alt="Sales data dashboard"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 945px"
  className="object-cover duration-150"
/>

// For partner logos — they display at 199×112, so set width/height accordingly
<Image
  src="/home/success/iu.webp"
  alt="IU logo"
  width={199}
  height={112}
  className="object-contain p-2"
/>
```

Ensure `next.config.js` has image optimization enabled (it is by default in Next.js). Also add your public image domains if using external images.

For the logo specifically, recompress it at a higher quality since PageSpeed flagged it as over-compressed (losing quality for minimal size savings at 5.8 KiB savings).

---

### 1.8 Legacy JavaScript — Est. savings: 30 KiB

**Issue:** `chunks/17hd6p4vnhx01.js` includes polyfills for `Array.prototype.at`, `Array.prototype.flat`, `Array.prototype.flatMap`, `Object.fromEntries`, `Object.hasOwn`, `String.prototype.trimEnd`, `String.prototype.trimStart`, and `Math.trunc` — all of which are natively supported in modern browsers (Chrome 85+, Safari 15+, Firefox 78+). PostHog also ships a `Math.trunc` polyfill unnecessarily.

**Fix:** Update your browserslist target in `package.json` or `.browserslistrc`:

```json
// package.json — add or update browserslist
{
  "browserslist": [
    "chrome >= 87",
    "firefox >= 78",
    "safari >= 14",
    "edge >= 88"
  ]
}
```

Or configure Next.js directly:

```js
// next.config.js
const nextConfig = {
  experimental: {
    browsersListForSwc: true,
  },
};
```

This tells Babel/SWC to skip polyfills for features already in your target browsers.

---

### 1.9 Reduce Unused JavaScript — Est. savings: 1,358 KiB

**Issue:** This is the largest opportunity. The biggest offenders:

| Source | Transfer Size | Unused | % Unused |
|--------|--------------|--------|----------|
| Calendly `booking-62628336b.js` | 1,158 KiB | 812 KiB | 70% |
| Calendly `pxwebj3qd.js` | 82 KiB | 82 KiB | ~100% |
| Stripe `/v3` | 221 KiB | 161 KiB | 73% |
| LinkedIn `in.js` (×3 copies) | 198 KiB total | 123 KiB | 62% |
| `chunks/0~fr4ilrxjbd7.js` | 146 KiB | 105 KiB | 72% |
| PostHog surveys.js | 32 KiB | 25 KiB | 79% |

**Fix:**

**Calendly** — lazy load as shown in section 1.3. This alone saves ~900 KiB.

**Stripe** — only load Stripe on pages that need payment processing. Use dynamic import:

```tsx
// Only import Stripe when user reaches payment step
const loadStripe = async () => {
  const { loadStripe } = await import('@stripe/stripe-js');
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
};
```

**LinkedIn** — the report shows `in.js` loaded 3 times. Find and remove duplicates. It should appear in one place only (likely `src/app/[locale]/layout.tsx` or the `<Head>`). Only load on pages where LinkedIn follow widget is used.

**PostHog surveys.js** — disable surveys if you don't use PostHog's survey feature:

```ts
posthog.init('YOUR_KEY', {
  disable_surveys: true,
  disable_dead_clicks: true,  // also disable dead-clicks-autocapture if not needed
});
```

---

### 1.10 Reduce Unused CSS — Est. savings: 551 KiB

**Issue:** 551 KiB of CSS is loaded but never applied on the initial page. This is primarily Tailwind CSS generating all utility classes at build time.

**Fix:** Ensure Tailwind's content configuration is tight so it only includes classes actually used:

```js
// tailwind.config.js (or tailwind.config.ts)
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    // Do NOT include node_modules or public directory
  ],
  // ...
};
```

Also enable `optimizeCss` in Next.js (uses Critters to extract and inline critical CSS, deferring the rest):

```js
// next.config.js
experimental: { optimizeCss: true }
```

---

### 1.11 Enormous Network Payloads — Total: 7,645 KiB (Mobile) / 6,403 KiB (Desktop)

**Issue:** The page downloads nearly 7.6 MB of resources on mobile. The main contributors are the JS bundles listed above.

**Fix:** Address 1.9 (unused JS) and 1.7 (images) first — together they account for the bulk. Additionally:

- Enable Vercel's Edge Network compression (gzip/brotli) — verify it is active in your `vercel.json`
- Enable Next.js compression:

```js
// next.config.js
const nextConfig = {
  compress: true, // enabled by default; confirm it's not disabled
};
```

---

### 1.12 Minimize Main-Thread Work — 4.8 s (Mobile) / 5.5 s (Desktop)

**Issue:** The main thread is busy for 4.8–5.5 seconds total, primarily from script evaluation (2,980 ms) and script parsing & compilation (1,017 ms) on desktop.

**Fix:** This is a downstream effect of the large JS bundles. Addressing 1.3, 1.8, and 1.9 will reduce this significantly. Additionally:

- Use `React.memo` on heavy components that re-render frequently (the Solutions carousel, TechStack grid, etc.)
- Move heavy computations off the main thread using Web Workers if applicable
- Defer Framer Motion animations — use `whileInView` with `viewport={{ once: true }}` so animations only trigger when visible, not on load

---

## 2. Accessibility

### 2.1 Buttons Without Accessible Names

**Issue:** Three buttons are identified with no accessible name. Screen readers will announce these as "button" with no context:

- Two `icon-lg` ghost buttons in the hero section (likely previous/next arrows for the slider/carousel)
- One `icon` ghost button in the footer social section (YouTube button)

**Fix:** Add `aria-label` to every icon-only button:

```tsx
// Hero slider navigation
<Button
  variant="ghost"
  size="icon-lg"
  aria-label="Previous slide"
  onClick={handlePrev}
>
  <ChevronLeft className="h-6 w-6" />
</Button>

<Button
  variant="ghost"
  size="icon-lg"
  aria-label="Next slide"
  onClick={handleNext}
>
  <ChevronRight className="h-6 w-6" />
</Button>

// YouTube button
<Button variant="ghost" size="icon" aria-label="Watch our YouTube channel">
  <a target="_blank" href="https://www.youtube.com/channel/UCReJgLXmPU9g3cm47msi-Ng">
    <YoutubeIcon />
  </a>
</Button>
```

---

### 2.2 Links Without Discernible Names

**Issue:** Three links have no accessible text:

- LinkedIn company page link (icon only, no text)
- Instagram link (icon only, no text)
- YouTube link (nested inside a button — also structurally invalid)

**Fix:**

```tsx
// LinkedIn
<a
  href="https://www.linkedin.com/company/106457875/admin/page-posts/published"
  target="_blank"
  aria-label="Follow Robusst on LinkedIn"
  rel="noopener noreferrer"
>
  <LinkedInIcon />
</a>

// Instagram
<a
  href="https://www.instagram.com"
  target="_blank"
  aria-label="Follow Robusst on Instagram"
  rel="noopener noreferrer"
>
  <InstagramIcon />
</a>

// YouTube — NOTE: <a> nested inside <button> is invalid HTML. Change to just an <a>:
<a
  href="https://www.youtube.com/channel/UCReJgLXmPU9g3cm47msi-Ng"
  target="_blank"
  aria-label="Subscribe to Robusst on YouTube"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center ..."
>
  <YouTubeIcon />
</a>
```

---

### 2.3 Skip Link Not Focusable

**Issue:** The "Skip to main content" link uses `sr-only` as the base class, which hides it visually and removes it from focus order in some browsers. The `focus:not-sr-only` override should restore it, but the element isn't receiving focus correctly.

**Fix:** Ensure the skip link is the very first element in `<body>` and that the `#main-content` target exists with `tabindex="-1"`:

```tsx
// src/app/[locale]/(default)/layout.tsx
<body>
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded"
  >
    Skip to main content
  </a>
  <Header />
  <main id="main-content" tabIndex={-1}>
    {children}
  </main>
  <Footer />
</body>
```

The key fix is adding `tabIndex={-1}` to the `<main>` element so keyboard focus can land there after the skip link is activated.

---

### 2.4 Insufficient Color Contrast

**Issue:** Numerous elements using `text-muted-foreground` on `bg-primary` backgrounds fail contrast requirements (WCAG AA requires 4.5:1 for normal text, 3:1 for large text). Affected areas include: hero subtitle text, all solution cards, results section stats, footer navigation, case study cards, and the CTA section.

**Fix:** Adjust your CSS variables in `src/styles/globals.css`. The muted-foreground color on a primary background is too light:

```css
/* src/styles/globals.css */
:root {
  /* Increase muted-foreground contrast on dark (primary) backgrounds */
  --muted-foreground: oklch(0.72 0 0);  /* Current — too low contrast */
}

/* Create a variant for use on dark backgrounds */
.bg-primary {
  --muted-foreground: oklch(0.82 0 0);  /* Lighter version for dark backgrounds */
}
```

Alternatively, add a specific class for text on primary backgrounds:

```tsx
// Instead of text-muted-foreground on dark sections, use:
<p className="text-primary-foreground/80">  {/* Higher contrast on dark */}
```

Use the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify all text/background combinations reach at least 4.5:1.

---

### 2.5 Missing `lang` Attribute on `<html>`

**Issue:** The `<html>` element has no `lang` attribute, so screen readers cannot determine the page language and may mispronounce content.

**Fix:** Add the locale to the root `<html>` element. Since you use `next-intl`, pass the locale from the layout:

```tsx
// src/app/[locale]/layout.tsx
export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
```

For the Arabic locale, also add `dir="rtl"`:

```tsx
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
```

---

### 2.6 Touch Targets Too Small

**Issue:** Two elements have touch targets smaller than the recommended 44×44px minimum:

- The `icon` size ghost button in the footer (YouTube)
- The YouTube `<a>` nested inside the button

**Fix:** Increase the minimum size of `icon` variant buttons:

```tsx
// src/components/ui/button.tsx
// Ensure icon size is at least 44×44px (tap target best practice)
const buttonVariants = cva("...", {
  variants: {
    size: {
      "icon": "h-11 w-11",      // 44px — up from whatever it was
      "icon-lg": "h-12 w-12",   // 48px
    }
  }
});
```

---

### 2.7 Missing `<main>` Landmark

**Issue:** The page has no `<main>` landmark element, which screen reader users rely on to navigate directly to the page's primary content.

**Fix:** Wrap the page content in a `<main>` tag (covered in fix 2.3 above). Ensure this is done in the default layout:

```tsx
// src/app/[locale]/(default)/layout.tsx
<main id="main-content" tabIndex={-1} className="flex-1">
  {children}
</main>
```

---

### 2.8 Video Missing Captions Track

**Issue:** The hero video (`hero-one-video.mp4`) and presumably `hero-two-video.mp4` have no `<track kind="captions">` element, making them inaccessible to deaf or hard-of-hearing users.

**Fix:** Add a captions track, or mark the video as decorative if it contains no meaningful spoken content:

```tsx
// If video is purely decorative (background ambiance, no speech):
<video
  src="/home/hero/hero-one-video.mp4"
  autoPlay loop muted playsInline
  aria-hidden="true"    // Mark as decorative
  poster="/home/hero/hero-1.webp"
>
  {/* No track needed for decorative videos */}
</video>

// If video has spoken content, add a real VTT caption file:
<video src="..." autoPlay loop muted playsInline>
  <track
    kind="captions"
    src="/captions/hero-video-en.vtt"
    srcLang="en"
    label="English"
    default
  />
</video>
```

---

## 3. Best Practices

### 3.1 Third-Party Cookies (Calendly)

**Issue:** Calendly sets two cookies (`__cf_bm` and `_cfuvid`) from `calendly.com` when the embed loads. These are Cloudflare protection cookies. Third-party cookies are being blocked in more browsers and will impact the embed's functionality.

**Fix:** Two approaches:

**Option A — Load Calendly only when user explicitly requests it** (click-to-load, reducing passive cookie exposure):

```tsx
const [showCalendly, setShowCalendly] = useState(false);

return showCalendly ? (
  <CalendlyEmbed url="..." />
) : (
  <Button onClick={() => setShowCalendly(true)}>
    Schedule a Call
  </Button>
);
```

**Option B — Use Calendly's cookie-free embed option.** Calendly offers a way to embed that minimizes tracking. Check their documentation for `embed_type=Inline&hide_gdpr_banner=1`.

---

### 3.2 Missing Content Security Policy (CSP)

**Issue:** PageSpeed and Bing both flag that no CSP header is configured, leaving the site vulnerable to XSS attacks.

**Fix:** Add security headers in `next.config.js`:

```js
// next.config.js
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://assets.calendly.com https://platform.linkedin.com https://us-assets.i.posthog.com",
      "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "frame-src https://calendly.com https://js.stripe.com",
      "connect-src 'self' https://us.i.posthog.com https://api.stripe.com",
    ].join('; '),
  },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preloadx' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

module.exports = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};
```

---

### 3.3 Missing Source Maps for First-Party JS

**Issue:** `chunks/0~fr4ilrxjbd7.js` is a large first-party JS file with no source map, making debugging in production impossible.

**Fix:** Enable source maps in production (note: source maps don't affect users — they're only downloaded by DevTools):

```js
// next.config.js
const nextConfig = {
  productionBrowserSourceMaps: true,
};
```

---

## 4. SEO

### 4.1 Non-Descriptive Link Text — 8 Links

**Issue:** All 8 solution "Learn More" links point to different pages but share identical link text ("Learn More" / "LEARN MORE"). Search engines use link text to understand the destination's topic.

**Fix:** Make each link text unique and descriptive:

```tsx
// src/components/sections/home/Solutions/Solutions.tsx
// Instead of generic "Learn More":

const solutions = [
  {
    href: '/solutions/ai-call-center',
    label: 'Learn More About AI Call Center', // or just 'Explore AI Call Center'
  },
  {
    href: '/solutions/branded-calling',
    label: 'Explore Branded Calling & Anti-SPAM',
  },
  {
    href: '/solutions/customer-data-platform',
    label: 'Learn About Our CDP Solution',
  },
  // etc.
];

// Render:
<Link href={solution.href} aria-label={solution.label}>
  Learn More
  <span className="sr-only"> about {solution.name}</span>
</Link>
```

The `sr-only` span approach lets you keep the visual "Learn More" text while providing descriptive text to search engines and screen readers.

---

### 4.2 Invalid `rel=canonical`

**Issue:** The canonical tag points to `https://www.robusst.com/en` but the `hreflang` configuration is also pointing there, creating a circular reference. The canonical should point to the clean, canonical version of the URL.

**Fix:** Review your canonical and hreflang setup in `src/utils/generateSeo.ts`. For a multi-language Next.js site:

```tsx
// src/utils/generateSeo.ts
export function generateSeo({ locale, path }: { locale: string; path: string }) {
  const baseUrl = 'https://www.robusst.com';

  return {
    // Canonical should point to the current locale's URL
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: {
        'en': `${baseUrl}/en${path}`,
        'ar': `${baseUrl}/ar${path}`,
        'es': `${baseUrl}/es${path}`,
        'fr': `${baseUrl}/fr${path}`,
        'pt': `${baseUrl}/pt${path}`,
        'ru': `${baseUrl}/ru${path}`,
        'x-default': `${baseUrl}/en${path}`, // Default language fallback
      },
    },
  };
}
```

Also update `next-sitemap.config.cjs` to ensure the sitemap reflects the correct canonical URLs.

---

## 5. Bing Webmaster Issues

### 5.1 Broken Redirects (12 URLs) — **ERROR**

**Issue:** Twelve URLs are redirecting to destinations that return HTTP 400–599 errors. The broken redirect destinations are:

| Broken URL | Likely Intended Destination |
|---|---|
| `/en/success-stories` | `/en/stories` |
| `/solutions/cdp` | `/en/solutions/customer-data-platform` |
| `/en/solutions/cdp` | `/en/solutions/customer-data-platform` |
| `/en/solutions/customized` | `/en/solutions/customized-solutions` |
| `/solutions/sales-tracking` | `/en/solutions/sts-dms` |
| `/en/solutions/voicesync` | `/en/solutions/sts-dms` (or removed) |
| `/en/solutions/sales-tracking` | `/en/solutions/sts-dms` |
| `/solutions/voicesync` | `/en/solutions/sts-dms` (or removed) |
| `/solutions/cyber-security` | `/en/solutions/cybersecurity` |
| `/success-stories` | `/en/stories` |
| `/en/solutions/cyber-security` | `/en/solutions/cybersecurity` |
| `/solutions/customized` | `/en/solutions/customized-solutions` |

**Fix:** Add permanent 301 redirects in `next.config.js`:

```js
// next.config.js
async redirects() {
  return [
    // Success stories
    { source: '/success-stories', destination: '/en/stories', permanent: true },
    { source: '/en/success-stories', destination: '/en/stories', permanent: true },

    // CDP
    { source: '/solutions/cdp', destination: '/en/solutions/customer-data-platform', permanent: true },
    { source: '/en/solutions/cdp', destination: '/en/solutions/customer-data-platform', permanent: true },

    // Customized solutions
    { source: '/solutions/customized', destination: '/en/solutions/customized-solutions', permanent: true },
    { source: '/en/solutions/customized', destination: '/en/solutions/customized-solutions', permanent: true },

    // Sales tracking / STS-DMS
    { source: '/solutions/sales-tracking', destination: '/en/solutions/sts-dms', permanent: true },
    { source: '/en/solutions/sales-tracking', destination: '/en/solutions/sts-dms', permanent: true },

    // VoiceSync (redirect to closest equivalent)
    { source: '/solutions/voicesync', destination: '/en/solutions/sts-dms', permanent: true },
    { source: '/en/solutions/voicesync', destination: '/en/solutions/sts-dms', permanent: true },

    // Cyber security (slug normalization)
    { source: '/solutions/cyber-security', destination: '/en/solutions/cybersecurity', permanent: true },
    { source: '/en/solutions/cyber-security', destination: '/en/solutions/cybersecurity', permanent: true },

    // Non-locale paths → locale paths
    { source: '/solutions/:path*', destination: '/en/solutions/:path*', permanent: true },
  ];
},
```

---

### 5.2 HTTP 400–499 Errors (6 URLs) — **ERROR**

**Issue:** These pages return 4xx status codes (likely 404). These are the destination pages that the broken redirects in 5.1 point to — they either never existed or were renamed.

Pages affected:
- `/en/solutions/cyber-security` → should be `/en/solutions/cybersecurity`
- `/en/solutions/customized` → should be `/en/solutions/customized-solutions`
- `/en/solutions/cdp` → should be `/en/solutions/customer-data-platform`
- `/en/success-stories` → should be `/en/stories`
- `/en/solutions/sales-tracking` → should be `/en/solutions/sts-dms`
- `/en/solutions/voicesync` → page may have been removed

**Fix:** The redirects in 5.1 will resolve these. Additionally, add a proper 404 page in `src/app/[locale]/not-found.tsx` (it already exists per your file tree — ensure it returns HTTP 404 status, not 200).

Also submit the correct URLs to Bing via **URL Submission** in Bing Webmaster Tools after deploying the redirects.

---

### 5.3 Blocked by robots.txt — **ERROR**

**Issue:** `/en/poc_waitlist` is blocked by your `robots.txt`, preventing Bingbot from crawling it.

**Fix:** Check your `public/robots.txt` or the robots config in `src/app/robots.ts`:

```ts
// src/app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/dashboard/',
        '/_next/',
        // Remove '/poc_waitlist' or '/en/poc_waitlist' if it was listed here
      ],
    },
    sitemap: 'https://www.robusst.com/sitemap.xml',
  };
}
```

If `poc_waitlist` should genuinely not be indexed (e.g., it's a private waitlist), keep the `robots.txt` block but add `<meta name="robots" content="noindex">` to the page instead — this is more semantically correct and avoids confusing Bing Webmaster Tools. If it should be indexed, remove the block.

---

### 5.4 Missing Alt Attribute on Images — **WARNING**

**Issue:** One image on `/en/solutions/customer-data-platform` is missing an `alt` attribute.

**Fix:** Audit all `<img>` tags and Next.js `<Image>` components in the CDP solution page and its sub-components. Every `<Image>` component requires an `alt` prop:

```tsx
// Find all images in:
// src/components/sections/cdp/

// Decorative images (backgrounds, dividers) → empty alt:
<Image src="..." alt="" aria-hidden="true" />

// Content images → descriptive alt:
<Image src="/solutions/cdp/10.webp" alt="CDP data pipeline architecture diagram" />
```

Search your codebase for `alt=""` or missing `alt` props:

```bash
grep -r '<Image' src/components/sections/cdp/ | grep -v 'alt='
```

---

### 5.5 Multiple H1 Tags — **NOTICE**

**Issue:** Three pages have more than one `<h1>` tag:

- `/en/solutions/ai-call-center` — multiple H1s
- `/en/solutions/intelligent-noc` — multiple H1s
- `/en` (home page) — multiple H1s

**Fix:** Each page should have exactly one `<h1>`. Audit the banner components for these pages — often the banner has an H1 and a section deeper in the page also uses H1:

```tsx
// src/components/sections/aicall/Banner/Banner.tsx
// WRONG:
<h1>AI Call Partner</h1>  // Banner H1

// src/components/sections/aicall/SomeOtherSection/...
// WRONG:
<h1>Advanced AI Intelligence</h1>  // Second H1 — change to H2

// CORRECT structure:
// One <h1> in the banner (main page title)
// All subsequent sections use <h2>, <h3>, etc.
```

Check the home page (`src/app/[locale]/(default)/page.tsx`) — the Hero section likely has one H1 and another section may have a second. Change secondary headings to `<h2>`.

---

## 6. Priority Action Order

Work through these in order for the fastest score improvements:

| Priority | Action | Score Impact | Effort |
|----------|--------|--------------|--------|
| 🔴 1 | Lazy-load Calendly embed | TBT −1,400 ms, saves ~900 KiB JS | Low |
| 🔴 2 | Add 301 redirects for all 12 broken URLs | Bing errors fixed | Low |
| 🔴 3 | Add `lang` attribute to `<html>` | Accessibility +5 | Very Low |
| 🔴 4 | Fix H1 duplicates on 3 pages | SEO + Bing | Low |
| 🔴 5 | Fix broken redirect destinations (5.2) | Bing + SEO | Low |
| 🟠 6 | Add `aria-label` to all icon buttons/links | Accessibility +8 | Low |
| 🟠 7 | Fix link text for 8 "Learn More" links | SEO +5 | Low |
| 🟠 8 | Add security headers (CSP, HSTS, XFO, COOP) | Best Practices +15 | Medium |
| 🟠 9 | Lazy-load Stripe, LinkedIn, PostHog | TBT −500 ms, JS −400 KiB | Medium |
| 🟠 10 | Fix color contrast (muted-foreground on primary) | Accessibility +10 | Medium |
| 🟠 11 | Add `<main>` landmark + skip link fix | Accessibility +5 | Low |
| 🟠 12 | Fix touch target sizes (44×44 px minimum) | Accessibility +3 | Low |
| 🟡 13 | Use `next/image` with proper `sizes` prop | Performance +5, saves 92–195 KiB | Medium |
| 🟡 14 | Fix browserslist to remove unnecessary polyfills | Performance, saves 30 KiB | Low |
| 🟡 15 | Enable `optimizeCss` in next.config.js | Performance, reduces CSS blocking | Low |
| 🟡 16 | Fix canonical URL + hreflang configuration | SEO +5 | Medium |
| 🟡 17 | Fix robots.txt for `/en/poc_waitlist` | Bing error resolved | Very Low |
| 🟡 18 | Add `alt` to missing image on CDP page | Bing warning + Accessibility | Very Low |
| 🟡 19 | Remove duplicate LinkedIn `in.js` loads | Performance, saves 130 KiB | Low |
| 🟡 20 | Self-host PostHog (reverse proxy) | Best Practices, cache TTL | Medium |
| 🟢 21 | Enable `productionBrowserSourceMaps` | Best Practices (minor) | Very Low |
| 🟢 22 | Add video captions / `aria-hidden` on decorative videos | Accessibility +3 | Low |
| 🟢 23 | Add `earlyHints: true` to next.config.js | Performance (minor) | Very Low |

---

*Estimated final scores after all fixes: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100*
