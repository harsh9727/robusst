"use client";

import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Badge } from "~/components/ui/badge";
import type { SanityHomeSection } from "~/types/sanity/home";
import { AnimatedText } from "~/components/ui/TextAnimation";

const geoUrl = "/world-110m.json";

interface OurPresenceProps {
  data: SanityHomeSection<"ourPresence">;
}

export const OurPresence: React.FC<OurPresenceProps> = ({ data }) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  if (!data.heading) return null;

  const handleMarkerHover = (
    countryName: string,
    event: React.MouseEvent<SVGCircleElement>,
  ) => {
    setHoveredCountry(countryName);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div className="bg-primary-foreground relative flex flex-col items-center justify-center gap-6 px-6 pt-12 sm:gap-8 sm:px-12 sm:pt-16 lg:gap-10 lg:px-25 lg:pt-25">
      <AnimatedText
        text={data.heading}
        className="text-3xl font-black sm:text-4xl lg:text-5xl"
        as="h2"
      />

      <div className="relative container w-full overflow-hidden rounded-xl bg-white">
        <div className="pointer-events-none relative h-50 w-full sm:h-100 lg:h-150 xl:h-150">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 147,
              center: [0, 20],
            }}
            width={980}
            height={551}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="var(--brand-one)"
                    stroke="#404040"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "#2a2a2a" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {(data.countries ?? []).map((country) => {
              if (country.longitude === null || country.latitude === null)
                return null;
              return (
                <Marker
                  key={country.title}
                  coordinates={[country.longitude, country.latitude]}
                  suppressHydrationWarning
                >
                  <circle
                    r={5}
                    fill="var(--brand-three)"
                    stroke="#fff"
                    strokeWidth={1.5}
                    className="pointer-events-auto cursor-pointer transition-all duration-200"
                    onMouseEnter={(e) => handleMarkerHover(country.title, e)}
                    onMouseLeave={() => setHoveredCountry(null)}
                  />
                </Marker>
              );
            })}
          </ComposableMap>
        </div>

        {/* Tooltip */}
        {hoveredCountry && (
          <div
            className="bg-primary-foreground pointer-events-none fixed z-50 rounded-lg px-3 py-2 text-sm font-medium"
            style={{
              left: `${tooltipPosition.x + 10}px`,
              top: `${tooltipPosition.y - 30}px`,
            }}
          >
            {hoveredCountry}
          </div>
        )}
      </div>

      {/* Country List for Mobile */}
      <div className="block w-full px-4 lg:hidden">
        <p className="mb-4 text-lg font-medium">{data.mobileListHeading}:</p>
        <div className="text-muted-foreground flex flex-wrap gap-2 text-sm">
          {(data.countries ?? []).map((country) => (
            <Badge key={country.title} variant="secondary">
              {country.title}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
