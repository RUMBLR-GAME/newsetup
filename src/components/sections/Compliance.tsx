"use client";

import { motion } from "framer-motion";
import FadeIn from "../FadeIn";

const pillars = [
  {
    acronym: "AUSTRAC",
    title: "Registered VASP",
    body: "AUDC Pty Ltd is registered with AUSTRAC as a Digital Currency Exchange.",
  },
  {
    acronym: "AFSL",
    title: "Issued under licence",
    body: "AUDD is issued by AUDC Pty Ltd under an AFSL granted by ASIC, February 2026.",
  },
  {
    acronym: "Travel Rule",
    title: "FATF compliant",
    body: "Outbound transfers above the threshold include payer & payee info per FATF guidance.",
  },
  {
    acronym: "AFCA",
    title: "External resolution",
    body: "AUDC is a member of the Australian Financial Complaints Authority.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Compliance() {
  return (
    <section id="compliance" className="section relative overflow-hidden">
      {/* Subtle mint backdrop glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 800px 500px at 50% 50%, rgba(102, 205, 131, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container-fluid relative">
        <FadeIn>
          <div className="text-center mb-16 md:mb-20">
            <span className="eyebrow mb-6 inline-flex">
              Built for the regulators
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[0.95]">
              Crypto rails.
              <br />
              <span className="text-mint-mid">Not crypto risk.</span>
            </h2>
            <p className="text-white/65 max-w-2xl mx-auto leading-relaxed">
              We&apos;re not asking Australians to trust an offshore app. AUDD is
              real money issued under Australian law. Fluid is pursuing its own
              AFSL pathway ahead of the June 2026 no-action expiry.
            </p>
          </div>
        </FadeIn>

        {/* Trust certificate — central visual */}
        <FadeIn delay={0.1}>
          <div className="relative max-w-4xl mx-auto">
            <div
              className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.02] to-transparent overflow-hidden"
              style={{
                boxShadow:
                  "0 0 80px 0 rgba(102, 205, 131, 0.08), 0 24px 60px 0 rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Subtle dotted "watermark" pattern in the background */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #fff 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              <div className="relative p-8 md:p-12 lg:p-16">
                {/* Document header */}
                <div className="flex items-center justify-between pb-8 mb-8 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="w-2 h-2 rounded-full bg-mint-mid animate-pulse"
                    />
                    <span className="text-[10px] tracking-[0.18em] text-mint-glow uppercase font-bold">
                      Australian regulatory stack
                    </span>
                  </div>
                  <span className="text-[10px] tracking-[0.14em] text-white/40 uppercase font-semibold hidden sm:inline">
                    Verified · 2026
                  </span>
                </div>

                {/* Four pillars in a 2x2 grid, but as inline rows not cards */}
                <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-10">
                  {pillars.map((pillar, i) => (
                    <motion.div
                      key={pillar.acronym}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      variants={cardVariants}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex gap-4"
                    >
                      {/* Mint check mark / seal */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-full border border-mint-mid/40 bg-mint-mid/10 flex items-center justify-center mt-0.5">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="M2 7.5L5 10.5L12 3.5"
                            stroke="#66CD83"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-mint-mid font-bold text-xs tracking-[0.18em] uppercase mb-2">
                          {pillar.acronym}
                        </p>
                        <h3 className="text-base md:text-lg font-bold mb-2 leading-tight">
                          {pillar.title}
                        </h3>
                        <p className="text-white/55 text-sm leading-relaxed">
                          {pillar.body}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Document footer with signature line */}
                <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs text-white/40 leading-relaxed max-w-md">
                    AUDC Pty Ltd holds the AFSL for AUDD issuance. Fluid Labs is
                    pursuing its own AFSL pathway ahead of June 2026.
                  </p>
                  <a
                    href="https://www.audd.com.au"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-mint-glow hover:text-white transition-colors font-semibold tracking-wide"
                  >
                    Verify with AUDC
                    <span aria-hidden>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
