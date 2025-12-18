import React from "react";

export const Hero: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col justify-center gap-5 px-50">
      <p className="text-6xl font-medium">
        AI Solutions to Skyrocket <br /> Revenue & Delight Customers
      </p>
      <p className="text-muted-foreground text-lg font-medium uppercase">
        We help companies to monetize their power of data using AI
      </p>
    </div>
  );
};
