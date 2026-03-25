"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Layers,
  Fingerprint,
  Megaphone,
  Brain,
  ShieldCheck,
  Cloud,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { WhyChooseRobusstSection } from "~/i18n/types/cdp";

const iconMap = [Layers, Fingerprint, Megaphone, Brain, ShieldCheck, Cloud];

// ✅ Animations
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const WhyChooseRobusst = () => {
  const t = useTranslations();
  const whyChooseSection = t.raw("cdp_page")
    .whyChooseRobusst as WhyChooseRobusstSection;

  return (
    <section className="relative bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* 🔥 Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-center text-3xl font-extrabold text-slate-900 md:text-4xl">
            <span className="ml-3 text-pink-500">
              {whyChooseSection.heading}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">

          {/* LEFT IMAGE */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="group">
              <div className="relative h-75 w-full overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 group-hover:border-pink-300 group-hover:shadow-lg">
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="h-full w-full"
                >
                  <Image
                    src="/solutions/cdp/2.webp"
                    fill
                    alt="Telecom Use Cases"
                    className="object-cover"
                  />
                </motion.div>

              </div>
            </div>
          </motion.div>

          {/* RIGHT FEATURES */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7"
          >
            {whyChooseSection.features.map((item, index) => {
              const Icon = iconMap[index];
              if (!Icon) return null;

              return (
                <motion.div
                  key={index}
                  variants={fadeRight}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="group flex items-center gap-4 rounded-full border border-sky-200 px-6 py-4 transition hover:border-pink-400 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-sky-500 transition group-hover:bg-pink-50 group-hover:text-pink-500">
                    <Icon size={20} />
                  </div>

                  <p className="font-semibold text-gray-900">
                    {item.title}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
};