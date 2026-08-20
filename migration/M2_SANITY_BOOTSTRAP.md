# Milestone 2 — Sanity Bootstrap

## Provisioned resources

- Organization: `prashant_workspace` (`oOQb6LOdV`)
- Project: `robusst`
- Project ID: `6q5phwee`
- Development dataset: `development` (public)
- Production dataset: `production` (public)
- Previous Sanity project `ffkuk3pe` remains untouched and non-authoritative.

Project IDs and dataset names are public configuration. API tokens and webhook secrets remain server-only and are not recorded here.

## CORS origins

Credentials are allowed for Studio/preview workflows from:

- `http://localhost:3000`
- `https://www.robusst.com`
- `https://staging.robusst.com`
- `https://*.vercel.app`

The Sanity-managed `http://localhost:3333` origin also remains available for standalone Studio development.

## Repository integration

- Embedded Studio: `/studio`
- Studio config: `sanity.config.ts`
- CLI config: `sanity.cli.ts`
- Environment validation: `src/sanity/env.ts` and `src/env.js`
- Content Lake client: `src/sanity/lib/client.ts`
- Schema registry: `src/sanity/schemaTypes/index.ts`
- Structure: `src/sanity/structure.ts`
- Languages: English, French, Russian, Portuguese, Spanish, Arabic
- Localization model: document-level translations using `@sanity/document-internationalization`
- Studio tools: Structure, Presentation, Vision

The temporary `migrationConnectionTest` schema used for M2 lifecycle verification has been removed and replaced by the M3 production schema types.

## Commands

```bash
pnpm sanity:studio
pnpm sanity:schema
pnpm sanity:typegen
pnpm sanity:validate
pnpm sanity:migrate:dry <migration-id>
pnpm sanity:migrate <migration-id>
```

Migration execution remains a deliberate separate command; the non-dry-run command must never be used against production without a reviewed export and manifest.

## Environment

Public variables:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_STUDIO_URL
NEXT_PUBLIC_SANITY_PREVIEW_ORIGIN
```

Server-only variables:

```text
SANITY_API_READ_TOKEN
SANITY_API_WRITE_TOKEN
SANITY_REVALIDATE_SECRET
```

Local development uses the `development` dataset. Production deployment must explicitly set `NEXT_PUBLIC_SANITY_DATASET=production`.

## Verification

- [x] Sanity CLI authenticated
- [x] Organization created
- [x] Project created
- [x] Development and production datasets created
- [x] CORS origins configured
- [x] Embedded `/studio` returns HTTP 200 locally
- [x] Middleware excludes `/studio` from locale rewriting
- [x] Structure, Presentation, Vision, and localization plugins load
- [x] Schema extraction succeeds
- [x] Type generation succeeds
- [x] Dataset validation succeeds
- [x] Temporary draft created in development
- [x] Published test document queried successfully
- [x] Draft and published test documents deleted
- [x] Staging deployment and embedded Studio verified at `https://staging.robusst.com`
- [x] Least-privilege viewer and editor tokens created and configured locally
- [x] Local revalidation secret generated
- [ ] Server-only tokens/secrets configured in Vercel preview/production environments

Tokens are not needed for public published-content reads or Studio authentication. The viewer token is reserved for server-side draft previews; the editor token is reserved for controlled migration writes. Neither is exposed through a `NEXT_PUBLIC_` variable.
