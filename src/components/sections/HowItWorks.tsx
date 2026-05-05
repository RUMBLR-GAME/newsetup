"use client";

import { motion } from "framer-motion";
import FadeIn from "../FadeIn";

const items = [
  {
    number: "01",
    eyebrow: "Speed",
    title: "Solana settles in 0.4 seconds.",
    body: "Tap send. Your mate sees the dollars before you've put your phone down. No two-business-days, no batch processing, no bank holidays.",
  },
  {
    number: "02",
    eyebrow: "Stability",
    title: "AUDD is one Aussie dollar. Always.",
    body: "Each AUDD is backed 1:1 by Australian dollars held in tier-1 banks. Issued by AUDC Pty Ltd under an AFSL granted by ASIC.",
  },
  {
    number: "03",
    eyebrow: "Yield",
    title: "Idle AUD doesn't have to sit idle.",
    body: "Your balance earns 4.20% p.a., paid daily. No lock-up. Withdraw or send any time. The same money working twice.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function HowItWorks() {
  return (
    <section id="how" className="section">
      <div className="container-fluid">
        <FadeIn>
          <div className="text-center mb-16 md:mb-20">
            <span className="eyebrow mb-6 inline-flex">How it works</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-[0.95]">
              Three things that
              <br />
              make this different.
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={cardVariants}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="bg-surface-raised border border-white/[0.06] rounded-3xl p-8 md:p-10 h-full transition-colors hover:border-white/[0.15]"
            >
              <p className="text-mint-mid font-semibold text-xs tracking-[0.14em] uppercase mb-6">
                {item.number} · {item.eyebrow}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 leading-tight">
                {item.title}
              </h3>
              <p className="text-white/55 leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
