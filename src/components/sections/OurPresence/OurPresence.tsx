"use client";

import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Badge } from "~/components/ui/badge";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const presenceData = [
  { name: "Australia", coordinates: [133.7751, -25.2744] },
  { name: "UK", coordinates: [-3.435973, 55.378051] },
  { name: "UAE", coordinates: [53.847818, 23.424076] },
  { name: "Kenya", coordinates: [37.9062, -0.0236] },
  { name: "Nigeria", coordinates: [8.6753, 9.082] },
  { name: "Sri Lanka", coordinates: [80.7718, 7.8731] },
  { name: "Nepal", coordinates: [84.124, 28.3949] },
  { name: "Bangladesh", coordinates: [90.3563, 23.685] },
  { name: "Russia", coordinates: [105.3188, 61.524] },
  { name: "Afghanistan", coordinates: [67.7099, 33.9391] },
  { name: "Iraq", coordinates: [43.6793, 33.2232] },
  { name: "Kuwait", coordinates: [47.4818, 29.3117] },
  { name: "Oman", coordinates: [55.9233, 21.4735] },
  { name: "South Africa", coordinates: [22.9375, -30.5595] },
  { name: "Vietnam", coordinates: [108.2772, 14.0583] },
  { name: "Indonesia", coordinates: [113.9213, -0.7893] },
  { name: "France", coordinates: [2.2137, 46.2276] },
  { name: "Ethiopia", coordinates: [40.4897, 9.145] },
  { name: "Libya", coordinates: [17.2283, 26.3351] },
  { name: "Tanzania", coordinates: [34.8888, -6.369] },
  { name: "Mauritius", coordinates: [57.5522, -20.3484] },
  { name: "Nauru Islands", coordinates: [166.9315, -0.5228] },
  { name: "India", coordinates: [78.9629, 20.5937] },
];

export const OurPresence: React.FC = () => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMarkerHover = (
    countryName: string,
    event: React.MouseEvent<SVGCircleElement>,
  ) => {
    setHoveredCountry(countryName);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-white px-6 py-12 sm:gap-8 sm:px-12 sm:py-16 lg:gap-10 lg:px-25 lg:py-25">
      <p className="px-4 text-center text-2xl font-medium sm:text-3xl lg:text-4xl">
        Our Global Clients & Partner Presence
      </p>

      <div className="relative container w-full overflow-hidden rounded-xl bg-white">
        <div className="pointer-events-none h-100 w-full sm:h-125 lg:h-150 xl:h-150">
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
                    fill="#1a1a1a"
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

            {presenceData.map(({ name, coordinates }) => (
              <Marker key={name} coordinates={coordinates as [number, number]}>
                <circle
                  r={5}
                  fill="#22d3ee"
                  stroke="#fff"
                  strokeWidth={1.5}
                  className="pointer-events-auto cursor-pointer transition-all duration-200"
                  onMouseEnter={(e) => handleMarkerHover(name, e)}
                  onMouseLeave={() => setHoveredCountry(null)}
                />
              </Marker>
            ))}
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
        <p className="mb-4 text-lg font-medium">Countries We Serve:</p>
        <div className="text-muted-foreground  gap-2 text-sm flex flex-wrap">
          {presenceData.map(({ name }) => (
            <Badge key={name} variant="secondary" >
              {name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
