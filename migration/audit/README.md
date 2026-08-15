# Milestone 1 — Content and Asset Audit

## Status

Milestone 1 audit generation is complete. No application runtime code was changed.

The audit uses only:

- active frontend source
- App Router entry points
- the rendered production website
- `public/` files
- published Markdown posts

`robusstwebsite/` and old CMS schema/data are not inputs.

## Reproduce

```bash
node scripts/capture-rendered-content.mjs --concurrency=4
node scripts/audit-sanity-content.mjs
```

Then validate:

```bash
pnpm exec eslint \
  scripts/capture-rendered-content.mjs \
  scripts/audit-sanity-content.mjs
pnpm typecheck
```

The rendered crawl uses server-rendered HTML and does not create screenshots.

## Outputs

| File                          | Purpose                                                                                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `content-manifest.json`       | Source, rendered, Markdown, link, SEO, accessibility, form, API-message, and numeric editorial occurrences with logical Sanity destinations |
| `asset-manifest.json`         | Every public file, every active/dead asset reference, checksums, MIME types, dimensions/durations, alt status, and migration classification |
| `technical-exceptions.json`   | Concrete implementation literals with source locations and reasons                                                                          |
| `component-reachability.json` | Route-root import graph and active/dead module classification                                                                               |
| `cms-field-map.json`          | Active data/CMS property paths mapped to fixed-schema Sanity document and field paths                                                       |
| `rendered-content.json`       | Visible production text crawl for fixed pages and the active job route in all six locales                                                   |
| `locale-completeness.json`    | Exact-English carryover heuristic for non-English rendered pages                                                                            |
| `blog-route-map.json`         | Fifteen Markdown sources mapped to the fifteen production slugs and all localized routes                                                    |

Logical destinations are schema inputs. Milestone 3 can normalize field names, but every manifest ID must retain a destination mapping so content cannot disappear during schema refinement.

## Results

### Content

- 26,569 classified content-manifest occurrences
- 25,846 active editorial occurrences mapped to Sanity
- 203 controlled technical values
- 158 inactive content occurrences excluded unless their components are reactivated
- zero active editorial occurrences without a destination
- 314 active CMS/data field paths mapped to fixed-document destinations
- 15/15 Markdown posts matched to production slugs

Occurrence counts intentionally include route/locale context and are not unique phrase counts.

### Reachability

- 499 source modules
- 354 reachable modules
- 145 unreachable modules
- 249 TSX component modules
- 203 reachable TSX components
- 46 inactive/dead TSX components

Inactive component groups:

| Group                                      | Components |
| ------------------------------------------ | ---------: |
| Network Monetization supplemental sections |         12 |
| Cybersecurity supplemental modules         |          9 |
| STS/DMS supplemental sections              |          7 |
| Unused UI primitives                       |          7 |
| CDP supplemental sections                  |          5 |
| AI Call supplemental sections              |          3 |
| Page loader                                |          1 |
| Partnership team                           |          1 |
| Story detail banner                        |          1 |

The commented AI Call, Network Monetization, and STS/DMS sections are correctly unreachable. They are not migration inputs unless product scope explicitly reactivates them.

### Assets

- all 372 public files inventoried
- all files have SHA-256, byte size, and MIME type
- images include dimensions where decodable
- audio/video files include duration where `ffprobe` can read it
- 354 public content assets
- 279 active public content assets
- 6 inactive byte-for-byte duplicates
- 3 assets referenced only by dead components
- 66 inactive unreferenced assets
- zero missing active local assets
- zero active asset references without a logical Sanity destination
- one rendered asset with missing alt text in all locales: `/solutions/cdp/11.webp`

Fifty-three production `_next/static/media/*` identities are captured as deployed build assets. They are runtime fingerprints of source-imported public assets, not 53 additional files to upload.

### Rendered content and localization

- 114 fixed/job route-locale pages crawled successfully
- 10,184 unique visible text segments retained by page
- all 95 non-English page comparisons contain at least one exact English carryover
- 726 exact-English carryover occurrences require translation review

The carryover check is heuristic. Product names and technical terms can remain unchanged, while labels such as “Skip to main content”, “Learn More”, form labels, country names, and entire fallback sections require generated localization.

## Classification policy

### Migrate to Sanity

- active editorial text and numeric content
- links, email addresses, phone numbers, social profiles, and video IDs
- titles, descriptions, metadata, and structured-data editorial values
- accessibility and form copy
- API messages shown to users
- active media and alt text
- Markdown frontmatter/body/links converted to Portable Text
- rendered CMS-fed content represented by the CMS field map

### Keep controlled code values

Stable locale codes, form reason values, data discriminators, and similar contract keys stay in code. Their visible labels move to Sanity.

### Keep implementation details in code

Imports, API paths, environment names, CSS classes, SVG geometry, MIME types, framework directives, methods, schema keys, event keys, and layout/timing numbers are concrete exceptions recorded in `technical-exceptions.json`.

### Exclude inactive material

Dead components and their unique assets are excluded unless deliberately reactivated. Unreferenced public assets are excluded from the active Sanity dataset; six byte-identical duplicates point to their active equivalent. This prevents obsolete material from cluttering Studio without deleting source files during the audit.

## Known follow-up work

- Implement exact schemas and preserve manifest-to-final-field mappings.
- Generate English canonical copy where rendered/source content is incomplete or conflicting.
- Generate and mark translations for review.
- Upload active assets and populate Sanity IDs/CDN URLs in the asset manifest.
- Supply localized alt text for `/solutions/cdp/11.webp`.
- Add CI scanners that require zero active hardcoded editorial values and local content assets after cutover.
- Before final migration, confirm whether any currently inactive component or unreferenced asset should be revived. The default is exclusion.
