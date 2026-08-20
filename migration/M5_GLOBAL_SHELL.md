# Milestone 5 — Global Shell and Shared Content

## Status

The active global shell is now Sanity-backed in the development dataset and frontend. Header, footer, language switcher, skip link, and go-to-top accessibility label no longer depend on the legacy CMS or active local content assets.

## Migrated documents

- 6 localized `siteSettings` documents
- 1 fixed `languageSettings` document
- 1 `translation.metadata` document linking all site-settings locales

Deterministic document IDs make the migration idempotent:

- `siteSettings-en`
- `siteSettings-fr`
- `siteSettings-ru`
- `siteSettings-pt`
- `siteSettings-es`
- `siteSettings-ar`
- `languageSettings`
- `translation.metadata.siteSettings`

## Migrated content

- primary and dark-background logo references
- favicon and default social image references
- announcement text, action, and route
- primary navigation
- Solutions navigation group
- Resources navigation group
- primary and secondary header CTAs
- mobile menu title and open/close accessibility labels
- footer heading, description, CTA, and hashtag
- quick-link and solution-link headings and links
- LinkedIn, Instagram, and YouTube links and accessibility labels
- copyright
- contact and careers email addresses
- WhatsApp, Calendly, and YouTube destinations
- shared form status messages
- view-all and not-found UI copy
- skip-link, go-to-top, play-video, and close-dialog labels
- localized default SEO/social metadata
- six language names, regions, flags, and switch labels

## Corrections applied

Approved M0 corrections were applied rather than preserving broken visible links:

- `/success-stories` → `/stories`
- `/solutions/cdp` → `/solutions/customer-data-platform`
- `/solutions/cyber-security` → `/solutions/cybersecurity`
- `/solutions/customized` → `/solutions/customized-solutions`
- `/solutions/sales-tracking` → `/solutions/sts-dms`
- `/solutions/voicesync` → `/solutions/ai-call-center`
- POC announcement and primary CTA → `/poc_waitlist`
- visible internal shell links now include the active locale
- LinkedIn points to the public company page rather than the admin-only URL
- default SEO title/description values are localized instead of carrying English to every locale

Technical compatibility aliases remain a routing concern and are not exposed as current CMS destinations.

## Frontend changes

Typed queries:

- `siteSettingsQuery`
- `languageSettingsQuery`

Frontend query functions:

- `getSiteSettings(locale)`
- `getLanguageSettings()`

The following active UI now reads from Sanity:

- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/(default)/layout.tsx`
- `src/components/layout/Header/Header.tsx`
- `src/components/layout/Footer/Footer.tsx`
- `src/components/feature/LanguageSwitcher/LanguageSwitcher.tsx`
- `src/components/common/GoToTop/GoToTop.tsx`
- `src/components/ui/sheet.tsx`

The logo and all six flags resolve from `cdn.sanity.io`. Locale-prefixed links are built from CMS-managed technical route destinations without storing duplicate locale paths.

## Migration and validation

Commands:

```bash
pnpm sanity:global:dry
pnpm sanity:global:migrate
pnpm sanity:global:validate
```

Reports:

- `migration/sanity/global-content-report.development.json`

Development validation result:

| Metric                            | Result |
| --------------------------------- | -----: |
| Site-settings documents           |    6/6 |
| Language options                  |    6/6 |
| Translation references            |    6/6 |
| Legacy visible destinations       |      0 |
| Invalid internal destinations     |      0 |
| Missing logo/social assets        |      0 |
| Sanity document validation errors |      0 |
| Global report issues              |      0 |

## Runtime verification

- production build passes
- `/en` renders the logo from Sanity CDN
- `/ar` renders the logo from Sanity CDN
- old `_next/static/media/logo*` is absent from rendered shell HTML
- English internal shell links are prefixed with `/en`
- Arabic internal shell links are prefixed with `/ar`
- Arabic retains `dir="rtl"`
- English and Arabic skip-link labels are localized from Sanity

## Revalidation

`/api/revalidate` accepted both legacy and Sanity payloads during the transition. After the final public content read was cut over in Milestone 10, legacy payload handling was removed. Sanity payloads use `SANITY_REVALIDATE_SECRET` and purge:

- `sanity-siteSettings-{locale}`
- `sanity-languageSettings`
- affected locale layouts

The route intentionally keeps legacy webhook support until all page/blog reads have cut over.

A Sanity webhook still needs to be configured in the project management UI for staging and production deployment origins. Recommended projection:

```groq
{
  _id,
  _type,
  language,
  "slug": slug.current,
  legacyId
}
```

## Translation workflow

English is marked `source`. The five existing localized shell documents are marked `generated` with a required human-review note. This is deliberate even where active production already contained translated text: language QA remains outstanding until M7.

## Remaining work

- connect shared contact/form fields to all active forms during page migration
- move page-specific YouTube IDs and Calendly usage to page/global references
- use site settings in metadata and JSON-LD generation
- configure the Sanity webhook against staging
- remove old header/footer/common CMS types and code after no remaining imports exist
- rerun responsive and RTL visual parity on staging

The M5 global-shell cutover is complete locally and in the development dataset. Staging requires redeployment of the current branch and webhook configuration.
