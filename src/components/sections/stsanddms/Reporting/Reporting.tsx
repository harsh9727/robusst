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
    <section className="relative bg-[#0A0D14] py-24 overflow-hidden">

      {/* Background glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-10 text-center">


          <h2 className="mt-5 text-4xl font-extrabold text-white lg:text-5xl">
            Reporting & Dashboard
          </h2>

          <p className="mt-5 max-w-2xl m-auto text-lg text-gray-400">
            Transform complex data into actionable insights. Our
            interactive dashboards empower you to monitor KPIs,
            track progress, and make smarter decisions effortlessly.
          </p>
        </div>
        <div className="relative h-[550px] w-full overflow-hidden rounded-2xl border border-gray-800">
          <Image
            src={platform.cmp}
            alt="Customer Success Story"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
