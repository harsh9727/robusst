"use client";

import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { platform } from "public";
import { useTranslations } from "next-intl";
import type { TelecomUseCasesSection } from "~/i18n/types/cdp";

export const TelecomUseCases = () => {
  const t = useTranslations();
  const telecomUseCasesSection = t.raw("cdp_page")
    .telecomUseCases as TelecomUseCasesSection;

  return (
    <section className="relative bg-white px-6 py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-15 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl leading-tight font-extrabold text-slate-900 md:text-5xl">
            {telecomUseCasesSection.heading.split(" ").map((word, idx) =>
              word === "Telecom" ? (
                <span key={idx} className="text-pink-500">
                  {word}
                </span>
              ) : idx < telecomUseCasesSection.heading.split(" ").length - 1 ? (
                word + " "
              ) : (
                word
              ),
            )}
          </h2>

          <p className="mt-6 max-w-xl text-lg text-slate-600">
            {telecomUseCasesSection.description}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {telecomUseCasesSection.useCases.map((item, i) => (
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
          <div className="shadow-brand-three relative h-[330px] sm:h-[430px] w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0px_0px_10px] transition-all duration-300 group-hover:border-pink-300 group-hover:shadow-lg hover:shadow-[0px_0px_50px]">
            {/* Image */}
            <Image
              src="/solutions/cdp/3.webp"
              fill
              alt="Telecom Use Cases"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
