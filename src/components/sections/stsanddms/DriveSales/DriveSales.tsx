"use client";

import Image from "next/image";
import {
  MapPin,
  Wallet,
  TrendingUp,
  UserCheck
} from "lucide-react";
import { platform } from "public";

const useCases = [
  {
    label: "Live Location Tracking",
    icon: MapPin,
  },
  {
    label: "Save Time & Money",
    icon: Wallet,
  },
  {
    label: "Ease of Use",
    icon: UserCheck,
  },
  {
    label: "Revenue Forecasting",
    icon: TrendingUp,
  },
];

export default function DriveSales() {
  return (
    <section className="relative bg-white px-6 py-28">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-15 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
            Drive Sales and <br />
            <span className="text-pink-500">Grow Your Business!</span>
          </h2>

          {useCases.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="group flex items-center gap-4 mb-3 rounded-xl border border-slate-200 bg-white px-4 py-3 
                 transition-all duration-300 hover:border-pink-300 hover:shadow-md"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg 
                   bg-pink-50 text-pink-500 
                   group-hover:bg-pink-500 group-hover:text-white 
                   transition-colors duration-300"
                >
                  <Icon className="h-5 w-5" />
                </div>

                <span className="text-slate-700 font-semibold text-md">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
        {/* RIGHT VISUAL */}
        <div className="group">
          <div className=" overflow-hidden rounded-xl bg-white h-[430px] w-full border border-slate-200 transition-all duration-300 group-hover:border-pink-300 group-hover:shadow-lg">

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
