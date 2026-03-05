"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import EliteSquadSection from "@/components/squad/EliteSquadSection";

const values = [
  {
    icon: "⚡",
    title: "Velocidade",
    desc: "Entregamos rápido porque temos processos sólidos, não porque pulamos etapas. Velocidade sem descuido.",
  },
  {
    icon: "🧠",
    title: "Inteligência",
    desc: "Toda decisão começa com pesquisa. Scout pesquisa, Arch decide, squad executa. Dados antes de achismos.",
  },
  {
    icon: "📈",
    title: "Escala",
    desc: "Construímos pra funcionar em produção, não só pra demo. Sistemas que crescem com você.",
  },
  {
    icon: "🤝",
    title: "Transparência",
    desc: "Você sabe o que está sendo feito, por quem e pra quê. Sem caixa preta. Sempre.",
  },
  {
    icon: "🤖",
    title: "Autonomia",
    desc: "Nosso squad opera enquanto você dorme. IA no core, não no marketing. Resultado sem depender de você.",
  },
  {
    icon: "🔮",
    title: "Tech-First",
    desc: "Se tem uma forma mais inteligente de fazer, a gente encontra. Legado é inimigo do progresso.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function SobrePage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="mx-auto max-w-5xl">

        {/* Hero */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#00FF41] text-sm font-mono tracking-widest uppercase mb-4">
            // sobre a inovaway
          </p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
            Não somos uma agência.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6]">
              Somos um movimento.
            </span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            A INOVAWAY nasceu da crença de que tecnologia de ponta não deveria
            ser privilégio de grandes empresas. Qualquer negócio — do micro ao
            médio — merece infra, IA e estratégia de nível enterprise.
          </p>
        </motion.div>

        {/* História */}
        <motion.section
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="rounded-2xl border border-white/10 bg-[#1E293B] p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Nossa{" "}
              <span className="text-[#06B6D4]">História</span>
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Era 2023. O mercado virou de cabeça pra baixo com a explosão da
                IA. Ferramentas que antes custavam uma fortuna ficaram
                acessíveis. Modelos de linguagem que pareciam ficção científica
                viraram API pública.
              </p>
              <p>
                A questão era: quem ia aproveitar isso?
              </p>
              <p>
                Grandes empresas se movem devagar. Agências tradicionais
                resistem à mudança. E os pequenos negócios — os mais ágeis de
                todos — ficaram sem orientação.
              </p>
              <p>
                A INOVAWAY nasceu pra preencher esse espaço. Não como uma
                agência que terceiriza trabalho, cobra por hora e entrega
                apresentação de PowerPoint. Mas como um squad de specialists
                operados por IA, trabalhando 24/7, entregando resultado real.
              </p>
              <p>
                Hoje, a INOVAWAY é um movimento: empreendedores tech que surfam
                na crista da onda da inovação, pessoas e máquinas trabalhando
                juntas pra fazer crescer quem tem coragem de inovar.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Missão & Visão */}
        <motion.section
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <motion.div
              variants={fadeInUp}
              className="rounded-xl border border-[#00FF41]/20 bg-[#00FF41]/5 p-8"
            >
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-[#00FF41] mb-3">Missão</h3>
              <p className="text-white/70 leading-relaxed">
                Produzir valor 24/7 para empresas através de AI agents
                autônomos. Democratizar o acesso à tecnologia de ponta —
                entregando IA, automação e estratégia com a velocidade e
                qualidade que o mercado nunca viu.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="rounded-xl border border-[#06B6D4]/20 bg-[#06B6D4]/5 p-8"
            >
              <div className="text-3xl mb-4">🔭</div>
              <h3 className="text-xl font-bold text-[#06B6D4] mb-3">Visão</h3>
              <p className="text-white/70 leading-relaxed">
                Ser a agência de tecnologia mais eficiente do mercado. O squad
                tech mais ágil da América Latina — onde qualquer empreendedor
                pode ativar um time de especialistas com IA e crescer sem
                precisar de uma grande empresa por trás.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Valores */}
        <motion.section
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeInUp} className="mb-10">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Nossos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] to-[#06B6D4]">
                Valores
              </span>
            </h2>
            <p className="mt-2 text-white/50">
              Os princípios que guiam cada decisão do squad.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                className="flex gap-4 rounded-xl border border-white/10 bg-[#1E293B] p-6 hover:border-[#00FF41]/20 transition-colors"
              >
                <span className="text-3xl shrink-0">{value.icon}</span>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    {value.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Por que somos diferentes */}
        <motion.section
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="rounded-2xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-white mb-2">
              Não é sobre o que fazemos.
            </h2>
            <p className="text-[#8B5CF6] font-medium mb-8">
              É sobre como fazemos.
            </p>
            <div className="space-y-6">
              {[
                {
                  n: "01",
                  title: "Velocidade real",
                  desc: "Não prometemos velocidade como vantagem de venda. Entregamos rápido porque temos processo — não porque improvisamos.",
                },
                {
                  n: "02",
                  title: "Squad especializado, não freelancer genérico",
                  desc: "Cada agent tem uma especialidade. Você recebe especialistas que fazem cada coisa no nível mais alto.",
                },
                {
                  n: "03",
                  title: "IA no core, não no marketing",
                  desc: "Não usamos IA só pra falar que usamos. Nossos agents são IA — treinados, especializados, operando 24/7.",
                },
                {
                  n: "04",
                  title: "Produtos próprios",
                  desc: "UpBro, HNBCRM e GMBAssist foram construídos pra resolver problemas reais. Quando recomendamos, é porque usamos.",
                },
                {
                  n: "05",
                  title: "Operação 24/7",
                  desc: "Seu projeto não para quando o horário comercial acaba. Nosso squad opera enquanto você dorme.",
                },
              ].map((item) => (
                <div key={item.n} className="flex gap-6 items-start">
                  <span className="text-[#8B5CF6] font-mono text-sm shrink-0 mt-1">
                    {item.n}
                  </span>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          className="rounded-2xl border border-[#00FF41]/20 bg-[#00FF41]/5 p-10 text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Pronto pra trabalhar com esse squad?
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contato"
              className="rounded-lg bg-[#00FF41] px-8 py-3 text-base font-bold text-[#0F172A] transition-opacity hover:opacity-90"
            >
              → Falar com o Squad
            </Link>
            <Link
              href="/servicos"
              className="rounded-lg border border-white/20 px-8 py-3 text-base font-medium text-white hover:border-white/40 transition-colors"
            >
              Ver nossos serviços
            </Link>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="my-4 border-t border-white/10" />

        {/* Squad Section — existente */}
        <section id="squad">
          <EliteSquadSection />
        </section>
      </div>
    </div>
  );
}
