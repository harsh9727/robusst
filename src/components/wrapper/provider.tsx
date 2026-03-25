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
    if (posthog.__loaded) return;

    // Defer PostHog initialisation by 3 s so it doesn't block the main thread
    // during the critical page-load window (reduces TBT significantly).
    const timer = setTimeout(() => {
      posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
        // Route analytics through our own domain to improve cache TTL and
        // avoid ad-blocker false-positives (rewrites configured in next.config.js)
        api_host: "/ingest",
        ui_host: env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",

        person_profiles: "always",
        defaults: "2026-01-30",
        enable_heatmaps: true,

        // Disable unused PostHog features to cut ~57 KiB of unused JS
        disable_surveys: true,
      });
    }, 3000);

    return () => clearTimeout(timer);
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
