"use client";

import Image from "next/image";
import { ShieldCheck, BrainCircuit } from "lucide-react";
import { platform } from "public";

export const AntiSpamProtection = () => {
  return (
  <section className="relative flex w-full items-center justify-center overflow-hidden bg-primary px-4 py-12 sm:px-6 sm:py-16 lg:px-16 lg:py-25">

      {/* Decorative Blurs */}
      <div className="absolute -top-40 -right-20 h-40 w-72 rotate-6 bg-brand-three blur-[160px]" />
      <div className="absolute -bottom-20 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-brand-three blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 items-center">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-6">

          {/* Section Title */}
          <h2 className="mb-6 text-3xl font-extrabold uppercase leading-tight text-pink-500 md:text-3xl">
            Anti-Spam Protection:
            <br />
            <span className="text-white">
              Shield Your Communications
            </span>
          </h2>

          {/* Feature Card */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-8 backdrop-blur-xl">

            {/* Icon */}
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
              <BrainCircuit className="h-6 w-6 text-pink-500" />
            </div>

            <h3 className="mb-4 text-xl font-bold text-white">
              AI-Powered Threat Detection
            </h3>

            <p className="text-sm leading-relaxed text-white/80">
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
        <div className="relative lg:col-span-6">

          <div className="relative mx-auto sm:h-[420px] h-[300px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <Image
              src={platform.cmp}
              alt="AI Shield Protection"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/80 px-6 py-3 w-full sm:w-auto m-auto justify-center backdrop-blur">
            <ShieldCheck className="h-5 w-5 text-pink-500" />
            <span className="text-sm font-medium text-white">
              Enterprise-Grade Security
            </span>
          </div>
        </div>
      </div>
    </section>
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
