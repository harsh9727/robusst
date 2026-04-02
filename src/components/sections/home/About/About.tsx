"use client";
import React, { useState } from "react";
import Image from "next/image";
import { about } from "public";
import type { Home_JsonType } from "~/types/api/home_json.types";
import { AnimatedText } from "~/components/ui/TextAnimation";
import { Play, X } from "lucide-react";
import { YT_VIDEOS } from "~/constants";

interface AboutProps {
  data?: Home_JsonType["about"];
}

export const About: React.FC<AboutProps> = ({ data }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  if (!data) return null;
  return (
    <>
      <div className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden px-6 py-16 sm:gap-8 sm:px-12 sm:py-32 lg:px-25 lg:py-25">
        <section className="flex flex-col justify-center gap-1 text-center">
          <AnimatedText
            text={data.heading}
            className="text-2xl font-black sm:text-3xl lg:text-5xl"
            as="h2"
          />
          <p className="text-muted-foreground px-4 text-base font-medium sm:text-lg">
            {data.subheading}
          </p>
        </section>
        <section className="grid items-center gap-6 px-0 sm:gap-9 xl:grid-cols-2">
          <div
            className="shadow-brand-one group relative aspect-video h-full cursor-pointer overflow-hidden rounded-xl shadow-[0px_0px_10px] duration-150 hover:-translate-y-4 hover:shadow-[0px_0px_50px]"
            onClick={() => setIsVideoOpen(true)}
          >
            <div className="absolute bottom-5 left-5 z-10 flex items-center justify-center gap-2 rounded-full bg-white px-3 py-1 pr-2">
              Play
              <Play fill="#000000" />
            </div>
            <Image
              src={about}
              alt="About Robusst — AI-powered telecom solutions"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
              className="object-cover object-top duration-150 group-hover:brightness-50"
            />
          </div>
          <div className="flex w-full flex-col gap-4 sm:gap-5">
            {data.paragraphs.map((para, index) => (
              <p
                key={index}
                className="mx-auto max-w-full px-4 text-base leading-relaxed sm:max-w-160 sm:px-0 sm:text-lg sm:leading-tight lg:max-w-200 lg:text-xl"
              >
                {para}
              </p>
            ))}
          </div>
        </section>
      </div>

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
              src={`https://www.youtube.com/embed/${YT_VIDEOS.about}?autoplay=1&playsinline=1&rel=0&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
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
