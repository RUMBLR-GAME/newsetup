"use client";

import { useEffect, useRef, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";

const MAINNET_RPC =
  process.env.NEXT_PUBLIC_SOLANA_RPC || "https://mainnet.helius-rpc.com/?api-key=fd23d5c6-3699-4e3e-8249-9bd774d3bdf6";

// Four of Solana's busiest programs — combined throughput easily 1000+ sigs/sec.
// We rotate through them so any single program slowdown doesn't dry up the river.
const HOT_PROGRAMS = [
  // Jupiter v6 aggregator — DEX swap volume
  new PublicKey("JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"),
  // Raydium AMM v4 — liquidity / swap pool
  new PublicKey("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"),
  // Pump.fun — meme launches, very high volume
  new PublicKey("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"),
  // Phoenix — orderbook DEX
  new PublicKey("PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY"),
];

export type RiverTx = {
  signature: string;
  slot: number;
  spawnAt: number;
  lane: number;
  size: number;
  /** Synthesized AUD amount (display value only) */
  audAmount: number;
};

export type RiverState = {
  txs: RiverTx[];
  status: "loading" | "live" | "error";
};

const MAX_QUEUED = 400;
const POLL_MS = 500; // every 500ms hit one program for 25 fresh sigs — Helius quota handles this easily
const PROGRAM_LIMIT = 25;

/**
 * Realistic AUD amount distribution for a P2P payments app.
 * Heavy small ($3-$25), tail of larger.
 */
function generateAudAmount(): number {
  const r = Math.random();
  if (r < 0.5) return Number((3 + Math.random() * 22).toFixed(2));
  if (r < 0.78) return Number((25 + Math.random() * 70).toFixed(2));
  if (r < 0.93) return Number((100 + Math.random() * 400).toFixed(0));
  if (r < 0.99) return Number((500 + Math.random() * 1500).toFixed(0));
  return Number((2000 + Math.random() * 3000).toFixed(0));
}

export function useSolanaRiver(lanes: number = 6): RiverState {
  const [txs, setTxs] = useState<RiverTx[]>([]);
  const [status, setStatus] = useState<RiverState["status"]>("loading");
  const seenSigsRef = useRef<Set<string>>(new Set());
  const connRef = useRef<Connection | null>(null);
  const programIdxRef = useRef(0);

  useEffect(() => {
    if (!connRef.current) {
      connRef.current = new Connection(MAINNET_RPC, "confirmed");
    }
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let consecutiveFailures = 0;

    function pushBatch(newTxs: RiverTx[]) {
      if (!newTxs.length) return;
      setTxs((prev) => {
        const merged = [...prev, ...newTxs];
        return merged.slice(-MAX_QUEUED);
      });
    }

    async function tick() {
      // Rotate through hot programs — one per tick, balances load on RPC
      const program = HOT_PROGRAMS[programIdxRef.current % HOT_PROGRAMS.length];
      programIdxRef.current += 1;

      try {
        const sigs = await connRef.current!.getSignaturesForAddress(program, {
          limit: PROGRAM_LIMIT,
        });
        if (cancelled) return;
        consecutiveFailures = 0;

        // Filter to genuinely new signatures
        const fresh = sigs.filter((s) => !seenSigsRef.current.has(s.signature));
        for (const s of fresh) seenSigsRef.current.add(s.signature);

        // Cap the seen set so it doesn't grow unbounded
        if (seenSigsRef.current.size > 5000) {
          const arr = Array.from(seenSigsRef.current);
          seenSigsRef.current = new Set(arr.slice(-2500));
        }

        if (fresh.length > 0) {
          const realTxs: RiverTx[] = fresh.map((s, i) => ({
            signature: s.signature,
            slot: s.slot,
            spawnAt: Date.now() + i * 30,
            lane: Math.floor(Math.random() * lanes),
            size: 1 + Math.floor(Math.random() * 3),
            audAmount: generateAudAmount(),
          }));
          pushBatch(realTxs);
        }

        setStatus("live");
      } catch {
        consecutiveFailures += 1;
        setStatus((s) => (s === "live" ? "live" : "error"));
      }

      // Adaptive backoff: if we're getting rate-limited, slow down progressively.
      // Default 800ms; after 3 failures, 2s; after 6, 5s.
      let nextDelay = POLL_MS;
      if (consecutiveFailures >= 6) nextDelay = 5000;
      else if (consecutiveFailures >= 3) nextDelay = 2000;

      timer = setTimeout(tick, nextDelay);
    }

    tick();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [lanes]);

  return { txs, status };
}
