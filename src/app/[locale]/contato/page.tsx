"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Lock, Zap, Gift } from "lucide-react";


const needOptions = [
  "Quero um site profissional",
  "Preciso de uma identidade visual",
  "Quero aparecer no Google",
  "Preciso de mais clientes",
  "Meu negócio precisa de proteção digital",
  "Quero anunciar nas redes sociais",
  "Não sei por onde começar — me ajudem!",
];

const trustItems = [
  { icon: Lock, label: "Seus dados estão 100% seguros. Nunca vamos te encher de spam." },
  { icon: Zap, label: "Resposta garantida em até 2 horas úteis" },
  { icon: Gift, label: "O diagnóstico é gratuito. Sem pegadinha, sem compromisso." },
];

function ResponseTimer() {
  const [display, setDisplay] = useState(42);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setDisplay(prev => {
          // Onda suave: desce gradualmente com pequena variação
          const delta = Math.random() * 6 - 2; // -2 a +4 (tendência de descer)
          const next = prev - delta;
          // Se chegar perto do mínimo, sobe; se ultrapassar máximo, desce
          if (next < 10) return Math.round(prev + Math.random() * 8 + 3);
          if (next > 50) return Math.round(prev - Math.random() * 5 - 2);
          return Math.round(Math.max(8, Math.min(52, next)));
        });
        setFade(true);
      }, 400);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-[#00FF41]/20 bg-[#00FF41]/5 p-4">
      <p className="text-xs text-white/60 mb-1">⏱️ Tempo médio de resposta</p>
      <div
        className="text-3xl font-bold transition-all duration-400"
        style={{
          color: "#00FF41",
          opacity: fade ? 1 : 0,
          transform: fade ? "translateY(0)" : "translateY(-4px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        {display} min
      </div>
      <p className="text-xs text-white/60 mt-1">
        Squad ativo fora do horário comercial
      </p>
    </div>
  );
}

export default function ContatoPage() {
  const locale = useLocale();
  const [selectedNeed, setSelectedNeed] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          company: formData.get("company"),
          segment: formData.get("segment"),
          website: formData.get("website"),
          need: selectedNeed,
          message: formData.get("message"),
          locale: locale,
        }),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Erro ao enviar. Tente novamente.");
      }
    } catch {
      alert("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      {/* ── MOBILE: form first, minimal header ── */}
      <div className="md:hidden px-4 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              Vamos fazer seu negócio{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] to-[#06B6D4]">
                crescer?
              </span>
            </h1>
            <p className="text-sm text-white/50">
              ⚡ Respondemos em até 2 horas úteis. Diagnóstico gratuito.
            </p>
          </div>

          {submitted ? (
            <SuccessMessage />
          ) : (
            <ContactForm
              selectedNeed={selectedNeed}
              setSelectedNeed={setSelectedNeed}
              loading={loading}
              onSubmit={handleSubmit}
            />
          )}
        </motion.div>
      </div>

      {/* ── DESKTOP: 2-column layout ── */}
      <div className="hidden md:block py-20 px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#00FF41] text-sm font-mono tracking-widest uppercase mb-3">
              // diagnóstico gratuito
            </p>
            <h1 className="text-5xl font-bold text-white lg:text-6xl mb-4">
              Vamos fazer seu negócio{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] to-[#06B6D4]">
                crescer?
              </span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Preencha o formulário abaixo e receba um diagnóstico gratuito
              do seu negócio digital. Sem compromisso. Sem enrolação.
              Só oportunidade de crescer de verdade.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: Spark image + info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Spark image */}
              <div className="relative flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-2xl blur-3xl"
                  style={{ background: "radial-gradient(circle, rgba(0,255,65,0.15) 0%, transparent 70%)" }}
                />
                <Image
                  src="/redesign/contact-spark.png"
                  alt="Spark — Marketing Agent"
                  width={400}
                  height={400}
                  className="relative z-10 w-full max-w-sm mx-auto"
                  style={{ mixBlendMode: "screen" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/squad/spark-avatar.webp";
                    (e.target as HTMLImageElement).style.mixBlendMode = "normal";
                    (e.target as HTMLImageElement).className = "relative z-10 w-32 h-32 rounded-full mx-auto object-cover";
                  }}
                  priority
                />
              </div>

              {/* Info card */}
              <div className="rounded-2xl border border-white/10 bg-[#1E293B]/80 p-6 space-y-4">
                <div>
                  <p className="text-white font-semibold text-lg mb-1">🚀 Spark fala por todos nós:</p>
                  <p className="text-white/60 text-sm leading-relaxed italic">
                    "Preencha o formulário e em até 2 horas um especialista entra em contato.
                    Vamos descobrir juntos o que seu negócio precisa pra crescer de verdade."
                  </p>
                </div>

                <ResponseTimer />

                <div className="flex flex-col gap-2 pt-2">
                  {trustItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <span key={item.label} className="flex items-start gap-2 text-sm text-white/50">
                        <Icon className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "#00FF41" }} />
                        {item.label}
                      </span>
                    );
                  })}
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/5581981392929?text=Oi%20squad%20INOVAWAY!%20Quero%20um%20diagn%C3%B3stico%20gratuito."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity"
                >
                  <span>💬</span> Falar direto no WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {submitted ? (
                <SuccessMessage />
              ) : (
                <ContactForm
                  selectedNeed={selectedNeed}
                  setSelectedNeed={setSelectedNeed}
                  loading={loading}
                  onSubmit={handleSubmit}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactForm({
  selectedNeed,
  setSelectedNeed,
  loading,
  onSubmit,
}: {
  selectedNeed: string;
  setSelectedNeed: (v: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-[#00FF41]/50 focus:outline-none focus:ring-1 focus:ring-[#00FF41]/30 transition-colors text-sm";
  const labelClass = "block text-sm font-medium text-white/70 mb-1.5";

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1E293B] p-6 md:p-8">
      <h2 className="text-lg font-semibold text-white mb-6">
        📋 Conta pra gente sobre seu negócio
      </h2>
      <form onSubmit={onSubmit} className="space-y-5">
        {/* Nome + Email */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Seu nome *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Como podemos te chamar?"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Seu melhor e-mail *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="exemplo@suaempresa.com.br"
              className={inputClass}
            />
          </div>
        </div>

        {/* WhatsApp + Empresa */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className={labelClass}>
              Seu WhatsApp *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="(11) 99999-9999"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="company" className={labelClass}>
              Nome do seu negócio *
            </label>
            <input
              id="company"
              name="company"
              type="text"
              required
              placeholder="Como se chama sua empresa?"
              className={inputClass}
            />
          </div>
        </div>

        {/* Segmento + Site */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="segment" className={labelClass}>
              Qual é o seu ramo?
            </label>
            <input
              id="segment"
              name="segment"
              type="text"
              placeholder="Ex: restaurante, clínica, loja de roupas..."
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="website" className={labelClass}>
              Você já tem um site?
            </label>
            <input
              id="website"
              name="website"
              type="text"
              placeholder="www.suaempresa.com.br (ou deixe vazio)"
              className={inputClass}
            />
          </div>
        </div>

        {/* O que mais precisa */}
        <div>
          <label className={labelClass}>O que você mais precisa agora?</label>
          <div className="flex flex-wrap gap-2">
            {needOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setSelectedNeed(opt === selectedNeed ? "" : opt)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedNeed === opt
                    ? "border-[#00FF41] bg-[#00FF41]/20 text-[#00FF41]"
                    : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Mensagem */}
        <div>
          <label htmlFor="message" className={labelClass}>
            Conta mais sobre seu negócio
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Me fala um pouco sobre o que você faz, seus desafios, o que você sonha pra sua empresa..."
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg px-6 py-4 text-base font-bold text-[#0F172A] transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background: loading
              ? "#4a7c59"
              : "linear-gradient(135deg, #00FF41, #06B6D4)",
          }}
        >
          {loading ? "⏳ Enviando..." : "Quero meu diagnóstico grátis →"}
        </button>

        <div className="flex flex-wrap justify-center gap-4 pt-1">
          {[
            { icon: "🔒", text: "100% seguro" },
            { icon: "⚡", text: "Resposta em 2h" },
            { icon: "🆓", text: "Sem compromisso" },
          ].map((t) => (
            <span key={t.text} className="flex items-center gap-1 text-xs text-white/60">
              <span>{t.icon}</span> {t.text}
            </span>
          ))}
        </div>
      </form>
    </div>
  );
}

function SuccessMessage() {
  return (
    <motion.div
      className="rounded-2xl border border-[#00FF41]/20 bg-[#1E293B] p-10 text-center flex flex-col items-center justify-center min-h-[480px]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated check */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
      >
        <div className="w-24 h-24 rounded-full border-4 border-[#00FF41] flex items-center justify-center relative">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-[#00FF41]"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          />
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-12 h-12"
          >
            <motion.path
              d="M5 13l4 4L19 7"
              stroke="#00FF41"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </motion.svg>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-white mb-3">
          🎉 Chegou! Sua mensagem está com a gente.
        </h2>
        <p className="text-white/60 max-w-md mx-auto mb-4 leading-relaxed">
          Recebemos seu pedido e já estamos analisando seu negócio.
        </p>
        <p className="text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
          Em até{" "}
          <span className="text-[#00FF41] font-semibold">2 horas úteis</span>,
          um dos nossos especialistas vai entrar em contato pelo WhatsApp ou
          e-mail que você deixou.
        </p>
        <p className="text-white/60 text-sm mb-8">
          Enquanto isso, fique à vontade pra conhecer mais sobre o nosso time e o que entregamos pra cada cliente. Até já! 🚀
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/produtos"
            className="rounded-lg bg-[#00FF41] px-6 py-3 text-sm font-bold text-[#0F172A] transition-opacity hover:opacity-90"
          >
            Conhecer nosso time →
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white hover:border-white/40 transition-colors"
          >
            ← Voltar para a home
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
