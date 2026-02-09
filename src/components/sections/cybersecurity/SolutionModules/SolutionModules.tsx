"use client";

import { Shield } from "lucide-react";

const modules = [
  "SIEM",
  "SOAR",
  "XDR",
  "Threat Intelligence",
  "VAPT",
  "IAM",
  "MDM",
  "CNAPP",
];

export default function SolutionModules() {
  return (
    <section className="relative bg-[#f8fafc] py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-5xl leading-tight font-extrabold text-black">
            Our Solution <br />
            <span className="text-pink-500">Modules</span>
          </h2>

          <p className="mt-8 max-w-lg text-lg text-gray-600">
            Each Robusst module works as part of a unified cybersecurity
            ecosystem — delivering visibility, intelligence, and rapid response
            across your digital infrastructure.
          </p>
        </div>

        {/* RIGHT – ENHANCED ECOSYSTEM */}
        <div className="relative flex h-[560px] items-center justify-center">
          {/* Soft Gradient Base */}
          <div className="absolute h-[460px] w-[460px] rounded-full bg-gradient-to-br from-pink-100 via-white to-blue-100 blur-xl" />

          {/* Outer Ring */}
          <div className="absolute h-[460px] w-[460px] rounded-full border border-gray-300" />
          <div className="absolute h-[360px] w-[360px] rounded-full border border-dashed border-gray-300" />
          <div className="absolute h-[260px] w-[260px] rounded-full border border-gray-200" />

          {/* Center Core */}
          <div className="absolute z-5 flex h-44 w-44 flex-col items-center justify-center rounded-full border border-gray-200 bg-white shadow-2xl">
            <Shield className="mb-2 text-pink-500" size={34} />
            <p className="font-semibold text-gray-900">MDR Core</p>
            <span className="px-4 text-center text-xs text-gray-500">
              Central Detection & Response Engine
            </span>
          </div>

          {/* Modules */}
          {modules.map((item, i) => {
            const angle = (360 / modules.length) * i;
            return (
              <div
                key={item}
                style={{
                  transform: `rotate(${angle}deg) translate(230px) rotate(-${angle}deg)`,
                }}
                className="absolute z-10"
              >
                <div className="relative">
                  {/* Connector Dot */}

                  {/* Module Card */}
                  <div className="flex h-16 w-36 items-center justify-center rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-800 shadow-md transition hover:border-pink-500 hover:text-pink-600 hover:shadow-lg">
                    {item}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
