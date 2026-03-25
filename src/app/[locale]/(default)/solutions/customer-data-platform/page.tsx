import React from "react";
import { setRequestLocale } from "next-intl/server";
import { Banner } from "~/components/sections/cdp/Banner";
import { WhyChooseRobusst } from "~/components/sections/cdp/WhyChooseRobusst";
import { IndustryApplications } from "~/components/sections/cdp/IndustryApplications";
import { ProvenImpact } from "~/components/sections/cdp/ProvenImpact";
import { TelecomUseCases } from "~/components/sections/cdp/TelecomUseCases";
import { PersonalizedExperience } from "~/components/sections/cdp/PersonalizedExperience";
import { BenefitsUseCases } from "~/components/sections/cdp/BenefitsUseCases";
import { AccelerateValue } from "~/components/sections/cdp/AccelerateValue";
import { KeyFeaturesCapabilities } from "~/components/sections/cdp/KeyFeaturesCapabilities";
import { CtaSection } from "~/components/sections/cdp/CtaSection";
import { CDP_Solution_Grid } from "~/components/sections/cdp/SolutionGrid";
import { FAQSection } from "~/components/sections/cdp/FAQSection";

const Cdp = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Banner />
      <WhyChooseRobusst />
      <IndustryApplications />
      <ProvenImpact />
      <TelecomUseCases />
      <PersonalizedExperience />
      <CDP_Solution_Grid />
      <BenefitsUseCases />
      <AccelerateValue />
      <KeyFeaturesCapabilities />
      <CtaSection />
      <FAQSection />
    </>
  );
};

export default Cdp;
