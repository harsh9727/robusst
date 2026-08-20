import type { Metadata } from "next";
import React from "react";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

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
