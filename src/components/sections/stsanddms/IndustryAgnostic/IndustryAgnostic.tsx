"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import type { SanityStsDmsSection } from "~/types/sanity/stsDms";

interface IndustryAgnosticProps {
  data: SanityStsDmsSection<"industryAgnostic">;
}

export default function IndustryAgnostic({ data }: IndustryAgnosticProps) {
  if (!data) return null;

  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-2">
          {/* Left Content */}
          <div className="">
            <h2 className="text-5xl leading-tight font-extrabold text-pink-500">
              {data.title}
            </h2>

            <p className="text-md mt-1 text-black">{data.subtitle}</p>
          </div>

          {/* Industry Cards */}
          <Marquee className="mt-8">
            {(data.industries ?? []).map((item) => {
              if (!item.image) return null;

              return (
                <div
                  key={item._key}
                  className="group relative mx-5 w-40 rounded-2xl"
                >
                  <div className="relative h-40 overflow-hidden rounded-xl bg-[#0b0f1a]">
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.title ?? ""}
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </div>

                  <p className="mt-2 text-center text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-pink-500">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
