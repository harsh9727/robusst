"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import type { SanityCustomizedSolutionsSection } from "~/types/sanity/customizedSolutions";

interface CustomizedSolutionsProps {
  data: SanityCustomizedSolutionsSection<"customizedSolutions">;
}

export default function CustomizedSolutions({
  data,
}: CustomizedSolutionsProps) {
  if (!data) return null;
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
          <div className="animate-float relative h-100 w-full overflow-hidden rounded-xl sm:h-137.5">
            <Image
              src={data.image ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
              alt={data.imageAlt ?? data.heading ?? ""}
              className="h-full w-full object-cover"
            />
          </div>

          {/* RIGHT – Content */}
          <div>
            <h2 className="mt-4 text-4xl leading-tight font-extrabold text-white">
              {data.heading}
            </h2>

            <p className="mt-6 max-w-xl text-gray-400">{data.description}</p>

            <Button
              size="extra-lg"
              asChild
              className="bg-brand-one hover:bg-brand-one/90 mt-10"
            >
              <Link href={data.ctaHref ?? "/contact"}>{data.ctaText}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
