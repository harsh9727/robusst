"use client";

import Image from "next/image";
import type { Cybersecurity_JsonType } from "~/types/api/cybersecurity_json.types";

interface HowItWorksProps {
  data?: Cybersecurity_JsonType["cybersecurity_page"];
}

export default function HowItWorks({ data }: HowItWorksProps) {
  const section = data?.howItWorks;

  if (!section) return null;

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

      <section className="relative overflow-hidden bg-black py-24">
        {/* Background glow */}
        <div className="absolute -top-40 -right-40 h-105 w-105 rounded-full bg-cyan-500/20 blur-[100px]" />
        <div className="absolute bottom-0 -left-32 h-90 w-90 rounded-full bg-indigo-500/20 blur-[100px]" />
        <div className="mx-auto max-w-7xl px-6">
          {/* Heading */}
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-extrabold text-white md:text-5xl">
              {section.title}
            </h2>
            <p className="mt-4 text-lg text-gray-400">{section.subtitle}</p>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-8">
            <div className="grid gap-7 sm:grid-cols-2">
              {section.steps.map((item, i) => (
                <div key={i} className="flex gap-5">
                  {/* Content */}
                  <div className="w-full rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <h4 className="mb-2 text-lg font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="leading-relaxed text-gray-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* RIGHT IMAGE */}
            <Image
              src={section.image}
              width={500}
              height={450}
              alt={section.imageAlt}
              className="animate-float h-full w-full object-cover sm:w-[70%]"
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
}
