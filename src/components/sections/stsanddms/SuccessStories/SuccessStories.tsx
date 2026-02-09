"use client";

import Image from "next/image";
import {
  TrendingUp,
  BarChart3,
  Clock,
  Target,
  ArrowRight,
} from "lucide-react";
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
    <section className="relative bg-[#0A0F1C] py-24 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Create Value With Success Stories
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Real business outcomes powered by data-driven intelligence
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-14 items-start">

          {/* LEFT TIMELINE */}
          <div className="lg:col-span-6 relative">

            {/* Vertical Line */}
            <div className="absolute left-4 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-400 to-blue-600"></div>

            <div className="space-y-7">

              {uspPoints.map((item, i) => (
                <div key={i} className="flex gap-5">

                  {/* Bullet Circle */}
                  <div className="relative z-10 flex h-10 min-w-10 items-center justify-center rounded-full 
                    bg-gradient-to-br from-cyan-400 to-blue-600 text-black">
                    <item.icon size={20} />
                  </div>

                  {/* Content Card */}
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 w-full">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      {item.text}
                    </p>
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
                className="object-cover w-full h-full"
              />
            </div>
          </div>

        </div>


      </div>
    </section>
  );
}
