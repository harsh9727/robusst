"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Wrench, Sparkles, GitBranch } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { CustomDevelopmentSection } from "~/i18n/types/aiCall";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Wrench,
  Sparkles,
  GitBranch,
};

export default function CustomDevelopment() {
  const t = useTranslations();
  const customDev = t.raw(
    "ai_call_page.customDevelopment",
  ) as CustomDevelopmentSection;

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* LEFT CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative h-[300px] w-full overflow-hidden rounded-3xl shadow-2xl sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <Image
              src="/solutions/aicall/14.webp"
              fill
              alt="Custom Development"
              className="h-full w-full object-cover"
            />
          </div>

          {/* glow */}
          <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-blue-200 opacity-40 blur-3xl"></div>
        </motion.div>
        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-10 text-4xl leading-tight font-extrabold md:text-5xl">
            <span className="text-pink-500">{customDev.title}</span>
          </h2>

          <p className="mb-8 text-lg text-gray-600">{customDev.subtitle}</p>

          <div className="space-y-6">
            {customDev.features.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition duration-300 hover:shadow-xl"
                >
                  {Icon && (
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconStyle}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  )}

                  <div>
                    <h4 className={`text-lg font-semibold ${item.titleColor}`}>
                      {item.title}
                    </h4>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
