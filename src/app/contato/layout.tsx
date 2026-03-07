import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | INOVAWAY",
  description:
    "Entre em contato com a INOVAWAY. Solicite orçamento, tire dúvidas ou fale com nossos AI Agents. Respondemos em até 24h via WhatsApp ou formulário online.",
  keywords: [
    "contato INOVAWAY",
    "orçamento",
    "WhatsApp",
    "atendimento",
    "suporte",
    "AI Agents",
    "fale conosco",
  ],
  openGraph: {
    title: "Contato | INOVAWAY",
    description:
      "Entre em contato com a INOVAWAY. Solicite orçamento, tire dúvidas ou fale com nossos AI Agents. Respondemos em até 24h via WhatsApp ou formulário online.",
    url: "https://inovaway.org/contato",
    type: "website",
    locale: "pt_BR",
    siteName: "INOVAWAY",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contato INOVAWAY — Fale Conosco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contato | INOVAWAY",
    description:
      "Entre em contato com a INOVAWAY. Solicite orçamento ou fale com nossos AI Agents. Respondemos em até 24h via WhatsApp ou formulário.",
    images: ["/og-image.png"],
    creator: "@inovaway",
    site: "@inovaway",
  },
};

export default function ContatoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
