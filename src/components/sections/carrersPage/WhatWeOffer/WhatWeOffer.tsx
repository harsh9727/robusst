import React from "react";

export const WhatWeOffer: React.FC = () => {
  return (
    <section className="relative overflow-hidden px-6 py-15 sm:px-12 md:py-20 xl:px-25">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-start gap-10 lg:flex-row lg:justify-between">
        <div className="h-100 w-full max-w-xl rounded-lg bg-pink-200" />
        <div className="h-full w-full">
          <h3 className="mb-5 text-2xl leading-tight font-bold sm:text-3xl md:text-4xl">
            What we offer?
          </h3>

          <div className="flex flex-col gap-4">
            <section>
              <p className="text-md font-medium">Compensation & Growth</p>
              <p className="text-md text-muted-foreground">
                lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
                lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
                lorem
              </p>
            </section>
            <section>
              <p className="text-md font-medium">Health & Wellness</p>
              <p className="text-md text-muted-foreground">
                lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
                lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
                lorem
              </p>
            </section>
            <section>
              <p className="text-md font-medium">Learning & Development</p>
              <p className="text-md text-muted-foreground">
                lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
                lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
                lorem
              </p>
            </section>
            <section>
              <p className="text-md font-medium">Work-Life Balance</p>
              <p className="text-md text-muted-foreground">
                lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
                lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
                lorem
              </p>
            </section>
            <section>
              <p className="text-md font-medium">Perks & Benefits</p>
              <p className="text-md text-muted-foreground">
                lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
                lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
                lorem
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};
