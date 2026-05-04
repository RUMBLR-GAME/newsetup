import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms covering the Fluid waitlist, this website, and the Try-it-live devnet demo.",
  alternates: { canonical: "https://fluid.au/terms" },
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Use" updated="Last updated · 2 May 2026">
      <p>
        These terms cover the Fluid website (fluid.au), the waitlist, and the
        on-page Try-it-live demo. They do not yet cover a Fluid app, because
        the app is not live to the public. When that changes, we&apos;ll
        publish full product terms separately.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        What this site is
      </h2>
      <p>
        Fluid is a peer-to-peer payments product for Australians, built in
        Queensland. AUDD is a real Australian-dollar stablecoin issued by AUDC
        Pty Ltd, regulated under an Australian Financial Services Licence
        granted by ASIC.
      </p>
      <p>
        Fluid does not yet hold its own AFSL. We are pursuing one ahead of the
        June 2026 ASIC no-action expiry. Until then, this site is
        informational only — it is not a financial product, an offer, or a
        recommendation.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        The Try-it-live demo
      </h2>
      <p>
        The demo button on this site signs a self-transfer on Solana&apos;s{" "}
        <strong>devnet</strong> — a free test network with no real money. The
        wallet used for the demo holds devnet SOL only. You don&apos;t connect
        your own wallet, you don&apos;t pay anything, and nothing on devnet has
        any monetary value.
      </p>
      <p>
        We rate-limit demo transactions per IP to prevent abuse. If you hit the
        limit, wait a minute and try again.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        No financial advice
      </h2>
      <p>
        Nothing on this site is financial, tax, or legal advice. We use
        plain-English numbers (settles in 0.4 seconds, fee under one cent) to
        describe how Solana works as a network — not to recommend that you do
        anything specific with your money. Get advice tailored to your
        situation before making decisions.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        Waitlist
      </h2>
      <p>
        Joining the waitlist gives us your email and (optionally) your name.
        It does not guarantee you a spot when the app launches. We may close
        the waitlist or change launch criteria. If you&apos;d like to be
        removed from the list at any time, email{" "}
        <a
          href="mailto:hello@fluid.au"
          className="text-mint-glow hover:text-white underline underline-offset-4"
        >
          hello@fluid.au
        </a>
        .
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        No warranties
      </h2>
      <p>
        This site is provided &ldquo;as is.&rdquo; We do our best to keep it
        running and the demo working, but we don&apos;t guarantee uptime, RPC
        availability, or that every Solana transaction we display will land
        instantly. Solana is a public blockchain operated by a global network
        of validators — its behaviour is outside our control.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        Limitation of liability
      </h2>
      <p>
        To the extent permitted by Australian law, Fluid is not liable for
        loss or damage arising from use of this website, the demo, or the
        waitlist. Where Australian Consumer Law applies and cannot be
        excluded, our liability is limited to re-supplying the relevant
        service.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        Changes
      </h2>
      <p>
        We&apos;ll update these terms as Fluid evolves. Material changes will
        be flagged at the top of this page with a new &ldquo;Last
        updated&rdquo; date. If you&apos;ve given us your email, we&apos;ll
        also email you about substantial changes before the app launches.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        Governing law
      </h2>
      <p>
        These terms are governed by the laws of Queensland, Australia.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        Contact
      </h2>
      <p>
        Questions? Email{" "}
        <a
          href="mailto:hello@fluid.au"
          className="text-mint-glow hover:text-white underline underline-offset-4"
        >
          hello@fluid.au
        </a>
        .
      </p>
    </LegalPageLayout>
  );
}
