import React from "react";

import { Purpose } from "~/components/sections/partnership/purpose/Purpose";
import { Banner } from "~/components/sections/partnership/banner/Banner";
import { Vision } from "~/components/sections/partnership/vision/Vision";
import { Driving } from "~/components/sections/partnership/driving/Driving";
import { Define } from "~/components/sections/partnership/define/Define";
import { Team } from "~/components/sections/partnership/team/Team";
import { Challenges } from "~/components/sections/partnership/challenges/Challenges";
import { Future } from "~/components/sections/partnership/future/Future";

const PartnershipPage: React.FC = () => {
  return (
    <div>
      <Banner />
      <Driving />
      <Vision />
      <Purpose />
      <Define />
      <Team />
      <Challenges />
      <Future />
    </div>
  );
};

export default PartnershipPage;
