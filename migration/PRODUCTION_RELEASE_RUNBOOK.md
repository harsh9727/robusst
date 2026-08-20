# Production release runbook

## Branch and domain model

- `staging` is the only preview branch that automatically builds.
- `staging.robusst.com` must be assigned to the `staging` Git branch in Vercel.
- `main` remains the Vercel production branch and automatically builds production releases.
- Feature branches, including `feat/sanity`, do not automatically deploy.
- Release flow: feature branch → `staging` → approval → pull request from `staging` to `main`.

`vercel.json` enforces automatic deployments for only `staging` and `main`.

## Staging Vercel configuration

Use the Preview environment, scoped to the `staging` branch where Vercel supports branch-specific values:

| Variable                            | Staging value/purpose                                    |
| ----------------------------------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_BASE_URL`              | `https://staging.robusst.com`                            |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`     | `6q5phwee`                                               |
| `NEXT_PUBLIC_SANITY_DATASET`        | `production` for release-candidate verification          |
| `NEXT_PUBLIC_SANITY_STUDIO_URL`     | `/studio`                                                |
| `NEXT_PUBLIC_SANITY_PREVIEW_ORIGIN` | `https://staging.robusst.com`                            |
| `SANITY_API_READ_TOKEN`             | Server-only read token for draft preview                 |
| `SANITY_FORM_SUBMISSION_TOKEN`      | Server-only token for creating form-submission documents |
| `SANITY_REVALIDATE_SECRET`          | Server-only staging secret if a staging webhook is added |
| `NEXT_PUBLIC_POSTHOG_KEY`           | Existing PostHog project key                             |
| `NEXT_PUBLIC_POSTHOG_HOST`          | Existing PostHog UI host                                 |
| `DATABASE_URL`                      | Approved staging database connection                     |
| `BETTER_AUTH_SECRET`                | Staging auth secret                                      |
| `VERCEL_API_TOKEN`                  | Server-only token with cache invalidation permission     |
| `VERCEL_PROJECT_ID`                 | `prj_kxvHb8INAF1uDThGoH8qwENlqpSA`                       |

Do not configure `SANITY_API_WRITE_TOKEN` in Vercel. It is only for guarded migration scripts.

## Production Vercel configuration

Configure the Production environment before merging to `main`:

| Variable                            | Production value/purpose                                           |
| ----------------------------------- | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_BASE_URL`              | `https://www.robusst.com`                                          |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`     | `6q5phwee`                                                         |
| `NEXT_PUBLIC_SANITY_DATASET`        | `production`                                                       |
| `NEXT_PUBLIC_SANITY_STUDIO_URL`     | `/studio`                                                          |
| `NEXT_PUBLIC_SANITY_PREVIEW_ORIGIN` | `https://www.robusst.com`                                          |
| `SANITY_API_READ_TOKEN`             | Server-only read token for draft preview                           |
| `SANITY_FORM_SUBMISSION_TOKEN`      | Server-only token for creating form-submission documents           |
| `SANITY_REVALIDATE_SECRET`          | Must exactly match the configured Sanity production webhook secret |
| `NEXT_PUBLIC_POSTHOG_KEY`           | Existing production PostHog project key                            |
| `NEXT_PUBLIC_POSTHOG_HOST`          | Existing production PostHog UI host                                |
| `DATABASE_URL`                      | Existing production database connection                            |
| `BETTER_AUTH_SECRET`                | Existing production auth secret                                    |
| `VERCEL_API_TOKEN`                  | Server-only token with cache invalidation permission               |
| `VERCEL_PROJECT_ID`                 | `prj_kxvHb8INAF1uDThGoH8qwENlqpSA`                                 |

Never expose Sanity tokens, auth secrets, database credentials, or Vercel tokens in client-prefixed variables.

## Pre-production checks

1. Confirm `staging.robusst.com` resolves to the latest `staging` commit.
2. Confirm rendered Sanity asset URLs contain `/production/` and never `/development/`.
3. Test all six locales, Arabic RTL, responsive layouts, internal links, forms, Calendly, PostHog, videos, sliders, dialogs, language switching, jobs, stories, and blogs.
4. Verify `/sitemap.xml`, `/manifest.webmanifest`, `/llms.txt`, robots, metadata, canonicals, hreflang, and JSON-LD.
5. Make a harmless Sanity draft and verify Presentation/draft preview without publishing it.
6. Confirm the production webhook remains disabled before the application release.
7. Open and approve a pull request from `staging` to `main`.

## Production release

1. Merge the approved `staging` pull request into `main`.
2. Wait for the Vercel production deployment to finish.
3. Confirm `www.robusst.com` serves the new commit and production Sanity CDN URLs.
4. Smoke-test representative routes in all six locales plus forms and integrations.
5. Enable the preconfigured Sanity webhook named **Robusst production revalidation**.
6. Publish one harmless content change and verify the webhook returns HTTP 200 and the affected page updates.
7. Test update and unpublish behavior for one controlled document.

The production Sanity content and assets are already migrated and validated. No additional content migration is required unless approved content changed after the freeze.
