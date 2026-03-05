import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "INOVAWAY — Tecnologia que transforma",
  description:
    "Soluções inovadoras para negócios digitais. Transformamos ideias em produtos que impactam.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-20">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-purple/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-tech/30 bg-green-tech/10 px-4 py-1.5 text-sm text-green-tech">
            <span className="h-2 w-2 rounded-full bg-green-tech animate-pulse" />
            Tecnologia que transforma
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
            Inovação que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple">
              impulsiona
            </span>{" "}
            seu negócio
          </h1>

          <p className="mt-6 text-lg text-white/60 sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Desenvolvemos soluções digitais sob medida para transformar sua
            empresa. Do planejamento ao deploy — com tecnologia de ponta e
            foco em resultados.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/servicos"
              className="w-full sm:w-auto rounded-md bg-cyan px-8 py-3.5 text-base font-semibold text-navy transition-opacity hover:opacity-90"
            >
              Ver Serviços
            </Link>
            <Link
              href="/contato"
              className="w-full sm:w-auto rounded-md border border-white/20 bg-white/5 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>

      {/* Features teaser */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                icon: "⚡",
                title: "Rápido",
                desc: "Entregas ágeis com metodologia sprint",
                color: "text-green-tech",
                border: "border-green-tech/20",
                bg: "bg-green-tech/5",
              },
              {
                icon: "🔒",
                title: "Seguro",
                desc: "Security-first em cada linha de código",
                color: "text-cyan",
                border: "border-cyan/20",
                bg: "bg-cyan/5",
              },
              {
                icon: "🚀",
                title: "Escalável",
                desc: "Arquitetura preparada para o crescimento",
                color: "text-purple",
                border: "border-purple/20",
                bg: "bg-purple/5",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-xl border ${item.border} ${item.bg} p-6 transition-transform hover:-translate-y-1`}
              >
                <div className={`text-3xl mb-4`}>{item.icon}</div>
                <h3 className={`text-lg font-semibold ${item.color}`}>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
