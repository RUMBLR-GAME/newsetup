"use client";

import { useEffect, useRef, useState } from "react";
import { Connection } from "@solana/web3.js";

const MAINNET_RPC =
  process.env.NEXT_PUBLIC_SOLANA_RPC ||
  "https://mainnet.helius-rpc.com/?api-key=fd23d5c6-3699-4e3e-8249-9bd774d3bdf6";

export type TxCountState = {
  /** The current displayed transaction count — interpolates between RPC polls
   *  so the number ticks smoothly upward instead of jumping in chunks */
  count: number | null;
  status: "loading" | "live" | "error";
};

const POLL_MS = 5000; // hit RPC every 5s
// Solana mainnet does ~2,500 TPS sustained. Between polls we extrapolate at
// this rate so the number always feels alive — not stalled waiting for the
// next RPC response. Tuned slightly conservative so we under-shoot and the
// next poll bumps us forward (rather than overshoot and tick backward).
const ESTIMATED_TPS = 2400;

export function useSolanaTxCount(): TxCountState {
  const [count, setCount] = useState<number | null>(null);
  const [status, setStatus] = useState<TxCountState["status"]>("loading");
  const connRef = useRef<Connection | null>(null);
  const lastFetchedCountRef = useRef<number | null>(null);
  const lastFetchedAtRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!connRef.current) {
      connRef.current = new Connection(MAINNET_RPC, "confirmed");
    }
    let cancelled = false;
    let pollTimer: ReturnType<typeof setTimeout>;
    let consecutiveFailures = 0;

    async function fetchCount() {
      try {
        const c = await connRef.current!.getTransactionCount("confirmed");
        if (cancelled) return;
        consecutiveFailures = 0;

        // First successful fetch — set immediately
        if (lastFetchedCountRef.current === null) {
          lastFetchedCountRef.current = c;
          lastFetchedAtRef.current = Date.now();
          setCount(c);
          setStatus("live");
          return;
        }

        // Subsequent fetches — only update the anchor if RPC is ahead of our
        // interpolation. If it's behind (rare, but possible due to RPC lag),
        // keep our smooth count and skip the snap-back.
        if (c > lastFetchedCountRef.current) {
          lastFetchedCountRef.current = c;
          lastFetchedAtRef.current = Date.now();
        }
        setStatus("live");
      } catch {
        consecutiveFailures += 1;
        if (consecutiveFailures > 3) setStatus("error");
      }
    }

    // Animation loop — interpolates the displayed count between RPC polls
    // using the estimated TPS so the digit row keeps ticking up smoothly
    function animate() {
      if (lastFetchedCountRef.current !== null) {
        const elapsedSec = (Date.now() - lastFetchedAtRef.current) / 1000;
        const projected = Math.floor(
          lastFetchedCountRef.current + elapsedSec * ESTIMATED_TPS
        );
        setCount(projected);
      }
      animFrameRef.current = requestAnimationFrame(animate);
    }

    fetchCount();
    animate();

    function poll() {
      let nextDelay = POLL_MS;
      if (consecutiveFailures >= 6) nextDelay = 20000;
      else if (consecutiveFailures >= 3) nextDelay = 10000;
      pollTimer = setTimeout(async () => {
        await fetchCount();
        poll();
      }, nextDelay);
    }
    poll();

    return () => {
      cancelled = true;
      if (pollTimer) clearTimeout(pollTimer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return { count, status };
}
