"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Result = {
  signature: string;
  explorerUrl: string;
  durationMs: number;
};

type ApiResponse =
  | {
      signature: string;
      cluster: string;
      explorerUrl: string;
      lamports: number;
      durationMs: number;
      from: string;
      to: string;
    }
  | { error: string; details?: string };

export default function DemoPayment() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function send() {
    setState("sending");
    setError(null);
    setResult(null);

    const startedAt = Date.now();
    try {
      const res = await fetch("/api/demo-payment", { method: "POST" });
      const data = (await res.json()) as ApiResponse;

      if (!res.ok || "error" in data) {
        const msg = "error" in data ? data.error : "Request failed";
        throw new Error(msg);
      }

      // Make sure the user perceives at least a brief "sending" moment even
      // if the RPC is unusually fast — feels like the network is working
      const elapsed = Date.now() - startedAt;
      if (elapsed < 600) {
        await new Promise((r) => setTimeout(r, 600 - elapsed));
      }

      setResult({
        signature: data.signature,
        explorerUrl: data.explorerUrl,
        durationMs: data.durationMs,
      });
      setState("success");
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
      setState("error");
    }
  }

  function reset() {
    setState("idle");
    setResult(null);
    setError(null);
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Phone-style frame */}
      <div className="relative rounded-[40px] bg-surface-raised border border-white/[0.08] shadow-[0_30px_80px_-20px_rgba(102,205,131,0.25),0_0_0_1px_rgba(255,255,255,0.04)] overflow-hidden p-6 md:p-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span
                aria-hidden
                className="absolute inline-flex h-full w-full rounded-full bg-mint-mid animate-ping opacity-75"
              />
              <span
                aria-hidden
                className="relative inline-flex rounded-full h-2 w-2 bg-mint-mid"
              />
            </span>
            <span className="text-[10px] font-semibold tracking-[0.14em] text-mint-glow uppercase">
              Solana Devnet · Live
            </span>
          </div>
          <span className="text-[10px] tracking-[0.14em] text-white/35 uppercase font-semibold">
            Real chain · No real money
          </span>
        </div>

        {/* Demo body */}
        <div className="text-center mb-6">
          <p className="text-xs tracking-[0.14em] text-white/40 uppercase font-semibold mb-3">
            Try a payment
          </p>
          <p className="text-3xl md:text-4xl font-bold tracking-tight tabular-nums">
            0.000001
          </p>
          <p className="text-xs text-white/40 mt-1 uppercase tracking-[0.14em] font-semibold">
            SOL · self-transfer
          </p>
        </div>

        {/* Action button + states */}
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.button
              key="idle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              onClick={send}
              className="group w-full bg-mint-mid text-mint-ink font-semibold py-4 rounded-full hover:bg-mint-glow transition-colors inline-flex items-center justify-center gap-2"
            >
              Send on Solana
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </motion.button>
          )}

          {state === "sending" && (
            <motion.div
              key="sending"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="w-full py-4 text-center"
            >
              <div className="inline-flex items-center gap-3 text-mint-glow font-semibold">
                <span className="relative flex h-3 w-3">
                  <span
                    aria-hidden
                    className="absolute inline-flex h-full w-full rounded-full bg-mint-mid animate-ping"
                  />
                  <span
                    aria-hidden
                    className="relative inline-flex rounded-full h-3 w-3 bg-mint-mid"
                  />
                </span>
                Submitting to Solana…
              </div>
              <p className="text-xs text-white/40 mt-2 tracking-wide">
                Signing · broadcasting · waiting for confirmation
              </p>
            </motion.div>
          )}

          {state === "success" && result && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <div className="flex items-center justify-center gap-2 bg-mint-mid/10 border border-mint-mid/30 rounded-full py-3 mb-4">
                <span aria-hidden className="text-mint-glow">
                  ✓
                </span>
                <span className="text-mint-glow font-semibold text-sm">
                  Confirmed in {(result.durationMs / 1000).toFixed(2)}s
                </span>
              </div>
              <div className="bg-black/40 rounded-2xl p-4 mb-3 border border-white/[0.06]">
                <p className="text-[10px] tracking-[0.14em] text-white/40 uppercase font-semibold mb-2">
                  Transaction signature
                </p>
                <p className="font-mono text-xs text-white/80 break-all leading-relaxed">
                  {result.signature.slice(0, 24)}…{result.signature.slice(-12)}
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={result.explorerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white text-sm font-semibold py-3 rounded-full transition-colors"
                >
                  View on Solscan ↗
                </a>
                <button
                  onClick={reset}
                  className="px-5 bg-mint-mid/10 hover:bg-mint-mid/20 border border-mint-mid/30 text-mint-glow text-sm font-semibold py-3 rounded-full transition-colors"
                >
                  Send again
                </button>
              </div>
            </motion.div>
          )}

          {state === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="w-full"
            >
              <div className="bg-red-500/10 border border-red-500/30 rounded-full py-3 px-4 text-center mb-3">
                <p className="text-red-300 text-sm font-medium">
                  {error ?? "Something went wrong"}
                </p>
              </div>
              <button
                onClick={reset}
                className="w-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white font-semibold py-3 rounded-full transition-colors"
              >
                Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footnote */}
        <p className="text-[10px] text-white/35 text-center mt-5 leading-relaxed">
          This signs a real transaction on Solana devnet (test network).
          <br />
          Demo wallet — no real funds at risk.
        </p>
      </div>
    </div>
  );
}
