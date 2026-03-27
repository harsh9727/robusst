"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="order-1 w-full lg:order-2"
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image
                src="/solutions/brand/14.webp"
                width={800}
                height={800}
                alt="Branded Verified Call"
                className="shadow-brand-one rounded-lg shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_40px] sm:min-w-180"
              />
            </motion.div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="order-2 lg:order-1"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-base leading-relaxed text-white md:text-lg"
            >
              {transformSection.paragraph1}
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-base leading-relaxed text-white md:text-lg"
            >
              {transformSection.paragraph2}
            </motion.p>

            <motion.h3
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="text-brand-two mb-6 text-2xl font-bold md:text-3xl"
            >
              {transformSection.ctaHeading}
            </motion.h3>
          </motion.div>
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
