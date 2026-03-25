import React from "react";
import { setRequestLocale } from "next-intl/server";
import { Banner, StoriesGrid } from "~/components/sections/successStories";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Banner />
      <StoriesGrid />
    </>
  );
};

export default Page;
