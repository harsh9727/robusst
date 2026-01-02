import React from "react";

const NetworkMonetizationSolutionPage: React.FC = () => {
  return (
    <>
      {/* Banner */}
      <div className="bg-primary flex h-screen w-full flex-col items-center justify-center lg:flex-row">
        <div className="bg-primary relative order-2 flex h-full w-full flex-col justify-center gap-2 overflow-hidden px-8 sm:px-12 lg:order-1 lg:min-w-[50%] lg:pl-25">
          <div className="bg-brand-two absolute top-full -right-40 h-20 w-50 -translate-y-1/2 rotate-6 animate-pulse blur-[250px] sm:h-120 lg:top-1/2 lg:-left-40" />
          <div className="bg-brand-two absolute -bottom-5 -left-12 h-20 w-120 animate-pulse blur-[120px]" />

          <h1 className="text-primary-foreground text-3xl font-medium lg:text-4xl xl:text-6xl">
            Network Monetization Solutions
          </h1>
          <p className="text-primary-foreground mt-2 text-lg">
            Designed to address critical Mobile Operator challenges Improve
            mobile user experience and increase revenue
          </p>
        </div>

        <div className="relative order-1 h-full w-full items-center justify-center overflow-hidden lg:order-2 lg:min-w-[50%]">
          <div className="bg-primary absolute -bottom-15 -left-4 z-10 h-20 w-[120vw] rotate-6 sm:h-30 lg:-top-9 lg:-left-28 lg:h-[120vh] lg:w-50 lg:rotate-12" />
          <div className="relative h-full w-full bg-gray-500">
            {/*<Image
              src={platform.banner.src}
              alt="hero image"
              fill
              className="object-cover object-top"
            />*/}
          </div>
        </div>
      </div>

      {/* increase revenue section */}
      <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-12 sm:gap-8 sm:px-12 sm:py-16 lg:px-25 lg:py-25">
        <section className="flex flex-col justify-center gap-1 px-4 text-center">
          <p className="text-2xl font-medium sm:text-3xl lg:text-4xl">
            Improve Mobile User Experience and Increase Revenue
          </p>
          <p className="text-muted-foreground mx-auto max-w-3xl text-base font-medium sm:text-lg">
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
            Lorem
          </p>
        </section>
        <section className="container grid w-full grid-cols-1 gap-5 px-6 sm:grid-cols-2 sm:gap-8 sm:px-12 lg:grid-cols-3 lg:px-25">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-primary/60 h-60 w-full rounded-lg" />
            <p className="text-lg font-semibold">Service Operations Center</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-primary/60 h-60 w-full rounded-lg" />
            <p className="text-lg font-semibold">Special Event Management</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-primary/60 h-60 w-full rounded-lg" />
            <p className="text-lg font-semibold">VOLTE Optimization</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-primary/60 h-60 w-full rounded-lg" />
            <p className="text-lg font-semibold">IOT Optimization</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-primary/60 h-60 w-full rounded-lg" />
            <p className="text-lg font-semibold">Lorem Lorem Lorem Lorem </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-primary/60 h-60 w-full rounded-lg" />
            <p className="text-lg font-semibold">Lorem Lorem Lorem Lorem </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default NetworkMonetizationSolutionPage;
