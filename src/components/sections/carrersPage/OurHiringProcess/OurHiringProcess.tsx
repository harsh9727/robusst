import React from "react";

import { LifeAtRobusst } from "../LifeAtRobusst";
import { EmployeesTestimonials } from "../EmployeesTestimonials";

export const OurHiringProcess: React.FC = () => {
  return (
    <div className="bg-primary relative flex flex-col gap-12 overflow-hidden">
      <div className="bg-brand-two absolute top-1/2 -left-40 hidden h-120 w-150 -translate-y-1/2 rotate-6 animate-pulse blur-[350px] md:block" />
      <div className="bg-brand-two absolute -top-30 right-0 h-50 w-40 rotate-6 animate-pulse blur-[150px] sm:top-0 sm:h-100 sm:w-80 sm:blur-[250px]" />
      <div className="bg-brand-two absolute right-0 -bottom-20 left-1/2 h-30 w-100 -translate-x-1/2 rotate-6 blur-[150px]" />

      <div className="z-10 container mx-auto flex w-full flex-col gap-6 px-6 py-15 sm:gap-9 sm:px-12 md:py-20 xl:px-25">
        <div className="flex flex-col items-start justify-between gap-4">
          <p className="text-primary-foreground text-2xl font-medium sm:text-3xl lg:text-4xl">
            Our Hiring Process
          </p>
          <div className="mt-5 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-60 w-full rounded-lg bg-pink-50" />
            <div className="h-60 w-full rounded-lg bg-pink-50" />
            <div className="h-60 w-full rounded-lg bg-pink-50" />
          </div>

          <p className="text-primary-foreground mt-5">
            Robusst is an equal opportunity employer that values a
            collaborative, inclusive, and respectful work environment. We are
            committed to fostering a culture where everyone can thrive,
            regardless of race, color, religion, national origin, age,
            citizenship, gender, marital status, pregnancy, sexual orientation,
            gender identity or expression, or disability. As Robusst operates
            across multiple regions, job opportunities, processes, and
            employment terms may vary in accordance with local laws and
            practices
          </p>
        </div>

        <div className="bg-muted-foreground h-[0.5px] w-full" />
        <LifeAtRobusst />

        <div className="bg-muted-foreground h-[0.5px] w-full" />
        <EmployeesTestimonials />
      </div>
    </div>
  );
};
