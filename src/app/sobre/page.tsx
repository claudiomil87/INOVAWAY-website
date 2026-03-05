
import type { Metadata } from "next";
import EliteSquadSection from "@/components/squad/EliteSquadSection";
export const metadata: Metadata = {
  title: "Sobre — INOVAWAY ELITE SQUAD | Conheça nossos AI Agents",
  description:
    "8 AI Agents especializados trabalhando 24/7. Conheça o time que está revolucionando a forma de fazer negócio.",
  openGraph: {
    title: "Sobre — INOVAWAY ELITE SQUAD | Conheça nossos AI Agents",
    description:
      "8 AI Agents especializados trabalhando 24/7. Conheça o time que está revolucionando a forma de fazer negócio.",
    url: "https://inovaway.com/sobre",
  },
};

const values = [
  {
    title: "Inovação",
    desc: "Buscamos constantemente novas tecnologias e abordagens para entregar o melhor.",
    icon: "💡",
  },
  {
    title: "Qualidade",
    desc: "Cada linha de código é revisada. Cada entrega é testada. Sem atalhos.",
    icon: "✅",
  },
  {
    title: "Transparência",
    desc: "Comunicação clara, prazos honestos e updates frequentes.",
    icon: "🤝",
  },
  {
    title: "Impacto",
    desc: "Medimos nosso sucesso pelo sucesso dos nossos clientes.",
    icon: "🚀",
  },
];

export default function SobrePage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Sobre a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple">
              INOVAWAY
            </span>
          </h1>
        </div>

        {/* Mission */}
        <div className="rounded-xl border border-cyan/20 bg-cyan/5 p-8 mb-12">
          <h2 className="text-2xl font-bold text-cyan mb-4">Nossa Missão</h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Democratizar o acesso a tecnologia de ponta para empresas de todos os
            tamanhos. Acreditamos que a transformação digital é para todos — e
            estamos aqui para tornar isso realidade.
          </p>
        </div>

        {/* Story */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Nossa História</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              A INOVAWAY nasceu da convicção de que tecnologia bem aplicada
              transforma negócios. Fundada por profissionais com anos de
              experiência em desenvolvimento de software, startups e consultorias
              internacionais.
            </p>
            <p>
              Nossa equipe combina expertise técnica com visão de produto — o que
              nos permite não apenas construir software, mas construir o software
              certo.
            </p>
            <p>
              De micro-empreendedores a corporações, ajudamos nossos clientes a
              navegar a transformação digital com clareza, agilidade e confiança.
            </p>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="flex gap-4 rounded-xl border border-white/10 bg-navy-light p-6"
              >
                <span className="text-3xl shrink-0">{value.icon}</span>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    {value.title}
                  </h3>
                  <p className="text-sm text-white/60">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 border-t border-white/10" />

        {/* Squad Section */}
        <section id="squad">
          <EliteSquadSection />
        </section>
      </div>
    </div>
  );
}
