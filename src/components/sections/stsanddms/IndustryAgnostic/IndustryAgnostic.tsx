"use client";

import Image from "next/image";
import { platform } from "public";
import Marquee from "react-fast-marquee";
import {
  ShoppingCart,
  Car,
  Paintbrush,
  Cable,
  Milk,
  Tv,
  Wine,
  Building2,
  Shirt,
  Sparkles,
  Pill,
  Pencil,
} from "lucide-react";

const industries = [
  { title: "FMCG", icon: ShoppingCart },
  { title: "Automotive", icon: Car },
  { title: "Paints", icon: Paintbrush },
  { title: "Cables & Wires", icon: Cable },
  { title: "Dairy", icon: Milk },
  { title: "Consumer Durable", icon: Tv },
  { title: "Liquor", icon: Wine },
  { title: "Building Material", icon: Building2 },
  { title: "Textile", icon: Shirt },
  { title: "Cosmetics", icon: Sparkles },
  { title: "Pharmaceutical", icon: Pill },
  { title: "Stationery", icon: Pencil },
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
            {industries.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="group relative mx-5 w-40 rounded-2xl">
                  <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl bg-[#0b0f1a]">
                    <Icon size={30} className="text-white" />
                  </div>

                  <p className="mt-2 text-center text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-pink-500">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
