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
    <section className="relative bg-[#f8fafc] py-32">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-5xl font-extrabold text-black leading-tight">
            Our Solution <br />
            <span className="text-pink-500">Modules</span>
          </h2>

          <p className="mt-8 text-gray-600 max-w-lg text-lg">
            Each Robusst module works as part of a unified cybersecurity
            ecosystem — delivering visibility, intelligence, and rapid
            response across your digital infrastructure.
          </p>
        </div>

        {/* RIGHT – ENHANCED ECOSYSTEM */}
        <div className="relative flex items-center justify-center h-[560px]">

          {/* Soft Gradient Base */}
          <div className="absolute w-[460px] h-[460px] rounded-full bg-gradient-to-br from-pink-100 via-white to-blue-100 blur-xl" />

          {/* Outer Ring */}
          <div className="absolute w-[460px] h-[460px] rounded-full border border-gray-300" />
          <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-gray-300" />
          <div className="absolute w-[260px] h-[260px] rounded-full border border-gray-200" />

          {/* Center Core */}
          <div className="absolute z-5 flex flex-col items-center justify-center w-44 h-44 rounded-2xl bg-white shadow-2xl border border-gray-200">
            <Shield className="text-pink-500 mb-2" size={34} />
            <p className="font-semibold text-gray-900">MDR Core</p>
            <span className="text-xs text-gray-500 text-center px-4">
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
                  <div className="w-36 h-16 bg-white border border-gray-200 rounded-xl shadow-md flex items-center justify-center text-sm font-medium text-gray-800 hover:border-pink-500 hover:text-pink-600 hover:shadow-lg transition">
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
