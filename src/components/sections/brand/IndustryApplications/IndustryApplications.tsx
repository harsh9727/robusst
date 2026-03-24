"use client";

import {
  Plane,
  Cpu,
  HeartPulse,
  Landmark,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { IndustryApplicationsSection } from "~/i18n/types/brand";

const iconMap = [Landmark, HeartPulse, ShoppingBag, Plane, ShieldCheck, Cpu];

export const IndustryApplications = () => {
  const t = useTranslations();
  const industrySection = t.raw("brand_page")
    .industryApplications as IndustryApplicationsSection;

  return (
    <section className="w-full overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-16">
      <div className="relative mx-auto max-w-7xl">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <h2 className="mb-4 text-3xl font-extrabold text-gray-900 uppercase">
            {industrySection.heading}
          </h2>

          <p className="text-base leading-relaxed text-gray-700">
            {industrySection.subheading}
          </p>
        </motion.div>

        {/* Marquee */}
        <Marquee pauseOnHover speed={50} className="mt-9">
          {industrySection.industries.map((industry, index) => {
            const Icon = iconMap[index];

            const colors = [
              "bg-indigo-500",
              "bg-sky-500",
              "bg-teal-500",
              "bg-purple-500",
              "bg-red-500",
              "bg-orange-500",
            ];

            const color = colors[index % colors.length] ?? "bg-indigo-500";

            return (
              <IndustryCard
                key={index}
                icon={Icon ? <Icon /> : null}
                title={industry.title}
                desc={industry.description}
                color={color}
                index={index}
              />
            );
          })}
        </Marquee>
      </div>
    </section>
  );
};

/* Industry Card */
const IndustryCard = ({
  icon,
  title,
  desc,
  color,
  index,
}: {
  icon: React.ReactNode | null;
  title: string;
  desc: string;
  color: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -10, scale: 1.05 }}
      className="group mx-5 rounded-2xl border border-gray-200 bg-white p-5 transition hover:shadow-xl"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 10, scale: 1.2 }}
        transition={{ type: "spring", stiffness: 200 }}
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-white ${color}`}
      >
        {icon}
      </motion.div>

      {/* Title */}
      <h3 className="mb-2 text-sm font-semibold text-black">{title}</h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-gray-600">{desc}</p>
    </motion.div>
  );
};