import FadeIn from "../FadeIn";
import CountUp from "../CountUp";

export default function Tax() {
  return (
    <section className="section">
      <div className="container-fluid">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <div className="bg-surface-raised border border-white/[0.06] rounded-3xl p-8 md:p-10">
              <div className="flex items-center justify-between mb-8">
                <span className="eyebrow">FY2026 Statement</span>
                <span className="text-xs text-mint-mid font-semibold flex items-center gap-1.5">
                  <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-mint-mid animate-pulse" />
                  Ready to download
                </span>
              </div>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <p className="text-[10px] tracking-[0.14em] text-white/40 uppercase font-semibold mb-2">
                    Sent
                  </p>
                  <p className="text-xl md:text-2xl font-bold tracking-tight">
                    $<CountUp to={24389} separator duration={1.4} />
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.14em] text-white/40 uppercase font-semibold mb-2">
                    Received
                  </p>
                  <p className="text-xl md:text-2xl font-bold tracking-tight">
                    $<CountUp to={18742} separator duration={1.4} />
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.14em] text-white/40 uppercase font-semibold mb-2">
                    CGT events
                  </p>
                  <p className="text-xl md:text-2xl font-bold tracking-tight">
                    <CountUp to={0} duration={1} />
                  </p>
                </div>
              </div>
              <div className="space-y-3 pt-6 border-t border-white/[0.06]">
                <div className="flex justify-between text-sm">
                  <span className="text-white/55">Interest earned (4.10%)</span>
                  <span className="font-medium">
                    $<CountUp to={84.18} decimals={2} duration={1.2} />
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/55">Network fees paid</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/55">FX spread paid</span>
                  <span className="font-medium">$0.00</span>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <span className="eyebrow mb-6 inline-flex">Tax & compliance</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[0.95]">
              Audit-ready by default.
            </h2>
            <p className="text-base md:text-lg text-white/65 mb-6 leading-relaxed">
              Every transaction is on-chain and timestamped. Your annual statement
              maps cleanly to ATO categories — interest income, business expenses,
              CGT events. Hand it to your accountant. Done.
            </p>
            <p className="text-base md:text-lg text-white/65 leading-relaxed">
              Because AUDD is 1:1 with AUD, ordinary spending isn&apos;t a CGT
              event. That&apos;s a meaningful difference from holding crypto.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
