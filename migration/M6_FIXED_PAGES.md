# Milestone 6 — Fixed Page Migration

## Status

Milestone 6 fixed-page migration is complete. Home, About, Contact, Partnership, Platforms, Careers/jobs, POC Waitlist, the Solutions index, all solution detail pages, Stories, and localized success-story collections now resolve from Sanity.

## Completed fixed pages

### Home page

Six localized `homePage` documents and one translation metadata document were created with deterministic IDs:

- `homePage-en`
- `homePage-fr`
- `homePage-ru`
- `homePage-pt`
- `homePage-es`
- `homePage-ar`
- `translation.metadata.homePage`

All 14 fixed Home sections are populated:

1. Hero
2. Trusted By
3. About
4. Solutions
5. Results
6. Success Stories
7. Technology Stack
8. Industries We Serve
9. How We Help
10. Events Coverage
11. Why Choose Us
12. Blogs
13. Global Presence
14. Contact

## Home media cutover

The active Home components no longer import content assets from `public/index.ts`.

Sanity now supplies:

- 4 hero images
- 2 hero videos and posters
- 28 trusted/customer logos
- About image and YouTube metadata
- 8 solution images
- Results image
- 10 success-story images
- 64 technology/tool images
- 8 industry images
- 8 event images

All rendered Home content media resolves from `cdn.sanity.io`. The rendered English and French HTML contains no `/home/*` content paths and no `_next/static/media/hero*` or `_next/static/media/about*` assets.

## Home content cutover

The Home route now uses:

- `homePageQuery`
- `getHomePage(locale)`
- generated `HomePageQueryResult`
- `SanityHomeSection` component types
- cache tag `sanity-homePage-{locale}`

Migrated editorial content includes all headings, descriptions, card copy, statistics labels, solution points, CTAs, accessibility labels, blog-grid UI copy, country names, and media alt text.

The following hardcoded Home values were replaced:

- hero video/image paths and alt text
- About image, video ID/title, play label, and close label
- Results image and alt text
- trusted/customer/event/industry/success-story media registries
- solution destinations and CTA labels
- broken `/success-stories` link
- Calendly URL
- blog-grid heading, view-all, empty-state, and read labels
- `en-US` date formatting on non-English pages

The blog cards still read blog documents from the transitional CMS until M8. Their surrounding Home-section editorial UI is already Sanity-managed.

## French completion

The active French Home source omitted seven complete sections. They were generated from the canonical active English experience and stored as reviewed-pending content:

- Technology Stack
- Trusted By
- Global Presence
- Why Choose Us
- Events Coverage
- Success Stories
- Industries We Serve

Generated source:

- `migration/translations/home.fr.generated.json`

This content is marked `generated`; it is not marked human-reviewed.

## Scripts and report

```bash
pnpm sanity:home:dry
pnpm sanity:home:migrate
pnpm sanity:home:validate
```

Outputs:

- `scripts/migrate-sanity-home.mjs`
- `scripts/validate-sanity-home.mjs`
- `migration/sanity/home-report.development.json`

Validation result:

| Metric                                         | Result |
| ---------------------------------------------- | -----: |
| Home documents                                 |    6/6 |
| Translation references                         |    6/6 |
| Fixed sections per locale                      |  14/14 |
| Local Home/tech-stack asset paths in documents |      0 |
| Sanity document validation errors              |      0 |
| Home report issues                             |      0 |
| TypeScript errors                              |      0 |
| ESLint errors in changed Home/Sanity code      |      0 |
| Production build                               |   Pass |

## Revalidation

The dual webhook route now recognizes all fixed Sanity page document types. A `homePage` mutation purges:

- `sanity-homePage-{locale}`
- `/{locale}` page output

Legacy webhook behavior remains available during the staged migration.

### About page

Six localized `aboutPage` documents and their translation metadata are seeded and connected through `aboutPageQuery`.

All seven fixed sections are complete:

