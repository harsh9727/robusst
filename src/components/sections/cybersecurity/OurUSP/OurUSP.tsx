"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import type { OurUSPSection } from "~/i18n/types/cybersecurity";

export default function OurUSP() {
  const t = useTranslations();
  const section = t.raw("cybersecurity_page.ourUSP") as OurUSPSection;

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
        <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

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
              <div className="absolute top-0 left-4 h-full w-[2px] bg-gradient-to-b from-cyan-400 to-blue-600"></div>

              <div className="space-y-7">
                {section.uspPoints.map((item, i) => (
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

            {/* RIGHT IMAGE */}
            {/* <div className="space-y-6 lg:col-span-6">
            <div className="relative h-[300px] w-full overflow-hidden rounded-xl sm:h-[500px] lg:h-[600px]">
              <Image
                src="/solutions/cybersecurity/business.webp"
                fill
                alt="Security Dashboard"
                className="h-full w-full object-cover"
              />
            </div>
          </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
