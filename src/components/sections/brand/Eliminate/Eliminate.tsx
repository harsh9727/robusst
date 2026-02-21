"use client";

import Image from "next/image";
import { Play, ArrowRight, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { platform } from "public";
import { useState } from "react";

export const Eliminate = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const videoId = "r4DBZZIO2m8";
  return (
    <>
      <section className="relative overflow-hidden bg-white px-6 py-15 sm:px-12 md:py-20 xl:px-25">
        <div className="mx-auto w-full max-w-7xl">
          {/* Heading */}
          <h2 className="mb-10 text-center text-3xl leading-tight font-extrabold text-pink-500 md:text-4xl lg:mb-16">
            Eliminate Spam, Build Trust,
            <br />
            Connect With Confidence
          </h2>

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center gap-25 lg:flex-row">
            {/* LEFT - Video */}
            <div
              className="relative h-80 w-full max-w-xl rounded-lg bg-black"
              onClick={() => setIsVideoOpen(true)}
            >
              <div className="absolute bottom-5 left-5 z-10 flex items-center justify-center gap-2 rounded-full bg-white px-3 py-1 pr-2">
                Play
                <Play fill="#000000" />
              </div>
            </div>

            {/* CENTER IMAGE */}
            <div className="relative flex h-80 w-full max-w-xl items-center">
              <Image
                src="/solutions/brand/11.webp"
                width={800}
                height={800}
                alt="Spam Calls"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Video Modal */}
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
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
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
};
