"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "~/components/ui/card";
import {
  AlertTriangle,
  Zap,
  Workflow,
  GaugeCircle,
  Boxes,
  BellOff,
  SearchX,
  Timer,
} from "lucide-react";

export default function NetworkChaos() {
  return (
    <section className="relative py-20 bg-[#050b1f] text-white overflow-hidden">
      
      {/* Background Glow (lighter for mobile performance) */}
      <div className="hidden sm:block absolute -top-40 -left-40 w-[400px] lg:w-[500px] h-[400px] lg:h-[500px] bg-pink-600/20 blur-[120px] rounded-full" />
      <div className="hidden sm:block absolute bottom-0 right-0 w-[400px] lg:w-[500px] h-[400px] lg:h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />


      <div className="container relative z-10 mx-auto px-6 lg:px-12 max-w-7xl">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
            The Problem: Network Operations Chaos
          </h2>
          <p className="mt-6 text-lg text-gray-400 font-medium">
            Why Traditional NOC Fail in Modern Networks
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10 items-stretch">

          {/* Left Card */}
          <motion.div
            className="h-full"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-pink-500/40 hover:-translate-y-1 transition-all duration-300 rounded-2xl shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-8 text-pink-500 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  Today's Challenges
                </h3>

                <ul className="space-y-6 text-gray-300">

                  {[
                    { icon: Boxes, text: "10–15 fragmented tools" },
                    { icon: BellOff, text: "95% alert noise & fatigue" },
                    { icon: SearchX, text: "No automated RCA" },
                    { icon: Timer, text: "High MTTR (6+ hours)" },
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-4 group">
                      <div className="p-2.5 rounded-lg bg-pink-500/10 group-hover:bg-pink-500/20 transition">
                        <item.icon className="w-5 h-5 text-pink-500" />
                      </div>
                      <span>{item.text}</span>
                    </li>
                  ))}

                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Card */}
          <motion.div
            className="h-full"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full bg-gradient-to-br from-blue-600/20 to-cyan-500/10 backdrop-blur-xl border border-blue-400/20 hover:border-cyan-400/50 hover:-translate-y-1 transition-all duration-300 rounded-2xl shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-8 text-cyan-300 flex items-center gap-2">
                  <Zap className="w-6 h-6" />
                  Intelligent NOC Solution
                </h3>

                <ul className="space-y-6 text-gray-200">

                  {[
                    { icon: Workflow, text: "Single unified platform" },
                    { icon: Workflow, text: "AI-driven correlation" },
                    { icon: Workflow, text: "Automated workflows" },
                    { icon: GaugeCircle, text: "75% faster resolution" },
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-4 group">
                      <div className="p-2.5 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition">
                        <item.icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <span>{item.text}</span>
                    </li>
                  ))}

                </ul>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}