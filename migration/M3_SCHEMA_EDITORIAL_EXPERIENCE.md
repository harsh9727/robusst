# Milestone 3 — Schema and Editorial Experience

## Status

The fixed-schema foundation is implemented and validated locally against Sanity project `6q5phwee` and the `development` dataset. Staging must be redeployed to receive these schema changes.

## Editorial guarantees

- Pages are fixed document types, not a free-form page builder.
- Every active frontend section has a named top-level field in its corresponding page document.
- Editors cannot reorder, add, or replace page sections.
- Visual variants are limited to frontend-supported enums.
- Section arrays are bounded to reduce layout-breaking content volume.
- Fixed page and site-setting documents are protected from delete/duplicate actions.
- Duplicate page documents for the same language are rejected by validation.
- Internal links, HTTPS external links, email/phone links, and downloads use controlled fields.
- Images require purpose-specific alt text and support hotspot/crop, caption, and credit.
- Generated translations carry explicit source/generated/reviewed workflow status.

## Localized documents

Document-level localization is configured for:

- `siteSettings`
- 18 fixed page document types
- `blogPost`
- `jobPosting`
- `successStory`

Languages:

- English (`en`)
- French (`fr`)
- Russian (`ru`)
- Portuguese (`pt`)
- Spanish (`es`)
- Arabic (`ar`)

Translations are linked through `@sanity/document-internationalization`. Portuguese is standardized as `pt`.

## Fixed page documents

1. `homePage`
2. `aboutPage`
3. `blogIndexPage`
4. `careersPage`
5. `contactPage`
6. `partnershipPage`
7. `platformsPage`
8. `pocWaitlistPage`
9. `solutionsPage`
10. `aiCallCenterPage`
11. `brandedCallingPage`
12. `customerDataPlatformPage`
13. `customizedSolutionsPage`
14. `cybersecurityPage`
15. `intelligentNocPage`
16. `networkMonetizationPage`
17. `stsDmsPage`
18. `storiesPage`

Each page exposes only its active sections identified by the M1 reachability audit. Previously commented/dead sections remain excluded.

## Collection documents

### Blog posts

`blogPost` supports:

- preserved production slug
- title and excerpt
- cover image and localized alt text
- publication/editorial-update dates
- author metadata
- categories
- unrestricted rich Portable Text body
- related posts
- complete SEO/social fields
- translation workflow

### Jobs

`jobPosting` preserves `/careers/roles/[id]` through `legacyId` and includes overview, responsibilities, requirements, application channels, employment/workplace type, dates, open/closed state, SEO, and localization.

### Success stories

`successStory` includes customer identity/logo, hero media, challenge, solution, outcomes/statistics, full story content, SEO, and localization. The current listing/dialog route remains unchanged.

## Rich Portable Text

The `portableText` type supports:

- paragraphs and headings H1–H6
- blockquotes
- numbered and bulleted lists
- strong, emphasis, underline, strike, and inline code
- controlled text tones
- internal/external links and accessibility labels
- hotspot images with alt/caption/credit
- image galleries
- HTTPS embeds
- accessible tables
- callouts
- CTAs
- code blocks

Raw HTML is intentionally excluded because it could break the UI or introduce unsafe markup. All supported blocks require explicit frontend renderers before cutover.

## Shared objects

- `contentImage`
- `contentFile`
- `contentLink`
- `callToAction`
- `externalVideo`
- `statistic`
- `faqItem`
- `contentCard`
- `logoItem`
- `seo`
- `translationWorkflow`
- `fixedSection`
- `formCopy`
- `portableText`

## Studio experience

- Content is grouped into Site Settings, Pages, Blog Posts, Job Postings, and Success Stories.
- Fixed pages are listed by translation and cannot be created from the global “new document” menu.
- Content, SEO, and translation workflow use separate document groups.
- Large fixed sections are collapsible.
- Presentation locations resolve all existing locale-prefixed routes.
- Site settings are identified as global content.
- Preview cards show title, language, workflow/customer/department, and media where applicable.
- Structure, Presentation, Vision, and localization tools remain enabled.

## Validation

Implemented validation includes:

- required languages and translation workflow
- one fixed page/site-settings document per language
- unique blog/story slugs per language
- unique job legacy IDs per language
- SEO title/description limits
- required image alt text
- HTTPS external destinations and embeds
- bounded section arrays
- required Portable Text article/job/story fields
- constrained controlled visual/link values

## Verification

- [x] 78 extracted Sanity schema types, including fixed language-switcher, bounded content-group, and localized select-option schemas
- [x] all expected document/object types present
- [x] schema extraction passes
- [x] TypeScript typecheck passes
- [x] ESLint passes for Studio/schema code
- [x] empty development dataset validates with zero schema errors
- [x] local embedded Studio compiles and returns HTTP 200
- [x] document locations cover fixed and dynamic frontend routes
- [ ] staging redeployed with M3 schema
- [ ] M4 frontend renderers implemented for every Portable Text block
- [ ] migrated development documents validated against required fields

## Next mapping step

M1 logical destinations are intentionally stable audit IDs. M4/M5 must produce a checked mapping from each manifest ID to these final document/section fields and fail if any active manifest ID is unmapped.
