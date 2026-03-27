"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Server, Zap } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const listVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 },
  }),
};

export default function InfrastructureControl() {
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

      <section className="relative overflow-hidden bg-black py-24">
        {/* Background Glow */}

        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
              On-Premise & Infrastructure Control
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-400">
              Full control of your infrastructure with enterprise-grade
              performance, security, and scalability.
            </p>
          </motion.div>

          <div className="flex flex-col items-center justify-center gap-10 p-8 sm:flex-row">
            {/* Left Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group w-full rounded-2xl border border-neutral-800 bg-neutral-900/70 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 hover:shadow-emerald-500/10"
            >
              <div className="mb-6 flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3"
                >
                  <Server className="h-6 w-6 text-emerald-400" />
                </motion.div>

                <h3 className="text-xl font-semibold text-white">
                  Your Servers
                </h3>
              </div>

              <ul className="space-y-4 text-neutral-300">
                {[
                  "Client-owned hardware",
                  "Buy or rent options",
                  "Full data ownership",
                  "Zero external exposure",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-center gap-2"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6 }}
              className="group relative"
            >
              <div className="relative aspect-video h-80 w-100 overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl sm:h-100 sm:w-130">
                <Image
                  src="/solutions/aicall/3.webp"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                  alt="Infrastructure Control"
                />
              </div>
            </motion.div>

            {/* Right Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group w-full rounded-2xl border border-neutral-800 bg-neutral-900/70 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-yellow-500/40 hover:shadow-yellow-500/10"
            >
              <div className="mb-6 flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: -8, scale: 1.1 }}
                  className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-3"
                >
                  <Zap className="h-6 w-6 text-yellow-400" />
                </motion.div>

                <h3 className="text-xl font-semibold text-white">
                  Performance
                </h3>
              </div>

              <ul className="space-y-4 text-neutral-300">
                {[
                  "Low-latency processing",
                  "Real-time call handling",
                  "Seamless system integration",
                  "Enterprise scalability",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-center gap-2"
                  >
                    <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
                    {item}
                  </motion.li>
                ))}
              </ul>
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
