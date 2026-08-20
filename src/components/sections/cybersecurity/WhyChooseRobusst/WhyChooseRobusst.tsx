"use client";

import Image from "next/image";
import { Play, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import type { SanityCybersecurityPage } from "~/types/sanity/cybersecurity";

interface WhyChooseRobusstProps {
  data: SanityCybersecurityPage;
}

export default function WhyChooseRobusst({ data }: WhyChooseRobusstProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const section = data?.whyChooseRobusst;

  if (!section) return null;

  return (
    <>
      <section className="relative overflow-hidden bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 sm:gap-16 lg:grid-cols-2">
          {/* LEFT – Image Block */}
          <div
            className="relative aspect-video w-full overflow-hidden rounded-xl duration-150"
            onClick={() => setIsVideoOpen(true)}
          >
            <div className="absolute right-5 bottom-5 z-10 flex items-center justify-center gap-2 rounded-full bg-white px-3 py-1 pr-2">
              {section.playButtonText}
              <Play fill="#000000" />
            </div>
            <Image
              src={section.videoThumbnail ?? ""}
              alt={section.videoThumbnailAlt ?? section.title ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
              className="h-full w-full object-cover"
            />
          </div>

          {/* RIGHT – Content */}
          <div>
            <h2 className="text-brand-three text-2xl leading-tight font-extrabold sm:text-4xl">
              {section.title}
            </h2>

            <h2 className="mt-2 text-xl leading-tight font-extrabold">
              {section.subtitle}
            </h2>

            <p className="text-muted-foreground mt-1 max-w-xl">
              {section.description}
            </p>

            {/* Bullet Points */}
            <div className="mt-10 space-y-6">
              {(section.points ?? []).map((item, i) => (
                <div key={i} className="group flex gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border transition group-hover:border-emerald-400/40">
                    <ShieldCheck className="text-emerald-400" size={20} />
                  </div>

                  <div>
                    <h4 className="font-medium text-black">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">
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
              aria-label={section.closeButtonText ?? ""}
            >
              <X size={32} />
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${section.videoId}?autoplay=1&playsinline=1&rel=0&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
              title={section.playerTitle ?? ""}
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
