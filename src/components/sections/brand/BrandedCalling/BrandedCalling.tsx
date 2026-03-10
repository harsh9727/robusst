"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useTranslations } from "next-intl";
import type { BrandedCallingSection } from "~/i18n/types/brand";

export const BrandedCalling = () => {
  const t = useTranslations();
  const brandedCallingSection = t.raw("brand_page")
    .brandedCalling as BrandedCallingSection;
  return (
    <>
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <section className="bg-primary relative flex w-full items-center justify-center overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-16 lg:py-25">
        <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 items-center lg:grid-cols-2 lg:gap-30">
          {/* LEFT – PHONE VISUALS */}

          {/* Main Phone */}
          <div className="relative h-full scale-125">
            <Image
              src="/solutions/brand/2.webp"
              fill
              alt="Branded Calling Screen"
              className="animate-float h-full w-full object-cover"
            />
          </div>

          {/* RIGHT – CONTENT */}
          <div>
            <h2 className="mb-6 text-4xl leading-tight font-extrabold text-white md:text-4xl">
              {brandedCallingSection.heading}
              <br />
              <span className="text-brand-two">
                {brandedCallingSection.subheading}
              </span>
            </h2>

            <h3 className="mb-4 text-xl font-semibold text-white md:text-2xl">
              {brandedCallingSection.description1}
            </h3>

            <p className="mb-6 text-base leading-relaxed text-white/80 md:text-lg">
              {brandedCallingSection.description2}
            </p>

            {/* Benefits */}
            <ul className="mb-8 space-y-3">
              {brandedCallingSection.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-white">
                  <CheckCircle size={20} className="text-brand-two" />
                  {benefit}
                </li>
              ))}
            </ul>

            <Button
              variant="outline"
              className="border-brand-two hover:bg-brand-two/90 bg-brand-two px-6 pt-4 pb-5 text-sm font-medium text-black capitalize sm:text-base"
            >
              {brandedCallingSection.ctaButton}
            </Button>
          </div>
        </div>
      </section>
      <div className="w-full overflow-hidden bg-white sm:-mt-5">
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
    </>
  );
};
