import Image from "next/image";
import React from "react";
import { platform } from "public";

export const Whychoose: React.FC = () => {
  return (
    <section className="px-6 py-20 sm:px-12 xl:px-25">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div>
          <h3 className="pb-10 text-4xl leading-tight font-bold text-black">
            Why Choose Us
          </h3>

          <ul className="flex flex-col gap-5">
            <li className="flex flex-col gap-1 rounded-r-lg border-l-4 border-pink-600 bg-pink-50 p-4 pl-4">
              <h4 className="text-xl font-bold text-pink-600">
                Telecom Expertise
              </h4>
              <p className="text-black">
                Deep domain understanding across operator environments.
              </p>
            </li>

            <li className="flex flex-col gap-1 rounded-r-lg border-l-4 border-pink-600 bg-pink-50 p-4 pl-4">
              <h4 className="text-xl font-bold text-pink-600">
                Agile & Innovative
              </h4>
              <p className="text-black">
                We deliver flexible, tailor-made solutions at startup speed.
              </p>
            </li>

            <li className="flex flex-col gap-1 rounded-r-lg border-l-4 border-pink-600 bg-pink-50 p-4 pl-4">
              <h4 className="text-xl font-bold text-pink-600">
                Integration Ready
              </h4>
              <p className="text-black">
                Compatible with legacy and modern architectures.
              </p>
            </li>

            <li className="flex flex-col gap-1 rounded-r-lg border-l-4 border-pink-600 bg-pink-50 p-4 pl-4">
              <h4 className="text-xl font-bold text-pink-600">
                End-to-End Ownership
              </h4>
              <p className="text-black">
                From design to deployment to post-launch support.
              </p>
            </li>

            <li className="flex flex-col gap-1 rounded-r-lg border-l-4 border-pink-600 bg-pink-50 p-4 pl-4">
              <h4 className="text-xl font-bold text-pink-600">Future-Ready</h4>
              <p className="text-black">
                Cloud-native, scalable, and secure platforms built for tomorrow.
              </p>
            </li>
          </ul>
        </div>
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-pink-50 to-purple-50">
          <Image
            src={platform.whychoose}
            alt="Why Choose Us"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
