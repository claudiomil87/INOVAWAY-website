"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
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


interface Service {
  id: number;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  agent: { name: string; color: string };
  desc: string;
  quote: string;
  cta: string;
  bullets: string[];
  accentColor: string;
  isNew?: boolean;
  isFree?: boolean;
  newLabel?: string;
  freeLabel?: string;
  ctaHref?: string;
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
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
                {service.newLabel ?? "NEW"}
              </span>
            )}
            {service.isFree && (
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {service.freeLabel ?? "FREE"}
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
  const t = useTranslations('ServicosPage');
  const [bannerError, setBannerError] = useState(false);

  const services = [
    {
      id: 1,
      icon: Globe,
      title: t('services.0.title'),
      subtitle: t('services.0.subtitle'),
      agent: { name: "Nova 💻", color: "#00FF41" },
      desc: t('services.0.desc'),
      quote: t('services.0.quote'),
      cta: t('services.0.cta'),
      bullets: [
        t('services.0.bullets.0'),
        t('services.0.bullets.1'),
        t('services.0.bullets.2'),
        t('services.0.bullets.3'),
        t('services.0.bullets.4'),
        t('services.0.bullets.5'),
      ],
      accentColor: "#00FF41",
    },
    {
      id: 2,
      icon: Bot,
      title: t('services.1.title'),
      subtitle: t('services.1.subtitle'),
      agent: { name: "Forge ⚙️", color: "#00BFFF" },
      desc: t('services.1.desc'),
      quote: t('services.1.quote'),
      cta: t('services.1.cta'),
      bullets: [
        t('services.1.bullets.0'),
        t('services.1.bullets.1'),
        t('services.1.bullets.2'),
        t('services.1.bullets.3'),
        t('services.1.bullets.4'),
        t('services.1.bullets.5'),
      ],
      accentColor: "#00BFFF",
    },
    {
      id: 3,
      icon: Zap,
      title: t('services.2.title'),
      subtitle: t('services.2.subtitle'),
      agent: { name: "Forge ⚙️", color: "#00BFFF" },
      desc: t('services.2.desc'),
      quote: t('services.2.quote'),
      cta: t('services.2.cta'),
      bullets: [
        t('services.2.bullets.0'),
        t('services.2.bullets.1'),
        t('services.2.bullets.2'),
        t('services.2.bullets.3'),
        t('services.2.bullets.4'),
        t('services.2.bullets.5'),
      ],
      accentColor: "#FFD700",
    },
    {
      id: 4,
      icon: Palette,
      title: t('services.3.title'),
      subtitle: t('services.3.subtitle'),
      agent: { name: "Pixel 🎨", color: "#FF6B6B" },
      desc: t('services.3.desc'),
      quote: t('services.3.quote'),
      cta: t('services.3.cta'),
      bullets: [
        t('services.3.bullets.0'),
        t('services.3.bullets.1'),
        t('services.3.bullets.2'),
        t('services.3.bullets.3'),
        t('services.3.bullets.4'),
        t('services.3.bullets.5'),
      ],
      accentColor: "#FF6B6B",
    },
    {
      id: 5,
      icon: TrendingUp,
      title: t('services.4.title'),
      subtitle: t('services.4.subtitle'),
      agent: { name: "Spark 🚀", color: "#FF8C00" },
      desc: t('services.4.desc'),
      quote: t('services.4.quote'),
      cta: t('services.4.cta'),
      bullets: [
        t('services.4.bullets.0'),
        t('services.4.bullets.1'),
        t('services.4.bullets.2'),
        t('services.4.bullets.3'),
        t('services.4.bullets.4'),
        t('services.4.bullets.5'),
      ],
      accentColor: "#FF8C00",
    },
    {
      id: 6,
      icon: Shield,
      title: t('services.5.title'),
      subtitle: t('services.5.subtitle'),
      agent: { name: "Shield 🛡️", color: "#9B59B6" },
      desc: t('services.5.desc'),
      quote: t('services.5.quote'),
      cta: t('services.5.cta'),
      bullets: [
        t('services.5.bullets.0'),
        t('services.5.bullets.1'),
        t('services.5.bullets.2'),
        t('services.5.bullets.3'),
        t('services.5.bullets.4'),
        t('services.5.bullets.5'),
      ],
      accentColor: "#9B59B6",
    },
    {
      id: 7,
      icon: BarChart3,
      title: t('services.6.title'),
      subtitle: t('services.6.subtitle'),
      agent: { name: "Arch 🧠", color: "#00FF41" },
      desc: t('services.6.desc'),
      quote: t('services.6.quote'),
      cta: t('services.6.cta'),
      ctaHref: "https://hnbcrm.com/",
      isNew: true,
      isFree: true,
      newLabel: t('services.6.new'),
      freeLabel: t('services.6.free'),
      bullets: [
        t('services.6.bullets.0'),
        t('services.6.bullets.1'),
        t('services.6.bullets.2'),
        t('services.6.bullets.3'),
        t('services.6.bullets.4'),
        t('services.6.bullets.5'),
      ],
      accentColor: "#00FF41",
    },
  ];

  const socialProof = [
    { icon: Trophy, text: t('socialProof.0') },
    { icon: Star, text: t('socialProof.1') },
    { icon: Globe2, text: t('socialProof.2') },
    { icon: Clock, text: t('socialProof.3') },
  ];

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
              {t('badge')}
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            {t('title')}{" "}
            <span style={{ color: "#00FF41" }}>{t('titleAI')}</span>
            <br />{t('titleSuffix')}
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('subtitle')}
          </motion.p>

          <motion.div variants={fadeUp}>
            <ShimmerButton href="/contato" variant="primary">
              {t('ctaHero')}
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
          {t('gridTitle')}
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
              alt={t('bannerAlt')}
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
            <p className="text-white/50 text-sm mb-6 uppercase tracking-widest font-semibold">{t('teamLabel')}</p>
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
              {t('teamActive')} <span style={{ color: "#00FF41" }}>24/7/365</span> {t('teamActiveSuffix')}
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
            {t('finalTitle')}{" "}
            <span style={{ color: "#00FF41" }}>{t('finalGradient')}</span>
          </h2>
          <p className="text-white/70 text-lg mb-2">
            {t('finalSubtitle')}
          </p>
          <p className="text-white font-bold text-lg mb-8">{t('finalUrgency')}</p>
          <ShimmerButton href="/contato" variant="primary">
            {t('finalCta')}
          </ShimmerButton>
          <p className="mt-6 text-sm text-white/40">
            {t('finalSmall')}
          </p>
        </motion.div>
      </section>
    </main>
  );
}
