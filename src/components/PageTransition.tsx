"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

// Mounts together with each page (inside the keyed motion.div), so its effect
// runs AFTER the new page is in the DOM — the correct moment for scroll reset.
const PageEnterEffect: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
  useEffect(() => {
    onEnter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export const PageTransition: React.FC<{
  children: ReactNode;
  onEnter?: () => void;
}> = ({ children, onEnter }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.35,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="min-h-screen"
      >
        <PageEnterEffect onEnter={onEnter ?? (() => {})} />
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
