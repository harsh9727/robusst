import React from "react";
import { Banner } from "~/components/sections/cybersecurity/Banner";
import SolutionModules from "~/components/sections/cybersecurity/SolutionModules";
import WhyChooseRobusst from "~/components/sections/cybersecurity/WhyChooseRobusst";
import ThreatIntelligence from "~/components/sections/cybersecurity/ThreatIntelligence/ThreatIntelligence";
import HowItWorks from "~/components/sections/cybersecurity/HowItWorks/HowItWorks";
import BusinessOutcomes from "~/components/sections/cybersecurity/BusinessOutcomes/BusinessOutcomes";
import OurUSP from "~/components/sections/cybersecurity/OurUSP/OurUSP";
import { FAQSection } from "~/components/sections/cybersecurity/FAQSection";

const cybersecurity: React.FC = () => {
  return (
    <>
      <Banner />
      <WhyChooseRobusst />
      <SolutionModules />

      <ThreatIntelligence />
      <HowItWorks />
      <BusinessOutcomes />
      <OurUSP />
      <FAQSection />
    </>
  );
};

export default cybersecurity;
