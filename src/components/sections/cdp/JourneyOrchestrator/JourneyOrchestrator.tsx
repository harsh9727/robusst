"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { platform } from "public";

export const JourneyOrchestrator = () => {
  return (
    <section className="relative overflow-hidden bg-white py-24 px-6">

      {/* Subtle background accents */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-sky-100 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-indigo-100 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-15 items-center">

        {/* LEFT – Media Card */}
        <div className="lg:col-span-5">
          <div className="relative group rounded-lg h-[500px] w-full overflow-hidden">
            <Image
              src={platform.cmp}
              alt="Robusst Identity Resolution Engine"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Floating badge (NO zoom) */}
            <div className="absolute bottom-6 left-0 right-0 mx-auto w-fit rounded-xl bg-pink-50 backdrop-blur px-6 py-3 shadow-md border border-pink-50 transition-opacity duration-500 group-hover:opacity-100">
              <p className="text-pink-600 text-sm text-center mb-1 font-semibold">
                Journey Orchestration
              </p>
              <p className="text-black text-xs text-center">
                Real-Time Personalization
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT – Content */}
        <div className="lg:col-span-7">

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Robusst <br />
            <span className="text-pink-500">
              Identity Resolution Engine
            </span>
          </h2>

          <p className="text-md font-bold text-pink-500 mb-5 pb-2 border-b border-pink-500 w-fit ">Problem Solved :</p>

          <p className="text-black mb-4 leading-relaxed max-w-2xl">
            Disconnected campaigns and poor customer experiences across channels.
          </p>

          <p className="text-black leading-relaxed max-w-2xl">
            Provides drag-and-drop tools to design and activate personalized, consistent journeys over email, SMS, app, web, voice, and contact centers with real-time customer context.
          </p>

          {/* Feature highlights */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            {[
              "Drag & Drop Journeys",
              "Omnichannel Activation",
              "Real-Time Context",
              "Consistent Experiences",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm hover:shadow-md transition"
              >
                <span className="h-2 w-2 rounded-full bg-pink-500" />
                <span className="text-sm text-gray-800 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <Button className="mt-10 rounded-full px-10 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white transition">
            Learn More
          </Button>
        </div>

      </div>
    </section>
  );
};
