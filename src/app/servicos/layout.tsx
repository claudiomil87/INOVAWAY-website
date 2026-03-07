import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviços de AI Agents | INOVAWAY",
  description:
    "Sites, chatbots com IA, automação de marketing, CRM e funis de venda para PMEs. Entregues em horas com AI Agents autônomos. Solicite seu orçamento!",
  keywords: [
    "serviços AI",
    "chatbot",
    "automação marketing",
    "criação de sites",
    "funil de vendas",
    "CRM inteligente",
    "INOVAWAY",
    "inteligência artificial",
  ],
  openGraph: {
    title: "Serviços de AI Agents | INOVAWAY",
    description:
      "Sites, chatbots com IA, automação de marketing, CRM e funis de venda para PMEs. Entregues em horas com AI Agents autônomos. Solicite seu orçamento!",
    url: "https://inovaway.org/servicos",
    type: "website",
    locale: "pt_BR",
    siteName: "INOVAWAY",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Serviços INOVAWAY — AI Agents 24/7",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serviços de AI Agents | INOVAWAY",
    description:
      "Sites, chatbots com IA, automação de marketing, CRM e funis de venda para PMEs. Entregues em horas com AI Agents autônomos.",
    images: ["/og-image.png"],
    creator: "@inovaway",
    site: "@inovaway",
  },
};

export default function ServicosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
