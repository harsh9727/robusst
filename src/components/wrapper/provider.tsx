"use client";

// tRPC
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "sonner";

import { useEffect } from "react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { env } from "~/env";

// Module-level flag — survives React StrictMode double-invocation and
// nested Provider renders (locale layout + default layout both mount Provider).
let posthogInitialised = false;

export const Provider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Guard against: React StrictMode double-effect, nested Provider instances,
    // and hot-reload re-mounts in development.
    if (posthogInitialised || posthog.__loaded) return;
    posthogInitialised = true;

    // Defer PostHog initialisation by 3 s so it doesn't block the main thread
    // during the critical page-load window (reduces TBT significantly).
    const timer = setTimeout(() => {
      posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: "/ingest",
        ui_host: env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
        person_profiles: "always",
        defaults: "2026-01-30",
        enable_heatmaps: true,
        disable_surveys: true,
        // Disable tracking in development to avoid noisy network errors
        loaded: (ph) => {
          if (process.env.NODE_ENV === "development") ph.opt_out_capturing();
        },
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
