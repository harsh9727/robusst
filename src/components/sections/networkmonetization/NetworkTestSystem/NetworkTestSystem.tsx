"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Clock,
  Rocket,
  Workflow,
  BarChart3,
  TicketCheck,
  Cpu,
} from "lucide-react";
import { platform } from "public";

const features = [
  {
    icon: Clock,
    title: "Reduces testing time from hours to minutes",
  },
  {
    icon: Rocket,
    title: "Launch new sites faster",
  },
  {
    icon: Workflow,
    title: "Auto-schedule problematic sites",
  },
  {
    icon: Workflow,
    title: "Custom workflows linking site testing",
  },
  {
    icon: BarChart3,
    title: "Deep analytical reporting",
  },
  {
    icon: BarChart3,
    title: "CXO / Operations dashboards",
  },
  {
    icon: TicketCheck,
    title: "Ticketing integration",
  },
  {
    icon: Cpu,
    title: "AI-based troubleshooting",
  },
];

export default function NetworkTestSystem() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Soft Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 via-white to-gray-50" />

      <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-15 max-w-5xl text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="text-blue-600">Network Test System (NTS)</span>
          </h2>

          <p className="text-grey-500 text-lg font-medium">
            Automate and Accelerate Service Testing
          </p>
        </motion.div>

        {/* MAIN LAYOUT */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT FEATURES */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            {/* Glow */}
            <div className="blur-[100px] absolute h-105 w-105 rounded-full bg-gradient-to-tr from-pink-200 to-blue-200" />

            <div className="relative h-75 w-full overflow-hidden rounded-2xl sm:h-112.5 md:h-100 lg:h-125">
              <Image
                src={platform.cmp}
                alt="Network Test System"
                fill
                className="h-full w-full object-cover drop-shadow-[0_40px_60px_rgba(0,0,0,0.25)]"
              />
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-pink-400 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-gray-100 p-3 transition group-hover:bg-pink-50">
                      <Icon
                        size={20}
                        className="text-gray-700 group-hover:text-pink-600"
                      />
                    </div>

                    <p className="leading-relaxed font-medium text-gray-700">
                      {item.title}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
