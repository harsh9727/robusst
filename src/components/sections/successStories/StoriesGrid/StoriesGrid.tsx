"use client";

import React from "react";
import { StoryCard } from "../StoryCard";
import { useTranslations } from "next-intl";
import type {
  SuccessStoriesDataType,
  SuccessStoryPageSection,
} from "~/i18n/types/successStory";

export const StoriesGrid: React.FC = () => {
  const t = useTranslations();
  const stories = t.raw("story") as SuccessStoriesDataType[];

  const mainStoryPage = t.raw(
    "mainStoryPage",
  ) as SuccessStoryPageSection["mainStoryPage"];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-[#e9e9e9] py-15 sm:py-20 md:py-25">
      <div className="container grid w-full gap-5 px-5 md:grid-cols-2 xl:grid-cols-3">
        {stories.map((story) => (
          <StoryCard
            key={story.id}
            storyData={story}
            ctaText={mainStoryPage.successStoryGrid.ctaText}
          />
        ))}
      </div>
    </div>
  );
};
