"use client";

import { Card, CardContent } from "~/components/ui/card";
import { motion, type Variants } from "framer-motion";
import { Wifi, Landmark, ShoppingCart, HeartPulse } from "lucide-react";
import type { SanityCustomerDataPlatformSection } from "~/types/sanity/customerDataPlatform";

const iconMap = [Wifi, Landmark, ShoppingCart, HeartPulse];
const gradientMap = [
  "from-cyan-400 to-blue-600",
  "from-pink-400 to-purple-600",
  "from-cyan-400 to-blue-600",
  "from-pink-400 to-purple-600",
];

// ✅ Animations
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

interface IndustryApplicationsProps {
  data: SanityCustomerDataPlatformSection<"industryApplications">;
}

export const IndustryApplications = ({ data }: IndustryApplicationsProps) => {
  if (!data) return null;

  return (
    <>
      {/* TOP WAVE */}
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <section className="relative overflow-hidden bg-black py-24">
        {/* 🔥 Animated Background Glow */}
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -right-40 h-105 w-105 rounded-full bg-cyan-500/20 blur-[100px]"
        />

        <motion.div
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.3, 1] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute bottom-0 -left-32 h-90 w-90 rounded-full bg-indigo-500/20 blur-[100px]"
        />

        <div className="relative mx-auto max-w-7xl">
          {/* 🔥 Heading */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-extrabold text-white md:text-5xl"
            >
              {(data.heading ?? "").split(" ").map((word, idx) =>
                word === "Applications" ? (
                  <span key={idx} className="text-pink-500">
                    {word}{" "}
                  </span>
                ) : (
                  word + " "
                ),
              )}
            </motion.h2>

            <motion.p variants={fadeUp} className="mt-4 text-lg text-slate-400">
              {data.subheading}
            </motion.p>
          </motion.div>

          {/* 🔥 Cards Grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {(data.industries ?? []).map((item, i) => {
              const Icon = iconMap[i];
              const gradient = gradientMap[i];
              if (!Icon) return null;

              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -10, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 120 }}
                >
                  <Card className="group relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)]">
                    {/* Glow Border */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${gradient}`}
                    />
                    <div className="absolute inset-[1px] rounded-xl bg-slate-950" />

                    <CardContent className="relative z-10 p-6">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 8, scale: 1.1 }}
                        className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradient}`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </motion.div>

                      {/* Content */}
                      <h3 className="mb-2 text-xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-400">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* BOTTOM WAVE */}
      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg viewBox="0 0 1200 150" preserveAspectRatio="none">
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
          />
        </svg>
      </div>
    </>
  );
};
