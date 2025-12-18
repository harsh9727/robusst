import "~/styles/globals.css";

// utils
import { generateSeo } from "~/utils";
import { geist } from "~/utils/fonts";

// components
import { Provider } from "~/components/wrapper";

// generate metadata
export const generateMetadata = () =>
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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
