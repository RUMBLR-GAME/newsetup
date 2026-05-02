"use client";

import dynamic from "next/dynamic";
import { useSolanaTxCount } from "@/lib/useSolanaTxCount";
import FadeIn from "../FadeIn";

const SolanaRiver = dynamic(() => import("../SolanaRiver"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="w-full h-[440px] md:h-[520px]"
      style={{
        background:
          "radial-gradient(ellipse 1100px 400px at 50% 50%, rgba(102,205,131,0.06) 0%, transparent 65%), #000",
      }}
    />
  ),
});

function formatCount(n: number | null): string {
  if (n === null) return "—";
  return n.toLocaleString("en-US");
}

/**
 * Subtle live counter — small badge in top-left of the section.
 * The number ticks upward continuously but stays compact. It's an indicator
 * that the river below is real, not the focal point of the section.
 */
function LiveCounterBadge() {
  const { count, status } = useSolanaTxCount();

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm px-4 py-2">
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
      <span className="text-[10px] tracking-[0.18em] text-white/55 uppercase font-bold">
        Live Solana txs
      </span>
      <span
        aria-live="polite"
        className="text-[13px] font-bold tabular-nums text-white/95 tracking-tight"
      >
        {formatCount(count)}
      </span>
    </div>
  );
}

export default function LiveRiver() {
  return (
    <section
      id="live-river"
      aria-label="Live Solana mainnet transaction river"
      className="relative w-full bg-black overflow-hidden"
    >
      {/* Top divider */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      />

      {/* Subtle ambient glow — mint left, purple right */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 900px 400px at 20% 40%, rgba(102,205,131,0.05) 0%, transparent 70%), radial-gradient(ellipse 700px 350px at 80% 50%, rgba(153,69,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Heading band: subtle counter top-left, eyebrow top-right */}
      <div className="container-fluid relative px-6 md:px-8 lg:px-20 pt-20 md:pt-28 pb-10 md:pb-12">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <LiveCounterBadge />
            <p className="text-xs md:text-sm text-white/45 leading-relaxed max-w-md md:text-right">
              Every glowing dot below is a confirmed Solana mainnet transaction —
              hover or tap to open it on Solscan.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* The river — the hero of this section */}
      <div className="relative">
        <SolanaRiver height={520} />
      </div>

      {/* Bottom band — single quiet line, lots of breathing room */}
      <div className="container-fluid relative px-6 md:px-8 lg:px-20 pt-12 pb-24 md:pb-32">
        <FadeIn delay={0.1}>
          <p className="text-center text-[11px] md:text-xs tracking-[0.22em] uppercase font-bold text-white/30">
            Solana mainnet · ~2,400 tx/sec · 500ms settlement · $0.0008 median fee
          </p>
        </FadeIn>
      </div>

      {/* Bottom divider */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      />
    </section>
  );
}
