"use client";

import { useTranslations } from "next-intl";
import React from "react";
import StoryDetailsSection from "~/components/sections/storydetails/storydetailspage/StoryDetailsSection";
import type { SuccessStoriesDataType } from "~/i18n/types/successStory";

interface Props {
  slug: string;
}

export const SuccessStoriesPage: React.FC<Props> = ({ slug }) => {
  const t = useTranslations();

  const successStories = t.raw("story") as SuccessStoriesDataType[];

  const story = successStories.find((story) => story.id === slug);

  if (!story) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-xl font-semibold">Story not found</h2>
      </div>
    );
  }

  return (
    <StoryDetailsSection
      title={story.title}
      subtitle={story.companyName}
      challenge={story.cusomterChallenges}
      solution={story.solutions}
      benefits={story.benefits}
    />
  );
};