"use client";
import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    IN?: {
      parse?: (element?: HTMLElement | null) => void;
    };
  }
}

interface LinkedinFollowButtonProps {
  companyId?: string;
  showCounter?: boolean;
}

export const LinkedinFollowButton: React.FC<LinkedinFollowButtonProps> = ({
  companyId = "106457875",
  showCounter = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If SDK already loaded, just parse the container
    if (window.IN?.parse) {
      window.IN.parse(containerRef.current ?? undefined);
      return;
    }

    // LinkedIn requires these two script tags to be adjacent siblings in the DOM.
    // The first configures the SDK (lang must be inline text content).
    // The second declares the widget type. Next.js <Script> breaks this contract.
    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.src = "https://platform.linkedin.com/in.js";
    configScript.text = "lang: en_US";

    const widgetScript = document.createElement("script");
    widgetScript.type = "IN/FollowCompany";
    widgetScript.setAttribute("data-id", companyId);
    widgetScript.setAttribute("data-counter", showCounter ? "right" : "");

    const container = containerRef.current;
    if (!container) return;

    container.appendChild(configScript);
    container.appendChild(widgetScript);
  }, [companyId, showCounter]);

  return <div ref={containerRef} className="linkedin-follow-button" />;
};
