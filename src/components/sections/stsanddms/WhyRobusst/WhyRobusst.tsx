"use client";

import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { stsanddms } from "public";
const points = [
  {
    title: "Builds Trust",
    desc: "Establishes confidence with enterprise-grade security controls.",
  },
  {
    title: "Prevents System Damage",
    desc: "Stops threats before they impact critical infrastructure.",
  },
  {
    title: "Protects Sensitive Data",
    desc: "Safeguards customer and business data at every layer.",
  },
  {
    title: "Supports Business Continuity",
    desc: "Ensures uninterrupted operations even during cyber incidents.",
  },
];

export default function WhyRobusst() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* LEFT – Image Block */}
        <div>
          <span className="w-fit rounded-full border border-pink-500 bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-500">
            Why Choose Robusst
          </span>

          <h2 className="mt-4 text-3xl leading-tight font-extrabold text-black lg:text-4xl">
            Robusst Empowers <br />
            <span className="text-pink-500">Telecom Businesses</span>
          </h2>

          <p className="text-md mt-6 max-w-xl text-black">
            Robusst delivers unified defence across your entire digital
            infrastructure — combining zero-trust architecture, AI-driven
            intelligence and 24×7 expert monitoring.
          </p>

          {/* Bullet Points */}
          <div className="mt-5 space-y-6">
            {points.map((item, i) => (
              <div key={i} className="group flex gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-pink-500 bg-pink-50 transition group-hover:border-pink-400/40">
                  <CircleCheck className="text-pink-500" size={20} />
                </div>

                <div>
                  <h4 className="font-medium text-black group-hover:text-pink-500">
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
        <div className="relative h-[550px] w-full overflow-hidden rounded-xl border border-white/10">
          <Image
            src={stsanddms.TelecomBusiness}
            alt="Robusst Cyber Security"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
