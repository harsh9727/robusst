"use client";

import Image from "next/image";
import { motion, type Variants, type Transition } from "framer-motion";
import { Check } from "lucide-react";
import { platform } from "public";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const hoverTransition: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 14,
};

export default function EnterpriseSupport() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Enterprise Support & SLA
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-8">
  {/* SLA Card */}
  <motion.div
    variants={item}
    whileHover={{ y: -4 }}
    transition={hoverTransition}
    className="relative group"
  >
    {/* animated border glow */}
    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 blur-xl" />

    <div className="relative bg-neutral-900 border border-neutral-800 group-hover:border-blue-500/40 transition-all duration-500 rounded-3xl p-8 shadow-xl">
      <h3 className="text-6xl font-bold text-blue-400 mb-4">60</h3>

      <p className="text-2xl font-semibold text-white mb-2">
        Minutes
      </p>

      <p className="text-neutral-300 mb-3">
        Support Response SLA
      </p>

      <p className="text-neutral-400">
        24/7 monitoring with rapid response and expert support team.
      </p>
    </div>
  </motion.div>

  {/* Features */}
  <motion.div variants={item} className="space-y-5">
    {[
      "Dedicated account manager",
      "Continuous system monitoring",
      "Proactive optimization",
      "Enterprise reliability SLA",
    ].map((feature, i) => (
      <motion.div
        key={i}
        whileHover={{ y: -3 }}
        transition={hoverTransition}
        className="relative group"
      >
        {/* glow */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-lg" />

        <div className="relative flex items-center gap-4 bg-neutral-900 border border-neutral-800 group-hover:border-blue-500/40 transition-all duration-500 rounded-xl p-5">
          <div className="bg-blue-500/10 border border-blue-500/20 group-hover:border-blue-400/40 transition p-2 rounded-lg">
            <Check className="text-blue-400 w-5 h-5" />
          </div>

          <p className="text-neutral-300 group-hover:text-white transition">
            {feature}
          </p>
        </div>
      </motion.div>
    ))}
  </motion.div>
</div>

          {/* Image */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            transition={hoverTransition}
            className="relative group"
          >
            <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-2xl rounded-3xl opacity-60 group-hover:opacity-100 transition duration-500" />

            <div className="relative overflow-hidden rounded-3xl h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px]  w-full border border-neutral-800 shadow-xl">
              <Image 
                src={platform.cmp}
                alt="Enterprise Support"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}