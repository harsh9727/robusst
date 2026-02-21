import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { SuccessStoriesSection } from "~/i18n/types/home";

interface StoryCardProps {
  storyData: SuccessStoriesSection["items"][number];
  image: string;
  index: number;
}


export const StoryCard: React.FC<StoryCardProps> = ({
  storyData,
  image,
  index,
}) => {

  return (
    <div className="flex h-full w-full flex-col border">
      <div className="bg-primary-foreground flex w-full items-center justify-center rounded-t-lg border-b p-8">
        <Image
          src={image}
          alt={storyData.title}
          width={400}
          height={200}
          className="h-40 w-fit object-cover"
        />
      </div>

      <div className="flex h-fit flex-col justify-between rounded-b-lg bg-white p-4">
        <h3 className="text-xl font-semibold">
          {storyData.title}
        </h3>

        <p className="text-text-base text-muted-foreground mt-1">
          {storyData.description}
        </p>

        <div className="mt-5">
          <Link
            href={`/stories/${index + 1}`}
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