# Sanity Migration Plan

## 1. Purpose

This document defines the milestone-by-milestone plan for migrating the Robusst website to Sanity while keeping the rendered website, URLs, interactions, multilingual behavior, forms, SEO behavior, and deployment behavior functionally equivalent.

The migration is content-only from the client's perspective. Sanity must allow editors to manage all content without allowing accidental changes to the visual system or application logic.

## 2. End goals

The migration is complete only when all of the following are true:

1. The website looks and behaves the same after cutover.
2. Every user-facing text value is sourced from Sanity.
3. Every user-facing image, video, downloadable file, logo, icon asset, and content data asset is stored in or referenced through Sanity.
4. Every editable internal link, external link, email address, telephone number, social URL, Calendly URL, and video URL/ID is sourced from Sanity.
5. Every locale has complete content for English, French, Russian, Portuguese, Spanish, and Arabic.
6. Missing translations are generated during migration instead of leaving blank sections.
7. Arabic continues to render right-to-left correctly.
8. SEO metadata, Open Graph data, structured data, canonical URLs, and sitemap content are CMS-driven where they represent editorial content.
9. Editors can create and publish new blog posts without a code change or Vercel rebuild.
10. Draft preview, validation, image editing, and publishing are reliable for non-technical editors.
11. The old CMS client, credentials, cache tags, webhooks, and runtime dependency are removed.
12. There is a repeatable and auditable migration process rather than manual copy-and-paste.

## 3. Source-of-truth policy

### 3.1 Authoritative sources

The migration will use the following sources, in this order:

1. The current application code, because it defines routes, component behavior, layout, interactions, and hardcoded content.
2. The currently rendered website, captured by route and locale, because it defines the approved visible result.
3. Assets under `public/`, because they contain the media currently shipped with the website.
4. Existing local Markdown blog files, because they contain blog content already shipped in this repository.
5. New content and translations generated and reviewed as part of this migration.

### 3.2 Explicitly non-authoritative source

`robusstwebsite/` and the old CMS structures are **not** a source of truth for:

- Sanity schema design
- required fields
- content completeness
- component-to-content mapping
- localization completeness
- asset mapping
- validation rules
- naming conventions

The new model will be designed from the actual frontend and the desired editor experience. The old CMS must not constrain the Sanity implementation.

### 3.3 What “every hardcoded literal” means

Every content-bearing literal must move to Sanity, including:

- visible headings, paragraphs, labels, badges, captions, and CTA text
- form labels, placeholders, validation messages, success/error messages, and empty states
- accessibility text such as useful `alt`, `aria-label`, and iframe titles
- navigation, announcement, footer, and contact information
- blog listing/article interface copy
- SEO titles, descriptions, keywords, and social metadata
- organization, FAQ, Article, Breadcrumb, and other editorial JSON-LD values
- social links, email addresses, phone numbers, Calendly URLs, and YouTube IDs
- image alt text, captions, credits, and downloadable-file labels

Technical implementation literals should remain in code when exposing them would let an editor break the application. Examples include route segments, GROQ document type names, environment variable names, CSS classes, cache keys, API paths, event names, allowed icon identifiers, and internal error diagnostics. Where such a value has a user-facing label, the label moves to Sanity while the stable technical key remains in code.

## 4. Non-negotiable constraints

- Preserve all existing public URLs unless an approved redirect is added.
- Preserve all working forms and Google Sheets submissions.
- Preserve authentication/dashboard behavior even though it is outside the public content migration.
- Preserve responsive behavior, animations, sliders, dialogs, video playback, and RTL behavior.
- Do not introduce a free-form page builder for fixed marketing pages.
- Do not expose raw Tailwind classes, arbitrary CSS, gradients, or implementation keys to client editors.
- Arrays that already represent content lists may remain reorderable.
- Fixed page sections remain fixed and are edited through clearly labeled section groups.
- Migration scripts must be idempotent and safe to rerun.
- Production cutover occurs only after route, content, asset, and visual parity checks pass.

