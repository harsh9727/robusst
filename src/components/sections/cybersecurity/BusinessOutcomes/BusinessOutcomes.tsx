"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { BusinessOutcomesSection } from "~/i18n/types/cybersecurity";

export default function BusinessOutcomes() {
  const t = useTranslations();
  const section = t.raw(
    "cybersecurity_page.businessOutcomes",
  ) as BusinessOutcomesSection;

  return (
    <section className="bg-white py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-brand-one text-4xl font-extrabold md:text-5xl">
            {section.title}
          </h2>
          <p className="mt-4 text-lg text-black">{section.subtitle}</p>
        </div>

        <div className="grid items-start gap-14 lg:grid-cols-12">
          {/* LEFT IMAGES */}
          <div className="space-y-6 lg:col-span-6">
            <div className="shadow-brand-three relative h-75 w-full overflow-hidden rounded-xl shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_40px] sm:h-125 lg:h-150">
              <Image
                src={section.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                alt={section.imageAlt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT TIMELINE */}
          <div className="relative lg:col-span-6">
            {/* Vertical Line */}
            <div className="absolute top-0 left-5 h-full w-0.5 bg-gradient-to-b from-pink-400 to-pink-500"></div>

            <div className="space-y-7">
              {section.outcomes.map((item, i) => (
                <div key={i} className="flex gap-5">
                  {/* Number Badge */}
                  <div className="relative z-10 flex h-11 min-w-11 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-pink-500 text-sm font-bold text-white">
                    0{i + 1}
                  </div>

                  {/* Content Card */}
                  <div className="shadow-brand-three/80 w-full rounded-xl border border-black/20 bg-black/5 p-5 shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_30px]">
                    <h4 className="mb-2 text-lg font-semibold text-black">
                      {item.title}
                    </h4>
                    <p className="leading-relaxed text-gray-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
