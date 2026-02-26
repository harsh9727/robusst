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
    
    <>
      
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>
      
    <section className="relative overflow-hidden bg-black py-32">
      {/* Background Glow */}

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <h2 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Enterprise Support & SLA
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          <div className="space-y-8">
            {/* SLA Card */}
            <motion.div
              variants={item}
              whileHover={{ y: -4 }}
              transition={hoverTransition}
              className="group relative"
            >
              {/* animated border glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/30 to-cyan-500/30 opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />

              <div className="relative rounded-3xl border border-neutral-800 bg-neutral-900 p-8 shadow-xl transition-all duration-500 group-hover:border-blue-500/40">
                <h3 className="mb-4 text-6xl font-bold text-blue-400">60</h3>

                <p className="mb-2 text-2xl font-semibold text-white">
                  Minutes
                </p>

                <p className="mb-3 text-neutral-300">Support Response SLA</p>

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
                  className="group relative"
                >
                  {/* glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 blur-lg transition duration-500 group-hover:opacity-100" />

                  <div className="relative flex items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-5 transition-all duration-500 group-hover:border-blue-500/40">
                    <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-2 transition group-hover:border-blue-400/40">
                      <Check className="h-5 w-5 text-blue-400" />
                    </div>

                    <p className="text-neutral-300 transition group-hover:text-white">
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
            className="group relative"
          >
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-60 blur-2xl transition duration-500 group-hover:opacity-100" />

            <div className="relative h-[300px] w-full overflow-hidden rounded-3xl border border-neutral-800 shadow-xl sm:h-[400px] md:h-[500px] lg:h-[650px]">
              <Image
                src={platform.cmp}
                alt="Enterprise Support"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </motion.div>
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
