import { ReactNode } from "react";
import Header from "@/components/Header";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/sections/Footer";

type LegalPageLayoutProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

export default function LegalPageLayout({
  title,
  updated,
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="bg-black text-white min-h-screen">
      <ScrollProgress />
      <Header />
      <article className="pt-32 md:pt-40 pb-20 md:pb-32 px-6 md:px-8 lg:px-20">
        <div className="container-fluid">
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[0.18em] text-mint-glow uppercase font-bold mb-4">
              {updated}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1] mb-12">
              {title}
            </h1>
            <div className="prose-content text-white/75 leading-relaxed space-y-8 text-base md:text-lg">
              {children}
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
