# Milestone 10 — SEO, discovery, and structured data

Milestone 10 is complete in the development implementation. Production remains untouched.

## Sanity-backed discovery

The following now resolve from typed Sanity content and active document relationships:

- Root metadata defaults, social metadata, icons, and crawler directives
- Localized Organization and WebSite JSON-LD
- Organization offers derived from the eight localized Solutions cards
- Customer entities derived from the 12 localized success stories
- Geographic presence derived from the 23 active Home locations
- Localized About and Contact metadata
- Blog/Article JSON-LD and breadcrumbs
- XML sitemap, including all 90 localized blog routes and active career routes
- Localized not-found content
- Web app manifest, including Sanity-hosted icon and social screenshot
- `/llms.txt`, generated from current English identity, solutions, results, industries, locations, stories, blogs, navigation, social profiles, and contact data

The previous static Organization/FAQ metadata module, static manifest, static `llms.txt`, invalid story-detail sitemap entries, generic local social assets, and forced English About/Contact metadata were removed. Structured-data content is now derived from the same localized Sanity documents rendered by the public site; controlled Schema.org types, URLs, cache policies, colors, and manifest enums remain technical values in code.

## Legacy CMS removal

No public route reads the transitional CMS. The legacy CMS client, Markdown-to-HTML renderer, old API types, legacy webhook events, CMS cache headers, CMS runtime environment validation, and obsolete SEO config were removed. Migration scripts retain explicit source-capture support for guarded production migration; the 90 localized blog sources are frozen in `migration/sanity/blog-source.snapshot.json`.

## Publishing and caching

Sanity webhooks invalidate discovery, sitemap, manifest, layouts, listing pages, dynamic blog routes, jobs, success stories, and fixed-page section tags. Signed Draft Mode and Visual Editing remain available through Presentation.

## Validation

- `migration/sanity/discovery-report.development.json`
- `migration/sanity/blog-report.development.json`

```bash
pnpm sanity:discovery:validate
pnpm sanity:blogs:validate
pnpm sanity:validate
pnpm typecheck
pnpm build
```
