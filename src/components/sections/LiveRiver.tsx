"use client";

import dynamic from "next/dynamic";
import FadeIn from "../FadeIn";

const SolanaRiver = dynamic(() => import("../SolanaRiver"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="w-full h-[480px] md:h-[560px] lg:h-[600px]"
      style={{
        background:
          "radial-gradient(ellipse 1100px 400px at 50% 50%, rgba(102,205,131,0.06) 0%, transparent 65%), #000",
      }}
    />
  ),
});

const LiveTxCounter = dynamic(() => import("../LiveTxCounter"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-start">
      <span className="eyebrow mb-3">
        <span
          aria-hidden
          className="inline-flex rounded-full h-1.5 w-1.5 bg-mint-mid opacity-30"
        />
        Live Solana transactions
      </span>
      <p className="font-bold tabular-nums tracking-tight text-white/30 text-2xl md:text-3xl leading-none">
        —
      </p>
      <p className="text-xs text-white/40 mt-2 font-medium">
        Confirmed on mainnet · since genesis
      </p>
    </div>
  ),
});

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

      {/* Counter — top-left, modest sizing */}
      <div className="container-fluid px-6 md:px-8 lg:px-20 pt-16 md:pt-20 pb-8 md:pb-10">
        <FadeIn>
          <LiveTxCounter />
        </FadeIn>
      </div>

      {/* The river — the visual hero of this section */}
      <div className="relative">
        <SolanaRiver height={600} />
      </div>

      {/* Bottom band — quiet legend / context, low visual weight */}
      <div className="container-fluid px-6 md:px-8 lg:px-20 pt-8 pb-16 md:pb-24">
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] md:text-[11px] tracking-[0.16em] uppercase font-bold text-white/40">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-mint-mid" />
              Mint = standard tx
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#C79FFF" }}
              />
              Purple = same chain, varied appearance
            </span>
            <span className="hidden md:inline text-white/20">·</span>
            <span>Median fee &lt; $0.001</span>
            <span className="hidden md:inline text-white/20">·</span>
            <span>~500ms settlement</span>
          </div>
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
