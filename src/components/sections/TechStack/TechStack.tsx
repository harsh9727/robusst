import React from "react";

const TechStackData = [
  {
    title: "Cloud-Native Platforms",
    stack: [
      "Amazon Web Services",
      "Microsoft Azure",
      "Google Cloud Platform",
      "Kubernetes",
    ],
  },
  {
    title: "AI & ML",
    stack: [
      "Predictive Analytics",
      "Natural Language Processing (NLP)",
      "Automated Insights",
    ],
  },
  {
    title: "Enterprise Security",
    stack: [
      "SOC2",
      "GDPR",
      "ISO27001",
      "Encrypted by default",
      "Compliance & Security",
    ],
  },
  {
    title: "Seamless Integration",
    stack: ["APIs", "Webhooks", "Real-time sync"],
  },
];

export const TechStack: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 lg:gap-14">
      <section className="flex flex-col justify-between gap-6 lg:flex-row lg:gap-0">
        <p className="text-primary-foreground text-2xl font-medium sm:text-3xl lg:text-4xl">
          Built on a Cutting-Edge <br className="hidden sm:block" /> Technology
          Stack
        </p>
        <p className="text-muted-foreground max-w-full text-sm leading-relaxed sm:text-base sm:leading-tight lg:max-w-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque vero
          accusamus aliquid! Error quidem excepturi aliquam iusto ab, ipsum enim
          necessitatibus, totam eius veniam ipsa deserunt commodi reprehenderit
          obcaecati laboriosam.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-x-10 gap-y-6 sm:gap-x-30 sm:gap-y-8 lg:grid-cols-2 lg:gap-x-50 lg:gap-y-10">
        {TechStackData.map((data, index) => (
          <div
            key={index}
            className="border-border/20 group grid w-full grid-cols-1 justify-between gap-4 border-t sm:grid-cols-2 sm:gap-6 lg:gap-8"
          >
            <p className="text-primary-foreground -mt-px w-fit border-t p-4 text-xl sm:p-5 sm:text-2xl">
              {data.title}
            </p>
            <div className="text-muted-foreground group-hover:text-primary-foreground p-4 text-sm duration-150 sm:p-5 sm:text-base">
              {data.stack.map((stack, index) => (
                <p key={index}>{stack}</p>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
