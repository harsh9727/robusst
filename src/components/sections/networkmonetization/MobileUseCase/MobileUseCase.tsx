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
    icon: <Radio className="w-6 h-6" />,
    title: "Open RAN",
    description:
      "Enabling Open RAN Deployment and Hybrid Networks Management",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "Service Operations Center",
    description:
      "Boost Customer Experience by Enhancing Service Quality",
  },
  {
    icon: <Signal className="w-6 h-6" />,
    title: "VoLTE Optimization",
    description: "Boosting user experience over LTE",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Smart Energy Saving",
    description:
      "Reducing network energy consumption while ensuring quality subscriber experience",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "HetNet Planning & Optimization",
    description:
      "Solution for managing complexity and densification",
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Spectrum Refarming",
    description:
      "Maximizing return on the existing spectrum resources",
  },
  {
    icon: <CalendarDays className="w-6 h-6" />,
    title: "Special Event Management",
    description:
      "Delivering enhanced mobile user experience in jam-packed venues",
  },
  {
    icon: <Sliders className="w-6 h-6" />,
    title: "Driveless Tuning",
    description:
      "Minimizing drive test efforts to improve efficiency and time to launch new services",
  },
  {
    icon: <Wifi className="w-6 h-6" />,
    title: "IoT Optimization",
    description:
      "Delivering improved coverage and scalability to the hyperconnected world",
  },
];

export default function MobileUseCase() {
  return (
    <section className="relative bg-slate-950 text-white py-24 overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 via-transparent to-cyan-500/10" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-pink-500/20 blur-[140px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full" />
      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-7xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-pink-500 to-fuchsia-400 bg-clip-text text-transparent">
              Network Monetization
            </span>
            <br />
            <span>Other Possible Use Cases for Mobile Operators</span>
          </h2>
        </motion.div>

        {/* Slider */}
        <Marquee pauseOnHover speed={50} gradient={false} className="py-6">
          {useCases.map((item, index) => (
            <motion.div
              key={index}
              className="
                group relative mx-6 w-[320px] h-[260px]
                p-8 rounded-2xl 
                bg-white/5 backdrop-blur-xl 
                border border-white/10 
                hover:border-blue-500/50 
                hover:bg-blue-500/10 
                transition-all duration-300 
                hover:-translate-y-2 
                hover:shadow-[0_20px_50px_rgba(59,130,246,0.25)]
                flex flex-col
              "
            >
              {/* Icon */}
              <div className="
                w-12 h-12 flex items-center justify-center 
                rounded-xl bg-gradient-to-br 
                from-blue-500 to-indigo-600 
                text-white shadow-lg mb-6 
                group-hover:scale-110 transition
              ">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                {item.description}
              </p>

              {/* Bottom Accent Line */}
              <div className="mt-6 h-[2px] w-0 bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}