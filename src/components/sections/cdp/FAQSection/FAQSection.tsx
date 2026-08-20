"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SanityCustomerDataPlatformSection } from "~/types/sanity/customerDataPlatform";

/* ✅ Animation Variants */
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemFade = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 14,
    },
  },
};

interface FAQSectionProps {
  data: SanityCustomerDataPlatformSection<"faq">;
}

export const FAQSection = ({ data }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!data) return null;

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
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2"
        >
          {/* LEFT IMAGE */}
          <motion.div variants={itemFade}>
            <div className="shadow-brand-one relative h-75 overflow-hidden rounded-3xl sm:h-92.5 md:h-100 lg:h-125">
              <Image
                src={data.image ?? ""}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                alt={data.imageAlt ?? ""}
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* RIGHT FAQ */}
          <motion.div
            variants={container}
            className="flex h-157.5 flex-col gap-6 overflow-y-auto"
          >
            {(data.items ?? []).map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  variants={itemFade}
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

                  {/* ANSWER (Animated) */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-sm leading-relaxed text-white/80">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};
