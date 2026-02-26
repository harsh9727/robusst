"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Shield } from "lucide-react";
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
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08 },
  }),
};

export default function SecurityCompliance() {
  return (
    <section className="relative py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-pink-500">
            Security, Privacy & Compliance
          </h2>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            Built with enterprise-grade security and privacy-first
            infrastructure to protect your data and operations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 items-center">
          {/* Left Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -10, scale: 1.02 }}
            className="group bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                className="p-3 rounded-xl bg-pink-50 border border-pink-100"
              >
                <Shield className="w-6 h-6 text-pink-500" />
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
            className="relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-200 to-purple-200 blur-2xl rounded-2xl opacity-60 group-hover:opacity-100 transition" />

            <div className="relative rounded-2xl h-[300px] w-full overflow-hidden border border-gray-200 shadow-xl">
              <Image
                src={platform.cmp}
                alt="Security Compliance"
                className="object-cover w-full h-full transition duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Right Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -10, scale: 1.02 }}
            className="group bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: -8, scale: 1.1 }}
                className="p-3 rounded-xl bg-green-50 border border-green-100"
              >
                <CheckCircle className="w-6 h-6 text-green-500" />
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
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
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