"use client";

import React, { useEffect, useRef } from "react";

interface LinkedinFollowButtonProps {
  companyId: string;
  showCounter: boolean;
}

/**
 * Render LinkedIn's Follow Company endpoint directly instead of relying on
 * platform.linkedin.com/in.js to discover and replace an injected script.
 * The SDK replacement is race-prone during client navigation and when more
 * than one widget is present on a page.
 */
export const LinkedinFollowButton: React.FC<LinkedinFollowButtonProps> = ({
  companyId,
  showCounter,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !companyId) return;

    const origin = window.location.origin;
    const params = new URLSearchParams({
      id: companyId,
      counter: showCounter ? "right" : "",
      xdOrigin: origin,
      xdChannel: window.crypto.randomUUID(),
      xd_origin_host: origin,
    });
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.linkedin.com/pages-extensions/FollowCompany?${params.toString()}`;
    iframe.title = "LinkedIn Follow Company";
    iframe.width = String(showCounter ? 145 : 80);
    iframe.height = "24";
    iframe.scrolling = "no";
    iframe.className = "block border-0";
    container.replaceChildren(iframe);

    return () => container.replaceChildren();
  }, [companyId, showCounter]);

  if (!companyId) return null;

  return (
    <div
      ref={containerRef}
      className="linkedin-follow-button inline-flex min-h-6 shrink-0 items-center"
      style={{ width: showCounter ? 145 : 80 }}
    />
  );
};
