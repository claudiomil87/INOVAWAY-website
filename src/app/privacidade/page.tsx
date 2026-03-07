import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | INOVAWAY",
  description:
    "Conheça a Política de Privacidade da INOVAWAY conforme a LGPD (Lei 13.709/2018). Saiba como coletamos, usamos e protegemos seus dados pessoais com segurança.",
  keywords: [
    "política de privacidade",
    "LGPD",
    "proteção de dados",
    "privacidade",
    "INOVAWAY",
    "Lei 13.709",
    "dados pessoais",
  ],
  openGraph: {
    title: "Política de Privacidade | INOVAWAY",
    description:
      "Conheça a Política de Privacidade da INOVAWAY conforme a LGPD (Lei 13.709/2018). Saiba como coletamos, usamos e protegemos seus dados pessoais com segurança.",
    url: "https://inovaway.org/privacidade",
    type: "website",
    locale: "pt_BR",
    siteName: "INOVAWAY",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Política de Privacidade — INOVAWAY",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Privacidade | INOVAWAY",
    description:
      "Conheça a Política de Privacidade da INOVAWAY conforme a LGPD. Saiba como coletamos, usamos e protegemos seus dados pessoais.",
    images: ["/og-image.png"],
    creator: "@inovaway",
    site: "@inovaway",
  },
};