1. Hero
2. Mission
3. Vision
4. Purpose
5. Values
6. What Defines Us
7. Challenges

The active About route and component no longer use `getCmsContent`, `Aboutpage_JsonType`, hardcoded `/about/*` media, or hardcoded `/pics/*` media. Hero, mission, vision, purpose, and office imagery resolve through Sanity assets with localized alt text. Controlled React icon keys remain technical design values in code and Sanity.

Validation:

| Metric                                      | Result |
| ------------------------------------------- | -----: |
| About documents                             |    6/6 |
| Translation references                      |    6/6 |
| Fixed sections per locale                   |    7/7 |
| Local About asset paths in documents/source |      0 |
| About report issues                         |      0 |

Commands and report:

```bash
pnpm sanity:about:dry
pnpm sanity:about:migrate
pnpm sanity:about:validate
```

- `migration/sanity/about-report.development.json`

### Contact page

Six localized `contactPage` documents and translation metadata are seeded. `contactPageQuery` now drives the active banner and complete form. Form responses are stored as protected `formSubmission` documents through `/api/forms`.

CMS-managed form content includes every label, select/search/empty state, submit state, success/error toast, validation message, word-count label, banner image, and alt text. The previously hardcoded form-invalid, country-search, and no-country-results messages are localized in Sanity.

The country taxonomy is stored as 250 localized, stable ISO options per locale. ISO values are locked technical identifiers; visible names remain editable content. Russian content that was incorrectly Spanish and Portuguese content that was incorrectly English were replaced with generated translations in `migration/translations/contact.generated.json`.

Validation:

| Metric                               |  Result |
| ------------------------------------ | ------: |
| Contact documents                    |     6/6 |
| Translation references               |     6/6 |
| Localized country options per locale |     250 |
| Sanity hero assets                   |     6/6 |
| Contact report issues                |       0 |
| Sanity form-submission storage       | Enabled |

Commands and report:

```bash
pnpm sanity:contact:dry
pnpm sanity:contact:migrate
pnpm sanity:contact:validate
```

- `migration/sanity/contact-report.development.json`

### Partnership page

Six localized `partnershipPage` documents and translation metadata are seeded. The active route now uses `partnershipPageQuery` for the banner, two partner-program cards, and complete partner form.

All active hardcoded CTA, option, validation, submission-state, success, and error copy moved to Sanity. Partnership responses are stored as protected `formSubmission` documents. Inactive Team and legacy unused partnership sections remain excluded.

The previous Latin placeholder banner description was intentionally excluded. Metadata is now generated per locale from Sanity with localized canonicals, cross-locale alternates, social metadata, and the Sanity social image.

Validation:

| Metric                          |  Result |
| ------------------------------- | ------: |
| Partnership documents           |     6/6 |
| Translation references          |     6/6 |
| Partner cards per locale        |       2 |
| Partner-type options per locale |       2 |
| Sanity banner assets            |     6/6 |
| Partnership report issues       |       0 |
| Sanity form-submission storage  | Enabled |

Commands and report:

```bash
pnpm sanity:partnership:dry
pnpm sanity:partnership:migrate
pnpm sanity:partnership:validate
```

- `migration/sanity/partnership-report.development.json`

### Platforms page

Six localized `platformsPage` documents and translation metadata are seeded. The active route now queries the banner, CDP, CPM, KYC, NOC, and Why Choose sections from Sanity.

The banner WebM, four product images, localized alt text, module lists, benefit lists, shared list labels, and benefit cards are Sanity-managed. Active components no longer import the `platform` registry from `public/index.ts`.

Static English metadata was replaced by locale-specific Sanity metadata, canonical URLs, hreflang alternates, and social images.

Validation:

| Metric                       | Result |
| ---------------------------- | -----: |
| Platforms documents          |    6/6 |
| Translation references       |    6/6 |
| Platform sections per locale |    4/4 |
| Sanity banner video          |    6/6 |
| Local platform asset imports |      0 |
| Platforms report issues      |      0 |

