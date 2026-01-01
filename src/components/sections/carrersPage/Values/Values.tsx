import React from "react";

const data = [
  {
    title: "Ownership",
    desc: "We take full responsibility for our work, career, and environment. Delivering results with maximum commitment and effort.",
  },
  {
    title: "Growth",
    desc: "We adapt to a rapidly changing world, or we die. We learn and improve as individuals, as a team, and as a business.",
  },
  {
    title: "Meaningful Relationships",
    desc: "Relationships add a deeper meaning to our lives, make us stronger, act as an exponential multiplier for our impact as well as become our safety net in difficult situations.",
  },
  {
    title: "Open Communication",
    desc: "We are transparent and make information available. We share candid feedback in a timely way and with positive intent.",
  },
  {
    title: "Customer Obsession",
    desc: "We exist to create extraordinary value for customers.",
  },
];

export const Values: React.FC = () => {
  return (
    <section className="bg-primary relative overflow-hidden px-6 py-15 sm:px-12 md:py-20 xl:px-25">
      <div className="bg-brand-two absolute -top-60 -right-20 h-40 w-100 rotate-6 blur-[200px] sm:h-50 sm:w-180" />
      <div className="bg-brand-two absolute -bottom-30 left-1/2 size-40 -translate-x-1/2 rounded-full blur-[140px] sm:size-50" />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        {/* Content */}
        <div className="h-full w-full">
          <h3 className="mb-5 text-2xl leading-tight font-bold text-white sm:text-3xl md:text-4xl">
            Robusst Culture Starts With Values
          </h3>

          <div className="mt-8 grid w-full gap-5 md:grid-cols-2">
            {data.map((data, index) => (
              <div
                key={index}
                className="border-border/20 rounded-lg border p-5"
              >
                <div className="bg-primary-foreground size-9 rounded-sm" />
                <h3 className="text-primary-foreground mt-4 text-2xl font-semibold">
                  {data.title}
                </h3>
                <p className="text-primary-foreground/70 mt-3 leading-tight">
                  {data.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
