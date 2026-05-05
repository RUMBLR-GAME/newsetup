"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Logo from "./Logo";

// Lazy-load LiveTPS — Solana web3.js is ~150KB. Defer it so it doesn't block
// the critical render path. The header still renders instantly; the TPS pill
// fades in once the chunk loads.
const LiveTPS = dynamic(() => import("./LiveTPS"), {
  ssr: false,
  loading: () => null,
});

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="container-fluid flex items-center justify-between px-6 md:px-8 lg:px-20 py-4 md:py-5 gap-4">
        <a href="#" aria-label="Fluid home" className="flex items-center shrink-0">
          <Logo letterColor="#FFFFFF" dotColor="#66CD83" height={44} />
        </a>

        <div className="hidden lg:flex items-center gap-3">
          <LiveTPS />
        </div>

        <nav className="hidden md:flex items-center gap-7">
          <a href="#how" className="text-sm text-white/70 hover:text-white transition-colors">
            How it works
          </a>
          <a href="#what-is-fluid" className="text-sm text-white/70 hover:text-white transition-colors">
            What is Fluid
          </a>
          <a href="#compliance" className="text-sm text-white/70 hover:text-white transition-colors">
            Compliance
          </a>
          <a href="#faq" className="text-sm text-white/70 hover:text-white transition-colors">
            FAQ
          </a>
        </nav>

        <a
          href="#waitlist"
          className="bg-white text-black text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-mint-glow transition-colors shrink-0"
        >
          Join waitlist
        </a>
      </div>
    </header>
  );
}
