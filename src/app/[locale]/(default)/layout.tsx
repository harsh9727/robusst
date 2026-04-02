import "~/styles/globals.css";

// components
import { Footer, Header } from "~/components/layout";
import { Provider } from "~/components/wrapper";
import GoToTop from "~/components/common/GoToTop/GoToTop";

// ISR: lock to static rendering; safety net for CMS-driven pages
export const dynamic = "force-static";
export const revalidate = 300; // 5-minute baseline (webhook is primary)

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
