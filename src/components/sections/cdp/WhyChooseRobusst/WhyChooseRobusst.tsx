"use client";

import Image from "next/image";
import {
  Layers,
  Fingerprint,
  Megaphone,
  Brain,
  ShieldCheck,
  Cloud,
} from "lucide-react";

import { platform } from "public";

const features = [
  {
    title: "Agile Data Unification",
    icon: Layers,
  },
  {
    title: "Identity Resolution",
    icon: Fingerprint,
  },
  {
    title: "Omnichannel Campaigns",
    icon: Megaphone,
  },
  {
    title: "AI-Powered Insights",
    icon: Brain,
  },
  {
    title: "Privacy & Compliance",
    icon: ShieldCheck,
  },
  {
    title: "Flexible Deployment",
    icon: Cloud,
  },
];

export const WhyChooseRobusst = () => {
  return (
    <section className="relative bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-16">
          <h2 className="text-4xl text-center font-extrabold text-black leading-tight">
            WHY CHOOSE ROBUSST
            <br />
            <span className="text-pink-500">AI POWERED CVM & CDP?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* LEFT – Feature List */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group flex items-center gap-4 rounded-full border border-sky-200 px-6 py-4 transition hover:border-pink-400 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-sky-500 group-hover:bg-pink-50 group-hover:text-pink-500 transition">
                    <Icon size={20} />
                  </div>
                  <p className="font-semibold text-gray-900">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>

          {/* RIGHT – Illustration */}
          <div className="lg:col-span-5 ">
            <div className="h-[300px] w-full overflow-hidden rounded-lg">
              <Image src={platform.cmp} alt="Customer 360 View" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
