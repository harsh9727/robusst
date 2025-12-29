import React from "react";

// utils
import { generateSeo } from "~/utils";

// generate metadata
export const generateMetadata = () =>
  generateSeo({
    title: "Dashboard",
    description: "AI powered telecom solutions provider",
    url: "/",
  });

const Dashboard: React.FC = () => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <p>Robusst - Dashboard</p>
    </main>
  );
};

export default Dashboard;
