import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Produtos — INOVAWAY | UpBro, HNBCRM, GMBAssist",
  description:
    "Conheça nossos produtos: UpBro (chatbot SaaS), HNBCRM (CRM open source), GMBAssist (gestão Google Business).",
  openGraph: {
    title: "Produtos — INOVAWAY | UpBro, HNBCRM, GMBAssist",
    description:
      "Conheça nossos produtos: UpBro (chatbot SaaS), HNBCRM (CRM open source), GMBAssist (gestão Google Business).",
    url: "https://inovaway.com/produtos",
  },
};

const products = [
  {
    badge: "Em breve",
    title: "INOVAWAY Platform",
    desc: "Plataforma all-in-one para gestão de negócios digitais. Automações, analytics e integrações em um só lugar.",
    status: "coming-soon",
    color: "cyan",
  },
  {
    badge: "Beta",
    title: "AutoFlow",
    desc: "Motor de automações de marketing e vendas com inteligência artificial integrada.",
    status: "beta",
    color: "green-tech",
  },
  {
    badge: "Em desenvolvimento",
    title: "DataBridge",
    desc: "Conecte suas ferramentas e sincronize dados em tempo real. Zero código.",
    status: "dev",
    color: "purple",
  },
];

export default function ProdutosPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Nossos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-tech to-cyan">
              Produtos
            </span>
          </h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            Ferramentas e plataformas que criamos para resolver os desafios mais
            comuns de negócios digitais.
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.title}
              className="rounded-xl border border-white/10 bg-navy-light p-8 flex flex-col"
            >
              <span
                className={`self-start mb-4 rounded-full border px-3 py-0.5 text-xs font-medium
                  ${
                    product.color === "cyan"
                      ? "border-cyan/30 bg-cyan/10 text-cyan"
                      : product.color === "green-tech"
                      ? "border-green-tech/30 bg-green-tech/10 text-green-tech"
                      : "border-purple/30 bg-purple/10 text-purple"
                  }`}
              >
                {product.badge}
              </span>
              <h3 className="text-2xl font-bold text-white mb-3">
                {product.title}
              </h3>
              <p className="text-white/60 leading-relaxed flex-1">{product.desc}</p>
              <div className="mt-6">
                <Link
                  href="/contato"
                  className="text-sm font-medium text-cyan hover:underline"
                >
                  Quero saber mais →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
