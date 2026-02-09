"use client";

import {
  Cloud,
  HeartHandshake,
  ShieldCheck,
  Boxes,
  BadgeCheck,
  Headset,
  Sparkles,
} from "lucide-react";

const products = [
  {
    title: "SFA",
    subtitle: "Sales Force Automation",
    desc: "Automate sales activities for faster deal closures and higher revenue performance across your sales ecosystem.",
    icon: Cloud,
  },
  {
    title: "DMS",
    subtitle: "Dealer Management System",
    desc: "Achieve complete channel transparency and optimize dealer performance with cloud-driven management tools.",
    icon: Boxes,
  },
  {
    title: "Influencer Loyalty & Rewards",
    desc: "Drive product advocacy using QR-based loyalty programs designed for influencers and retail partners.",
    icon: HeartHandshake,
  },
  {
    title: "Inventory & Dispatch",
    desc: "Enable real-time inventory visibility and seamless dispatch operations with QR-enabled automation.",
    icon: BadgeCheck,
  },
  {
    title: "Product Authentication",
    desc: "Protect your brand with secure authentication and real-time product traceability across the supply chain.",
    icon: ShieldCheck,
  },
  {
    title: "Warranty & Support System",
    desc: "Enhance post-sales trust through digitized warranty management and responsive support workflows.",
    icon: Headset,
  },
];

export default function BusinessAutomation() {
  return (
    <section className="relative bg-white py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 border border-pink-500 text-sm font-semibold text-pink-500">
            <Sparkles className="h-4 w-4" />
            Platform Capabilities
          </div>

          <h2 className="mt-5 text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Business Automation Products
          </h2>

          <p className="mt-5 text-lg text-gray-600 leading-relaxed">
            Touching every stakeholder in your sales network with intelligent,
            scalable, and secure automation solutions.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-[28px] bg-white p-10
  transition-all duration-500 ease-out
  shadow-[0_10px_30px_rgba(0,0,0,0.06)]
  hover:-translate-y-1
  hover:shadow-[0_20px_50px_rgba(236,72,153,0.18)]
  "
            >
              {/* Icon */}
              <div className="relative mb-8">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-pink-500 ">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900">
                {item.title}
              </h3>

              {item.subtitle && (
                <p className="mt-1 text-sm font-semibold text-pink-600">
                  {item.subtitle}
                </p>
              )}

              <p className="mt-5 text-base text-gray-600 leading-relaxed">
                {item.desc}
              </p>

              {/* Accent */}
              <div className="mt-8 h-[3px] w-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-70" />
            </div>
          ))}
        </div>
      </div>


    </section>
  );
}
