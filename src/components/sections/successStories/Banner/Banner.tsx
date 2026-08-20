"use client";

import Image from "next/image";
import React from "react";
import { TransitionLink } from "~/components/common";
import { Button } from "~/components/ui/button";
import type { SanityStoriesPage } from "~/types/sanity/stories";

interface BannerProps {
  data: SanityStoriesPage["banner"];
}

export const Banner: React.FC<BannerProps> = ({ data }) => {
  const banner = data;

  if (!banner) return null;

  return (
    <div className="bg-primary relative flex h-[calc(100vh+200px)] w-full flex-col items-center">
      <div className="absolute bottom-0 left-0 z-20 w-full overflow-hidden bg-transparent sm:-mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#ffffff"
            stroke="none"
          />
        </svg>
      </div>
      <Image
        src={banner.image ?? ""}
        alt={banner.imageAlt ?? banner.heading ?? ""}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
        className="absolute h-full w-full object-cover object-top opacity-40"
      />

      <div className="text-primary-foreground relative z-10 mt-60 flex w-full max-w-3xl flex-col items-center justify-center py-12 text-center">
        <h1 className="text-3xl font-bold lg:text-4xl xl:text-6xl">
          {banner.heading}
        </h1>
        <p className="mt-2 text-lg">{banner.subheading}</p>

        <Button
          variant="default"
          size="extra-lg"
          className="bg-brand-three text-primary-foreground hover:bg-brand-three/90 hover:text-primary-foreground mt-5"
          asChild
        >
          <TransitionLink href={banner.ctaHref ?? "/solutions"}>
            {banner.ctaText}
          </TransitionLink>
        </Button>
      </div>
    </div>
  );
};
