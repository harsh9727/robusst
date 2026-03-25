"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link2, Cpu, Database, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import type { KeyFeaturesCapabilitiesSection } from "~/i18n/types/cdp";

const iconMap = [Link2, Cpu, Database, ShieldCheck];

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

export const KeyFeaturesCapabilities = () => {
  const t = useTranslations();
  const keyFeaturesSection = t.raw("cdp_page")
    .keyFeaturesCapabilities as KeyFeaturesCapabilitiesSection;

  return (
    <section className="relative bg-gradient-to-b from-white to-slate-50 px-6 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">

        {/* LEFT – IMAGE */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="group relative h-[250px] w-full overflow-hidden rounded-2xl sm:h-112.5 lg:h-137.5"
        >
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6 }}
            className="h-full w-full"
          >
            <Image
              src="/solutions/cdp/5.webp"
              fill
              alt="AI Powered Customer Data Platform"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* RIGHT – CONTENT */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Heading */}
          <motion.p
            variants={fadeUp}
            className="text-brand-three mb-6 text-3xl font-extrabold md:text-4xl"
          >
            {keyFeaturesSection.heading}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mb-6 text-2xl font-extrabold text-gray-900"
          >
            {keyFeaturesSection.subheading}
          </motion.h2>

          {/* Cards */}
          <motion.div
            variants={container}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {keyFeaturesSection.features.map((item, index) => {
              const Icon = iconMap[index];
              if (!Icon) return null;

              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ scale: 1.05 }}
                  className="group rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:border-pink-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      className="flex h-11 min-w-11 items-center justify-center rounded-md bg-pink-50"
                    >
                      <Icon className="h-6 w-6 text-pink-500" />
                    </motion.div>

                    {/* Text */}
                    <div>
                      <h4 className="mb-1 font-semibold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-600">
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