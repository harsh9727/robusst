"use client ";

import { useTranslations } from "next-intl";
import React from "react";
import { Banner } from "~/components/sections/storyPage";
import type {
  SuccessStoriesDataType,
  SuccessStoryPageSection,
} from "~/i18n/types/successStory";

interface Props {
  slug: string;
}

export const SuccessStoriesPage: React.FC<Props> = ({ slug }) => {
  const t = useTranslations();
  const successStoriesSection = t.raw("story") as SuccessStoriesDataType[];
  const successStoryPageSection = t.raw(
    "storyPage",
  ) as SuccessStoryPageSection["storyPage"];

  const story = successStoriesSection.find((story) => story.id === slug);

  if (!story) {
    return <div>Story not found</div>;
  }

  return (
    <>
      <Banner
        companyName={story.companyName}
        title={story.title}
        companyLogo={story.companyLogo}
        banner={story.banner}
      />

      <div className="flex min-h-screen w-full justify-center bg-white px-5 py-15 sm:py-20 md:py-25">
        <section className="flex w-full max-w-5xl flex-col gap-12">
          <section>
            <h1 className="text-xl font-semibold sm:text-2xl">
              {successStoryPageSection.challengesTitle}
            </h1>
            <section className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {story.cusomterChallenges.map((challenge, index) => (
                <div key={index} className="rounded-lg border bg-white p-5">
                  <h2 className="text-lg font-semibold">{challenge.title}</h2>
                  <p className=" ">{challenge.description}</p>
                </div>
              ))}
            </section>
          </section>
          <section>
            <h1 className="text-xl font-semibold sm:text-2xl">
              {successStoryPageSection.solutionTitle}
            </h1>
            <section className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {story.solutions.map((solution, index) => (
                <div key={index} className="rounded-lg border bg-white p-5">
                  <h2 className="text-lg font-semibold">{solution.title}</h2>
                  <p className="text-muted-foreground leading-tight">
                    {solution.description}
                  </p>
                </div>
              ))}
            </section>
          </section>
        </section>
      </div>
    </>
  );
};
