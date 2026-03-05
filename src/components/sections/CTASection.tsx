"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00FF41]/5 blur-3xl" />
        <div className="absolute left-1/3 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B5CF6]/5 blur-3xl" />
      </div>

      {/* Border gradient top */}
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, #00FF41, #06B6D4, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-white md:text-5xl lg:text-6xl">
            Pronto para{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #00FF41, #06B6D4)",
              }}
            >
              inovar?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Fale com nosso time e descubra como AI Agents podem transformar seu negócio.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contato"
              className="group relative w-full overflow-hidden rounded-lg px-10 py-4 text-base font-bold text-[#0F172A] transition-all hover:scale-105 sm:w-auto"
              style={{ backgroundColor: "#00FF41" }}
            >
              <span className="relative z-10">Falar com a INOVAWAY</span>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
            <span className="flex items-center gap-2">
              <span style={{ color: "#00FF41" }}>✓</span> Resposta em minutos
            </span>
            <span className="flex items-center gap-2">
              <span style={{ color: "#00FF41" }}>✓</span> Orçamento gratuito
            </span>
            <span className="flex items-center gap-2">
              <span style={{ color: "#00FF41" }}>✓</span> Sem compromisso
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
