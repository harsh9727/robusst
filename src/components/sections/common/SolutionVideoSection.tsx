"use client";

import Image from "next/image";
import { Play, X } from "lucide-react";
import { useState } from "react";

interface SolutionVideoSectionProps {
  thumbnail?: string | null;
  thumbnailAlt?: string | null;
  videoId?: string | null;
  playerTitle?: string | null;
  playLabel?: string | null;
  closeLabel?: string | null;
}

export function SolutionVideoSection({
  thumbnail,
  thumbnailAlt,
  videoId,
  playerTitle,
  playLabel,
  closeLabel,
}: SolutionVideoSectionProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  if (!thumbnail || !videoId || !playLabel || !closeLabel) return null;

  return (
    <>
      <section className="relative overflow-hidden bg-white px-5 py-16 sm:py-24">
        <button
          type="button"
          onClick={() => setIsVideoOpen(true)}
          className="group relative mx-auto block aspect-video w-full max-w-4xl cursor-pointer overflow-hidden rounded-2xl bg-black text-left shadow-xl"
          aria-label={playLabel}
        >
          <Image
            src={thumbnail}
            alt={thumbnailAlt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover transition duration-300 group-hover:scale-[1.02] group-hover:brightness-75"
          />
          <span className="absolute right-5 bottom-5 z-10 flex items-center gap-2 rounded-full bg-white px-4 py-2 font-medium text-black shadow-lg sm:right-7 sm:bottom-7">
            {playLabel}
            <Play className="h-5 w-5" fill="currentColor" aria-hidden="true" />
          </span>
        </button>
      </section>

      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={playLabel}
        >
          <div
            className="relative aspect-video w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white transition-colors hover:text-gray-300"
              aria-label={closeLabel}
            >
              <X size={32} />
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
              title={playerTitle ?? playLabel}
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
