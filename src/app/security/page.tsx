import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Fluid protects your money and your data. Built on Solana, settled in regulated AUDD.",
  alternates: { canonical: "https://fluid.au/security" },
};

export default function SecurityPage() {
  return (
    <LegalPageLayout title="Security" updated="Last updated · 2 May 2026">
      <p>
        Money apps live or die by how they handle security. Here&apos;s our
        approach in plain English.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        Where your money sits
      </h2>
      <p>
        Fluid balances are denominated in AUDD — an Australian-dollar
        stablecoin issued by AUDC Pty Ltd. AUDC is regulated under an
        Australian Financial Services Licence (AFSL) granted by ASIC,
        registered with AUSTRAC, and a member of AFCA (the Australian
        Financial Complaints Authority).
      </p>
      <p>
        AUDD is fully backed 1:1 by Australian dollar reserves held in a
        segregated account at a major Australian bank. Reserves are subject to
        independent attestation. Fluid does not hold customer funds — AUDC
        does, under regulated conditions.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        Custody
      </h2>
      <p>
        Fluid is non-custodial. Your wallet keys are generated and stored on
        your device, encrypted with secure enclave hardware where available
        (iOS Secure Enclave, Android StrongBox). We never see your private
        keys, can&apos;t move your funds without your signature, and
        can&apos;t freeze your account.
      </p>
      <p>
        If you lose your device, you can recover access using a recovery
        phrase you set up at first install. We strongly recommend writing
        this down and storing it somewhere safe — it is the only way to
        restore your wallet.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        On-chain transparency
      </h2>
      <p>
        Every Fluid payment settles on Solana mainnet — a public blockchain.
        That means every transaction is permanent, timestamped, and
        independently verifiable on block explorers like Solscan and
        Solana.fm. You don&apos;t have to trust us — you can audit the chain.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        AML &amp; identity
      </h2>
      <p>
        Where required by Australian law, AUDC performs identity verification
        (KYC) before issuing or redeeming AUDD against fiat. Fluid integrates
        with AUDC&apos;s onboarding so this happens once, at the start, not
        every transaction. We follow AUSTRAC&apos;s anti-money-laundering and
        counter-terrorism-financing requirements.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        Code &amp; audits
      </h2>
      <p>
        Fluid&apos;s smart contracts will be audited by an independent firm
        before mainnet launch. Audit reports will be published here. The
        underlying Solana protocol has been operating mainnet since 2020 and
        is the subject of extensive ongoing security review by the Solana
        Foundation and the broader research community.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        Reporting an issue
      </h2>
      <p>
        Found a security issue? Email{" "}
        <a
          href="mailto:security@fluid.au"
          className="text-mint-glow hover:text-white underline underline-offset-4"
        >
          security@fluid.au
        </a>{" "}
        with details. We aim to respond within 48 hours and will credit
        responsible disclosures publicly (if you&apos;d like). Do not post
        unpatched issues publicly — give us a chance to fix first.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-4">
        Phishing
      </h2>
      <p>
        Fluid will only ever email you from <code>@fluid.au</code> domains.
        We will never ask you for your recovery phrase, password, or private
        keys — by email, SMS, phone, or in-app. If anyone asks, it&apos;s a
        scam. Forward suspicious messages to{" "}
        <a
          href="mailto:security@fluid.au"
          className="text-mint-glow hover:text-white underline underline-offset-4"
        >
          security@fluid.au
        </a>
        .
      </p>
    </LegalPageLayout>
  );
}
