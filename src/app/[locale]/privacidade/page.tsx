import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const BASE_URL = "https://inovaway.org";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PrivacidadePage' });
  const isEn = locale === "en";
  const path = "/privacidade";
  const canonical = isEn ? `${BASE_URL}/en${path}` : `${BASE_URL}${path}`;

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    keywords: [
      "política de privacidade",
      "LGPD",
      "proteção de dados",
      "privacidade",
      "INOVAWAY",
      "Lei 13.709",
      "dados pessoais",
    ],
    alternates: {
      canonical,
      languages: {
        "pt-BR": `${BASE_URL}${path}`,
        en: `${BASE_URL}/en${path}`,
        "x-default": `${BASE_URL}${path}`,
      },
    },
    openGraph: {
      title: t('pageTitle'),
      description: t('pageDescription'),
      url: canonical,
      type: "website",
      locale: isEn ? "en_US" : "pt_BR",
      alternateLocale: isEn ? "pt_BR" : "en_US",
      siteName: "INOVAWAY",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t('pageTitle'),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t('pageTitle'),
      description: t('pageDescription'),
      images: ["/og-image.png"],
      creator: "@inovaway",
      site: "@inovaway",
    },
  };
}

export default async function PrivacidadePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PrivacidadePage' });

  const sections = [
    { id: "introducao", title: t('sections.0.title'), content: t('sections.0.content') },
    { id: "dados-coletados", title: t('sections.1.title'), content: t('sections.1.content') },
    { id: "finalidade", title: t('sections.2.title'), content: t('sections.2.content') },
    { id: "base-legal", title: t('sections.3.title'), content: t('sections.3.content') },
    { id: "compartilhamento", title: t('sections.4.title'), content: t('sections.4.content') },
    { id: "retencao", title: t('sections.5.title'), content: t('sections.5.content') },
    { id: "cookies", title: t('sections.6.title'), content: t('sections.6.content') },
    { id: "direitos", title: t('sections.7.title'), content: t('sections.7.content') },
    { id: "dpo", title: t('sections.8.title'), content: t('sections.8.content') },
    { id: "seguranca", title: t('sections.9.title'), content: t('sections.9.content') },
    { id: "atualizacoes", title: t('sections.10.title'), content: t('sections.10.content') },
    { id: "foro", title: t('sections.11.title'), content: t('sections.11.content') },
  ];

  return (
    <main className="min-h-screen" style={{ background: "#0F172A" }}>
      {/* Hero */}
      <section className="relative pt-32 pb-14 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-[140px] opacity-10"
            style={{ background: "#00FF41" }}
          />
          <div
            className="absolute top-10 right-1/4 w-72 h-72 rounded-full blur-[100px] opacity-8"
            style={{ background: "#06B6D4" }}
          />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 border"
            style={{ color: "#00FF41", borderColor: "#00FF41", background: "#00FF4110" }}
          >
            {t('badge')}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            {t('title')}{" "}
            <span style={{ color: "#00FF41" }}>{t('titleGradient')}</span>
          </h1>
          <p className="text-white/60 text-base max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
          <p className="mt-4 text-white/30 text-sm">
            {t('lastUpdated')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-28 max-w-4xl mx-auto">
        {/* Index */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-10"
        >
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#06B6D4] mb-4">
            {t('indexTitle')}
          </h2>
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm text-white/50 hover:text-[#00FF41] transition-colors py-1"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 scroll-mt-24"
            >
              <h2 className="text-xl font-black text-white mb-5">{s.title}</h2>
              <div className="text-white/65 text-sm leading-relaxed space-y-3">
                {s.content.split("\n\n").map((para, i) => {
                  if (para.startsWith("**") && para.endsWith("**")) {
                    return (
                      <p key={i} className="font-bold text-white/90">
                        {para.replace(/\*\*/g, "")}
                      </p>
                    );
                  }
                  // Render inline bold (**text**)
                  const parts = para.split(/(\*\*[^*]+\*\*)/g);
                  return (
                    <p key={i}>
                      {parts.map((part, j) =>
                        part.startsWith("**") && part.endsWith("**") ? (
                          <strong key={j} className="text-white/90 font-semibold">
                            {part.replace(/\*\*/g, "")}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  );
                })}
              </div>
            </article>
          ))}
        </div>

        {/* Contact box */}
        <div
          className="mt-12 rounded-2xl border border-[#00FF41]/20 p-8 text-center"
          style={{ background: "linear-gradient(135deg, #00FF4108, #06B6D405)" }}
        >
          <h3 className="text-lg font-black text-white mb-2">{t('contactTitle')}</h3>
          <p className="text-white/60 text-sm mb-4">
            {t('contactSubtitle')}
          </p>
          <a
            href={`mailto:${t('contactEmail')}`}
            className="inline-block px-6 py-3 rounded-full font-bold text-sm transition-all"
            style={{
              background: "#00FF4115",
              border: "1px solid #00FF4140",
              color: "#00FF41",
            }}
          >
            {t('contactEmail')}
          </a>
        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            {t('backHome')}
          </Link>
          <span className="mx-4 text-white/20">|</span>
          <Link
            href="/termos"
            className="text-sm text-white/40 hover:text-[#00FF41] transition-colors"
          >
            {t('termsLink')}
          </Link>
        </div>
      </section>
    </main>
  );
}