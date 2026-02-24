"use client";

import Image from "next/image";
import Link from "next/link";
import { platform } from "public";
import { Button } from "~/components/ui/button";

export default function CustomizedSolutions() {
  return (
    <>
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <section className="relative overflow-hidden bg-black py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          {/* LEFT – Image Block */}
          <div className="animate-float relative h-[400px] w-full overflow-hidden rounded-xl sm:h-[550px]">
            <Image
              src="/solutions/customized/1.webp"
              fill
              alt="Robusst Cyber Security"
              className="h-full w-full object-cover"
            />
          </div>

          {/* RIGHT – Content */}
          <div>
            <h2 className="mt-4 text-4xl leading-tight font-extrabold text-white">
              Customized Solutions Built Around Your Challenges
            </h2>

            <p className="mt-6 max-w-xl text-gray-400">
              Every operator’s journey is different. Robusst co‑creates digital
              frameworks that solve your specific telecom challenges – from
              operational gaps to data silos – through agility, AI, and
              innovation.
            </p>

            <Button
              size="extra-lg"
              asChild
              className="bg-brand-one hover:bg-brand-one/90 mt-10"
            >
              <Link href="/contact">Talk to a solution expert</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
