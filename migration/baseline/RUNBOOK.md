# Sanity Migration Baseline Runbook

## 1. Prerequisites

- Run from the repository root.
- Use Node.js 22 or later.
- Ensure Google Chrome is available at `/usr/bin/google-chrome`, or set `CHROME_BIN`.
- Ensure the target website is publicly reachable.
- Do not load or print secret environment values.

The capture script uses Chrome DevTools Protocol directly and does not require Playwright or Puppeteer.

## 2. Quick validation

Capture the English home page only:

```bash
node scripts/capture-sanity-baseline.mjs \
  --locales=en \
  --routes=home \
  --viewports=desktop \
  --limit=1 \
  --report=/tmp/robusst-baseline-test.json
```

Expected result:

- main document status is 200
- one report capture is written
- no screenshot is required
- process exits successfully

## 3. Full production baseline

```bash
node scripts/capture-sanity-baseline.mjs
```

Default output:

```text
migration/baseline/report.json
```

The default run performs a desktop browser audit for every fixed and dynamic route in all six locales. Stored screenshots are not required by owner direction.

## 4. Useful scoped runs

### One locale

```bash
node scripts/capture-sanity-baseline.mjs --locales=ar
```

### Selected routes

```bash
node scripts/capture-sanity-baseline.mjs \
  --routes=home,about,contact,blogs
```

### Optional targeted screenshots

```bash
node scripts/capture-sanity-baseline.mjs \
  --screenshots \
  --locales=en \
  --routes=home,about
```

Screenshots are an opt-in debugging aid, not a Milestone 0 deliverable.

### Local application

Start the application separately, then run:

```bash
node scripts/capture-sanity-baseline.mjs \
  --base-url=http://localhost:3000 \
  --report=/tmp/robusst-local-baseline.json
```

### Increase page-settle delay

For slow CMS or media responses:

```bash
node scripts/capture-sanity-baseline.mjs --settle-ms=3500
```

## 5. What the report captures

For each route/locale/viewport capture:

- requested URL and browser final URL
- main-document HTTP status
- title
- HTML language and direction
- canonical URL
- hreflang links
- metadata tags
- JSON-LD blocks
- heading hierarchy
- unique rendered links and labels
- unique rendered images and alt text
- rendered videos and posters
- page dimensions
- normalized body-text length and SHA-256 hash
- failed network requests
- HTTP error responses for subresources
- optional screenshot path and dimensions when `--screenshots` is used
- capture error, if any

The report deliberately stores a body-text hash rather than the complete body text. Full content extraction belongs to Milestone 1's content manifest.

## 6. Generated route checks

Capture and retain the public output of:

- `https://www.robusst.com/robots.txt`
- `https://www.robusst.com/sitemap.xml`
- `https://www.robusst.com/llms.txt`

Review for:

- unexpected or missing routes
- invalid detail URLs
- missing blog/job/story URLs
- locale alternates
- stale last-modified behavior
- crawler rules
- editorial content that must move to Sanity

## 7. Dynamic-route discovery

Before every final baseline refresh:

1. Audit `/en/blogs` and collect all `/en/blogs/*` links.
2. Audit every localized careers page and collect `/careers/roles/*` links.
3. Compare discovered routes with `migration/baseline/routes.json`.
4. Add new dynamic routes before running the final capture.
5. Compare against the sitemap, but do not treat sitemap entries as valid without an actual route response.

## 8. Baseline review procedure

For every fixed route and locale:

1. Confirm main-document status.
2. Confirm final URL and redirects.
3. Confirm `lang` and `dir`; Arabic must be `rtl`.
4. Confirm title, description, canonical, and hreflang.
5. Confirm one meaningful H1 unless the current approved page intentionally differs.
6. Review broken subresource responses and network failures.
7. Review missing/empty image alt text.
8. Review links that lose locale prefixes.
9. Record current defects separately from migration regressions.

## 9. Content freeze procedure

Immediately before production migration:

1. Announce freeze start and approver.
2. Prevent normal publishing in the old CMS.
3. Record the final production deployment SHA.
4. Rerun dynamic-route discovery.
5. Rerun the complete baseline.
6. Store `report.json` in durable project storage.
7. Review capture errors before migration begins.
8. Export/backup the old production content only for rollback—not as the new schema authority.
9. Start the final Sanity migration.

Any emergency old-site edit after the final baseline requires either:

- a new baseline capture, or
- a recorded manual delta included in the Sanity migration and QA checklist.

## 10. Post-Sanity comparison

Run the same script against the Sanity-backed preview or production origin and compare:

- route/status matrix
- final URLs and redirects
- heading sequence
- link destinations and labels
- image counts, dimensions, and alt text
- video/poster behavior
- metadata, canonical, hreflang, and JSON-LD
- body-text hashes where exact text parity is expected
- side-by-side rendered responsive and RTL behavior against the live approved production reference
- network failures and HTTP errors

Expected differences, such as corrected SEO or generated missing translations, must be documented and approved rather than ignored.

## 11. Rollback preparation

Before cutover, retain:

- pre-Sanity report
- baseline report
- source Git SHA
- final old-site deployment SHA
- Sanity dataset export
- migration manifests
- old-path-to-Sanity-asset mapping
- prior Vercel environment configuration names
- rollback deployment instructions

Never store secret values in this directory.

## 12. Known current caveats

- `vercel.json` currently ignores branch deployments outside `main`, `dev`, and `staging`; `feat/sanity` previews require a configuration change.
- Production content is network-dependent, so a failed old-CMS response can produce an incomplete baseline. Capture errors must be rerun, not accepted as empty content.
- In optional screenshot mode, animations and viewport-triggered content are activated by scrolling before capture.
- Optional screenshots are capped at 30,000 CSS pixels; the report marks a capture as truncated if a page exceeds this height.
- Dynamic route inventory can change while publishing remains active.
