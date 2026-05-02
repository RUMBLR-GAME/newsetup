"use client";

import { useState } from "react";
import FadeIn from "../FadeIn";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

    try {
      if (formspreeId) {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, source: "fluid-landing" }),
        });
        if (!res.ok) throw new Error("Submission failed");
      } else {
        // No backend wired yet — simulate success so UX still flows
        await new Promise((r) => setTimeout(r, 600));
        // eslint-disable-next-line no-console
        console.log("[Fluid waitlist] Email captured locally:", email);
      }
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again in a moment.");
    }
  };

  return (
    <section id="waitlist" className="section">
      <div className="container-fluid">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-mesh-mint p-12 md:p-16 lg:p-20 text-center shadow-card-mint">
            {/* Animated dots ambient — extra layer of life */}
            <div aria-hidden className="absolute inset-0 pointer-events-none opacity-30">
              <div className="absolute top-8 left-12 w-2 h-2 rounded-full bg-mint-ink/40 animate-pulse" style={{ animationDelay: "0s" }} />
              <div className="absolute top-16 right-20 w-1.5 h-1.5 rounded-full bg-mint-ink/30 animate-pulse" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-20 left-1/4 w-1 h-1 rounded-full bg-mint-ink/40 animate-pulse" style={{ animationDelay: "2s" }} />
              <div className="absolute bottom-12 right-1/3 w-2 h-2 rounded-full bg-mint-ink/30 animate-pulse" style={{ animationDelay: "0.5s" }} />
            </div>

            <h2 className="relative text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-mint-ink mb-6 max-w-3xl mx-auto leading-[0.95]">
              Money that moves at the
              <br />
              speed it should.
            </h2>
            <p className="relative text-mint-ink/75 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              We&apos;re onboarding 500 Townsville beta users now. Sydney and
              Melbourne next, June 2026. Get on the list.
            </p>

            {status === "success" ? (
              <div
                role="status"
                className="relative inline-flex items-center gap-3 bg-mint-ink text-mint-glow px-6 py-4 rounded-full font-semibold animate-in fade-in slide-in-from-bottom-2 duration-500"
              >
                <span aria-hidden className="w-2 h-2 rounded-full bg-mint-glow animate-pulse" />
                You&apos;re on the list. Welcome.
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="relative flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                noValidate
              >
                <label htmlFor="waitlist-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="flex-1 bg-mint-ink/15 border border-mint-ink/25 text-mint-ink placeholder:text-mint-ink/50 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-mint-ink focus:bg-mint-ink/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group bg-mint-ink text-mint-glow font-semibold px-6 py-4 rounded-full hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {status === "loading" ? "..." : (
                    <>
                      Join waitlist
                      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                    </>
                  )}
                </button>
              </form>
            )}
            {status === "error" && (
              <p role="alert" className="relative text-red-900 text-sm mt-4 font-medium">
                {errorMsg}
              </p>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
