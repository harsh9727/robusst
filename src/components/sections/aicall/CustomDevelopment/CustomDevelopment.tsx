"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Wrench, Layers, Plug } from "lucide-react";
import { platform } from "public";

const features = [
  {
    title: "Post-Deployment Customization",
    description:
      "Tailor conversation flows, agents, and workflows to your exact business needs.",
    icon: Wrench,
    titleColor: "text-pink-600",
    iconStyle: "text-pink-600 bg-pink-100",
  },
  {
    title: "Feature Enhancements",
    description:
      "Add custom fields, integrations, and business logic without downtime.",
    icon: Layers,
    titleColor: "text-blue-600",
    iconStyle: "text-blue-600 bg-blue-100",
  },
  {
    title: "API-Based Extensibility",
    description:
      "Billed per man-hour for development with customizable pricing tiers.",
    icon: Plug,
    titleColor: "text-purple-600",
    iconStyle: "text-purple-600 bg-purple-100",
  },
];

export default function CustomDevelopment() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative w-full h-[300px] md:h-[500px] sm:h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={platform.cmp}
              alt="Custom Development"
              className="object-cover w-full h-full"
            />
          </div>

          {/* glow */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
        </motion.div>
        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-10">
            <span className="text-pink-500">Custom Development</span><br />
            <span className="text-gray-900">& Flexibility</span>
          </h2>

          <div className="space-y-6">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-5 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
                >
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-xl ${item.iconStyle}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className={`text-lg font-semibold ${item.titleColor}`}>
                      {item.title}
                    </h4>
                    <p className="text-gray-600 mt-1">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}