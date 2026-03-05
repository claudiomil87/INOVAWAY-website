"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const upbroFeatures = [
  {
    icon: "🔀",
    title: "Multi-bot",
    desc: "Crie e gerencie múltiplos bots no mesmo painel. Cada bot com sua personalidade, objetivo e canal.",
  },
  {
    icon: "📡",
    title: "Omnichannel",
    desc: "WhatsApp, Instagram DM, site, Telegram — um bot, todos os canais sincronizados.",
  },
  {
    icon: "🧠",
    title: "IA Contextual",
    desc: "Não responde por gatilho, entende a intenção. Conversa fluída, sem parecer robô.",
  },
  {
    icon: "📊",
    title: "Dashboard Analítico",
    desc: "Taxa de resposta, conversão, tickets abertos. Tudo em tempo real, sem planilha.",
  },
  {
    icon: "⚡",
    title: "Setup em 5min",
    desc: "Configure fluxos, treine o bot e vá ao ar sem escrever uma linha de código.",
  },
  {
    icon: "🔗",
    title: "Integrações",
    desc: "CRM, Google Sheets, webhooks, APIs. UpBro se conecta ao seu stack existente.",
  },
];

const hnbcrmFeatures = [
  {
    icon: "🔓",
    title: "Open Source",
    desc: "Código aberto. Você pode hospedar, modificar e escalar como quiser. Sua empresa, suas regras.",
  },
  {
    icon: "📋",
    title: "Pipeline Visual",
    desc: "Arrasta e solta. Acompanhe cada oportunidade em tempo real, do primeiro contato ao fechamento.",
  },
  {
    icon: "👥",
    title: "Gestão de Contatos",
    desc: "Histórico completo, notas, tags e segmentação. Cada contato com contexto, não só nome e e-mail.",
  },
  {
    icon: "⚙️",
    title: "Automações Nativas",
    desc: "Envio de e-mails, atualização de status, notificações. Regras de automação sem ferramenta externa.",
  },
  {
    icon: "📈",
    title: "Relatórios",
    desc: "Taxa de conversão, tempo de ciclo, previsão de receita. Dados reais pra decisões melhores.",
  },
  {
    icon: "🔗",
    title: "API Completa",
    desc: "Integre com qualquer ferramenta do seu stack. Webhooks, REST API, documentação completa.",
  },
];

