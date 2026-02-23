"use client";

import Image from "next/image";
import { Rocket, Plug, RefreshCw } from "lucide-react";
import { platform } from "public";

export const AccelerateValue = () => {
  return (
    <>
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <section className="relative overflow-hidden bg-black px-6 py-24">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="mb-10 text-3xl leading-tight font-extrabold text-white md:text-4xl">
              Accelerates time-to-value and supports complex telecom use cases
            </h2>

            <div className="space-y-6">
              {[
                {
                  icon: Rocket,
                  title: "Fast Commercial Use Case Implementation",
                  desc: "Ready modules for personalized pricing, cross-sell, upsell, renewals, and retention.",
                  color: "cyan",
                },
                {
                  icon: Plug,
                  title: "API Integration",
                  desc: "Real-time access to customer data without middleware.",
                  color: "pink",
                },
                {
                  icon: RefreshCw,
                  title: "Continuous Data Flow",
                  desc: "Keeps every system updated with the latest customer insights.",
                  color: "emerald",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-all hover:bg-white/10"
                >
                  {/* Hover Glow */}
                  <div
                    className={`absolute inset-0 rounded-xl opacity-0 blur-xl transition-opacity group-hover:opacity-100 bg-${item.color}-500/10`}
                  />

                  <div
                    className={`relative flex h-12 w-12 items-center justify-center rounded-lg bg-${item.color}-500/10`}
                  >
                    <item.icon className={`h-6 w-6 text-${item.color}-400`} />
                  </div>

                  <div className="relative">
                    <h4 className="mb-1 font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE WITH AURA */}
          <div className="group shadow-brand-one relative h-[550px] w-full overflow-hidden rounded-2xl shadow-[0px_0px_10px] duration-300 hover:shadow-[0px_0px_50px]">
            <Image
              src="/solutions/cdp/4.webp"
              fill
              alt="AI Powered Customer Data Platform"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </div>
        </div>
      </section>
      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>
    </>
  );
};
