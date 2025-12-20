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
    <div className="flex justify-center px-50 py-25">
      <div className="relative container grid h-150 grid-cols-2 overflow-hidden rounded-4xl border">
        <div className="bg-primary flex w-full flex-col gap-8 p-15">
          <section>
            <p className="text-primary-foreground text-4xl font-medium">
              Results Delivered
            </p>
            <p className="text-muted-foreground">
              We have delivered the reliable results in the industry
            </p>
          </section>

          <section className="grid grid-cols-2 gap-y-3">
            {ResultsData.map((data, index) => (
              <div key={index} className="">
                <p className="text-primary-foreground w-20 text-xl leading-tight">
                  {data.label}
                </p>
                <p className="text-muted-foreground text-sm">{data.title}</p>
              </div>
            ))}
          </section>

          <p className="text-muted-foreground">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
            magni sit porro nostrum vero similique aliquam harum. Beatae hic
            magnam, expedita quidem asperiores ut dolore voluptatum vitae,
            repellendus officiis soluta?
          </p>
        </div>

        <div className="bg-primary/70 w-full"></div>
      </div>
    </div>
  );
};
