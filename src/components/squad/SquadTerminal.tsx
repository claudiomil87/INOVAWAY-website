"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { agents } from "./agents-data";

interface TerminalLine {
  id: number;
  timestamp: string;
  agentEmoji: string;
  agentName: string;
  agentColor: string;
  message: string;
}

const agentMessagesPt: Record<string, string[]> = {
  Arch: [
    "Delegando tarefa #18 para Nova...",
    "Analisando arquitetura do sistema...",
    "Orquestrando agents em paralelo...",
    "Decompondo fluxo em árvores paralelas..."
  ],
  Pixel: [
    "Gerando assets da marca...",
    "Refinando paleta de cores...",
    "Desenhando novos componentes visuais...",
    "Ajustando tipografia e hierarquia..."
  ],
  Nova: [
    "Construindo componentes interativos...",
    "Otimizando performance: 98kb → 92kb",
    "Corrigindo layout mobile em 375px...",
    "Lighthouse score: 98/100 ✓"
  ],
  Forge: [
    "Publicando em produção... ✓",
    "Executando pipeline de deploy...",
    "Escalando infraestrutura 3x",
    "Containers Docker saudáveis"
  ],
  Scout: [
    "Analisando tendências do mercado...",
    "Pesquisando 47 fontes...",
    "Sintetizando relatório de inteligência...",
    "Análise competitiva concluída"
  ],
  Shield: [
    "Executando auditoria de segurança...",
    "Testando segurança OWASP top 10...",
    "Corrigindo vulnerabilidade XSS...",
    "Pen test: 0 problemas críticos"
  ],
  Lens: [
    "Suite E2E: 142/142 aprovados ✓",
    "Testando em 12 resoluções...",
    "Registrando edge case #37...",
    "Auditoria de acessibilidade concluída"
  ],
  Spark: [
    "Testando variações de título A/B...",
    "Otimizando funil de conversão...",
    "CTR melhorou 23%",
    "Criando estratégia de conteúdo viral..."
  ],
  Flux: [
    "Renderizando 450 frames em paralelo...",
    "Veo 2: gerando clipe cinematográfico...",
    "Compondo narração + motion graphics",
    "Reel pronto: 15s vertical @ 30fps ✓"
  ],
};

const agentMessagesEn: Record<string, string[]> = {
  Arch: [
    "Delegating task #18 to Nova...",
    "Analyzing system architecture...",
    "Orchestrating agents in parallel...",
    "Decomposing flow into parallel trees..."
  ],
  Pixel: [
    "Generating brand assets...",
    "Refining color palette...",
    "Designing new visual components...",
    "Adjusting typography and hierarchy..."
  ],
  Nova: [
    "Building interactive components...",
    "Optimizing performance: 98kb → 92kb",
    "Fixing mobile layout at 375px...",
    "Lighthouse score: 98/100 ✓"
  ],
  Forge: [
    "Publishing to production... ✓",
    "Running deploy pipeline...",
    "Scaling infrastructure 3x",
    "Docker containers healthy"
  ],
  Scout: [
    "Analyzing market trends...",
    "Researching 47 sources...",
    "Synthesizing intelligence report...",
    "Competitive analysis complete"
  ],
  Shield: [
    "Running security audit...",
    "Testing OWASP top 10 security...",
    "Fixing XSS vulnerability...",
    "Pen test: 0 critical issues"
  ],
  Lens: [
    "E2E suite: 142/142 passed ✓",
    "Testing across 12 resolutions...",
    "Logging edge case #37...",
    "Accessibility audit complete"
  ],
  Spark: [
    "A/B testing headline variations...",
    "Optimizing conversion funnel...",
    "CTR improved 23%",
    "Creating viral content strategy..."
  ],
  Flux: [
    "Rendering 450 frames in parallel...",
    "Veo 2: generating cinematic clip...",
    "Composing narration + motion graphics",
    "Reel ready: 15s vertical @ 30fps ✓"
  ],
};

function getTimestamp() {
  return new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

let lineCounter = 0;

export default function SquadTerminal() {
  const locale = useLocale();
  const agentMessages = locale === "en" ? agentMessagesEn : agentMessagesPt;
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const agentIndexRef = useRef(0);
  const msgIndexRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const addLine = () => {
      const agent = agents[agentIndexRef.current % agents.length];
      const msgs = agentMessages[agent.name] ?? ["Working..."];
      const msgIdx = (msgIndexRef.current[agent.name] ?? 0) % msgs.length;
      msgIndexRef.current[agent.name] = msgIdx + 1;

      const line: TerminalLine = {
        id: lineCounter++,
        timestamp: getTimestamp(),
        agentEmoji: agent.emoji,
        agentName: agent.name,
        agentColor: agent.color,
        message: msgs[msgIdx],
      };

      setLines((prev) => [...prev.slice(-9), line]);
      agentIndexRef.current++;
    };

    addLine(); // initial
    const interval = setInterval(addLine, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="rounded-xl overflow-hidden border border-[#00FF41]/30">
      {/* Terminal header */}
      <div className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2.5 border-b border-[#00FF41]/20">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs font-mono text-white/40">squad-activity.log — live</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00FF41] animate-pulse" />
          <span className="text-xs font-mono text-[#00FF41]">LIVE</span>
        </span>
      </div>

      {/* Terminal body */}
      <div ref={containerRef} className="bg-[#060606] p-4 h-36 overflow-y-auto font-mono text-sm">
        {lines.map((line) => (
          <div key={line.id} className="flex gap-2 mb-1.5 leading-relaxed">
            <span className="text-white/30 shrink-0">[{line.timestamp}]</span>
            <span className="shrink-0">{line.agentEmoji}</span>
            <span className="font-bold shrink-0" style={{ color: line.agentColor }}>{line.agentName}</span>
            <span className="text-white/40 shrink-0">→</span>
            <span className="text-[#00FF41]">{line.message}</span>
          </div>
        ))}

      </div>
    </div>
  );
}