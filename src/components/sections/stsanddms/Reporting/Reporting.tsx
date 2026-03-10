"use client";

import Image from "next/image";
import { platform } from "public";

export default function PaymentGateway() {
  return (
    <section className="relative overflow-hidden bg-[#0A0D14] py-24">
      {/* Background glow */}
      <div className="blur-[100px] absolute -top-40 -right-40 h-105 w-105 rounded-full bg-cyan-500/20" />
      <div className="blur-[100px] absolute bottom-0 -left-32 h-90 w-90 rounded-full bg-indigo-500/20" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="mt-5 text-4xl font-extrabold text-white lg:text-5xl">
            Reporting & Dashboard
          </h2>

          <p className="m-auto mt-5 max-w-2xl text-lg text-gray-400">
            Transform complex data into actionable insights. Our interactive
            dashboards empower you to monitor KPIs, track progress, and make
            smarter decisions effortlessly.
          </p>
        </div>
        <div className="relative h-137.5 w-full overflow-hidden rounded-2xl border border-gray-800">
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
