"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    icon: "🌐",
    title: "Criação de Sites",
    desc: "Landing pages que convertem, sites institucionais que impressionam e lojas e-commerce prontas pra vender. Next.js, design premium — rápidos, acessíveis e otimizados pra SEO.",
    cta: "→ Quero meu site",
  },
  {
    icon: "📊",
    title: "Funis de Venda",
    desc: "Da captura de lead à venda fechada. Construímos o funil inteiro: páginas, e-mails, automações e follow-ups. Cada etapa pensada pra reduzir fricção e aumentar conversão.",
    cta: "→ Quero um funil que vende",
  },
  {
    icon: "🤖",
    title: "Chatbots Personalizados",
    desc: "Powered by UpBro, nosso próprio SaaS. Chatbots com IA que atendem, qualificam e vendem — no WhatsApp, Instagram, site e onde seu cliente estiver. Multi-bot, omnichannel, sem código.",
    cta: "→ Automatizar meu atendimento",
  },
  {
    icon: "⚡",
    title: "Automações & Integrações",
    desc: "Conectamos seus sistemas, eliminamos tarefas manuais e criamos fluxos que rodam sozinhos. n8n, webhooks, APIs, Zapier — a gente integra qualquer coisa com qualquer coisa.",
    cta: "→ Automatizar meu negócio",
  },
  {
    icon: "🧠",
    title: "Agentes IA Personalizados",
    desc: "Agents de IA treinados pra sua realidade específica: atendimento ao cliente, qualificação de leads, análise de dados ou suporte interno. IA que faz sentido pro seu negócio, não só pra demo.",
    cta: "→ Quero meu Agent",
  },
  {
    icon: "🎨",
    title: "Geração de Conteúdo Visual",
    desc: "Imagens, banners, logos e criativos para anúncios — gerados e refinados por Pixel, nosso Creative Director. Identidade visual consistente em todos os canais, entregue em horas.",
    cta: "→ Criar meus criativos",
  },
  {
    icon: "✍️",
    title: "Copywriting & Conteúdo",
    desc: "Copy de alta conversão para sites, e-mails, anúncios e redes sociais. Spark escreve com base em dados, psicologia do consumidor e testes. Texto que não só lê bem — converte.",
    cta: "→ Quero copy que converte",
  },
  {
    icon: "📋",
    title: "Setup CRM",
    desc: "Configuramos e implementamos o HNBCRM (nosso CRM open source) ou integração com seu CRM atual. Pipeline de vendas, automações e dashboards pra você enxergar tudo em tempo real.",
    cta: "→ Organizar meu CRM",
  },
  {
    icon: "📍",
    title: "Gestão Google Business",
    desc: "Powered by GMBAssist. Automatizamos respostas a avaliações, postagens, atualizações e otimizações do seu perfil no Google. Mais visibilidade local, menos trabalho manual.",
    cta: "→ Dominar o Google Local",
  },
  {
    icon: "💡",
    title: "Consultoria AI",
    desc: "Quer entender como a IA pode transformar sua operação mas não sabe por onde começar? Arch e Scout mapeiam seu negócio, identificam oportunidades e entregam um plano de implementação real.",
    cta: "→ Quero minha consultoria",
  },
  {
    icon: "🛡️",
    title: "Auditoria de Segurança",
    desc: "Shield vasculha seu site, app ou sistema em busca de vulnerabilidades antes que alguém mal-intencionado o faça. Relatório completo com prioridades e recomendações de correção.",
    cta: "→ Auditar meu projeto",
  },
  {
    icon: "🔬",
    title: "QA & Testes",
    desc: "Lens executa testes visuais, funcionais e de performance antes de qualquer lançamento. Relatórios com screenshots, vídeos e priorização de bugs. Nada vai pro ar com problema.",
    cta: "→ Testar meu produto",
  },
  {
    icon: "📢",
    title: "Gestão de Anúncios",
    desc: "Meta Ads, Google Ads, criativos, segmentação e otimização contínua. Gerenciamos suas campanhas com obsessão por ROAS — cada real investido rastreado e otimizado.",
    cta: "→ Escalar com anúncios",
  },
];

const comingSoon = [
  {
    icon: "🎬",
    title: "Motion Design",
    desc: "Animações, transições e vídeos animados com Remotion. Do estático ao dinâmico — seu conteúdo vai se mover.",
  },
  {
    icon: "🎥",
    title: "Produção de Vídeo",
    desc: "Um agent dedicado exclusivamente à produção de vídeo. Roteiro, edição, legendas e otimização pra cada plataforma.",
  },
  {
    icon: "📱",
    title: "Gestão de Redes Sociais",
    desc: "Um agent que posta, responde, analisa e cresce sua presença social enquanto você foca no que importa.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

export default function ServicosPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Tudo que seu negócio precisa pra crescer.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] to-[#06B6D4]">
              Nada que você não vai usar.
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
            Cada serviço é executado por um agent especializado — ou pelo squad
            completo trabalhando em conjunto. Você escolhe o que precisa, a
            gente entrega.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              className="group rounded-xl border border-white/10 bg-[#1E293B] p-6 flex flex-col transition-all hover:border-[#00FF41]/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00FF41]/5"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed flex-1 mb-5">
                {service.desc}
              </p>
              <Link
                href="/contato"
                className="text-sm font-medium text-[#00FF41] hover:underline transition-colors group-hover:text-[#00FF41]"
              >
                {service.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Mais poder{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">
                chegando.
              </span>
            </h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">
              Novos agents estão sendo treinados. Confira o que está em
              desenvolvimento:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {comingSoon.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative rounded-xl border border-dashed border-[#8B5CF6]/30 bg-[#8B5CF6]/5 p-6 opacity-75"
              >
                <span className="absolute top-4 right-4 rounded-full border border-[#8B5CF6]/40 bg-[#8B5CF6]/20 px-3 py-0.5 text-xs font-medium text-[#8B5CF6]">
                  Em breve
                </span>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="mt-24 rounded-2xl border border-[#00FF41]/20 bg-[#00FF41]/5 p-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white sm:text-3xl mb-3">
            Não sabe qual serviço escolher?
          </h2>
          <p className="text-white/60 mb-2">
            Precisa de algo sob medida?
          </p>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Fale com Arch. Em 15 minutos ele mapeia exatamente o que seu negócio
            precisa. Sem achismos, sem pacote genérico.
          </p>
          <Link
            href="/contato"
            className="inline-block rounded-lg bg-[#00FF41] px-8 py-3 text-base font-bold text-[#0F172A] transition-opacity hover:opacity-90"
          >
            → Falar com o Arquiteto
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
