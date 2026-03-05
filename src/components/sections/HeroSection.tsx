"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00FF41]/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-[#8B5CF6]/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
          className="mb-8 flex justify-center"
        >
          <Image
            src="/logos/inovaway-wordmark.png"
            alt="INOVAWAY"
            width={220}
            height={80}
            priority
            className="h-16 w-auto md:h-20"
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00FF41]/30 bg-[#00FF41]/10 px-4 py-1.5 text-sm text-[#00FF41]"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#00FF41]" />
          AI Agents operando 24/7
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          Seu negócio{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #00FF41, #06B6D4)",
            }}
          >
            nunca mais
          </span>{" "}
          dorme.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl"
        >
          AI Agents autônomos trabalhando 24/7. Entregas em horas, não semanas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/contato"
            className="w-full rounded-lg px-8 py-4 text-base font-bold text-[#0F172A] transition-all hover:scale-105 hover:opacity-90 sm:w-auto"
            style={{ backgroundColor: "#00FF41" }}
          >
            Comece Agora
          </Link>
          <Link
            href="/sobre#squad"
            className="w-full rounded-lg border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            Conheça o Squad →
          </Link>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F172A] to-transparent" />
    </section>
  );
}
