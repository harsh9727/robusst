"use client";

import Image from "next/image";
import {
  Activity,
  TrendingDown,
  MousePointerClick,
  TrendingUp,
} from "lucide-react";
import { platform } from "public";

export default function TelecomBrain() {
  return (
    <section className="relative bg-white py-24 overflow-hidden">
      
      {/* Soft background glow */}
      <div className="absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-pink-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Image */}
          <div className="relative h-[600px] w-full rounded-xl overflow-hidden">
            <Image
              src={platform.cdp1}
              alt="AI Powered Telecom Intelligence"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-4xl font-extrabold leading-tight text-gray-900 lg:text-5xl">
              The Brain Behind <br />
              <span className="text-pink-500">
                Every Custom Telecom Transformation
              </span>
            </h2>
            {/* Feature Cards */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {[
                {
                  icon: Activity,
                  title: "Real-Time Monitoring",
                  desc: "Interactive dashboards with live performance insights.",
                },
                {
                  icon: TrendingDown,
                  title: "Predictive Churn Prevention",
                  desc: "Before & after metric scenarios to reduce customer loss.",
                },
                {
                  icon: MousePointerClick,
                  title: "Smart Tooltips",
                  desc: "Contextual callouts like “+35% ARPU uplift”.",
                },
                {
                  icon: TrendingUp,
                  title: "Revenue Leakage Control",
                  desc: "Identify and recover up to 40% lost revenue.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group rounded-xl border border-gray-200 bg-white p-5
                  transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg
                    bg-gradient-to-br from-blue-500/10 to-pink-500/10
                    text-blue-600"
                  >
                    <item.icon size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
