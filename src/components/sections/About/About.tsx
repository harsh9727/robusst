import React from "react";

export const About: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-16 sm:gap-8 sm:px-12 sm:py-32 lg:px-25 lg:py-50">
      <section className="flex flex-col justify-center gap-1 text-center">
        <p className="text-2xl font-medium sm:text-3xl lg:text-4xl">
          About Robousst
        </p>
        <p className="text-muted-foreground px-4 text-base font-medium sm:text-lg">
          Pioneering Telecom & Banking Digital Transformation using AI
        </p>
      </section>

      <section className="flex w-full flex-col items-center justify-between gap-6 px-0 sm:gap-9 sm:px-12 lg:px-25">
        <div className="bg-primary/20 h-48 w-full max-w-full rounded-xl sm:h-80 sm:max-w-160 lg:h-120 lg:max-w-200" />
        <div className="flex w-full flex-col gap-4 sm:gap-5">
          <p className="mx-auto max-w-full px-4 sm:text-center text-base leading-relaxed sm:max-w-160 sm:px-0 sm:text-lg sm:leading-tight lg:max-w-200 lg:text-xl">
            Robusst stands at the forefront of telecommunications innovation,
            dedicated to helping Communication Service Providers (CSPs) achieve
            operational excellence, drive revenue growth, and deliver
            exceptional customer experiences in an increasingly digital world
          </p>

          <p className="mx-auto max-w-full px-4 sm:text-center text-base leading-relaxed sm:max-w-160 sm:px-0 sm:text-lg sm:leading-tight lg:max-w-200 lg:text-xl">
            From network optimization to AI-powered business intelligence, we
            partner with telecom operators globally to simplify operations,
            unlock new revenue streams, and maximize efficiency through
            innovative, scalable solutions
          </p>
        </div>
      </section>
    </div>
  );
};
