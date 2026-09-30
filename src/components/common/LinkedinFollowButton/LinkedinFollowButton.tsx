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

// Module-level flag — only one instance should inject the SDK scripts.
// The second instance (header vs footer) just calls IN.parse() once loaded.
let sdkInjected = false;

export const LinkedinFollowButton: React.FC<LinkedinFollowButtonProps> = ({
  companyId,
  showCounter,
}) => {
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If SDK already fully loaded, just re-parse and bail
    if (window.IN?.parse) {
      window.IN.parse();
      return;
    }

    // Guard against StrictMode double-invoke and header+footer dual mount
    if (sdkInjected) return;
    sdkInjected = true;

    // LinkedIn's SDK MUST be injected directly into <body> as siblings —
    // not nested inside a container div. The SDK scans document.body for
    // adjacent IN/* script tags to locate and replace with the widget iframe.
    const sdkScript = document.createElement("script");
    sdkScript.type = "text/javascript";
    sdkScript.src = "https://platform.linkedin.com/in.js";
    sdkScript.text = "lang: en_US"; // read by SDK loader, not executed by browser

    const widgetScript = document.createElement("script");
    widgetScript.type = "IN/FollowCompany";
    widgetScript.setAttribute("data-id", companyId);
    widgetScript.setAttribute("data-counter", showCounter ? "right" : "");

    sdkScript.onload = () => {
      window.IN?.parse?.();
    };

    // Append to body — this is what LinkedIn's SDK expects
    document.body.appendChild(sdkScript);
    document.body.appendChild(widgetScript);

    return () => {
      // Cleanup on unmount so hot-reload doesn't accumulate script tags
      if (document.body.contains(sdkScript))
        document.body.removeChild(sdkScript);
      if (document.body.contains(widgetScript))
        document.body.removeChild(widgetScript);
      sdkInjected = false;
    };
  }, [companyId, showCounter]);

  // The placeholder div is where you control positioning in your layout.
  // The actual widget iframe will be appended to body by LinkedIn's SDK,
  // so you'll need to position it via CSS (fixed/absolute) or accept it
  // renders at the bottom of the page.
  return <div ref={placeholderRef} className="linkedin-follow-button" />;
};
