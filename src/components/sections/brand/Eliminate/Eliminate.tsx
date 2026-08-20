"use client";

import Image from "next/image";
import { Play, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SanityBrandedCallingSection } from "~/types/sanity/brandedCalling";

type Props = {
  data: SanityBrandedCallingSection<"eliminate">;
};

export const Eliminate = ({ data }: Props) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  if (!data) return null;

  return (
    <>
      <section className="relative overflow-hidden bg-white px-6 py-15 sm:px-12 md:py-20 xl:px-25">
        <div className="mx-auto w-full max-w-7xl">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10 text-center text-3xl leading-tight font-extrabold text-pink-500 md:text-4xl lg:mb-16"
          >
            {data.heading}
          </motion.h2>

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center gap-25 lg:flex-row">
            {/* LEFT - Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              className="relative aspect-video w-full max-w-xl cursor-pointer overflow-hidden rounded-lg bg-black"
              onClick={() => setIsVideoOpen(true)}
            >
              <Image
                src={data.videoThumbnail ?? ""}
                alt={data.videoThumbnailAlt ?? data.heading ?? ""}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                className="h-full w-full object-cover"
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-5 left-5 z-10 flex items-center justify-center gap-2 rounded-full bg-white px-3 py-1 pr-2"
              >
                {data.playText}
                <Play fill="#000000" />
              </motion.div>
            </motion.div>

            {/* CENTER IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative flex h-70 w-full max-w-3xl items-center sm:h-100 lg:h-120"
            >
              <Image
                src={data.image ?? ""}
                width={900}
                height={900}
                alt={data.imageAlt ?? data.heading ?? ""}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-video w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute -top-12 right-0 text-white transition-colors hover:text-gray-300"
                aria-label={data.closeText ?? undefined}
              >
                <X size={32} />
              </button>

              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${data.videoId}?autoplay=1&playsinline=1&rel=0&enablejsapi=1&origin=${
                  typeof window !== "undefined" ? window.location.origin : ""
                }`}
                title={data.videoTitle ?? undefined}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
