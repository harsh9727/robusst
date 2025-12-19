import React from "react";
import Script from "next/script";

interface CalendlyEmbedProps {
  url: string;
}

export const CalendlyFormEmbed: React.FC<CalendlyEmbedProps> = ({ url }) => {
  return (
    <>
      <Script src="https://assets.calendly.com/assets/external/widget.js"></Script>
      <div
        className="calendly-inline-widget h-212.5 w-full"
        data-url={url}
      ></div>
    </>
  );
};
