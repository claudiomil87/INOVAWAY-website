import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Conheça os serviços da INOVAWAY: desenvolvimento web, mobile, automações e consultoria em tecnologia.",
};

const services = [
  {
    icon: "🌐",
    title: "Desenvolvimento Web",
    desc: "Sites, landing pages e web apps modernos com React, Next.js e performance máxima.",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    icon: "📱",
    title: "Aplicações Mobile",
    desc: "Apps iOS e Android com React Native. UX fluida e integração total com backends.",
    tags: ["React Native", "Expo", "iOS/Android"],
  },
  {
    icon: "🤖",
    title: "Automações & IA",
    desc: "Automatize processos repetitivos e integre inteligência artificial ao seu negócio.",
    tags: ["Python", "OpenAI", "N8N"],
  },
  {
    icon: "🔧",
    title: "Consultoria Técnica",
    desc: "Revisão de arquitetura, code review, performance tuning e planejamento de produto.",
    tags: ["Arquitetura", "DevOps", "Segurança"],
  },
  {
    icon: "☁️",
    title: "Cloud & DevOps",
    desc: "Infraestrutura escalável, CI/CD, containers e monitoramento em cloud.",
    tags: ["Docker", "AWS", "CI/CD"],
  },
  {
    icon: "📊",
    title: "Analytics & Dados",
    desc: "Dashboards, pipelines de dados e insights que apoiam decisões estratégicas.",
    tags: ["PostgreSQL", "Grafana", "ETL"],
  },
];

export default function ServicosPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Nossos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple">
              Serviços
            </span>
          </h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            Do desenvolvimento à entrega — soluções completas para transformar
            seu negócio com tecnologia.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border border-white/10 bg-navy-light p-6 transition-all hover:border-cyan/30 hover:-translate-y-1"
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                {service.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cyan/20 bg-cyan/10 px-3 py-0.5 text-xs text-cyan"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
