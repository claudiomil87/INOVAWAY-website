"use client";
import { motion } from "framer-motion";

export default function SquadHero() {
  return (
    <section className="relative overflow-hidden py-24 px-4 text-center">
      {/* Animated grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: ` linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px) `, backgroundSize: "60px 60px", }} />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00FF41]/30 bg-[#00FF41]/10 px-4 py-1.5 text-sm text-[#00FF41]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00FF41]" />
          </span>
          8 Agents Online — 24/7
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl mb-6"
        >
          INOVAWAY{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #00FF41, #06B6D4, #8B5CF6)" }}>
            ELITE SQUAD
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-white/60 sm:text-xl max-w-xl mx-auto"
        >
          8 AI Agents especializados. Trabalhando 24/7. Sem descanso, sem desculpas.
        </motion.p>
      </div>
    </section>
  );
}