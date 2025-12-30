"use client";
import React, { useEffect } from "react";

interface CalendlyEmbedProps {
  url: string;
}

export const CalendlyFormEmbed: React.FC<CalendlyEmbedProps> = ({ url }) => {
  useEffect(() => {
    // Load CSS
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Load Script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    script.onload = () => {
      console.log("Calendly script loaded successfully");
    };

    script.onerror = () => {
      console.error("Failed to load Calendly script");
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url={url}
      style={{ minWidth: "320px", height: "850px", width: "100%" }}
    />
  );
};
