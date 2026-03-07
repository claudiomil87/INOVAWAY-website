import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós | INOVAWAY",
  description:
    "Somos a INOVAWAY, agência especializada em AI Agents autônomos para pequenas e médias empresas. Conheça nossa missão, equipe e como transformamos negócios.",
  keywords: [
    "sobre INOVAWAY",
    "agência de IA",
    "AI Agents",
    "quem somos",
    "missão",
    "equipe",
    "tecnologia para PME",
    "inovação digital",
  ],
  openGraph: {
    title: "Sobre Nós | INOVAWAY",
    description:
      "Somos a INOVAWAY, agência especializada em AI Agents autônomos para pequenas e médias empresas. Conheça nossa missão, equipe e como transformamos negócios.",
    url: "https://inovaway.org/sobre",
    type: "website",
    locale: "pt_BR",
    siteName: "INOVAWAY",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sobre a INOVAWAY — Agência de AI Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Nós | INOVAWAY",
    description:
      "Somos a INOVAWAY, agência de AI Agents autônomos para PMEs. Conheça nossa missão, equipe e como transformamos negócios com inteligência artificial.",
    images: ["/og-image.png"],
    creator: "@inovaway",
    site: "@inovaway",
  },
};

export default function SobreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
