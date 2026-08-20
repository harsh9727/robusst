import "server-only";
import { draftMode } from "next/headers";
import { sanityClient } from "./client";

export async function getPreviewAwareSanityClient() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return { client: sanityClient, isPreview: false };
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!token)
    throw new Error(
      "SANITY_API_READ_TOKEN is required for Sanity draft preview",
    );
  return {
    client: sanityClient.withConfig({
      useCdn: false,
      token,
      perspective: "drafts",
      stega: { enabled: true, studioUrl: "/studio" },
    }),
    isPreview: true,
  };
}
