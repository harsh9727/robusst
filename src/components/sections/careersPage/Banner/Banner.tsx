"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import type { SanityCareersData } from "~/types/sanity/careers";
import Link from "next/link";
import Image from "next/image";

interface BannerProps {
  data: SanityCareersData;
}

export const Banner: React.FC<BannerProps> = ({ data }) => {
  const bannerSection = data?.banner;

  if (!bannerSection) return null;

  return (
    <div className="bg-primary flex h-screen w-full flex-col items-center justify-center lg:flex-row">
      <div className="bg-primary relative order-2 flex h-full w-full flex-col justify-center gap-2 overflow-hidden px-8 sm:px-12 lg:order-1 lg:min-w-[50%] lg:pl-25">
        <div className="bg-brand-one absolute top-full -right-40 h-20 w-50 -translate-y-1/2 rotate-6 animate-pulse blur-[150px] sm:h-120 lg:top-1/2 lg:-left-40" />
        <div className="bg-brand-one absolute -bottom-5 -left-12 h-20 w-120 animate-pulse blur-[100px]" />

        <h1 className="text-primary-foreground text-3xl font-medium lg:text-4xl xl:text-6xl">
          {bannerSection.heading}
        </h1>
        <p className="text-primary-foreground mt-2 text-lg">
          {bannerSection.body}
        </p>

        <section className="mt-5 flex items-center gap-4">
          <Button
            variant="default"
            className="bg-brand-one text-primary-foreground hover:bg-brand-one/90 hover:text-primary-foreground"
            asChild
          >
            <Link href={bannerSection.primaryHref ?? "#open-position"}>
              {bannerSection.primaryCta}
            </Link>
          </Button>
          <Button
            variant="outline"
            className="text-primary-foreground hover:text-primary-foreground bg-transparent hover:bg-transparent"
            asChild
          >
            <Link href={bannerSection.secondaryHref ?? "#life-at-robusst"}>
              {bannerSection.secondaryCta}
            </Link>
          </Button>
        </section>
      </div>

      <div className="relative order-1 h-full w-full items-center justify-center overflow-hidden lg:order-2 lg:min-w-[50%]">
        <div className="bg-primary absolute -bottom-15 -left-4 z-10 h-20 w-[120vw] rotate-6 sm:h-30 lg:-top-9 lg:-left-28 lg:h-[120vh] lg:w-50 lg:rotate-12" />
        <div className="relative h-full w-full bg-gray-500">
          <Image
            src={bannerSection.image ?? ""}
            alt={bannerSection.imageAlt ?? bannerSection.heading ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
};
