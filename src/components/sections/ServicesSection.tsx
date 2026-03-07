"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Service definitions with agent avatars
const services = [
  {
    title: "Design & Branding",
    desc: "Identidade visual que encanta e converte. Logos, UI/UX, brand guidelines — tudo criado com IA e refinado com olhar humano.",
    color: "#EC4899",
    agentName: "Pixel",
    agentEmoji: "🎨",
    image: "/redesign/service-pixel-design.png",
    fallbackAvatar: "/squad/pixel-avatar.webp",
    imageRight: false,
    tag: "Design",
  },
  {
    title: "Desenvolvimento Web",
    desc: "Sites e apps modernos, rápidos e acessíveis. Next.js, TypeScript, Tailwind — entregues em horas com performance máxima.",
    color: "#06B6D4",
    agentName: "Nova",
    agentEmoji: "💻",
    image: "/redesign/service-nova-dev.png",
    fallbackAvatar: "/squad/nova-avatar.webp",
    imageRight: true,
    tag: "Web Dev",
  },
  {
    title: "Segurança Digital",
    desc: "Pen test, auditoria OWASP e hardening de infra. Seu produto seguro antes de chegar aos usuários.",
    color: "#EF4444",
    agentName: "Shield",
    agentEmoji: "🛡️",
    image: "/redesign/service-shield-security.png",
    fallbackAvatar: "/squad/shield-avatar.webp",
    imageRight: false,
    tag: "Security",
  },
  {
    title: "Marketing Digital",
    desc: "Growth hacking, SEO, anúncios e conteúdo viral. Mais leads, menos esforço — Spark cuida do seu crescimento.",
    color: "#F97316",
    agentName: "Spark",
    agentEmoji: "🚀",
    image: "/redesign/service-spark-marketing.png",
    fallbackAvatar: "/squad/spark-avatar.webp",
    imageRight: true,
    tag: "Marketing",
  },
];

export default function ServicesSection() {
  return (
    <section className="px-4 py-16 md:py-24">
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
              style={{ backgroundImage: "linear-gradient(135deg, #06B6D4, #8B5CF6)" }}
            >
              Serviços
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Soluções completas para digitalizar, automatizar e escalar seu negócio.
          </p>
        </motion.div>

        {/* Alternating feature rows */}
        <div className="flex flex-col gap-16">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${svc.imageRight ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Text — alternates side */}
              <div className={svc.imageRight ? "lg:order-1" : "lg:order-2"}>
                <span
                  className="inline-block mb-4 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: `${svc.color}20`, color: svc.color, border: `1px solid ${svc.color}40` }}
                >
                  {svc.agentEmoji} {svc.tag}
                </span>
                <h3 className="text-2xl font-bold text-white mb-4 md:text-3xl">{svc.title}</h3>
                <p className="text-white/60 leading-relaxed mb-6">{svc.desc}</p>
                <div className="flex items-center gap-3">
                  <div
                    className="relative h-10 w-10 overflow-hidden rounded-full"
                    style={{ boxShadow: `0 0 12px ${svc.color}60` }}
                  >
                    <Image
                      src={svc.fallbackAvatar}
                      alt={svc.agentName}
                      fill
                      className="object-cover"
                      sizes="40px"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{svc.agentEmoji} {svc.agentName}</p>
                    <p className="text-xs text-white/40">Responsável pelo serviço</p>
                  </div>
                </div>
              </div>

              {/* Image card */}
              <div className={svc.imageRight ? "lg:order-2" : "lg:order-1"}>
                <motion.div
                  whileHover={{ scale: 1.02, boxShadow: `0 20px 60px ${svc.color}20` }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl overflow-hidden border"
                  style={{
                    borderColor: `${svc.color}30`,
                    background: `linear-gradient(135deg, ${svc.color}08 0%, rgba(30,41,59,0.8) 100%)`,
                    minHeight: "260px",
                  }}
                >
                  {/* Try redesign image, fall back to avatar */}
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    width={560}
                    height={360}
                    className="w-full h-full object-cover"
                    style={{ mixBlendMode: "screen" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = svc.fallbackAvatar;
                      (e.target as HTMLImageElement).style.mixBlendMode = "normal";
                      (e.target as HTMLImageElement).className = "w-40 h-40 object-cover rounded-full mx-auto my-8";
                    }}
                    loading="lazy"
                  />
                  {/* Gradient border effect */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1px ${svc.color}20` }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <Link
            href="/servicos"
            className="inline-flex items-center gap-2 font-medium text-[#06B6D4] transition-all hover:gap-3 hover:text-[#22D3EE]"
          >
            Ver todos os serviços →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
