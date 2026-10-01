"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    IN?: { parse?: (element?: HTMLElement | null) => void };
  }
}

interface LinkedinFollowButtonProps {
  companyId: string;
  showCounter: boolean;
}

const LINKEDIN_SDK_ID = "linkedin-platform-sdk";
let sdkPromise: Promise<void> | undefined;

function loadLinkedInSdk() {
  if (window.IN?.parse) return Promise.resolve();
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise<void>((resolve, reject) => {
    const onLoad = () => (window.IN?.parse ? resolve() : reject());
    const onError = () => reject(new Error("LinkedIn SDK failed to load"));
    const existing = document.getElementById(
      LINKEDIN_SDK_ID,
    ) as HTMLScriptElement | null;

    if (existing) {
      existing.addEventListener("load", onLoad, { once: true });
      existing.addEventListener("error", onError, { once: true });
      return;
    }

    const sdk = document.createElement("script");
    sdk.id = LINKEDIN_SDK_ID;
    sdk.type = "text/javascript";
    sdk.textContent = "lang: en_US";
    sdk.src = "https://platform.linkedin.com/in.js";
    sdk.async = true;
    sdk.addEventListener("load", onLoad, { once: true });
    sdk.addEventListener("error", onError, { once: true });
    document.body.appendChild(sdk);
  });

  return sdkPromise;
}

/**
 * Keep a normal LinkedIn link visible as a reliable fallback. When LinkedIn's
 * SDK is available, its official one-click Follow widget is rendered over the
 * fallback. Each instance is parsed independently, so the header and footer
 * widgets can coexist and client-side navigation cannot strand a raw script.
 */
export const LinkedinFollowButton: React.FC<LinkedinFollowButtonProps> = ({
  companyId,
  showCounter,
}) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const widgetContainer = widgetRef.current;
    if (!widgetContainer || !companyId) return;

    const widget = document.createElement("script");
    widget.type = "IN/FollowCompany";
    widget.setAttribute("data-id", companyId);
    if (showCounter) widget.setAttribute("data-counter", "right");
    widgetContainer.replaceChildren(widget);

    void loadLinkedInSdk()
      .then(() => window.IN?.parse?.(widgetContainer))
      .catch(() => {
        // The visible company-page link remains available when the SDK is
        // blocked by a browser extension, privacy setting, or network policy.
      });

    return () => widgetContainer.replaceChildren();
  }, [companyId, showCounter]);

  if (!companyId) return null;

  return (
    <div
      className="linkedin-follow-button relative inline-flex h-6 shrink-0 items-center"
      style={{ width: showCounter ? 145 : 80 }}
    >
      <a
        href={`https://www.linkedin.com/company/${companyId}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Robusst on LinkedIn"
        className="absolute inset-0 inline-flex items-center overflow-hidden rounded-[2px] bg-[#0a66c2] text-xs leading-none font-normal text-white"
      >
        <span className="inline-flex h-full w-6 items-center justify-center bg-[#075b9c] font-bold">
          in
        </span>
        <span className="px-2">Follow</span>
      </a>
      <div
        ref={widgetRef}
        className="pointer-events-none absolute inset-0 z-10 [&_iframe]:pointer-events-auto"
      />
    </div>
  );
};
