import React from "react";

export const About: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 px-50 py-25">
      <section className="flex flex-col justify-center gap-1 text-center">
        <p className="text-4xl font-medium">About Robousst</p>
        <p className="text-muted-foreground text-lg font-medium">
          Pioneering Telecom & Banking Digital Transformation using AI
        </p>
      </section>

      <section className="flex w-full justify-between gap-9 px-50">
        <div className="bg-secondary h-100 w-full rounded-xl" />
        <div className="flex w-full flex-col gap-5 py-2">
          <p className="text-xl">
            Robusst stands at the forefront of telecommunications innovation,
            dedicated to helping Communication Service Providers (CSPs) achieve
            operational excellence, drive revenue growth, and deliver
            exceptional customer experiences in an increasingly digital world
          </p>

          <p className="text-xl">
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
