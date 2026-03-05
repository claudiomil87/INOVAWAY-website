"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    icon: "🌐",
    title: "Criação de Sites",
    desc: "Sites modernos, rápidos e otimizados para conversão. Mobile-first, performance máxima.",
    color: "#00FF41",
    borderColor: "rgba(0,255,65,0.2)",
    bgColor: "rgba(0,255,65,0.05)",
  },
  {
    icon: "🤖",
    title: "Chatbots IA (UpBro)",
    desc: "Atendimento automatizado 24/7 com IA. Integre com WhatsApp, Instagram e mais.",
    color: "#06B6D4",
    borderColor: "rgba(6,182,212,0.2)",
    bgColor: "rgba(6,182,212,0.05)",
  },
  {
    icon: "⚙️",
    title: "Automações & Integrações",
    desc: "Elimine trabalho manual. Integre sistemas, automatize fluxos e escale sem equipe.",
    color: "#8B5CF6",
    borderColor: "rgba(139,92,246,0.2)",
    bgColor: "rgba(139,92,246,0.05)",
  },
  {
    icon: "🧠",
    title: "Agentes IA Personalizados",
    desc: "AI Agents sob medida para sua operação. Trabalham enquanto você dorme.",
    color: "#00FF41",
    borderColor: "rgba(0,255,65,0.2)",
    bgColor: "rgba(0,255,65,0.05)",
  },
];

export default function ServicesSection() {
  return (
    <section className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Nossos{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
              }}
            >
              Serviços
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Soluções completas para digitalizar, automatizar e escalar seu negócio.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-xl border p-8"
              style={{
                borderColor: svc.borderColor,
                backgroundColor: svc.bgColor,
              }}
            >
              <div className="mb-4 text-5xl">{svc.icon}</div>
              <h3
                className="text-xl font-semibold"
                style={{ color: svc.color }}
              >
                {svc.title}
              </h3>
              <p className="mt-3 leading-relaxed text-white/60">{svc.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link
            href="/servicos"
            className="inline-flex items-center gap-2 text-[#06B6D4] transition-all hover:gap-3 hover:text-[#22D3EE] font-medium"
          >
            Ver todos os serviços →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
