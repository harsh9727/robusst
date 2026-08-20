# Milestone 4 — Asset Ingestion

## Development dataset result

All active local content assets identified by M1 have been uploaded to Sanity project `6q5phwee`, dataset `development`.

| Metric | Result |
| --- | ---: |
| Active source paths | 279 |
| Unique active checksums | 278 |
| Uploaded/found Sanity assets | 278 |
| Mapped source paths | 279 |
| Unmapped active paths | 0 |
| Missing remote assets | 0 |
| Failed uploads | 0 |
| Missing localized alt-text records | 1 |
| Inactive byte-identical duplicates excluded | 6 |
| Dead-code assets excluded | 3 |
| Unreferenced inactive assets excluded | 66 |

The single missing alt-text item is `/solutions/cdp/11.webp`, already approved for generated localized alt text.

## Outputs

- `migration/sanity/asset-map.development.json`
- `migration/sanity/asset-report.development.json`
- `scripts/migrate-sanity-assets.mjs`
- `scripts/validate-sanity-assets.mjs`

The mapping records:

- original public paths
- SHA-256 checksum
- Sanity asset ID
- Sanity CDN URL
- image/file type
- MIME type
- byte size
- dimensions or duration where applicable
- upload time
- QA status

## Commands

Dry run:

```bash
node scripts/migrate-sanity-assets.mjs
```

Development upload:

```bash
node scripts/migrate-sanity-assets.mjs --execute
```

Validation:

```bash
node scripts/validate-sanity-assets.mjs
```

Production is deliberately guarded:

```bash
node scripts/migrate-sanity-assets.mjs \
  --dataset=production \
  --execute \
  --allow-production
```

Production upload must wait for final content freeze and reviewed development mapping.

## Idempotency and deduplication

- The uploader groups files by SHA-256 before upload.
- Sanity also deduplicates identical binary assets by content identity.
- Existing mapping entries are checked before execution.
- One active duplicate path shares the same Sanity asset.
- The uploader writes progress after every successful asset, so interrupted runs resume safely.

## Classification

- Active images, logos, flags, videos, files, and topology data were uploaded.
- Runtime `_next/static/media/*` fingerprints were not uploaded as separate assets; they map to source binaries.
- Markdown files are content sources and will be converted to Portable Text rather than uploaded as files.
- `public/index.ts` is source infrastructure and will be removed after frontend cutover.
- Static verification/infrastructure files remain at required paths.

## Remaining M4 integration work

- [x] hash and inventory every public file
- [x] upload all active unique assets to development
- [x] verify every mapped Sanity asset exists
- [x] deduplicate active and inactive duplicates
- [x] produce old-path-to-Sanity mapping
- [x] produce missing/invalid report
- [ ] generate six localized alt values for `/solutions/cdp/11.webp`
- [ ] connect asset references while seeding global/page documents
- [ ] replace frontend public imports and path assumptions during M5/M6/M9
- [ ] generate Sanity-backed manifest and `llms.txt`
- [ ] upload the reviewed mapping to production after content freeze

Asset ingestion is complete for development. Full M4 exit remains tied to the frontend/document cutover because source imports cannot be removed before seeded documents and query integration exist.