Commands and report:

```bash
pnpm sanity:platforms:dry
pnpm sanity:platforms:migrate
pnpm sanity:platforms:validate
```

- `migration/sanity/platforms-report.development.json`

### Careers and job pages

Six localized `careersPage` documents, six localized `jobPosting` documents for the active role, and two translation metadata sets are seeded. Both `/[locale]/careers` and `/[locale]/careers/roles/[id]` now query Sanity exclusively.

All active Careers sections are migrated, including the indirectly rendered Life at Robusst carousel. The 15 active Careers images now resolve through Sanity CDN with localized generated alt text. Inactive employee testimonials remain excluded.

Job route IDs are preserved through locked `legacyId` values. Technical employment/workplace values remain controlled enums, while editors manage their localized visible labels. Job overview, responsibilities, and requirements use Portable Text in Studio. Apply actions now open the CMS-managed recruitment email instead of rendering non-functional buttons.

The Contact section uses CMS-managed recruitment addresses and the corrected LinkedIn destination from `siteSettings`, replacing the previous WhatsApp URL displayed as LinkedIn. Careers and role metadata are localized and generated from Sanity.

Validation:

| Metric                             | Result |
| ---------------------------------- | -----: |
| Careers documents                  |    6/6 |
| Active job documents               |    6/6 |
| Careers translation references     |    6/6 |
| Job translation sets               |    1/1 |
| Active Sanity media per locale     |     15 |
| Legacy CMS reads on Careers routes |      0 |
| Careers report issues              |      0 |

Commands and reports:

```bash
pnpm sanity:careers:dry
pnpm sanity:careers:migrate
pnpm sanity:careers:validate
```

- `migration/sanity/careers-report.development.json`
- `migration/translations/careers.generated.json`

Webhook payloads for `jobPosting` should include `legacyId` so a changed role route can be invalidated precisely.

### POC Waitlist

Six localized `pocWaitlistPage` documents and translation metadata are seeded. The banner, CTA, form labels, validation messages, submission states, success/error copy, and localized country taxonomy now come from Sanity. The active banner image resolves through Sanity CDN.

The active Russian payload contained Spanish content. A complete generated Russian replacement is tracked for human review. Static English metadata, country search/empty states, and the hardcoded invalid-form toast were replaced with localized Sanity values.

POC responses are stored as protected `formSubmission` documents through `/api/forms`. Country values use stable ISO codes with localized labels, matching the Contact taxonomy decision.

Validation:

| Metric                     | Result |
| -------------------------- | -----: |
| POC Waitlist documents     |    6/6 |
| Translation references     |    6/6 |
| Country options per locale |    250 |
| Sanity banner assets       |    6/6 |
| Legacy CMS reads           |      0 |
| POC Waitlist report issues |      0 |

Commands and reports:

```bash
pnpm sanity:poc-waitlist:dry
pnpm sanity:poc-waitlist:migrate
pnpm sanity:poc-waitlist:validate
```

- `migration/sanity/poc-waitlist-report.development.json`
- `migration/translations/poc-waitlist.ru.generated.json`

### Solutions index

Six localized `solutionsPage` documents and translation metadata are seeded. The banner and all eight active solution cards now query Sanity exclusively. The banner MP4 and eight card images resolve through Sanity CDN.

Card route order and stable route keys are preserved. The hardcoded English `Read More` action and generic image alt text were replaced with localized Sanity-managed CTA labels, accessibility labels, and generated alt text. The active Russian banner incorrectly contained Spanish and was replaced with generated Russian copy.

Static English metadata was replaced with localized Sanity metadata, canonicals, hreflang alternates, and social images. The Solutions grid no longer performs a second legacy Home CMS request.

Validation:

| Metric                        | Result |
| ----------------------------- | -----: |
| Solutions index documents     |    6/6 |
| Translation references        |    6/6 |
| Cards per locale              |      8 |
| Sanity media per locale       |      9 |
| Legacy CMS reads              |      0 |
| Solutions index report issues |      0 |

