"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { IntelligentNOCSection } from "~/i18n/types/noc";

export default function IntelligentNOC() {
  const t = useTranslations();
  const section = t.raw("noc_page.intelligentNOC") as IntelligentNOCSection;

  return (
    <section className="relative overflow-hidden bg-gray-50 py-28">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="shadow-brand-one relative h-[400px] w-full overflow-hidden rounded-2xl border bg-white shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_30px]">
              <Image
                src={section.image}
                fill
                alt={section.imageAlt}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Subtle Background Accent */}
            <div className="absolute -top-10 -right-10 -z-10 h-72 w-72 rounded-full bg-blue-100 opacity-60 blur-3xl" />
          </motion.div>
          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Section Label */}
            <span className="rounded-full border border-blue-600 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              {section.badge}
            </span>

            {/* Heading */}
            <h2 className="text-brand-one mt-6 text-2xl leading-tight font-extrabold sm:text-3xl md:text-4xl lg:text-5xl">
              <span>{section.titleLine1}</span>
              <br />
              <span>{section.titleLine2}</span>
              <br />
              <span>{section.titleLine3}</span>
            </h2>

            {/* Description */}
            <p className="mt-6 text-lg leading-relaxed text-black">
              {section.description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
