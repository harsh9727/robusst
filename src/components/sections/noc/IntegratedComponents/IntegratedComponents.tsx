"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const featuresLeft = [
  "Unified Fault Management",
  "Performance Monitoring & Analytics",
  "Configuration & Change Management",
  "IPAM & Resource Management",
];

const featuresRight = [
  "Service Assurance & SLA Tracking",
  "Network Topology & Discovery",
  "Security & Compliance Monitoring",
  "Workflow & ITSM Integration",
];

export default function IntegratedComponents() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-[#050816] overflow-hidden">

      {/* Background Glow (lighter for mobile performance) */}
      <div className="hidden sm:block absolute -top-40 -left-40 w-[400px] lg:w-[500px] h-[400px] lg:h-[500px] bg-pink-600/20 blur-[120px] rounded-full" />
      <div className="hidden sm:block absolute bottom-0 right-0 w-[400px] lg:w-[500px] h-[400px] lg:h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />


      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-5">
            <span className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
              8 Integrated Components. One Platform.
            </span>
          </h2>

          <p className="text-gray-300 text-sm md:text-lg">
            Replace 10–15 Legacy Tools | 60% Licensing Cost Reduction
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Left Card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-blue-400/40 transition duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]"
          >
            <ul className="space-y-5">
              {featuresLeft.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-300 group-hover:text-white transition"
                >
                  <CheckCircle className="text-blue-400 mt-1" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-pink-400/40 transition duration-500 hover:shadow-[0_0_40px_rgba(236,72,153,0.25)]"
          >
            <ul className="space-y-5">
              {featuresRight.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-300 group-hover:text-white transition"
                >
                  <CheckCircle className="text-pink-400 mt-1" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}