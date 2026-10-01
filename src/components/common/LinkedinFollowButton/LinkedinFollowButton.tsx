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

export const LinkedinFollowButton: React.FC<LinkedinFollowButtonProps> = ({
  companyId,
  showCounter,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !companyId) return;

    // The LinkedIn SDK replaces an IN/FollowCompany script in place. Keeping
    // that script inside this container ensures the resulting button appears
    // in the header/footer instead of being appended at the end of <body>.
    container.replaceChildren();
    const widget = document.createElement("script");
    widget.type = "IN/FollowCompany";
    widget.setAttribute("data-id", companyId);
    if (showCounter) widget.setAttribute("data-counter", "right");
    container.appendChild(widget);

    const parseWidget = () => window.IN?.parse?.(container);
    const existingSdk = document.getElementById(
      LINKEDIN_SDK_ID,
    ) as HTMLScriptElement | null;

    if (window.IN?.parse) {
      parseWidget();
    } else if (existingSdk) {
      existingSdk.addEventListener("load", parseWidget, { once: true });
    } else {
      const sdk = document.createElement("script");
      sdk.id = LINKEDIN_SDK_ID;
      sdk.type = "text/javascript";
      sdk.src = "https://platform.linkedin.com/in.js";
      sdk.async = true;
      sdk.text = "lang: en_US";
      sdk.addEventListener("load", parseWidget, { once: true });
      document.body.appendChild(sdk);
    }

    return () => {
      existingSdk?.removeEventListener("load", parseWidget);
      container.replaceChildren();
    };
  }, [companyId, showCounter]);

  return (
    <div
      ref={containerRef}
      className="linkedin-follow-button inline-flex min-h-5 min-w-18 shrink-0 items-center"
    />
  );
};
