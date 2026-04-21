"use client";

import { motion } from "framer-motion";
import {
  Users,
  Cpu,
  BarChart3,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { MonetizationFrameworkSection } from "~/i18n/types/networkMonetization";
import type { Networkmonetization_JsonType } from "~/types/api/networkmonetization_json.types";

const iconMap: Record<string, LucideIcon> = {
  Users,
  Cpu,
  BarChart3,
  Settings2,
};

interface MonetizationFrameworkProps {
  data?: Networkmonetization_JsonType["network_monetization_page"];
}

export default function MonetizationFramework({
  data,
}: MonetizationFrameworkProps) {
  const t = useTranslations();
  const section =
    data?.monetizationFramework ??
    (t.raw(
      "network_monetization_page.monetizationFramework",
    ) as MonetizationFrameworkSection);

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 via-white to-gray-50" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-blue-600 sm:text-4xl md:text-5xl">
            {section.title}
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {section.frameworks.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Users;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                {/* Glow Border */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.glow} opacity-0 blur transition duration-500 group-hover:opacity-100`}
                />

                {/* Card */}
                <div className="relative h-full rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-xl">
                  {/* Icon */}
                  <div
                    className={`mb-6 inline-flex rounded-xl p-4 text-white ${item.color}`}
                  >
                    <Icon size={26} />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
