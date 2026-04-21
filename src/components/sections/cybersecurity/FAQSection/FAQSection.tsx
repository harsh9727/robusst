"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import type { Cybersecurity_JsonType } from "~/types/api/cybersecurity_json.types";

interface FAQSectionProps {
  data?: Cybersecurity_JsonType["cybersecurity_page"];
}

export const FAQSection = ({ data }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqSection = data?.faq;

  if (!faqSection) return null;

  return (
    <>
      <section className="relative flex w-full items-center justify-center overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-16 lg:py-25">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <div className="shadow-brand-one relative h-75 overflow-hidden rounded-3xl shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_40px] sm:h-92.5 md:h-100 lg:h-125">
              <Image
                src="/pics/contact.webp"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                alt="FAQ Support Team"
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>

          {/* RIGHT FAQ LIST */}
          <div className="flex h-157.5 flex-col gap-6 overflow-y-auto">
            {faqSection.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className="rounded-2xl border bg-white p-6">
                  {/* QUESTION */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <h4
                      className={`text-lg font-semibold ${isOpen ? "text-brand-one" : "text-black"}`}
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
                    <p className="mt-4 text-sm leading-relaxed text-black">
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
