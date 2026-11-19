import React from "react";

/** The wave divider used between black and white sections across the site. */
export const Wave: React.FC<{ into: "dark" | "light" }> = ({ into }) =>
  into === "dark" ? (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden bg-white sm:-mb-5"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
        <path
          d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
          fill="#000000"
        />
      </svg>
    </div>
  ) : (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden bg-white sm:-mt-5"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 150"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
          fill="#000000"
          stroke="none"
        />
      </svg>
    </div>
  );
