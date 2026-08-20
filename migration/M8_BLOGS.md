# Milestone 8 — Blogs and Portable Text

Milestone 8 is complete in the `development` dataset. Production remains untouched.

## Migrated content

- Six localized `blogIndexPage` documents
- Thirty referenced fixed listing/UI sections
- Ninety localized `blogPost` documents representing 15 stable production slugs in six languages
- One blog-index translation set and 15 blog-post translation sets
- 2,329 Portable Text blocks
- 144 body links, with zero wrong-locale internal links

Production slugs come from `migration/audit/blog-route-map.json`. Article bodies and active localized metadata were captured from the active transitional source, reconciled with the 15 audited Markdown files, and converted to Portable Text. Active CMS publication and editorial-update timestamps were preserved because they represent current rendered production behavior.

The current 15 bodies contain no inline image nodes. The Portable Text schema and frontend renderer support CMS-managed inline images, galleries, tables, callouts, embeds, CTAs, and code blocks for future authoring. Covers, author images, social images, alt text, related posts, SEO, reading metrics, structured data, and localized links are handled through Sanity or deterministic rendering logic.

## Frontend cutover

The following now read from typed Sanity GROQ queries:

- `/[locale]/blogs`
- `/[locale]/blogs/[slug]`
- Home page latest-blog grid

The routes preserve static generation, five-minute ISR, stable paths, related-post behavior, localized date/number formatting, metadata, canonicals, hreflang, Article/Blog JSON-LD, breadcrumbs, CTA styling, and Arabic RTL. Dynamic blog params remain enabled so a newly published slug can render and cache on its first request without a rebuild. Presentation now enables signed Sanity Draft Mode, draft-aware uncached blog queries, stega encoding, and Visual Editing overlays.

## Editorial workflow

English posts are marked `source`. Migrated non-English posts and generated listing/article UI copy are marked `generated` pending human review. Review scope is tracked in:

- `migration/translations/blogs.generated.json`

## Validation

Current development validation covers 798 content documents with zero errors. Type generation finds 25 typed GROQ queries across 20 files while retaining 80 schema types. Production build and localized runtime checks pass.

Report:

- `migration/sanity/blog-report.development.json`

Commands:

```bash
pnpm sanity:blogs:dry
pnpm sanity:blogs:migrate
pnpm sanity:blogs:validate
```

Production execution requires both `--dataset=production` and `--allow-production`, plus the reviewed production asset map and content-freeze approval.
