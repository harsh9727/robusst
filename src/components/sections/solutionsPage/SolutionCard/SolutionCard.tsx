import React from "react";
import Link from "next/link";
import type { Solution } from "~/app/[locale]/(default)/solutions/data";

interface SolutionCardProps {
  solutionData: Solution;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({ solutionData }) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="bg-primary-foreground flex w-full items-center justify-center rounded-t-lg border-b">
        {/*<Image
          src={solutionData.image}
          alt="image"
          width={400}
          height={200}
          className="h-40 w-fit object-cover"
        />*/}
        <div className="bg-primary/50 h-60 w-full rounded-t-lg" />
      </div>
      <div className="flex h-full flex-col justify-between rounded-b-lg bg-white p-4">
        <h3 className="text-xl font-semibold">{solutionData.title}</h3>

        <div className="mt-5">
          <Link
            href={`/solutions/${solutionData.slug}`}
            className="group flex w-fit items-center gap-2 transition-colors"
          >
            <span className="text-md relative lg:text-lg">
              Read More
              <div className="bg-primary absolute bottom-0 h-px w-0 duration-300 group-hover:w-full" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
