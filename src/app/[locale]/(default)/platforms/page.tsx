import React from "react";
import {
  Banner,
  Cdp,
  Cpm,
  Noc,
  Kyc,
  Whychoose,
} from "~/components/sections/platform";
import { FadeIn } from "~/components/ui/FadeIn";

const Platforms: React.FC = () => {
  return (
    <>
      <FadeIn backgroundColor="bg-primary">
        <Banner />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <Cdp />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary">
        <Cpm />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <Noc />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary">
        <Kyc />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <Whychoose />
      </FadeIn>
    </>
  );
};

export default Platforms;
