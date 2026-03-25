import React from "react";
import { setRequestLocale } from "next-intl/server";
import { Banner, SolutionGrid } from "~/components/sections/solutions";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Banner />
      <SolutionGrid />
    </>
  );
};

export default Page;
