"use client";

import Image from "next/image";
import { motion } from "framer-motion"; // ✅ added
import { Layers, Zap, Database, ShieldCheck, BellRing } from "lucide-react";
import { useTranslations } from "next-intl";
import type { BenefitsUseCasesSection } from "~/i18n/types/cdp";

const iconMap = [Layers, Zap, Database, BellRing, ShieldCheck];

/* ================= ANIMATION ================= */
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
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

const fadeLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 14,
    },
  },
};
/* =========================================== */

export const BenefitsUseCases = () => {
  const t = useTranslations();
  const benefitsSection = t.raw("cdp_page")
    .benefitsUseCases as BenefitsUseCasesSection;

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        
        {/* LEFT IMAGE */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="group shadow-brand-three relative h-150 w-full overflow-hidden rounded-2xl shadow-[0px_0px_10px] duration-300 hover:shadow-[0px_0px_50px]"
        >
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6 }}
            className="h-full w-full"
          >
            <Image
              src="/solutions/cdp/1.webp"
              fill
              alt="AI Powered Customer Data Platform"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Heading */}
          <motion.p
            variants={fadeUp}
            className="text-brand-three mb-6 text-3xl leading-tight font-extrabold md:text-4xl"
          >
            {benefitsSection.heading}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mb-6 text-2xl leading-tight font-extrabold text-gray-900"
          >
            {benefitsSection.subheading}
          </motion.h2>

          {/* Cards */}
          <motion.div
            variants={container}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {benefitsSection.benefits.map((item, index) => {
              const Icon = iconMap[index];
              if (!Icon) return null;

              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ scale: 1.05 }}
                  className="group rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:border-pink-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      className="flex h-11 min-w-11 items-center justify-center rounded-lg bg-pink-50 transition group-hover:bg-pink-100"
                    >
                      <Icon className="h-5 w-5 text-pink-600" />
                    </motion.div>

                    <div>
                      <h4 className="mb-1 font-semibold text-black">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};