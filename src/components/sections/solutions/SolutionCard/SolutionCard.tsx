import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { SolutionsSection } from "~/i18n/types/home";
import { Button } from "~/components/ui/button";

interface StoryCardProps {
  solutionData: SolutionsSection["items"][number];
}

export const SolutionCard: React.FC<StoryCardProps> = ({ solutionData }) => {
  return (
    <div className="flex h-full w-full flex-col hover:shadow-[0_0_30px] duration-200 shadow-brand-one rounded-lg shadow-[0_0_0] border">
      <div className="bg-primary-foreground flex w-full items-center justify-center rounded-t-lg border-b p-8">
        <Image
          src={solutionData.image}
          alt="image"
          width={400}
          height={200}
          className="h-80 w-full object-cover"
        />
      </div>
      <div className="flex h-full flex-col justify-between rounded-b-lg bg-white p-4">
        <div>
          <h3 className="text-xl font-semibold">{solutionData.title}</h3>
          <h3 className="text-text-base text-muted-foreground mt-1">
            {solutionData.description}
          </h3>
        </div>

        <Button asChild size="sm" className="mt-5 w-fit">
          <Link href={`solutions/${solutionData.slug}`}>Read More</Link>
        </Button>
        {/*<div className="mt-5">
          <Link
            href={`solutions/${solutionData.slug}`}
            className="group flex w-fit items-center gap-2 transition-colors"
          >
            <span className="text-md relative lg:text-lg">
              Read More
              <div className="bg-primary absolute bottom-0 h-px w-0 duration-300 group-hover:w-full" />
            </span>
          </Link>
        </div>*/}
      </div>
    </div>
  );
};
