"use client";

import Image from "next/image";
import { TrendingUp, BarChart3, Clock, Target, ArrowRight } from "lucide-react";
import { platform } from "public";

export default function SuccessStories() {
  const uspPoints = [
    {
      title: "50% Reduced Logistic Costs",
      text: "Optimized supply chain visibility helped eliminate inefficiencies and reduce operational expenses.",
      icon: TrendingUp,
    },
    {
      title: "2X Increased Sales Efficiency",
      text: "Unified data and real-time insights empowered sales teams to close deals faster.",
      icon: BarChart3,
    },
    {
      title: "70% Faster Order-to-Cash Cycle",
      text: "Automation and process intelligence significantly reduced delays across fulfillment.",
      icon: Clock,
    },
    {
      title: ">80% Forecast Accuracy",
      text: "Advanced analytics and AI-driven demand forecasting improved planning precision.",
      icon: Target,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0A0F1C] py-24">
      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-extrabold text-white md:text-5xl">
            Create Value With Success Stories
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Real business outcomes powered by data-driven intelligence
          </p>
        </div>

        <div className="grid items-start gap-14 lg:grid-cols-12">
          {/* LEFT TIMELINE */}
          <div className="relative lg:col-span-6">
            {/* Vertical Line */}
            <div className="absolute top-0 left-4 h-full w-[2px] bg-gradient-to-b from-cyan-400 to-blue-600"></div>

            <div className="space-y-7">
              {uspPoints.map((item, i) => (
                <div key={i} className="flex gap-5">
                  {/* Bullet Circle */}
                  <div className="relative z-10 flex h-10 min-w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-black">
                    <item.icon size={20} />
                  </div>

                  {/* Content Card */}
                  <div className="w-full rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <h4 className="mb-2 text-lg font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="leading-relaxed text-gray-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="lg:col-span-6">
            <div className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-gray-800">
              <Image
                src={platform.cmp}
                alt="Customer Success Story"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
