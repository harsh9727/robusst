import React from "react";
import { Banner } from "~/components/sections/brand";
import { WhyChooseRobusst } from "~/components/sections/cdp/WhyChooseRobusst";
import { IndustryApplications } from "~/components/sections/cdp/IndustryApplications";
import { ProvenImpact } from "~/components/sections/cdp/ProvenImpact";
import { TelecomUseCases } from "~/components/sections/cdp/TelecomUseCases";
import { PersonalizedExperience } from "~/components/sections/cdp/PersonalizedExperience";
import { RobustDataHub } from "~/components/sections/cdp/RobustDataHub";
import { IdentityResolution } from "~/components/sections/cdp/IdentityResolution";
import { AIInsightSuite } from "~/components/sections/cdp/AIInsightSuite";
import { JourneyOrchestrator } from "~/components/sections/cdp/JourneyOrchestrator";
import { DeploymentFlex } from "~/components/sections/cdp/DeploymentFlex/DeploymentFlex";
import { BenefitsUseCases } from "~/components/sections/cdp/BenefitsUseCases";
import { AccelerateValue } from "~/components/sections/cdp/AccelerateValue";
import { KeyFeaturesCapabilities } from "~/components/sections/cdp/KeyFeaturesCapabilities";
import { CtaSection } from "~/components/sections/cdp/CtaSection";

const Cdp: React.FC = () => {
  return (
    <>
      <Banner />
      <WhyChooseRobusst />
      <IndustryApplications />
      <TelecomUseCases />
      <ProvenImpact />
      <PersonalizedExperience />
      <RobustDataHub />
      <IdentityResolution />
      <AIInsightSuite />
      <JourneyOrchestrator />
      <DeploymentFlex />
      <BenefitsUseCases />
      <AccelerateValue />
      <KeyFeaturesCapabilities />
      <CtaSection />
    </>
  );
};

export default Cdp;
