"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Shield } from "lucide-react";

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
    transition: { delay: i * 0.08 },
  }),
};

export default function SecurityCompliance() {
  return (
    <section className="relative overflow-hidden bg-white py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-extrabold text-pink-500 md:text-5xl">
            Security, Privacy & Compliance
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Built with enterprise-grade security and privacy-first
            infrastructure to protect your data and operations.
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-10 p-8 sm:flex-row">
          {/* Left Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -10, scale: 1.02 }}
            className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                className="rounded-xl border border-pink-100 bg-pink-50 p-3"
              >
                <Shield className="h-6 w-6 text-pink-500" />
              </motion.div>

              <h3 className="text-xl font-semibold text-gray-900">
                Data Protection
              </h3>
            </div>

            <ul className="space-y-4 text-gray-600">
              {[
                "Client-controlled storage",
                "Call recordings on your servers",
                "Local network communication",
                "Minimal data exposure",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  className="flex items-center gap-2"
                >
                  <span className="h-2 w-2 rounded-full bg-pink-500"></span>
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
            className="group relative"
          >
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-pink-200 to-purple-200 opacity-60 blur-2xl transition group-hover:opacity-100" />

            <div className="relative h-75 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
              <div className="relative aspect-video h-80 w-100 overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl sm:h-100 sm:w-130">
                <Image
                  src="/solutions/aicall/4.webp"
                  fill
                  alt="Infrastructure Control"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -10, scale: 1.02 }}
            className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: -8, scale: 1.1 }}
                className="rounded-xl border border-green-100 bg-green-50 p-3"
              >
                <CheckCircle className="h-6 w-6 text-green-500" />
              </motion.div>

              <h3 className="text-xl font-semibold text-gray-900">
                Compliance-Ready
              </h3>
            </div>

            <ul className="space-y-4 text-gray-600">
              {[
                "Enterprise security standards",
                "GDPR & data privacy ready",
                "Audit trail & logging",
                "Regular security reviews",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  className="flex items-center gap-2"
                >
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
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
