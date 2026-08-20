"use client";

import { Play, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { SanityStsDmsSection } from "~/types/sanity/stsDms";

type Props = {
  data: SanityStsDmsSection<"telecomIntelligence">;
};

export const TelecomIntelligence = ({ data }: Props) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  if (!data) return null;

  return (
    <>
      <section className="relative bg-white px-6 py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-15 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div
            className="relative h-80 w-full max-w-xl overflow-hidden rounded-lg bg-black"
            onClick={() => setIsVideoOpen(true)}
          >
            <Image
              src={data.videoThumbnail ?? ""}
              alt={data.videoThumbnailAlt ?? data.title ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-5 left-5 z-10 flex items-center justify-center gap-2 rounded-full bg-white px-3 py-1 pr-2">
              {data.playButtonText}
              <Play fill="#000000" />
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div>
            <h2 className="text-3xl leading-tight font-extrabold text-gray-900 lg:text-4xl">
              {data.title} <br />
              <span className="text-pink-500">{data.titleHighlight}</span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              {data.description}
            </p>
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
              aria-label={data.closeButtonText ?? ""}
            >
              <X size={32} />
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${data.videoId}?autoplay=1&playsinline=1&rel=0&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
              title={data.playerTitle ?? ""}
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
};
