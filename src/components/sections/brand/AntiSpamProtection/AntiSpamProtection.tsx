"use client";

import Image from "next/image";
import { ShieldCheck, BrainCircuit } from "lucide-react";

export const AntiSpamProtection = () => {
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

      <section className="bg-primary relative flex w-full items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-16 lg:py-25">
        <div className="max-w-9xl relative mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* LEFT CONTENT */}
          <div className="relative lg:col-span-6">
            {/*TODO: add this image here*/}
            {/*<Image
              src="/solutions/brand/12.webp"
              width={200}
              height={200}
              alt="shield"
              className="absolute -top-87 z-20 -left-100 h-100 w-100 bg-white"
            ></Image>*/}
            {/* Section Title */}
            <h2 className="mb-6 text-3xl leading-tight font-extrabold text-pink-500 uppercase md:text-3xl">
              Anti-Spam Protection:
              <br />
              <span className="text-white">Shield Your Communications</span>
            </h2>

            {/* Feature Card */}
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-8">
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                <BrainCircuit className="h-6 w-6 text-pink-500" />
              </div>

              <h3 className="mb-4 text-xl font-bold text-white">
                AI-Powered Threat Detection
              </h3>

              <p className="max-w-lg text-sm leading-relaxed text-white/80">
                With global markets experiencing rising spam volumes, our
                machine-learning algorithms analyze{" "}
                <span className="font-semibold text-pink-500">
                  50+ call characteristics in real time
                </span>
                , achieving{" "}
                <span className="font-semibold text-pink-500">
                  95% accuracy
                </span>{" "}
                in identifying spam—while ensuring legitimate business
                communications remain protected.
              </p>

              {/* Stats */}
              <div className="mt-6 flex gap-6">
                <Stat label="Accuracy" value="95%" />
                <Stat label="Signals Analyzed" value="50+" />
                <Stat label="Real-Time" value="Instant" />
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto h-[300px] max-w-sm overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:h-[620px]">
              <Image
                src="/solutions/brand/7.webp"
                alt="AI Shield Protection"
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 left-1/2 m-auto flex w-full -translate-x-1/2 items-center justify-center gap-3 rounded-full border border-white/10 bg-black/80 px-6 py-3 backdrop-blur sm:w-auto">
              <ShieldCheck className="h-5 w-5 text-pink-500" />
              <span className="text-sm font-medium text-white">
                Enterprise-Grade Security
              </span>
            </div>
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
    </>
  );
};

/* Small Stat Component */
const Stat = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <p className="text-lg font-bold text-pink-500">{value}</p>
      <p className="text-xs text-white/60">{label}</p>
    </div>
  );
};
