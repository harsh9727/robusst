import React from "react";

import { Banner } from "~/components/sections/partnership/banner/Banner";
import FormSection from "~/components/sections/partnership/formsection/FormSection";
import Partner from "~/components/sections/partnership/partner/Partner";
import { FadeIn } from "~/components/ui/FadeIn";

const PartnershipPage: React.FC = () => {
  return (
    <div>
      <FadeIn backgroundColor="bg-primary">
        <Banner />
      </FadeIn>
      <FadeIn>
        <Partner />
      </FadeIn>
      <FadeIn>
        <FormSection />
      </FadeIn>
    </div>
  );
};

export default PartnershipPage;
