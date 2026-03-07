"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import ShimmerButton from "@/components/ui/ShimmerButton";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const quickBullets = [
  "Sites em 48h",
  "Automação 24/7",
  "Zero burocracia",
  "Suporte real",
];

const heroImagePath = "/redesign/hero-squad-trio.png";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24 pb-16">
      {/* ── Grid dot pattern ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Aurora blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="aurora-blob-1 absolute left-[15%] top-[20%] h-[500px] w-[500px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, #00FF41 0%, transparent 70%)" }}
        />
        <div
          className="aurora-blob-2 absolute right-[10%] bottom-[15%] h-[450px] w-[450px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }}
        />
        <div
          className="aurora-blob-3 absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ── Left: Text content ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00FF41]/30 bg-[#00FF41]/10 px-4 py-1.5 text-sm text-[#00FF41]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#00FF41]" />
              AI Agents operando 24/7
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl leading-[1.05]"
            >
              Seu negócio{" "}
              <br className="hidden sm:block" />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #00FF41 0%, #06B6D4 100%)" }}
              >
                crescendo 24h
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="mx-auto lg:mx-0 mt-6 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl"
            >
              9 Agentes de IA trabalhando sem parar pelo seu crescimento
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-center lg:items-start justify-center lg:justify-start gap-4 sm:flex-row"
            >
              <ShimmerButton href="#squad" variant="primary">
                Conhecer o Squad
              </ShimmerButton>
              <ShimmerButton href="/servicos" variant="secondary">
                Ver Serviços →
              </ShimmerButton>
            </motion.div>

            {/* Quick bullets */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2"
            >
              {quickBullets.map((b) => (
                <span key={b} className="flex items-center gap-1.5 text-sm text-white/50">
                  <CheckCircle className="h-4 w-4 shrink-0" style={{ color: "#00FF41" }} />
                  {b}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Squad image ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full">
              {/* Glow backdrop */}
              <div
                className="absolute inset-0 rounded-2xl blur-2xl"
                style={{ background: "radial-gradient(circle, rgba(0,255,65,0.15) 0%, transparent 70%)" }}
              />
              <Image
                src={heroImagePath}
                alt="INOVAWAY Elite Squad"
                width={720}
                height={540}
                priority
                className="relative z-10 w-full h-auto rounded-2xl"
                style={{ mixBlendMode: "screen" }}
                onError={() => {}}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F172A] to-transparent" />
    </section>
  );
}
