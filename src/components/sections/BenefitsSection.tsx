"use client";

import { motion } from "framer-motion";

const benefits = [
  {
    icon: "⚡",
    title: "Velocidade",
    desc: "Entregas em horas, não semanas",
    color: "#00FF41",
    borderColor: "rgba(0,255,65,0.2)",
    bgColor: "rgba(0,255,65,0.05)",
  },
  {
    icon: "🤖",
    title: "AI Agents",
    desc: "Especialistas autônomos 24/7",
    color: "#06B6D4",
    borderColor: "rgba(6,182,212,0.2)",
    bgColor: "rgba(6,182,212,0.05)",
  },
  {
    icon: "📱",
    title: "Mobile-First",
    desc: "Tudo otimizado para mobile",
    color: "#8B5CF6",
    borderColor: "rgba(139,92,246,0.2)",
    bgColor: "rgba(139,92,246,0.05)",
  },
  {
    icon: "🔒",
    title: "Segurança",
    desc: "Auditoria contínua, zero vulnerabilidade",
    color: "#00FF41",
    borderColor: "rgba(0,255,65,0.2)",
    bgColor: "rgba(0,255,65,0.05)",
  },
  {
    icon: "📊",
    title: "Dados",
    desc: "Decisões baseadas em métricas reais",
    color: "#06B6D4",
    borderColor: "rgba(6,182,212,0.2)",
    bgColor: "rgba(6,182,212,0.05)",
  },
  {
    icon: "🚀",
    title: "Escala",
    desc: "Um agent faz o trabalho de 10 pessoas",
    color: "#8B5CF6",
    borderColor: "rgba(139,92,246,0.2)",
    bgColor: "rgba(139,92,246,0.05)",
  },
];

export default function BenefitsSection() {
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
            O que{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #00FF41, #06B6D4)",
              }}
            >
              fazemos
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Tecnologia de ponta combinada com inteligência artificial para transformar seu negócio.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-xl border p-6"
              style={{
                borderColor: item.borderColor,
                backgroundColor: item.bgColor,
              }}
            >
              <div className="mb-4 text-4xl">{item.icon}</div>
              <h3
                className="text-lg font-semibold"
                style={{ color: item.color }}
              >
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
