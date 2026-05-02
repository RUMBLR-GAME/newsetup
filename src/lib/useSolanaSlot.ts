"use client";

import { useEffect, useState, useRef } from "react";
import { Connection } from "@solana/web3.js";

const MAINNET_RPC =
  process.env.NEXT_PUBLIC_SOLANA_RPC || "https://mainnet.helius-rpc.com/?api-key=fd23d5c6-3699-4e3e-8249-9bd774d3bdf6";

export type SlotState = {
  slot: number | null;
  status: "loading" | "live" | "error";
};

/**
 * Polls Solana mainnet RPC for the current slot. Slots tick ~2.5x per second on
 * Solana mainnet, so we poll every 1.5s — fast enough to *feel* live, slow
 * enough to not hammer the public RPC.
 *
 * We poll instead of WebSocket-subscribe to avoid keeping a persistent
 * connection open from every visitor's browser to a public RPC (which has
 * rate limits).
 */
export function useSolanaSlot(refreshMs: number = 800): SlotState {
  const [state, setState] = useState<SlotState>({ slot: null, status: "loading" });
  const connRef = useRef<Connection | null>(null);

  useEffect(() => {
    if (!connRef.current) {
      connRef.current = new Connection(MAINNET_RPC, "confirmed");
    }
    let cancelled = false;

    async function fetchSlot() {
      try {
        const slot = await connRef.current!.getSlot("confirmed");
        if (cancelled) return;
        setState({ slot, status: "live" });
      } catch (err) {
        if (!cancelled) {
          setState((s) => ({ slot: s.slot, status: "error" }));
        }
      }
    }

    fetchSlot();
    const id = setInterval(fetchSlot, refreshMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [refreshMs]);

  return state;
}
