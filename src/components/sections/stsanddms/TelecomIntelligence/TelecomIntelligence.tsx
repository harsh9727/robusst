"use client";

import { PlayCircle } from "lucide-react";


export const TelecomIntelligence = () => {
  return (
    <section className="relative bg-white px-6 py-28">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-15 items-center">

        {/* LEFT CONTENT */}
        <div className="flex h-[480px] items-center justify-center overflow-hidden bg-grey-500 rounded-2xl border border-gray-800 bg-black shadow-lg">
          <button className="group flex flex-col items-center gap-4">
            <PlayCircle className="h-20 w-20 text-pink-500 transition group-hover:scale-110" />
            <span className="text-sm font-medium text-white tracking-wide">
              Watch Platform Overview
            </span>
          </button>
        </div>


        {/* RIGHT VISUAL */}
        <div>
          <h2 className="text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl ">
            Digital Intelligence for <br />
            <span className="text-pink-500">
              Telecom Distribution Excellence
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            A unified, AI-driven platform designed to simplify telecom sales,
            distribution, and channel operations — delivering real-time
            visibility and intelligent automation across the ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
};
