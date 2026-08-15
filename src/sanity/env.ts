const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
}

if (!dataset) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET");
}

export const sanityEnv = {
  projectId,
  dataset,
  apiVersion: "2026-08-15",
  studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? "/studio",
  previewOrigin:
    process.env.NEXT_PUBLIC_SANITY_PREVIEW_ORIGIN ?? "http://localhost:3000",
};
