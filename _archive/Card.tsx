"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FadeIn from "../FadeIn";
import Logo from "../Logo";
import TiltCard from "../TiltCard";
import CountUp from "../CountUp";

export default function Card() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={ref} id="card" className="section">
      <div className="container-fluid">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <span className="eyebrow mb-6 inline-flex">The card</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[0.95]">
              A card that earns
              <br />
              while it sits.
            </h2>
            <p className="text-base md:text-lg text-white/65 mb-10 leading-relaxed max-w-lg">
              Your AUDD balance earns yield tracked to the RBA cash rate — right
              up to the second you tap. Spend anywhere Visa works. Apple Pay and
              Google Pay supported from day one.
            </p>
            <div className="grid grid-cols-2 gap-6 max-w-md">
              <div className="bg-surface-raised border border-white/[0.06] rounded-2xl p-5">
                <p className="text-xs tracking-[0.14em] text-mint-glow uppercase font-semibold mb-2">
                  Yield
                </p>
                <p className="text-2xl md:text-3xl font-bold tracking-tight">
                  <CountUp to={4.1} decimals={2} duration={1.4} suffix="% p.a." />
                </p>
                <p className="text-xs text-white/40 mt-1">RBA-tracked</p>
              </div>
              <div className="bg-surface-raised border border-white/[0.06] rounded-2xl p-5">
                <p className="text-xs tracking-[0.14em] text-mint-glow uppercase font-semibold mb-2">
                  Network
                </p>
                <p className="text-2xl md:text-3xl font-bold tracking-tight">
                  Visa
                </p>
                <p className="text-xs text-white/40 mt-1">Apple · Google Pay</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <motion.div style={{ y: cardY }} className="flex justify-center">
              <TiltCard className="w-full max-w-md">
                <div className="relative w-full aspect-[1.6/1] rounded-3xl p-7 md:p-9 bg-mesh-mint shadow-card-mint flex flex-col">
                  <div className="flex items-start justify-between">
                    <div className="w-9 h-7 md:w-11 md:h-8 rounded-md bg-white/[0.18] flex flex-col gap-1 px-1.5 py-2">
                      <div className="h-px bg-mint-ink/70 w-full"></div>
                      <div className="h-px bg-mint-ink/70 w-full"></div>
                      <div className="h-px bg-mint-ink/70 w-full"></div>
                    </div>
                    <Logo letterColor="#0F2E1A" dotColor="#FFFFFF" height={28} />
                  </div>

                  <div className="flex-1 flex items-end">
                    <div className="w-full">
                      <p className="text-mint-ink font-medium text-base md:text-lg tracking-wider mb-3">
                        •••• •••• •••• 4173
                      </p>
                      <div className="flex justify-between items-end text-mint-ink">
                        <div>
                          <p className="text-[8px] md:text-[9px] tracking-[0.12em] font-medium opacity-70">
                            HOLDER
                          </p>
                          <p className="text-sm md:text-base font-semibold">
                            Hannah Wright
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] md:text-[9px] tracking-[0.12em] font-medium opacity-70">
                            EXP
                          </p>
                          <p className="text-sm md:text-base font-semibold">
                            12 / 28
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
