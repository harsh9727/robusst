"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import CountUp from "react-countup";
import { Card, CardContent } from "~/components/ui/card";
import type { Noc_JsonType } from "~/types/api/noc_json.types";

interface Props {
  data?: Noc_JsonType["noc_page"]["businessOutcomes"];
}

export default function BusinessOutcomesSection({ data }: Props) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  if (!data) return null;

  return (
    <>
      <section className="relative overflow-hidden bg-black py-16 sm:py-20 lg:py-28">
        {/*{JSON.stringify(data)}*/}
        <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20">
            <h2 className="text-2xl leading-tight font-extrabold sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="text-white">{data.title}</span>
            </h2>

            <p className="mt-4 px-2 text-sm text-gray-400 sm:mt-6 sm:text-base lg:text-lg">
              {data.description}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
            {data.outcomes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:scale-[1.03] hover:border-transparent sm:rounded-3xl">
                  {/* Hover Gradient Glow */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-linear-to-r sm:rounded-3xl ${item.gradient} opacity-0 blur-xl transition duration-500 group-hover:opacity-20`}
                  />

                  <CardContent className="relative flex h-full flex-col justify-center p-6 text-center sm:p-8 lg:p-10">
                    {/* Animated Number */}
                    <h3
                      className={`mb-4 bg-gradient-to-r text-3xl font-extrabold sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl ${item.gradient} bg-clip-text text-transparent`}
                    >
                      <CountUp
                        end={Number(item.value)}
                        duration={2}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                      {item.suffix}
                    </h3>

                    {/* Label */}
                    <p className="text-sm font-medium tracking-wide text-gray-300 sm:text-base lg:text-lg">
                      {item.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
              src={`https://www.youtube.com/embed/jeLPsaU15to?autoplay=1&playsinline=1&rel=0&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
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
