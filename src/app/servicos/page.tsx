"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Globe,
  Bot,
  Zap,
  Palette,
  TrendingUp,
  Shield,
  BarChart3,
  Trophy,
  Star,
  Globe2,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import ShimmerButton from "@/components/ui/ShimmerButton";
import GlowCard from "@/components/ui/GlowCard";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const services = [
  {
    id: 1,
    icon: Globe,
    title: "Seu Site Que Vende Sozinho",
    subtitle: "Criação de Sites & Funis de Vendas",
    agent: { name: "Nova 💻", color: "#00FF41" },
    desc: "Esqueça site bonito que não converte. Aqui, cada botão, cada frase, cada cor tem um único propósito: fazer o visitante virar cliente. Seu site vai ser uma máquina de vendas. Rodando enquanto você toma café.",
    quote: "A maioria dos sites perde 90% das visitas. O nosso não.",
    cta: "Quero um Site Que Vende",
    bullets: [
      "Site profissional, rápido e responsivo (abre em qualquer celular)",
      "Landing pages que convertem visitante em lead",
      "Funil de vendas estruturado do topo ao fundo",
      "Integração com WhatsApp, formulários e CRM",
      "SEO básico configurado (Google vai te encontrar mais fácil)",
      "Copy persuasivo em todas as páginas",
    ],
    accentColor: "#00FF41",
  },
  {
    id: 2,
    icon: Bot,
    title: "Seu Vendedor de IA Que Nunca Para",
    subtitle: "Chatbots com IA — UpBro",
    agent: { name: "Forge ⚙️", color: "#00BFFF" },
    desc: "Sabe aquele cliente que manda mensagem às 23h no sábado? Antes, você perdia ele. Agora, ele recebe resposta na hora. Vende. Sem você. UpBro é nosso chatbot com IA rodando no WhatsApp, Instagram e no seu site ao mesmo tempo.",
    quote: "Enquanto você dorme, o UpBro está vendendo pra você.",
    cta: "Quero Meu Vendedor de IA",
    bullets: [
      "Chatbot personalizado com a voz da sua marca",
      "Atendimento automático no WhatsApp, Instagram e site",
      "Qualificação de leads (só os quentes chegam pra você)",
      "Integração com seu calendário para agendamento automático",
      "Relatórios de conversas e performance",
      "Atualização e melhoria contínua pela IA",
    ],
    accentColor: "#00BFFF",
  },
  {
    id: 3,
    icon: Zap,
    title: "Elimine o Trabalho Chato de Vez",
    subtitle: "Automações & Integrações",
    agent: { name: "Forge ⚙️", color: "#00BFFF" },
    desc: "Você está perdendo horas toda semana copiando dados, mandando e-mail manual, atualizando planilha. Isso é dinheiro jogado fora. A gente elimina isso. Conectamos seus sistemas. Criamos fluxos automáticos. Você só aparece quando tem decisão pra tomar.",
    quote: "Um empreendedor trabalhando no operacional é dinheiro parado.",
    cta: "Quero Automatizar Meu Negócio",
    bullets: [
      "Mapeamento do seu processo atual (onde tá o gargalo)",
      "Automação de tarefas repetitivas (e-mail, WhatsApp, planilhas, CRM)",
      "Integração entre sistemas que 'não conversam' (ERP, CRM, e-commerce)",
      "Notificações e alertas automáticos",
      "Relatórios automáticos no seu e-mail",
      "Documentação para você entender o que foi feito",
    ],
    accentColor: "#FFD700",
  },
  {
    id: 4,
    icon: Palette,
    title: "Uma Marca Que as Pessoas Não Esquecem",
    subtitle: "Design & Identidade Visual",
    agent: { name: "Pixel 🎨", color: "#FF6B6B" },
    desc: "Sua marca é a primeira impressão. E primeira impressão não tem segunda chance. Marcas fracas perdem pra concorrência mesmo com produto melhor. Marcas fortes cobram mais, vendem mais e fidelizam mais. Simples assim.",
    quote: "Sua marca precisa gritar confiança antes de você abrir a boca.",
    cta: "Quero uma Marca Forte",
    bullets: [
      "Logo profissional com variações (horizontal, vertical, ícone)",
      "Paleta de cores e tipografia da sua marca",
      "Manual de identidade visual (como usar sua marca certo)",
      "Posts e templates para redes sociais",
      "Apresentações e materiais de vendas",
      "Artes para anúncios e campanhas",
    ],
    accentColor: "#FF6B6B",
  },
  {
    id: 5,
    icon: TrendingUp,
    title: "Marketing Que Traz Cliente, Não Só Curtida",
    subtitle: "Marketing Digital que Vende",
    agent: { name: "Spark 🚀", color: "#FF8C00" },
    desc: "Curtida não paga boleto. Cliente paga. A gente faz marketing com foco em uma coisa só: resultado financeiro para o seu negócio. Anúncios, SEO, redes sociais, e-mail — tudo integrado, tudo medido, tudo otimizado.",
    quote: "Você não precisa de mais seguidores. Precisa de mais clientes.",
    cta: "Quero Marketing Que Converte",
    bullets: [
      "Gestão de anúncios (Facebook, Instagram, Google)",
      "SEO para aparecer no Google organicamente",
      "Calendário editorial e gestão de redes sociais",
      "E-mail marketing e nutrição de leads",
      "Relatório mensal com resultados reais (não vaidade)",
      "A/B testes para melhorar conversão continuamente",
    ],
    accentColor: "#FF8C00",
  },
  {
    id: 6,
    icon: Shield,
    title: "Proteja o Que Você Construiu",
    subtitle: "Proteção Digital",
    agent: { name: "Shield 🛡️", color: "#9B59B6" },
    desc: "Você levou anos construindo seu negócio. Hackers levam minutos para destruir. Um ataque, um vazamento, um ransomware — e tudo pode ir por água abaixo. A gente cuida da sua segurança digital como se fosse a nossa.",
    quote: "Não é questão de SE você vai sofrer um ataque. É questão de QUANDO.",
    cta: "Quero Proteger Meu Negócio",
    bullets: [
      "Auditoria de segurança digital (onde você está vulnerável)",
      "Monitoramento 24/7 de ameaças",
      "Backup automático de dados críticos",
      "Certificado SSL e proteção de domínio",
      "Plano de recuperação em caso de ataque",
      "Treinamento básico para sua equipe (o elo mais fraco)",
    ],
    accentColor: "#9B59B6",
  },
  {
    id: 7,
    icon: BarChart3,
    title: "CRM Gratuito Feito Para Você",
    subtitle: "CRM Integrado — HNBCRM",
    agent: { name: "Arch 🧠", color: "#00FF41" },
    desc: "Enquanto outros CRMs cobram R$300/mês e têm 200 funcionalidades que você nunca vai usar, a gente criou o HNBCRM: simples, poderoso e 100% gratuito. Open source. Sem taxa. Sem pegadinha. Feito por quem entende PME brasileira.",
    quote: "CRM caro é para empresa grande. HNBCRM é para empresa que quer crescer.",
    cta: "Quero o HNBCRM Grátis",
    ctaHref: "https://hnbcrm.com/",
    isNew: true,
    isFree: true,
    bullets: [
      "Pipeline de vendas visual (sabe exatamente onde está cada oportunidade)",
      "Gestão de contatos e histórico de conversas",
      "Integração com WhatsApp e chatbots",
      "IA integrada para sugestões e automações",
      "Dashboard com métricas do seu funil",
      "Open source — você tem o código, você tem o controle",
    ],
    accentColor: "#00FF41",
  },
];

