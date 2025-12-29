import type { Metadata } from "next";
import "~/styles/globals.css";

// utils
import { generateSeo } from "~/utils";

// components

// generate metadata
export const generateMetadata = (): Metadata =>
  generateSeo({
    title: {
      template: `%s | Robousst`,
      default: "Robousst - AI powered telecom solutions provider",
    },
    description: "AI powered telecom solutions provider",
    url: "/",
  });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
