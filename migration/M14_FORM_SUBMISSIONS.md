# Milestone 14 — Sanity form submissions

The Contact, POC Waitlist, and Partnership forms now store responses directly in the production Sanity dataset. Google Sheets storage and its runtime dependency have been removed.

## Runtime

- Public endpoint: `POST /api/forms`
- Stored document type: `formSubmission`
- Supported submission types: `contact`, `poc`, and `partner`
- Submission fields are immutable in Studio.
- Editors can update workflow status and internal notes.
- Editors can delete submissions for privacy or retention requests.
- Rapid retries with the same form type and email are deduplicated for 30 seconds.
- The former `/api/gsheet` endpoint no longer exists.

## Studio

**Form submissions** appears as a top-level Structure item, ordered newest first. Documents include:

- form type and submission timestamp
- website locale and source path
- name, email, phone, and company
- country/message for Contact and POC submissions
- job title, website, and partner type for Partnership submissions
- workflow status: New, In progress, Resolved, or Spam
- internal notes

Submissions cannot be created or duplicated manually in Studio. Deletion remains available for data-retention and privacy workflows.

## Security and configuration

The deployed application uses the server-only `SANITY_FORM_SUBMISSION_TOKEN`. A dedicated Sanity robot token named **Robusst form submissions** was created for this integration. The token is never sent to browsers or committed.

`SANITY_API_WRITE_TOKEN` remains migration-only and is not configured in Vercel.

The following obsolete variables were removed locally and from Vercel Preview/Production:

- `SPREADSHEET_ID`
- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

The `googleapis` package and Google Sheets route implementation were also removed.

## Verification

Controlled tests cover all three forms, localized metadata, source paths, duplicate suppression, Studio-compatible document fields, and removal of the legacy endpoint. Test documents are deleted after validation.
