"use client";

import { motion } from "framer-motion";
import FadeIn from "../FadeIn";
import CountUp from "../CountUp";

type Row = { label: string; value: React.ReactNode; valueClass?: string };

type Card = {
  brand: string;
  brandClass?: string;
  highlight?: boolean;
  muted?: boolean;
  rows: Row[];
  footer: string;
  footerClass?: string;
};

const cards: Card[] = [
  {
    brand: "Fluid",
    brandClass: "text-mint-mid",
    highlight: true,
    rows: [
      { label: "You send", value: <>$<CountUp to={1000} decimals={2} separator duration={1.3} /></> },
      { label: "Network fee", value: <>$<CountUp to={0} decimals={2} duration={1.0} /></> },
      { label: "Settlement", value: "Solana", valueClass: "text-mint-mid" },
      {
        label: "They receive",
        value: <>$<CountUp to={1000} decimals={2} separator duration={1.6} /></>,
        valueClass: "text-mint-mid font-bold text-2xl",
      },
    ],
    footer: "0.4 seconds",
  },
  {
    brand: "PayID",
    muted: true,
    rows: [
      { label: "You send", value: "—" },
      { label: "Network fee", value: "—" },
      { label: "Settlement", value: "—" },
      {
        label: "They receive",
        value: "Not available",
        valueClass: "text-white/40",
      },
    ],
    footer: "Domestic-only · No international",
    footerClass: "text-white/40",
  },
  {
    brand: "Wise",
    rows: [
      { label: "You send", value: <>$<CountUp to={1000} decimals={2} separator duration={1.3} /></> },
      { label: "Network fee", value: <>$<CountUp to={7.49} decimals={2} duration={1.2} /></> },
      { label: "Settlement", value: "SWIFT" },
      {
        label: "They receive",
        value: <>$<CountUp to={992.51} decimals={2} separator duration={1.6} /></>,
        valueClass: "font-bold text-2xl",
      },
    ],
    footer: "1-2 business days",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function FeeComparison() {
  return (
    <section className="section bg-surface-raised">
      <div className="container-fluid">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="eyebrow mb-6 inline-flex">Proof, not marketing</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[0.95]">
              Send $1,000.
              <br />
              Receive $1,000.
            </h2>
            <p className="text-white/55 max-w-2xl mx-auto leading-relaxed mt-6">
              Sending money to family overseas? Compare what actually arrives. Same
              numbers out as in — Australia or anywhere else.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.brand}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className={`relative rounded-2xl p-6 md:p-8 transition-all h-full ${
                  card.highlight
                    ? "bg-surface-black border border-mint-mid shadow-[0_0_60px_0_rgba(102,205,131,0.15)] hover:shadow-[0_0_80px_0_rgba(102,205,131,0.25)]"
                    : "bg-surface-black border border-white/[0.06] hover:border-white/[0.12]"
                } ${card.muted ? "opacity-55" : ""}`}
              >
                <p
                  className={`text-xs font-semibold tracking-[0.14em] uppercase mb-1 ${
                    card.brandClass ?? "text-white/40"
                  }`}
                >
                  {card.brand}
                </p>
                <p className="text-2xl md:text-3xl font-bold mb-6">
                  {card.brand}
                </p>

                <div className="space-y-3 mb-6">
                  {card.rows.map((row, idx) => (
                    <div
                      key={idx}
                      className={`flex justify-between items-baseline ${
                        idx === card.rows.length - 1
                          ? "pt-3 border-t border-white/[0.06]"
                          : ""
                      }`}
                    >
                      <span className="text-sm text-white/55">{row.label}</span>
                      <span className={row.valueClass || "text-base md:text-lg"}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <p
                  className={`text-xs font-semibold tracking-[0.14em] uppercase ${
                    card.footerClass ?? "text-white/40"
                  }`}
                >
                  ⏱ {card.footer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="text-xs text-white/40 text-center mt-12 max-w-3xl mx-auto leading-relaxed">
            * International transfer of $1,000 AUD, May 2026. Wise: AUD→USD at
            mid-market rate. PayID: included for reference only — it&apos;s a
            domestic Australian service and doesn&apos;t support international
            transfers. Fluid: 0% network fee, 24/7, settles internationally on
            Solana via AUDD.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
