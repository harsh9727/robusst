import React from "react";
import { setRequestLocale } from "next-intl/server";
import { Banner } from "~/components/sections/customizesolution";
import CustomizedSolutions from "~/components/sections/customizesolution/CustomizedSolutions/CustomizedSolutions";
import InnovationProcess from "~/components/sections/customizesolution/InnovationProcess/InnovationProcess";
import CustomerCentric from "~/components/sections/customizesolution/CustomerCentric/CustomerCentric";
import ChallengesSection from "~/components/sections/customizesolution/ChallengesSection/ChallengesSection";
import CommitmentToExcellence from "~/components/sections/customizesolution/CommitmentToExcellence/CommitmentToExcellence";
import { CustomizedSolutionsSlider } from "~/components/sections/customizesolution/CustomizedSolutionsSlider";
import { FAQSection } from "~/components/sections/customizesolution/FAQSection";
const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Banner />
      <InnovationProcess />
      <CustomizedSolutions />
      <CustomerCentric />
      <ChallengesSection />
      <CustomizedSolutionsSlider />
      {/*<DataDrivenIntelligence />
      <TelecomBrain />
      <EndToEndIntegration />*/}
      <CommitmentToExcellence />
      {/*<VisionCTA />*/}
      <FAQSection />
    </>
  );
};

export default Page;