Commands and reports:

```bash
pnpm sanity:solutions-index:dry
pnpm sanity:solutions-index:migrate
pnpm sanity:solutions-index:validate
```

- `migration/sanity/solutions-index-report.development.json`
- `migration/translations/solutions-index.generated.json`

### AI Call Center

Six localized `aiCallCenterPage` documents and translation metadata are seeded. All 12 rendered sections now query Sanity, including the video modal, solution-detail dialogs/drawers, statistics, CTAs, and FAQs.

Eleven active media placements per locale resolve through Sanity CDN. Technical icon keys and visual class mappings remain controlled in the typed query/frontend adapter. The YouTube video ID and localized play, close, player-title, detail, and Why It Matters labels are represented explicitly.

The active Arabic payload omitted seven rendered sections. Complete Arabic content for Core Capabilities, Future Automation, Solution Overview, Custom Development, Key Value Proposition, Advanced AI Intelligence, and Enterprise Architecture was generated and tracked for human review. Previously hardcoded English modal labels and local section images were removed from the active components.

Validation:

| Metric                                    | Result |
| ----------------------------------------- | -----: |
| AI Call Center documents                  |    6/6 |
| Translation references                    |    6/6 |
| Rendered sections per locale              |     12 |
| Active Sanity media placements per locale |     11 |
| Arabic missing sections completed         |    7/7 |
| Legacy CMS reads                          |      0 |
| AI Call Center report issues              |      0 |

Commands and reports:

```bash
pnpm sanity:ai-call-center:dry
pnpm sanity:ai-call-center:migrate
pnpm sanity:ai-call-center:validate
```

- `migration/sanity/ai-call-center-report.development.json`
- `migration/translations/ai-call-center.ar.generated.json`

### Branded Calling

Six localized `brandedCallingPage` documents and translation metadata are seeded. All 12 rendered sections, five FAQs, the Branded Calling YouTube modal, and 10 active media placements per locale now resolve from Sanity.

Hardcoded English play/close/player labels and generic local-media alt text were replaced with localized Sanity values. Technical animation, icon, and visual mappings remain in code.

Reports:

- `migration/sanity/branded-calling-report.development.json`
- `migration/translations/branded-calling.generated.json`

### Customer Data Platform

Six localized `customerDataPlatformPage` documents and translation metadata are seeded. All 12 rendered sections, five solution modules, six FAQs, CTAs, statistics, labels, and 16 active media placements per locale now resolve from Sanity.

The migration corrected the English `anxd` typo, replaced an English fragment in the Russian banner, removed English-only heading splitting on translated routes, localized dialog controls, and fixed the module-card indexing defect. The previously missing alt text for `/solutions/cdp/11.webp` is now populated for all locales and remains queued for human review.

Reports:

- `migration/sanity/customer-data-platform-report.development.json`
- `migration/translations/customer-data-platform.generated.json`

### Customized Solutions

Six localized `customizedSolutionsPage` documents and translation metadata are seeded. All eight rendered sections, six FAQs, the active YouTube modal, and 10 active media placements per locale now resolve from Sanity.

The cutover removed generic media text and English-only heading splitting from translated routes. Four commented, inactive sections remain excluded: Data Driven Intelligence, Telecom Brain, End-to-End Integration, and Vision CTA.

Reports:

- `migration/sanity/customized-solutions-report.development.json`
- `migration/translations/customized-solutions.generated.json`

### Cybersecurity

Six localized `cybersecurityPage` documents and translation metadata are seeded. All eight rendered sections, nine solution modules with rich dialog content, six FAQs, and 15 active media placements per locale now resolve from Sanity.

Video controls, module labels, Key Features, Why It Matters, and MDR ecosystem labels are localized through Sanity. Technical module colors, orbit layout, and icon mappings remain controlled in code. Commented imagery and inactive standalone module components remain excluded.

Reports:

