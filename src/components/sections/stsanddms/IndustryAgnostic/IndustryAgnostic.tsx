"use client";

import Image from "next/image";
import { platform } from "public";

const industries = [
  { title: "FMCG", icon: platform.cdp1 },
  { title: "Automotive", icon: platform.cdp1 },
  { title: "Paints", icon: platform.cdp1 },
  { title: "Cables & Wires", icon: platform.cdp1 },
  { title: "Dairy", icon: platform.cdp1 },
  { title: "Consumer Durable", icon: platform.cdp1 },
  { title: "Liquor", icon: platform.cdp1 },
  { title: "Building Material", icon: platform.cdp1 },
  { title: "Textile", icon: platform.cdp1 },
  { title: "Cosmetics", icon: platform.cdp1 },
  { title: "Pharmaceutical", icon: platform.cdp1 },
  { title: "Stationery", icon: platform.cdp1 },
];

export default function IndustryAgnostic() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[380px_1fr] items-start">

          {/* Left Content */}
          <div className="sticky top-32">
            <h2 className="text-5xl font-extrabold leading-tight text-pink-500">
              Industry
              <br />
              Agnostic
              <br />
              Solution
            </h2>

            <p className="mt-6 text-black text-md">
              Our platform is designed to adapt seamlessly across industries,
              delivering consistent performance, security, and scalability.
            </p>
          </div>

          {/* Industry Cards */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {industries.map((item, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300
             hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-pink-400"
              >
                <div className="relative flex h-28 items-center justify-center rounded-xl bg-[#0b0f1a] overflow-hidden">
                  {/* Glow layer */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 
                  group-hover:opacity-100
                  bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.35),_transparent_60%)]" />

                  <Image
                    src={item.icon}
                    alt={item.title}
                    className="relative z-10 opacity-90 transition-all duration-300 h-full w-full object-cover 
               group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]"
                  />
                </div>

                <p className="mt-4 text-center text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-pink-500">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}