"use client";

import {
  MessageCircle,
  Headphones,
  Wifi,
  BarChart3,
} from "lucide-react";

const features = [
  {
    title: "Communication",
    desc: "Clear, real-time interactions across every customer channel.",
    icon: MessageCircle,
  },
  {
    title: "Support",
    desc: "Proactive assistance that builds trust and loyalty.",
    icon: Headphones,
  },
  {
    title: "Data & Insights",
    desc: "Actionable intelligence to optimize every decision.",
    icon: BarChart3,
  },
  {
    title: "Connectivity",
    desc: "Seamless integration across platforms and touchpoints.",
    icon: Wifi,
  },
];

export default function CustomerCentric() {
  return (
    <section className="relative bg-[#0B0F19] py-24 overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-40 -left-40 h-[400px] w-[400px] bg-cyan-500/10 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] bg-purple-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Content */}
          <div>
            <h2 className="text-4xl font-extrabold text-white lg:text-5xl leading-tight">
              Customer-Centric
              <span className="block text-cyan-400">
                by Design
              </span>
            </h2>

            <p className="mt-6 text-lg text-gray-300 max-w-xl">
              Every solution we create begins with your business goals and
              delivers consistent, connected customer experiences.
            </p>

            <ul className="mt-8 space-y-4 text-gray-300">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-cyan-400" />
                Built around your customers, not just technology.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-cyan-400" />
                From engagement to revenue management, every touchpoint matters.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-cyan-400" />
                Inspired by global best practices and proven CX frameworks.
              </li>
            </ul>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((item, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-6
                transition-all duration-300
                hover:-translate-y-1 hover:border-cyan-400/40
                hover:shadow-[0_20px_60px_-20px_rgba(34,211,238,0.45)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl
                  bg-cyan-500/10 text-cyan-400
                  group-hover:bg-cyan-500/20">
                  <item.icon size={22} />
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
