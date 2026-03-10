"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { useTranslations } from "next-intl";
import type { TransformCommunicationSection } from "~/i18n/types/brand";

export const TransformCommunication = () => {
  const t = useTranslations();
  const transformSection = t.raw("brand_page")
    .transformCommunication as TransformCommunicationSection;
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

      <section className="bg-primary relative flex w-full items-center justify-center overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-16 lg:py-20">
        <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* RIGHT IMAGE — show first on mobile, second on large */}
          <div className="order-1 w-full lg:order-2">
            <Image
              src="/solutions/brand/14.webp"
              width={800}
              height={800}
              alt="Branded Verified Call"
              className="shadow-brand-one shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_40px] sm:min-w-180"
            />
          </div>

          {/* LEFT CONTENT — show second on mobile, first on large */}
          <div className="order-2 lg:order-1">
            <p className="mb-6 text-base leading-relaxed text-white md:text-lg">
              {transformSection.paragraph1}
            </p>

            <p className="mb-8 text-base leading-relaxed text-white md:text-lg">
              {transformSection.paragraph2}
            </p>

            <h3 className="text-brand-two mb-6 text-2xl font-bold md:text-3xl">
              {transformSection.ctaHeading}
            </h3>

            <Button
              variant="outline"
              className="bg-brand-two hover:bg-brand-two/90 border-black px-6 pt-4 pb-5 text-sm font-medium text-black capitalize sm:text-base"
            >
              {transformSection.ctaButton}
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
