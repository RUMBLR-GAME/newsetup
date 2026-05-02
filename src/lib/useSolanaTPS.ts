"use client";

import { useEffect, useState, useRef } from "react";
import { Connection } from "@solana/web3.js";

const MAINNET_RPC =
  process.env.NEXT_PUBLIC_SOLANA_RPC || "https://mainnet.helius-rpc.com/?api-key=fd23d5c6-3699-4e3e-8249-9bd774d3bdf6";

export type TPSState = {
  tps: number | null;
  status: "loading" | "live" | "error";
};

/**
 * Polls Solana mainnet RPC for recent performance samples and computes a
 * smoothed TPS. Default refresh: every 8 seconds.
 *
 * Solana exposes `getRecentPerformanceSamples` which returns ~60s windows.
 * We average the most recent few samples for a stable, "live-feeling" number.
 */
export function useSolanaTPS(refreshMs: number = 8000): TPSState {
  const [state, setState] = useState<TPSState>({ tps: null, status: "loading" });
  const connRef = useRef<Connection | null>(null);

  useEffect(() => {
    if (!connRef.current) {
      connRef.current = new Connection(MAINNET_RPC, "confirmed");
    }
    let cancelled = false;

    async function fetchTPS() {
      try {
        const samples = await connRef.current!.getRecentPerformanceSamples(3);
        if (cancelled || !samples.length) return;

        // Average TPS over the most recent samples
        const totalTxns = samples.reduce(
          (sum, s) => sum + s.numTransactions,
          0
        );
        const totalSecs = samples.reduce(
          (sum, s) => sum + s.samplePeriodSecs,
          0
        );
        const tps = totalSecs > 0 ? Math.round(totalTxns / totalSecs) : 0;
        setState({ tps, status: "live" });
      } catch (err) {
        if (!cancelled) {
          // Don't reset to null — keep last good value if we have one
          setState((s) => ({ tps: s.tps, status: "error" }));
        }
      }
    }

    fetchTPS();
    const id = setInterval(fetchTPS, refreshMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [refreshMs]);

  return state;
}
