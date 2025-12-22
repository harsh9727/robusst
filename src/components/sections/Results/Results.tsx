import React from "react";

const ResultsData = [
  {
    label: "3x",
    title: "Higher campaign conversions",
  },
  {
    label: "8x",
    title: "Faster campaign launches",
  },
  {
    label: "200%",
    title: "Higher Marketing ROI",
  },
  {
    label: "78%",
    title: "Less Network downtime",
  },
  {
    label: "85%",
    title: "Less Revenue leakage",
  },
  {
    label: "61%",
    title: "faster decision-making",
  },
];

export const Results: React.FC = () => {
  return (
    <div className="flex justify-center px-6 py-12 sm:px-12 sm:py-16 lg:px-25 lg:py-25">
      <div className="relative container grid min-h-125 grid-cols-1 overflow-hidden rounded-2xl border sm:min-h-150 sm:rounded-3xl lg:h-150 lg:grid-cols-2 lg:rounded-4xl">
        <div className="bg-primary/70 order-1 min-h-50 w-full lg:order-2 lg:min-h-0"></div>

        <div className="bg-primary order-2 flex w-full flex-col gap-6 p-6 sm:gap-8 sm:p-10 lg:order-1 lg:p-15">
          <section>
            <p className="text-primary-foreground text-2xl font-medium sm:text-3xl lg:text-4xl">
              Results Delivered
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              We have delivered the reliable results in the industry
            </p>
          </section>

          <section className="grid grid-cols-2 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-5 lg:gap-y-3">
            {ResultsData.map((data, index) => (
              <div key={index} className="">
                <p className="text-primary-foreground text-lg leading-tight sm:text-xl lg:text-xl">
                  {data.label}
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {data.title}
                </p>
              </div>
            ))}
          </section>

          <p className="text-muted-foreground text-sm sm:text-base">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
            magni sit porro nostrum vero similique aliquam harum. Beatae hic
            magnam, expedita quidem asperiores ut dolore voluptatum vitae,
            repellendus officiis soluta?
          </p>
        </div>
      </div>
    </div>
  );
};
