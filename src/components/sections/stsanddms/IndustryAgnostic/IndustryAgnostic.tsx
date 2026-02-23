"use client";

import Image from "next/image";
import { platform } from "public";
import Marquee from "react-fast-marquee";

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
        <div className="flex flex-col gap-2">
          {/* Left Content */}
          <div className="">
            <h2 className="text-5xl leading-tight font-extrabold text-pink-500">
              Industry Agnostic Solution
            </h2>

            <p className="text-md mt-1 text-black">
              Our platform is designed to adapt seamlessly across industries,
              delivering consistent performance, security, and scalability.
            </p>
          </div>

          {/* Industry Cards */}
          <Marquee className="mt-8">
            {industries.map((item, i) => (
              <div key={i} className="group relative mx-5 w-80 rounded-2xl">
                <div className="relative flex h-50 items-center justify-center overflow-hidden rounded-xl bg-[#0b0f1a]">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    className="relative z-10"
                  />
                </div>

                <p className="mt-2 text-center text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-pink-500">
                  {item.title}
                </p>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
