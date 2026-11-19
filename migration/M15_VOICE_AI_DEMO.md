# Milestone 15: Voice AI Demo page

The Voice AI Demo page lives at `/[locale]/voice-ai-demo` in all six locales. It rebuilds the content of the approved `voice-demo.html` landing page with the site's own components, and Sanity holds all of its copy. The live voice call from that file is not part of the page. The hero links visitors to `/contact` to book a demo.

## Content model

The `voiceDemoPage` document type has one document for each locale (`voiceDemoPage-en`, `voiceDemoPage-fr`, and so on). Each section is a referenced `fixedPageSection` document, like the AI Call Center and Stories pages.

The section names reuse names that other pages already use. Sanity allows at most 2000 distinct field paths in a dataset, and the `production` dataset is close to that limit. When a dataset goes over the limit, Sanity rejects every write, including editors publishing in Studio. Reused names and fields add no new paths.

| Section field         | Holds                                                                            |
| --------------------- | -------------------------------------------------------------------------------- |
| `banner`              | Hero: eyebrow, headline, subtitle, call to action, stat cards                    |
| `solutionOverview`    | Orb card: label, tagline, orb image                                              |
| `listing`             | Dialect strip: accessible label, "200+" in eyebrow, closing chip text            |
| `keyValueProposition` | Coverage: eyebrow, headline, description, statistics                             |
| `solutionGrid`        | Dialects: heading, description, chips, caveat, regions with languages            |
| `detailDialog`        | Region tab label, "and more" chip, footer template with `{count}` and `{region}` |
| `businessOutcomes`    | Three outcome cards                                                              |
| `coreCapabilities`    | Eyebrow, headline, seven capability cards                                        |
| `cta`                 | Closing call to action that links to `/contact`                                  |

Each language card in `solutionGrid` lists its dialects in its description, one dialect per line. `src/sanity/queries/voiceDemoPage.ts` documents the mapping and the order of the positional labels.

The migration script counts the field paths that a write would add. It refuses to write if the count is not zero.

The source copy is `migration/translations/voice-demo.en.json`. The French, Russian, Portuguese, Spanish, and Arabic files are machine-generated. Their `translation.status` is `generated`, so a native speaker must review them in Studio.

## Page registry

`src/sanity/pageRoutes.ts` maps every localized page type to its URL. The sitemap, the revalidation webhook, and Studio Presentation all read it. A published page document appears in `/sitemap.xml` for its locale without a code change. A page marked "Prevent search indexing" is left out of the sitemap. Publishing a page also clears the sitemap cache.

## Staging first, production later

`src/sanity/pageRelease.ts` lists pages that are not yet released. The voice demo is on that list.

- Locally and on staging (Vercel Preview), the page shows. The header adds its Resources link from code.
- On production (`VERCEL_ENV=production`), the page returns 404. The sitemap, `llms.txt`, and the header leave it out.

The Sanity content already exists in the shared `production` dataset. Do not add the menu link in Sanity before the release, because the production header shows every Sanity link.

## Release steps

1. Merge the code to `staging`. The page shows on `https://staging.robusst.com/en/voice-ai-demo` with its Resources link.
2. When the client approves, open a pull request from `staging` to `main`. After the merge, production still hides the page.
3. To release the page, remove `voiceDemoPage` from `UNRELEASED_PAGES` in `src/sanity/pageRelease.ts`, and merge that change through `staging` to `main`.
4. After production serves that change, add the Resources menu link in Sanity.

   ```bash
   pnpm sanity:voice-demo:migrate --dataset=production --allow-production --with-navigation
   ```

5. Make sure that the content and the menu link are complete.

   ```bash
   pnpm sanity:voice-demo:validate --dataset=production
   ```

6. Submit the new URLs to search engines.

   ```bash
   node scripts/indexnow.mjs
   ```

To change the copy, edit it in Studio under Pages, then Voice AI Demo. To rebuild the content from the JSON files, run `pnpm sanity:voice-demo:dry` and then `pnpm sanity:voice-demo:migrate --dataset=production --allow-production`.