- `migration/sanity/cybersecurity-report.development.json`
- `migration/translations/cybersecurity.generated.json`

### Intelligent NOC

Six localized `intelligentNocPage` documents and translation metadata are seeded. All 16 rendered sections, six FAQs, and seven active media placements per locale now resolve from Sanity.

Six active sections missing from the French source were generated and tracked for human review. Technical icon and statistics-gradient mappings remain in code. The unreachable Business Outcomes video modal and unused poster were excluded.

Reports:

- `migration/sanity/intelligent-noc-report.development.json`
- `migration/translations/intelligent-noc.generated.json`
- `migration/translations/intelligent-noc.fr.generated.json`

### Network Monetization

Six localized `networkMonetizationPage` documents and translation metadata are seeded. All nine rendered sections, nine use-case dialogs, six FAQs, the Sanity-hosted WebM banner, and 10 active media placements per locale now resolve from Sanity.

Five active Arabic sections were generated and tracked for review. Video controls, solution labels, and dialog labels are localized through Sanity. Non-rendered use-case imagery and commented standalone components remain excluded, while technical style and icon mappings stay in code.

Reports:

- `migration/sanity/network-monetization-report.development.json`
- `migration/translations/network-monetization.generated.json`
- `migration/translations/network-monetization.ar.generated.json`

### STS/DMS

Six localized `stsDmsPage` documents and translation metadata are seeded. All 12 rendered sections, five solution dialogs, six FAQs, and 12 active media placements per locale now resolve from Sanity.

Seven active Arabic sections were generated and tracked for review. Video controls, dialog labels, metadata, and media accessibility text are localized through Sanity. Technical icon, angle, and visual mappings remain controlled in code; inactive standalone components are excluded.

Reports:

- `migration/sanity/sts-dms-report.development.json`
- `migration/translations/sts-dms.generated.json`
- `migration/translations/sts-dms.ar.generated.json`

### Stories and success stories

Six localized `storiesPage` documents, 72 localized `successStory` documents, 12 story translation sets, and page translation metadata are seeded. Each locale now exposes the complete 12-story collection with 13 active media placements.

Ten stories absent from the French source were generated and tracked for review. Banner copy, CTA text, Read More labels, dialog headings, customer-logo alt text, page SEO, and per-story SEO now resolve from Sanity. Transitional per-story banner images remain excluded because the active UI does not render them.

Reports:

- `migration/sanity/stories-report.development.json`
- `migration/translations/stories.generated.json`
- `migration/translations/success-stories.fr.generated.json`

### Content Lake field compaction

The development dataset had reached 2,234 fields against the 2,000-field plan limit. After an explicit development-only backup, high-cardinality fixed pages were compacted into locked named references to shared `fixedPageSection` documents. This preserves the fixed editorial model while reducing usage to 1,826 fields after STS/DMS and Stories ingestion.

Backups and guarded utilities are stored under `migration/sanity/*-inline-backup.development.json` and `scripts/compact-sanity-*.mjs`. Production remains untouched and still requires `--allow-production`.

Commands:

```bash
pnpm sanity:branded-calling:validate
pnpm sanity:customer-data-platform:validate
pnpm sanity:customized-solutions:validate
pnpm sanity:cybersecurity:validate
pnpm sanity:intelligent-noc:validate
pnpm sanity:network-monetization:validate
pnpm sanity:sts-dms:validate
pnpm sanity:stories:validate
```

## Remaining page order

- [x] Home
- [x] About
- [x] Contact
- [x] Partnership
- [x] Platforms
- [x] Careers and job pages
- [x] POC Waitlist
- [x] Solutions index
- [x] AI Call Center
- [x] Branded Calling
- [x] Customer Data Platform
- [x] Customized Solutions
- [x] Cybersecurity
- [x] Intelligent NOC
- [x] Network Monetization
- [x] STS/DMS
- [x] Stories and success stories

All Milestone 6 fixed routes have completed the same locale, media, query, frontend, validation, and rendered-output process.
