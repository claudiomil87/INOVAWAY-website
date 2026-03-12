import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import SquadSection from "@/components/sections/SquadSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import SocialProofNotification from "@/components/ui/SocialProofNotification";

const BASE_URL = "https://inovaway.org";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.home" });
  const isEn = locale === "en";
  const canonical = isEn ? `${BASE_URL}/en` : BASE_URL;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        "pt-BR": BASE_URL,
        en: `${BASE_URL}/en`,
        "x-default": BASE_URL,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonical,
      type: "website",
      siteName: "INOVAWAY",
      locale: isEn ? "en_US" : "pt_BR",
      alternateLocale: isEn ? "pt_BR" : "en_US",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.png"],
      creator: "@inovaway",
      site: "@inovaway",
    },
  };
}

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
