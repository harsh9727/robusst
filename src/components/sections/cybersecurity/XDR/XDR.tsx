"use client";

import Image from "next/image";
import { Network, Layers, ShieldCheck, ArrowRight } from "lucide-react";
import { platform } from "public";

export default function XDR() {
  return (
    <section className="relative overflow-hidden bg-white py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* MAIN GRID */}
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* LEFT IMAGE */}

          <div className="lg:col-span-6">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-400 bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-500">
              <Network size={16} />
              XDR Module
            </div>

            <h2 className="mb-5 text-4xl font-extrabold text-gray-900 md:text-5xl">
              Extended Detection & Response
            </h2>

            <p className="mt-5 mb-10 text-lg font-medium text-pink-500">
              Unified platform for endpoint, network, cloud, identity and email
              detection.
            </p>

            {[
              {
                icon: Layers,
                title: "Signals Across Environments",
                text: "Evolves from EDR by merging and correlating signals across endpoint, network, cloud and identity.",
              },
              {
                icon: ShieldCheck,
                title: "Multi-Vector Threat Detection",
                text: "Detects attacks that move across multiple surfaces and provides richer investigation context.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group mb-5 flex items-start gap-5 rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-pink-400 hover:shadow-lg"
              >
                <div className="flex h-12 min-w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-pink-500 text-white transition-transform duration-300 group-hover:scale-110">
                  <item.icon size={20} />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-pink-500">
                    {item.title}
                  </h4>
                  <p className="mt-2 leading-relaxed text-gray-600">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT CONTENT */}

          <div className="lg:col-span-6">
            <div className="relative h-150 w-full overflow-hidden rounded-3xl border border-gray-200 shadow-xl transition-transform duration-500 hover:-translate-y-2">
              <Image
                src={platform.cmp}
                alt="XDR Unified Detection"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
        {/* WHY IT MATTERS */}
        <div className="mt-20 flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <ArrowRight className="mt-1 text-rose-600" size={28} />
          <p className="text-lg leading-relaxed text-gray-700">
            <span className="font-bold text-gray-900 uppercase">
              Why it matters :
            </span>{" "}
            When attackers traverse more than one surface, you need unified
            visibility and response across your entire environment.
          </p>
        </div>
      </div>
    </section>
  );
}
