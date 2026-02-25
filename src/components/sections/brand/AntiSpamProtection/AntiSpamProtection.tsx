"use client";

import Image from "next/image";
import { ShieldCheck, BrainCircuit, CheckCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
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
        <div className="max-w-9xl relative mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
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

            <Button
              variant="outline"
              className="border-brand-two hover:bg-brand-two/90 bg-brand-two px-6 pt-4 pb-5 text-sm font-medium text-black capitalize sm:text-base"
            >
              {antiSpamSection.ctaButton}
            </Button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative lg:col-span-6">
            <div className="relative mx-auto h-[300px] overflow-hidden rounded-3xl shadow-2xl sm:h-[400px]">
              <Image
                src="/solutions/brand/7.webp"
                alt="AI Shield Protection"
                fill
                className="object-cover object-top"
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
