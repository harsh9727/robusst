import type { Metadata } from "next";
import React from "react";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

const Login = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <p>Robusst - Login</p>
    </main>
  );
};

export default Login;
