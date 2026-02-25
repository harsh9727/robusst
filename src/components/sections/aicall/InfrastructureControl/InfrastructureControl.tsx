"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Server, Zap } from "lucide-react";
import { platform } from "public";

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
  visible: (i:any) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 },
  }),
};

export default function InfrastructureControl() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            On-Premise & Infrastructure Control
          </h2>

          <p className="mt-6 text-gray-400 max-w-xl mx-auto text-lg">
            Full control of your infrastructure with enterprise-grade
            performance, security, and scalability.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 items-center">
          {/* Left Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -10, scale: 1.02 }}
            className="group bg-neutral-900/70 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:border-emerald-500/40 hover:shadow-emerald-500/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
              >
                <Server className="w-6 h-6 text-emerald-400" />
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
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-2xl rounded-2xl opacity-60 group-hover:opacity-100 transition" />

            <div className="relative rounded-2xl h-[300px] w-full overflow-hidden border border-neutral-800 shadow-2xl">
              <Image
                src={platform.cmp}
                alt="Infrastructure Control"
                className="object-cover w-full h-full transition duration-700 group-hover:scale-110"
              />
            </div>
          </motion.div>

          {/* Right Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -10, scale: 1.02 }}
            className="group bg-neutral-900/70 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:border-yellow-500/40 hover:shadow-yellow-500/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: -8, scale: 1.1 }}
                className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20"
              >
                <Zap className="w-6 h-6 text-yellow-400" />
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
  );
}