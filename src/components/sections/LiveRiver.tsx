"use client";

import dynamic from "next/dynamic";
import { useSolanaTxCount } from "@/lib/useSolanaTxCount";
import FadeIn from "../FadeIn";

const SolanaRiver = dynamic(() => import("../SolanaRiver"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="w-full h-[360px] md:h-[440px]"
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

function CounterDisplay() {
  const { count, status } = useSolanaTxCount();
  const formatted = formatCount(count);

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-2.5 mb-5">
        <span className="relative flex h-2 w-2">
          <span
            aria-hidden
            className={`absolute inline-flex h-full w-full rounded-full bg-mint-mid ${
              status === "live" ? "animate-ping opacity-75" : "opacity-30"
            }`}
          />
          <span
            aria-hidden
            className="relative inline-flex rounded-full h-2 w-2 bg-mint-mid"
          />
        </span>
        <span className="text-[11px] md:text-[12px] tracking-[0.2em] text-mint-glow uppercase font-bold">
          Live Solana transactions
        </span>
      </div>
      <p
        aria-live="polite"
        className="font-bold tabular-nums tracking-tighter text-white text-[56px] md:text-[88px] lg:text-[112px] leading-[0.9]"
        style={{
          textShadow:
            "0 0 40px rgba(102, 205, 131, 0.35), 0 0 100px rgba(153, 69, 255, 0.2)",
        }}
      >
        {formatted}
      </p>
      <p className="text-sm md:text-base text-white/50 mt-5 font-medium max-w-md">
        Confirmed on mainnet, since genesis. Counting up at{" "}
        <span className="text-white/85 font-semibold">~2,400 per second.</span>
      </p>
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

      {/* Ambient glow — subtle mint tint behind the counter */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 1000px 500px at 25% 30%, rgba(102,205,131,0.06) 0%, transparent 70%), radial-gradient(ellipse 800px 400px at 75% 30%, rgba(153,69,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Heading band: counter on left, copy on right */}
      <div className="container-fluid relative px-6 md:px-8 lg:px-20 pt-20 md:pt-28 lg:pt-32 pb-10 md:pb-14">
        <FadeIn>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <CounterDisplay />
            </div>
            <div className="lg:col-span-5">
              <p className="eyebrow mb-4">
                <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-mint-mid" />
                The river below is real
              </p>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                Every glowing dot is a confirmed Solana mainnet transaction,
                pulled live from the chain.{" "}
                <span className="text-white/50">
                  Hover or tap to open it on Solscan.
                </span>
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* The river */}
      <div className="relative">
        <SolanaRiver height={440} />
      </div>

      {/* Bottom band — premium stats row */}
      <div className="container-fluid relative px-6 md:px-8 lg:px-20 pt-10 pb-20 md:pb-28 lg:pb-32">
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-4xl">
            <div>
              <p className="text-[10px] md:text-[11px] tracking-[0.18em] text-white/40 uppercase font-bold mb-2">
                Throughput
              </p>
              <p className="text-xl md:text-2xl font-bold tracking-tight tabular-nums">
                ~2,400<span className="text-white/40 text-base"> tps</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] md:text-[11px] tracking-[0.18em] text-white/40 uppercase font-bold mb-2">
                Settlement
              </p>
              <p className="text-xl md:text-2xl font-bold tracking-tight">
                ~500<span className="text-white/40 text-base"> ms</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] md:text-[11px] tracking-[0.18em] text-white/40 uppercase font-bold mb-2">
                Median fee
              </p>
              <p className="text-xl md:text-2xl font-bold tracking-tight">
                $0.0008
              </p>
            </div>
            <div>
              <p className="text-[10px] md:text-[11px] tracking-[0.18em] text-white/40 uppercase font-bold mb-2">
                Uptime, 365d
              </p>
              <p className="text-xl md:text-2xl font-bold tracking-tight tabular-nums">
                99.9<span className="text-white/40 text-base">%</span>
              </p>
            </div>
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
