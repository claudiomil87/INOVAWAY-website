"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    title: "Design & Identidade Visual",
    desc: "Sua marca tem que ser bonita, profissional e memorável. A gente cria a identidade completa do seu negócio — do logo às artes das redes sociais — tudo alinhado, tudo com sua cara. Chega de parecer pequeno.",
    deliverables: [
      "Logo profissional (+ variações)",
      "Manual de identidade da sua marca",
      "Artes prontas pra Instagram e Facebook",
      "Materiais de venda (flyer, cartão, banner)",
      "Apresentações e propostas comerciais",
      "Templates editáveis pra você usar sozinho",
    ],
    color: "#EC4899",
    agentName: "Pixel",
    agentEmoji: "🎨",
    image: "/redesign/service-pixel-design.png",
    fallbackAvatar: "/squad/pixel-avatar.webp",
    imageRight: false,
    tag: "Design",
  },
  {
    title: "Sites, Funis de Vendas e CRM",
    desc: "Criamos seu site profissional, funis de vendas que convertem e integramos com nosso CRM próprio (HNBCRM) — gratuito e open source. Seu negócio captando, nutrindo e fechando clientes no piloto automático.",
    deliverables: [
      "Site profissional do zero (ou reformulação do atual)",
      "Funil de vendas completo (captura → nutrição → conversão)",
      "CRM integrado gratuito (HNBCRM — feito pela Inovaway)",
      "Integração com WhatsApp, e-mail e redes sociais",
      "Landing pages pra capturar clientes",
      "Site rápido e que aparece no Google",
      "Aplicativo personalizado pra seu negócio",
      "Manutenção e atualizações inclusas",
    ],
    color: "#06B6D4",
    agentName: "Nova",
    agentEmoji: "💻",
    image: "/redesign/service-nova-dev.png",
    fallbackAvatar: "/squad/nova-avatar.webp",
    imageRight: true,
    tag: "Web Dev",
  },
  {
    title: "Proteção Digital Completa",
    desc: "Um ataque hacker pode destruir anos de trabalho em minutos. A gente protege seu negócio antes que isso aconteça. Monitoramento constante, blindagem total, e você dorme tranquilo sabendo que tudo está seguro.",
    deliverables: [
      "Auditoria completa de segurança do seu site",
      "Certificado de segurança (cadeadinho verde no navegador)",
      "Proteção contra invasões e vírus",
      "Backup automático dos seus dados",
      "Monitoramento 24/7 de ameaças",
      "Relatório mensal de segurança",
      "Resposta rápida em caso de incidente",
    ],
    color: "#EF4444",
    agentName: "Shield",
    agentEmoji: "🛡️",
    image: "/redesign/service-shield-security.png",
    fallbackAvatar: "/squad/shield-avatar.webp",
    imageRight: false,
    tag: "Segurança",
  },
  {
    title: "Marketing que Realmente Vende",
    desc: "Chega de jogar dinheiro fora em anúncio que não traz resultado. A gente cria estratégias de marketing que atraem clientes certos, na hora certa, pelo preço certo. Mais clientes. Mais vendas. Mais crescimento.",
    deliverables: [
      "Estratégia de marketing personalizada pro seu negócio",
      "Criação e gestão de anúncios (Google, Instagram, Facebook)",
      "Conteúdo pra redes sociais (textos + artes + vídeos)",
      "Automação de mensagens e follow-up com clientes",
      "CRM integrado pra acompanhar cada cliente",
      "Relatório de resultados todo mês (em linguagem simples)",
      "SEO: aparecer no Google quando seu cliente te procurar",
      "E-mail marketing e campanhas de promoção",
    ],
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
            O que a gente{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #06B6D4, #8B5CF6)" }}
            >
              entrega pra você
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Serviços de agência grande. Preço que cabe no seu bolso.
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
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center`}
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
                {/* Deliverables list */}
                <ul className="space-y-2 mb-6">
                  {svc.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/50">
                      <span style={{ color: svc.color }} className="mt-0.5 shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
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
