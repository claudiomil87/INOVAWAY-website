"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Lock, Zap, Trophy } from "lucide-react";
import ShimmerButton from "@/components/ui/ShimmerButton";
import MagneticButton from "@/components/ui/MagneticButton";

const squadAvatars = [
  { src: "/squad/arch-avatar.webp", color: "#8B5CF6", name: "Arch" },
  { src: "/squad/pixel-avatar.webp", color: "#EC4899", name: "Pixel" },
  { src: "/squad/nova-avatar.webp", color: "#06B6D4", name: "Nova" },
  { src: "/squad/forge-avatar.webp", color: "#F59E0B", name: "Forge" },
  { src: "/squad/scout-avatar.webp", color: "#10B981", name: "Scout" },
];

const trustItems = [
  { icon: Lock, label: "100% grátis, sem cartão de crédito" },
  { icon: Zap, label: "Resposta em até 2 horas úteis" },
  { icon: Trophy, label: "+200 empresas atendidas" },
];

export default function CTASection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:py-32">
      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="aurora-blob-1 absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(0,255,65,0.08) 0%, transparent 70%)" }}
        />
        <div
          className="aurora-blob-2 absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)" }}
        />
      </div>

      {/* Top divider gradient */}
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{ backgroundImage: "linear-gradient(90deg, transparent, #00FF41, #06B6D4, transparent)" }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Squad avatars row */}
          <div className="mb-8 flex items-center justify-center">
            <div className="flex -space-x-3">
              {squadAvatars.map((av, i) => (
                <motion.div
                  key={av.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#0F172A]"
                  style={{ boxShadow: `0 0 12px ${av.color}50` }}
                >
                  <Image src={av.src} alt={av.name} fill className="object-cover" sizes="48px" loading="lazy" />
                </motion.div>
              ))}
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0F172A] bg-[#1E293B] text-xs font-bold text-white/60">
                +4
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white md:text-5xl lg:text-6xl">
            Seu concorrente já começou.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #00FF41, #8B5CF6)" }}
            >
              E você?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Diagnóstico gratuito do seu negócio digital.
            Sem compromisso. Sem enrolação.{" "}
            <span className="text-white font-medium">Só 10 vagas disponíveis este mês</span>{" "}
            — e já foram metade.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton>
              <ShimmerButton href="/contato" variant="primary">
                Quero minha vaga grátis →
              </ShimmerButton>
            </MagneticButton>
            <ShimmerButton href="#squad" variant="secondary">
              Conhecer o Squad →
            </ShimmerButton>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <span key={item.label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0" style={{ color: "#00FF41" }} />
                  {item.label}
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
