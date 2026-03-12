"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useState } from "react";
import {
  MessageSquare,
  Brain,
  Target,
  Calendar,
  Link2,
  BarChart2,
  PenTool,
  Rocket,
  PipetteIcon,
  LayoutDashboard,
  Users,
  Lock,
  Download,
  MapPin,
  Star,
  RefreshCw,
  Trophy,
  Globe2,
  Flame,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
} from "lucide-react";
import ShimmerButton from "@/components/ui/ShimmerButton";
import GlowCard from "@/components/ui/GlowCard";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const upbroFeatures = [
  {
    icon: MessageSquare,
    title: "Multi-canal",
    desc: "Um bot que atende WhatsApp, Instagram e site ao mesmo tempo, sincronizados.",
    color: "#00FF41",
  },
  {
    icon: Brain,
    title: "IA que Aprende",
    desc: "Quanto mais usa, mais inteligente fica. Conversa como gente, não como robô.",
    color: "#00BFFF",
  },
  {
    icon: Target,
    title: "Qualificação Automática",
    desc: "Separa curioso de comprador antes de chegar pra você. Só leads quentes.",
    color: "#FFD700",
  },
  {
    icon: Calendar,
    title: "Agendamento Integrado",
    desc: "Cliente agenda reunião direto pelo chat. Sem voltar e vir na DM.",
    color: "#FF6B6B",
  },
  {
    icon: Link2,
    title: "Conecta com Tudo",
    desc: "CRM, planilha, e-mail, sistema interno. Integra qualquer coisa com qualquer coisa.",
    color: "#9B59B6",
  },
  {
    icon: BarChart2,
    title: "Painel de Controle",
    desc: "Conversas, taxa de conversão e performance em tempo real. Você no controle.",
    color: "#FF8C00",
  },
];

const hnbcrmFeatures = [
  {
    icon: LayoutDashboard,
    title: "Pipeline Visual",
    desc: "Arraste e solte seus leads pelo funil de vendas. Igual Trello, mas pra vendas.",
    color: "#00FF41",
  },
  {
    icon: Users,
    title: "Gestão de Contatos",
    desc: "Histórico completo de cada cliente numa tela só. Sem perder nada.",
    color: "#00BFFF",
  },
  {
    icon: MessageSquare,
    title: "Conversas Integradas",
    desc: "Todas as mensagens (WhatsApp, e-mail) dentro do CRM. Tudo no lugar.",
    color: "#FFD700",
  },
  {
    icon: Brain,
    title: "IA Integrada",
    desc: "Sugestões de follow-up, análise de leads, automações inteligentes.",
    color: "#FF6B6B",
  },
  {
    icon: Lock,
    title: "Open Source",
    desc: "O código é seu. Instale onde quiser. Customize como quiser. Sem amarras.",
    color: "#9B59B6",
  },
  {
    icon: Download,
    title: "Exportação Total",
    desc: "Seus dados são seus — exporte quando quiser, como quiser. Sempre.",
    color: "#FF8C00",
  },
];

const gmbFeatures = [
  { icon: MapPin, text: "Otimização completa do perfil Google Business" },
  { icon: Star, text: "Gestão e resposta automática de avaliações" },
  { icon: RefreshCw, text: "Publicações automáticas para manter o perfil ativo" },
  { icon: BarChart2, text: "Relatório de performance: cliques, ligações e visitas" },
  { icon: Target, text: "Monitoramento de ranking vs. concorrentes locais" },
  { icon: Brain, text: "IA responde avaliações com a voz da sua marca" },
];

const socialProof = [
  { icon: Rocket, text: "UpBro ativo em +150 empresas" },
  { icon: BarChart2, text: "HNBCRM com 0 custo mensal" },
  { icon: Globe2, text: "GMBAssist otimizando +80 perfis" },
  { icon: Flame, text: "3 produtos. 1 missão: crescer o seu negócio." },
];

