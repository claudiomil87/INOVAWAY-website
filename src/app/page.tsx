import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SquadSection from "@/components/sections/SquadSection";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "INOVAWAY — AI Agents que trabalham 24/7 para seu negócio",
  description:
    "Agência de AI Agents autônomos. Sites, chatbots, automações e mais — entregues em horas, não semanas.",
  openGraph: {
    title: "INOVAWAY — AI Agents que trabalham 24/7 para seu negócio",
    description:
      "Agência de AI Agents autônomos. Sites, chatbots, automações e mais — entregues em horas, não semanas.",
    url: "https://inovaway.com",
  },
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
