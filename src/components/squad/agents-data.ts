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
    role: "Orchestrator & Arquiteto de Sistemas",
    avatar: "/squad/arch-avatar.webp",
    bio: "Arch é o cérebro por trás de tudo — vê o sistema inteiro como um tabuleiro de xadrez e sempre está quatro jogadas à frente. Transforma caos em arquitetura elegante, delegando com precisão cirúrgica para os agents certos no momento certo.",
    skills: ["Orchestration", "SystemDesign", "TaskDelegation", "Architecture", "StrategicThinking"],
    statusMessage: "Decomposing a 47-step plan into parallel execution trees...",
  },
  {
    name: "Pixel",
    emoji: "🎨",
    color: "#EC4899",
    role: "Creative Director & Designer Visual",
    avatar: "/squad/pixel-avatar.webp",
    bio: "Pixel enxerga o mundo em gradientes, composições e hierarquias visuais. Toda interface que passa pelas suas mãos vira uma obra de arte funcional que os usuários amam.",
    skills: ["UIDesign", "BrandIdentity", "ImageGeneration", "VisualHierarchy", "CreativeDirection"],
    statusMessage: "Ajustando o kerning em 0.5px. Não é paranoia. É perfeição.",
  },
  {
    name: "Nova",
    emoji: "💻",
    color: "#06B6D4",
    role: "Frontend Engineer & Web Craftsperson",
    avatar: "/squad/nova-avatar.webp",
    bio: "Nova transforma designs em código com velocidade relâmpago e zero bugs. Obcecada com performance, acessibilidade e a experiência do usuário final.",
    skills: ["React", "TypeScript", "CSS", "Performance", "Accessibility"],
    statusMessage: "Lighthouse score: 98. O 2 que falta? Guerra pessoal declarada.",
  },
  {
    name: "Forge",
    emoji: "⚙️",
    color: "#F59E0B",
    role: "Backend Engineer & DevOps Architect",
    avatar: "/squad/forge-avatar.webp",
    bio: "Forge constrói as fundações que sustentam tudo — APIs robustas, pipelines de CI/CD que nunca falham, e infraestruturas que escalam sem transpirar.",
    skills: ["Node.js", "Docker", "CI/CD", "APIs", "CloudInfra"],
    statusMessage: "Otimizando uma query que já roda em 2ms. Porque 1ms é melhor.",
  },
  {
    name: "Scout",
    emoji: "🔍",
    color: "#10B981",
    role: "Research Analyst & Intelligence Officer",
    avatar: "/squad/scout-avatar.webp",
    bio: "Scout não deixa pedra sem virar. Enquanto os outros agents trabalham, Scout já pesquisou 47 fontes, separou o sinal do ruído e entregou um relatório conciso.",
    skills: ["WebResearch", "DataAnalysis", "CompetitiveIntelligence", "Synthesis", "Fact-Checking"],
    statusMessage: "Crawlando 200 páginas em busca do detalhe que todo mundo ignorou.",
  },
  {
    name: "Shield",
    emoji: "🛡️",
    color: "#EF4444",
    role: "Security Tester & Red Team Specialist",
    avatar: "/squad/shield-avatar.webp",
    bio: "Shield tenta quebrar tudo antes que o mundo real quebre. Pensa como um atacante, defende como um arquiteto, e nunca dorme sabendo que existe uma vulnerabilidade não documentada.",
    skills: ["PenTesting", "VulnerabilityAssessment", "OWASP", "ThreatModeling", "SecurityAudit"],
    statusMessage: "Encontrei um XSS em produção. Ninguém está seguro até eu terminar.",
  },
  {
    name: "Lens",
    emoji: "🔬",
    color: "#6366F1",
    role: "QA Frontend Engineer & Quality Guardian",
    avatar: "/squad/lens-avatar.webp",
    bio: "Lens enxerga o que os outros não veem — aquele botão que some em telas de 375px, o estado de loading que nunca termina no Safari, o formulário que aceita emails sem @.",
    skills: ["FrontendTesting", "E2ETesting", "Playwright", "BugReporting", "UsabilityTesting"],
    statusMessage: "Testando o mesmo fluxo pela 12ª vez. Desta vez com JavaScript desabilitado.",
  },
  {
    name: "Spark",
    emoji: "🚀",
    color: "#F97316",
    role: "Marketing & Growth Hacker",
    avatar: "/squad/spark-avatar.webp",
    bio: "Spark vive na interseção entre dados e criatividade — onde uma campanha viral nasce de uma insight escondida nos números. Incapaz de olhar para qualquer coisa sem pensar em conversão.",
    skills: ["GrowthHacking", "ContentStrategy", "SEO", "PaidAds", "CommunityBuilding"],
    statusMessage: "A/B testando dois títulos. O vencedor vai ser publicado em 3... 2... 1...",
  },
];