"use client";

import { useState } from "react";
import FadeIn from "../FadeIn";

const faqs = [
  {
    q: "Is this crypto?",
    a: "Technically yes — AUDD is a stablecoin on Solana. Practically no — it's pegged 1:1 to the Australian dollar, fully backed by AUD held in tier-1 banks, and issued under an Australian AFSL. The Solana part is the rail; the dollars are the cargo.",
  },
  {
    q: "Who issues AUDD?",
    a: "AUDC Pty Ltd, a 45% Novatti-owned issuer that received its AFSL from ASIC in February 2026. AUDC is registered with AUSTRAC as a Digital Currency Exchange and is an AFCA member.",
  },
  {
    q: "What happens if I lose my phone?",
    a: "Your AUDD lives in a wallet protected by your Fluid login plus biometrics. Lose your phone, log in on a new one, restore. Your funds aren't on the device — they're on Solana, and the recovery flow is identical to any modern banking app.",
  },
  {
    q: "Can I send to people who don't have Fluid?",
    a: "Yes. Send to a phone number or email and they'll get an SMS/email with a claim link. They sign up, the funds drop into their wallet. There's a $10 welcome bonus for both you and them on the first send.",
  },
  {
    q: "How does the 4.20% yield work?",
    a: "Your AUDD balance earns yield tracked to the RBA cash rate, accruing per-second. Yield is generated through AUDC's reserve management. We pay it out daily into your balance — no lockups, no minimums.",
  },
  {
    q: "Do I owe tax on this?",
    a: "Spending AUDD as money isn't a CGT event because AUDD is 1:1 with AUD. Yield earned is interest income. Your annual statement maps to ATO categories — give it to your accountant. (We're not your accountant — get advice for your situation.)",
  },
  {
    q: "Is Fluid itself licensed?",
    a: "AUDC's AFSL covers AUDD issuance. Fluid is the consumer app on top of that — currently operating under the ASIC no-action position that expires June 2026, with our own AFSL pathway in progress. We'll be transparent as that progresses.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section bg-surface-raised">
      <div className="container-fluid max-w-3xl">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="eyebrow mb-6 inline-flex">Frequently asked</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Honest answers.
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-3">
          {faqs.map((item, i) => (
            <FadeIn key={i} delay={Math.min(i * 0.05, 0.3)}>
              <div className="bg-surface-black border border-white/[0.06] rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                  aria-expanded={open === i}
                >
                  <span className="text-base md:text-lg font-semibold pr-6">{item.q}</span>
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full border border-white/[0.12] flex items-center justify-center text-sm transition-transform ${
                      open === i ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    open === i ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-white/60 leading-relaxed">{item.a}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
