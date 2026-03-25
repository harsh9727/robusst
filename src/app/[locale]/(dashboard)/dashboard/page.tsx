import React from "react";
import { setRequestLocale } from "next-intl/server";

// utils
import { generateSeo } from "~/utils";

// generate metadata
export const generateMetadata = () =>
  generateSeo({
    title: "Dashboard",
    description: "AI powered telecom solutions provider",
    url: "/",
  });

const Dashboard = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <p>Robusst - Dashboard</p>
    </main>
  );
};

export default Dashboard;
