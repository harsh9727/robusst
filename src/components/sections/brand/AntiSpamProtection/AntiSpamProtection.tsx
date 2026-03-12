"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import type { AntiSpamProtectionSection } from "~/i18n/types/brand";

export const AntiSpamProtection = () => {
  const t = useTranslations();
  const antiSpamSection = t.raw("brand_page")
    .antiSpamProtection as AntiSpamProtectionSection;
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

      <section className="bg-primary relative flex w-full items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-16 lg:py-25">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* LEFT CONTENT */}
          <div className="relative lg:col-span-6">
            <h2 className="mb-6 text-4xl leading-tight font-extrabold text-white md:text-4xl">
              {antiSpamSection.heading}
              <br />
              <span className="text-brand-two">
                {antiSpamSection.subheading}
              </span>
            </h2>

            <h3 className="mb-4 text-xl font-semibold text-white md:text-2xl">
              {antiSpamSection.description1}
            </h3>

            <p className="mb-6 text-base leading-relaxed text-white/80 md:text-lg">
              {antiSpamSection.description2}
            </p>

            {/* Benefits */}
            <ul className="mb-8 space-y-3">
              {antiSpamSection.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-white">
                  <CheckCircle size={20} className="text-brand-two" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative lg:col-span-6">
            <div className="relative mx-auto h-120 w-80 overflow-hidden rounded-3xl shadow-2xl sm:h-180 sm:w-120">
              <Image
                src="/solutions/brand/7.webp"
                alt="AI Shield Protection"
                fill
                className="animate-float object-cover object-top"
                priority
              />
            </div>
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
