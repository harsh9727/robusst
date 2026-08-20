"use client";

import { CheckCircle } from "lucide-react";
import type { SanityCybersecurityPage } from "~/types/sanity/cybersecurity";

interface OurUSPProps {
  data: SanityCybersecurityPage;
}

export default function OurUSP({ data }: OurUSPProps) {
  const section = data?.ourUSP;

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
        {/* Background Glow */}
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

          <div className="items-start gap-14">
            {/* LEFT TIMELINE */}
            <div className="relative lg:col-span-6">
              {/* Vertical Line */}
              <div className="absolute top-0 left-4 h-full w-0.5 bg-gradient-to-b from-cyan-400 to-blue-600"></div>

              <div className="space-y-7">
                {(section.uspPoints ?? []).map((item, i) => (
                  <div key={i} className="flex gap-5">
                    {/* Bullet Circle */}
                    <div className="relative z-10 flex h-10 min-w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-black">
                      <CheckCircle size={20} />
                    </div>

                    {/* Content Card */}
                    <div className="shadow-brand-one/80 hover:border-brand-one w-full rounded-xl border border-black bg-gray-900 p-5 shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_30px]">
                      <h4 className="mb-2 text-lg font-semibold text-white">
                        {item.title}
                      </h4>
                      <p className="leading-relaxed text-gray-400">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full overflow-hidden bg-white">
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