const sections = [
  {
    id: "introducao",
    title: "1. Introdução",
    content: `A INOVAWAY ("nós", "nosso" ou "empresa"), pessoa jurídica registrada e atuante no Brasil, com presença digital em inovaway.org, está comprometida com a proteção da privacidade e dos dados pessoais de seus usuários, clientes e visitantes.

Esta Política de Privacidade descreve como coletamos, usamos, armazenamos, compartilhamos e protegemos suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018) e demais legislações aplicáveis.

Ao utilizar nossos serviços, você concorda com as práticas descritas nesta Política. Recomendamos a leitura completa antes de fornecer qualquer dado pessoal.`,
  },
  {
    id: "dados-coletados",
    title: "2. Dados Pessoais Coletados",
    content: `Coletamos dados pessoais nas seguintes situações:

**2.1 Dados fornecidos diretamente por você:**
- Nome completo e dados de identificação
- Endereço de e-mail
- Número de telefone / WhatsApp
- Nome da empresa e segmento de atuação
- Mensagens e conteúdos enviados via formulários de contato

**2.2 Dados coletados automaticamente:**
- Endereço IP e dados de geolocalização aproximada
- Tipo e versão do navegador e sistema operacional
- Páginas visitadas, tempo de permanência e origem do acesso
- Dados de cookies e tecnologias semelhantes (conforme Seção 7)

**2.3 Dados de uso dos serviços contratados:**
- Histórico de interações com nossas plataformas (UpBro, HNBCRM, GMBAssist)
- Dados de automações e integrações configuradas
- Logs de acesso e atividade nas ferramentas

Não coletamos dados sensíveis (saúde, origem racial, convicção religiosa, dados biométricos etc.) sem consentimento explícito e justificativa legal.`,
  },
  {
    id: "finalidade",
    title: "3. Finalidade do Tratamento",
    content: `Tratamos seus dados pessoais para as seguintes finalidades:

**3.1 Execução contratual:**
- Prestar os serviços contratados (sites, automações, marketing, consultoria)
- Manter e aprimorar as plataformas e ferramentas
- Processar pagamentos e emitir faturas

**3.2 Comunicação e atendimento:**
- Responder solicitações, dúvidas e mensagens
- Enviar atualizações sobre projetos em andamento
- Notificar sobre mudanças nos serviços ou nesta Política

**3.3 Marketing (mediante consentimento):**
- Enviar newsletters e materiais informativos
- Apresentar novidades, casos de sucesso e ofertas relevantes
- Você pode cancelar este consentimento a qualquer momento

**3.4 Legítimo interesse e segurança:**
- Prevenir fraudes e garantir a segurança das plataformas
- Cumprir obrigações legais e regulatórias
- Melhorar a experiência de uso com base em análises agregadas`,
  },
  {
    id: "base-legal",
    title: "4. Base Legal (LGPD)",
    content: `Tratamos seus dados com base nas seguintes hipóteses legais previstas no Art. 7º da LGPD:

- **Consentimento** (Art. 7º, I): para envio de comunicações de marketing
- **Execução de contrato** (Art. 7º, V): para prestação dos serviços contratados
- **Legítimo interesse** (Art. 7º, IX): para melhoria dos serviços e segurança
- **Cumprimento de obrigação legal** (Art. 7º, II): para atender exigências fiscais, contábeis e regulatórias

Quando o tratamento for baseado em consentimento, você poderá revogá-lo a qualquer momento sem prejuízo dos tratamentos realizados anteriormente.`,
  },
  {
    id: "compartilhamento",
    title: "5. Compartilhamento de Dados",
    content: `Seus dados pessoais podem ser compartilhados com:

**5.1 Parceiros e fornecedores de tecnologia:**
- Plataformas de hospedagem e infraestrutura em nuvem
- Ferramentas de analytics e monitoramento de desempenho
- Sistemas de automação de marketing e CRM
- Processadores de pagamento

Esses parceiros processam dados estritamente conforme nossas instruções e estão contratualmente obrigados a manter a confidencialidade.

**5.2 Autoridades e obrigações legais:**
Podemos compartilhar dados com autoridades governamentais, judiciais ou regulatórias quando exigido por lei, ordem judicial ou para defesa de direitos legais da INOVAWAY.

**Não vendemos, alugamos ou comercializamos dados pessoais de clientes e usuários para terceiros.** Jamais.`,
  },
  {
    id: "retencao",
    title: "6. Armazenamento e Retenção",
    content: `Seus dados são armazenados em servidores seguros, preferencialmente localizados no Brasil ou em países que garantam nível adequado de proteção conforme a LGPD.

**Prazos de retenção:**
- Dados de clientes ativos: durante toda a vigência do contrato + 5 anos (obrigação fiscal/legal)
- Dados de leads e contatos: até 2 anos após o último contato ou até revogação do consentimento
- Logs de acesso: 6 meses (conforme Marco Civil da Internet — Lei 12.965/2014)
- Dados de comunicações de marketing: até revogação do consentimento

Após o prazo de retenção, os dados são excluídos de forma segura ou anonimizados.`,
  },
  {
    id: "cookies",
    title: "7. Cookies e Tecnologias de Rastreamento",
    content: `Utilizamos cookies e tecnologias similares para:

**7.1 Cookies essenciais (necessários):**
Garantem o funcionamento básico do site. Não podem ser desativados.

**7.2 Cookies de desempenho e analytics:**
Coletamos dados sobre como o site é utilizado (páginas visitadas, tempo de sessão, origem) para melhorar a experiência. Usamos ferramentas como Google Analytics.

**7.3 Cookies de marketing (opcional):**
Utilizados para personalizar anúncios e medir efetividade de campanhas. Só ativados com seu consentimento.

**Gerenciamento de cookies:**
Você pode configurar seu navegador para bloquear ou excluir cookies. Observe que desativar alguns cookies pode afetar a funcionalidade do site.

Para mais informações sobre cookies específicos utilizados, entre em contato com nosso DPO (Seção 9).`,
  },
  {
    id: "direitos",
    title: "8. Seus Direitos como Titular",
    content: `Conforme a LGPD (Arts. 17 a 22), você tem os seguintes direitos:

- **Confirmação**: saber se tratamos dados seus
- **Acesso**: obter cópia dos dados que temos sobre você
- **Correção**: solicitar correção de dados incompletos, inexatos ou desatualizados
- **Anonimização / Bloqueio / Eliminação**: de dados desnecessários ou tratados em desconformidade
- **Portabilidade**: receber seus dados em formato estruturado para transferência a outro fornecedor
- **Eliminação**: solicitar exclusão dos dados tratados com base em consentimento
- **Informação**: saber com quem compartilhamos seus dados
- **Revogação do consentimento**: cancelar autorização de tratamento a qualquer momento
- **Oposição**: opor-se a tratamento realizado com base em legítimo interesse

**Como exercer seus direitos:**
Envie sua solicitação para **contato@inovaway.org** com o assunto "LGPD — [Direito Solicitado]".
Responderemos em até **15 dias úteis**, conforme prazo estabelecido na LGPD.`,
  },
  {
    id: "dpo",
    title: "9. Encarregado de Dados (DPO)",
    content: `A INOVAWAY designou um Encarregado pelo Tratamento de Dados Pessoais (DPO — Data Protection Officer), responsável por:

- Ser o canal de comunicação entre titulares, a empresa e a ANPD
- Orientar colaboradores sobre as práticas de proteção de dados
- Receber e responder reclamações e solicitações dos titulares

**Contato com o DPO:**
E-mail: contato@inovaway.org
Assunto: "DPO / Privacidade de Dados"

A ANPD (Autoridade Nacional de Proteção de Dados) pode ser contactada em: www.gov.br/anpd`,
  },
  {
    id: "seguranca",
    title: "10. Segurança dos Dados",
    content: `Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, perda, alteração, divulgação ou destruição, incluindo:

- Criptografia de dados em trânsito (HTTPS/TLS)
- Controle de acesso baseado em função (RBAC)
- Monitoramento contínuo de segurança
- Backups regulares e redundância
- Revisões periódicas de segurança

Em caso de incidente de segurança que possa afetar seus dados, notificaremos os titulares afetados e a ANPD dentro dos prazos legais.`,
  },
  {
    id: "atualizacoes",
    title: "11. Alterações desta Política",
    content: `Esta Política pode ser atualizada periodicamente para refletir mudanças nos nossos serviços, práticas ou exigências legais.

Quando houver alterações relevantes, notificaremos por e-mail (se tivermos seu contato) ou por aviso em destaque no site. A data da última atualização estará sempre indicada no rodapé desta página.

Recomendamos revisar esta Política periodicamente.`,
  },
  {
    id: "foro",
    title: "12. Lei Aplicável e Foro",
    content: `Esta Política é regida pelas leis da República Federativa do Brasil, em especial pela LGPD (Lei nº 13.709/2018) e pelo Código de Defesa do Consumidor (Lei nº 8.078/1990).

Para dirimir eventuais controvérsias, fica eleito o foro da comarca de domicílio do titular dos dados, nos termos do Art. 22 da LGPD.`,
  },
];

