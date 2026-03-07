import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos | INOVAWAY",
  description:
    "Conheça UpBro, HNBCRM e GMBAssist — plataformas de chatbot, CRM e presença no Google Maps com IA. Ferramentas para escalar seu negócio rapidamente.",
  keywords: [
    "UpBro",
    "HNBCRM",
    "GMBAssist",
    "chatbot SaaS",
    "CRM inteligente",
    "Google Meu Negócio",
    "INOVAWAY",
    "plataforma IA",
  ],
  openGraph: {
    title: "Produtos | INOVAWAY",
    description:
      "Conheça UpBro, HNBCRM e GMBAssist — plataformas de chatbot, CRM e presença no Google Maps com IA. Ferramentas para escalar seu negócio rapidamente.",
    url: "https://inovaway.org/produtos",
    type: "website",
    locale: "pt_BR",
    siteName: "INOVAWAY",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Produtos INOVAWAY — UpBro, HNBCRM, GMBAssist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Produtos | INOVAWAY",
    description:
      "Conheça UpBro, HNBCRM e GMBAssist — plataformas de chatbot, CRM e Google Maps com IA. Ferramentas para escalar seu negócio.",
    images: ["/og-image.png"],
    creator: "@inovaway",
    site: "@inovaway",
  },
};

export default function ProdutosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
