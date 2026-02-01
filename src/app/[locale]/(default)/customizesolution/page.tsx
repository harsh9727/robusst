import React from 'react'
import { Banner } from "~/components/sections/customizesolution";
import CustomizedSolutions from '~/components/sections/customizesolution/CustomizedSolutions/CustomizedSolutions';
import InnovationProcess from '~/components/sections/customizesolution/InnovationProcess/InnovationProcess';
import CustomerCentric from '~/components/sections/customizesolution/CustomerCentric/CustomerCentric';
import ChallengesSection from '~/components/sections/customizesolution/ChallengesSection/ChallengesSection';
import DataDrivenIntelligence from '~/components/sections/customizesolution/DataDrivenIntelligence/DataDrivenIntelligence';
import TelecomBrain from '~/components/sections/customizesolution/TelecomBrain/TelecomBrain';
import EndToEndIntegration from '~/components/sections/customizesolution/EndToEndIntegration/EndToEndIntegration';
import CommitmentToExcellence from '~/components/sections/customizesolution/CommitmentToExcellence/CommitmentToExcellence';
import VisionCTA from '~/components/sections/customizesolution/VisionCTA/VisionCTA';
const Page = () => {
    return (
      <>
        <Banner />
        <CustomizedSolutions />
        <InnovationProcess />
        <CustomerCentric />
        <ChallengesSection />
        <DataDrivenIntelligence />
        <TelecomBrain />
        <EndToEndIntegration />
        <CommitmentToExcellence />
        <VisionCTA />
      </>
  )
}

export default Page;