import React from "react";
import { setRequestLocale } from "next-intl/server";
import {
  Banner,
  Cdp,
  Cpm,
  Noc,
  Kyc,
  Whychoose,
} from "~/components/sections/platform";

const Platforms = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Banner />
      <Cdp />
      <Cpm />
      <Noc />
      <Kyc />
      <Whychoose />
    </>
  );
};

export default Platforms;
