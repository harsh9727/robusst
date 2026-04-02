# Fix: On-Demand ISR Cache Not Updating After CMS Webhook

## Current State

The site is a Next.js 16.2.1 App Router project deployed on Vercel, in the middle of a migration from static JSON files to an external CMS. The home page has been migrated: `page.tsx` fetches content via `getCmsContent("home", locale)` using `fetch()` with `next: { revalidate: 300, tags: ["cms-home-en"] }`. A webhook endpoint at `/api/revalidate` receives POST requests from the CMS on every content update.

The revalidate route (`src/app/api/revalidate/route.ts`) calls both:
- `revalidateTag(tag, "max")` — to purge the Next.js data/fetch cache (Layer 1)
- `revalidatePath(path, "page" | "layout")` — to evict the Vercel edge CDN cache (Layer 2)

Vercel logs confirm the webhook is being received and processed correctly:
```
[revalidate] event="content.published" tags=[cms-home-en] paths=[/en[page]]
```

## The Problem

**The cache IS being invalidated — but the page is not being regenerated until a real user visits it.**

This is a fundamental misunderstanding of how `revalidateTag`/`revalidatePath` work in Next.js App Router (and especially in Next.js 16+):

1. These functions **mark the cache as stale**, they do NOT immediately re-render the page.
2. The **first organic visitor** after the webhook fires triggers the background re-render and gets the old (stale) content.
3. The **second visitor** gets the fresh content.
4. If no visitor comes between the webhook firing and the 5-minute ISR baseline expiry, it looks like the cache isn't working — but it is, just lazily.

Additionally, in Next.js 16+, `revalidateTag(tag, "max")` uses **stale-while-revalidate semantics** — it explicitly keeps serving stale content while regenerating in the background. This is the wrong profile for a CMS webhook that requires **immediate expiration**. The Next.js docs explicitly state:

> "For webhooks or third-party services that need immediate expiration, you can pass `{ expire: 0 }` as the second argument. This pattern is necessary when external systems call your Route Handlers and require data to expire immediately."

## The Fix

Two changes are required in `src/app/api/revalidate/route.ts`:

### Fix 1 — Change `"max"` to `{ expire: 0 }` in the `purgeTag` helper

`"max"` keeps the stale entry alive and serves it while revalidating in the background. `{ expire: 0 }` drops it immediately, so the next request is a clean cache miss that fetches fresh data.

```ts
// BEFORE (inside the purgeTag helper function)
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

### Fix 2 — Add fire-and-forget pre-warm requests after all revalidations complete

After calling `revalidateTag` + `revalidatePath`, fire a `fetch` with `cache: "no-store"` to each purged page URL. This makes the route handler itself act as "the first visitor", forcing Next.js to immediately re-render and repopulate the cache. Real users then always get the fresh content.

These fetches must be fire-and-forget (no `await`) so the CMS webhook gets its `200` response immediately without waiting for page re-renders to complete.

Add this block **inside the POST handler, just before the final `return NextResponse.json(...)`**, after the switch statement:

```ts
// ── Pre-warm: trigger immediate regeneration for all purged paths ───────────
// revalidateTag/revalidatePath only mark the cache stale — regeneration
// doesn't happen until the next organic visit. Pre-warming fires fetch
// requests to those paths so the cache is repopulated immediately after
// invalidation. Real users then always get fresh content.
//
// Use cache: "no-store" to bypass the CDN and hit the origin directly.
// Fire-and-forget (no await) so the webhook response is not delayed.

const siteBaseUrl = env.NEXT_PUBLIC_SITE_URL ?? "https://www.robusst.com";

for (const purgedPathEntry of purgedPaths) {
  // purgedPaths entries are formatted as "/en[page]" — strip the type suffix
  const cleanPath = purgedPathEntry.replace(/\[(page|layout)\]$/, "");
  fetch(`${siteBaseUrl}${cleanPath}`, {
    cache: "no-store",
    headers: { "x-prerender-revalidate": env.REVALIDATE_SECRET ?? "" },
  }).catch((err) => {
    console.warn(`[revalidate] Pre-warm failed for ${cleanPath}:`, err);
  });
}
```

> **Note on `x-prerender-revalidate` header:** Vercel uses this header to identify revalidation requests and route them correctly to the origin. Pass your `REVALIDATE_SECRET` as its value so the request is treated as trusted. If you don't have `NEXT_PUBLIC_SITE_URL` in env, add it to `.env` and Vercel environment variables pointing to `https://www.robusst.com`.

## Full Picture of the Fixed Flow

```
CMS publishes content
  └─ POST /api/revalidate { event: "content.published", schema: "home", locale: "en" }
       └─ revalidateTag("cms-home-en", { expire: 0 })   → drops fetch cache entry immediately
       └─ revalidatePath("/en", "page")                  → marks CDN entry as stale
       └─ fetch("https://www.robusst.com/en", { cache: "no-store" })  [fire-and-forget]
            └─ Next.js re-renders /en immediately with fresh CMS data
            └─ new HTML is cached in both the data cache and Vercel CDN
       └─ returns { revalidated: true, ... } to CMS

First real user request after webhook
  └─ x-vercel-cache: HIT  (fresh content, just regenerated by pre-warm)
```

## Verification

After deploying the fix, test with this sequence:

```bash
# 1. Make a visible text change in the CMS (e.g. change a heading on the home page)

# 2. Trigger the webhook (or let the CMS trigger it automatically)
curl -X POST 'https://www.robusst.com/api/revalidate?secret=YOUR_SECRET' \
  -H 'Content-Type: application/json' \
  -d '{"event":"content.published","schema":"home","locale":"en"}'

# Expected response:
# { "revalidated": true, "purgedTags": ["cms-home-en"], "purgedPaths": ["/en[page]"] }

# 3. Wait 2-3 seconds for the pre-warm fetch to complete

# 4. Check the FIRST request — it should now show the updated content immediately
curl -s https://www.robusst.com/en | grep "YOUR_CHANGED_TEXT"

# 5. Check cache header — should be HIT with fresh content
curl -I https://www.robusst.com/en | grep -E "x-vercel-cache|x-nextjs-cache"
# x-vercel-cache: HIT  ← served from CDN (correct)
```

If step 4 shows updated content on the **first** request (not the second), the fix is working.

## Files to Change

Only one file needs to be modified:

```
src/app/api/revalidate/route.ts
```

Specifically:
1. The `purgeTag` helper function — change `"max"` to `{ expire: 0 }`
2. Add the pre-warm block before the final `return NextResponse.json(...)` at the bottom of the POST handler

No other files need to change. The `getCmsContent` function in `src/lib/cms/client.ts` and the page-level fetch setup are correct as-is.
