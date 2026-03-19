/**
 * AuthorBox — E-E-A-T author section with bilingual support + Person JSON-LD.
 * Displays author info at the bottom of each blog post.
 */

const BASE_URL = "https://inovaway.org";

const authorSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "INOVAWAY Intelligence",
  url: BASE_URL,
  image: `${BASE_URL}/logo.png`,
  sameAs: [
    "https://instagram.com/inovaway",
    "https://linkedin.com/company/inovaway",
  ],
  worksFor: {
    "@type": "Organization",
    name: "INOVAWAY",
    url: BASE_URL,
  },
  jobTitle: "AI Strategy & Automation",
  description:
    "INOVAWAY Intelligence é a divisão de conteúdo e pesquisa da INOVAWAY — agência brasileira especializada em AI Agents para empresas. Nossos posts são revisados por especialistas com experiência prática em automação, LLMs e inteligência artificial aplicada.",
};

interface AuthorBoxProps {
  locale: string;
}

export default function AuthorBox({ locale }: AuthorBoxProps) {
  const isPt = locale === "pt";

  const label = isPt ? "Sobre o Autor" : "About the Author";
  const name = "INOVAWAY Intelligence";
  const bio = isPt
    ? "INOVAWAY Intelligence é a divisão de conteúdo e pesquisa da INOVAWAY — agência brasileira especializada em AI Agents para empresas. Nossos artigos são produzidos e revisados por especialistas com experiência prática em automação, LLMs e inteligência artificial aplicada ao mundo dos negócios."
    : "INOVAWAY Intelligence is the content and research division of INOVAWAY — a Brazilian agency specialized in AI Agents for businesses. Our articles are produced and reviewed by specialists with hands-on experience in automation, LLMs, and applied AI.";
  const followLabel = isPt ? "Seguir no LinkedIn" : "Follow on LinkedIn";
  const siteLabel = isPt ? "Conhecer a INOVAWAY" : "Visit INOVAWAY";

  return (
    <>
      {/* Person JSON-LD */}
      <script
        id="schema-author"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />

      <section
        className="mt-12 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.09)",
        }}
        aria-label={label}
      >
        {/* Avatar */}
        <div
          className="shrink-0 flex items-center justify-center rounded-full w-16 h-16"
          style={{
            background: "rgba(6,182,212,0.15)",
            border: "2px solid rgba(6,182,212,0.4)",
          }}
          aria-hidden="true"
        >
          {/* Placeholder AI icon */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
          </svg>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: "#06B6D4" }}
          >
            {label}
          </p>
          <h3 className="text-lg font-bold text-white mb-2">{name}</h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
            {bio}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://linkedin.com/company/inovaway"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors duration-200"
              style={{
                background: "rgba(6,182,212,0.1)",
                color: "#06B6D4",
                border: "1px solid rgba(6,182,212,0.2)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              {followLabel}
            </a>
            <a
              href={isPt ? `${BASE_URL}/contato` : `${BASE_URL}/en/contact`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors duration-200"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {siteLabel} →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
