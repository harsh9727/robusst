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
        className="calendly-inline-widget m-0 h-212.5 w-full p-0"
        data-url={url}
      ></div>
    </>
  );
};
