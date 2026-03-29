"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="joya-shell starfield bg-joya-bg0">
      <div className="absolute inset-0">
        <div className="h-full w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="h-full w-full overflow-y-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div id="overlay-root" className="absolute inset-0 z-40" />
    </div>
  );
}
