"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const squad = [
  {
    name: "Arch",
    emoji: "🧠",
    role: "Orquestrador & Arquiteto",
    catchPhrase: "Estratégia e visão de sistema",
    avatar: "/squad/arch-avatar.webp",
    color: "#06B6D4",
  },
  {
    name: "Pixel",
    emoji: "🎨",
    role: "Diretor Criativo & Designer",
    catchPhrase: "Beleza que converte",
    avatar: "/squad/pixel-avatar.webp",
    color: "#8B5CF6",
  },
  {
    name: "Nova",
    emoji: "💻",
    role: "Engenheira Frontend",
    catchPhrase: "Interfaces rápidas e acessíveis",
    avatar: "/squad/nova-avatar.webp",
    color: "#00FF41",
  },
  {
    name: "Forge",
    emoji: "⚙️",
    role: "Backend & DevOps",
    catchPhrase: "Infraestrutura sólida como rocha",
    avatar: "/squad/forge-avatar.webp",
    color: "#06B6D4",
  },
  {
    name: "Scout",
    emoji: "🔍",
    role: "Analista de Pesquisa",
    catchPhrase: "Dados que iluminam decisões",
    avatar: "/squad/scout-avatar.webp",
    color: "#8B5CF6",
  },
  {
    name: "Shield",
    emoji: "🛡️",
    role: "Segurança & Testes",
    catchPhrase: "Zero falhas em produção",
    avatar: "/squad/shield-avatar.webp",
    color: "#00FF41",
  },
  {
    name: "Lens",
    emoji: "🔬",
    role: "QA Frontend",
    catchPhrase: "Qualidade que o usuário sente",
    avatar: "/squad/lens-avatar.webp",
    color: "#06B6D4",
  },
  {
    name: "Spark",
    emoji: "🚀",
    role: "Marketing & Crescimento",
    catchPhrase: "Mais leads, menos esforço",
    avatar: "/squad/spark-avatar.webp",
    color: "#8B5CF6",
  },
  {
    name: "Flux",
    emoji: "🎬",
    role: "Motion Designer & Vídeos",
    catchPhrase: "Movimento que prende atenção",
    avatar: "/squad/flux-avatar.webp",
    color: "#FF6B6B",
  },
];

export default function SquadSection() {
  return (
    <section className="px-4 py-20 md:py-32" style={{ backgroundColor: "rgba(30,41,59,0.3)" }}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00FF41]/30 bg-[#00FF41]/10 px-4 py-1.5 text-sm text-[#00FF41]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00FF41]" />
            Sempre online
          </div>
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            INOVAWAY{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #00FF41, #8B5CF6)",
              }}
            >
              Elite Squad
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            9 AI Agents especializados trabalhando em sinergia. Cada um um expert na sua área.
          </p>
        </motion.div>

        {/* Squad grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {squad.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/20 hover:bg-white/10
                flex flex-row items-center gap-4
                sm:flex-col sm:items-center sm:text-center"
            >
              {/* Avatar */}
              <div
                className="relative shrink-0 h-16 w-16 sm:h-20 sm:w-20 sm:mb-3 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-[#0F172A]"
                style={{ ringColor: agent.color } as React.CSSProperties}
              >
                <Image
                  src={agent.avatar}
                  alt={`${agent.name} avatar`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 64px, 80px"
                />
              </div>

              {/* Text content */}
              <div className="flex flex-col sm:items-center">
                {/* Name */}
                <span className="font-semibold text-white">
                  {agent.emoji} {agent.name}
                </span>

                {/* Role */}
                <span className="mt-0.5 text-xs leading-tight text-white/50">
                  {agent.role}
                </span>

                {/* Catch phrase — visible on mobile too */}
                <span className="mt-1.5 text-xs leading-tight text-white/35 italic">
                  {agent.catchPhrase}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Link
            href="/sobre#squad"
            className="inline-flex items-center gap-2 font-medium text-[#00FF41] transition-all hover:gap-3 hover:opacity-80"
          >
            Conheça o time completo →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
