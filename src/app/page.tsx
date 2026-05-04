import Header from "@/components/Header";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/sections/Hero";
import LiveRiver from "@/components/sections/LiveRiver";
import OnChainProof from "@/components/sections/OnChainProof";
import HowItWorks from "@/components/sections/HowItWorks";
import FeeComparison from "@/components/sections/FeeComparison";
import Card from "@/components/sections/Card";
import Programmable from "@/components/sections/Programmable";
import Tax from "@/components/sections/Tax";
import Compliance from "@/components/sections/Compliance";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <ScrollProgress />
      <Header />
      <Hero />
      <LiveRiver />
      <OnChainProof />
      <HowItWorks />
      <FeeComparison />
      <Card />
      <Programmable />
      <Tax />
      <Compliance />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
