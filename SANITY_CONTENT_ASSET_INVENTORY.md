# Sanity Content and Asset Inventory

## 1. Purpose and status

This is the baseline inventory for removing hardcoded editorial content and local content assets from the Robusst frontend.

It is intentionally based on the application, rendered component surfaces, and `public/` assets. The old CMS model and `robusstwebsite/` structures are not authoritative inputs.

Milestone 1's source audit, rendered-content crawl, reachability graph, provisional fixed-schema mapping, public-file inventory, and technical-exception classification are complete. Asset upload, final schema IDs, generated translations, and cutover QA remain later-milestone work.

## 2. Completed Milestone 1 summary

| Item                                                 | Audited result |
| ---------------------------------------------------- | -------------: |
| Supported locales                                    |              6 |
| App/source entry roots                               |             38 |
| Source modules in graph                              |            499 |
| Reachable source modules                             |            354 |
| Inactive source modules                              |            145 |
| TSX component modules                                |            249 |
| Reachable TSX components                             |            203 |
| Inactive/dead TSX components                         |             46 |
| Content-manifest occurrences                         |         26,569 |
| Active editorial occurrences mapped to Sanity        |         25,846 |
| Controlled technical values                          |            203 |
| Inactive content occurrences excluded                |            158 |
| Active editorial entries without a destination       |              0 |
| Active CMS-fed field paths mapped                    |            314 |
| Rendered fixed/job pages crawled                     |            114 |
| Rendered text segments captured                      |         10,184 |
| Published Markdown posts                             |             15 |
| Public files inventoried with checksums              |            372 |
| Public content assets                                |            354 |
| Active public content assets                         |            279 |
| Inactive duplicate public assets                     |              6 |
| Assets referenced only by dead code                  |              3 |
| Inactive unreferenced public assets                  |             66 |
| Unique referenced/deployed asset identities          |            335 |
| Active referenced/deployed identities                |            332 |
| Missing active local assets                          |              0 |
| Active asset references without a Sanity destination |              0 |
| Concrete technical-exception occurrences             |          9,286 |

Counts are occurrences rather than unique phrases because the manifest retains source location, route, locale, and destination context. Rendered navigation, metadata, and shared content therefore appear once per audited route/locale where necessary.

The earlier 415-literal scan was only a lower-bound heuristic. The earlier 21 “missing” paths came from mixed preliminary snapshots and path heuristics; after excluding non-authoritative snapshot data and correcting route/style false positives, the authoritative active source/rendered audit has zero missing local assets.

## 3. Inventory rules

### Move to Sanity

- visible copy
- accessibility copy
- navigational labels
- form labels, guidance, validation, errors, success messages, and empty states
- email addresses, phone numbers, social URLs, scheduling links, and video IDs
- SEO and social metadata
- editorial JSON-LD values
- images, video, logos, flags, posters, and downloadable files
- image alt text, captions, and credits
- blog content and blog interface copy
- user-facing API response messages
- user-facing labels associated with stable technical values

### Keep in code as technical implementation

- route segments and API paths
- Sanity schema names and GROQ keys
- environment-variable names
- CSS/Tailwind classes and SVG path data
- event names and cache keys
- stable locale codes
- stable form reason values such as `CONTACT`, `POC`, and `PARTNER`
- icon implementation names, while their labels remain editable
- source-code diagnostics that never reach users
- mandatory static domain-verification filenames

Technical exceptions must be documented. A string is not exempt merely because it currently appears in a component.

## 4. Route and content surfaces

### Global application shell

| Surface           | Primary files                                                      | Required Sanity ownership                                                                 |
| ----------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Root metadata     | `src/app/layout.tsx`                                               | default title, description, keywords, author/publisher, OG/Twitter copy and images, icons |
| Locale document   | `src/app/[locale]/layout.tsx`                                      | skip-link copy, locale labels where editorial, organization/site structured data          |
| Header            | `src/components/layout/Header/Header.tsx`                          | logo, announcement, CTAs, navigation, submenu labels/links, accessibility labels          |
| Footer            | `src/components/layout/Footer/Footer.tsx`                          | logo, CTA, hashtag, footer groups, social links and labels                                |
| Language switcher | `src/components/feature/LanguageSwitcher/**`, `src/i18n/config.ts` | display names and flag assets; stable locale codes remain in code                         |
| Common UI         | `src/components/common/**`                                         | read labels, go-to-top label, shared actions                                              |
| Scheduling        | `src/components/feature/CalendlyFormEmbed/**`                      | scheduling URL and loading/accessibility copy                                             |
| Not found         | `src/app/[locale]/not-found.tsx`                                   | title, description, action                                                                |

