import React from "react";
import BusinessOutcomes from "~/components/sections/noc/BusinessOutcomes/BusinessOutcomes";
import { Banner } from "~/components/sections/noc/Banner";
import AiNetwork from "~/components/sections/noc/AiNetwork/AiNetwork";
import NetworkChaos from "~/components/sections/noc/NetworkChaos/NetworkChaos";
import IntelligentNOC from "~/components/sections/noc/IntelligentNOC/IntelligentNOC";
import CoreCapabilities from "~/components/sections/noc/CoreCapabilities/CoreCapabilities";
import NetworkOperationsChaos from "~/components/sections/noc/NetworkOperationsChaos/NetworkOperationsChaos";
import IntelligentDiffNOC from "~/components/sections/noc/IntelligentDiffNOC/IntelligentDiffNOC";
import ChaosControl from "~/components/sections/noc/ChaosControl/ChaosControl";
import FrameworkADAA from "~/components/sections/noc/FrameworkADAA/FrameworkADAA";
import LifecycleAutomation from "~/components/sections/noc/LifecycleAutomation/LifecycleAutomation";
import IntegratedComponents from "~/components/sections/noc/IntegratedComponents/IntegratedComponents";
import DeploymentModels from "~/components/sections/noc/DeploymentModels/DeploymentModels";
import KeyBenefits from "~/components/sections/noc/KeyBenefits/KeyBenefits";
import HumanInLoop from "~/components/sections/noc/HumanInLoop/HumanInLoop";
import { FAQSection } from "~/components/sections/noc/FAQSection";

const Cdp: React.FC = () => {
  return (
    <>
      <Banner />
      <BusinessOutcomes />
      <AiNetwork />
      <NetworkChaos />
      <IntelligentNOC />
      <CoreCapabilities />
      <NetworkOperationsChaos />
      <IntelligentDiffNOC />
      <ChaosControl />
      <FrameworkADAA />
      <LifecycleAutomation />
      <IntegratedComponents />
      <DeploymentModels />
      <KeyBenefits />
      <HumanInLoop />
      <FAQSection />
    </>
  );
};

export default Cdp;
