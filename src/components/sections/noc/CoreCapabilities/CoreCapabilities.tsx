"use client";

import { Card, CardContent } from "~/components/ui/card";
import { motion } from "framer-motion";

interface Capability {
  title: string;
  description: string;
  colSpan?: string;
}

const capabilities: Capability[] = [
  {
    title: "FCAPS",
    description:
      "Full lifecycle management across Fault, Configuration, Accounting, Performance, Security",
  },
  {
    title: "AI Analytics",
    description:
      "Real-time correlation, pattern recognition, predictive insights",
  },
  {
    title: "IPAM",
    description:
      "Comprehensive IP address and resource management",
  },
  {
    title: "ITSM Integration",
    description:
      "Seamless ticketing and workflow automation",
    colSpan: "md:col-span-1",
  },
  {
    title: "Multi-Vendor Support",
    description:
      "Works across all technologies and vendors",
    colSpan: "md:col-span-2",
  },
];

export default function CoreCapabilities() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-[#050816] overflow-hidden">
      
      {/* Background Glow */}
      <div className="hidden sm:block absolute -top-40 -left-40 w-[400px] lg:w-[500px] h-[400px] lg:h-[500px] bg-pink-600/20 blur-[120px] rounded-full animate-pulse" />
      <div className="hidden sm:block absolute bottom-0 right-0 w-[400px] lg:w-[500px] h-[400px] lg:h-[500px] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />

      <div className="relative container mx-auto px-4 lg:px-8 max-w-7xl">
        
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-20"
        >
          <span className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
            Core Capabilities
          </span>
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
          className="grid md:grid-cols-3 gap-8 items-stretch"
        >
          {capabilities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex ${item.colSpan || ""}`}
            >
              <Card
                className="
                  group
                  relative
                  w-full
                  h-full
                  bg-[#0b1225]
                  rounded-2xl
                  text-white
                  border border-purple-500/40
                  backdrop-blur-md
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:border-pink-500
                  hover:shadow-[0_0_35px_rgba(236,72,153,0.25)]
                "
              >
                {/* Hover Light Gradient */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
                </div>

                <CardContent className="p-8 flex flex-col justify-between h-full relative z-10">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-blue-400 transition-all duration-300 group-hover:text-pink-400">
                      {item.title}
                    </h3>

                    <p className="text-gray-300 leading-relaxed transition-colors duration-300 group-hover:text-gray-200">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}