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
    <section className="relative py-28 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      
      {/* Soft Background Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-pink-500">
            Core Capabilities
          </h2>
          <p className="mt-6 text-black max-w-2xl mx-auto text-lg">
            Intelligent AI-powered features designed to transform voice operations
            into a scalable, insight-driven platform.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {capabilities.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 ${item.border} hover:-translate-y-2`}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-2xl mb-6 ${item.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-md">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}