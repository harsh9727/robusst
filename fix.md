# Fix: On-Demand ISR Cache Not Updating After CMS Webhook

## Confirmed Root Cause (from dashboard testing)

Vercel has **three independent cache layers**. Your current revalidate route only clears **one of them**. The other two — ISR Cache and CDN Cache — are not being touched programmatically.

```
Layer 1 — Vercel CDN Cache    (global edge, closest to users)         ← NOT being cleared
Layer 2 — ISR Cache           (regional, pre-rendered HTML)           ← partially cleared via revalidatePath
Layer 3 — Data Cache          (raw fetch() responses, CMS API calls)  ← cleared via revalidateTag
```

**Dashboard test confirmed this:**
- Purging `cms-home-en` via the Vercel CDN dashboard with "Invalidate" → first request still cached, second request fresh (stale-while-revalidate behaviour)
- That means the CDN Cache layer was holding onto the stale HTML and revalidating in the background
- The fix needs to clear all three layers AND use "Delete" (not "Invalidate") semantics so the first request always gets fresh content

---

## Why `revalidateTag("cms-home-en")` Does Not Clear the CDN Cache

`next: { tags: ["cms-home-en"] }` on a `fetch()` call registers a **Next.js Data Cache tag**. This is a completely separate system from the **Vercel CDN Cache tag** system.

The Vercel CDN Cache uses its own tag mechanism via the `Vercel-Cache-Tag` response header. Unless your pages are explicitly setting this header with the same tag name, calling `revalidateTag` from Next.js does **not** touch the CDN layer at all.

`revalidatePath` marks the ISR entry as stale (Layer 2), but uses stale-while-revalidate — old HTML is served while re-render happens in the background. This is why you always need two requests to see fresh content.

---

## The Complete Fix

Three changes are required:

1. **Add `Vercel-Cache-Tag` headers to your pages** so the CDN layer is taggable
2. **Call `dangerouslyDeleteByTag()` from `@vercel/functions`** in your revalidate route to drop the CDN cache entries immediately (not just mark stale)
3. **Keep the existing `revalidateTag({ expire: 0 })` + `revalidatePath`** for Layers 2 and 3

---

### Step 1 — Install `@vercel/functions`

```bash
pnpm add @vercel/functions
```

---

### Step 2 — Add `Vercel-Cache-Tag` headers to pages via `next.config.js`

The CDN needs to know which cache tag to associate with each page response. Add headers to `next.config.js`:

```js
// next.config.js
// Add inside your existing nextConfig object, alongside whatever is already there

async headers() {
  const locales = ["en", "fr", "ru", "pt", "es", "ar"];
  const headerEntries = [];

  // Home pages — tag with cms-home-{locale}
  for (const locale of locales) {
    headerEntries.push({
      source: `/${locale}`,
      headers: [{ key: "Vercel-Cache-Tag", value: `cms-home-${locale}` }],
    });
  }

  // Add other schemas here as you migrate them to CMS, e.g.:
  // for (const locale of locales) {
  //   headerEntries.push({
  //     source: `/${locale}/about`,
  //     headers: [{ key: "Vercel-Cache-Tag", value: `cms-aboutPage-${locale}` }],
  //   });
  // }

  return headerEntries;
},
```

> **Important:** The tag name must exactly match what your revalidate route uses. Your route already uses the pattern `cms-{schema}-{locale}` via `cmsTag(schema, locale)`. Use that same pattern here. Keep this consistent as you migrate more schemas.

---

### Step 3 — Update `src/app/api/revalidate/route.ts`

Three changes to this file:

**A) Add the import at the top:**
```ts
import { dangerouslyDeleteByTag } from "@vercel/functions";
```

**B) Change `purgeTag` to use `{ expire: 0 }` instead of `"max"`:**
```ts
// BEFORE
function purgeTag(tag: string) {
  revalidateTag(tag, "max");
  purgedTags.push(tag);
}

// AFTER
function purgeTag(tag: string) {
  revalidateTag(tag, { expire: 0 });
  purgedTags.push(tag);
}
```

**C) Add CDN cache purge block just before the final `return NextResponse.json(...)` at the very bottom of the POST handler:**

