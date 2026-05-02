"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "../MagneticButton";
import CountUp from "../CountUp";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle scroll parallax on the glow
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section
      ref={ref}
      className="relative pt-32 md:pt-40 lg:pt-48 pb-24 md:pb-32 lg:pb-40 px-6 md:px-8 lg:px-20 overflow-hidden"
    >
      {/* Mint glow at top — only ambient texture in the hero now */}
      <motion.div
        aria-hidden
        style={{ y: glowY, opacity: glowOpacity }}
        className="absolute inset-x-0 top-0 h-[800px] hero-glow pointer-events-none"
      />

      {/* Subtle grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="container-fluid relative z-10">
        <div className="max-w-3xl">
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
            className="text-base md:text-lg text-white/65 max-w-xl mb-10 leading-relaxed"
          >
            Free, instant payments built on Solana, settled in Australian
            dollars.{" "}
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
              className="inline-flex items-center justify-center gap-2 border border-white/[0.12] text-white font-semibold px-6 py-4 rounded-full hover:bg-white/[0.04] hover:border-white/[0.2] transition-all"
            >
              Join the waitlist
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-3 gap-6 max-w-lg pt-8 border-t border-white/[0.06]"
          >
            <div>
              <p className="text-[10px] tracking-[0.14em] text-white/40 mb-1.5 uppercase font-semibold">
                Settles in
              </p>
              <p className="text-base md:text-lg font-bold tracking-tight">
                <CountUp to={0.4} decimals={1} duration={1.2} suffix=" seconds" />
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.14em] text-white/40 mb-1.5 uppercase font-semibold">
                Network fee
              </p>
              <p className="text-base md:text-lg font-bold tracking-tight">
                $<CountUp to={0} decimals={2} duration={1.2} />
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.14em] text-white/40 mb-1.5 uppercase font-semibold">
                Issued under
              </p>
              <p className="text-base md:text-lg font-bold tracking-tight">
                AUDC AFSL
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
