"use client";

import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { platform } from "public";
const features = [
  "Serialized inventory tracking for SIMs, vouchers, and devices",
  "AI-powered demand sensing and automated stock replenishment",
  "Geo-tagged sales force automation and route optimization",
  "Sales incentives and rewards managed transparently through a digital commission engine",
  "Mobile-enabled field sales apps for anytime-anywhere operation",
];

export default function STS() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* LEFT – Image Block */}
        <div>
          <h2 className="mt-4 text-4xl leading-tight font-extrabold text-black lg:text-5xl">
            Sales Tracking <span className="text-pink-500">System</span>
          </h2>

          <p className="text-md mt-6 max-w-xl font-semibold text-black">
            Achieve 100% real-time sales tracking across your distribution
            channels with
          </p>

          {/* Bullet Points */}
          <div className="mt-5 space-y-5">
            {features.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border border-pink-500 bg-white px-5 py-4 transition hover:translate-x-1 hover:border-pink-500 hover:text-pink-500"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pink-500/15">
                  <CircleCheck className="text-pink-500" size={18} />
                </div>
                <p className="text-black">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT – Content */}
        <div className="relative h-[550px] w-full overflow-hidden rounded-xl border border-white/10">
          <Image
            src={platform.cmp}
            alt="Robusst Cyber Security"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
