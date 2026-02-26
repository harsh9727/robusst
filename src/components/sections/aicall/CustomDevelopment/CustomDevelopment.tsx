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
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* LEFT CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative h-[300px] w-full overflow-hidden rounded-3xl shadow-2xl sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <Image
              src={platform.cmp}
              alt="Custom Development"
              className="h-full w-full object-cover"
            />
          </div>

          {/* glow */}
          <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-blue-200 opacity-40 blur-3xl"></div>
        </motion.div>
        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-10 text-4xl leading-tight font-extrabold md:text-5xl">
            <span className="text-pink-500">Custom Development</span>
            <br />
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
                  className="flex items-start gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition duration-300 hover:shadow-xl"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconStyle}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h4 className={`text-lg font-semibold ${item.titleColor}`}>
                      {item.title}
                    </h4>
                    <p className="mt-1 text-gray-600">{item.description}</p>
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
