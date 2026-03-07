"use client";

import { motion } from "framer-motion";
import { Zap, Bot, ShieldCheck, TrendingUp } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";

const benefits = [
  {
    icon: Zap,
    title: "Rápido como você nunca viu",
    desc: "Enquanto agências tradicionais ficam semanas em reunião, a gente já entregou. Nosso time de IA não procrastina, não fica doente e não tira férias. Do briefing à entrega: velocidade que faz diferença pra quem precisa vender.",
    color: "#00FF41",
  },
  {
    icon: Bot,
    title: "Trabalhando enquanto você descansa",
    desc: "Às 3 da manhã, quando você está dormindo, o seu negócio continua funcionando, respondendo, vendendo. Automatizamos as tarefas chatas pra você focar no que importa: crescer.",
    color: "#06B6D4",
  },
  {
    icon: ShieldCheck,
    title: "Seu negócio protegido. Sempre.",
    desc: "Hackers não avisam antes de atacar. A gente monitora tudo, o tempo todo. Seu site, seus dados, sua reputação online — tudo sob vigilância 24 horas. Você dorme tranquilo. Nós cuidamos do resto.",
    color: "#8B5CF6",
  },
  {
    icon: TrendingUp,
    title: "Resultado, não promessa",
    desc: "Menos papo, mais entrega. A gente não vende sonho, a gente entrega resultado: mais visibilidade, mais clientes, mais vendas. Simples assim. Você foca no negócio. A gente faz a mágica acontecer.",
    color: "#00FF41",
  },
];

export default function BenefitsSection() {
  return (
    <section className="px-4 py-16 md:py-24">
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
            Por que empresas escolhem a{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #00FF41, #06B6D4)" }}
            >
              Inovaway?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Porque resultado não espera. E seu concorrente também não.
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
