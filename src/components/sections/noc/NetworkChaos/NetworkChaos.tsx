"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "~/components/ui/card";
import {
  AlertTriangle,
  Zap,
  Workflow,
  GaugeCircle,
  Boxes,
  BellOff,
  SearchX,
  Timer,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { NetworkChaosSection } from "~/i18n/types/noc";

const iconMap: Record<string, LucideIcon> = {
  AlertTriangle,
  Zap,
  Workflow,
  GaugeCircle,
  Boxes,
  BellOff,
  SearchX,
  Timer,
};

export default function NetworkChaos() {
  const t = useTranslations();
  const section = t.raw("noc_page.networkChaos") as NetworkChaosSection;

  const TodayIcon = iconMap[section.todaysChallenges.icon] ?? AlertTriangle;
  const SolutionIcon = iconMap[section.intelligentSolution.icon] ?? Zap;

  return (
    <>
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <section className="relative overflow-hidden bg-black py-20 text-white">
        <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-12">
          {/* Heading */}
          <div className="mb-16 text-center">
            <h2 className="text-brand-two font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
              {section.title}
            </h2>
            <p className="mt-6 text-2xl font-medium text-gray-400 sm:text-4xl">
              {section.subtitle}
            </p>
          </div>

          {/* Grid */}
          <div className="grid items-stretch gap-10 md:grid-cols-2">
            {/* Left Card */}
            <motion.div
              className="h-full"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full w-full rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/40">
                <CardContent className="p-8">
                  <h3 className="mb-8 flex items-center gap-2 text-2xl font-semibold text-pink-500">
                    <TodayIcon className="h-6 w-6" />
                    {section.todaysChallenges.title}
                  </h3>

                  <ul className="space-y-6 text-gray-300">
                    {section.todaysChallenges.items.map((item, index) => {
                      const ItemIcon = iconMap[item.icon] ?? Boxes;
                      return (
                        <li
                          key={index}
                          className="group flex items-center gap-4"
                        >
                          <div className="rounded-lg bg-pink-500/10 p-2.5 transition group-hover:bg-pink-500/20">
                            <ItemIcon className="h-5 w-5 text-pink-500" />
                          </div>
                          <span>{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Card */}
            <motion.div
              className="h-full"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-600/20 to-cyan-500/10 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50">
                <CardContent className="p-8">
                  <h3 className="mb-8 flex items-center gap-2 text-2xl font-semibold text-cyan-300">
                    <SolutionIcon className="h-6 w-6" />
                    {section.intelligentSolution.title}
                  </h3>

                  <ul className="space-y-6 text-gray-200">
                    {section.intelligentSolution.items.map((item, index) => {
                      const ItemIcon = iconMap[item.icon] ?? Workflow;
                      return (
                        <li
                          key={index}
                          className="group flex items-center gap-4"
                        >
                          <div className="rounded-lg bg-cyan-500/10 p-2.5 transition group-hover:bg-cyan-500/20">
                            <ItemIcon className="h-5 w-5 text-cyan-400" />
                          </div>
                          <span>{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
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
