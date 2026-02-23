"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AlertTriangle, Layers, Clock, Activity } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { platform } from "public";

export default function NetworkOperationsChaos() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-10 text-2xl leading-tight font-extrabold sm:text-3xl md:text-4xl lg:text-[2.65rem]">
              <span className="text-brand-one">Network Operations Chaos</span>
            </h2>

            {/* Light Card */}
            <div className="relative rounded-2xl bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 p-[1px]">
              <div className="rounded-2xl bg-white p-5">
                <Badge className="mb-5 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-600">
                  Traditional NOC environments face critical challenges:
                </Badge>

                <ul className="space-y-5">
                  {/* Item 1 */}
                  <li className="group flex items-start gap-4 rounded-xl p-4 transition-all duration-300 hover:bg-pink-50/60">
                    <div className="rounded-lg bg-pink-50 p-2 transition-colors duration-300 group-hover:bg-pink-100">
                      <Layers className="h-5 w-5 text-pink-600 transition-colors duration-300" />
                    </div>

                    <div>
                      <span className="text-md block font-semibold text-gray-900 transition-colors duration-300 group-hover:text-pink-600">
                        Fragmented Tools
                      </span>
                      <span className="mt-1 block text-sm text-gray-600">
                        10–15 disparate monitoring and management systems
                      </span>
                    </div>
                  </li>

                  {/* Item 2 */}
                  <li className="group flex items-start gap-4 rounded-xl p-4 transition-all duration-300 hover:bg-purple-50/60">
                    <div className="rounded-lg bg-purple-50 p-2 transition-colors duration-300 group-hover:bg-purple-100">
                      <AlertTriangle className="h-5 w-5 text-purple-600 transition-colors duration-300" />
                    </div>

                    <div>
                      <span className="text-md block font-semibold text-gray-900 transition-colors duration-300 group-hover:text-purple-600">
                        Alert Fatigue
                      </span>
                      <span className="mt-1 block text-sm text-gray-600">
                        Thousands of redundant, uncorrelated alarms daily
                      </span>
                    </div>
                  </li>

                  {/* Item 3 */}
                  <li className="group flex items-start gap-4 rounded-xl p-4 transition-all duration-300 hover:bg-blue-50/60">
                    <div className="rounded-lg bg-blue-50 p-2 transition-colors duration-300 group-hover:bg-blue-100">
                      <Clock className="h-5 w-5 text-blue-600 transition-colors duration-300" />
                    </div>

                    <div>
                      <span className="text-md block font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                        High MTTR
                      </span>
                      <span className="mt-1 block text-sm text-gray-600">
                        Hours or days to identify root causes manually
                      </span>
                    </div>
                  </li>

                  {/* Item 4 */}
                  <li className="group flex items-start gap-4 rounded-xl p-4 transition-all duration-300 hover:bg-indigo-50/60">
                    <div className="rounded-lg bg-indigo-50 p-2 transition-colors duration-300 group-hover:bg-indigo-100">
                      <Activity className="h-5 w-5 text-indigo-600 transition-colors duration-300" />
                    </div>

                    <div>
                      <span className="text-md block font-semibold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600">
                        Reactive Operations
                      </span>
                      <span className="mt-1 block text-sm text-gray-600">
                        Always behind the problem
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[580px] w-full overflow-hidden">
              <Image
                src="/solutions/noc/2.webp"
                fill
                alt="Network Operations Discussion"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
