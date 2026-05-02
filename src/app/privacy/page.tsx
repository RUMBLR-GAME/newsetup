import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Fluid handles your data. We collect the minimum needed to run a waitlist and a public landing page.",
  alternates: { canonical: "https://fluid.au/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" updated="Last updated · 2 May 2026">
      <p>
        Fluid is in early access. This page is short because we collect very
        little data. As we grow, this policy will grow with us — and we&apos;ll
        always tell you what changes.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        What we collect
      </h2>
      <p>
        Right now, the only personal data Fluid stores is what you give us when
        you join the waitlist: an email address, and optionally your name.
        We use it for one thing — to email you when Fluid is ready. We do not
        sell or share it.
      </p>
      <p>
        The website itself is hosted on Vercel and uses standard server logs
        (IP address, user-agent, request timestamps) for security and
        diagnostics. Logs are retained for up to 30 days.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        What we don&apos;t collect
      </h2>
      <p>
        We do not run third-party tracking pixels, advertising trackers, or
        cross-site analytics. There is no Google Analytics, no Facebook Pixel,
        no LinkedIn tag, no session-replay tooling.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        On-chain transactions
      </h2>
      <p>
        Solana is a public blockchain. Any transaction signed by Fluid (or by
        you, once the app launches) is permanently recorded on-chain and
        visible to anyone. We&apos;ll explain this clearly inside the app
        before you sign anything.
      </p>
      <p>
        The &ldquo;Try it live&rdquo; demo on this site signs a self-transfer
        on Solana&apos;s devnet (test network) using a wallet we control. It
        does not move any of your money and does not require you to connect a
        wallet.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        Your rights
      </h2>
      <p>
        You can ask us to delete your waitlist record at any time by emailing{" "}
        <a
          href="mailto:hello@fluid.au"
          className="text-mint-glow hover:text-white underline underline-offset-4"
        >
          hello@fluid.au
        </a>
        . We&apos;ll do it within 7 days and confirm by reply. Under the
        Australian Privacy Principles, you can also ask what we hold about you
        and request corrections.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        Contact
      </h2>
      <p>
        Questions about this policy? Email{" "}
        <a
          href="mailto:hello@fluid.au"
          className="text-mint-glow hover:text-white underline underline-offset-4"
        >
          hello@fluid.au
        </a>
        . We read every email.
      </p>
    </LegalPageLayout>
  );
}
