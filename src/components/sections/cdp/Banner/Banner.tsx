"use client";

import React from "react";
import Image from "next/image";
import { platform } from "public";
import { useTranslations } from "next-intl";
import type { PlatformsSection } from "~/i18n/types/platforms";

export const Banner: React.FC = () => {
  const t = useTranslations("platforms");
  const bannerSection = t.raw("banner") as PlatformsSection["banner"];
  return (
    <div className="bg-primary flex h-screen w-full flex-col items-center justify-center lg:flex-row">
      <div className="bg-primary relative order-2 flex h-full w-full flex-col justify-center gap-2 overflow-hidden px-8 sm:px-12 lg:order-1 lg:min-w-[50%] lg:pl-25">
        <div className="bg-brand-one absolute top-full -right-40 h-20 w-50 -translate-y-1/2 rotate-6 animate-pulse blur-[250px] sm:h-120 lg:top-1/2 lg:-left-40" />
        <div className="bg-brand-one absolute -bottom-5 -left-12 h-20 w-120 animate-pulse blur-[120px]" />

        <h1 className="text-primary-foreground text-3xl font-medium lg:text-4xl xl:text-6xl">
          AI Powered CVM & Customer Data Platform
        </h1>
        <p className="text-primary-foreground mt-2 text-lg">
          Unlock the Power of Unified Customer Intelligence for Telecom &
          Enterprises
        </p>

        <p className="text-primary-foreground mt-2 text-lg">
          Robusst’s advanced Customer Data Platform (CDP) empowers telecom
          operators and enterprises to unify fragmented customer data into a
          real-time single view. Drive growth, increase revenue, and reduce
          churn with AI-powered insights and omnichannel personalization while
          ensuring privacy and compliance.
        </p>
      </div>

      <div className="relative order-1 h-full w-full items-center justify-center overflow-hidden lg:order-2 lg:min-w-[50%]">
        <div className="bg-primary absolute -bottom-15 -left-4 z-10 h-20 w-[120vw] rotate-6 sm:h-30 lg:-top-9 lg:-left-28 lg:h-[120vh] lg:w-50 lg:rotate-12" />
        <div className="relative h-full w-full bg-gray-500">
          <Image
            src="/solutions/cdp/17.webp"
            alt="hero image"
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
};