### Home

Primary route: `src/app/[locale]/(default)/page.tsx`

Components requiring complete content and media mapping:

- `home/Hero`
- `home/TrustedBy`
- `home/About`
- `home/Solutions`
- `home/Results`
- `home/SuccessStories`
- `home/IndustriesWeServe`
- `home/HowWeHelp`
- `home/EventsCoverage`
- `home/WhyChooseUs`
- `home/BlogsGrid`
- `home/OurPresence`
- `home/Contact`
- `home/TechStack` where used by the success-story experience

Hardcoded surfaces include hero media, customer/event logos, industry imagery, result imagery, video IDs, Calendly URL, accessibility labels, blog heading/empty state, and carousel controls.

### About

Primary files:

- `src/app/[locale]/(default)/about/page.tsx`
- `src/app/[locale]/(default)/about/layout.tsx`
- `src/app/[locale]/(default)/about/AboutContent.tsx`

Hardcoded surfaces include page SEO, hero/office imagery, image alt text, and video-related content.

### Contact and POC Waitlist

Primary files:

- `src/app/[locale]/(default)/contact/**`
- `src/app/[locale]/(default)/poc_waitlist/**`
- `src/app/[locale]/(default)/contact/index.ts`
- `src/app/api/gsheet/route.ts`

Required migration surfaces:

- page SEO
- banners and alt text
- all form labels and placeholders
- country-search copy
- field validation copy
- submit/submitting states
- success/error messages
- user-facing API responses

The country dataset and stable submitted payload keys require an explicit decision: country display names are content/localization; country codes and API contract keys are technical data.

### Partnership

Primary files:

- `src/app/[locale]/(default)/partnership/page.tsx`
- `src/components/sections/partnership/**`

Required migration surfaces include page SEO, banner imagery, partner cards, team content where active, form labels, partner-type labels, validation, toast responses, and all CTA/link destinations.

### Platforms

Primary files:

- `src/app/[locale]/(default)/platforms/page.tsx`
- `src/components/sections/platform/**`

Required migration surfaces include SEO, banner video/poster, CDP/CPM/KYC/NOC images, headings, benefits, module labels, and alt text.

### Careers and jobs

Primary files:

- `src/app/[locale]/(default)/careers/**`
- `src/components/sections/careersPage/**`

Required migration surfaces include:

- SEO
- all section copy
- all careers and hiring-process images
- life-at-Robusst gallery
- job documents and role-page labels
- careers email addresses
- WhatsApp links/numbers
- LinkedIn labels/links
- image alt text

Jobs should become localized `jobPosting` documents rather than remaining embedded data.

### Solutions index

Primary files:

- `src/app/[locale]/(default)/solutions/page.tsx`
- `src/components/sections/solutions/**`

Required migration surfaces include SEO, banner video, solution-card image/title/summary/link, and “Read More” copy.

### AI Call Center

Primary files:

- `src/app/[locale]/(default)/solutions/ai-call-center/page.tsx`
- `src/components/sections/aicall/**`

Hardcoded copy/media currently exists in supplemental components as well as prop-driven components. Audit all of:

- Banner
- BusinessProblem
- SolutionOverview
- KeyValueProposition
- CoreCapabilities
- AdvancedAIIntelligence
- EnterpriseArchitecture
- SolutionGrid
- InfrastructureControl
- SecurityCompliance
- EnterpriseSupport
- CustomDevelopment
- IdealUseCases
- FutureAutomation
- FAQSection

Inactive/commented sections must be classified before migration. If they can be re-enabled without redesign, their content should also have a Sanity model or the dead code should be removed.

### Branded Calling

Primary files:

- `src/app/[locale]/(default)/solutions/branded-calling/page.tsx`
- `src/components/sections/brand/**`

Required migration surfaces include SEO, all section images, video ID, play/modal labels, FAQ imagery, benefits, CTA labels/links, and image alt text.

### Customer Data Platform

Primary files:

- `src/app/[locale]/(default)/solutions/customer-data-platform/page.tsx`
- `src/components/sections/cdp/**`

This family contains a high concentration of hardcoded content. The preliminary scan found at least 62 literal candidates. Audit active and currently unused modules, including:

