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
        <h2 className="mb-10 text-center text-3xl leading-tight font-extrabold text-pink-500 md:text-4xl lg:mb-16">
          Eliminate Spam, Build Trust,
          <br />
          Connect With Confidence
        </h2>

        {/* Content */}
        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-3">
          {/* LEFT - Video */}
          <div className="group relative h-[300px] overflow-hidden rounded-2xl bg-black shadow-xl sm:h-[350px] md:h-[420px]">
            <div className="flex h-full items-center justify-center">
              <Button
                size="lg"
                className="rounded-full bg-pink-500 px-8 py-6 text-lg transition-transform hover:bg-pink-600"
              >
                <Play className="mr-2" />
                Play Video
              </Button>
            </div>
          </div>

          {/* CENTER IMAGE */}
          <div className="relative h-[300px] rounded-2xl sm:h-[350px] md:h-[420px]">
            <Image
              src={platform.cmp}
              alt="Spam Calls"
              className="h-full w-full rounded-2xl object-cover transition-transform duration-500 lg:w-[90%]"
            />

            <div className="absolute top-1/2 -right-5 hidden -translate-y-1/2 lg:flex">
              <ArrowRight className="animate-arrow h-12 w-12 text-pink-500" />
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="group relative h-[300px] overflow-hidden rounded-2xl sm:h-[350px] md:h-[420px]">
            <Image
              src={platform.cmp}
              alt="Verified Call"
              className="h-full w-full rounded-2xl object-cover transition-transform duration-500 lg:w-[90%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