export default function PrivacidadePage() {
  const lastUpdate = "07 de março de 2026";

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
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Política de{" "}
            <span style={{ color: "#00FF41" }}>Privacidade</span>
          </h1>
          <p className="text-white/60 text-base max-w-xl mx-auto leading-relaxed">
            Em conformidade com a Lei Geral de Proteção de Dados Pessoais — LGPD (Lei nº 13.709/2018).
          </p>
          <p className="mt-4 text-white/30 text-sm">
            Última atualização: {lastUpdate}
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
            Índice
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
          <h3 className="text-lg font-black text-white mb-2">Dúvidas sobre privacidade?</h3>
          <p className="text-white/60 text-sm mb-4">
            Entre em contato com nosso Encarregado de Dados (DPO):
          </p>
          <a
            href="mailto:contato@inovaway.org"
            className="inline-block px-6 py-3 rounded-full font-bold text-sm transition-all"
            style={{
              background: "#00FF4115",
              border: "1px solid #00FF4140",
              color: "#00FF41",
            }}
          >
            contato@inovaway.org
          </a>
        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            ← Voltar para o início
          </Link>
          <span className="mx-4 text-white/20">|</span>
          <Link
            href="/termos"
            className="text-sm text-white/40 hover:text-[#00FF41] transition-colors"
          >
            Ver Termos de Uso →
          </Link>
        </div>
      </section>
    </main>
  );
}
