import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SquadSection from "@/components/sections/SquadSection";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "INOVAWAY — Seu negócio nunca mais dorme.",
  description:
    "AI Agents autônomos trabalhando 24/7. Entregas em horas, não semanas. Transforme seu negócio com inteligência artificial.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <ServicesSection />
      <SquadSection />
      <StatsSection />
      <CTASection />
    </>
  );
}
