"use client";
import React, { useEffect, useRef, useState } from "react";
import { useCmsUiCopy } from "~/components/wrapper/CmsUiProvider";

interface CalendlyEmbedProps {
  url: string;
}

export const CalendlyFormEmbed: React.FC<CalendlyEmbedProps> = ({ url }) => {
  const { calendlyLoadingLabel } = useCmsUiCopy();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Step 1 — watch for the section entering the viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // only need to trigger once
        }
      },
      { rootMargin: "200px" }, // start loading 200 px before it becomes visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Step 2 — once visible, inject the Calendly CSS + JS
  useEffect(() => {
    if (!isVisible || isLoaded) return;

    // CSS
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => console.error("Failed to load Calendly script");
    document.body.appendChild(script);

    return () => {
      // Clean up only if the elements still exist in the DOM
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <div ref={containerRef} style={{ minWidth: "320px", width: "100%" }}>
      {/* Skeleton placeholder shown until the widget JS is ready */}
      {!isLoaded && (
        <div
          className="h-[850px] w-full animate-pulse rounded-lg bg-gray-100"
          aria-busy="true"
          aria-label={calendlyLoadingLabel}
        />
      )}

      {/* Calendly mounts into this div once its script initialises */}
      {isVisible && (
        <div
          className="calendly-inline-widget"
          data-url={url}
          style={{
            minWidth: "320px",
            height: "850px",
            width: "100%",
            display: isLoaded ? "block" : "none",
          }}
        />
      )}
    </div>
  );
};
