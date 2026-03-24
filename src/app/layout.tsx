import type { Metadata } from "next";
import "~/styles/globals.css";

// utils
import { generateSeo } from "~/utils";

import { Analytics } from "@vercel/analytics/next";
// components

// generate metadata
export const generateMetadata = (): Metadata =>
  generateSeo({
    title: {
      template: `%s | Robusst`,
      default: "Robusst - AI powered telecom solutions provider",
    },
    description: "AI powered telecom solutions provider",
    url: "/",
  });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
