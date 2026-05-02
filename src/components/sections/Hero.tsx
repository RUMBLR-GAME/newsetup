"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "../MagneticButton";
import CountUp from "../CountUp";

// Lazy-load the canvas river — its weight stays out of the critical bundle
const SolanaRiver = dynamic(() => import("../SolanaRiver"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 1100px 600px at 50% 20%, rgba(102, 205, 131, 0.18) 0%, transparent 65%)",
      }}
    />
  ),
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle scroll parallax
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-32 md:pt-40 md:pb-40 lg:pt-44 lg:pb-44 overflow-hidden"
    >
      {/* === FULL-BLEED RIVER BACKGROUND === */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{ pointerEvents: "auto" }}
      >
        <SolanaRiver height={800} ambient />
      </div>

      {/* Vertical gradient veil — keeps text legible without killing the river */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 900px 500px at 30% 50%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)",
        }}
      />

      {/* Top + bottom fade for cleaner transition */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* === FOREGROUND CONTENT === */}
      <div className="container-fluid relative z-20 px-6 md:px-8 lg:px-20">
        <div className="max-w-3xl">
          <motion.div style={{ y: headlineY }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="eyebrow mb-6 md:mb-8">
                <span
                  aria-hidden
                  className="w-1.5 h-1.5 rounded-full bg-mint-mid animate-pulse"
                />
                Live on Solana · Settled in AUDD
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="hero-headline mb-2"
            >
              Send AUD.
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="hero-headline hero-headline--accent mb-8 md:mb-10 text-mint-mid"
            >
              Anywhere.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg text-white/75 max-w-xl mb-10 leading-relaxed"
            >
              Free, instant payments built on Solana, settled in Australian
              dollars. Every dot in the river is a real Solana transaction —
              that's how fast the network is.{" "}
              <span className="text-white font-semibold">
                Built in Queensland. Made for Australia.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-3 mb-12"
            >
              <MagneticButton
                href="#try-it"
                className="group inline-flex items-center justify-center gap-2 bg-mint-mid text-mint-ink font-semibold px-6 py-4 rounded-full hover:bg-mint-glow transition-colors shadow-[0_0_40px_rgba(102,205,131,0.4)]"
              >
                Try it live
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </MagneticButton>
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center gap-2 border border-white/[0.18] bg-black/40 backdrop-blur-sm text-white font-semibold px-6 py-4 rounded-full hover:bg-white/[0.06] hover:border-white/[0.25] transition-all"
              >
                Join the waitlist
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-6 max-w-lg pt-8 border-t border-white/[0.1]"
            >
              <div>
                <p className="text-[10px] tracking-[0.14em] text-white/55 mb-1.5 uppercase font-semibold">
                  Settles in
                </p>
                <p className="text-base md:text-lg font-bold tracking-tight">
                  <CountUp to={0.4} decimals={1} duration={1.2} suffix=" seconds" />
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.14em] text-white/55 mb-1.5 uppercase font-semibold">
                  Network fee
                </p>
                <p className="text-base md:text-lg font-bold tracking-tight">
                  $<CountUp to={0} decimals={2} duration={1.2} />
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.14em] text-white/55 mb-1.5 uppercase font-semibold">
                  Issued under
                </p>
                <p className="text-base md:text-lg font-bold tracking-tight">
                  AUDC AFSL
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* River caption — bottom-right, anchored to the section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20 hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] font-semibold text-white/45"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span
            aria-hidden
            className="absolute inline-flex h-full w-full rounded-full bg-mint-mid animate-ping opacity-75"
          />
          <span
            aria-hidden
            className="relative inline-flex rounded-full h-1.5 w-1.5 bg-mint-mid"
          />
        </span>
        <span>Live · Solana mainnet · catch one if you can</span>
      </motion.div>
    </section>
  );
}
