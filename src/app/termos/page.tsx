import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | INOVAWAY",
  description:
    "Termos de Uso e Condições Gerais de Prestação de Serviços da INOVAWAY. Leia antes de utilizar nossos serviços.",
};

const sections = [
  {
    id: "objeto",
    title: "1. Objeto e Aceitação",
    content: `Estes Termos de Uso ("Termos") regulam a relação entre a **INOVAWAY** ("Empresa", "nós") e o usuário ou cliente ("Usuário", "você") que acessa o site inovaway.org ou contrata os serviços oferecidos pela INOVAWAY.

Ao acessar o site, preencher qualquer formulário, contratar serviços ou utilizar as plataformas da INOVAWAY (incluindo UpBro, HNBCRM e GMBAssist), você declara ter lido, compreendido e concordado integralmente com estes Termos.

**Caso não concorde com qualquer disposição destes Termos, não utilize nossos serviços.**

A INOVAWAY reserva-se o direito de atualizar estes Termos a qualquer momento. As alterações entram em vigor na data de publicação. O uso continuado dos serviços após a publicação das alterações constitui aceitação dos novos Termos.`,
  },
  {
    id: "servicos",
    title: "2. Descrição dos Serviços",
    content: `A INOVAWAY oferece serviços de tecnologia e marketing digital para pequenas e médias empresas, incluindo mas não se limitando a:

**2.1 Serviços de desenvolvimento:**
- Criação e manutenção de sites e aplicações web
- Desenvolvimento de chatbots e automações (plataforma UpBro)
- Integrações via API com plataformas de terceiros
- Sistemas de CRM e gestão de relacionamento (HNBCRM)

**2.2 Serviços de marketing digital:**
- Gestão de presença no Google Meu Negócio (GMBAssist)
- Criação e gestão de campanhas de tráfego pago
- Produção de conteúdo e identidade visual
- Estratégias de crescimento e conversão

**2.3 Consultoria e diagnóstico:**
- Análise e diagnóstico digital do negócio
- Estratégia e planejamento tecnológico
- Treinamento e capacitação

As especificações detalhadas de cada serviço são definidas em proposta comercial ou contrato específico firmado entre as partes.`,
  },
  {
    id: "cadastro",
    title: "3. Cadastro e Conta do Usuário",
    content: `Para contratar serviços ou acessar plataformas restritas, o Usuário deve:

- Fornecer informações verdadeiras, completas e atualizadas
- Manter seus dados de acesso (login e senha) em sigilo absoluto
- Notificar imediatamente a INOVAWAY em caso de acesso não autorizado

O Usuário é responsável por todas as ações realizadas com suas credenciais de acesso. A INOVAWAY não se responsabiliza por danos decorrentes do uso não autorizado de contas por falha do Usuário em proteger suas credenciais.

A INOVAWAY reserva-se o direito de suspender ou encerrar contas que violem estes Termos, sem aviso prévio em casos de violação grave.`,
  },
  {
    id: "propriedade",
    title: "4. Propriedade Intelectual",
    content: `**4.1 Propriedade da INOVAWAY:**
Todo o conteúdo disponível no site inovaway.org — incluindo mas não se limitando a textos, imagens, logotipos, vídeos, código-fonte, layout, metodologias e marcas — é de propriedade exclusiva da INOVAWAY ou de seus licenciadores, protegido pela Lei de Direitos Autorais (Lei nº 9.610/1998) e pela Lei de Propriedade Industrial (Lei nº 9.279/1996).

É vedado reproduzir, distribuir, modificar, adaptar, traduzir, criar obras derivadas ou explorar comercialmente qualquer conteúdo sem autorização prévia e por escrito da INOVAWAY.

**4.2 Propriedade dos entregáveis ao cliente:**
Após a liquidação integral dos valores devidos, os entregáveis customizados produzidos exclusivamente para o cliente (sites, artes, textos sob demanda) são transferidos ao contratante, conforme especificado no contrato de serviços.

**4.3 Plataformas SaaS:**
As plataformas UpBro, HNBCRM e GMBAssist são fornecidas como Software as a Service (SaaS). O cliente adquire direito de uso (licença não exclusiva e intransferível), não a propriedade do software.

**4.4 Conteúdo do usuário:**
Ao compartilhar conteúdo com a INOVAWAY para fins de prestação de serviços, o Usuário declara ter todos os direitos necessários sobre esse conteúdo e concede à INOVAWAY licença para utilizá-lo exclusivamente na prestação dos serviços contratados.`,
  },
  {
    id: "pagamento",
    title: "5. Pagamento e Condições Comerciais",
    content: `**5.1 Precificação:**
Os valores dos serviços são definidos em proposta comercial aprovada pelo cliente. A INOVAWAY pode alterar seus preços com aviso prévio de 30 dias para contratos vigentes.

**5.2 Forma e prazo de pagamento:**
As condições de pagamento são estabelecidas no contrato específico. O não pagamento nos prazos acordados pode resultar em:
- Suspensão dos serviços após 15 dias de atraso
- Juros de 1% ao mês e multa de 2% sobre o valor em atraso
- Encerramento contratual após 30 dias de inadimplência

**5.3 Reembolsos:**
Serviços já prestados não são reembolsáveis, exceto em casos de falha comprovada da INOVAWAY. Para serviços SaaS, não há reembolso proporcional por período não utilizado, salvo disposição contrária no contrato.

**5.4 Impostos:**
Os preços cotados não incluem impostos aplicáveis, que serão adicionados conforme legislação vigente.`,
  },
  {
    id: "responsabilidades",
    title: "6. Responsabilidades das Partes",
    content: `**6.1 Responsabilidades da INOVAWAY:**
- Prestar os serviços com qualidade e no prazo acordados
- Manter a confidencialidade das informações do cliente
- Notificar o cliente sobre questões relevantes ao projeto
- Proteger os dados pessoais conforme Política de Privacidade

**6.2 Responsabilidades do Usuário/Cliente:**
- Fornecer informações precisas e materiais necessários para execução dos serviços
- Efetuar pagamentos nos prazos acordados
- Respeitar os direitos de propriedade intelectual da INOVAWAY e de terceiros
- Utilizar os serviços em conformidade com a legislação brasileira
- Não utilizar as plataformas para atividades ilegais, difamatórias, enganosas ou que violem direitos de terceiros`,
  },
  {
    id: "limitacao",
    title: "7. Limitação de Responsabilidade",
    content: `**7.1 Exclusão de garantias:**
Os serviços são fornecidos "no estado em que se encontram" (as is). A INOVAWAY não garante que os serviços serão ininterruptos, livres de erros ou que atenderão a requisitos específicos não previamente acordados.

**7.2 Limitação de danos:**
Em nenhuma circunstância a INOVAWAY será responsável por:
- Danos indiretos, incidentais, consequenciais, especiais ou punitivos
- Perda de lucros, receita, dados ou oportunidades de negócio
- Danos decorrentes de ações de terceiros, ataques cibernéticos ou falhas de infraestrutura fora do controle da INOVAWAY
- Resultados específicos de marketing ou vendas, que dependem de fatores externos não controláveis

**7.3 Teto de responsabilidade:**
A responsabilidade total da INOVAWAY em relação a qualquer reclamação está limitada ao valor pago pelo cliente nos 3 meses anteriores ao evento que gerou a reclamação.

**7.4 Força maior:**
A INOVAWAY não será responsável por atrasos ou falhas decorrentes de eventos fora de seu controle razoável (força maior), incluindo desastres naturais, falhas de infraestrutura de internet, pandemias ou atos governamentais.`,
  },
  {
    id: "uso-aceitavel",
    title: "8. Uso Aceitável",
    content: `É estritamente proibido utilizar os serviços e plataformas da INOVAWAY para:

- Violar leis ou regulamentos brasileiros ou internacionais
- Enviar spam, phishing ou comunicações não solicitadas
- Distribuir malware, vírus ou código malicioso
- Realizar ataques a sistemas de terceiros
- Coletar dados de usuários sem consentimento
- Publicar conteúdo difamatório, pornográfico, discriminatório ou que incite violência
- Infringir direitos autorais, marcas ou outros direitos de propriedade intelectual
- Fazer engenharia reversa das plataformas da INOVAWAY
- Praticar concorrência desleal ou copiar metodologias proprietárias da INOVAWAY

O descumprimento destas regras pode resultar em suspensão imediata dos serviços e responsabilização civil e criminal.`,
  },
  {
    id: "privacidade",
    title: "9. Privacidade e Dados Pessoais",
    content: `O tratamento de dados pessoais pela INOVAWAY é regido pela nossa Política de Privacidade, disponível em inovaway.org/privacidade, que é parte integrante destes Termos.

Ao utilizar nossos serviços, você consente com o tratamento de seus dados conforme descrito na Política de Privacidade, em conformidade com a LGPD (Lei nº 13.709/2018).`,
  },
  {
    id: "confidencialidade",
    title: "10. Confidencialidade",
    content: `Ambas as partes comprometem-se a manter em estrita confidencialidade todas as informações de caráter confidencial trocadas no âmbito da relação comercial, incluindo:

- Informações estratégicas e de negócios
- Dados de clientes e de propriedade intelectual
- Metodologias, processos e ferramentas proprietárias

Esta obrigação de confidencialidade persiste por **2 anos** após o encerramento do contrato ou relação comercial, salvo disposição contrária em contrato específico.

Não são consideradas confidenciais informações que sejam de domínio público, que já fossem de conhecimento prévio da parte receptora ou que sejam legalmente exigidas por autoridade competente.`,
  },
  {
    id: "encerramento",
    title: "11. Rescisão e Suspensão",
    content: `**11.1 Rescisão por qualquer das partes:**
Qualquer das partes pode rescindir o contrato mediante aviso prévio de **30 dias**, por escrito, salvo se o contrato específico estabelecer prazo diferente.

**11.2 Rescisão imediata pela INOVAWAY:**
A INOVAWAY pode suspender ou encerrar imediatamente os serviços em caso de:
- Violação destes Termos ou do contrato específico
- Inadimplência superior a 30 dias
- Uso dos serviços para fins ilegais ou prejudiciais a terceiros

**11.3 Efeitos do encerramento:**
Após o encerramento, o cliente terá acesso aos dados e entregáveis de sua propriedade por 30 dias. Após este prazo, os dados poderão ser excluídos. Os valores devidos até a data de encerramento permanecem exigíveis.`,
  },
  {
    id: "geral",
    title: "12. Disposições Gerais",
    content: `**12.1 Integralidade:**
Estes Termos, junto com a Política de Privacidade e qualquer contrato específico firmado, constituem o acordo integral entre as partes sobre o assunto.

**12.2 Cessão:**
O Usuário não pode ceder ou transferir seus direitos e obrigações decorrentes destes Termos sem consentimento prévio e por escrito da INOVAWAY.

**12.3 Independência das cláusulas:**
Se qualquer disposição destes Termos for considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor.

**12.4 Tolerância:**
A tolerância da INOVAWAY em relação a qualquer descumprimento não implica renúncia ao direito de exigir o cumprimento posterior.

**12.5 Comunicações:**
Comunicações formais entre as partes devem ser realizadas por escrito, preferencialmente por e-mail (contato@inovaway.org), com confirmação de recebimento.`,
  },
  {
    id: "foro",
    title: "13. Lei Aplicável e Foro",
    content: `Estes Termos são regidos exclusivamente pelas leis da República Federativa do Brasil.

Para a resolução de qualquer conflito decorrente destes Termos ou dos serviços prestados, as partes elegem o **Foro da Comarca do domicílio do Usuário**, nos termos do Art. 101 do Código de Defesa do Consumidor (Lei nº 8.078/1990), renunciando expressamente a qualquer outro, por mais privilegiado que seja.

Para clientes pessoa jurídica, fica eleito o foro da Comarca de **Recife/PE**, com renúncia a qualquer outro.

Antes de recorrer ao Judiciário, as partes comprometem-se a buscar solução amigável no prazo de 30 dias após notificação formal do conflito.

**Contato:** contato@inovaway.org`,
  },
];

