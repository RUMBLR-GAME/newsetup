"use client";

import dynamic from "next/dynamic";
import FadeIn from "../FadeIn";

// Lazy-load Solana-dependent components — keeps initial bundle off the critical path.
// SSR is disabled (ssr: false) because they use browser-only Connection clients.
const DemoPayment = dynamic(() => import("../DemoPayment"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-md mx-auto h-[300px] rounded-[40px] bg-surface-raised border border-white/[0.06] animate-pulse" />
  ),
});

const LiveSlot = dynamic(() => import("../LiveSlot"), {
  ssr: false,
  loading: () => null,
});

export default function TryItLive() {
  return (
    <section
      id="try-it"
      className="relative section overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 1100px 600px at 50% 20%, rgba(102, 205, 131, 0.15) 0%, transparent 65%), #000",
      }}
    >
      <div className="container-fluid relative">
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <span className="eyebrow mb-6 inline-flex">Live demo</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[0.95]">
              Make a payment.
              <br />
              <span className="text-mint-mid">On Solana. Right now.</span>
            </h2>
            <p className="text-white/65 max-w-2xl mx-auto leading-relaxed mt-6 text-base md:text-lg">
              Tap the button. We&apos;ll sign a real transaction on Solana devnet
              and confirm it before you can blink. This is exactly how Fluid works
              — only the network and the dollars change.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <DemoPayment />
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-10 text-xs text-white/45">
            <LiveSlot />
            <span aria-hidden className="hidden sm:inline text-white/20">·</span>
            <span className="uppercase tracking-[0.14em] font-semibold">
              Median fee &lt; $0.001
            </span>
            <span aria-hidden className="hidden sm:inline text-white/20">·</span>
            <span className="uppercase tracking-[0.14em] font-semibold">
              ~500ms settlement
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-center text-xs text-white/35 mt-8 max-w-2xl mx-auto leading-relaxed">
            Production Fluid uses Solana mainnet with AUDD (issued under ASIC AFSL
            by AUDC). This page demonstrates the technology on devnet —
            identical mechanics, test tokens.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
