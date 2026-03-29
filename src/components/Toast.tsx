"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function Toast({
  open,
  message,
}: {
  open: boolean;
  message: string;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.18 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-[104px] z-50 px-3 py-2 rounded-full bg-black/70 border border-white/10 text-sm"
          role="status"
          aria-live="polite"
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

