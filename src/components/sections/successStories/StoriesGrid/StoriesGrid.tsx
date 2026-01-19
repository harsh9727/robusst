"use client";

import React from "react";
import { StoryCard } from "../StoryCard";
import { useTranslations } from "next-intl";
import type {
  SuccessStoriesDataType,
  SuccessStoryPageSection,
} from "~/i18n/types/successStory";
import { successStories } from "public";
import type { SuccessStoriesSection } from "~/i18n/types/home";

const SuccessStoriesImages = [
  successStories.mnt,
  successStories.airtel,
  successStories.mobily,
  successStories.smart,
  successStories.claro,
  successStories.movistar,
  successStories.ireland,
  successStories.belgium,
  successStories.tt,
  successStories.neotel,
  successStories.iu,
  successStories.chili,
];

export const StoriesGrid: React.FC = () => {
  const t = useTranslations();
  const SuccessStoriesSection = t.raw(
    "successStories",
  ) as SuccessStoriesSection;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white py-15 sm:py-20 md:py-25">
      <div className="container grid w-full gap-5 px-5 md:grid-cols-2 xl:grid-cols-3">
        {SuccessStoriesSection.items.map((story, index) => (
          <StoryCard
            key={index}
            image={SuccessStoriesImages[index]?.src ?? ""}
            storyData={story}
          />
        ))}
      </div>
    </div>
  );
};