export default function TermosPage() {
  const lastUpdate = "07 de março de 2026";

  return (
    <main className="min-h-screen" style={{ background: "#0F172A" }}>
      {/* Hero */}
      <section className="relative pt-32 pb-14 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-[140px] opacity-10"
            style={{ background: "#06B6D4" }}
          />
          <div
            className="absolute top-10 right-1/4 w-72 h-72 rounded-full blur-[100px] opacity-8"
            style={{ background: "#00FF41" }}
          />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 border"
            style={{ color: "#06B6D4", borderColor: "#06B6D4", background: "#06B6D410" }}
          >
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Termos de{" "}
            <span style={{ color: "#06B6D4" }}>Uso</span>
          </h1>
          <p className="text-white/60 text-base max-w-xl mx-auto leading-relaxed">
            Condições gerais de uso do site e dos serviços prestados pela INOVAWAY.
            Leia com atenção antes de contratar.
          </p>
          <p className="mt-4 text-white/30 text-sm">
            Última atualização: {lastUpdate}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-28 max-w-4xl mx-auto">
        {/* Index */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#06B6D4] mb-4">
            Índice
          </h2>
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm text-white/50 hover:text-[#06B6D4] transition-colors py-1"
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
          className="mt-12 rounded-2xl border border-[#06B6D4]/20 p-8 text-center"
          style={{ background: "linear-gradient(135deg, #06B6D408, #00FF4105)" }}
        >
          <h3 className="text-lg font-black text-white mb-2">Dúvidas sobre os Termos?</h3>
          <p className="text-white/60 text-sm mb-4">
            Entre em contato com nossa equipe jurídica e comercial:
          </p>
          <a
            href="mailto:contato@inovaway.org"
            className="inline-block px-6 py-3 rounded-full font-bold text-sm transition-all"
            style={{
              background: "#06B6D415",
              border: "1px solid #06B6D440",
              color: "#06B6D4",
            }}
          >
            contato@inovaway.org
          </a>
        </div>

        {/* Back links */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            ← Voltar para o início
          </Link>
          <span className="mx-4 text-white/20">|</span>
          <Link
            href="/privacidade"
            className="text-sm text-white/40 hover:text-[#00FF41] transition-colors"
          >
            Ver Política de Privacidade →
          </Link>
        </div>
      </section>
    </main>
  );
}
