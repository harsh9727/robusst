"use client";

import Image from "next/image";
import { Network, Layers, ShieldCheck, ArrowRight } from "lucide-react";
import { platform } from "public";

export default function XDR() {
  return (
    <section className="relative bg-white py-32 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6">

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-12 gap-14 items-center">

          {/* LEFT IMAGE */}

          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-pink-50 border border-pink-400 text-pink-500 text-sm font-semibold mb-5">
              <Network size={16} />
              XDR Module
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
              Extended Detection & Response
            </h2>

            <p className="mt-5 text-lg text-pink-500 font-medium mb-10">
              Unified platform for endpoint, network, cloud, identity
              and email detection.
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
                className="group flex gap-5 items-start p-6 rounded-2xl
                bg-white border border-gray-200
                transition-all duration-300
                hover:border-pink-400 hover:shadow-lg mb-5"
              >
                <div className="flex h-12 min-w-12 items-center justify-center rounded-xl
                  bg-gradient-to-br from-pink-400 to-pink-500
                  text-white transition-transform duration-300
                  group-hover:scale-110">
                  <item.icon size={20} />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-pink-500 transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}

          </div>

          {/* RIGHT CONTENT */}

          <div className="lg:col-span-6">

            <div className="relative h-[600px] w-full overflow-hidden rounded-3xl
              border border-gray-200 shadow-xl
              transition-transform duration-500 hover:-translate-y-2">
              <Image
                src={platform.cmp}
                alt="XDR Unified Detection"
                className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
        {/* WHY IT MATTERS */}
        <div className="mt-20 flex items-center gap-3 rounded-2xl bg-gray-50 border border-gray-200 p-5">
          <ArrowRight className="text-rose-600 mt-1" size={28} />
          <p className="text-gray-700 text-lg leading-relaxed">
            <span className="font-bold text-gray-900 uppercase">Why it matters :</span>{" "}
            When attackers traverse more than one surface, you need unified
            visibility and response across your entire environment.
          </p>
        </div>
      </div>
    </section>
  );
}
