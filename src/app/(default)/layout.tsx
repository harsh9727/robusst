import "~/styles/globals.css";

// utils
import { geist } from "~/utils/fonts";

// components
import { Header } from "~/components/layout";
import { Provider } from "~/components/wrapper";

export default function DefaultLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
