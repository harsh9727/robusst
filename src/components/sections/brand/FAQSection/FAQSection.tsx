"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";
import type { FAQSection as FAQSectionType } from "~/i18n/types/brand";

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = useTranslations();
  const faqSection = t.raw("brand_page").faq as FAQSectionType;

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
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-brand-two mb-10 text-3xl font-extrabold tracking-wide uppercase md:text-4xl">
              {faqSection.heading}
            </h2>

            <div className="shadow-brand-one relative h-75 overflow-hidden rounded-3xl shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_40px] sm:h-92.5 md:h-100 lg:h-125">
              <Image
                src="/solutions/brand/3.webp"
                fill
                alt="FAQ Support Team"
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>

          {/* RIGHT FAQ LIST */}
          <div className="flex h-157.5 flex-col gap-6 overflow-y-auto">
            {faqSection.items.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/20 bg-black/60 p-6"
                >
                  {/* QUESTION */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <h4
                      className={`text-lg font-semibold ${isOpen ? "text-brand-two" : "text-white"}`}
                    >
                      {index + 1}. {faq.question}
                    </h4>

                    {isOpen ? (
                      <Minus className="text-brand-two h-5 w-5" />
                    ) : (
                      <Plus className="text-brand-two h-5 w-5" />
                    )}
                  </button>

                  {/* ANSWER */}
                  {isOpen && (
                    <p className="mt-4 text-sm leading-relaxed text-white/80">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
