"use client";

import { ShieldCheck, Globe, Lock, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { SecurityComplianceSection } from "~/i18n/types/brand";

const iconMap = [ShieldCheck, Globe, Lock, ClipboardCheck];

export const SecurityCompliance = () => {
  const t = useTranslations();
  const securitySection = t.raw("brand_page")
    .securityCompliance as SecurityComplianceSection;

  return (
    <section className="w-full bg-white px-4 py-20 sm:px-6 lg:px-16">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center justify-center gap-6 sm:items-center sm:gap-5"
        >
          <h2 className="text-brand-one text-3xl font-extrabold tracking-tight md:text-4xl">
            {securitySection.heading}
          </h2>
        </motion.div>

        {/* Features */}
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
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {securitySection.items.map((item, index) => {
            const Icon = iconMap[index];
            if (!Icon) return null;

            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Icon className="text-brand-one mb-4 h-10 w-10" />
                </motion.div>

                {/* Title */}
                <h4 className="mb-3 text-xl font-bold text-black">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>

                {/* Subtle Glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-2xl bg-brand-one/5 blur-xl" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};