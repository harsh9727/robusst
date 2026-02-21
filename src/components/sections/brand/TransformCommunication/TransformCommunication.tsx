"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Brand } from "public";

export const TransformCommunication = () => {
  return (
    <section className="bg-primary relative flex w-full items-center justify-center overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-16 lg:py-20">
      {/* Decorative Blurs */}
      <div className="bg-brand-three absolute -top-40 -right-20 h-40 w-72 rotate-6 blur-[160px]" />
      <div className="bg-brand-three absolute -bottom-20 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full blur-[120px]" />

      <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div>
          <p className="mb-6 text-base leading-relaxed text-white/80 md:text-lg">
            Transform how your customers perceive and respond to your calls.
            With spam calls increasing by{" "}
            <span className="font-semibold text-pink-500">300% globally</span>,
            and answer rates dropping to just{" "}
            <span className="font-semibold text-pink-500">20%</span> for unknown
            numbers, businesses need verified communication solutions.
          </p>

          <p className="mb-8 text-base leading-relaxed text-white/80 md:text-lg">
            <span className="font-semibold text-pink-500">Robusst</span>’s
            integrated platform combines{" "}
            <span className="font-semibold text-pink-500">Branded Calling</span>{" "}
            with{" "}
            <span className="font-semibold text-pink-500">
              AI-powered Anti-Spam
            </span>{" "}
            protection, ensuring your legitimate business calls are recognized,
            trusted, and answered.
          </p>

          <h3 className="mb-6 text-2xl font-bold text-pink-500 md:text-3xl">
            Ready to revolutionize your customer communications?
          </h3>

          <Button
            variant="outline"
            className="border-pink-500 px-6 pt-4 pb-5 text-sm font-medium text-pink-500 capitalize hover:bg-pink-50 hover:text-pink-700 sm:text-base"
          >
            Request a Demo
          </Button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="group relative h-[300px] overflow-hidden rounded-3xl shadow-2xl sm:h-[350px] md:h-[420px]">
          <Image
            src={Brand.CustomerCommunication}
            alt="Branded Verified Call"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};
