"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  PhoneCall,
  Route,
  BarChart3,
  Cloud,
} from "lucide-react";
import { platform } from "public";

const solutions = [
  {
    title: "AI Voice Agents",
    description:
      "Inbound & outbound calling with human-like conversations.",
    icon: PhoneCall,
    color: "text-blue-600 bg-blue-100",
  },
  {
    title: "Intelligent Routing",
    description:
      "Only valid calls routed to human agents.",
    icon: Route,
    color: "text-emerald-600 bg-emerald-100",
  },
  {
    title: "Real-Time Analytics",
    description:
      "Live insights on call sentiment, intent, and outcomes.",
    icon: BarChart3,
    color: "text-purple-600 bg-purple-100",
  },
  {
    title: "Flexible Deployment",
    description:
      "On-premise, private cloud, or hybrid setup.",
    icon: Cloud,
    color: "text-pink-600 bg-pink-100",
  },
];

export default function SolutionOverview() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-10">
            <span className="text-pink-600">Solution</span>{" "}
            <span className="text-gray-900">Overview</span>
          </h2>

          <div className="space-y-6">
            {solutions.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-5 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
                >
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-xl ${item.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
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

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative rounded-3xl lg:h-[600px] md:h-[500px] sm:h-[400px] h-[300px] w-full overflow-hidden shadow-2xl">
            <Image
              src={platform.cmp}
              alt="AI Voice Solution"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Soft Decorative Glow */}
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
        </motion.div>
      </div>
    </section>
  );
}