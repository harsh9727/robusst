import React from "react";
import Link from "next/link";
import type { SuccessStoriesDataType } from "~/i18n/types/successStory";

interface StoryCardProps {
  storyData: SuccessStoriesDataType;
  ctaText: string;
}

export const StoryCard: React.FC<StoryCardProps> = ({ storyData, ctaText }) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="min-h-60 w-full rounded-t-lg bg-gray-800" />
      <div className="flex h-full flex-col justify-between rounded-b-lg bg-white p-4">
        <h3 className="text-xl font-semibold">{storyData.title}</h3>

        <div className="mt-5">
          <Link
            href={`/stories/${storyData.id}`}
            className="group flex w-fit items-center gap-2 transition-colors"
          >
            <span className="text-md relative lg:text-lg">
              {ctaText}
              <div className="bg-primary absolute bottom-0 h-px w-0 duration-300 group-hover:w-full" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
