"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
  direction?: "forward" | "backward";
}

export default function PageTransition({ children, direction = "forward" }: PageTransitionProps) {
  const variants = {
    enter: {
      x: direction === "forward" ? "100%" : "-100%",
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: direction === "forward" ? "-100%" : "100%",
      opacity: 0,
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="enter"
        animate="center"
        exit="exit"
        variants={variants}
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        className="absolute inset-0"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
