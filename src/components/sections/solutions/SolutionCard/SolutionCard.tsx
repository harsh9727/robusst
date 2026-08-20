import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import type { SanitySolutionCardData } from "~/types/sanity/solutions";

interface SolutionCardProps {
  solutionData: SanitySolutionCardData;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({ solutionData }) => {
  return (
    <div className="shadow-brand-one flex h-full w-full flex-col rounded-lg border shadow-[0_0_0] duration-200 hover:shadow-[0_0_30px]">
      <div className="bg-primary-foreground flex w-full items-center justify-center rounded-t-lg border-b p-8">
        <Image
          src={solutionData.image ?? ""}
          alt={solutionData.imageAlt ?? solutionData.title ?? ""}
          width={400}
          height={200}
          className="h-80 w-full object-cover"
        />
      </div>
      <div className="flex h-full flex-col justify-between rounded-b-lg bg-white p-4">
        <div>
          <h3 className="text-xl font-semibold">{solutionData.title}</h3>
          <p className="text-text-base text-muted-foreground mt-1">
            {solutionData.description}
          </p>
        </div>

        <Button asChild size="sm" className="mt-5 w-fit">
          <Link
            href={solutionData.ctaHref ?? `/solutions/${solutionData.slug}`}
            aria-label={solutionData.ctaAriaLabel ?? undefined}
          >
            {solutionData.ctaLabel}
          </Link>
        </Button>
      </div>
    </div>
  );
};
