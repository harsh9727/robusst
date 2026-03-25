"use client";

import {
  ShieldCheck,
  Plug,
  Globe2,
  MapPinned,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { WhyChooseSection } from "~/i18n/types/brand";

const iconMap = [ShieldCheck, Plug, Globe2, MapPinned];

function WhyChooseCard(
  { title, description }: { title: string; description: string },
  Icon: LucideIcon,
  index: number,
) {
  return (
    <motion.div
      key={index}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="group border-brand-one relative rounded-3xl border bg-white/70 p-8 shadow-md backdrop-blur-xl transition hover:shadow-2xl"
    >
      {/* Icon */}
      <motion.p
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="bg-brand-one w-fit rounded-sm p-4"
      >
        <Icon size={30} className="text-white" />
      </motion.p>

      {/* Title */}
      <p className="mt-3 text-2xl font-semibold">{title}</p>

      {/* Description */}
      <p className="leading-tight text-gray-700">{description}</p>

      {/* Glow effect on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-xl" />
      </div>
    </motion.div>
  );
}

export const Whychoose = () => {
  const t = useTranslations();
  const whyChooseSection = t.raw("brand_page").whyChoose as WhyChooseSection;

  return (
    <section className="relative bg-white px-4 py-20 sm:px-8">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-pink-400/20 blur-[100px]" />
        <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-purple-400/20 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-brand-one mb-10 text-center text-3xl font-extrabold sm:text-4xl md:mb-16"
        >
          {whyChooseSection.heading}
        </motion.h2>

        {/* Cards */}
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
          className="grid grid-cols-1 gap-10 md:grid-cols-2"
        >
          {whyChooseSection.items.map((item, index) => {
            const Icon = iconMap[index];
            if (!Icon) return null;
            return WhyChooseCard(item, Icon, index);
          })}
        </motion.div>
      </div>
    </section>
  );
};