- Banner
- WhyChooseRobusst
- IndustryApplications
- ProvenImpact
- TelecomUseCases
- PersonalizedExperience
- SolutionGrid
- BenefitsUseCases
- AccelerateValue
- KeyFeaturesCapabilities
- CtaSection
- FAQSection
- AIInsightSuite
- DeploymentFlex
- IdentityResolution
- JourneyOrchestrator
- RobustDataHub

All module headings, problem statements, feature lists, “Learn More” labels, module labels, imagery, and alt text must move to Sanity.

### Customized Solutions

Primary files:

- `src/app/[locale]/(default)/solutions/customized-solutions/page.tsx`
- `src/components/sections/customizesolution/**`

Required migration includes SEO, all active section copy/media, video ID, modal labels, request CTA, and supplemental currently hardcoded modules. Commented/inactive modules must be classified.

### Cybersecurity

Primary files:

- `src/app/[locale]/(default)/solutions/cybersecurity/page.tsx`
- `src/components/sections/cybersecurity/**`

The preliminary scan found at least 63 literal candidates. All security module content must be CMS-backed, including EDR, MDR, XDR, MDM, IAM, SIEM, SOAR, CNAPP, and VAPT copy, images, “why it matters” content, video configuration, FAQ content, and SEO.

### Intelligent NOC

Primary files:

- `src/app/[locale]/(default)/solutions/intelligent-noc/page.tsx`
- `src/components/sections/noc/**`

Required migration includes SEO, every section, video IDs and modal copy, icons/presets, all images/alt text, FAQ imagery, and every array item.

### Network Monetization

Primary files:

- `src/app/[locale]/(default)/solutions/network-monetization/page.tsx`
- `src/components/sections/networkmonetization/**`

The preliminary scan found at least 49 literal candidates. Audit all active and inactive modules, videos, images, modal copy, use-case labels, business-impact labels, FAQs, and SEO. The family contains several components that currently reuse placeholder platform imagery; those references must become explicit Sanity fields.

### STS/DMS

Primary files:

- `src/app/[locale]/(default)/solutions/sts-dms/page.tsx`
- `src/components/sections/stsanddms/**`

Required migration includes SEO, all section copy/media, video configuration, solution modules, success stories, reporting/payment/analytics supplemental modules, FAQ imagery, CTA labels, and image alt text.

### Stories

Primary files:

- `src/app/[locale]/(default)/stories/page.tsx`
- `src/components/sections/successStories/**`
- `src/components/sections/storyPage/**`

Required migration includes listing SEO, banner, card/dialog copy, company logos, story banners, challenges, solutions, and all labels. Stories should become independent localized `successStory` documents.

### Blogs

Primary files:

- `src/app/[locale]/(default)/blogs/page.tsx`
- `src/app/[locale]/(default)/blogs/[slug]/page.tsx`
- `src/components/common/BlogCard.tsx`
- `src/components/sections/home/BlogsGrid/BlogsGrid.tsx`
- `src/utils/markdownToHtml.ts`
- `src/styles/markdown-styles.module.css`
- `public/blogs/*.md`

Hardcoded surfaces include:

- listing SEO and structured-data copy
- listing heading and description
- article-count grammar
- empty state
- breadcrumb labels
- reading-time and word-count units
- article CTA strip
- related-articles heading
- card/read labels
- author/publisher defaults
- article-section labels

All 15 Markdown files must become Portable Text documents, after which the Markdown files are removable once parity is confirmed.

## 5. Historical preliminary hardcoded-literal distribution

This table is retained only to explain the original 415-candidate estimate. The generated Milestone 1 manifests supersede it.

| Area                                             | Candidates |
| ------------------------------------------------ | ---------: |
| App routes, API, and selected metadata constants |         65 |
| Global layout components                         |          7 |
| Common components                                |          2 |
| Feature components                               |          3 |
| UI primitives                                    |          3 |
| AI Call sections                                 |         23 |
| Branded Calling sections                         |         13 |
| Careers sections                                 |         14 |
| CDP sections                                     |         62 |
| Customized Solution sections                     |         28 |
| Cybersecurity sections                           |         63 |
| Home sections                                    |         22 |
| Network Monetization sections                    |         49 |
| NOC sections                                     |          3 |
| Partnership sections                             |         12 |
| Platform sections                                |          4 |
| Solutions index sections                         |          2 |
| Story sections                                   |          5 |
| STS/DMS sections                                 |         31 |
| Other scanned files                              |          4 |
| **Total preliminary candidates**                 |    **415** |

## 6. Known centralized hardcoded content

### `src/constants.ts`

Move to Sanity:

