"use client";

import React, { useEffect, useRef, useState } from "react";

const PHONE_RE = /Android|iPhone|Windows Phone/i;

type StatCounterProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
};

/**
 * Count-up number that animates when scrolled into view.
 *
 * - Phones (Android / iPhone / Windows Phone): render the final value
 *   instantly — no animation, zero JS cost, matches the site's
 *   phone-first optimization.
 * - Desktop & tablets: animate 0 → value with easeOutQuart once the
 *   stat enters the viewport (IntersectionObserver, no framer-motion
 *   dependency so it works even before the motion chunk arrives).
 *
 * The initial state is the FINAL value so phones never flash "0",
 * and desktop just resets to 0 at animation start (hidden by the
 * scroll-reveal wrapper which starts at opacity 0 anyway).
 */
export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  decimals = 0,
  suffix = "",
  duration = 1600,
}) => {
  const [display, setDisplay] = useState(value);
  const [isPhone, setIsPhone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setIsPhone(typeof navigator !== "undefined" && PHONE_RE.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (isPhone) return; // phones already show the final value

    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let startTs: number | null = null;
    let observer: IntersectionObserver | null = null;

    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      setDisplay(value * eased);
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDisplay(0); // reset, then count up
          rafId = requestAnimationFrame(tick);
          observer?.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [isPhone, value, duration]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
};
