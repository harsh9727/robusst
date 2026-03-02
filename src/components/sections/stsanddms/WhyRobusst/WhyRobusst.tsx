"use client";

import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import type { WhyRobusstSection } from "~/i18n/types/stsAndDms";

export default function WhyRobusst() {
  const t = useTranslations();
  const whyRobusst = t.raw("sts_and_dms_page.whyRobusst") as WhyRobusstSection;

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* LEFT – Image Block */}
        <div>
          <h2 className="text-brand-three mt-4 text-4xl leading-tight font-extrabold">
            {whyRobusst.title}
          </h2>

          <h2 className="mt-6 text-xl leading-tight font-extrabold">
            {whyRobusst.subtitle}
          </h2>

          <p className="text-md mt-1 max-w-xl text-black">
            {whyRobusst.description}
          </p>

          {/* Bullet Points */}
          <div className="mt-5 space-y-6">
            {whyRobusst.points.map((item, i) => (
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
        <div className="relative h-[250px] w-full overflow-hidden rounded-xl border border-white/10 sm:h-[450px] lg:h-[550px]">
          <Image
            src={whyRobusst.image}
            fill
            alt={whyRobusst.imageAlt}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
