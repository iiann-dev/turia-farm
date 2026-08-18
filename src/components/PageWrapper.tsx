"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";

// Lenis is imported dynamically so phones never download it (they use native
// scrolling). Desktop & tablets load it on demand for smooth scroll.
type LenisInstance = { scrollTo: (t: number, o?: object) => void; destroy: () => void; raf: (t: number) => void };
let LenisCtor: (new (opts: object) => LenisInstance) | null = null;

export const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<LenisInstance | null>(null);
  const pathname = usePathname();
  const [isPhone] = useState<boolean>(() =>
    typeof navigator !== "undefined" && /Android|iPhone|Windows Phone/i.test(navigator.userAgent)
  );

  // Re-initialize Lenis on route change to avoid stale instances preserving scroll
  useEffect(() => {
    // Phones get native scrolling (Lenis smooth-scroll fights touch and adds
    // CPU overhead on low-end devices). Desktop & tablets keep smooth scroll.
    if (isPhone) return;

    let cancelled = false;
    import("lenis").then((mod) => {
      if (cancelled) return;
      LenisCtor = mod.default;
      const lenis = new LenisCtor!({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [isPhone, pathname]);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#faf9f3] text-[#1b1c19] selection:bg-[#c4ebde] selection:text-[#00251d]">
        <Navbar />
        <main className="flex-grow">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};
