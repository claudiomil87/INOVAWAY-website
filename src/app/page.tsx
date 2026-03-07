import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import SquadSection from "@/components/sections/SquadSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "INOVAWAY — Seu negócio crescendo 24h com AI Agents",
  description:
    "9 Agentes de IA trabalhando sem parar pelo seu crescimento. Sites em 48h, automação 24/7, zero burocracia.",
  openGraph: {
    title: "INOVAWAY — Seu negócio crescendo 24h com AI Agents",
    description:
      "9 Agentes de IA trabalhando sem parar pelo seu crescimento. Sites em 48h, automação 24/7, zero burocracia.",
    url: "https://inovaway.org",
  },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — tagline + CTA + bullets + aurora bg */}
      <HeroSection />
      {/* 2. Benefits — 4 benefits com ícones Lucide */}
      <BenefitsSection />
      {/* 3. Squad — bento grid interativo com terminal + stats */}
      <SquadSection />
      {/* 4. Services — serviços com avatares dos agents */}
      <ServicesSection />
      {/* 5. Stats — números animados */}
      <StatsSection />
      {/* 6. CTA — final com squad formation */}
      <CTASection />
    </>
  );
}
