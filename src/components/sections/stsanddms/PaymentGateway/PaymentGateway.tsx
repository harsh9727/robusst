"use client";

import { CreditCard } from "lucide-react";
import Image from "next/image";
import { platform } from "public";

const items = [
  {
    title: "Swift Redemption",
    desc: "Our Integrated Payment Gateway lets your channel partners begin redeeming rewards within 24 hours of the setup",
  },
  {
    title: "Cost-effective Integration",
    desc: "Save up to ₹1.5 lakh and overwhelming paperwork on traditional bank payment gateway integrations",
  },
  {
    title: "Simplified Documentation",
    desc: "Say goodbye to the cumbersome process of collecting PAN cards from every channel partner for TDS compliance",
  },
  {
    title: "Transparent Pricing",
    desc: "Only pay a straightforward fee of 3%, and there are no transaction costs or hidden charges",
  },
  {
    title: "No Limits",
    desc: "Let your channel partner redeem any amount from their rewards starting from ₹100",
  },
];

export default function PaymentGateway() {
  return (
    <section className="relative overflow-hidden bg-[#0A0D14] py-24">
      {/* Background glow */}
      <div className="absolute -top-40 -right-40 h-105 w-105 rounded-full bg-cyan-500/20 blur-[100px]" />
      <div className="absolute bottom-0 -left-32 h-90 w-90 rounded-full bg-indigo-500/20 blur-[100px]" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-400">
            <CreditCard size={16} />
            Payments Infrastructure
          </div>

          <h2 className="mt-4 text-4xl font-extrabold text-white lg:text-5xl">
            Integrated Payment Gateway
          </h2>

          <p className="mt-6 max-w-2xl text-lg text-gray-400">
            Built for scale, compliance, and frictionless reward redemptions —
            without bank-level complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* LEFT PANEL */}
          <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur">
            {items.map((item, i) => (
              <div
                key={i}
                className="group relative px-8 py-6 transition-all duration-300 hover:bg-white/5"
              >
                {/* Left accent */}
                <span className="absolute top-0 left-0 h-full w-[3px] bg-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Soft glow */}
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <h4 className="text-lg font-medium text-white transition-colors duration-300 group-hover:text-cyan-400">
                  {item.title}
                </h4>

                <p className="mt-1 text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-95 w-full overflow-hidden rounded-2xl border border-gray-800 sm:h-120 lg:h-145">
            <Image
              src={platform.cmp}
              alt="Customer Success Story"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
