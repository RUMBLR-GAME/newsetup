"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSolanaSlot } from "@/lib/useSolanaSlot";

export default function LiveSlot() {
  const { slot, status } = useSolanaSlot();

  return (
    <div
      role="status"
      aria-live="polite"
      className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.04em] text-white/55"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          aria-hidden
          className={`absolute inline-flex h-full w-full rounded-full bg-mint-mid ${
            status === "live" ? "animate-ping opacity-75" : "opacity-30"
          }`}
        />
        <span
          aria-hidden
          className="relative inline-flex rounded-full h-1.5 w-1.5 bg-mint-mid"
        />
      </span>
      <span className="uppercase tracking-[0.14em] text-white/45">
        Live · slot
      </span>
      <AnimatePresence mode="wait">
        {slot != null ? (
          <motion.span
            key={slot}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.15 }}
            className="tabular-nums text-mint-glow"
          >
            {slot.toLocaleString()}
          </motion.span>
        ) : (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/30"
          >
            connecting…
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
