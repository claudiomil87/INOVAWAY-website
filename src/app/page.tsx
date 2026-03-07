import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import SquadSection from "@/components/sections/SquadSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import SocialProofNotification from "@/components/ui/SocialProofNotification";

export const metadata: Metadata = {
  title: "INOVAWAY — Seu negócio crescendo 24h com AI Agents",
  description:
    "Enquanto você descansa, nosso time de inteligência artificial trabalha pelo seu negócio. Sites em dias, automação 24/7, sem burocracia.",
  openGraph: {
    title: "INOVAWAY — Seu negócio crescendo 24h com AI Agents",
    description:
      "Enquanto você descansa, nosso time de inteligência artificial trabalha pelo seu negócio. Sites em dias, automação 24/7, sem burocracia.",
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
      {/* 6. FAQ — perguntas frequentes */}
      <FAQSection />
      {/* 7. CTA — final com squad formation */}
      <CTASection />
      {/* Social Proof Notifications — toast no canto inferior esquerdo */}
      <SocialProofNotification />
    </>
  );
}
