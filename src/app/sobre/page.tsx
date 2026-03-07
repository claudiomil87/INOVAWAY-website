"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Target,
  Handshake,
  Rocket,
  Lightbulb,
  Sprout,
  Briefcase,
  Globe2,
  Bot,
  Stars,
  Check,
  X,
  ArrowRight,
  Quote,
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

const values = [
  {
    icon: Target,
    title: "Resultado Acima de Tudo",
    desc: "Não cobramos por horas. Não vendemos processo. Vendemos resultado. Se não funcionar pra você, não funciona pra gente.",
    color: "#00FF41",
  },
  {
    icon: Handshake,
    title: "Transparência Sem Desculpa",
    desc: "Deu errado? A gente fala. Vai atrasar? A gente avisa. Sem enrolação. Sem bullshit. Sem sumir quando o bicho pega.",
    color: "#00BFFF",
  },
  {
    icon: Rocket,
    title: "Melhoria Contínua",
    desc: "Nunca entregamos e 'sumimos'. Nossos sistemas aprendem. Nossa equipe melhora. Seu negócio cresce.",
    color: "#FFD700",
  },
  {
    icon: Lightbulb,
    title: "Simplicidade",
    desc: "Tecnologia complexa que ninguém usa não vale nada. A gente simplifica. Você usa. E vende mais.",
    color: "#FF6B6B",
  },
  {
    icon: Sprout,
    title: "Parceria de Verdade",
    desc: "Seu crescimento é nosso crescimento. Não somos fornecedores. Somos parceiros. Tem diferença.",
    color: "#9B59B6",
  },
];

const comparison = [
  {
    market: "Equipe humana (dorme, tira férias, fica doente)",
    inovaway: "Time de IA + humanos operando 24/7/365",
  },
  {
    market: "Resultado em 6-12 meses",
    inovaway: "Crescimento visível em 30-90 dias",
  },
  {
    market: "Projeto entregue e abandonado",
    inovaway: "Melhoria contínua e suporte constante",
  },
  {
    market: "Preço de agência grande",
    inovaway: "Preço acessível para PME",
  },
  {
    market: "Ferramentas genéricas de terceiros",
    inovaway: "Produtos próprios (UpBro, HNBCRM, GMBAssist)",
  },
  {
    market: "Foco em entrega de serviço",
    inovaway: "Foco em resultado financeiro do cliente",
  },
];

const testimonials = [
  {
    quote: "Em 60 dias com a Inovaway, meu faturamento cresceu 40%. Não acreditei até ver o relatório.",
    author: "Ricardo M.",
    role: "Dono de clínica odontológica",
  },
  {
    quote: "Contratei uma agência famosa antes e joguei R$8.000 fora. Com a Inovaway gastei menos e tive resultado real.",
    author: "Ana Paula S.",
    role: "E-commerce de moda",
  },
  {
    quote: "O chatbot deles (UpBro) atende meus clientes às 2h da manhã. Já vendi durante o sono.",
    author: "Carlos T.",
    role: "Consultor financeiro",
  },
];

const socialProof = [
  { icon: Briefcase, text: "15+ anos de experiência em tecnologia" },
  { icon: Globe2, text: "+200 empresas transformadas" },
  { icon: Bot, text: "Time de IA ativo 24/7" },
  { icon: Stars, text: "Clientes em Brasil, Portugal e EUA" },
];