- all YouTube video IDs
- YouTube channel URL
- LinkedIn URL
- Instagram URL

Stable keys such as `cyberSecurity` and `networkMonetization` can remain technical identifiers.

### `src/config/index.ts`

Move to Sanity:

- site name
- site description
- public domain/base URL override where editorially appropriate
- default OG image
- social handle and profile links

Deployment base URL remains environment-controlled.

### `src/app/layout.tsx`

Move to Sanity:

- default title and template values
- description
- keyword list
- author, creator, publisher, and category
- OG/Twitter copy and imagery
- icons where client-managed
- editorial verification/settings only where safe

### `src/app/[locale]/metadata.ts`

This entire file is an editorial-content hotspot. Move or derive from Sanity:

- organization description and facts
- areas served
- subject/knowledge list
- customer/member names
- social profiles
- contact information
- offered products and descriptions
- site description and language settings
- all FAQ questions and answers
- breadcrumb labels
- article publisher/author defaults

Structured-data shape remains in code; structured-data content comes from Sanity.

### Page-level metadata files

All `TITLE`, `DESC`, keyword lists, canonical assumptions, OG copy, Twitter copy, and locale alternates in page/layout files require Sanity-backed generation.

### Forms and API responses

Move user-facing messages from:

- `ContactContent.tsx`
- `PocWaitlistContent.tsx`
- `partnership/formsection/FormSection.tsx`
- `src/app/api/gsheet/route.ts`

Server validation remains authoritative. The API may use stable message keys while localized display copy is loaded from Sanity on the frontend.

## 7. Asset inventory

### 7.1 Public directory by area

| Directory               |   Files |         Approximate size |
| ----------------------- | ------: | -----------------------: |
| `public/` root          |      11 |                 0.19 MiB |
| `public/about`          |       5 |                 0.22 MiB |
| `public/blogs`          |      15 |                 0.10 MiB |
| `public/brand`          |       9 |                 0.69 MiB |
| `public/career`         |      17 |                 0.62 MiB |
| `public/flags`          |       6 |       less than 0.01 MiB |
| `public/home`           |      71 |                 5.81 MiB |
| `public/partnership`    |      18 |                 0.68 MiB |
| `public/pics`           |       8 |                 2.48 MiB |
| `public/platform`       |      10 |                 1.82 MiB |
| `public/solutions`      |     109 |                 5.56 MiB |
| `public/successStories` |      21 |                 1.25 MiB |
| `public/techstack`      |      66 |                 0.20 MiB |
| `public/thumbnail`      |       6 |                 0.80 MiB |
| **Total**               | **372** | **approximately 22 MiB** |

### 7.2 Root public files

Classify and migrate/generate as follows:

| File/type                     | Treatment                                                                                 |
| ----------------------------- | ----------------------------------------------------------------------------------------- |
| logo                          | Sanity image setting                                                                      |
| Open Graph image              | Sanity default SEO image                                                                  |
| favicon/app icons             | Sanity site setting with generated metadata/manifest integration                          |
| manifest                      | generate from site settings where practical                                               |
| `llms.txt`                    | generate from Sanity-backed site/blog/page content                                        |
| world topology JSON           | upload as a Sanity file/data asset or replace with a documented application-data strategy |
| domain verification text file | retain required static URL as an infrastructure exception                                 |
| `public/index.ts`             | remove after all imported content assets are Sanity-backed                                |

### 7.3 Asset groups that must be represented in Sanity

- brand identity and logos
- favicon and app icons
- locale flags
- home hero images, posters, and videos
- trusted-company/customer logos
- home about/results imagery
- home solution cards
- success-story logos
- industry images
- “how we help” images/icons
- event images
- technology-stack logos
- About page images and videos
- partnership images and icons
- careers banners, section images, hiring images, and gallery
- platform banners, video, and platform imagery
- every solution-family banner and section image
- all FAQ support images
- all success-story banners and company logos
- thumbnails and video posters
- blog cover/body media
- world-map/topology content data

### 7.4 Known explicit local media hotspots

- `public/index.ts` static import registry
- `Header.tsx` and `Footer.tsx` logo imports
- Home Hero local image/video arrays
- Home TrustedBy, EventsCoverage, SuccessStories, IndustriesWeServe, Results, About, and TechStack
- AboutContent local hero/office images
- Careers local image paths and computed gallery paths
- Platform local banner video and imported platform images
- Partnership local banner
- hardcoded image paths throughout AI Call, Branded Calling, CDP, Customized Solutions, Cybersecurity, Network Monetization, NOC, and STS/DMS
- shared `/pics/contact.webp` and `/successStories/provision.webp` FAQ images
- static SEO/thumbnail references

