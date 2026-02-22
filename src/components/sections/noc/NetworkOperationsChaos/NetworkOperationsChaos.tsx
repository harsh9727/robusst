"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AlertTriangle, Layers, Clock, Activity } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { platform } from "public";

export default function NetworkOperationsChaos() {
  return (
    <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-extrabold leading-tight mb-10">
              <span className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
                Network Operations Chaos
              </span>
            </h2>

            {/* Light Card */}
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500">
              <div className="rounded-2xl bg-white p-5">


                <Badge className="bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 text-sm rounded-full mb-5">
                  Traditional NOC environments face critical challenges:
                </Badge>

                <ul className="space-y-5">

                  {/* Item 1 */}
                  <li className="group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-pink-50/60">
                    <div className="p-2 rounded-lg bg-pink-50 transition-colors duration-300 group-hover:bg-pink-100">
                      <Layers className="w-5 h-5 text-pink-600 transition-colors duration-300" />
                    </div>

                    <div>
                      <span className="block text-md font-semibold text-gray-900 transition-colors duration-300 group-hover:text-pink-600">
                        Fragmented Tools
                      </span>
                      <span className="block text-gray-600 text-sm mt-1">
                        10–15 disparate monitoring and management systems
                      </span>
                    </div>
                  </li>

                  {/* Item 2 */}
                  <li className="group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-purple-50/60">
                    <div className="p-2 rounded-lg bg-purple-50 transition-colors duration-300 group-hover:bg-purple-100">
                      <AlertTriangle className="w-5 h-5 text-purple-600 transition-colors duration-300" />
                    </div>

                    <div>
                      <span className="block text-md font-semibold text-gray-900 transition-colors duration-300 group-hover:text-purple-600">
                        Alert Fatigue
                      </span>
                      <span className="block text-gray-600 text-sm mt-1">
                        Thousands of redundant, uncorrelated alarms daily
                      </span>
                    </div>
                  </li>

                  {/* Item 3 */}
                  <li className="group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-blue-50/60">
                    <div className="p-2 rounded-lg bg-blue-50 transition-colors duration-300 group-hover:bg-blue-100">
                      <Clock className="w-5 h-5 text-blue-600 transition-colors duration-300" />
                    </div>

                    <div>
                      <span className="block text-md font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                        High MTTR
                      </span>
                      <span className="block text-gray-600 text-sm mt-1">
                        Hours or days to identify root causes manually
                      </span>
                    </div>
                  </li>

                  {/* Item 4 */}
                  <li className="group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-indigo-50/60">
                    <div className="p-2 rounded-lg bg-indigo-50 transition-colors duration-300 group-hover:bg-indigo-100">
                      <Activity className="w-5 h-5 text-indigo-600 transition-colors duration-300" />
                    </div>

                    <div>
                      <span className="block text-md font-semibold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600">
                        Reactive Operations
                      </span>
                      <span className="block text-gray-600 text-sm mt-1">
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
            <div className="relative rounded-2xl h-[580px] w-full rounded-xl overflow-hidden shadow-lg">
              <Image
                src={platform.cmp}
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