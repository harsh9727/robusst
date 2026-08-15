# Pre-Sanity Production Baseline

## Purpose

This directory records Milestone 0 of `SANITY_MIGRATION_PLAN.md`. It provides the pre-migration route, metadata, link, and network baseline used to detect regressions during the Sanity cutover. Stored screenshots are excluded by owner direction.

## Baseline identity

| Field               | Value                                      |
| ------------------- | ------------------------------------------ |
| Application branch  | `feat/sanity`                              |
| Application Git SHA | `d1d3ca698f1031c1a63a71f4fa27d969687d9cc8` |
| Production origin   | `https://www.robusst.com`                  |
| Locales             | `en`, `fr`, `ru`, `pt`, `es`, `ar`         |
| Desktop viewport    | 1440 × 900, DPR 1                          |
| Mobile viewport     | 390 × 844, DPR 1                           |
| Browser             | installed headless Google Chrome           |
| Baseline state      | pre-Sanity, old CMS still active           |

The repository SHA identifies the frontend being audited. The exact Vercel deployment SHA must be confirmed in Vercel before final parity approval; the public production output currently matches the inspected application architecture but the deployment SHA is not exposed by the page.

No secret values are stored in this baseline. Only environment variable names and public behavior are documented.

## Files

- `routes.json` — fixed routes, discovered dynamic routes, locales, and viewport definitions.
- `report.json` — generated browser audit containing status, final URL, title, metadata, canonicals, hreflang, JSON-LD, headings, links, images, videos, network failures, and content hash.
- `FINDINGS.md` — summarized production behavior, SEO/routing issues, and later decisions.
- `RUNBOOK.md` — reproduction, comparison, freeze, cutover, and rollback instructions.
- `screenshots/` — optional local output supported by the capture tool, but not required for this milestone.

## Route coverage

The baseline covers:

- 18 fixed public page routes in every locale
- 15 currently published blog routes discovered from `/en/blogs`
- the currently linked career role route
- desktop browser audits for every fixed and dynamic route in all locales
- generated routes: robots, sitemap, and `llms.txt`

Desktop and mobile viewport definitions remain recorded for later responsive QA, but screenshots are not a Milestone 0 requirement. Auth, dashboard, and API routes are documented but excluded from public route capture. Their behavior is tested separately because they are not editorial pages.

## Initial production observations

The baseline process has already confirmed:

- `https://www.robusst.com/en` responds with HTTP 200.
- The page emits two JSON-LD blocks.
- The English home capture contains 38 unique rendered links, 72 unique rendered image/alt combinations, and 17 headings at capture time.
- Production navigation frequently uses unprefixed destinations such as `/platforms`, `/contact`, and `/poc_waitlist`; these must be preserved or intentionally corrected with redirect tests.
- The sitemap advertises story detail URLs even though the inspected App Router has no matching story detail route.
- The sitemap omits blog URLs and the POC waitlist.
- Robots rules currently disallow APIs, Next.js internals, login, and dashboard routes.
- One current English home network script request reports a loading failure with an empty browser error string; the full report preserves failures per route for parity review.

These observations are baseline facts, not automatic approval of the behavior. Defects can be corrected during migration only when recorded and tested so they are not mistaken for regressions.

## Visual baseline scope

Stored screenshots are not required by owner direction. The tool retains an opt-in `--screenshots` mode for targeted debugging, and generated images remain Git-ignored. Responsive and RTL parity will be validated against the rendered production site during final QA rather than treated as a Milestone 0 artifact gate.

## Content freeze status

A production content freeze is **not required during schema development**. It is required for the final baseline refresh and production migration run.

Current status: **owner confirmation pending**.

The final freeze must identify:

- freeze start time
- responsible approver
- final old-site baseline capture time
- final migration start time
- allowed emergency changes
- rollback decision owner

## Milestone 0 exit criteria

- [x] Source branch and SHA recorded
- [x] Fixed and currently discoverable dynamic route matrix created
- [x] Desktop/mobile viewport definitions recorded for later QA
- [x] Repeatable browser audit script created
- [x] Stored screenshots excluded by owner direction
- [x] Full production report generated for the complete matrix
- [x] Findings report generated
- [x] Report findings reviewed; recommended correction policy approved
- [ ] Final-cutover content-freeze owner confirmed

Milestone 0 remains in progress until the unchecked items are complete.
