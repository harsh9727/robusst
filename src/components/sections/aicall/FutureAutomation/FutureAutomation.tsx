"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useTranslations } from "next-intl";
import type { FutureAutomationSection } from "~/i18n/types/aiCall";
import Link from "next/link";

const FutureAutomation = () => {
  const t = useTranslations();
  const futureAutomation = t.raw(
    "ai_call_page.futureAutomation",
  ) as FutureAutomationSection;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-50 py-28 sm:py-36">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -right-32 -bottom-32 h-[28rem] w-[28rem] rounded-full bg-indigo-200/40 blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-6xl"
          >
            {futureAutomation.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-lg leading-8 text-black"
          >
            {futureAutomation.description}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            {/* Primary Button */}
            <Link href={futureAutomation.ctaLink}>
              <Button
                size="lg"
                className="group relative overflow-hidden px-8 py-6 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-300/40"
              >
                <Calendar className="mr-2 h-5 w-5 transition-transform group-hover:rotate-6" />
                {futureAutomation.ctaText}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FutureAutomation;
