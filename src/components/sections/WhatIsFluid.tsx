"use client";

import { motion } from "framer-motion";
import FadeIn from "../FadeIn";

/**
 * "What is Fluid" — declarative typography section.
 *
 * Lives between LiveRiver (visual motion) and OnChainProof (technical proof).
 * The job here is purely to state what Fluid is, in language so simple it
 * can't be misread.
 *
 * Structure: eyebrow → big headline → supporting line → three pillars.
 * The pillars are calm — text only, no decorative containers, separated by
 * thin vertical rules on desktop. This makes the section feel like a quiet
 * declaration, not another marketing card grid.
 */

const PILLARS = [
  {
    label: "Top up.",
    line: "Free, instant, from your bank.",
  },
  {
    label: "Send.",
    line: "To any @handle. Settled in seconds.",
  },
  {
    label: "Earn.",
    line: "4.20% p.a. on idle AUDD. Paid daily.",
  },
];

export default function WhatIsFluid() {
  return (
    <section id="what-is-fluid" className="section">
      <div className="container-fluid">
        {/* Hero block */}
        <FadeIn>
          <div className="max-w-4xl">
            <span className="eyebrow mb-8 inline-flex">
              <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-mint-mid" />
              What is Fluid
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.035em] leading-[0.95] mb-8 md:mb-10">
              Three things,
              <br />
              <span className="text-mint-mid">that&apos;s it.</span>
            </h2>
            <p className="text-lg md:text-xl text-white/65 leading-[1.45] max-w-2xl">
              No card. No FX. No business accounts. Just the part Australians
              actually do every week — moving AUD between people, and earning a
              proper rate while it sits.
            </p>
          </div>
        </FadeIn>

        {/* Three pillars — calm declarative row, separated by thin rules */}
        <div className="mt-20 md:mt-28 lg:mt-32 grid md:grid-cols-3 md:gap-0 gap-12">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={
                "relative md:px-10 lg:px-12 first:md:pl-0 last:md:pr-0 " +
                (i > 0 ? "md:border-l md:border-white/[0.06]" : "")
              }
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1] mb-3">
                {p.label}
              </h3>
              <p className="text-base md:text-lg text-white/55 leading-[1.4]">
                {p.line}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Coming soon footnote — calm tertiary signal */}
        <FadeIn delay={0.3}>
          <p className="text-sm text-white/40 mt-20 md:mt-28 max-w-2xl leading-[1.5]">
            <span className="text-white/55 font-semibold">Coming next:</span>{" "}
            Fluid card · International transfers · Bill splitting · Scheduled
            payments. We&apos;ll tell you when each lands.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
