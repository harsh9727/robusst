"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";
import { platform } from "public";

export default function OurUSP() {
  const uspPoints = [
    {
      title: "Open Architecture",
      text: "Works seamlessly with your existing tools and technology stack.",
    },
    {
      title: "Full-Service Model",
      text: "Get technology plus managed operations — not just software.",
    },
    {
      title: "Modern Cloud Ready",
      text: "Built for hybrid & cloud environments — identity-centric, AI-driven, future-proof.",
    },
    {
      title: "Expert Guidance",
      text: "We don't just alert — we help you fix, improve, and evolve your security posture.",
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
            OUR USP
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Why organizations choose our security platform
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
                    <CheckCircle size={20} />
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
                alt="Our USP Platform"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 flex items-start gap-3 rounded-xl border border-gray-800 p-5">
          <ArrowRight className="mt-1 text-cyan-400" size={24} />
          <p className="text-lg text-gray-300">
            <span className="font-semibold text-white uppercase">
              One Unified Platform :
            </span>{" "}
            Technology, operations, and intelligence — all delivered as a single
            security ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
}
