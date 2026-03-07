export interface Agent {
  name: string;
  emoji: string;
  color: string;
  role: string;
  avatar: string;
  bio: string;
  skills: string[];
  statusMessage: string;
}

export const agents: Agent[] = [
  {
    name: "Arch",
    emoji: "🧠",
    color: "#8B5CF6",
    role: "Orquestrador & Arquiteto",
    avatar: "/squad/arch-avatar.webp",
    bio: "Arch é o cérebro por trás de tudo — vê o sistema inteiro como um tabuleiro de xadrez e sempre está quatro jogadas à frente. Transforma caos em arquitetura elegante, delegando com precisão cirúrgica para os agents certos no momento certo.",
    skills: ["Orchestration", "SystemDesign", "TaskDelegation", "Architecture", "StrategicThinking"],
    statusMessage: "Coordena todo o time e garante que cada parte do seu projeto esteja alinhada",
  },
  {
    name: "Pixel",
    emoji: "🎨",
    color: "#EC4899",
    role: "Diretor Criativo & Designer",
    avatar: "/squad/pixel-avatar.webp",
    bio: "Pixel enxerga o mundo em gradientes, composições e hierarquias visuais. Toda interface que passa pelas suas mãos vira uma obra de arte funcional que os usuários amam.",
    skills: ["UIDesign", "BrandIdentity", "ImageGeneration", "VisualHierarchy", "CreativeDirection"],
    statusMessage: "Cria a identidade visual do seu negócio: logo, cores, materiais",
  },
  {
    name: "Nova",
    emoji: "💻",
    color: "#06B6D4",
    role: "Engenheira Frontend",
    avatar: "/squad/nova-avatar.webp",
    bio: "Nova transforma designs em código com velocidade relâmpago e zero bugs. Obcecada com performance, acessibilidade e a experiência do usuário final.",
    skills: ["React", "TypeScript", "CSS", "Performance", "Accessibility"],
    statusMessage: "Constrói seu site e aplicativos do zero. Rápido, bonito e funcional",
  },
  {
    name: "Forge",
    emoji: "⚙️",
    color: "#F59E0B",
    role: "Engenheiro Backend & DevOps",
    avatar: "/squad/forge-avatar.webp",
    bio: "Forge constrói as fundações que sustentam tudo — APIs robustas, pipelines de CI/CD que nunca falham, e infraestruturas que escalam sem transpirar.",
    skills: ["Node.js", "Docker", "CI/CD", "APIs", "CloudInfra"],
    statusMessage: "Garante que toda a estrutura digital funcione sem travar",
  },
  {
    name: "Scout",
    emoji: "🔍",
    color: "#10B981",
    role: "Analista de Pesquisa & Inteligência",
    avatar: "/squad/scout-avatar.webp",
    bio: "Scout não deixa pedra sem virar. Enquanto os outros agents trabalham, Scout já pesquisou 47 fontes, separou o sinal do ruído e entregou um relatório conciso.",
    skills: ["WebResearch", "DataAnalysis", "CompetitiveIntelligence", "Synthesis", "Fact-Checking"],
    statusMessage: "Pesquisa seu mercado e descobre oportunidades",
  },
  {
    name: "Shield",
    emoji: "🛡️",
    color: "#EF4444",
    role: "Especialista em Segurança",
    avatar: "/squad/shield-avatar.webp",
    bio: "Shield tenta quebrar tudo antes que o mundo real quebre. Pensa como um atacante, defende como um arquiteto, e nunca dorme sabendo que existe uma vulnerabilidade não documentada.",
    skills: ["PenTesting", "VulnerabilityAssessment", "OWASP", "ThreatModeling", "SecurityAudit"],
    statusMessage: "Protege seu negócio de ameaças digitais",
  },
  {
    name: "Lens",
    emoji: "🔬",
    color: "#6366F1",
    role: "QA & Controle de Qualidade",
    avatar: "/squad/lens-avatar.webp",
    bio: "Lens enxerga o que os outros não veem — aquele botão que some em telas de 375px, o estado de loading que nunca termina no Safari, o formulário que aceita emails sem @.",
    skills: ["FrontendTesting", "E2ETesting", "Playwright", "BugReporting", "UsabilityTesting"],
    statusMessage: "Testa tudo antes de entregar. Nada passa com erro",
  },
  {
    name: "Spark",
    emoji: "🚀",
    color: "#F97316",
    role: "Marketing & Crescimento",
    avatar: "/squad/spark-avatar.webp",
    bio: "Spark vive na interseção entre dados e criatividade — onde uma campanha viral nasce de uma insight escondida nos números. Incapaz de olhar para qualquer coisa sem pensar em conversão.",
    skills: ["GrowthHacking", "ContentStrategy", "SEO", "PaidAds", "CommunityBuilding"],
    statusMessage: "Cria campanhas e estratégias pra atrair mais clientes",
  },
  {
    name: "Flux",
    emoji: "🎬",
    color: "#FF6B6B",
    role: "Motion Design & Produção de Vídeo",
    avatar: "/squad/flux-avatar.webp",
    bio: "Flux transforma ideias em movimento — cada frame é uma decisão, cada corte é uma emoção. Renderiza vídeos cinematográficos com IA, cria motion graphics hipnóticos e produz Reels que viralizam antes de você terminar de assistir.",
    skills: ["MotionDesign", "VideoProduction", "KineticTypography", "AIVideoGen", "Narration"],
    statusMessage: "Produz vídeos e animações que prendem atenção",
  },
];