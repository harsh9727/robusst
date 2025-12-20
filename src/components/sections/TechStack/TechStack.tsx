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
    <div className="flex flex-col gap-14">
      <section className="flex justify-between">
        <p className="text-primary-foreground text-4xl font-medium">
          Built on a Cutting-Edge <br /> Technology Stack
        </p>
        <p className="text-muted-foreground max-w-xl leading-tight">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque vero
          accusamus aliquid! Error quidem excepturi aliquam iusto ab, ipsum enim
          necessitatibus, totam eius veniam ipsa deserunt commodi reprehenderit
          obcaecati laboriosam.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-x-50 gap-y-10">
        {TechStackData.map((data, index) => (
          <div
            key={index}
            className="border-border/20 group grid w-full grid-cols-2 justify-between gap-8 border-t"
          >
            <p className="text-primary-foreground -mt-px w-fit border-t p-5 text-2xl">
              {data.title}
            </p>
            <div className="text-muted-foreground group-hover:text-primary-foreground p-5 duration-150">
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
