import "~/styles/globals.css";

// components
import { Footer, Header } from "~/components/layout";
import { Provider } from "~/components/wrapper";
import GoToTop from "~/components/common/GoToTop/GoToTop";

export default function DefaultLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Provider>
        <GoToTop />
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
      </Provider>
    </>
  );
}
