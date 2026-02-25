import React from "react";
import BusinessProblem from "~/components/sections/aicall/BusinessProblem/BusinessProblem";
import { Banner } from "~/components/sections/noc/Banner";
import SolutionOverview from "~/components/sections/aicall/SolutionOverview/SolutionOverview";
import KeyValueProposition from "~/components/sections/aicall/KeyValueProposition/KeyValueProposition";
import CoreCapabilities from "~/components/sections/aicall/CoreCapabilities/CoreCapabilities";
import AdvancedAIIntelligence from "~/components/sections/aicall/AdvancedAIIntelligence/AdvancedAIIntelligence";
import EnterpriseArchitecture from "~/components/sections/aicall/EnterpriseArchitecture/EnterpriseArchitecture";
import InfrastructureControl from "~/components/sections/aicall/InfrastructureControl/InfrastructureControl";
import SecurityCompliance from "~/components/sections/aicall/SecurityCompliance/SecurityCompliance";
import EnterpriseSupport from "~/components/sections/aicall/EnterpriseSupport/EnterpriseSupport";
import CustomDevelopment from "~/components/sections/aicall/CustomDevelopment/CustomDevelopment";
import IdealUseCases from "~/components/sections/aicall/IdealUseCases/IdealUseCases";
import FutureAutomation from "~/components/sections/aicall/FutureAutomation/FutureAutomation";

const Aicall: React.FC = () => {
  return (
    <>
      <Banner />
      <BusinessProblem />
      <SolutionOverview />
      <KeyValueProposition />
      <CoreCapabilities />
      <AdvancedAIIntelligence />
      <EnterpriseArchitecture />
      <InfrastructureControl />
      <SecurityCompliance />
      <EnterpriseSupport />
      <CustomDevelopment />
      <IdealUseCases /> 
      <FutureAutomation />
    </>
  );
};

export default Aicall;
