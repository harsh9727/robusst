"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { platform } from "public";

export const TransformCommunication = () => {
  return (
    <section className="bg-primary relative flex w-full items-center justify-center overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-16 lg:py-20">
      {/* Decorative Blurs */}
      <div className="bg-brand-three absolute -top-40 -right-20 h-40 w-72 rotate-6 blur-[160px]" />
      <div className="bg-brand-three absolute -bottom-20 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full blur-[120px]" />

      <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        {/* RIGHT IMAGE — show first on mobile, second on large */}
        <div className="order-1 w-full lg:order-2">
          <Image
            src="/solutions/brand/10.webp"
            width={500}
            height={500}
            alt="Branded Verified Call"
          />
        </div>

        {/* LEFT CONTENT — show second on mobile, first on large */}
        <div className="order-2 lg:order-1">
          <p className="mb-6 text-base leading-relaxed text-white md:text-lg">
            Transform how your customers perceive and respond to your calls.
            With spam calls increasing by{" "}
            <span className="text-white">300% globally</span>, and answer rates
            dropping to just <span className="text-white">20%</span> for unknown
            numbers, businesses need verified communication solutions.
          </p>

          <p className="mb-8 text-base leading-relaxed text-white md:text-lg">
            <span className="text-white">Robusst</span>’s integrated platform
            combines <span className="text-white">Branded Calling</span> with{" "}
            <span className="text-white">AI-powered Anti-Spam</span> protection,
            ensuring your legitimate business calls are recognized, trusted, and
            answered.
          </p>

          <h3 className="text-brand-two mb-6 text-2xl font-bold md:text-3xl">
            Ready to revolutionize your customer communications?
          </h3>

          <Button
            variant="outline"
            className="bg-brand-two hover:bg-brand-two/90 border-black px-6 pt-4 pb-5 text-sm font-medium text-black capitalize sm:text-base"
          >
            Request a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};
