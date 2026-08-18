"use client";

import React, { useEffect, useState } from "react";

/**
 * Phone-only performance helper.
 *
 * On phones (Android / iPhone / Windows Phone) the element renders as plain
 * static HTML and the framer-motion engine is NEVER downloaded or executed.
 * Desktop & tablets get the exact same animations as before — framer-motion is
 * loaded on demand (small async chunk) and takes over seamlessly because the
 * static placeholder already sits at the matching `initial` state.
 */
type AnimatedProps = React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "section" | "li" | "span" | "h2" | "h3" | "p";
  initial?: Record<string, unknown> | boolean;
  animate?: Record<string, unknown> | boolean;
  whileInView?: Record<string, unknown> | boolean;
  viewport?: Record<string, unknown>;
  transition?: Record<string, unknown>;
  children?: React.ReactNode;
};

const PHONE_RE = /Android|iPhone|Windows Phone/i;

/** Map framer-motion `initial` values to inline CSS so the static placeholder
 *  matches the exact state motion would start from (no visual jump when the
 *  motion module arrives on desktop/tablet). */
function initialToCss(value: AnimatedProps["initial"]): React.CSSProperties {
  const css: React.CSSProperties = {};
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    if (typeof o.opacity === "number") css.opacity = o.opacity;
    if (typeof o.height === "number") css.height = `${o.height}px`;
    if (typeof o.height === "string") css.height = o.height;
    const transforms: string[] = [];
    if (typeof o.x === "number") transforms.push(`translateX(${o.x}px)`);
    if (typeof o.y === "number") transforms.push(`translateY(${o.y}px)`);
    if (typeof o.scale === "number") transforms.push(`scale(${o.scale})`);
    if (transforms.length > 0) css.transform = transforms.join(" ");
  }
  return css;
}

export const Animated: React.FC<AnimatedProps> = ({
  as = "div",
  children,
  className,
  style,
  initial,
  animate,
  whileInView,
  viewport,
  transition,
}) => {
  // Start as "not phone" for SSR/hydration (matches server markup), then flip
  // to the real value after mount — the hydration-safe pattern.
  const [isPhone, setIsPhone] = useState<boolean>(false);
  const [MotionTag, setMotionTag] = useState<React.ElementType | null>(null);

  useEffect(() => {
    setIsPhone(typeof navigator !== "undefined" && PHONE_RE.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    // Synchronous UA check so phones never even START the framer import
    // (async import is only triggered for non-phone devices).
    if (typeof navigator !== "undefined" && PHONE_RE.test(navigator.userAgent)) return;
    if (isPhone) return;
    let cancelled = false;
    import("framer-motion").then(({ motion }) => {
      if (cancelled) return;
      const tag = (motion as unknown as Record<string, React.ElementType>)[as];
      setMotionTag(tag ?? "div");
    });
    return () => {
      cancelled = true;
    };
  }, [isPhone, as]);

  // Phones: plain static element — framer-motion chunk never downloaded.
  if (isPhone) {
    return React.createElement(as, { className, style }, children);
  }

  // Desktop/tablet before the motion module arrives: static element already at
  // the exact `initial` state, so motion takes over with zero visual jump.
  if (!MotionTag) {
    return React.createElement(
      as,
      { className, style: { ...style, ...initialToCss(initial) } },
      children
    );
  }

  return (
    <MotionTag
      initial={initial}
      animate={animate}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
};