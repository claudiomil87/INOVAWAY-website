"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Lock, Zap, Gift } from "lucide-react";



function ResponseTimer({ label, unit, active }: { label: string; unit: string; active: string }) {
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
      <p className="text-xs text-white/60 mb-1">{label}</p>
      <div
        className="text-3xl font-bold transition-all duration-400"
        style={{
          color: "#00FF41",
          opacity: fade ? 1 : 0,
          transform: fade ? "translateY(0)" : "translateY(-4px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        {display} {unit}
      </div>
      <p className="text-xs text-white/60 mt-1">
        {active}
      </p>
    </div>
  );
}

export default function ContatoPage() {
  const t = useTranslations('ContatoPage');
  const locale = useLocale();
  const [selectedNeed, setSelectedNeed] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const needOptions = [
    t('needs.0'),
    t('needs.1'),
    t('needs.2'),
    t('needs.3'),
    t('needs.4'),
    t('needs.5'),
    t('needs.6'),
  ];

  const trustItems = [
    { icon: Lock, label: t('trust.0') },
    { icon: Zap, label: t('trust.1') },
    { icon: Gift, label: t('trust.2') },
  ];

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
        alert(t('errors.send'));
      }
    } catch {
      alert(t('errors.connection'));
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
              {t('title')}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] to-[#06B6D4]">
                {t('titleGradient')}
              </span>
            </h1>
            <p className="text-sm text-white/50">
              {t('subtitleMobile')}
            </p>
          </div>

          {submitted ? (
            <SuccessMessage t={t} />
          ) : (
            <ContactForm
              selectedNeed={selectedNeed}
              setSelectedNeed={setSelectedNeed}
              loading={loading}
              onSubmit={handleSubmit}
              t={t}
              needOptions={needOptions}
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
              {t('badge')}
            </p>
            <h1 className="text-5xl font-bold text-white lg:text-6xl mb-4">
              {t('title')}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] to-[#06B6D4]">
                {t('titleGradient')}
              </span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              {t('subtitle')}
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
                  <p className="text-white font-semibold text-lg mb-1">{t('sparkTitle')}</p>
                  <p className="text-white/60 text-sm leading-relaxed italic">
                    {t('sparkQuote')}
                  </p>
                </div>

                <ResponseTimer
                  label={t('responseTimer.label')}
                  unit={t('responseTimer.unit')}
                  active={t('responseTimer.active')}
                />

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
                  <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t('whatsapp')}
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
                <SuccessMessage t={t} />
              ) : (
                <ContactForm
                  selectedNeed={selectedNeed}
                  setSelectedNeed={setSelectedNeed}
                  loading={loading}
                  onSubmit={handleSubmit}
                  t={t}
                  needOptions={needOptions}
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
  t,
  needOptions,
}: {
  selectedNeed: string;
  setSelectedNeed: (v: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  t: (key: string) => string;
  needOptions: string[];
}) {
  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-[#00FF41]/50 focus:outline-none focus:ring-1 focus:ring-[#00FF41]/30 transition-colors text-sm";
  const labelClass = "block text-sm font-medium text-white/70 mb-1.5";

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1E293B] p-6 md:p-8">
      <h2 className="text-lg font-semibold text-white mb-6">
        {t('form.title')}
      </h2>
      <form onSubmit={onSubmit} className="space-y-5">
        {/* Nome + Email */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              {t('form.nameLbl')}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder={t('form.namePh')}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              {t('form.emailLbl')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder={t('form.emailPh')}
              className={inputClass}
            />
          </div>
        </div>

        {/* WhatsApp + Empresa */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className={labelClass}>
              {t('form.phoneLbl')}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder={t('form.phonePh')}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="company" className={labelClass}>
              {t('form.companyLbl')}
            </label>
            <input
              id="company"
              name="company"
              type="text"
              required
              placeholder={t('form.companyPh')}
              className={inputClass}
            />
          </div>
        </div>

        {/* Segmento + Site */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="segment" className={labelClass}>
              {t('form.segmentLbl')}
            </label>
            <input
              id="segment"
              name="segment"
              type="text"
              placeholder={t('form.segmentPh')}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="website" className={labelClass}>
              {t('form.websiteLbl')}
            </label>
            <input
              id="website"
              name="website"
              type="text"
              placeholder={t('form.websitePh')}
              className={inputClass}
            />
          </div>
        </div>

        {/* O que mais precisa */}
        <div>
          <label className={labelClass}>{t('form.needLbl')}</label>
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
            {t('form.messageLbl')}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder={t('form.messagePh')}
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
          {loading ? t('form.submitting') : t('form.submit')}
        </button>

        <div className="flex flex-wrap justify-center gap-4 pt-1">
          {[
            { icon: "🔒", text: t('form.trustBadges.secure') },
            { icon: "⚡", text: t('form.trustBadges.fast') },
            { icon: "🆓", text: t('form.trustBadges.free') },
          ].map((badge) => (
            <span key={badge.text} className="flex items-center gap-1 text-xs text-white/60">
              <span>{badge.icon}</span> {badge.text}
            </span>
          ))}
        </div>
      </form>
    </div>
  );
}

function SuccessMessage({ t }: { t: (key: string) => string }) {
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
          {t('success.title')}
        </h2>
        <p className="text-white/60 max-w-md mx-auto mb-4 leading-relaxed">
          {t('success.subtitle')}
        </p>
        <p className="text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
          {t('success.body').replace('{hours}', t('success.hours'))}
        </p>
        <p className="text-white/60 text-sm mb-8">
          {t('success.afterText')}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/produtos"
            className="rounded-lg bg-[#00FF41] px-6 py-3 text-sm font-bold text-[#0F172A] transition-opacity hover:opacity-90"
          >
            {t('success.ctaTeam')}
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white hover:border-white/40 transition-colors"
          >
            {t('success.ctaHome')}
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}