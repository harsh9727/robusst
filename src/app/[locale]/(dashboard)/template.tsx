"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayPath, setDisplayPath] = useState(pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      prevPathnameRef.current = pathname;

      // Use setTimeout to avoid direct setState in effect
      setTimeout(() => {
        setIsTransitioning(true);

        // Show loading screen after fade out (300ms)
        const showLoaderTimeout = setTimeout(() => {
          setShowLoadingScreen(true);
        }, 300);

        // Hide loading screen and show new page (total: 3300ms)
        const hideLoaderTimeout = setTimeout(() => {
          setShowLoadingScreen(false);
          setDisplayPath(pathname);
        }, 3300);

        // Reset transition state
        const resetTimeout = setTimeout(() => {
          setIsTransitioning(false);
        }, 3600);

        // Cleanup timeouts on unmount
        return () => {
          clearTimeout(showLoaderTimeout);
          clearTimeout(hideLoaderTimeout);
          clearTimeout(resetTimeout);
        };
      }, 0);
    }
  }, [pathname]);

  return (
    <>
      {/* Loading Screen Overlay */}
      <AnimatePresence mode="wait">
        {showLoadingScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.7, 0.1, 0.01, 1],
              }}
              className="text-4xl font-medium tracking-[0.2em] text-white drop-shadow-lg sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              <motion.span
                initial={{ filter: "blur(10px)" }}
                animate={{ filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.4 }}
                className="inline-block"
              >
                Robusst
              </motion.span>
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <div
        className={`page-transition relative ${isTransitioning ? "page-exit" : "page-enter"}`}
        key={displayPath}
      >
        {children}
      </div>
    </>
  );
}
