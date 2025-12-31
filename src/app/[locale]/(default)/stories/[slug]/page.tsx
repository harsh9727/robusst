import React from "react";
import { SuccessStoriesPage } from "./successStoryPage";

interface Props {
  params: Promise<{ slug: string }>;
}

const StoriesPage: React.FC<Props> = async ({ params }) => {
  const { slug } = await params;

  return <SuccessStoriesPage slug={slug} />;
};

export default StoriesPage;
