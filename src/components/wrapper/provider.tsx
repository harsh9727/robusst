"use client";

// tRPC
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "sonner";

import { useEffect } from "react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { env } from "~/env";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      person_profiles: "always",
      defaults: "2026-01-30",
      enable_heatmaps: true,
    });
  }, []);
  return (
    <TRPCReactProvider>
      <PHProvider client={posthog}>
        <Toaster richColors />
        {children}
      </PHProvider>
    </TRPCReactProvider>
  );
};
