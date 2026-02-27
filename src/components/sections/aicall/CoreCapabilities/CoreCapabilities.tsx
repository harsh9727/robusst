"use client";

import { motion } from "framer-motion";
import {
  PhoneCall,
  Tags,
  Brain,
  Users,
  FileText,
  LayoutDashboard,
} from "lucide-react";
import Image from "next/image";

const capabilities = [
  {
    title: "AI Voice Agents",
    description:
      "Inbound & outbound calling with natural conversations in Indian and English languages.",
    icon: PhoneCall,
    color: "text-blue-600 bg-blue-100",
    border: "hover:border-blue-300",
  },
  {
    title: "Call Categorization",
    description:
      "Semantic understanding to classify calls by intent, topic, and urgency.",
    icon: Tags,
    color: "text-emerald-600 bg-emerald-100",
    border: "hover:border-emerald-300",
  },
  {
    title: "Sentiment & Intent Analysis",
    description:
      "Real-time detection of customer emotion and conversation direction.",
    icon: Brain,
    color: "text-pink-600 bg-pink-100",
    border: "hover:border-pink-300",
  },
  {
    title: "Demographics Insights",
    description:
      "Gender identification and demographic profiling for targeted strategies.",
    icon: Users,
    color: "text-indigo-600 bg-indigo-100",
    border: "hover:border-indigo-300",
  },
  {
    title: "Auto-Summarization",
    description:
      "AI-generated call summaries and transcripts for audit and training.",
    icon: FileText,
    color: "text-teal-600 bg-teal-100",
    border: "hover:border-teal-300",
  },
  {
    title: "Integrated Dashboards",
    description:
      "Real-time KPIs, call history, and performance metrics at a glance.",
    icon: LayoutDashboard,
    color: "text-purple-600 bg-purple-100",
    border: "hover:border-purple-300",
  },
];

export default function CoreCapabilities() {
  return (
    <section className="relative overflow-hidden bg-white py-28">
      {/* Soft Background Glow */}
      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-blue-200 opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-pink-200 opacity-30 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-extrabold text-pink-500 md:text-5xl">
            Core Capabilities
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-black">
            Intelligent AI-powered features designed to transform voice
            operations into a scalable, insight-driven platform.
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-20 xl:flex-row">
          <div className="">
            <Image
              src="/solutions/aicall/12.webp"
              alt="image"
              width={450}
              height={900}
              className="h-100 max-w-50 min-w-50 sm:h-190"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            {capabilities.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group w-full max-w-sm rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl ${item.border} hover:-translate-y-2`}
                >
                  {/* Icon */}
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  {/* Title */}
                  <h3 className="mb-3 text-xl font-semibold text-gray-900 transition group-hover:text-blue-600">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-md leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="">
            <Image
              src="/solutions/aicall/13.webp"
              alt="image"
              width={450}
              height={900}
              className="h-100 max-w-50 min-w-50 sm:h-190"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
