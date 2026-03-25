import React from "react";
import { setRequestLocale } from "next-intl/server";

import { Banner } from "~/components/sections/brand/Banner";
import { Eliminate } from "~/components/sections/brand/Eliminate";
import { TransformCommunication } from "~/components/sections/brand/TransformCommunication";
import { Whychoose } from "~/components/sections/brand/Whychoose";
import { BrandedCalling } from "~/components/sections/brand/BrandedCalling";
import { KeyFeatures } from "~/components/sections/brand/KeyFeatures";
import { AntiSpamProtection } from "~/components/sections/brand/AntiSpamProtection";
import { CoreProtectionFeatures } from "~/components/sections/brand/CoreProtectionFeatures";
import { IndustryApplications } from "~/components/sections/brand/IndustryApplications";
import { RegionalExcellence } from "~/components/sections/brand/RegionalExcellence";
import { SecurityCompliance } from "~/components/sections/brand/SecurityCompliance";
import { FAQSection } from "~/components/sections/brand/FAQSection";

const brand = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div>
      <Banner />
      <Eliminate />
      <TransformCommunication />
      <Whychoose />
      <BrandedCalling />
      <KeyFeatures />
      <AntiSpamProtection />
      <CoreProtectionFeatures />
      <IndustryApplications />
      <RegionalExcellence />
      <SecurityCompliance />
      <FAQSection />
    </div>
  );
};

export default brand;