const socialProof = [
  { icon: Trophy, text: "+200 empresas atendidas" },
  { icon: Star, text: "98% de satisfação" },
  { icon: Globe2, text: "Clientes em 3 países" },
  { icon: Clock, text: "Time de IA ativo 24/7" },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const Icon = service.icon;
  return (
    <motion.div
      variants={fadeUp}
      whileInView="visible"
      initial="hidden"
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <GlowCard glowColor={service.accentColor} className="h-full flex flex-col p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${service.accentColor}15`, border: `1px solid ${service.accentColor}30` }}
          >
            <Icon size={24} style={{ color: service.accentColor }} />
          </div>
          <div className="flex items-center gap-2 ml-3">
            {service.isNew && (
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#00FF41]/20 text-[#00FF41] border border-[#00FF41]/30">
                NOVO
              </span>
            )}
            {service.isFree && (
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                GRÁTIS
              </span>
            )}
          </div>
        </div>

        {/* Agent badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: `${service.agent.color}15`, color: service.agent.color, border: `1px solid ${service.agent.color}30` }}
          >
            {service.agent.name}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-1">{service.title}</h3>
        <p className="text-xs text-white/50 font-medium uppercase tracking-wider mb-3">{service.subtitle}</p>
        <p className="text-sm text-white/70 leading-relaxed mb-4">{service.desc}</p>

        {/* Bullets */}
        <ul className="space-y-2 mb-4 flex-1">
          {service.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/70">
              <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: service.accentColor }} />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* Quote */}
        <blockquote
          className="text-xs italic border-l-2 pl-3 mb-5 text-white/50"
          style={{ borderColor: service.accentColor }}
        >
          {service.quote}
        </blockquote>

        {/* CTA */}
        {service.ctaHref ? (
          <a
            href={service.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold text-sm transition-all duration-200 hover:scale-[1.02]"
            style={{ background: `${service.accentColor}20`, color: service.accentColor, border: `1px solid ${service.accentColor}40` }}
          >
            {service.cta} <ArrowRight size={14} />
          </a>
        ) : (
          <Link
            href="/contato"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold text-sm transition-all duration-200 hover:scale-[1.02]"
            style={{ background: `${service.accentColor}20`, color: service.accentColor, border: `1px solid ${service.accentColor}40` }}
          >
            {service.cta} <ArrowRight size={14} />
          </Link>
        )}
      </GlowCard>
    </motion.div>
  );
}

