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
    <section className="relative bg-white py-24 overflow-hidden">

      {/* Soft Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 -z-10" />

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl text-center mx-auto mb-15"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-blue-600">
              Network Test System (NTS)
            </span>
          </h2>

          <p className="text-lg font-medium text-grey-500">
            Automate and Accelerate Service Testing
          </p>
        </motion.div>

        {/* MAIN LAYOUT */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT FEATURES */}
                   <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            {/* Glow */}
            <div className="absolute w-[420px] h-[420px] bg-gradient-to-tr from-pink-200 to-blue-200 blur-[120px] rounded-full" />

            <div className="relative overflow-hidden rounded-2xl w-full lg:h-[500px] md:h-[400px] sm:h-[450px] h-[300px]">
              <Image
                src={platform.cmp}
                alt="Network Test System"
                fill
                className="object-cover h-full w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.25)]"
              />
            </div>
          </motion.div>
 

          {/* RIGHT IMAGE */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="
                    group
                    p-6
                    rounded-2xl
                    border border-gray-200
                    bg-white
                    shadow-sm
                    hover:shadow-lg
                    hover:border-pink-400
                    transition-all duration-300
                  "
                >
                  <div className="flex items-center gap-4">

                    <div className="p-3 rounded-xl bg-gray-100 group-hover:bg-pink-50 transition">
                      <Icon
                        size={20}
                        className="text-gray-700 group-hover:text-pink-600"
                      />
                    </div>

                    <p className="text-gray-700 font-medium leading-relaxed">
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