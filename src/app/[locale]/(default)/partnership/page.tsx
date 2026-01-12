import React from "react";

import { Purpose } from "~/components/sections/partnership/purpose/Purpose";
import { Banner } from "~/components/sections/partnership/banner/Banner";
import { Vision } from "~/components/sections/partnership/vision/Vision";
import { Driving } from "~/components/sections/partnership/driving/Driving";
import { Define } from "~/components/sections/partnership/define/Define";
import { Team } from "~/components/sections/partnership/team/Team";
import { Challenges } from "~/components/sections/partnership/challenges/Challenges";
import { Future } from "~/components/sections/partnership/future/Future";
import { FadeIn } from "~/components/ui/FadeIn";

const PartnershipPage: React.FC = () => {
  return (
    <div>
      <FadeIn backgroundColor="bg-primary">
        <Banner />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <Driving />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary">
        <Vision />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <Purpose />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary">
        <Define />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <Team />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary">
        <Challenges />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <Future />
      </FadeIn>
    </div>
  );
};

export default PartnershipPage;
