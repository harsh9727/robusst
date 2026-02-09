"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { platform } from "public";

export const JourneyOrchestrator = () => {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24">
      {/* Subtle background accents */}
      <div className="absolute -top-32 -left-32 h-[420px] w-[420px] bg-sky-100 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-[420px] w-[420px] bg-indigo-100 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-15 lg:grid-cols-12">
        {/* LEFT – Media Card */}
        <div className="lg:col-span-5">
          <div className="group relative h-[500px] w-full overflow-hidden rounded-lg">
            <Image
              src={platform.cmp}
              alt="Robusst Identity Resolution Engine"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Floating badge (NO zoom) */}
            <div className="absolute right-0 bottom-6 left-0 mx-auto w-fit rounded-xl border border-pink-50 bg-pink-50 px-6 py-3 shadow-md backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
              <p className="mb-1 text-center text-sm font-semibold text-pink-600">
                Journey Orchestration
              </p>
              <p className="text-center text-xs text-black">
                Real-Time Personalization
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT – Content */}
        <div className="lg:col-span-7">
          <h2 className="mb-6 text-4xl leading-tight font-extrabold text-gray-900 md:text-5xl">
            Robusst <br />
            <span className="text-pink-500">Identity Resolution Engine</span>
          </h2>

          <p className="text-md mb-5 w-fit border-b border-pink-500 pb-2 font-bold text-pink-500">
            Problem Solved :
          </p>

          <p className="mb-4 max-w-2xl leading-relaxed text-black">
            Disconnected campaigns and poor customer experiences across
            channels.
          </p>

          <p className="max-w-2xl leading-relaxed text-black">
            Provides drag-and-drop tools to design and activate personalized,
            consistent journeys over email, SMS, app, web, voice, and contact
            centers with real-time customer context.
          </p>

          {/* Feature highlights */}
          <div className="mt-5 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              "Drag & Drop Journeys",
              "Omnichannel Activation",
              "Real-Time Context",
              "Consistent Experiences",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md"
              >
                <span className="h-2 w-2 rounded-full bg-pink-500" />
                <span className="text-sm font-medium text-gray-800">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <Button className="mt-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-10 py-6 text-white transition hover:from-cyan-600 hover:to-purple-700">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
