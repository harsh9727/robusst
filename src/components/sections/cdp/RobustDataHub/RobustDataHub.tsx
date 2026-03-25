"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "~/components/ui/button";
import { platform } from "public";

// Animations
const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const RobustDataHub = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden bg-[#050816] px-6 py-24"
    >
      {/* Background */}
      <div className="absolute -top-32 -left-32 h-125 w-125 bg-cyan-500/20 blur-[100px]" />
      <div className="absolute right-0 bottom-0 h-125 w-125 bg-purple-600/20 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        
        {/* LEFT */}
        <motion.div variants={container}>
          <motion.h2 variants={fadeUp} className="mb-8 text-4xl font-extrabold text-white md:text-5xl">
            ROBUSST <span className="ml-4 text-pink-500">DATA HUB</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mb-6 text-gray-300">
            <strong className="text-pink-500">Problem Solved : </strong>
            Siloed customer data scattered across multiple systems leads to fragmented views.
          </motion.p>

          <motion.p variants={fadeUp} className="text-gray-300">
            <strong className="text-pink-500">Robusst Data Hub </strong>
            unifies customer data into a real-time single source of truth.
          </motion.p>

          <motion.div variants={fadeUp}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="mt-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-10 py-6 text-white">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div variants={scaleIn} className="flex justify-center">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <div className="relative h-72 w-full overflow-hidden rounded-2xl">
              <Image src={platform.cmp} alt="Robust Data Hub" fill className="object-cover" />
            </div>

            <div className="mt-6 space-y-4 text-sm text-gray-300">
              {[
                { label: "CRM", value: "Connected" },
                { label: "Billing", value: "Unified" },
                { label: "Network", value: "Real-Time" },
                { label: "Digital Channels", value: "Synced" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-cyan-300">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
};