export default function SobrePage() {
  const [teamImgError, setTeamImgError] = useState(false);

  return (
    <main className="min-h-screen" style={{ background: "#0F172A" }}>
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ background: "#00FF41" }} />
          <div className="absolute top-10 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-10" style={{ background: "#00BFFF" }} />
        </div>

        <motion.div variants={stagger} initial="hidden" animate="visible" className="relative max-w-4xl mx-auto">
          <motion.div variants={fadeUp}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 border"
              style={{ color: "#00FF41", borderColor: "#00FF41", background: "#00FF4110" }}>
              Sobre a Inovaway
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Somos o Time de Tecnologia Que Seu Negócio{" "}
            <span style={{ color: "#00FF41" }}>Merecia Ter,</span>
            <br />Mas Nunca Pôde Pagar.
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            A Inovaway nasceu de uma indignação: por que só empresas grandes têm acesso à tecnologia de ponta?
            A gente veio mudar isso. Para sempre.
          </motion.p>

          <motion.div variants={fadeUp}>
            <ShimmerButton href="/contato" variant="primary">
              Quero Conhecer a Inovaway — Falar Agora
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

      {/* ── HISTÓRIA ── */}
      <section className="px-4 pb-24 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12"
        >
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8">Nossa História</h2>

          <div className="space-y-5 text-white/70 leading-relaxed">
            <p>
              Não começamos numa garagem.{" "}
              <span className="text-white font-medium">Mas quase.</span>
            </p>
            <p>
              Nosso fundador passou <strong className="text-[#00FF41]">mais de 15 anos</strong> no mundo da tecnologia.
              Trabalhou com grandes empresas, viu como elas operavam, quais ferramentas usavam, por que cresciam
              enquanto as pequenas lutavam.
            </p>
            <p>
              E a resposta era simples — e injusta:{" "}
              <strong className="text-white">acesso.</strong>
            </p>
            <p>
              Grandes empresas tinham equipes inteiras de TI, designers, marketeiros, analistas de dados.
              PMEs tinham... uma planilha e um sobrinho que "entendia de computador".
            </p>
            <p className="text-white font-medium">Isso precisava mudar.</p>
            <p>
              A <strong className="text-[#00FF41]">Inovaway</strong> nasceu para ser o time de tecnologia que todo
              pequeno e médio empreendedor merece ter — mas que antes só quem tinha muito dinheiro podia pagar.
            </p>
            <p>
              Hoje, com inteligência artificial, automação e um time apaixonado, a gente entrega o trabalho de uma
              agência de R$50.000/mês —{" "}
              <strong className="text-[#00FF41]">por uma fração desse preço.</strong>
            </p>
            <p className="text-white">
              E isso não é exagero. É o que acontece quando você usa tecnologia do jeito certo.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── MISSÃO E VISÃO ── */}
      <section className="px-4 pb-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlowCard glowColor="#00FF41" className="p-8 h-full">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "#00FF4115", border: "1px solid #00FF4130" }}>
                <Target size={24} style={{ color: "#00FF41" }} />
              </div>
              <h3 className="text-xl font-black text-white mb-4" style={{ color: "#00FF41" }}>🎯 Missão</h3>
              <p className="text-white/70 leading-relaxed italic">
                "Democratizar o acesso à tecnologia de ponta para pequenas e médias empresas — e fazer cada cliente
                crescer mais rápido do que ele imagina ser possível."
              </p>
              <p className="text-white/60 text-sm mt-4 leading-relaxed">
                Não acreditamos que tamanho de empresa define quem merece ter tecnologia boa.
                Acreditamos que <strong className="text-white">todo negócio com produto sério merece uma chance séria de crescer.</strong>
              </p>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlowCard glowColor="#00BFFF" className="p-8 h-full">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "#00BFFF15", border: "1px solid #00BFFF30" }}>
                <Stars size={24} style={{ color: "#00BFFF" }} />
              </div>
              <h3 className="text-xl font-black mb-4" style={{ color: "#00BFFF" }}>👁️ Visão</h3>
              <p className="text-white/70 leading-relaxed italic">
                "Um mundo onde todo empreendedor tem um time de tecnologia de elite ao seu lado — não importa o tamanho
                do negócio nem o tamanho do bolso."
              </p>
              <p className="text-white/60 text-sm mt-4 leading-relaxed">
                Estamos construindo isso. Agora. Um cliente de cada vez.
              </p>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* ── VALORES ── */}
      <section className="px-4 pb-24 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-black text-white text-center mb-4"
        >
          Nossos 5 Valores{" "}
          <span style={{ color: "#00FF41" }}>(Sem Papo de RH)</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/50 text-center mb-12"
        >
          Princípios reais. Não decoração de parede.
        </motion.p>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div key={i} variants={fadeUp}>
                <GlowCard glowColor={v.color} className="p-6 h-full">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${v.color}15`, border: `1px solid ${v.color}30` }}
                  >
                    <Icon size={22} style={{ color: v.color }} />
                  </div>
                  <h4 className="text-white font-black text-base mb-2">{v.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{v.desc}</p>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── TABELA COMPARATIVA ── */}
      <section className="px-4 pb-24 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-4">
            Por Que Somos{" "}
            <span style={{ color: "#00FF41" }}>Fundamentalmente Diferentes</span>
          </h2>
          <p className="text-white/50 text-center mb-12">
            Existem centenas de agências digitais por aí. Veja a diferença na prática.
          </p>

          <div className="rounded-2xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-2 text-sm font-black uppercase tracking-wider">
              <div className="p-4 text-center bg-white/5 text-white/50">O Mercado Oferece</div>
              <div className="p-4 text-center text-center" style={{ background: "#00FF4110", color: "#00FF41" }}>
                A Inovaway Entrega
              </div>
            </div>

            {/* Rows */}
            {comparison.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="grid grid-cols-2 border-t border-white/5"
              >
                <div className="p-4 flex items-start gap-2 bg-white/[0.02]">
                  <X size={14} className="flex-shrink-0 mt-0.5 text-red-400" />
                  <span className="text-sm text-white/50">{row.market}</span>
                </div>
                <div className="p-4 flex items-start gap-2" style={{ background: "#00FF4108" }}>
                  <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#00FF41" }} />
                  <span className="text-sm text-white/80">{row.inovaway}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl border border-white/10 bg-white/5">
            <p className="text-white/70 text-sm leading-relaxed">
              Nossa equipe de IA não tem ego. Não tem viés. Não tem mau dia. Ela analisa dados, identifica oportunidades,
              cria conteúdo, atende cliente e otimiza campanhas — sem parar.
            </p>
            <p className="text-white/70 text-sm mt-3 leading-relaxed">
              Aí você pergunta: "Mas tem humano nisso?" Sim. Sempre. Mas potencializado por IA.{" "}
              <strong className="text-[#00FF41]">O resultado é uma equipe que produz 10x mais, por 10x menos.</strong>
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── NOSSO TIME ── */}
      <section className="px-4 pb-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {!teamImgError ? (
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/redesign/about-team.png"
                  alt="Time Inovaway — Elite Squad"
                  width={600}
                  height={450}
                  className="w-full object-cover"
                  style={{ mixBlendMode: "screen" }}
                  onError={() => setTeamImgError(true)}
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-[#00FF41]/20 bg-[#00FF41]/5 p-12 text-center">
                <p className="text-white/50 text-sm mb-6 uppercase tracking-widest font-semibold">Elite Squad</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    { name: "Arch", emoji: "🧠" },
                    { name: "Nova", emoji: "💻" },
                    { name: "Forge", emoji: "⚙️" },
                    { name: "Pixel", emoji: "🎨" },
                    { name: "Spark", emoji: "🚀" },
                    { name: "Shield", emoji: "🛡️" },
                    { name: "Scout", emoji: "🔍" },
                  ].map((a) => (
                    <div key={a.name} className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xl">
                        {a.emoji}
                      </div>
                      <span className="text-xs text-white/50">{a.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
              Nosso Time:{" "}
              <span style={{ color: "#00FF41" }}>Elite Squad</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Não temos um "departamento de marketing". Temos a Spark. Não temos um "time de dev". Temos a Nova e o Forge.
              Cada agent é especialista na sua área — treinado, focado, sem distração.
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              Cada agent opera de forma autônoma, mas coordenada. Arch orquestra. Cada um executa.
              O resultado é um time que entrega em dias o que agências levam semanas.
            </p>
            <p className="text-[#00FF41] font-semibold leading-relaxed">
              Rápido porque é especializado. Barato porque é eficiente. Eficaz porque usa IA do jeito certo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section className="px-4 pb-24 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-black text-white text-center mb-12"
        >
          O Que Nossos Clientes Dizem
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeUp}>
              <GlowCard glowColor="#00FF41" className="p-6 h-full flex flex-col">
                <Quote size={20} style={{ color: "#00FF41" }} className="mb-4 opacity-60" />
                <p className="text-white/70 text-sm leading-relaxed italic flex-1 mb-4">{t.quote}</p>
                <div>
                  <p className="text-white font-bold text-sm">— {t.author}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── FRASE DE IMPACTO ── */}
      <section className="px-4 pb-20 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-[#00FF41]/30 p-10 text-center"
          style={{ background: "linear-gradient(135deg, #00FF4108, #00BFFF05)" }}
        >
          <h2 className="text-2xl md:text-4xl font-black text-white leading-tight mb-4">
            "O que grandes empresas pagam{" "}
            <span style={{ color: "#00FF41" }}>R$50.000/mês</span>{" "}
            em agência, você tem com a Inovaway por uma fração."
          </h2>
          <p className="text-white/60 text-base mt-4 max-w-xl mx-auto">
            Não porque somos baratos. Mas porque somos{" "}
            <strong className="text-white">eficientes.</strong>{" "}
            Inteligência artificial muda o jogo. E a gente usa isso pra você.
          </p>
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
            Sua Empresa Merece Crescer.{" "}
            <span style={{ color: "#00FF41" }}>E Você Merece Dormir Tranquilo.</span>
          </h2>
          <p className="text-white/70 mb-3">
            Diagnóstico gratuito. Sem compromisso. Sem enrolação.
          </p>
          <p className="text-white/70 mb-3">
            A gente olha pro seu negócio, identifica o maior gargalo e te diz o que fazer — <strong className="text-white">de graça.</strong>
          </p>
          <p className="text-white font-bold mb-8">
            Mas cuidado: <span style={{ color: "#00FF41" }}>abrimos poucas vagas de diagnóstico por mês.</span> Quem chega primeiro, é atendido primeiro.
          </p>
          <ShimmerButton href="/contato" variant="primary">
            Quero Meu Diagnóstico Gratuito — Falar com a Inovaway Agora
          </ShimmerButton>
          <p className="mt-6 text-sm text-white/40">
            Resposta em até 24h • 100% gratuito • Sem compromisso
          </p>
        </motion.div>
      </section>
    </main>
  );
}
