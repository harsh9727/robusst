"use client";

import { motion } from "framer-motion";
import {
  PhoneCall,
  Tags,
  Brain,
  Users,
  FileText,
  LayoutDashboard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { CoreCapabilitiesSection } from "~/i18n/types/aiCall";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  PhoneCall,
  Tags,
  Brain,
  Users,
  FileText,
  LayoutDashboard,
};

export default function CoreCapabilities() {
  const t = useTranslations();
  const coreCapabilities = t.raw(
    "ai_call_page.coreCapabilities",
  ) as CoreCapabilitiesSection;

  return (
    <section className="relative overflow-hidden bg-white py-28">
      {/* Soft Background Glow */}
      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-blue-200 opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-pink-200 opacity-30 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-extrabold text-pink-500 md:text-5xl">
            {coreCapabilities.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-black">
            {coreCapabilities.subtitle}
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-20 xl:flex-row">
          <div className="">
            <Image
              src="/solutions/aicall/12.webp"
              alt="image"
              width={450}
              height={900}
              className="h-100 max-w-50 min-w-50 sm:h-190"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            {coreCapabilities.capabilities.map((item, index) => {
              const Icon = iconMap[item.icon];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group w-full max-w-sm rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl ${item.border} hover:-translate-y-2`}
                >
                  {/* Icon */}
                  {Icon && (
                    <div
                      className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  )}
                  {/* Title */}
                  <h3 className="mb-3 text-xl font-semibold text-gray-900 transition group-hover:text-blue-600">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-md leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="">
            <Image
              src="/solutions/aicall/13.webp"
              alt="image"
              width={450}
              height={900}
              className="h-100 max-w-50 min-w-50 sm:h-190"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