export default function ServicosPage() {
  const [bannerError, setBannerError] = useState(false);

  return (
    <main className="min-h-screen" style={{ background: "#0F172A" }}>
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
        {/* Aurora background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[100px] opacity-20"
            style={{ background: "#00FF41" }}
          />
          <div
            className="absolute top-10 right-1/4 w-80 h-80 rounded-full blur-[120px] opacity-15"
            style={{ background: "#00BFFF" }}
          />
        </div>

        <motion.div variants={stagger} initial="hidden" animate="visible" className="relative max-w-4xl mx-auto">
          <motion.div variants={fadeUp}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 border"
              style={{ color: "#00FF41", borderColor: "#00FF41", background: "#00FF4110" }}>
              Nossos Serviços
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Seu Concorrente Já Está{" "}
            <span style={{ color: "#00FF41" }}>Usando IA.</span>
            <br />E Você?
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Nós colocamos tecnologia de ponta pra trabalhar pelo seu negócio — 24 horas por dia, 7 dias por semana,
            sem férias, sem salário, sem desculpa. Enquanto você dorme, a Inovaway está escalando sua empresa.
          </motion.p>

          <motion.div variants={fadeUp}>
            <ShimmerButton href="/contato" variant="primary">
              Quero Crescer Agora — Falar com a Equipe
            </ShimmerButton>
          </motion.div>
        </motion.div>

        {/* Social Proof Badges */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative mt-14 flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
        >
          {socialProof.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/70"
              >
                <Icon size={14} style={{ color: "#00FF41" }} />
                <span>{item.text}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="px-4 pb-20 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-white text-center mb-12"
        >
          7 Serviços Para Escalar Seu Negócio
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* ── AGENTS BANNER ── */}
      <section className="px-4 pb-20 max-w-5xl mx-auto">
        {!bannerError ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden"
          >
            <Image
              src="/redesign/service-agents-banner.png"
              alt="Time de Agents Inovaway"
              width={1200}
              height={400}
              className="w-full object-cover"
              onError={() => setBannerError(true)}
            />
          </motion.div>
        ) : (
          /* Fallback: inline agents */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center"
          >
            <p className="text-white/50 text-sm mb-6 uppercase tracking-widest font-semibold">Nosso Time de Agents</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Nova", emoji: "💻", color: "#00FF41" },
                { name: "Forge", emoji: "⚙️", color: "#00BFFF" },
                { name: "Pixel", emoji: "🎨", color: "#FF6B6B" },
                { name: "Spark", emoji: "🚀", color: "#FF8C00" },
                { name: "Shield", emoji: "🛡️", color: "#9B59B6" },
                { name: "Scout", emoji: "🔍", color: "#1ABC9C" },
                { name: "Arch", emoji: "🧠", color: "#F1C40F" },
              ].map((a) => (
                <div key={a.name} className="flex flex-col items-center gap-2">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2"
                    style={{ borderColor: a.color, background: `${a.color}15` }}
                  >
                    {a.emoji}
                  </div>
                  <span className="text-xs text-white/60 font-medium">{a.name}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-white/60 text-base">
              Time de IA ativo <span style={{ color: "#00FF41" }}>24/7/365</span> — sem férias, sem pausa, sem desculpa.
            </p>
          </motion.div>
        )}
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-4 pb-28 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-[#00FF41]/20 bg-[#00FF41]/5 p-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Pronto para Crescer{" "}
            <span style={{ color: "#00FF41" }}>1-2 Anos em 3 Meses?</span>
          </h2>
          <p className="text-white/70 text-lg mb-2">
            Enquanto você lê isso, seu concorrente pode estar falando com a gente.
          </p>
          <p className="text-white font-bold text-lg mb-8">Não deixe ele chegar primeiro.</p>
          <ShimmerButton href="/contato" variant="primary">
            Falar com a Inovaway Agora — É Grátis a Conversa
          </ShimmerButton>
          <p className="mt-6 text-sm text-white/40">
            Resposta em até 24h • Sem compromisso • Diagnóstico gratuito
          </p>
        </motion.div>
      </section>
    </main>
  );
}
