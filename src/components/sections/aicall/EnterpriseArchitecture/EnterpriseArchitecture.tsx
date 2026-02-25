"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Cpu,
  BarChart3,
  Server,
} from "lucide-react";

export default function EnterpriseArchitecture() {
  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-pink-500">
            Enterprise Deployment Architecture
          </h2>
          <p className="mt-6 text-black max-w-2xl mx-auto text-lg">
            Secure, scalable, and enterprise-ready AI deployment built for
            reliability, compliance, and performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-14">

          {/* LEFT SIDE - col-md-4 */}
          {/* LEFT SIDE - Premium Card Style */}
          <div className="md:col-span-12 space-y-8">

            <div className="grid md:grid-cols-3 grid-cols-1 gap-10">

              {[
                {
                  title: "Voice Input",
                  description:
                    "Mobile, PSTN, Airtel SIP gateway integration",
                  icon: Smartphone,
                  color: "text-blue-600 bg-blue-100",
                  border: "hover:border-blue-300",
                },
                {
                  title: "Local Processing",
                  description:
                    "On-premise AI models, transcription, storage",
                  icon: Cpu,
                  color: "text-emerald-600 bg-emerald-100",
                  border: "hover:border-emerald-300",
                },
                {
                  title: "Intelligence Layer",
                  description:
                    "Dashboard, APIs, real-time analytics engine",
                  icon: BarChart3,
                  color: "text-pink-600 bg-pink-100",
                  border: "hover:border-pink-300",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    className={`group bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 ${item.border}`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 flex items-center justify-center rounded-2xl mb-6 ${item.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-md">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}

            </div>

          </div>

          {/* RIGHT SIDE - col-md-12 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-12 bg-white border border-gray-200 rounded-3xl py-10 px-8 shadow-xl"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-10 text-center">
              Infrastructure & Flow
            </h3>

  <div className="relative">

  {/* Circle + Line Row */}
  <div className="relative grid lg:grid-cols-6 items-start mb-12">

    {/* Horizontal line */}
    <div className="hidden lg:block absolute left-0 right-0 top-5 h-[2px] bg-indigo-200"></div>

    {[
      {
        title: "Session Border Controller",
        desc: "Handles VoIP gateway & routing",
      },
      {
        title: "SIP Servers",
        desc: "Real-time call management & signaling",
      },
      {
        title: "Processing Servers",
        desc: "Transcription, AI inference, analysis",
      },
      {
        title: "Storage Layer",
        desc: "RAID storage for call recordings & data",
      },
      {
        title: "Human Handoff",
        desc: "Seamless agent escalation when needed",
      },
      {
        title: "Cloud Hybrid",
        desc: "Optional cloud LLM integration (GCP, Gemini)",
      },
    ].map((step, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ y: -6 }}
        className="relative flex flex-col items-center text-center group cursor-pointer"
      >
        {/* Circle */}
        <div
          className="relative z-10 w-10 h-10 flex items-center justify-center 
                     rounded-full bg-indigo-600 text-white text-sm font-semibold 
                     shadow-md transition-all duration-300
                     group-hover:scale-110
                     group-hover:shadow-indigo-500/40"
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Title */}
        <h4 className="mt-6 text-base font-semibold text-gray-900 transition-all duration-300 group-hover:text-indigo-600">
          {step.title}
        </h4>

        {/* Description */}
        <p className="text-gray-600 mt-2 text-sm leading-relaxed px-3 transition-all duration-300 group-hover:text-gray-800">
          {step.desc}
        </p>
      </motion.div>
    ))}
  </div>
</div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}