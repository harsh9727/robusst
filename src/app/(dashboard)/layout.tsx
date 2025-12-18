import "~/styles/globals.css";

// utils
import { geist } from "~/utils/fonts";

// components
import { Provider } from "~/components/wrapper";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
