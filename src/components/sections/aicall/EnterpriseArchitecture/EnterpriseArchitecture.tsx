"use client";

import { motion } from "framer-motion";
import { Smartphone, Cpu, BarChart3, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import type { SanityAiCallSection } from "~/types/sanity/aiCallCenter";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Cpu,
  BarChart3,
  Server,
};

interface EnterpriseArchitectureProps {
  data: SanityAiCallSection<"enterpriseArchitecture">;
}

export default function EnterpriseArchitecture({
  data,
}: EnterpriseArchitectureProps) {
  if (!data) return null;

  return (
    <section className="bg-gray-50 py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-extrabold text-pink-500 md:text-5xl">
            {data.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-black">
            {data.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          {/* LEFT SIDE - Premium Card Style */}
          <div className="space-y-8 md:col-span-12">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {(data.components ?? []).map((item, index) => {
                const Icon = iconMap[item.icon ?? ""];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    className={`group rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition-all duration-300 hover:shadow-2xl ${item.border}`}
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
          </div>

          {/* RIGHT SIDE - Architecture Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-3xl px-8 py-10 md:col-span-12"
          >
            <h3 className="mb-10 text-center text-2xl font-semibold">
              Infrastructure & Flow
            </h3>

            <div className="relative flex justify-center">
              <Image
                src={data.image ?? ""}
                alt={data.imageAlt ?? data.title ?? ""}
                width={1000}
                height={1000}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