```ts
// ── Layer 1: Purge Vercel CDN cache ─────────────────────────────────────────
// revalidateTag + revalidatePath only clear the Next.js Data Cache (Layer 3)
// and mark ISR entries stale (Layer 2). The Vercel CDN Cache (Layer 1) is a
// completely separate system that requires explicit purging via @vercel/functions.
//
// dangerouslyDeleteByTag() drops the CDN cache entry immediately (no
// stale-while-revalidate). The next request hits the origin, gets fresh HTML,
// and re-populates the CDN. This gives first-request freshness after every
// CMS publish event.
//
// Tags must match the Vercel-Cache-Tag headers set on page responses
// in next.config.js.

const cdnPurgeResults: string[] = [];
for (const tag of purgedTags) {
  try {
    await dangerouslyDeleteByTag(tag);
    cdnPurgeResults.push(tag);
  } catch (err) {
    console.warn(`[revalidate] CDN purge failed for tag="${tag}":`, err);
  }
}

console.log(
  `[revalidate] CDN purge tags=[${cdnPurgeResults.join(", ")}]`,
);
```

Also update the final `return NextResponse.json(...)` to include CDN purge info:

```ts
return NextResponse.json({
  revalidated: true,
  event: body.event,
  purgedTags,
  purgedPaths,
  cdnPurgedTags: cdnPurgeResults,
  now: new Date().toISOString(),
});
```

---

## The Complete Flow After Fix

```
CMS publishes content
  └─ POST /api/revalidate { event: "content.published", schema: "home", locale: "en" }
       │
       ├─ revalidateTag("cms-home-en", { expire: 0 })
       │    └─ Drops Next.js Data Cache entry immediately (Layer 3)
       │
       ├─ revalidatePath("/en", "page")
       │    └─ Marks ISR pre-rendered HTML as stale (Layer 2)
       │
       └─ dangerouslyDeleteByTag("cms-home-en")
            └─ Drops Vercel CDN Cache entry immediately (Layer 1)
                 └─ Next request hits origin → fresh re-render → CDN re-populates
                 └─ First request gets fresh content ✓
```

---

## Files to Change

```
package.json / pnpm-lock.yaml         — add @vercel/functions dependency
next.config.js                        — add Vercel-Cache-Tag headers per page/locale
src/app/api/revalidate/route.ts       — add dangerouslyDeleteByTag() calls + { expire: 0 }
```

---

## Verification

After deploying:

```bash
# 1. Update content in CMS

# 2. Webhook fires (or trigger manually)
curl -X POST 'https://www.robusst.com/api/revalidate?secret=YOUR_SECRET' \
  -H 'Content-Type: application/json' \
  -d '{"event":"content.published","schema":"home","locale":"en"}'

# Expected response now includes cdnPurgedTags:
# {
#   "revalidated": true,
#   "purgedTags": ["cms-home-en"],
#   "purgedPaths": ["/en[page]"],
#   "cdnPurgedTags": ["cms-home-en"]
# }

# 3. Hard refresh ONCE — should see fresh content immediately
# No longer need a second request.

# 4. Check the x-vercel-cache header
curl -I https://www.robusst.com/en | grep x-vercel-cache
# First request after purge: MISS  (origin hit, CDN repopulating)
# Subsequent requests:       HIT   (CDN serving fresh content)
```

If the **first** hard refresh after the webhook shows updated content, the fix is working correctly.

---

## As You Migrate More Schemas

Each time you migrate a new schema (e.g. `aboutPage`, `contact`, etc.) to CMS:

1. Add the corresponding `Vercel-Cache-Tag` header entry in `next.config.js` for all 6 locales — matching the same `cms-{schema}-{locale}` pattern
2. No changes needed to `route.ts` — the CDN purge loop already iterates over all `purgedTags`, so it will pick up new schemas automatically

---

## Note on `dangerouslyDeleteByTag` vs `invalidateByTag`

- `invalidateByTag()` = stale-while-revalidate. Old content on first request, new content on second. Same as the dashboard "Invalidate" option. **Not sufficient for your use case.**
- `dangerouslyDeleteByTag()` = drops cache entry immediately. First request hits origin directly. **This is what you need.**

The "dangerously" prefix warns about potential cache stampede (many concurrent users hitting origin simultaneously after a purge). For a CMS-driven marketing site with moderate traffic this is not a concern — you are purging targeted per-schema per-locale tags on content publish events, not nuking the entire CDN at once.
