"use client";

import React from "react";
import type { Networkmonetization_JsonType } from "~/types/api/networkmonetization_json.types";

interface BannerProps {
  data?: Networkmonetization_JsonType["network_monetization_page"];
}

export const Banner: React.FC<BannerProps> = ({ data }) => {
  const banner = data?.banner;

  if (!banner) return null;

  return (
    <div className="bg-primary flex h-screen w-full flex-col items-center justify-center lg:flex-row">
      <div className="bg-primary relative order-2 flex h-full w-full flex-col justify-center gap-2 overflow-hidden px-8 sm:px-12 lg:order-1 lg:min-w-[50%] lg:pl-25">
        <h1 className="text-primary-foreground text-3xl font-medium lg:text-4xl xl:text-6xl">
          {banner.title}
        </h1>
        <p className="text-primary-foreground mt-2 text-lg">
          {banner.description}
        </p>
      </div>

      <div className="relative order-1 h-full w-full items-center justify-center overflow-hidden lg:order-2 lg:min-w-[50%]">
        <div className="bg-primary absolute -bottom-15 -left-4 z-10 h-20 w-[120vw] rotate-6 sm:h-30 lg:-top-9 lg:-left-28 lg:h-[120vh] lg:w-50 lg:rotate-12" />
        <div className="relative h-full w-full bg-black">
          <video
            src="/solutions/network/banner.webm"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
};
