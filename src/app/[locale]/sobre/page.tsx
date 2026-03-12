"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
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


export default function SobrePage() {
  const t = useTranslations('SobrePage');
  const [teamImgError, setTeamImgError] = useState(false);

  const values = [
    {
      icon: Target,
      title: t('values.0.title'),
      desc: t('values.0.desc'),
      color: "#00FF41",
    },
    {
      icon: Handshake,
      title: t('values.1.title'),
      desc: t('values.1.desc'),
      color: "#00BFFF",
    },
    {
      icon: Rocket,
      title: t('values.2.title'),
      desc: t('values.2.desc'),
      color: "#FFD700",
    },
    {
      icon: Lightbulb,
      title: t('values.3.title'),
      desc: t('values.3.desc'),
      color: "#FF6B6B",
    },
    {
      icon: Sprout,
      title: t('values.4.title'),
      desc: t('values.4.desc'),
      color: "#9B59B6",
    },
  ];

  const comparison = [
    {
      market: t('comparison.rows.0.market'),
      inovaway: t('comparison.rows.0.inovaway'),
    },
    {
      market: t('comparison.rows.1.market'),
      inovaway: t('comparison.rows.1.inovaway'),
    },
    {
      market: t('comparison.rows.2.market'),
      inovaway: t('comparison.rows.2.inovaway'),
    },
    {
      market: t('comparison.rows.3.market'),
      inovaway: t('comparison.rows.3.inovaway'),
    },
    {
      market: t('comparison.rows.4.market'),
      inovaway: t('comparison.rows.4.inovaway'),
    },
    {
      market: t('comparison.rows.5.market'),
      inovaway: t('comparison.rows.5.inovaway'),
    },
  ];

  const testimonials = [
    { quote: t('testimonials.0.quote'), author: t('testimonials.0.author'), role: t('testimonials.0.role') },
    { quote: t('testimonials.1.quote'), author: t('testimonials.1.author'), role: t('testimonials.1.role') },
    { quote: t('testimonials.2.quote'), author: t('testimonials.2.author'), role: t('testimonials.2.role') },
  ];

  const socialProof = [
    { icon: Briefcase, text: t('socialProof.0') },
    { icon: Globe2, text: t('socialProof.1') },
    { icon: Bot, text: t('socialProof.2') },
    { icon: Stars, text: t('socialProof.3') },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: "#0F172A" }}>
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
              {t('badge')}
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            {t('title')}{" "}
            <span style={{ color: "#00FF41" }}>{t('titleGradient')}</span>
            <br />{t('titleSuffix')}
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('subtitle')}
          </motion.p>

          <motion.div variants={fadeUp}>
            <ShimmerButton href="/contato" variant="primary">
              {t('cta')}
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
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8">{t('history.title')}</h2>

          <div className="space-y-5 text-white/70 leading-relaxed">
            <p>
              {t('history.p1')}
              <span className="text-white font-medium">{t('history.p1Bold')}</span>
            </p>
            <p>
              {t('history.p2')}<strong className="text-[#00FF41]">{t('history.p2Bold')}</strong>{t('history.p2End')}
            </p>
            <p>
              {t('history.p3')}
              <strong className="text-white">{t('history.p3Bold')}</strong>
            </p>
            <p>
              {t('history.p4')}
            </p>
            <p className="text-white font-medium">{t('history.p5')}</p>
            <p>
              {t('history.p6')}
            </p>
            <p>
              {t('history.p7')}
              <strong className="text-[#00FF41]">{t('history.p7Bold')}</strong>
            </p>
            <p className="text-white">
              {t('history.p8')}
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
              <h3 className="text-xl font-black text-white mb-4" style={{ color: "#00FF41" }}>{t('mission.title')}</h3>
              <p className="text-white/70 leading-relaxed italic">
                {t('mission.quote')}
              </p>
              <p className="text-white/60 text-sm mt-4 leading-relaxed">
                {t('mission.desc')}<strong className="text-white">{t('mission.descBold')}</strong>
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
              <h3 className="text-xl font-black mb-4" style={{ color: "#00BFFF" }}>{t('vision.title')}</h3>
              <p className="text-white/70 leading-relaxed italic">
                {t('vision.quote')}
              </p>
              <p className="text-white/60 text-sm mt-4 leading-relaxed">
                {t('vision.desc')}
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
          {t('valuesTitle')}
          <span style={{ color: "#00FF41" }}>{t('valuesSubtitle')}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/50 text-center mb-12"
        >
          {t('valuesDesc')}
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
                  <h3 className="text-white font-black text-base mb-2">{v.title}</h3>
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
            {t('comparison.title')}
            <span style={{ color: "#00FF41" }}>{t('comparison.titleGradient')}</span>
          </h2>
          <p className="text-white/50 text-center mb-12">
            {t('comparison.subtitle')}
          </p>

          <div className="rounded-2xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-2 text-sm font-black uppercase tracking-wider">
              <div className="p-4 text-center bg-white/5 text-white/50">{t('comparison.marketHeader')}</div>
              <div className="p-4 text-center text-center" style={{ background: "#00FF4110", color: "#00FF41" }}>
                {t('comparison.inovawayHeader')}
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
              {t('comparison.footer')}
            </p>
            <p className="text-white/70 text-sm mt-3 leading-relaxed">
              {t('comparison.footer2')}
              <strong className="text-[#00FF41]">{t('comparison.footer2Bold')}</strong>
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
              {t('team.title')}
              <span style={{ color: "#00FF41" }}>{t('team.titleGradient')}</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              {t('team.p1')}
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              {t('team.p2')}
            </p>
            <p className="text-[#00FF41] font-semibold leading-relaxed">
              {t('team.p3')}
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
          {t('testimonials.title')}
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div key={i} variants={fadeUp}>
              <GlowCard glowColor="#00FF41" className="p-6 h-full flex flex-col">
                <Quote size={20} style={{ color: "#00FF41" }} className="mb-4 opacity-60" />
                <p className="text-white/70 text-sm leading-relaxed italic flex-1 mb-4">{testimonial.quote}</p>
                <div>
                  <p className="text-white font-bold text-sm">— {testimonial.author}</p>
                  <p className="text-white/40 text-xs">{testimonial.role}</p>
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
            {t('impactQuote.title')}
            <span style={{ color: "#00FF41" }}>{t('impactQuote.titleGradient')}</span>
            {t('impactQuote.titleEnd')}
          </h2>
          <p className="text-white/60 text-base mt-4 max-w-xl mx-auto">
            {t('impactQuote.desc')}
            <strong className="text-white">{t('impactQuote.descBold')}</strong>
            {t('impactQuote.descEnd')}
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
            {t('finalCta.title')}
            <span style={{ color: "#00FF41" }}>{t('finalCta.titleGradient')}</span>
          </h2>
          <p className="text-white/70 mb-3">
            {t('finalCta.subtitle')}
          </p>
          <p className="text-white/70 mb-3">
            {t('finalCta.subtitle2')}<strong className="text-white">{t('finalCta.subtitle2Bold')}</strong>
          </p>
          <p className="text-white font-bold mb-8">
            {t('finalCta.subtitle3')}<span style={{ color: "#00FF41" }}>{t('finalCta.subtitle3Bold')}</span>{t('finalCta.subtitle3End')}
          </p>
          <ShimmerButton href="/contato" variant="primary">
            {t('finalCta.cta')}
          </ShimmerButton>
          <p className="mt-6 text-sm text-white/40">
            {t('finalCta.small')}
          </p>
        </motion.div>
      </section>
    </main>
  );
}
