import React from "react";

export const Results: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 px-50 py-25">
      <section className="flex flex-col justify-center gap-1 text-center">
        <p className="text-4xl font-medium">Results Delivered</p>
      </section>

      <section className="flex w-full justify-between gap-20 px-50">
        <div className="bg-primary/20 h-100 w-full rounded-xl" />
        <div className="flex w-full flex-col gap-5 py-2">
          <ul className="list-disc space-y-1 text-lg">
            <li>
              <strong>3× higher campaign conversions</strong> and{" "}
              <strong>8× faster</strong> campaign launches
            </li>
            <li>
              Enhanced customer engagement and{" "}
              <strong>20% lower churn rate</strong>
            </li>
            <li>
              Data-driven decisions boosting marketing ROI by{" "}
              <strong>200%</strong>
            </li>
            <li>
              <strong>78% less</strong> network downtime with proactive issue
              resolution
            </li>
            <li>
              Real-time visibility and <strong>85% reduction</strong> in revenue
              leakage
            </li>
            <li>
              <strong>61% more</strong> productive sales teams with faster
              decision-making
            </li>
            <li>
              Scalable cloud-native infrastructure reducing operational costs by{" "}
              <strong>55%</strong>
            </li>
            <li>
              Higher customer lifetime value (<strong>+45%</strong>) and{" "}
              <strong>25%</strong> ARPU growth
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
