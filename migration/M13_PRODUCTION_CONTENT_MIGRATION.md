# Milestone 13 — Production content migration

The approved, frozen content set has been migrated to Sanity project `6q5phwee`, dataset `production`. The owner explicitly approved the content/translations and content-freeze window, and waived pre-migration backup and rollback documentation.

## Production dataset

- 798 published content documents
- 278 Sanity image/file assets mapping all 279 active audited public paths
- Six complete locales: English, French, Russian, Portuguese, Spanish, and Arabic
- Zero drafts
- Zero missing references
- Zero schema validation errors
- Exact 1,076-document ID parity with the development dataset, including assets
- 90 localized blog documents representing 15 stable slugs
- 72 localized success-story documents
- Six localized job documents preserving `/careers/roles/1`
- 2,329 Portable Text blog blocks

Every idempotent content migration was executed with both `--dataset=production` and `--allow-production`. All page-specific production validators report zero issues. Reports are stored as `migration/sanity/*-report.production.json`; the consolidated result is `migration/sanity/production-content-report.json`.

## Production-dataset application verification

The application was rebuilt locally with `NEXT_PUBLIC_SANITY_DATASET=production` and passed:

- 204/204 localized route checks with HTTP 200
- 227 internal links with zero failures
- 8,273 observed production Sanity CDN references
- Zero development-dataset CDN references
- Zero Arabic RTL failures
- HTTP 200 for sitemap, `llms.txt`, and manifest
- Form API validation response without creating test data
- Production TypeScript, ESLint, TypeGen, and Next.js build

## Webhook

A production-only document webhook is configured with the approved projection, published-document filtering, and the production revalidation endpoint. It is intentionally disabled until the migrated application code and matching `SANITY_REVALIDATE_SECRET` are deployed to `www.robusst.com`; enabling it before deployment would target the previous production handler.

After deployment, enable **Robusst production revalidation** in Sanity project management and perform one published edit smoke test.

## Remaining deployment actions

Content migration is complete. Application deployment still requires:

1. Commit/review the current branch as approved by the owner.
2. Configure production application environment variables for the `production` dataset and matching Sanity secrets.
3. Deploy the application.
4. Enable the preconfigured production webhook.
5. Run the final live-domain smoke check.

No additional production content migration is required unless content changes after the confirmed freeze.