export default function ProdutosPage() {
  const [upbroImgError, setUpbroImgError] = useState(false);
  const [hnbcrmImgError, setHnbcrmImgError] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: "#0F172A" }}>
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ background: "#00FF41" }} />
          <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-15" style={{ background: "#00BFFF" }} />
        </div>

        <motion.div variants={stagger} initial="hidden" animate="visible" className="relative max-w-4xl mx-auto">
          <motion.div variants={fadeUp}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 border"
              style={{ color: "#00FF41", borderColor: "#00FF41", background: "#00FF4110" }}>
              Nossos Produtos
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Ferramentas de <span style={{ color: "#00FF41" }}>Elite.</span>
            <br />Preço de PME.
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Construímos nossas próprias ferramentas porque as do mercado eram caras demais, complicadas demais
            ou fracas demais. Agora você usa o mesmo arsenal que usamos pra escalar dezenas de negócios.
          </motion.p>

          <motion.div variants={fadeUp}>
            <ShimmerButton href="/contato" variant="primary">
              Quero Conhecer os Produtos — Falar com a Equipe
            </ShimmerButton>
          </motion.div>
        </motion.div>

        {/* Social proof */}
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

      {/* ── UPBRO ── */}
      <section className="px-4 pb-24 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🤖</span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                UpBro — O Vendedor Que{" "}
                <span style={{ color: "#00FF41" }}>Não Tira Férias</span>
              </h2>
            </div>

            <p className="text-white/70 leading-relaxed mb-4">
              UpBro é um chatbot inteligente que atende, conversa, qualifica e vende pelo WhatsApp, Instagram e site —
              ao mesmo tempo, sem você precisar estar online.
            </p>
            <p className="text-white/70 leading-relaxed mb-6">
              Não é aquele chatbot idiota que fica repetindo "Olá! Como posso ajudar?".{" "}
              <strong className="text-white">UpBro entende o contexto, responde como gente, e converte.</strong>
            </p>

            <p className="text-[#00FF41] font-semibold mb-8">
              Está online às 3h da manhã, no feriado, no Natal. Sem reclamar. Sem errar. Sem custo extra.
            </p>

            <ShimmerButton href="/contato" variant="primary">
              Quero Meu Vendedor de IA — Falar Agora
            </ShimmerButton>
          </motion.div>

          {/* Image or placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {!upbroImgError ? (
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/redesign/product-upbro.png"
                  alt="UpBro — Chatbot IA"
                  width={600}
                  height={400}
                  className="w-full object-cover"
                  style={{ mixBlendMode: "screen" }}
                  onError={() => setUpbroImgError(true)}
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-[#00FF41]/20 bg-[#00FF41]/5 p-12 text-center">
                <div className="text-6xl mb-4">🤖</div>
                <p className="text-[#00FF41] font-bold text-xl">UpBro</p>
                <p className="text-white/50 mt-2">Seu vendedor de IA multi-canal</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* UpBro Features */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12"
        >
          {upbroFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={i} variants={fadeUp}>
                <GlowCard glowColor={f.color} className="p-5 h-full">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}
                  >
                    <Icon size={20} style={{ color: f.color }} />
                  </div>
                  <h3 className="text-white font-bold mb-1 text-base">{f.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── HNBCRM ── */}
      <section className="px-4 pb-24 max-w-7xl mx-auto overflow-hidden">
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            {!hnbcrmImgError ? (
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/redesign/product-hnbcrm.png"
                  alt="HNBCRM — CRM Gratuito"
                  width={600}
                  height={400}
                  className="w-full object-cover"
                  style={{ mixBlendMode: "screen" }}
                  onError={() => setHnbcrmImgError(true)}
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-[#00FF41]/20 bg-[#00FF41]/5 p-12 text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-[#00FF41] font-bold text-xl">HNBCRM</p>
                <p className="text-white/50 mt-2">CRM 100% gratuito e open source</p>
              </div>
            )}
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase tracking-wider">
                100% Grátis
              </span>
              <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 uppercase tracking-wider">
                Open Source
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📊</span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                HNBCRM — CRM{" "}
                <span style={{ color: "#00FF41" }}>Gratuito Para Quem Vende</span>
              </h2>
            </div>

            <p className="text-white/70 leading-relaxed mb-4">
              HNBCRM é o lugar onde você organiza todos os seus clientes e oportunidades de vendas.
              Sabe quando você perde aquela anotação no papel? Ou esquece de fazer o follow-up com aquele lead quente?
              Com HNBCRM, isso <strong className="text-white">nunca mais acontece.</strong>
            </p>

            <p className="text-white/70 leading-relaxed mb-4">
              É gratuito. É open source (o código é seu). Não tem taxa mensal. Não tem plano "premium" que trava funcionalidade básica.
              Criamos pra usar internamente — e funcionou tão bem que abrimos para todo mundo.
            </p>

            <div className="p-4 rounded-xl border border-[#00FF41]/20 bg-[#00FF41]/5 mb-8">
              <p className="text-[#00FF41] font-bold text-xl">R$0,00.</p>
              <p className="text-white/60 text-sm">Sem asterisco. Sem letra miúda. Sem pegadinha.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://hnbcrm.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all hover:scale-[1.02]"
                style={{ background: "#00FF41", color: "#0F172A" }}
              >
                Criar conta grátis <ArrowRight size={16} />
              </a>
              <a
                href="https://github.com/ericmil87/hnbcrm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm border border-white/20 text-white hover:border-white/40 transition-all hover:scale-[1.02]"
              >
                <Github size={16} /> Ver código no GitHub
              </a>
            </div>
          </motion.div>
        </div>

        {/* HNBCRM Features */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12"
        >
          {hnbcrmFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={i} variants={fadeUp}>
                <GlowCard glowColor={f.color} className="p-5 h-full">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}
                  >
                    <Icon size={20} style={{ color: f.color }} />
                  </div>
                  <h3 className="text-white font-bold mb-1 text-base">{f.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── GMBASSIST ── */}
      <section className="px-4 pb-24 max-w-5xl mx-auto">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🗺️</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              GMBAssist — Apareça No Google{" "}
              <span style={{ color: "#00FF41" }}>Antes do Concorrente</span>
            </h2>
          </div>

          <p className="text-white/70 mb-3 leading-relaxed">
            Quando alguém busca no Google "restaurante perto de mim" ou "mecânico em [sua cidade]" — o que aparece primeiro é o Google Business Profile.
            GMBAssist gerencia, otimiza e mantém seu perfil <strong className="text-white">sempre em alta performance.</strong>
          </p>

          <p className="text-[#00FF41] font-semibold mb-8">
            46% das buscas no Google são locais. Seu cliente está procurando você agora. Esteja lá.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {gmbFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/5"
                >
                  <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#00FF41" }} />
                  <span className="text-sm text-white/70">{f.text}</span>
                </motion.div>
              );
            })}
          </div>

          <p className="text-white/50 text-sm mb-6">
            Clínica, consultório, restaurante, loja, prestador de serviços — se você atende cliente presencialmente,
            você precisa do GMBAssist.
          </p>

          <ShimmerButton href="/contato" variant="primary">
            Quero Aparecer no Google — Falar Agora
          </ShimmerButton>
        </motion.div>
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
            A Tecnologia Que Antes Era Só Para{" "}
            <span style={{ color: "#00FF41" }}>Grandes Empresas.</span>
            <br />Agora É Sua.
          </h2>
          <p className="text-white/70 mb-3">
            UpBro + HNBCRM + GMBAssist. Três armas. Uma missão: fazer seu negócio crescer mais rápido do que você imagina.
          </p>
          <p className="text-white font-bold mb-8">
            Mas cuidado — trabalhamos com número limitado de clientes por vez para garantir qualidade.
          </p>
          <ShimmerButton href="/contato" variant="primary">
            Falar com a Inovaway e Garantir Minha Vaga
          </ShimmerButton>
          <p className="mt-6 text-sm text-white/40">
            Diagnóstico gratuito • Sem compromisso • Resposta em até 24h
          </p>
        </motion.div>
      </section>
    </main>
  );
}
