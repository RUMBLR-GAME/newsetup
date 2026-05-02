"use client";

import { motion } from "framer-motion";
import FadeIn from "../FadeIn";

const testimonials = [
  {
    quote:
      "Splitting the tab used to be the most annoying part of dinner. Now it's the part where everyone just goes 'wait, that's it?'",
    name: "Maya Chen",
    title: "Sydney · Beta tester since 2026",
    initials: "MC",
    highlight: true,
  },
  {
    quote:
      "I run a small café. Fluid means I see customer payments hit before they've left the counter. No 2-day Visa wait, no 1.6% chargeback risk.",
    name: "James Patel",
    title: "Owner · Marrickville Coffee",
    initials: "JP",
  },
  {
    quote:
      "First app I've tried where 'instant' actually means instant. The Solana hookup is invisible — it just feels like really, really fast money.",
    name: "Alex Tran",
    title: "Solana developer · Melbourne",
    initials: "AT",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container-fluid">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="eyebrow mb-6 inline-flex">Early users</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95]">
              What people are saying.
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className={`relative rounded-3xl p-8 md:p-9 h-full flex flex-col bg-surface-raised transition-all ${
                t.highlight
                  ? "border border-mint-mid shadow-[0_0_60px_0_rgba(102,205,131,0.15)] hover:shadow-[0_0_80px_0_rgba(102,205,131,0.25)]"
                  : "border border-white/[0.06] hover:border-white/[0.15]"
              }`}
            >
              <span className="text-mint-mid text-3xl leading-none mb-6">
                &ldquo;
              </span>
              <p className="text-base md:text-lg font-semibold leading-snug mb-8 flex-1">
                {t.quote}
              </p>
              <div className="flex items-center gap-3 pt-6 border-t border-white/[0.06]">
                <div className="w-10 h-10 rounded-full border border-white/[0.12] bg-white/[0.06] flex items-center justify-center text-sm font-medium">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs tracking-[0.14em] text-white/40 uppercase font-semibold">
                    {t.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
