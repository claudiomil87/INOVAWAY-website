"use client";

import { motion } from "framer-motion";
import { Zap, Bot, ShieldCheck, TrendingUp } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";

const benefits = [
  {
    icon: Zap,
    title: "Velocidade",
    desc: "Sites e automações entregues em horas, não semanas",
    color: "#00FF41",
  },
  {
    icon: Bot,
    title: "IA 24/7",
    desc: "Agents trabalhando enquanto você dorme",
    color: "#06B6D4",
  },
  {
    icon: ShieldCheck,
    title: "Segurança",
    desc: "Testes de segurança em cada entrega",
    color: "#8B5CF6",
  },
  {
    icon: TrendingUp,
    title: "Resultados",
    desc: "Foco em ROI e crescimento real",
    color: "#00FF41",
  },
];

export default function BenefitsSection() {
  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Por que{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #00FF41, #06B6D4)" }}
            >
              INOVAWAY?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Tecnologia de ponta com inteligência artificial para transformar seu negócio.
          </p>
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {benefits.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlowCard glowColor={item.color} className="p-7 h-full">
                  <div
                    className="mb-4 inline-flex items-center justify-center rounded-xl p-3"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{item.desc}</p>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
