"use client";

import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import type { TelecomUseCasesSection } from "~/i18n/types/cdp";

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
    transition: { staggerChildren: 0.15 },
  },
};

export const TelecomUseCases = () => {
  const t = useTranslations();
  const telecomUseCasesSection = t.raw("cdp_page")
    .telecomUseCases as TelecomUseCasesSection;

  return (
    <section className="relative bg-white px-6 py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-15 lg:grid-cols-2">
        
        {/* LEFT CONTENT */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          
          {/* 🔥 Heading */}
          <motion.h2
            variants={fadeUp}
            className="text-4xl leading-tight font-extrabold text-slate-900 md:text-5xl"
          >
            {telecomUseCasesSection.heading.split(" ").map((word, idx) =>
              word === "Telecom" ? (
                <span key={idx} className="text-pink-500">
                  {word}{" "}
                </span>
              ) : (
                word + " "
              ),
            )}
          </motion.h2>

          {/* 🔥 Description */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg text-slate-600"
          >
            {telecomUseCasesSection.description}
          </motion.p>

          {/* 🔥 Use Cases */}
          <motion.div
            variants={stagger}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {telecomUseCasesSection.useCases.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-300 hover:border-pink-300 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pink-50 text-pink-500">
                  <CircleCheck className="h-5 w-5" />
                </div>

                <span className="text-sm font-medium text-slate-700">
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="group"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="shadow-brand-three relative h-82.5 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0px_0px_10px] transition-all duration-300 group-hover:border-pink-300 group-hover:shadow-lg hover:shadow-[0px_0px_50px] sm:h-107.5"
          >
            {/* Image */}
            <Image
              src="/solutions/cdp/3.webp"
              fill
              alt="Telecom Use Cases"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};