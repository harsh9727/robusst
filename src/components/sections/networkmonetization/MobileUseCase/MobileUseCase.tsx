"use client";

import { motion } from "framer-motion";
import {
  Radio,
  Headphones,
  Signal,
  Zap,
  BarChart3,
  RefreshCw,
  CalendarDays,
  Sliders,
  Wifi,
} from "lucide-react";
import Marquee from "react-fast-marquee";

const useCases = [
  {
    icon: <Radio className="h-6 w-6" />,
    title: "Open RAN",
    description: "Enabling Open RAN Deployment and Hybrid Networks Management",
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: "Service Operations Center",
    description: "Boost Customer Experience by Enhancing Service Quality",
  },
  {
    icon: <Signal className="h-6 w-6" />,
    title: "VoLTE Optimization",
    description: "Boosting user experience over LTE",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Smart Energy Saving",
    description:
      "Reducing network energy consumption while ensuring quality subscriber experience",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "HetNet Planning & Optimization",
    description: "Solution for managing complexity and densification",
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: "Spectrum Refarming",
    description: "Maximizing return on the existing spectrum resources",
  },
  {
    icon: <CalendarDays className="h-6 w-6" />,
    title: "Special Event Management",
    description:
      "Delivering enhanced mobile user experience in jam-packed venues",
  },
  {
    icon: <Sliders className="h-6 w-6" />,
    title: "Driveless Tuning",
    description:
      "Minimizing drive test efforts to improve efficiency and time to launch new services",
  },
  {
    icon: <Wifi className="h-6 w-6" />,
    title: "IoT Optimization",
    description:
      "Delivering improved coverage and scalability to the hyperconnected world",
  },
];

export default function MobileUseCase() {
  return (
    <>
      <section className="relative overflow-hidden bg-black py-12 text-white">
        <div className="relative mx-auto max-w-7xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-7xl text-center"
          >
            <p className="text-brand-one text-3xl font-semibold">
              Network Monetization
            </p>
            <p className="text-2xl">
              Other Possible Use Cases for Mobile Operators
            </p>
          </motion.div>

          {/* Slider */}
          <Marquee pauseOnHover speed={50} gradient={false} className="py-6">
            {useCases.map((item, index) => (
              <motion.div
                key={index}
                className="group relative mx-6 flex h-[260px] w-[320px] flex-col rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:bg-blue-500/10 hover:shadow-[0_20px_50px_rgba(59,130,246,0.25)]"
              >
                {/* Icon */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg transition group-hover:scale-110">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold transition group-hover:text-blue-400">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="flex-grow text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>

                {/* Bottom Accent Line */}
                <div className="mt-6 h-[2px] w-0 bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </Marquee>
        </div>
      </section>

      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>
    </>
  );
}
