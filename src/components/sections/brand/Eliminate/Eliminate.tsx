"use client";

import Image from "next/image";
import { Play, ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { platform } from "public";

export const Eliminate = () => {
  return (
    <section className="relative overflow-hidden px-6 py-15 sm:px-12 md:py-20 xl:px-25">
      <div className="mx-auto w-full max-w-7xl">

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-pink-500 mb-10 lg:mb-16 leading-tight">
          Eliminate Spam, Build Trust,
          <br />
          Connect With Confidence
        </h2>

        {/* Content */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

          {/* LEFT - Video */}
          <div className="relative group rounded-2xl overflow-hidden shadow-xl bg-black h-[300px] sm:h-[350px] md:h-[420px]">
            <div className="flex h-full items-center justify-center">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-lg bg-pink-500 hover:bg-pink-600 transition-transform "
              >
                <Play className="mr-2" />
                Play Video
              </Button>
            </div>
          </div>

          {/* CENTER IMAGE */}
          <div className="relative rounded-2xl h-[300px] sm:h-[350px] md:h-[420px]">
            <Image
              src={platform.cmp}
              alt="Spam Calls"
              className="w-full lg:w-[90%] h-full object-cover rounded-2xl transition-transform duration-500 "
            />

            <div className="hidden lg:flex absolute top-1/2 -right-5 -translate-y-1/2">
              <ArrowRight className="w-12 h-12 text-pink-500 animate-arrow" />
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative group rounded-2xl overflow-hidden h-[300px] sm:h-[350px] md:h-[420px]">
            <Image
              src={platform.cmp}
              alt="Verified Call"
              className="w-full lg:w-[90%] h-full object-cover rounded-2xl transition-transform duration-500 "
            />
          </div>

        </div>
      </div>
    </section>
  );
};
