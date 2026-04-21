"use client";

import { motion } from "framer-motion";
import {
  Radio,
  Headphones,
  Signal,
  Zap,
  BarChart3,
  RefreshCw,
  CalendarDays,
  Sliders,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import Marquee from "react-fast-marquee";
import { useTranslations } from "next-intl";
import type { MobileUseCaseSection } from "~/i18n/types/networkMonetization";
import type { Networkmonetization_JsonType } from "~/types/api/networkmonetization_json.types";

const iconMap: Record<string, LucideIcon> = {
  Radio,
  Headphones,
  Signal,
  Zap,
  BarChart3,
  RefreshCw,
  CalendarDays,
  Sliders,
  Wifi,
};

interface MobileUseCaseProps {
  data?: Networkmonetization_JsonType["network_monetization_page"];
}

export default function MobileUseCase({ data }: MobileUseCaseProps) {
  const t = useTranslations();
  const section =
    data?.mobileUseCase ??
    (t.raw("network_monetization_page.mobileUseCase") as MobileUseCaseSection);

  return (
    <>
      <section className="relative overflow-hidden bg-black py-12 text-white">
        <div className="relative mx-auto max-w-7xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-7xl text-center"
          >
            <p className="text-brand-one text-3xl font-semibold">
              {section.title}
            </p>
            <p className="text-2xl">{section.subtitle}</p>
          </motion.div>

          {/* Slider */}
          <Marquee pauseOnHover speed={50} gradient={false} className="py-6">
            {section.useCases.map((item, index) => {
              const Icon = iconMap[item.icon] ?? Radio;
              return (
                <motion.div
                  key={index}
                  className="group relative mx-6 flex h-65 w-80 flex-col rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:bg-blue-500/10 hover:shadow-[0_20px_50px_rgba(59,130,246,0.25)]"
                >
                  {/* Icon */}
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg transition group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-bold transition group-hover:text-blue-400">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="flex-grow text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>

                  {/* Bottom Accent Line */}
                  <div className="mt-6 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-500 group-hover:w-full" />
                </motion.div>
              );
            })}
          </Marquee>
        </div>
      </section>

      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>
    </>
  );
}
