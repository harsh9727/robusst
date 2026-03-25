import type { Metadata } from "next";
import React from "react";
import { setRequestLocale } from "next-intl/server";

// utils
import { generateSeo } from "~/utils";

// generate metadata
export const generateMetadata = (): Metadata =>
  generateSeo({
    title: "Login",
    description: "AI powered telecom solutions provider",
    url: "/",
  });

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
