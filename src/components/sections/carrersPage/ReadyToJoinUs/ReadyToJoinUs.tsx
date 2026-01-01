import React from "react";

export const ReadyToJoinUs: React.FC = () => {
  return (
    <section className="overflow-hidden px-6 py-15 sm:px-12 md:py-20 xl:px-25">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex h-full w-full max-w-md overflow-hidden rounded-xl">
          {/*<Image
            src={platform.cmp}
            alt="Cpm"
            className="h-full w-full object-cover"
          />*/}

          <div className="h-80 w-full bg-pink-200" />
        </div>
        {/* Content */}
        <div className="h-full w-full">
          <h3 className="mb-5 text-2xl leading-tight font-bold sm:text-3xl md:text-4xl">
            Ready to Join Us?
          </h3>

          <p className="text-md text-muted-foreground mb-5 w-[90%] leading-relaxed">
            We are the pioneers in AI-driven solutions for telecom and banking
            industries. Our mission is to help companies monetize their data
            using cutting-edge artificial intelligence that delivers measurable
            business impact.
          </p>

          <p className="text-md text-muted-foreground mb-5 w-[90%] leading-relaxed">
            We celebrate bold ideas, deliver measurable impact, operate with
            transparency, and create an inclusive environment where everyone
            thrives
          </p>
        </div>
      </div>
    </section>
  );
};
