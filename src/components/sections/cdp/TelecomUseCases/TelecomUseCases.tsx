"use client";

import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { platform } from "public";

const useCases = [
  "Product & Application Intent",
  "Exit & Drop-off Engagement",
  "Ad Targeting & Retargeting",
  "Partner & Combo Offers",
  "Switching & Acquisition Campaigns",
  "Corporate & Broadband Plans",
];

export const TelecomUseCases = () => {
  return (
    <section className="relative bg-white px-6 py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-15 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl leading-tight font-extrabold text-slate-900 md:text-5xl">
            Use Cases for <span className="text-pink-500">Telecom</span>
          </h2>

          <p className="mt-6 max-w-xl text-lg text-slate-600">
            Drive intelligent, real-time engagement across telecom journeys with
            precision targeting and personalization.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {useCases.map((item, i) => (
              <div
                key={i}
                className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-300 hover:border-pink-300 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pink-50 text-pink-500">
                  <CircleCheck className="h-5 w-5" />
                </div>

                <span className="text-sm font-medium text-slate-700">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="group">
          <div className="h-[430px] w-full overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 group-hover:border-pink-300 group-hover:shadow-lg">
            {/* Image */}
            <Image
              src={platform.cmp}
              alt="Telecom Use Cases"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
