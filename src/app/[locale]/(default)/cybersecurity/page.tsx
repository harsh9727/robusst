import React from "react";
import { Banner } from "~/components/sections/cybersecurity/Banner";
import SIEM from "~/components/sections/cybersecurity/SIEM";
import SOAR from "~/components/sections/cybersecurity/SOAR";
import SolutionModules from "~/components/sections/cybersecurity/SolutionModules";
import WhyChooseRobusst from "~/components/sections/cybersecurity/WhyChooseRobusst";
import EDR from "~/components/sections/cybersecurity/EDR/EDR";
import XDR from "~/components/sections/cybersecurity/XDR/XDR";
import MDR from "~/components/sections/cybersecurity/MDR/MDR";
import MDM from "~/components/sections/cybersecurity/MDM/MDM";
import CNAPP from "~/components/sections/cybersecurity/CNAPP/CNAPP";
import IAM from "~/components/sections/cybersecurity/IAM/IAM";
import VAPT from "~/components/sections/cybersecurity/VAPT/VAPT";
import ThreatIntelligence from "~/components/sections/cybersecurity/ThreatIntelligence/ThreatIntelligence";
import HowItWorks from "~/components/sections/cybersecurity/HowItWorks/HowItWorks";
import BusinessOutcomes from "~/components/sections/cybersecurity/BusinessOutcomes/BusinessOutcomes";
import OurUSP from "~/components/sections/cybersecurity/OurUSP/OurUSP";

const cybersecurity: React.FC = () => {
  return (
    <>
      <Banner />
      <WhyChooseRobusst />
      <SolutionModules />
      {/*<SIEM />
      <SOAR />
      <EDR />
      <XDR />
      <MDR />
      <MDM />
      <CNAPP />
      <IAM />
      <VAPT />*/}
      <ThreatIntelligence />
      <HowItWorks />
      <BusinessOutcomes />
      <OurUSP />
    </>
  );
};

export default cybersecurity;
