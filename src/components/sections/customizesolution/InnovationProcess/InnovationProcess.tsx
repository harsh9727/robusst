"use client";

import { Check, Play, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { YT_VIDEOS } from "~/constants";
import type { Customizesolution_JsonType } from "~/types/api/customizesolution_json.types";

interface InnovationProcessProps {
  data?: Customizesolution_JsonType["customized_solution_page"]["innovationProcess"];
}

export default function InnovationProcess({ data }: InnovationProcessProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  if (!data) return null;

  return (
    <>
      <section className="relative bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Heading */}
          <div className="mb-10 text-center">
            <h2 className="text-4xl leading-tight font-extrabold text-gray-900 lg:text-5xl">
              {data.heading.split("Scalable Innovation")[0]}
              <span className="text-brand-one block">Scalable Innovation</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              {data.subheading}
            </p>
          </div>

          <div
            className="relative mx-auto aspect-video w-full max-w-lg overflow-hidden rounded-xl duration-150"
            onClick={() => setIsVideoOpen(true)}
          >
            <div className="absolute right-5 bottom-5 z-10 flex items-center justify-center gap-2 rounded-full bg-white px-3 py-1 pr-2">
              Play
              <Play fill="#000000" />
            </div>
            <Image
              src="/thumbnail/5.webp"
              alt="Customized Solution"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
              className="h-full w-full object-cover"
            />
          </div>
          {/* Timeline */}
          <div className="relative mt-12">
            {/* Horizontal line */}
            <div className="absolute top-7 right-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

            <div className="relative grid grid-cols-1 gap-14 md:grid-cols-4">
              {data.steps.map((item, i) => (
                <div key={i} className="group flex flex-col items-center">
                  {/* CHECK DOT */}
                  <div className="bg-brand-one shadow-brand-one z-10 flex min-h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_0_8px] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_12px]">
                    <Check size={26} />
                  </div>

                  {/* CARD */}
                  <div className="shadow-brand-one/50 group-hover:border-brand-one mt-10 flex h-full min-h-55 w-full max-w-70 flex-col rounded-2xl border bg-white p-6 text-center shadow-[0_0_0px] duration-150 group-hover:-translate-y-1 group-hover:shadow-[0_0_20px]">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative aspect-video w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white transition-colors hover:text-gray-300"
              aria-label="Close video"
            >
              <X size={32} />
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${YT_VIDEOS.customizedSolutions}?autoplay=1&playsinline=1&rel=0&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
