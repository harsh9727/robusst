"use client";

import Image from "next/image";
import { CircleCheck, ShieldCheck } from "lucide-react";
import { platform } from "public";
const points = [
  {
    title: "Builds Trust",
    desc: "Establishes confidence with enterprise-grade security controls."
  },
  {
    title: "Prevents System Damage",
    desc: "Stops threats before they impact critical infrastructure."
  },
  {
    title: "Protects Sensitive Data",
    desc: "Safeguards customer and business data at every layer."
  },
  {
    title: "Supports Business Continuity",
    desc: "Ensures uninterrupted operations even during cyber incidents."
  },
];

export default function WhyRobusst() {
  return (
    <section className="relative py-24 overflow-hidden">


      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT – Image Block */}
        <div>
          <span className="text-sm font-semibold text-pink-500 py-2 px-4 border rounded-full w-fit border-pink-500 bg-pink-50">
            Why Choose Robusst
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-black leading-tight lg:text-4xl">
            Robusst Empowers <br />
            <span className="text-pink-500">Telecom Businesses</span>
          </h2>

          <p className="mt-6 text-black text-md max-w-xl">
            Robusst delivers unified defence across your entire digital
            infrastructure — combining zero-trust architecture, AI-driven
            intelligence and 24×7 expert monitoring.
          </p>

          {/* Bullet Points */}
          <div className="mt-5 space-y-6">
            {points.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 group"
              >
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-pink-50 border border-pink-500 group-hover:border-pink-400/40 transition">
                  <CircleCheck className="text-pink-500" size={20} />
                </div>

                <div>
                  <h4 className="text-black group-hover:text-pink-500 font-medium">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 group-hover:text-black">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT – Content */}
        <div className="relative overflow-hidden rounded-xl border border-white/10 h-[550px] w-full">
          <Image
            src={platform.cmp}
            alt="Robusst Cyber Security"
            className="object-cover w-full h-full"
          />
        </div>


      </div>
    </section>
  );
}
