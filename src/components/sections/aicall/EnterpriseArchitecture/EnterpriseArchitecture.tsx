"use client";

import { motion } from "framer-motion";
import { Smartphone, Cpu, BarChart3, Server } from "lucide-react";
import Image from "next/image";

export default function EnterpriseArchitecture() {
  return (
    <section className="bg-gray-50 py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-extrabold text-pink-500 md:text-5xl">
            Enterprise Deployment Architecture
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-black">
            Secure, scalable, and enterprise-ready AI deployment built for
            reliability, compliance, and performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          {/* LEFT SIDE - col-md-4 */}
          {/* LEFT SIDE - Premium Card Style */}
          <div className="space-y-8 md:col-span-12">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {[
                {
                  title: "Voice Input",
                  description: "Mobile, PSTN, Airtel SIP gateway integration",
                  icon: Smartphone,
                  color: "text-blue-600 bg-blue-100",
                  border: "hover:border-blue-300",
                },
                {
                  title: "Local Processing",
                  description: "On-premise AI models, transcription, storage",
                  icon: Cpu,
                  color: "text-emerald-600 bg-emerald-100",
                  border: "hover:border-emerald-300",
                },
                {
                  title: "Intelligence Layer",
                  description: "Dashboard, APIs, real-time analytics engine",
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
                    className={`group rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition-all duration-300 hover:shadow-2xl ${item.border}`}
                  >
                    {/* Icon */}
                    <div
                      className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-xl font-semibold text-gray-900 transition group-hover:text-blue-600">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-md leading-relaxed text-gray-600">
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
            className="rounded-3xl px-8 py-10 md:col-span-12"
          >
            <h3 className="mb-10 text-center text-2xl font-semibold">
              Infrastructure & Flow
            </h3>

            <div className="relative flex justify-center">
              <Image
                src="/solutions/aicall/16.webp"
                alt="image"
                width={1000}
                height={1000}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
