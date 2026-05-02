import Link from "next/link";
import Logo from "../Logo";
import SolanaMark from "../SolanaMark";

export default function Footer() {
  return (
    <footer className="bg-black pt-16 pb-12 px-6 md:px-8 lg:px-20">
      <div className="container-fluid">
        <div className="grid md:grid-cols-12 gap-10 md:gap-8 mb-12">
          <div className="md:col-span-4">
            <Logo letterColor="#FFFFFF" dotColor="#66CD83" height={32} />
            <p className="text-sm text-white/55 mt-6 leading-relaxed max-w-xs">
              Money that moves at the speed it should. Built in Queensland.
              Made for Australia.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="text-[10px] tracking-[0.16em] text-white/40 uppercase font-semibold">
                Powered by
              </span>
              <SolanaMark height={16} className="text-white/80" />
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs tracking-[0.14em] text-white/40 uppercase font-semibold mb-4">
              Product
            </p>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a href="#how" className="hover:text-white transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#try-it"
                  className="hover:text-white transition-colors"
                >
                  Try it live
                </a>
              </li>
              <li>
                <a href="#card" className="hover:text-white transition-colors">
                  Card
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs tracking-[0.14em] text-white/40 uppercase font-semibold mb-4">
              Company
            </p>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a
                  href="mailto:hello@fluid.au"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/fluidpayments"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <Link
                  href="/security"
                  className="hover:text-white transition-colors"
                >
                  Security
                </Link>
              </li>
              <li>
                <a
                  href="#compliance"
                  className="hover:text-white transition-colors"
                >
                  Compliance
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs tracking-[0.14em] text-mint-glow uppercase font-semibold mb-4">
              Honest disclosure
            </p>
            <p className="text-xs text-white/55 leading-relaxed">
              Fluid is a Solana Frontier Hackathon project (May 2026). AUDD is
              real and issued by AUDC Pty Ltd under an AFSL granted by ASIC.
              AUDC is registered with AUSTRAC and is a member of AFCA. Fluid is
              pursuing its own AFSL pathway ahead of the June 2026 ASIC
              no-action expiry. Nothing on this page is financial advice — get
              advice for your situation.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-white/40">
            © 2026 Fluid. Made in Queensland 🇦🇺
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <Link
              href="/privacy"
              className="hover:text-white/70 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white/70 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/security"
              className="hover:text-white/70 transition-colors"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
