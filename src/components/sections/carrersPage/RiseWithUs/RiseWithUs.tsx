import React from "react";

const data = [
  {
    title: "Innovation First",
    description:
      "Work on cutting-edge AI/ML platforms, cloud- native BSS/OSS, and customer intelligence solutions",
  },
  {
    title: "Culture That Inspires",
    description:
      "Collaborative, inclusive environment where every voice matters and innovation is celebrated",
  },
  {
    title: "Growth & Learning",
    description:
      "Continuous learning programs, certifications, mentorship, and clear career advancement paths",
  },
  {
    title: "Global Impact",
    description:
      "Your work reaches 800M+ subscribers across Asia, Middle East, Africa, Europe & Americas",
  },
];

export const RiseWithUs: React.FC = () => {
  return (
    <div className="relative container mx-auto flex w-full flex-col gap-5 px-6 pt-12 sm:px-12 sm:pt-16 lg:px-25 lg:pt-25">
      <h3 className="text-4xl font-semibold">Rise With Robusst</h3>

      <div className="grid w-full gap-5 md:grid-cols-2">
        {data.map((d, index) => (
          <div key={index} className="rounded-lg border p-5">
            <div className="bg-primary size-9 rounded-sm" />
            <h3 className="mt-4 text-2xl font-semibold">{d.title}</h3>
            <p className="text-muted-foreground leading-tight">
              {d.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
