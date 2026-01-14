"use client";

import React, { useEffect, useState, useId } from "react";
import Script from "next/script";
import { Skeleton } from "~/components/ui/skeleton";

// Extend Window interface for LinkedIn
declare global {
  interface Window {
    IN?: {
      parse?: (element?: HTMLElement | null) => void;
    };
    __linkedinSDKLoaded?: boolean;
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
  const [isReady, setIsReady] = useState(false);
  const uniqueId = useId();
  const containerId = `linkedin-follow-${uniqueId.replace(/:/g, "")}`;

  useEffect(() => {
    // Check if LinkedIn SDK is already loaded
    const checkLinkedInSDK = () => {
      if (window.IN?.parse) {
        setIsReady(true);
        return true;
      }
      return false;
    };

    // If already loaded, set ready immediately
    if (checkLinkedInSDK()) {
      return;
    }

    // Poll for SDK availability (in case script is loading or loaded by another instance)
    const pollInterval = setInterval(() => {
      if (checkLinkedInSDK()) {
        clearInterval(pollInterval);
      }
    }, 100);

    // Clean up interval after 10 seconds to avoid infinite polling
    const timeout = setTimeout(() => {
      clearInterval(pollInterval);
    }, 10000);

    return () => {
      clearInterval(pollInterval);
      clearTimeout(timeout);
    };
  }, []);

  // Parse the button when ready
  useEffect(() => {
    if (isReady && window.IN?.parse) {
      // Small delay to ensure the DOM element is rendered
      const timer = setTimeout(() => {
        const container = document.getElementById(containerId);
        if (container && window.IN?.parse) {
          window.IN.parse(container);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isReady, containerId]);

  const handleScriptLoad = () => {
    // Mark SDK as globally loaded
    window.__linkedinSDKLoaded = true;
    setIsReady(true);
  };

  return (
    <>
      {/* LinkedIn Script - only one instance will actually load due to same id */}
      <Script
        id="linkedin-script"
        src="https://platform.linkedin.com/in.js"
        strategy="lazyOnload"
        onLoad={handleScriptLoad}
      >
        {`lang: en_US`}
      </Script>

      {/* LinkedIn Follow Button */}
      <div id={containerId} className="linkedin-follow-button">
        {isReady ? (
          <script
            type="IN/FollowCompany"
            data-id={companyId}
            data-counter={showCounter ? "right" : ""}
            suppressHydrationWarning
          />
        ) : (
          <Skeleton className="bg-secondary/30 h-5 w-18 rounded-xs" />
        )}
      </div>
    </>
  );
};