## 5. Files and systems that must be referenced

### Application and routing

- `src/app/[locale]/(default)/**`
- `src/app/[locale]/layout.tsx`
- `src/app/layout.tsx`
- `src/app/[locale]/metadata.ts`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/proxy.ts`
- `src/i18n/**`

### Components and content surfaces

- `src/components/layout/**`
- `src/components/common/**`
- `src/components/feature/**`
- `src/components/sections/**`
- `src/components/ui/**` where UI primitives contain visible labels

### Current hardcoded settings and assets

- `public/**`
- `public/index.ts`
- `src/constants.ts`
- `src/config/index.ts`
- `src/app/[locale]/(default)/contact/index.ts`
- `src/utils/og-template.tsx`
- `src/utils/markdownToHtml.ts`
- `src/styles/markdown-styles.module.css`

### Runtime integrations that must remain working

- `src/app/api/gsheet/route.ts`
- `src/components/feature/CalendlyFormEmbed/**`
- PostHog and Vercel Analytics configuration
- Google Sheets environment configuration
- CSP and security headers in `next.config.js`
- `vercel.json`
- `src/env.js`

### Existing CMS code to replace and eventually remove

- `src/lib/cms/client.ts`
- `src/app/api/revalidate/route.ts`
- old CMS environment variables
- old CMS cache tags and Vercel CDN invalidation logic

## 6. Proposed Sanity architecture

### 6.1 Studio deployment

Use Sanity Studio from the same repository, initially embedded at `/studio` for a single Vercel deployment and same-origin preview. The content and assets still live in Sanity Content Lake and Sanity's asset CDN, not in Vercel's filesystem.

The Studio route must be excluded from search indexing and must have appropriate CSP/CORS configuration.

### 6.2 Localization

Use document-level localization with Sanity's document internationalization tooling.

Supported languages:

- `en` — English
- `fr` — French
- `ru` — Russian
- `pt` — Portuguese
- `es` — Spanish
- `ar` — Arabic

Each localized document will contain a stable `language` field and translation references. Assets may be shared across translations while alt text and captions remain localizable.

### 6.3 Core document types

#### Global documents

- `siteSettings`
  - company name and identity
  - default logo and alternate logos
  - favicon and app icons
  - default SEO and social sharing image
  - contact details
  - social links
  - Calendly configuration
  - default author/publisher data
  - organization structured-data settings
  - analytics/editorial settings that are safe to expose
- `navigation`
- `footer`
- `commonUiCopy`
- `blogSettings`

#### Fixed localized page documents

- `homePage`
- `aboutPage`
- `contactPage`
- `partnershipPage`
- `platformsPage`
- `careersPage`
- `pocWaitlistPage`
- `solutionsIndexPage`
- `aiCallPage`
- `brandedCallingPage`
- `customerDataPlatformPage`
- `customizedSolutionsPage`
- `cybersecurityPage`
- `intelligentNocPage`
- `networkMonetizationPage`
- `stsDmsPage`
- `storiesPage`

Each page has fixed groups matching the current rendered sections. Editors can modify content but cannot add arbitrary React sections or change the layout system.

#### Collection documents

- `blogPost`
- `author`
- `jobPosting`
- `successStory`

Jobs and success stories should be individual documents instead of nested page arrays so editors can create, publish, unpublish, sort, and preview them independently.

### 6.4 Reusable object types

- `contentImage`
  - Sanity image asset
  - localizable alt text
  - optional caption and credit
  - hotspot and crop
  - decorative-image flag
- `contentVideo`
  - uploaded file or supported external video
  - poster image
  - accessible title
  - autoplay/muted/loop settings constrained to safe presets
- `contentFile`
- `link`
  - stable kind: internal, external, email, phone, anchor
  - label
  - destination/reference
  - new-tab behavior where valid
- `cta`
- `seo`
- `faqItem`
- `metric`
- `portableText`
- controlled icon/presentation preset objects

### 6.5 Rich blog editor

Portable Text will provide the primary blog-authoring experience. It should support:

- normal text and headings
- ordered and unordered lists
- blockquotes
- bold, italic, underline, and code
- external links and internal document links
- inline and block images
- image alt text, caption, and credit
- image galleries
- callouts
- CTA blocks
- YouTube/video embeds
- tables
- code blocks
- separators

The frontend must provide explicit renderers and styles for every permitted block. Unsupported blocks must fail validation rather than silently rendering incorrectly.

## 7. Milestones

## Milestone 0 — Baseline, content freeze, and migration controls

### Work

- Record the current Git SHA and environment assumptions.
- Create a route matrix covering every public route and all six locales.
- Record desktop and mobile viewport definitions; stored baseline screenshots are excluded by owner direction.
- Capture metadata, structured data, status codes, links, and network-dependent behavior.
- Agree on a temporary content-freeze window for final cutover.
- Define migration manifests and report formats.

### Deliverables

- route/locale baseline
- responsive viewport definitions for later side-by-side QA
- link and metadata baseline
- migration runbook

### Exit criteria

Every currently supported route has an expected result that can be compared after migration.

## Milestone 1 — Exhaustive hardcoded-content and asset audit

### Work

- Perform AST-based scanning of TS/TSX files.
- Inventory JSX text, accessibility copy, form copy, toast messages, metadata, JSON-LD, constants, emails, phone numbers, URLs, image paths, video paths, and imported assets.
- Trace every rendered component from route entry points.
- Mark unused/dead components separately so they cannot be confused with active website content.
- Crawl the currently rendered site to capture data-fed text not visible as literals in source.
- Classify every value as:
  - Sanity editorial content
  - controlled technical key with Sanity label
  - non-editorial implementation detail
- Produce a machine-readable content manifest and asset manifest.

### Deliverables

- completed `SANITY_CONTENT_ASSET_INVENTORY.md`
- machine-readable text manifest
- machine-readable asset manifest
- list of technical exceptions with reasons

### Exit criteria

Every active user-facing text or asset has an identified Sanity destination. No active source location remains unclassified.

## Milestone 2 — Sanity project and repository bootstrap

### Work

- Create or connect the Sanity project.
- Create non-production and production datasets.
- Install current Next.js-compatible Sanity packages through pnpm.
- Configure `sanity.config.ts`, `sanity.cli.ts`, Studio route, dataset variables, and CORS origins.
- Add Desk Structure, Vision, Presentation Tool, and localization support.
- Add environment validation without exposing write tokens to the browser.
- Add scripts for Studio, schema extraction, TypeGen, validation, migration dry-run, and migration execution.

### Deliverables

- working `/studio`
- authenticated project connection
- development dataset
- environment-variable documentation

### Exit criteria

Studio loads locally and in a protected preview deployment, and a test document can be drafted, previewed, published, queried, and deleted.

## Milestone 3 — Schema and editorial-experience implementation

### Work

- Implement global, page, collection, object, media, SEO, and Portable Text schemas.
- Add document and field validation.
- Add singleton protections.
- Add language-aware initial values and translation connections.
- Group large pages into collapsible section groups.
- Add meaningful previews for cards, jobs, stories, and blog posts.
- Hide or lock technical design keys.
- Add controlled options for icons and presentation variants where required by current components.
- Add document locations for visual preview.

### Deliverables

- complete schema
- editor navigation structure
- TypeGen schema extraction
- schema validation report

### Exit criteria

Every item in the content/asset inventory has a schema field or a documented technical exception.

## Milestone 4 — Asset ingestion and media replacement

### Work

- Hash and inventory every file under `public/`.
- Upload all content-bearing images, videos, icons, logos, flags, downloadable files, and data assets to Sanity.
- Deduplicate identical files.
- Record original path, checksum, Sanity asset ID, MIME type, dimensions/duration, and usage locations.
- Create media records with proper alt text and captions.
- Replace path-based assumptions with Sanity image/file references.
- Move hero posters, videos, OG images, favicon/app icons, customer logos, event imagery, careers imagery, solution imagery, blog media, and world-map data.
- Generate Sanity-based replacements for `manifest`, `llms.txt`, and other editorial public files where appropriate.
- Keep mandatory domain-verification files at their required static paths, while documenting them as infrastructure exceptions.

### Deliverables

- idempotent asset uploader
- old-path-to-Sanity-asset manifest
- missing/invalid media report
- uploaded media library

### Exit criteria

Every active asset resolves from Sanity/CDN, no component imports content media from `public/index.ts`, and no active content image/video path is hardcoded.

## Milestone 5 — Global shell and shared content migration

### Work

Migrate and connect:

- logo and brand identity
- announcement bar
- desktop/mobile navigation
- navigation submenus
- header CTAs
- language labels and flags
- footer CTA and hashtag
- footer links
- social links and accessibility labels
- contact details
- common buttons and empty states
- Calendly URL
- YouTube IDs
- shared FAQ imagery
- common form copy

### Deliverables

- Sanity-driven header/footer/common UI
- global settings queries
- localized shared copy

### Exit criteria

Changing any global user-facing text, link, or asset in Studio updates the relevant frontend without a code change.

## Milestone 6 — Fixed page content migration

### Work

Migrate pages one at a time while preserving their current component hierarchy:

1. Home
2. About
3. Contact
4. Partnership
5. Platforms
6. Careers and job pages
7. POC Waitlist
8. Solutions index
9. AI Call Center
10. Branded Calling
11. Customer Data Platform
12. Customized Solutions
13. Cybersecurity
14. Intelligent NOC
15. Network Monetization
16. STS/DMS
17. Stories and success stories

For each page:

- map every active section
- migrate all text, alt text, links, images, videos, labels, and modal copy
- replace hardcoded supplemental sections as well as existing prop-driven sections
- preserve list ordering and stable item identifiers
- add English canonical content where content is missing
- verify desktop/mobile/RTL rendering

### Deliverables

- page migration mapping
- seeded localized page documents
- page parity reports

### Exit criteria

Every active page component receives all editorial values from Sanity and has no user-facing fallback literal in source.

## Milestone 7 — Translation completion

### Work

- Establish English as the canonical writing source for generated translations.
- Create a product and terminology glossary for names that must not be translated.
- Generate complete French, Russian, Portuguese, Spanish, and Arabic content for every document.
- Generate translated alt text, metadata, form messages, accessibility labels, and structured-data content.
- Preserve URLs and product names where translation would break routing or branding.
- Validate Arabic punctuation, directionality, number presentation, and mixed Latin product names.
- Store translation status such as `generated`, `reviewed`, and `approved`.
- Apply English fallback only as a runtime safety net, not as the normal published result.

### Deliverables

- six complete locales
- glossary
- translation completeness report
- RTL QA report

### Exit criteria

No published locale has a missing required field or hidden section due to absent content.

## Milestone 8 — Blog migration and authoring experience

**Status: complete in the development dataset.** See `migration/M8_BLOGS.md` and `migration/sanity/blog-report.development.json`.

### Work

- Convert every local Markdown blog to Portable Text.
- Preserve titles, slugs, excerpts, dates, authors, tags, links, and SEO fields.
- Upload and connect cover/body images.
- Implement all Portable Text serializers.
- Add blog settings and localized listing/article UI copy.
- Add draft preview and visual editing.
- Change blog routing so new published slugs work without a rebuild.
- Add author, related-post, reading-time, word-count, and structured-data support.
- Ensure unsupported or malformed content fails validation.

### Deliverables

- migrated blog documents
- Portable Text editor
- Portable Text frontend renderer
- publish-without-redeploy test

### Exit criteria

A client editor can create a draft containing alternating text and images, preview it, publish it, and access it immediately at its public URL.

## Milestone 9 — Frontend query and media integration

**Status: complete in the development implementation.** Typed Sanity queries serve every public content route; the legacy client, API types, runtime environment values, cache headers, and webhook events are removed.

### Work

- Implement the Sanity client and typed GROQ queries with `defineQuery`.
- Generate query result types with Sanity TypeGen.
- Add a shared Sanity image component supporting crop, hotspot, dimensions, responsive sizes, and alt text.
- Add a shared Sanity file/video resolver.
- Replace the old CMS client in every page and layout.
- Implement locale/document fallback guards.
- Keep forms and other non-content APIs unchanged.
- Update CSP, image configuration, and CORS configuration.

### Deliverables

- typed Sanity query layer
- shared media renderers
- old/new parity adapter where temporarily needed

### Exit criteria

No public route performs a request to the old CMS, and all production content queries are typed and validated.

## Milestone 10 — SEO, discovery, and structured data

**Status: complete in the development implementation.** Metadata, structured data, sitemap, localized not-found handling, manifest, and `llms.txt` now resolve from Sanity-backed discovery data. See `migration/M10_SEO_DISCOVERY.md`.

### Work

- Add localized SEO objects to every page and post.
- Generate metadata dynamically by locale.
- Generate correct canonicals and complete hreflang sets.
- Source OG/Twitter images from Sanity.
- Generate organization data from site settings.
- Generate FAQ schema from the same FAQ content rendered on the page.
- Generate Article and Breadcrumb schema from Sanity documents.
- Fix sitemap coverage for pages, blog posts, jobs, and success stories.
- Remove sitemap URLs that have no actual route.
- Generate `llms.txt`, robots rules, and manifest content from the appropriate settings where practical.

### Deliverables

- metadata query layer
- structured-data generators
- corrected sitemap and robots behavior

### Exit criteria

SEO parity tests pass for every route and locale, and no locale incorrectly emits English-only canonical or language metadata.

## Milestone 11 — Draft preview, publishing, and cache invalidation

### Work

- Add protected Draft Mode enable/disable routes.
- Configure Presentation Tool and click-to-edit overlays.
- Configure the current supported `next-sanity` live/revalidation approach for Next.js 16.
- Ensure published edits appear without full Vercel deployments.
- Ensure new blog/job/story routes become available immediately.
- Remove old CMS webhook payloads and Vercel cache-tag assumptions.
- Test preview and published perspectives independently.

### Deliverables

- protected visual preview
- reliable publish/update/unpublish behavior
- cache behavior documentation

### Exit criteria

Drafts are visible only in authenticated preview, while published changes appear publicly within the agreed update window.

## Milestone 12 — Automated validation and parity QA

### Work

- Validate all Sanity documents against schema.
- Assert all required locales and translation links exist.
- Assert every referenced asset exists and has required metadata.
- Assert no active user-facing hardcoded text remains in TS/TSX.
- Assert no active content asset imports or paths remain.
- Crawl all routes and verify status codes and internal links.
- Test desktop, tablet, mobile, and Arabic RTL layouts.
- Test forms, Calendly, videos, sliders, dialogs, language switching, jobs, stories, blog publishing, and not-found behavior.
- Compare the candidate and approved production reference side by side during responsive/RTL QA; screenshots may be generated transiently for automation but are not retained as Milestone 0 artifacts.
- Run formatting, lint, typecheck, production build, and schema/type generation.

### Required automated gates

- hardcoded-content scanner
- hardcoded-asset scanner
- locale completeness validator
- broken-reference validator
- route/link crawler
- side-by-side visual-regression comparison against the approved production reference
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- Sanity schema/document validation

### Exit criteria

All gates pass, and every visual difference is either corrected or explicitly approved.

## Milestone 13 — Production cutover and cleanup

### Work

- Freeze content for the final migration run.
- Rerun the idempotent migration against production.
- Validate counts, translations, assets, and routes.
- switch production environment variables to Sanity
- deploy the complete branch once
- run production smoke tests
- remove old CMS code, variables, retry logic, webhook code, and cache headers
- remove local content media only after confirming no runtime references remain
- retain migration manifests and export backups
- update Vercel branch rules if a `feat/sanity` preview is required

### Deliverables

- production deployment
- final migration report
- rollback package
- cleanup commit

### Exit criteria

Production runs exclusively on Sanity, the old CMS can be disabled without affecting the website, and rollback has been tested or clearly documented.

## Milestone 14 — Client handover

### Work

- Invite client editors with least-privilege roles.
- Document page editing, translation editing, image management, blog authoring, preview, publishing, and unpublishing.
- Explain fields that are intentionally locked because they control UI behavior.
- Record a content-editor walkthrough.
- Document backup/export and emergency rollback procedures.

### Deliverables

- editor guide
- technical runbook
- access/role matrix
- recorded walkthrough

### Exit criteria

A non-technical editor can independently update every content type and publish a complete blog post.

## 8. Migration tooling requirements

The migration tooling must:

- support dry-run mode
- be idempotent
- use deterministic document IDs and array `_key` values
- hash and deduplicate assets
- emit machine-readable reports
- never log tokens or secrets
- stop on required-content or required-asset failures
- preserve source-to-destination mappings
- support a non-production dataset before production
- create translation metadata deterministically
- validate after writes
- allow safe reruns after partial failure

## 9. Content validation rules

At minimum:

- required page titles and primary headings
- required locale and translation relationships
- unique stable slugs/IDs where routing depends on them
- valid internal/external/email/telephone links
- images require assets and meaningful alt text unless explicitly decorative
- videos require accessible titles and poster images where currently expected
- SEO titles and descriptions have sensible length guidance
- no arbitrary scripts or unsafe HTML in Portable Text
- Portable Text external links use safe protocols
- forms retain required validation copy
- no raw CSS or arbitrary class names editable by clients

## 10. Risks and mitigations

| Risk                                     | Mitigation                                                                                                |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Hidden hardcoded copy is missed          | AST scan, rendered-site crawl, route tracing, and CI hardcoded-content gate                               |
| Dead code is mistaken for active content | Build a route-to-component reachability map and classify inactive components separately                   |
| Visual regressions from new image URLs   | Shared Sanity image renderer, source dimension preservation, hotspot/crop defaults, screenshot comparison |
| Missing translations                     | Generate all locales, validate completeness, retain English runtime fallback only for emergencies         |
| Poor generated translation quality       | Terminology glossary, preserve product names, locale-specific QA, translation status fields               |
| New blog routes 404                      | Enable dynamic/on-demand route generation and test publishing without rebuild                             |
| Editors accidentally alter UI            | Fixed page schemas, locked technical fields, controlled presets, no free-form page builder                |
| Asset duplication                        | Hash-based upload manifest and shared Sanity asset references                                             |
| Cache updates are delayed                | Supported Next.js 16/Sanity invalidation strategy and publish/update tests                                |
| SEO changes unintentionally              | Baseline metadata capture and per-route metadata parity tests                                             |
| Forms break during content refactor      | Keep submission API contracts unchanged and run end-to-end form tests                                     |
| Feature branch cannot preview on Vercel  | Update `vercel.json` branch ignore behavior before preview QA                                             |

## 11. Definition of done

The migration is done only when:

- [ ] every active route works in all six locales
- [ ] every visible content value is editable in Sanity
- [ ] every active content asset is served from Sanity
- [ ] all missing translations have been generated and populated
- [ ] no required field is blank in a published locale
- [ ] no active user-facing text fallback remains hardcoded
- [ ] no active local content-media import/path remains
- [ ] blog authors can freely compose text and media
- [ ] new posts publish without a deployment
- [ ] all forms and external integrations work
- [ ] SEO, sitemap, hreflang, and structured data pass validation
- [ ] desktop/mobile/RTL visual parity is approved
- [ ] lint, typecheck, build, schema validation, and migration validation pass
- [ ] old CMS runtime dependencies and secrets are removed
- [ ] client documentation and access are complete