The asset migration is not complete until code scanning reports zero active content paths/imports.

### 7.5 Largest current media

The largest files require explicit upload and playback/image QA:

- `public/pics/office_video.mp4`
- `public/home/hero/hero-two-video.mp4`
- `public/home/hero/hero-3.webp`
- `public/home/hero/hero-one-video.mp4`
- `public/solutions/network/banner.webm`
- `public/platform/banner/banner.webm`
- `public/pics/ai_video.mp4`
- `public/platform/banner/platformbanner.webp`

## 8. External and link content inventory

Move editable destinations and labels to Sanity:

- Calendly scheduling URL
- YouTube channel and per-page video IDs
- LinkedIn profile/company URLs
- Instagram URL
- Twitter/X URL and handle
- Facebook URL where represented in structured data
- careers email addresses
- contact email address
- WhatsApp phone/link
- all navigation and footer destinations
- all CTA destinations
- external references inside blogs
- author and publisher URLs

Keep API endpoints, PostHog ingestion endpoints, Google API scopes, schema.org vocabulary URLs, and framework service URLs in code unless they are genuinely editorial settings.

## 9. Translation inventory

Every Sanity content field must have complete values for:

- English
- French
- Russian
- Portuguese
- Spanish
- Arabic

Translation coverage includes more than paragraphs:

- navigation and footer
- CTAs and links
- image alt text and captions
- form labels, placeholders, validation, success/error messages
- empty states
- accessibility labels
- page SEO
- FAQ content
- JSON-LD editorial content
- blog listing/article interface copy
- jobs and success stories

Missing content will be generated from approved English canonical copy using a controlled glossary. Generated translations should be marked for later human review without blocking complete migration.

## 10. Machine-readable audit outputs

The repeatable generators are:

```bash
node scripts/capture-rendered-content.mjs --concurrency=4
node scripts/audit-sanity-content.mjs
```

Generated outputs:

- `migration/audit/content-manifest.json`
- `migration/audit/asset-manifest.json`
- `migration/audit/technical-exceptions.json`
- `migration/audit/component-reachability.json`
- `migration/audit/cms-field-map.json`
- `migration/audit/rendered-content.json`
- `migration/audit/locale-completeness.json`

The manifests are migration inputs and are not imported by the runtime application.

### Content manifest fields

- source file
- source line/location
- source value or expression
- rendered route(s)
- active/inactive status
- content category
- Sanity document type
- Sanity field path
- localization requirement
- migration status
- QA status

### Asset manifest fields

- original path
- source usage locations
- active/inactive status
- SHA-256 checksum
- MIME type
- dimensions or duration
- Sanity asset ID
- Sanity CDN URL
- destination document/field references
- alt-text status by locale
- migration status
- QA status

## 11. Audit and migration checklist

### Milestone 1 audit

- [x] trace every route to its rendered component graph
- [x] classify and supersede all 415 preliminary literal candidates
- [x] add metadata and JSON-LD object literals omitted by the preliminary scan
- [x] add interpolated/dynamically composed user-facing strings
- [x] add user-facing API response strings
- [x] add constants, arrays, numeric content, and object-based component copy
- [x] crawl all six rendered locales for data-fed text
- [x] classify active versus dead/commented components
- [x] inventory all 372 public files with checksum, MIME type, dimensions, or duration where applicable
- [x] inventory every rendered external/editorial link
- [x] map every active editorial occurrence and active CMS field to a logical Sanity destination
- [x] document every scanned implementation exception with a concrete reason
- [x] confirm zero missing active local assets
- [x] confirm zero active editorial entries without a Sanity destination

### Later migration milestones

- [ ] finalize logical field paths against implemented Sanity schema names
- [ ] generate missing English source copy where required
- [ ] generate all five non-English translations plus complete Arabic RTL copy
- [ ] upload and verify every active content asset
- [ ] enforce zero active hardcoded content literals in CI
- [ ] enforce zero active local content-asset paths/imports in CI

## 12. Final acceptance condition

This inventory can be marked complete only when every active user-facing source location has one of two outcomes:

1. it is mapped to and rendered from a validated Sanity field, or
2. it is documented as a technical implementation exception with a reason showing why client editing would be unsafe or would change the UI/application contract.

There must be no unclassified active text, link, image, video, file, or editorial metadata value at production cutover.
