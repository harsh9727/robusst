"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-brand-two mb-10 text-3xl font-extrabold tracking-wide uppercase md:text-4xl">
              {faqSection.heading}
            </h2>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="shadow-brand-one relative h-75 overflow-hidden rounded-3xl shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_40px] sm:h-92.5 md:h-100 lg:h-125"
            >
              <Image
                src="/solutions/brand/3.webp"
                fill
                alt="FAQ Support Team"
                className="h-full w-full object-cover"
                priority
              />
            </motion.div>
          </motion.div>

          {/* RIGHT FAQ LIST */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="flex h-157.5 flex-col gap-6 overflow-y-auto"
          >
            {faqSection.items.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="rounded-2xl border border-white/20 bg-black/60 p-6"
                >
                  {/* QUESTION */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <h4
                      className={`text-lg font-semibold ${
                        isOpen ? "text-brand-two" : "text-white"
                      }`}
                    >
                      {index + 1}. {faq.question}
                    </h4>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isOpen ? (
                        <Minus className="text-brand-two h-5 w-5" />
                      ) : (
                        <Plus className="text-brand-two h-5 w-5" />
                      )}
                    </motion.div>
                  </button>

                  {/* ANSWER */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.p
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 overflow-hidden text-sm leading-relaxed text-white/80"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
};