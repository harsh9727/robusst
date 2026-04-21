"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Play, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { YT_VIDEOS } from "~/constants";
import type { Networkmonetization_JsonType } from "~/types/api/networkmonetization_json.types";

interface WhyNetworkMonetizationProps {
  data?: Networkmonetization_JsonType["network_monetization_page"];
}

export default function WhyNetworkMonetization({
  data,
}: WhyNetworkMonetizationProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const section = data?.whyNetworkMonetization;

  if (!section) return null;

  return (
    <>
      <section className="relative overflow-hidden bg-black px-5 py-24 text-white sm:py-32">
        <div
          className="relative mx-auto aspect-video w-full max-w-xl bg-white"
          onClick={() => setIsVideoOpen(true)}
        >
          <div className="absolute bottom-5 left-5 z-10 flex items-center justify-center gap-2 rounded-full bg-black px-3 py-1 pr-2">
            {section.playButtonText}
            <Play fill="#000000" />
          </div>
          <Image
            src={section.videoThumbnail}
            alt={section.videoThumbnailAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
            className="object-cover object-top duration-150 group-hover:brightness-50"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8 mb-12 text-3xl font-bold sm:text-center sm:text-4xl md:text-5xl"
          >
            <span className="text-brand-one">{section.title}</span>
          </motion.h2>

          {/* Bullet Points */}
          <div className="mb-16 grid gap-6 md:grid-cols-2">
            {section.points.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-start gap-4"
              >
                <CheckCircle2 className="mt-1 text-cyan-400 transition group-hover:scale-110" />

                <p className="text-lg leading-relaxed text-gray-300">{item}</p>
              </motion.div>
            ))}
          </div>

          {/* Highlight Statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-brand-one/40 to-brand-one/10 relative rounded-xl border bg-gradient-to-r from-cyan-500/10 via-transparent px-8 py-8 text-center backdrop-blur-xl md:px-14"
          >
            <p className="mx-auto max-w-4xl text-lg leading-relaxed font-medium text-white md:text-xl">
              {section.highlightStatement}
            </p>
          </motion.div>
        </div>
      </section>
      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>

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
              src={`https://www.youtube.com/embed/${YT_VIDEOS.networkMonetization}?autoplay=1&playsinline=1&rel=0&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
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