const gmbFeatures = [
  {
    icon: "⭐",
    title: "Resposta Automática a Avaliações",
    desc: "IA que responde cada review com personalidade e contexto. Nunca mais uma avaliação sem resposta.",
  },
  {
    icon: "📝",
    title: "Postagens Automáticas",
    desc: "Conteúdo publicado no seu perfil sem você tocar em nada. Frequência configurável, tom personalizado.",
  },
  {
    icon: "📊",
    title: "Insights Centralizados",
    desc: "Visualizações, cliques, chamadas, rotas — tudo em um dashboard. Entenda o que funciona.",
  },
  {
    icon: "🔔",
    title: "Alertas em Tempo Real",
    desc: "Nova avaliação negativa? Novo comentário? Você sabe na hora, antes que vire problema.",
  },
  {
    icon: "🎯",
    title: "Otimização de Palavras-chave",
    desc: "GMBAssist sugere e implementa keywords que aumentam seu ranqueamento local no Google.",
  },
  {
    icon: "🗓️",
    title: "Agendamento de Promoções",
    desc: "Datas comemorativas, promoções, eventos — programados com antecedência e publicados automaticamente.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function FeatureGrid({ features }: { features: typeof upbroFeatures }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f) => (
        <motion.div
          key={f.title}
          variants={fadeInUp}
          className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <span className="text-2xl shrink-0 mt-0.5">{f.icon}</span>
          <div>
            <h4 className="font-semibold text-white text-sm mb-1">{f.title}</h4>
            <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function ProdutosPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Ferramentas que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] to-[#06B6D4]">
              construímos pra nós.
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
            E que funcionam tão bem que resolvemos vender. Nossos produtos
            nascem da necessidade real — usamos no dia a dia, refinamos na
            prática e disponibilizamos pra quem quer a mesma vantagem.
          </p>
        </motion.div>

        {/* UpBro */}
        <motion.section
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-[#00FF41]/20 bg-gradient-to-br from-[#00FF41]/5 to-transparent p-8 sm:p-12"
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="rounded-full border border-[#00FF41]/40 bg-[#00FF41]/20 px-4 py-1 text-sm font-semibold text-[#00FF41]">
                ⭐ Produto Principal
              </span>
              <span className="text-3xl">🤖</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
                  UpBro
                  <span className="block text-xl font-normal text-white/60 mt-1">
                    O chatbot com IA que vende, atende e qualifica — em qualquer canal.
                  </span>
                </h2>
                <p className="text-white/60 leading-relaxed mb-8">
                  Multi-bot, omnichannel e com IA real. UpBro não é mais um bot
                  de fluxo engessado — é um agente conversacional que entende
                  contexto, qualifica leads e fecha vendas enquanto você dorme.
                </p>
                <div className="space-y-3 mb-8">
                  <p className="text-white/40 text-sm font-medium uppercase tracking-wider">Por que UpBro?</p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Porque foi construído por quem vive automação. Não é SaaS de
                    investidor que nunca atendeu cliente — é a ferramenta que a
                    INOVAWAY usa pra seus próprios clientes. Cada feature foi
                    adicionada porque precisávamos dela.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contato"
                    className="rounded-lg bg-[#00FF41] px-6 py-3 text-sm font-bold text-[#0F172A] hover:opacity-90 transition-opacity"
                  >
                    → Conhecer o UpBro
                  </Link>
                  <p className="self-center text-xs text-white/40">
                    Plano gratuito disponível · Sem cartão de crédito
                  </p>
                </div>
              </div>

              <div>
                <FeatureGrid features={upbroFeatures} />
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* HNBCRM */}
        <motion.section
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-[#06B6D4]/20 bg-gradient-to-br from-[#06B6D4]/5 to-transparent p-8 sm:p-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📋</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="order-2 lg:order-1">
                <FeatureGrid features={hnbcrmFeatures} />
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
                  HNBCRM
                  <span className="block text-xl font-normal text-white/60 mt-1">
                    O CRM open source que respeita seu negócio — e seu bolso.
                  </span>
                </h2>
                <p className="text-white/60 leading-relaxed mb-8">
                  Pipeline de vendas, gestão de contatos, automações e
                  dashboards. Sem mensalidade absurda, sem lock-in, sem
                  funcionalidade escondida atrás de um plano enterprise.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/inovaway/hnbcrm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-[#06B6D4]/40 bg-[#06B6D4]/10 px-6 py-3 text-sm font-bold text-[#06B6D4] hover:bg-[#06B6D4]/20 transition-colors"
                  >
                    → Ver no GitHub
                  </a>
                  <p className="self-center text-xs text-white/40">
                    Open Source · Auto-hospedável
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* GMBAssist */}
        <motion.section
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-[#8B5CF6]/20 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent p-8 sm:p-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📍</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
                  GMBAssist
                  <span className="block text-xl font-normal text-white/60 mt-1">
                    Automatize seu Google Business Profile e apareça pra quem importa.
                  </span>
                </h2>
                <p className="text-white/60 leading-relaxed mb-8">
                  Seu perfil no Google é sua primeira impressão local. GMBAssist
                  automatiza tudo que você deveria estar fazendo — postagens,
                  respostas, atualizações — mas nunca tem tempo.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contato"
                    className="rounded-lg border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 px-6 py-3 text-sm font-bold text-[#8B5CF6] hover:bg-[#8B5CF6]/20 transition-colors"
                  >
                    → Saiba mais
                  </Link>
                  <p className="self-center text-xs text-white/40">
                    Diagnóstico gratuito do seu perfil atual incluído
                  </p>
                </div>
              </div>

              <div>
                <FeatureGrid features={gmbFeatures} />
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Final CTA */}
        <motion.div
          className="rounded-2xl border border-white/10 bg-[#1E293B] p-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white sm:text-3xl mb-4">
            Quer usar nossos produtos{" "}
            <span className="text-[#00FF41]">nos seus projetos?</span>
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Fale com o squad. Vamos entender seu contexto e recomendar a melhor
            solução — ou construir uma sob medida.
          </p>
          <Link
            href="/contato"
            className="inline-block rounded-lg bg-[#00FF41] px-8 py-3 text-base font-bold text-[#0F172A] transition-opacity hover:opacity-90"
          >
            → Falar com o Squad
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
