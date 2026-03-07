"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import AgentModal from "@/components/squad/AgentModal";
import SquadTerminal from "@/components/squad/SquadTerminal";
import SquadStats from "@/components/squad/SquadStats";
import { agents, type Agent } from "@/components/squad/agents-data";

// Bento grid config per agent
const bentoConfig: Record<string, string> = {
  Arch: "col-span-2 row-span-2", // large 2x2
  Pixel: "col-span-2 row-span-1", // medium 2x1
  Nova: "col-span-2 row-span-1", // medium 2x1
  Forge: "col-span-1 row-span-1",
  Scout: "col-span-1 row-span-1",
  Shield: "col-span-1 row-span-1",
  Lens: "col-span-1 row-span-1",
  Spark: "col-span-1 row-span-1",
  Flux: "col-span-1 row-span-1",
};

interface BentoAgentCardProps {
  agent: Agent;
  index: number;
  large?: boolean;
  onSelect: (agent: Agent) => void;
}

function BentoAgentCard({ agent, index, large = false, onSelect }: BentoAgentCardProps) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const maxDeg = 5;
    const rotateY = ((e.clientX - cx) / (rect.width / 2)) * maxDeg;
    const rotateX = -((e.clientY - cy) / (rect.height / 2)) * maxDeg;
    setTilt({ rotateX, rotateY });
    e.currentTarget.style.boxShadow = `0 0 24px ${agent.color}30, 0 0 48px ${agent.color}12`;
    e.currentTarget.style.borderColor = `${agent.color}60`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setTilt({ rotateX: 0, rotateY: 0 });
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.borderColor = `${agent.color}30`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onClick={() => onSelect(agent)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card relative cursor-pointer rounded-2xl border bg-[#1E293B] p-5 overflow-hidden transition-all duration-200 ${bentoConfig[agent.name] ?? "col-span-1 row-span-1"}`}
      style={{
        transform: `perspective(600px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        borderColor: `${agent.color}30`,
        boxShadow: `0 0 0 transparent`,
        transition: "box-shadow 0.2s, border-color 0.2s, transform 0.1s",
      }}
    >
      {/* Status badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="text-xs text-emerald-400 font-mono">Online</span>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${agent.color}08 0%, transparent 60%)` }}
      />

      <div className={`flex ${large ? "flex-col items-center text-center" : "flex-col items-center text-center"} gap-4`}>
        {/* Avatar */}
        <div
          className={`relative overflow-hidden rounded-full shrink-0 ${large ? "h-24 w-24" : "h-16 w-16"}`}
          style={{
            boxShadow: `0 0 16px ${agent.color}50, 0 0 0 2px ${agent.color}60`,
          }}
        >
          <Image
            src={agent.avatar}
            alt={`${agent.name} avatar`}
            fill
            className="object-cover"
            sizes={large ? "96px" : "64px"}
            loading="lazy"
          />
        </div>

        <div className={large ? "w-full" : ""}>
          <p className={`font-bold text-white ${large ? "text-xl mb-1" : "text-base mb-0.5"}`}>
            {agent.emoji} {agent.name}
          </p>
          <p className="text-xs text-white/50 leading-tight mb-2">{agent.role}</p>

          {large && (
            <p className="text-sm text-white/40 italic mb-3 font-mono">
              "{agent.statusMessage}"
            </p>
          )}

          {/* Skills */}
          <div className="flex flex-wrap gap-1 justify-center">
            {agent.skills.slice(0, large ? 5 : 2).map((skill) => (
              <span
                key={skill}
                className="rounded-full px-2 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: `${agent.color}20`,
                  color: agent.color,
                  border: `1px solid ${agent.color}30`,
                }}
              >
                #{skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-white/20 transition-opacity duration-200 hover:text-white/40">
        clique para ver perfil →
      </p>
    </motion.div>
  );
}

export default function SquadSection() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <section id="squad" className="relative px-4 py-16 md:py-24" style={{ backgroundColor: "rgba(30,41,59,0.2)" }}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00FF41]/30 bg-[#00FF41]/10 px-4 py-1.5 text-sm text-[#00FF41]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00FF41]" />
            Sempre online
          </div>
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #00FF41, #8B5CF6)" }}
            >
              Elite Squad
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            9 AI Agents especializados trabalhando em sinergia. Clique em qualquer agent para conhecer seu perfil.
          </p>
        </motion.div>

        {/* ── Desktop Bento Grid ── */}
        <div className="hidden md:grid grid-cols-4 gap-4 auto-rows-[220px]">
          {agents.map((agent, i) => (
            <BentoAgentCard
              key={agent.name}
              agent={agent}
              index={i}
              large={agent.name === "Arch"}
              onSelect={setSelectedAgent}
            />
          ))}
          {/* Terminal spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="col-span-2 row-span-2"
          >
            <SquadTerminal />
          </motion.div>
        </div>

        {/* ── Mobile: 1 per row horizontal ── */}
        <div className="flex flex-col gap-4 md:hidden">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setSelectedAgent(agent)}
              className="relative flex flex-row items-center gap-4 cursor-pointer rounded-xl border border-white/10 bg-[#1E293B] p-4"
              style={{ borderColor: `${agent.color}30` }}
            >
              {/* Status */}
              <span className="absolute top-3 right-3 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              {/* Avatar */}
              <div
                className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full"
                style={{ boxShadow: `0 0 12px ${agent.color}50, 0 0 0 2px ${agent.color}60` }}
              >
                <Image src={agent.avatar} alt={agent.name} fill className="object-cover" sizes="56px" loading="lazy" />
              </div>
              <div>
                <p className="font-bold text-white">{agent.emoji} {agent.name}</p>
                <p className="text-xs text-white/50">{agent.role}</p>
              </div>
            </motion.div>
          ))}

          {/* Mobile terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4"
          >
            <SquadTerminal />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10"
        >
          <SquadStats />
        </motion.div>
      </div>

      {/* Modal */}
      <AgentModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
    </section>
  );
}
