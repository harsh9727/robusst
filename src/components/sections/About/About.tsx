import React from "react";

export const About: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 px-25 py-50">
      <section className="flex flex-col justify-center gap-1 text-center">
        <p className="text-4xl font-medium">About Robousst</p>
        <p className="text-muted-foreground text-lg font-medium">
          Pioneering Telecom & Banking Digital Transformation using AI
        </p>
      </section>

      <section className="flex w-full flex-col items-center justify-between gap-9 px-25">
        <div className="bg-primary/20 h-120 w-full max-w-200 rounded-xl" />
        <div className="flex w-full flex-col gap-5">
          <p className="text-xl leading-tight text-center max-w-200 mx-auto">
            Robusst stands at the forefront of telecommunications innovation,
            dedicated to helping Communication Service Providers (CSPs) achieve
            operational excellence, drive revenue growth, and deliver
            exceptional customer experiences in an increasingly digital world
          </p>

          <p className="text-xl leading-tight text-center max-w-200 mx-auto">
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
