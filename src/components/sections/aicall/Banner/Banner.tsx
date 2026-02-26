"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { PlatformsSection } from "~/i18n/types/platforms";

export const Banner: React.FC = () => {
  const t = useTranslations("platforms");
  return (
    <div className="bg-primary flex h-screen w-full flex-col items-center justify-center lg:flex-row">
      <div className="bg-primary relative order-2 flex h-full w-full flex-col justify-center gap-2 overflow-hidden px-8 sm:px-12 lg:order-1 lg:min-w-[50%] lg:pl-25">
        <h1 className="text-primary-foreground text-3xl font-medium lg:text-4xl xl:text-6xl">
          AI Call Center
        </h1>
        <p className="text-primary-foreground mt-2 text-lg">
          AI-Powered Voice Automation for Modern Enterprises
        </p>

        <p className="text-primary-foreground mt-2 text-lg">
          Automate customer conversations, reduce costs by up to 70%, and scale
          voice operations with enterprise-grade AI.
        </p>
      </div>

      <div className="relative order-1 h-full w-full items-center justify-center overflow-hidden lg:order-2 lg:min-w-[50%]">
        <div className="bg-primary absolute -bottom-15 -left-4 z-10 h-20 w-[120vw] rotate-6 sm:h-30 lg:-top-9 lg:-left-28 lg:h-[120vh] lg:w-50 lg:rotate-12" />
        <div className="relative h-full w-full bg-gray-500">
          <Image
            src="/solutions/banner/cybersecurity.webp"
            alt="hero image"
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
};
