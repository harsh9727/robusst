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
    title: "Sales Force Automation",
    desc: "Automate sales activities for faster deal closures and higher revenue performance across your sales ecosystem.",
    icon: Cloud,
  },
  {
    title: "Dealer Management System",
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
    <section className="relative overflow-hidden bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <h2 className="mt-5 text-4xl leading-tight font-extrabold text-gray-900 lg:text-5xl">
            Business Automation Products
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-gray-600">
            Touching every stakeholder in your sales network with intelligent,
            scalable, and secure automation solutions.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {products.map((item, i) => (
            <div
              key={i}
              className="group shadow-brand-one border-brand-one relative rounded-[28px] border bg-white p-10 shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_30px]"
            >
              {/* Icon */}
              <div className="relative mb-8">
                <div className="from-brand-one to-brand-one relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>

              <p className="mt-5 text-base leading-relaxed text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
