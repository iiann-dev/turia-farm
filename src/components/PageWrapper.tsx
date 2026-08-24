"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";

// Lenis is imported dynamically so phones never download it (they use native
// scrolling). Desktop & tablets load it on demand for smooth scroll.
type LenisInstance = { scrollTo: (t: number, o?: object) => void; destroy: () => void; raf: (t: number) => void };
let LenisCtor: (new (opts: object) => LenisInstance) | null = null;

interface PageWrapperProps {
  children: React.ReactNode;
  cmsSiteConfig?: {
    whatsapp?: string;
    socialLinks?: {
      instagram?: string;
      facebook?: string;
      tiktok?: string;
      youtube?: string;
    };
  };
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ 
  children, 
  cmsSiteConfig 
}) => {
  const lenisRef = useRef<LenisInstance | null>(null);
  const pathname = usePathname();
  const [isPhone] = useState<boolean>(() =>
    typeof navigator !== "undefined" && /Android|iPhone|Windows Phone/i.test(navigator.userAgent)
  );

  // Re-initialize Lenis on route change to avoid stale instances preserving scroll
  // Also scroll to top immediately after creating the new instance
  useEffect(() => {
    // Phones get native scrolling (Lenis smooth-scroll fights touch and adds
    // CPU overhead on low-end devices). Desktop & tablets keep smooth scroll.
    if (isPhone) {
      // No Lenis on phones — just scroll to top natively
      window.scrollTo(0, 0);
      return;
    }

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

      // Scroll to top immediately after Lenis is ready (on route change)
      // This runs AFTER the new page mounts, so new content starts at top
      lenis.scrollTo(0, { immediate: true });

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
    <div className="min-h-screen flex flex-col bg-[#faf9f3] text-[#1b1c19] selection:bg-[#c4ebde] selection:text-[#00251d]">
      <Navbar />
      <main className="flex-grow">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer cmsSiteConfig={cmsSiteConfig} />
    </div>
  );
};