import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a INOVAWAY. Vamos conversar sobre seu projeto.",
};

export default function ContatoPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Fale{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple">
              Conosco
            </span>
          </h1>
          <p className="mt-4 text-white/60 text-lg">
            Tem um projeto em mente? Adoraríamos ouvir.
          </p>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-10">
          {[
            {
              icon: "📧",
              label: "Email",
              value: "contato@inovaway.com.br",
              href: "mailto:contato@inovaway.com.br",
            },
            {
              icon: "💬",
              label: "WhatsApp",
              value: "+55 (11) 99999-0000",
              href: "https://wa.me/5511999990000",
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex gap-4 items-center rounded-xl border border-white/10 bg-navy-light p-5 hover:border-cyan/30 transition-colors"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-xs text-white/40 mb-0.5">{item.label}</p>
                <p className="text-white font-medium">{item.value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Contact Form placeholder */}
        <div className="rounded-xl border border-white/10 bg-navy-light p-8">
          <h2 className="text-xl font-semibold text-white mb-6">
            Enviar Mensagem
          </h2>
          <form className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white/70 mb-1.5"
                >
                  Nome
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/30 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/70 mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/30 transition-colors"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-white/70 mb-1.5"
              >
                Assunto
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Sobre o que deseja falar?"
                className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/30 transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white/70 mb-1.5"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Conte mais sobre seu projeto..."
                className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/30 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-cyan px-6 py-3 text-base font-semibold text-navy transition-opacity hover:opacity-90"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
