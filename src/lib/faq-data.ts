/**
 * Static FAQ data for blog posts.
 * Nested structure: locale → slug → FAQ[]
 * Used by FAQSchema component to render FAQPage JSON-LD.
 * FAQ content must match visible text on the page.
 */

export interface FAQ {
  question: string;
  answer: string;
}

const faqData: Record<string, Record<string, FAQ[]>> = {
  // ────────────────────────────────────────────────────
  // PT — Português
  // ────────────────────────────────────────────────────
  pt: {
    "o-que-sao-ai-agents": [
      {
        question: "O que é um AI Agent?",
        answer:
          "Um AI Agent é um sistema de inteligência artificial autônomo capaz de perceber o ambiente, tomar decisões e executar ações para atingir objetivos específicos sem supervisão humana constante. Diferente de chatbots tradicionais, AI Agents planejam sequências de ações e usam ferramentas externas como APIs, bancos de dados e aplicativos.",
      },
      {
        question: "Qual a diferença entre AI Agent e chatbot?",
        answer:
          "Chatbots seguem scripts pré-definidos e respondem a perguntas específicas dentro de um fluxo fixo. AI Agents são autônomos, tomam decisões próprias, usam múltiplas ferramentas e APIs, e executam tarefas complexas de ponta a ponta — como pesquisar informações, enviar e-mails e atualizar sistemas, tudo em sequência e sem intervenção humana.",
      },
      {
        question: "Quais empresas já usam AI Agents?",
        answer:
          "Empresas como Klarna, Salesforce, ServiceNow e Esusu já usam AI Agents em produção. A Klarna implementou um AI Agent que resolve 66% de todas as conversas de suporte em menos de 2 minutos — o equivalente a 700 funcionários em tempo integral.",
      },
      {
        question: "Como começar com AI Agents na minha empresa?",
        answer:
          "O melhor ponto de entrada é identificar um processo repetitivo de alto volume — como triagem de e-mails ou qualificação de leads — e realizar um piloto de 30 dias. A INOVAWAY oferece diagnóstico gratuito para identificar o caso de uso certo para o seu negócio.",
      },
      {
        question: "AI Agents são seguros para dados corporativos?",
        answer:
          "Sim, quando configurados corretamente. O princípio fundamental é o mínimo privilégio: o agent acessa apenas os dados necessários para sua tarefa específica. Nunca conceda acesso irrestrito a sistemas sensíveis. Para dados financeiros, de saúde ou jurídicos, consulte um especialista antes da configuração.",
      },
    ],

    "ai-agents-atendimento-24-7": [
      {
        question: "AI Agents de atendimento funcionam em português?",
        answer:
          "Sim. Modelos de linguagem modernos têm excelente suporte ao português brasileiro, incluindo gírias e expressões regionais. O UpBro, por exemplo, é treinado especificamente para o contexto e nuances do mercado brasileiro.",
      },
      {
        question: "Um AI Agent de atendimento substitui toda a equipe humana?",
        answer:
          "Não necessariamente — e a maioria das empresas não quer isso. O modelo mais eficiente é híbrido: o AI Agent resolve automaticamente 60 a 80% das solicitações simples e repetitivas, escalando para humanos apenas os casos complexos que realmente precisam de atenção personalizada.",
      },
      {
        question: "Quanto custa implementar um AI Agent de atendimento?",
        answer:
          "O custo varia conforme o volume de atendimentos e as integrações necessárias. Ferramentas no-code custam entre R$ 100 e R$ 500 por mês. O ROI geralmente compensa o investimento em menos de 90 dias, com a maioria dos clientes INOVAWAY atingindo ROI positivo no terceiro mês.",
      },
      {
        question: "Como garantir que o AI Agent vai responder corretamente?",
        answer:
          "Definindo escopo claro, treinando com os seus dados reais e aplicando guardrails de segurança. O agent deve ter um protocolo claro de escalada para casos fora do seu escopo e passar por um período de piloto controlado antes do lançamento completo.",
      },
      {
        question: "Em quanto tempo consigo ativar um AI Agent de atendimento?",
        answer:
          "Com plataformas modernas como o UpBro, é possível ter um agent funcional em dias. Uma implementação completa com integrações ao WhatsApp, Instagram e sistemas internos tipicamente leva de 2 a 4 semanas com suporte especializado.",
      },
    ],

    "ai-agents-vs-chatbots": [
      {
        question: "Quando devo escolher um chatbot em vez de um AI Agent?",
        answer:
          "Chatbots tradicionais ainda fazem sentido quando seu fluxo de atendimento é muito simples e estável — por exemplo, um FAQ com 10 perguntas fixas que raramente mudam. Se as perguntas dos clientes são variadas, complexas ou abertas, um AI Agent vai entregar resultados muito superiores.",
      },
      {
        question: "AI Agents são mais caros que chatbots tradicionais?",
        answer:
          "O custo inicial pode ser maior, mas o ROI costuma compensar rapidamente. Chatbots têm custo de manutenção alto (cada mudança exige reprogramação manual do fluxo), enquanto AI Agents aprendem e se adaptam. No médio prazo, o custo total de propriedade dos AI Agents tende a ser menor.",
      },
      {
        question: "Um AI Agent consegue escalar para humanos quando não sabe a resposta?",
        answer:
          "Sim — e isso é uma feature fundamental, não uma limitação. AI Agents bem configurados reconhecem os limites do seu escopo e acionam um humano de forma transparente para o cliente. Esse protocolo de escalada deve ser definido antes do lançamento.",
      },
      {
        question: "Chatbots com IA generativa são a mesma coisa que AI Agents?",
        answer:
          "Não exatamente. Um chatbot com IA generativa (como GPT) pode ter conversas mais naturais, mas ainda segue um fluxo reativo. Um AI Agent vai além: ele planeja, usa ferramentas externas, executa ações em sistemas e persiste objetivos ao longo do tempo — mesmo sem input contínuo do usuário.",
      },
    ],

    "como-implementar-ai-agents-30-dias": [
      {
        question: "Preciso de um desenvolvedor para implementar AI Agents?",
        answer:
          "Não para começar. Ferramentas como Microsoft Copilot Studio, n8n e Zapier AI permitem implementações sem código. Para integrações mais complexas ou casos de uso avançados, um parceiro especializado pode acelerar o processo.",
      },
      {
        question: "Quanto tempo leva para ver resultado?",
        answer:
          "Com o processo certo, resultados preliminares aparecem na Semana 3 do piloto. ROI mensurável costuma se confirmar entre 30 e 90 dias. O payback médio em estudos globais é de 4,3 meses — mas casos simples podem atingi-lo em menos de 60 dias.",
      },
      {
        question: "Quanto custa implementar um AI Agent?",
        answer:
          "Para um piloto básico com ferramentas no-code: entre R$ 100 e R$ 500 por mês em ferramentas, mais o tempo interno de configuração (estimado em 20 a 40 horas no total, distribuídas nas 4 semanas). Implementações enterprise com integrações complexas têm custo proporcional.",
      },
      {
        question: "E se o meu primeiro processo não funcionar?",
        answer:
          "Pivotar faz parte do processo. A Semana 4 existe exatamente para isso. Se o processo escolhido era complexo demais, você usou o framework, coletou aprendizado e agora sabe escolher melhor o próximo. Sem desperdício.",
      },
      {
        question: "Como garantir a segurança dos dados com AI Agents?",
        answer:
          "Aplicando o princípio do mínimo privilégio: o agent acessa apenas os dados necessários para sua tarefa. Nunca conceda acesso irrestrito. Para dados sensíveis (financeiros, de saúde, jurídicos), consulte um especialista antes de configurar.",
      },
    ],

    "roi-ai-agents-numeros-reais": [
      {
        question: "Qual o ROI médio de AI Agents?",
        answer:
          "Estudos globais apontam 171% de ROI médio no primeiro ano para implementações estruturadas (Salesforce, 2025). No Brasil, 93% das empresas que adotaram AI Agents relatam ROI positivo, segundo o Google Cloud Brasil (2025).",
      },
      {
        question: "Quanto tempo leva para ter ROI positivo com AI Agents?",
        answer:
          "O payback médio global é de 4,3 meses. Implementações simples, como atendimento automatizado ou triagem de e-mails, frequentemente atingem ROI positivo no primeiro ou segundo mês de operação.",
      },
      {
        question: "AI Agents funcionam para pequenas empresas?",
        answer:
          "Sim. Ferramentas no-code como n8n e Zapier AI tornaram a automação acessível para empresas de qualquer tamanho. Pequenas empresas frequentemente têm ROI proporcionalmente maior, pois o impacto de automatizar um processo é mais visível em operações menores.",
      },
      {
        question: "Como calcular o ROI de um AI Agent?",
        answer:
          "Use a fórmula: ROI = (Horas economizadas × Custo/hora da tarefa) − Custo mensal da ferramenta. Defina o baseline antes de implementar: quanto tempo o processo leva hoje e qual é o custo humano associado. A diferença é o retorno potencial.",
      },
      {
        question: "Quais setores têm maior ROI com AI Agents?",
        answer:
          "Atendimento ao cliente, jurídico e financeiro lideram em ROI. Um escritório de advocacia no Reino Unido reportou 671% de ROI no primeiro ano. No Brasil, empresas de varejo, serviços e saúde têm os maiores ganhos com automação de atendimento e qualificação de leads.",
      },
    ],

    "5-sinais-precisa-ai-agents": [
      {
        question: "Quantos atendimentos por dia justificam implementar um AI Agent?",
        answer:
          "Geralmente, a partir de 30 a 50 atendimentos diários repetitivos, um AI Agent já se paga. Mais importante que o volume é a repetitividade: se mais de 60% das perguntas são parecidas, um agent vai resolvê-las com eficiência e liberar seu time para trabalho de maior valor.",
      },
      {
        question: "Como sei se minha empresa está pronta para AI Agents?",
        answer:
          "Avalie quatro critérios: seus processos repetitivos acontecem mais de 10 vezes por semana; podem ser feitos sem revisão humana constante; os dados necessários estão organizados; e o resultado é mensurável. Se você responder sim a três ou mais, sua empresa está pronta para um piloto.",
      },
      {
        question: "Preciso ter minha operação 100% organizada antes de implementar um AI Agent?",
        answer:
          "Não — mas você precisa ter os dados do processo-alvo organizados. O AI Agent vai amplificar o que existe: se os dados forem bons, os resultados serão bons. Se forem caóticos, os erros serão amplificados. Comece organizando as informações do caso de uso específico do piloto.",
      },
      {
        question: "AI Agents funcionam integrados ao WhatsApp e outros canais?",
        answer:
          "Sim. Plataformas como o UpBro se integram nativamente ao WhatsApp Business, Instagram Direct, webchat e e-mail. A mesma lógica do agent funciona em todos os canais, garantindo consistência na experiência do cliente.",
      },
    ],
    "quanto-custa-implementar-ai-agents": [
      {
        question: "Quanto custa implementar AI Agents na minha empresa?",
        answer:
          "O custo varia de R$5.000 a R$500.000+ dependendo da complexidade. Soluções no-code com plataformas como Relevance AI ou Voiceflow custam R$500-2.000/mês. Projetos custom com LangChain ou CrewAI variam de R$15.000-100.000 de implementação mais R$2.000-10.000/mês de operação.",
      },
      {
        question: "Qual o ROI médio de AI Agents?",
        answer:
          "O ROI médio é de 200-400% no primeiro ano, com payback entre 6-18 meses. Empresas que começam com processos de alto volume e baixa complexidade (como atendimento ao cliente) tendem a ver retorno mais rápido — geralmente em 3-6 meses.",
      },
      {
        question: "AI Agent é mais barato que contratar funcionário?",
        answer:
          "Na maioria dos casos, sim. Um AI Agent de atendimento custa R$1.000-5.000/mês e opera 24/7, enquanto um atendente CLT custa R$4.000-8.000/mês com encargos e trabalha 8h/dia. O agent pode substituir 2-5 funcionários em tarefas repetitivas, mas funciona melhor como complemento à equipe humana.",
      },
      {
        question: "Quais são os custos ocultos de AI Agents?",
        answer:
          "Os principais custos ocultos são: tokens de API (GPT-4, Claude) que escalam com volume, treinamento e ajuste fino do agente, integração com sistemas legados, e manutenção contínua. Planeje 20-30% adicional sobre o custo de implementação para estes itens.",
      },
    ],
  },

  // ────────────────────────────────────────────────────
  // EN — English
  // ────────────────────────────────────────────────────
  en: {
    "what-are-ai-agents": [
      {
        question: "What exactly is an AI Agent?",
        answer:
          "An AI Agent is an autonomous artificial intelligence system capable of perceiving its environment, making decisions, and executing actions to achieve specific goals — without constant human supervision. Unlike traditional chatbots, AI Agents plan sequences of actions and use external tools like APIs, databases, and apps.",
      },
      {
        question: "What is the difference between an AI Agent and a chatbot?",
        answer:
          "Chatbots follow pre-defined scripts and respond to specific questions within a fixed flow. AI Agents are autonomous, make their own decisions, use multiple tools and APIs, and execute complex end-to-end tasks — like researching information, sending emails, and updating systems — all in sequence without human intervention.",
      },
      {
        question: "Which companies are already using AI Agents?",
        answer:
          "Companies like Klarna, Salesforce, ServiceNow, and Esusu are already running AI Agents in production. Klarna implemented an AI Agent that resolves 66% of all support conversations in under 2 minutes — the equivalent of 700 full-time employees.",
      },
      {
        question: "How do I get started with AI Agents for my business?",
        answer:
          "The best starting point is identifying a high-volume repetitive process — like email triage or lead qualification — and running a 30-day pilot. INOVAWAY offers a free diagnosis to identify the right use case for your specific business.",
      },
      {
        question: "Are AI Agents safe for corporate data?",
        answer:
          "Yes, when properly configured. The foundational principle is least privilege: the agent only accesses data required for its specific task. Never grant unrestricted system access. For financial, health, or legal data, consult a specialist before configuration.",
      },
    ],

    "ai-agents-customer-service-247": [
      {
        question: "Can AI Agents handle complex customer questions?",
        answer:
          "Yes. Unlike traditional chatbots that fail on anything outside their script, AI Agents use reasoning to handle nuanced questions. They can access your product catalog, CRM, order history, and policies in real time to give accurate, personalized answers.",
      },
      {
        question: "Will an AI Agent replace my entire customer service team?",
        answer:
          "Not necessarily — and most businesses don't want that. The most effective model is hybrid: the AI Agent automatically handles 60–80% of simple, repetitive requests and escalates to humans only the complex cases that genuinely need personalized attention.",
      },
      {
        question: "How quickly can I deploy an AI Agent for customer service?",
        answer:
          "With modern platforms like UpBro, a functional agent can be live within days. A full deployment with WhatsApp, Instagram, and internal system integrations typically takes 2 to 4 weeks with specialist support.",
      },
      {
        question: "What channels can an AI Agent operate on?",
        answer:
          "Modern AI Agents operate across WhatsApp Business, Instagram Direct, webchat, email, and more. The same agent logic works across all channels, ensuring a consistent customer experience regardless of where the conversation starts.",
      },
      {
        question: "How do I measure the ROI of an AI Agent for customer service?",
        answer:
          "Track three core metrics: tickets resolved without human intervention (deflection rate), average resolution time, and customer satisfaction score. Compare these to your pre-agent baseline. Most INOVAWAY clients reach positive ROI within the first 90 days.",
      },
    ],

    "ai-agents-vs-chatbots": [
      {
        question: "When should I choose a traditional chatbot over an AI Agent?",
        answer:
          "Traditional chatbots still make sense when your support flow is very simple and stable — for example, a static FAQ with 10 questions that rarely change. If customer questions are varied, complex, or open-ended, an AI Agent will deliver far superior results.",
      },
      {
        question: "Are AI Agents more expensive than traditional chatbots?",
        answer:
          "The upfront cost may be higher, but the ROI typically compensates quickly. Traditional chatbots have high maintenance costs — every change requires manually reprogramming the flow — while AI Agents adapt. In the medium term, the total cost of ownership for AI Agents tends to be lower.",
      },
      {
        question: "Can an AI Agent escalate to a human when it doesn't know the answer?",
        answer:
          "Yes — and this is a core feature, not a limitation. Well-configured AI Agents recognize the boundaries of their scope and hand off to a human transparently. This escalation protocol must be defined before launch.",
      },
      {
        question: "Is a generative AI chatbot the same as an AI Agent?",
        answer:
          "Not exactly. A chatbot with generative AI (like GPT) can have more natural conversations but still follows a reactive flow. An AI Agent goes further: it plans, uses external tools, executes actions in systems, and persists goals over time — even without continuous user input.",
      },
    ],

    "how-to-implement-ai-agents-30-days": [
      {
        question: "Do I need a developer to implement AI Agents?",
        answer:
          "Not to get started. Tools like Microsoft Copilot Studio, n8n, and Zapier AI enable no-code deployments. For more complex integrations or advanced use cases, an experienced implementation partner can significantly accelerate your timeline.",
      },
      {
        question: "How quickly can I expect to see results?",
        answer:
          "With the right process, preliminary results typically surface during Week 3 of the pilot. Measurable ROI usually confirms between 30 and 90 days. Global studies show an average payback period of 4.3 months — though simpler use cases can achieve payback in under 60 days.",
      },
      {
        question: "What does it cost to implement an AI Agent?",
        answer:
          "For a basic pilot using no-code tools: roughly $50–200 per month in platform costs, plus internal setup time (estimated at 20–40 total hours spread across four weeks). Enterprise implementations with complex legacy integrations scale proportionally.",
      },
      {
        question: "What if my first use case doesn't work out?",
        answer:
          "Pivoting is part of the process — that's exactly what Week 4 is designed to handle. If the process turned out to be too complex, you've used the framework, collected learning, and now know how to choose better the second time. No sunk cost, just compounding knowledge.",
      },
      {
        question: "How do I protect sensitive data when using AI Agents?",
        answer:
          "Apply the principle of least privilege: the agent should only access data directly required for its specific task. Never grant broad system access. For sensitive domains — financial, health, legal — consult a specialist before configuring the agent's data permissions.",
      },
    ],

    "ai-agents-roi-real-numbers": [
      {
        question: "What is the average ROI of AI Agents?",
        answer:
          "Global studies report an average 171% ROI in the first year for structured implementations (Salesforce, 2025). In Brazil, 93% of companies that adopted AI Agents report positive ROI, according to Google Cloud Brazil (2025).",
      },
      {
        question: "How long does it take to achieve positive ROI with AI Agents?",
        answer:
          "The global average payback period is 4.3 months. Simple implementations, like automated customer service or email triage, frequently reach positive ROI within the first or second month of operation.",
      },
      {
        question: "Do AI Agents work for small businesses?",
        answer:
          "Yes. No-code tools like n8n and Zapier AI have made automation accessible for businesses of any size. Small businesses often see proportionally higher ROI, as the impact of automating a process is more visible in smaller operations.",
      },
      {
        question: "How do I calculate the ROI of an AI Agent?",
        answer:
          "Use this formula: ROI = (Hours saved × Cost per hour of the task) − Monthly tool cost. Define your baseline before implementing: how long the process currently takes and what the associated labor cost is. The difference is your potential return.",
      },
      {
        question: "Which industries see the highest ROI from AI Agents?",
        answer:
          "Customer service, legal, and financial services lead in ROI. A UK law firm reported 671% ROI in the first year. In Brazil, retail, services, and healthcare companies see the biggest gains from automating customer service and lead qualification.",
      },
    ],

    "5-signs-need-ai-agents": [
      {
        question: "How many daily interactions justify implementing an AI Agent?",
        answer:
          "Generally, 30–50 repetitive daily interactions is where an AI Agent starts paying for itself. More important than volume is repetitiveness: if more than 60% of questions are similar, an agent will resolve them efficiently and free your team for higher-value work.",
      },
      {
        question: "How do I know if my business is ready for AI Agents?",
        answer:
          "Assess four criteria: your repetitive processes happen more than 10 times per week; they can be done without constant human review; the necessary data is organized and accessible; and the result is measurable. If you answer yes to three or more, you're ready for a pilot.",
      },
      {
        question: "Do I need my operations 100% organized before implementing an AI Agent?",
        answer:
          "No — but you do need the data for your target process organized. AI Agents amplify what exists: good data yields good results, chaotic data yields amplified errors. Start by organizing the information for the specific use case you'll pilot first.",
      },
      {
        question: "Do AI Agents integrate with WhatsApp and other channels?",
        answer:
          "Yes. Platforms like UpBro integrate natively with WhatsApp Business, Instagram Direct, webchat, and email. The same agent logic runs across all channels, ensuring a consistent customer experience no matter where the conversation begins.",
      },
    ],
    "how-much-ai-agents-cost": [
      {
        question: "How much does it cost to implement AI Agents?",
        answer:
          "Costs range from $1,000 to $500,000+ depending on complexity. No-code platforms like Relevance AI or Voiceflow cost $100-400/month. Custom projects with LangChain or CrewAI range from $3,000-20,000 for implementation plus $500-2,000/month for operations.",
      },
      {
        question: "What is the average ROI of AI Agents?",
        answer:
          "Average ROI is 200-400% in the first year, with payback between 6-18 months. Companies that start with high-volume, low-complexity processes like customer service tend to see returns faster — typically within 3-6 months.",
      },
      {
        question: "Are AI Agents cheaper than hiring employees?",
        answer:
          "In most cases, yes. A customer service AI Agent costs $200-1,000/month and operates 24/7, while a full-time employee costs $3,000-6,000/month with benefits and works 8 hours/day. An agent can replace 2-5 employees in repetitive tasks, but works best as a complement to your human team.",
      },
      {
        question: "What are the hidden costs of AI Agents?",
        answer:
          "The main hidden costs are: API tokens (GPT-4, Claude) that scale with volume, agent training and fine-tuning, integration with legacy systems, and ongoing maintenance. Plan for an additional 20-30% on top of implementation costs for these items.",
      },
    ],
  },
};

/**
 * Get FAQ entries for a given post slug and locale.
 * Returns an empty array if no FAQs are defined.
 */
export function getFAQs(slug: string, locale: string): FAQ[] {
  return faqData[locale]?.[slug] ?? [];
}
