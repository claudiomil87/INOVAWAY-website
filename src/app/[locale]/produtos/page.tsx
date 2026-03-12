"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
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




export default function ProdutosPage() {
  const t = useTranslations('ProdutosPage');
  const [upbroImgError, setUpbroImgError] = useState(false);
  const [hnbcrmImgError, setHnbcrmImgError] = useState(false);

  const upbroFeatures = [
    { icon: MessageSquare, title: t('upbro.features.0.title'), desc: t('upbro.features.0.desc'), color: "#00FF41" },
    { icon: Brain, title: t('upbro.features.1.title'), desc: t('upbro.features.1.desc'), color: "#00BFFF" },
    { icon: Target, title: t('upbro.features.2.title'), desc: t('upbro.features.2.desc'), color: "#FFD700" },
    { icon: Calendar, title: t('upbro.features.3.title'), desc: t('upbro.features.3.desc'), color: "#FF6B6B" },
    { icon: Link2, title: t('upbro.features.4.title'), desc: t('upbro.features.4.desc'), color: "#9B59B6" },
    { icon: BarChart2, title: t('upbro.features.5.title'), desc: t('upbro.features.5.desc'), color: "#FF8C00" },
  ];

  const hnbcrmFeatures = [
    { icon: LayoutDashboard, title: t('hnbcrm.features.0.title'), desc: t('hnbcrm.features.0.desc'), color: "#00FF41" },
    { icon: Users, title: t('hnbcrm.features.1.title'), desc: t('hnbcrm.features.1.desc'), color: "#00BFFF" },
    { icon: MessageSquare, title: t('hnbcrm.features.2.title'), desc: t('hnbcrm.features.2.desc'), color: "#FFD700" },
    { icon: Brain, title: t('hnbcrm.features.3.title'), desc: t('hnbcrm.features.3.desc'), color: "#FF6B6B" },
    { icon: Lock, title: t('hnbcrm.features.4.title'), desc: t('hnbcrm.features.4.desc'), color: "#9B59B6" },
    { icon: Download, title: t('hnbcrm.features.5.title'), desc: t('hnbcrm.features.5.desc'), color: "#FF8C00" },
  ];

  const gmbFeatures = [
    { icon: MapPin, text: t('gmb.features.0') },
    { icon: Star, text: t('gmb.features.1') },
    { icon: RefreshCw, text: t('gmb.features.2') },
    { icon: BarChart2, text: t('gmb.features.3') },
    { icon: Target, text: t('gmb.features.4') },
    { icon: Brain, text: t('gmb.features.5') },
  ];

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
              {t('badge')}
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            {t('title')} <span style={{ color: "#00FF41" }}>{t('titleGradient')}</span>
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

        {/* Social proof */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative mt-14 flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
        >
          {[
          { icon: Rocket, text: t('socialProof.0') },
          { icon: BarChart2, text: t('socialProof.1') },
          { icon: Globe2, text: t('socialProof.2') },
          { icon: Flame, text: t('socialProof.3') },
        ].map((item, i) => {
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
                {t('upbro.heading')}{" "}
                <span style={{ color: "#00FF41" }}>{t('upbro.headingGradient')}</span>
              </h2>
            </div>

            <p className="text-white/70 leading-relaxed mb-4">
              {t('upbro.desc1')}
            </p>
            <p className="text-white/70 leading-relaxed mb-6">
              {t('upbro.desc2')}{" "}
              <strong className="text-white">{t('upbro.desc2bold')}</strong>
            </p>

            <p className="text-[#00FF41] font-semibold mb-8">
              {t('upbro.desc3')}
            </p>

            <ShimmerButton href="/contato" variant="primary">
              {t('upbro.cta')}
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
                  alt="UpBro — AI Chatbot"
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
                <p className="text-white/50 mt-2">{t('upbro.headingGradient')}</p>
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
                  alt="HNBCRM — Free CRM"
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
                <p className="text-white/50 mt-2">{t('hnbcrm.freeBadge')} · {t('hnbcrm.openSourceBadge')}</p>
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
                {t('hnbcrm.freeBadge')}
              </span>
              <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 uppercase tracking-wider">
                {t('hnbcrm.openSourceBadge')}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📊</span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                {t('hnbcrm.heading')}{" "}
                <span style={{ color: "#00FF41" }}>{t('hnbcrm.headingGradient')}</span>
              </h2>
            </div>

            <p className="text-white/70 leading-relaxed mb-4">
              {t('hnbcrm.desc1')}<strong className="text-white">{t('hnbcrm.desc1bold')}</strong>
            </p>

            <p className="text-white/70 leading-relaxed mb-4">
              {t('hnbcrm.desc2')}
            </p>

            <div className="p-4 rounded-xl border border-[#00FF41]/20 bg-[#00FF41]/5 mb-8">
              <p className="text-[#00FF41] font-bold text-xl">{t('hnbcrm.priceLine')}</p>
              <p className="text-white/60 text-sm">{t('hnbcrm.priceSubline')}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://hnbcrm.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all hover:scale-[1.02]"
                style={{ background: "#00FF41", color: "#0F172A" }}
              >
                {t('hnbcrm.ctaFree')} <ArrowRight size={16} />
              </a>
              <a
                href="https://github.com/ericmil87/hnbcrm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm border border-white/20 text-white hover:border-white/40 transition-all hover:scale-[1.02]"
              >
                <Github size={16} /> {t('hnbcrm.ctaGithub')}
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
              {t('gmb.heading')}{" "}
              <span style={{ color: "#00FF41" }}>{t('gmb.headingGradient')}</span>
            </h2>
          </div>

          <p className="text-white/70 mb-3 leading-relaxed">
            {t('gmb.desc1')}<strong className="text-white">{t('gmb.desc1bold')}</strong>
          </p>

          <p className="text-[#00FF41] font-semibold mb-8">
            {t('gmb.desc2')}
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
            {t('gmb.desc3')}
          </p>

          <ShimmerButton href="/contato" variant="primary">
            {t('gmb.cta')}
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
            {t('finalCta.heading')}{" "}
            <span style={{ color: "#00FF41" }}>{t('finalCta.headingGradient')}</span>
            <br />{t('finalCta.headingSuffix')}
          </h2>
          <p className="text-white/70 mb-3">
            {t('finalCta.desc1')}
          </p>
          <p className="text-white font-bold mb-8">
            {t('finalCta.desc2')}
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
