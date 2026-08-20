"use client";

import Image from "next/image";
import type { SanityCustomizedSolutionsSection } from "~/types/sanity/customizedSolutions";

interface ChallengesSectionProps {
  data: SanityCustomizedSolutionsSection<"challenges">;
}

export default function ChallengesSection({ data }: ChallengesSectionProps) {
  if (!data) return null;

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-15 text-center">
          <h2 className="mb-5 text-4xl font-extrabold text-gray-900 lg:text-5xl">
            {data.heading}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {data.subheading}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
          <div className="flex flex-col gap-3">
            {(data.categories ?? []).slice(0, 3).map((item, i) => (
              <div
                key={i}
                className="group shadow-brand-one relative overflow-hidden rounded-[0_18px_18px_0] border border-gray-200 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_35px]"
              >
                <div className="bg-brand-one shadow-brand-one absolute top-0 left-0 h-0 w-1 shadow-[0_0_20px] transition-all duration-500 group-hover:h-full" />
                <div className="pointer-events-none absolute inset-0 bg-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <h3 className="text-brand-one relative mb-6 text-xl leading-snug font-bold">
                  {item.title}
                </h3>

                <ul className="relative list-disc pl-4">
                  {item.points.map((point, idx) => (
                    <li key={idx}>
                      <span className="text-sm leading-relaxed font-medium text-gray-900">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="group-hover:ring-brand-one/25 pointer-events-none absolute inset-0 rounded-[0_18px_18px_0] ring-1 ring-transparent transition duration-500" />
              </div>
            ))}
          </div>

          <div className="relative hidden h-fit w-130 xl:block">
            <Image
              src={data.image ?? ""}
              alt={data.imageAlt ?? data.heading ?? ""}
              width={1000}
              height={1000}
              unoptimized
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-3">
            {(data.categories ?? []).slice(3, 6).map((item, i) => (
              <div
                key={i}
                className="group shadow-brand-one relative overflow-hidden rounded-[0_18px_18px_0] border border-gray-200 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_35px]"
              >
                <div className="bg-brand-one shadow-brand-one absolute top-0 left-0 h-0 w-1 shadow-[0_0_20px] transition-all duration-500 group-hover:h-full" />
                <div className="pointer-events-none absolute inset-0 bg-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <h3 className="text-brand-one relative mb-6 text-xl leading-snug font-bold">
                  {item.title}
                </h3>

                <ul className="relative list-disc pl-4">
                  {item.points.map((point, idx) => (
                    <li key={idx}>
                      <span className="text-sm leading-relaxed font-medium text-gray-900">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="group-hover:ring-brand-one/25 pointer-events-none absolute inset-0 rounded-[0_18px_18px_0] ring-1 ring-transparent transition duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
