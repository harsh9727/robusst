import { createClient } from "next-sanity";
import { sanityEnv } from "../env";

export const sanityClient = createClient({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: sanityEnv.studioUrl,
  },
});
