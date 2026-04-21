"use client";

import Image from "next/image";
import { CircleCheck } from "lucide-react";
import type { Stsanddms_JsonType } from "~/types/api/stsanddms_json.types";

type Props = {
  data?: Stsanddms_JsonType["sts_and_dms_page"]["whyRobusst"];
};

export default function WhyRobusst({ data }: Props) {
  if (!data) return null;

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* LEFT – Image Block */}
        <div>
          <h2 className="text-brand-three mt-4 text-4xl leading-tight font-extrabold">
            {data.title}
          </h2>

          <h2 className="mt-6 text-xl leading-tight font-extrabold">
            {data.subtitle}
          </h2>

          <p className="text-md mt-1 max-w-xl text-black">{data.description}</p>

          {/* Bullet Points */}
          <div className="mt-5 space-y-6">
            {data.points.map((item, i) => (
              <div key={i} className="group flex gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-pink-500 bg-pink-50 transition group-hover:border-pink-400/40">
                  <CircleCheck className="text-pink-500" size={20} />
                </div>

                <div>
                  <h4 className="font-medium text-black group-hover:text-pink-500">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 group-hover:text-black">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT – Content */}
        <div className="relative h-62.5 w-full overflow-hidden rounded-xl border border-white/10 sm:h-112.5 lg:h-137.5">
          <Image
            src={data.image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
            alt={data.imageAlt}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
