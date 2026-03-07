"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const contactInfo = [
  {
    icon: "📧",
    label: "E-mail",
    value: "inovaway@inovaway.org",
    href: "mailto:inovaway@inovaway.org",
    detail: "Respondemos em até 1h",
  },
  {
    icon: "📱",
    label: "WhatsApp",
    value: "+55 (81) 98139-2929",
    href: "https://wa.me/5581981392929",
    detail: "Seg–Sáb, 8h–22h",
  },
  {
    icon: "📍",
    label: "Localização",
    value: "Recife, PE — Rua do Apolo, 161",
    href: null,
    detail: "Squad ativo 24/7",
  },
];

const services = [
  "Criação de site",
  "Funil de vendas",
  "Chatbot / IA",
  "Automações",
  "CRM",
  "Anúncios",
  "Consultoria",
  "Outra coisa",
];

const budgets = [
  "Ainda não sei",
  "Até R$ 2.000",
  "R$ 2.000 – R$ 5.000",
  "R$ 5.000 – R$ 15.000",
  "Acima de R$ 15.000",
];

export default function ContatoPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function toggleService(s: string) {
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          company: formData.get('company'),
          services: selectedServices,
          budget,
          message: formData.get('message'),
        }),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Erro ao enviar. Tente novamente.');
      }
    } catch {
      alert('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#00FF41] text-sm font-mono tracking-widest uppercase mb-4">
            // contato
          </p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
            Vamos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] to-[#06B6D4]">
              conversar?
            </span>
          </h1>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            Nossos agents estão prontos para ouvir você. Em menos de 1h você
            sabe se somos o parceiro certo — e o que vamos fazer pelo seu
            negócio.
          </p>
          <p className="mt-2 text-white/40 text-sm">
            Respondemos via WhatsApp, e-mail ou Discord. Você escolhe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Contact Info Sidebar */}
          <motion.aside
            className="lg:col-span-1 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Info cards */}
            {contactInfo.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex gap-4 items-start rounded-xl border border-white/10 bg-[#1E293B] p-5 hover:border-[#00FF41]/30 transition-colors group"
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs text-white/40 mb-0.5">{item.label}</p>
                    <p className="text-white font-medium group-hover:text-[#00FF41] transition-colors">
                      {item.value}
                    </p>
                    <p className="text-xs text-white/40 mt-1">{item.detail}</p>
                  </div>
                </a>
              ) : (
                <div
                  key={item.label}
                  className="flex gap-4 items-start rounded-xl border border-white/10 bg-[#1E293B] p-5"
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs text-white/40 mb-0.5">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                    <p className="text-xs text-white/40 mt-1">{item.detail}</p>
                  </div>
                </div>
              )
            )}

            {/* Response time */}
            <div className="rounded-xl border border-[#00FF41]/20 bg-[#00FF41]/5 p-5">
              <p className="text-xs text-white/40 mb-1">⏱️ Tempo médio de resposta</p>
              <p className="text-3xl font-bold text-[#00FF41]">47 min</p>
              <p className="text-xs text-white/40 mt-1">
                Squad ativo fora do horário comercial
              </p>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/5581981392929?text=Oi%20squad%20INOVAWAY!%20Quero%20um%20diagn%C3%B3stico%20gratuito."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] px-6 py-4 text-sm font-bold text-white hover:opacity-90 transition-opacity"
            >
              <span>💬</span> Falar direto no WhatsApp
            </a>
          </motion.aside>

          {/* Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                className="rounded-2xl border border-[#00FF41]/20 bg-[#1E293B] p-12 text-center h-full flex flex-col items-center justify-center min-h-[480px]"
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
                    {/* Glow ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-[#00FF41]"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <motion.svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-12 h-12"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
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
                    Mensagem enviada com sucesso!
                  </h2>
                  <p className="text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
                    Nosso time vai analisar seu pedido e entrar em contato em até{" "}
                    <span className="text-[#00FF41] font-semibold">1 hora</span>.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/"
                      className="rounded-lg bg-[#00FF41] px-6 py-3 text-sm font-bold text-[#0F172A] transition-opacity hover:opacity-90"
                    >
                      ← Voltar para a home
                    </Link>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white hover:border-white/40 transition-colors"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-[#1E293B] p-8">
                <h2 className="text-xl font-semibold text-white mb-8">
                  Enviar mensagem pro squad
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nome + Email */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-white/70 mb-1.5"
                      >
                        Nome completo *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Seu nome"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-[#00FF41]/50 focus:outline-none focus:ring-1 focus:ring-[#00FF41]/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-white/70 mb-1.5"
                      >
                        E-mail *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="seu@email.com"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-[#00FF41]/50 focus:outline-none focus:ring-1 focus:ring-[#00FF41]/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Telefone + Empresa */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-white/70 mb-1.5"
                      >
                        WhatsApp{" "}
                        <span className="text-white/30 text-xs">(opcional)</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(81) 98139-2929"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-[#00FF41]/50 focus:outline-none focus:ring-1 focus:ring-[#00FF41]/30 transition-colors"
                      />
                      <p className="text-xs text-white/30 mt-1">
                        Pra gente responder mais rápido
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-white/70 mb-1.5"
                      >
                        Empresa / Projeto{" "}
                        <span className="text-white/30 text-xs">(opcional)</span>
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Nome da sua empresa ou projeto"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-[#00FF41]/50 focus:outline-none focus:ring-1 focus:ring-[#00FF41]/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* O que precisa */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-3">
                      O que você precisa?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                            selectedServices.includes(s)
                              ? "border-[#00FF41] bg-[#00FF41]/20 text-[#00FF41]"
                              : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mensagem */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-white/70 mb-1.5"
                    >
                      Conte mais sobre seu projeto *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="O que você quer construir? Qual problema quer resolver? Quanto mais contexto, melhor a gente consegue ajudar."
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-[#00FF41]/50 focus:outline-none focus:ring-1 focus:ring-[#00FF41]/30 transition-colors resize-none"
                    />
                  </div>

                  {/* Orçamento */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-3">
                      Orçamento aproximado{" "}
                      <span className="text-white/30 text-xs">(opcional)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgets.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                            budget === b
                              ? "border-[#06B6D4] bg-[#06B6D4]/20 text-[#06B6D4]"
                              : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-[#00FF41] px-6 py-4 text-base font-bold text-[#0F172A] transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? '⏳ Enviando...' : '→ Enviar pro squad'}
                  </button>
                  <p className="text-center text-xs text-white/30">
                    100% gratuito · Sem compromisso · Resposta em menos de 1h
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
