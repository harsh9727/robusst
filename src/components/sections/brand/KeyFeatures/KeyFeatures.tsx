"use client";

import Image from "next/image";
import {
  BadgeCheck,
  MessageSquareText,
  ShieldCheck,
  Network,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { KeyFeaturesSection } from "~/i18n/types/brand";

const iconMap = [BadgeCheck, MessageSquareText, ShieldCheck, Network];

export const KeyFeatures = () => {
  const t = useTranslations();
  const keyFeaturesSection = t.raw("brand_page")
    .keyFeatures as KeyFeaturesSection;

  return (
    <section className="relative w-full bg-white px-4 py-14 sm:px-6 lg:px-16">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12 text-center text-3xl font-extrabold tracking-wide text-pink-500 uppercase"
      >
        {keyFeaturesSection.heading}
      </motion.h2>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
        {/* LEFT FEATURES */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="flex flex-col gap-6 lg:col-span-3"
        >
          {keyFeaturesSection.features.slice(0, 2).map((feature, index) => {
            const Icon = iconMap[index];
            if (!Icon) return null;
            return (
              <FeatureCard
                key={index}
                title={feature.title}
                desc={feature.description}
                Icon={Icon}
                direction="left"
                delay={index}
              />
            );
          })}
        </motion.div>

        {/* CENTER IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className="shadow-brand-one relative h-75 overflow-hidden rounded-2xl shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_40px] sm:h-100 lg:col-span-6 lg:min-h-112.5"
        >
          <Image
            src="/solutions/brand/8.webp"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
            alt="Business Calling"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* RIGHT FEATURES */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="flex flex-col gap-6 lg:col-span-3"
        >
          {keyFeaturesSection.features.slice(2, 4).map((feature, index) => {
            const Icon = iconMap[index + 2];
            if (!Icon) return null;
            return (
              <FeatureCard
                key={index}
                title={feature.title}
                desc={feature.description}
                Icon={Icon}
                direction="right"
                delay={index}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* Feature Card */
const FeatureCard = ({
  title,
  desc,
  Icon,
  direction,
  delay,
}: {
  title: string;
  desc: string;
  Icon: React.ElementType;
  direction: "left" | "right";
  delay: number;
}) => {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          x: direction === "left" ? -60 : 60,
        },
        visible: {
          opacity: 1,
          x: 0,
        },
      }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group flex h-auto flex-col rounded-2xl border border-white/10 bg-black px-6 py-7 shadow-lg lg:min-h-50 lg:px-4"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-emerald-400">{title}</h3>

        <motion.div
          whileHover={{ rotate: 10, scale: 1.2 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Icon className="h-7 w-7 text-emerald-400" />
        </motion.div>
      </div>

      <p className="text-sm leading-relaxed text-white/80">{desc}</p>

      {/* Glow effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl bg-emerald-400/10 blur-xl" />
      </div>
    </motion.div>
  );
};
