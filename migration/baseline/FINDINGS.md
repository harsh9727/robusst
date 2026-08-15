# Pre-Sanity Baseline Findings

Capture window: `2026-08-15T06:40:46.086Z`–`2026-08-15T06:52:52.039Z`

These are observations from the current production site. They are not all migration defects. Existing behavior must either be preserved or explicitly approved for correction.

## Summary

| Check                                   |                         Result |
| --------------------------------------- | -----------------------------: |
| Public route/locale combinations        |                            204 |
| Main-document HTTP 200 responses        |                            204 |
| Capture errors                          |                              0 |
| Main-document HTTP errors               |                              0 |
| Unique rendered internal links checked  |                            228 |
| Broken checked internal links           |                              0 |
| Checked links ending at a different URL |                             24 |
| Stored screenshots                      | 0, excluded by owner direction |
| Valid JSON-LD parse failures            |                              0 |
| Pages without a title                   |                              0 |
| Pages without a meta description        |                              0 |
| Pages without a canonical               |                              0 |
| Pages without exactly one H1            |                              0 |
| Locale/HTML language mismatches         |                              0 |
| Arabic direction mismatches             |                              0 |

## Route and locale behavior

- All 34 currently supported route shapes respond with HTTP 200 in all six locales.
- This consists of 18 fixed routes, 15 published blog slugs, and one currently linked career role.
- HTML `lang` matches the requested locale on all 204 captures.
- Arabic uses `dir="rtl"`; the other locales use `ltr`.
- All 228 unique rendered same-origin links resolve successfully when redirects are followed.
- Twenty-four internal destinations redirect, primarily unprefixed paths and compatibility aliases.
- The rendered site contains 23 distinct unprefixed internal path forms across 3,368 captured link occurrences. Examples include `/contact`, `/platforms`, `/solutions/cdp`, `/solutions/cyber-security`, `/solutions/voicesync`, and `/success-stories`.
- The unprefixed and legacy aliases currently resolve to English canonical routes. They form part of the routing/redirect compatibility contract unless locale-aware links are intentionally corrected.

## SEO baseline

### Healthy behavior

- Every captured page has a title, meta description, canonical link, and exactly one H1.
- Every JSON-LD block parsed as valid JSON.
- Fixed pages generally emit seven hreflang alternates: six locales plus `x-default`.

### Existing issues to preserve only if required

- 172 of 204 canonicals do not equal the requested localized URL.
  - Every non-English page points its canonical at the English equivalent.
  - The localized home pages canonicalize to `https://www.robusst.com/`.
  - Career role detail pages canonicalize to the site root.
- The fixed-page metadata title and description are effectively English/global rather than independently localized. The career role behaves the same way.
- All 96 blog listing/detail locale captures emit 13 alternate links. They combine root-page alternates with blog-page alternates and duplicate `en`, `fr`, `ru`, `es`, and `ar` hreflang values. Portuguese also appears inconsistently as both `pt-BR` and `pt`.
- Blog pages emit more JSON-LD blocks than fixed pages because global and blog-specific structured data are combined. The JSON is syntactically valid, but semantic duplication requires review during the Sanity SEO implementation.

The migration plan calls for locale-correct SEO. Therefore these baseline differences should be treated as approved SEO corrections, not silently copied into Sanity.

## Sitemap and crawler baseline

`robots.txt`, `sitemap.xml`, and `llms.txt` all respond with HTTP 200 and are stored verbatim in `report.json` with SHA-256 hashes.

The sitemap currently contains 169 locations:

- 96 valid localized marketing routes
- 72 localized `/stories/[id]` URLs that currently respond with HTTP 404
- `https://www.robusst.com/llms.txt`, which is not an HTML page

It omits 108 valid URLs from the captured matrix:

- six localized blog index routes
- 90 localized blog detail routes
- six localized POC waitlist routes
- six localized career role routes

Every sitemap entry uses the same `lastmod` value. Sitemap generation must be rebuilt from actual Sanity publication/update dates and supported routes.

Current robots rules disallow:

- `/api/`
- `/_next/`
- localized dashboard routes
- localized login routes

These rules are repeated for multiple named crawlers and should be preserved unless SEO requirements change.

## Content and asset observations

- The browser observed 1,601 image/alt combinations across captures without performing screenshot-driven full-page scrolling.
- One image has an empty alt value in all locales: `/solutions/cdp/11.webp` on the Customer Data Platform page.
- Body-text hashes differ by locale for every route, largely because localized global navigation/footer text contributes to the hash. A differing hash does not prove complete page translation; Milestone 1 must perform field-level translation completeness checks.

## Network behavior

- The initial run recorded one failed script request per page, with no HTTP error response.
- A follow-up capture with request URL tracing identifies the repeatable failure as LinkedIn's external `FollowCompany.js` widget request.
- The current capture report preserves the original opaque browser events; the updated capture script records URLs on future runs.
- This third-party failure should not block migration, but LinkedIn footer/widget behavior must be manually verified after cutover.

## Decisions required later

1. Approve correcting locale canonicals and localizing all SEO values rather than reproducing the current English canonicals.
2. Approve replacing duplicate blog hreflang output with one valid locale set plus `x-default`.
3. Decide whether all legacy/unprefixed aliases remain permanent redirects.
4. Remove invalid story detail URLs from the sitemap unless a real detail route is implemented.
5. Add blog, POC, and career detail URLs to the Sanity-backed sitemap.
6. Supply meaningful alt text for the CDP image.
7. Confirm the final-cutover content-freeze owner and window.
