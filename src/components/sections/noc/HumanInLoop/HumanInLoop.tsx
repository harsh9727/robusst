"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { HumanInLoopSection } from "~/i18n/types/noc";

export default function HumanInLoop() {
  const t = useTranslations();
  const section = t.raw("noc_page.humanInLoop") as HumanInLoopSection;

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Title */}
            <div className="group relative mb-8 inline-block">
              <h2 className="relative rounded-md px-5 py-3 text-3xl leading-tight font-extrabold md:text-4xl lg:text-[2.7rem]">
                <span className="text-brand-one">
                  {section.titleLine1} <br /> {section.titleLine2}
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="max-w-xl text-lg leading-relaxed text-gray-600">
              {section.description}
            </p>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="relative h-100 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
              <Image
                src={section.image}
                alt={section.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />
            </div>

            {/* Soft Accent Glow */}
            <div className="absolute -right-10 -bottom-10 h-44 w-44 rounded-full bg-pink-200/40 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
