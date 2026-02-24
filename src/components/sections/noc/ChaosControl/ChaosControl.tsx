"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Cpu, BrainCircuit, ShieldCheck, Network } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { platform } from "public";

export default function ChaosControl() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="mx-auto mb-10 w-fit text-2xl leading-tight font-extrabold sm:text-3xl md:text-4xl lg:text-[2.65rem]">
          <span className="text-brand-one">From Chaos to Control</span>
        </h2>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="shadow-brand-one relative h-[380px] w-full overflow-hidden rounded-xl shadow-[0px_0px_0px] duration-200 hover:shadow-[0px_0px_30px]">
              <Image
                src="/solutions/noc/4.webp"
                fill
                alt="Network Operations Discussion"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl bg-white p-5">
              <ul className="space-y-5">
                {/* Item 1 */}
                <li className="group flex items-start gap-4 rounded-xl p-4 transition-all duration-300 hover:bg-pink-50/60">
                  <div className="rounded-lg bg-pink-50 p-2 transition-colors duration-300 group-hover:bg-pink-100">
                    <Cpu className="h-5 w-5 text-pink-600 transition-colors duration-300" />
                  </div>

                  <div>
                    <span className="text-md block font-semibold text-gray-900 transition-colors duration-300 group-hover:text-pink-600">
                      Automation-First Architecture
                    </span>
                    <span className="mt-1 block text-sm text-gray-600">
                      Built for autonomous operations from the ground up
                    </span>
                  </div>
                </li>

                {/* Item 2 */}
                <li className="group flex items-start gap-4 rounded-xl p-4 transition-all duration-300 hover:bg-purple-50/60">
                  <div className="rounded-lg bg-purple-50 p-2 transition-colors duration-300 group-hover:bg-purple-100">
                    <BrainCircuit className="h-5 w-5 text-purple-600 transition-colors duration-300" />
                  </div>

                  <div>
                    <span className="text-md block font-semibold text-gray-900 transition-colors duration-300 group-hover:text-purple-600">
                      Predictive Analytics
                    </span>
                    <span className="mt-1 block text-sm text-gray-600">
                      AI identifies issues before they impact services
                    </span>
                  </div>
                </li>

                {/* Item 3 */}
                <li className="group flex items-start gap-4 rounded-xl p-4 transition-all duration-300 hover:bg-blue-50/60">
                  <div className="rounded-lg bg-blue-50 p-2 transition-colors duration-300 group-hover:bg-blue-100">
                    <ShieldCheck className="h-5 w-5 text-blue-600 transition-colors duration-300" />
                  </div>

                  <div>
                    <span className="text-md block font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                      Proactive Operations
                    </span>
                    <span className="mt-1 block text-sm text-gray-600">
                      Shift from reactive firefighting to prevention
                    </span>
                  </div>
                </li>

                {/* Item 4 */}
                <li className="group flex items-start gap-4 rounded-xl p-4 transition-all duration-300 hover:bg-indigo-50/60">
                  <div className="rounded-lg bg-indigo-50 p-2 transition-colors duration-300 group-hover:bg-indigo-100">
                    <Network className="h-5 w-5 text-indigo-600 transition-colors duration-300" />
                  </div>

                  <div>
                    <span className="text-md block font-semibold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600">
                      Context-Aware Intelligence
                    </span>
                    <span className="mt-1 block text-sm text-gray-600">
                      Full topology and dependency understanding
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
