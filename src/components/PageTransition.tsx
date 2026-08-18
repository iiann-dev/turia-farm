"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const PageTransition: React.FC<{
  children: ReactNode;
  onExitComplete?: () => void;
}> = ({ children, onExitComplete }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
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
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
