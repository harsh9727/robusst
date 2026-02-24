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
    description: "Comprehensive IP address and resource management",
  },
  {
    title: "ITSM Integration",
    description: "Seamless ticketing and workflow automation",
    colSpan: "md:col-span-1",
  },
  {
    title: "Multi-Vendor Support",
    description: "Works across all technologies and vendors",
    colSpan: "md:col-span-1",
  },
  {
    title: "Automation & Orchestration",
    description: "End-to-end workflow automation & auto-remediation",
    colSpan: "md:col-span-1",
  },
];

export default function CoreCapabilities() {
  return (
    <>
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <section className="relative overflow-hidden bg-black py-16 sm:py-20 lg:py-28">
        <div className="relative container mx-auto max-w-7xl px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-20 text-center text-4xl font-bold text-white md:text-5xl"
          >
            <span className="text-brand-one">Core Capabilities</span>
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.15 }}
            className="grid items-stretch gap-8 md:grid-cols-3"
          >
            {capabilities.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex ${item.colSpan || ""}`}
              >
                <Card className="group relative h-full w-full rounded-2xl border border-purple-500/40 bg-[#0b1225] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-pink-500 hover:shadow-[0_0_35px_rgba(236,72,153,0.25)]">
                  {/* Hover Light Gradient */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
                  </div>

                  <CardContent className="relative z-10 flex h-full flex-col justify-between p-8">
                    <div>
                      <h3 className="mb-4 text-2xl font-semibold text-blue-400 transition-all duration-300 group-hover:text-pink-400">
                        {item.title}
                      </h3>

                      <p className="leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
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
