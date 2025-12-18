import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

// utils
import { geist } from "~/utils/fonts";

export default function DefaultLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
