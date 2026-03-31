"use client";

import { useEffect, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

import useLockBodyScroll from "@/hooks/useLockBodyScroll";

export default function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  const titleId = useId();
  const portalEl =
    typeof document === "undefined" ? null : document.getElementById("overlay-root");

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const content = (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            className="absolute inset-0 z-40 bg-black/35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label="关闭弹层"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            drag="y"
            dragElastic={0.08}
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(_, info) => {
              const shouldClose = info.offset.y > 110 || info.velocity.y > 900;
              if (shouldClose) onClose();
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="absolute bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-joya-bg0/95 backdrop-blur-xl border-t border-joya-black/10"
          >
            <div className="px-5 pt-4 pb-6">
              <div className="mx-auto h-1.5 w-12 rounded-full bg-joya-black/12" />
              {title && (
                <div className="mt-4 flex items-center gap-3">
                  <div id={titleId} className="text-lg font-semibold">
                    {title}
                  </div>
                </div>
              )}
              <div className="mt-4">{children}</div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );

  if (!portalEl) return null;
  return createPortal(content, portalEl);
}
