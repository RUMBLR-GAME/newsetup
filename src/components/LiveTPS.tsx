"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSolanaTPS } from "@/lib/useSolanaTPS";

export default function LiveTPS() {
  const { tps, status } = useSolanaTPS();

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={
        tps != null
          ? `Solana mainnet live — ${tps.toLocaleString()} transactions per second`
          : "Connecting to Solana mainnet"
      }
      className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint-mid/[0.08] border border-mint-mid/30 text-[11px] font-semibold tracking-[0.04em] text-mint-glow"
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
      <span className="text-white/70">Solana Mainnet</span>
      <AnimatePresence mode="wait">
        {tps != null ? (
          <motion.span
            key={tps}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="tabular-nums text-mint-glow"
          >
            {tps.toLocaleString()} TPS
          </motion.span>
        ) : (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-white/40"
          >
            connecting…
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
