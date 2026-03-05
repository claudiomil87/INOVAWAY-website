"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { Agent } from "./agents-data";

interface AgentCardProps {
  agent: Agent;
  index: number;
  onSelect: (agent: Agent) => void;
}

export default function AgentCard({ agent, index, onSelect }: AgentCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onSelect(agent)}
      className="group relative cursor-pointer rounded-2xl border bg-[#1E293B] p-5 transition-shadow"
      style={{
        borderColor: hovered ? agent.color : "rgba(255,255,255,0.1)",
        boxShadow: hovered ? `0 0 20px ${agent.color}40, 0 0 40px ${agent.color}20` : "none",
      }}
    >
      {/* Status dot */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
        </span>
        <span className="text-xs text-green-400 font-mono">Online</span>
      </div>

      {/* Avatar */}
      <div className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-[#1E293B]" style={{ boxShadow: `0 0 12px ${agent.color}60, 0 0 0 2px ${agent.color}` }}>
        <Image src={agent.avatar} alt={`${agent.name} avatar`} fill className="object-cover" sizes="80px" loading="lazy" />
      </div>

      {/* Name */}
      <div className="text-center mb-1">
        <span className="text-lg font-bold text-white">{agent.emoji} {agent.name}</span>
      </div>

      {/* Role */}
      <p className="text-center text-xs text-white/50 mb-3 leading-tight">{agent.role}</p>

      {/* Status message */}
      <AnimatePresence>
        {hovered && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-center text-xs font-mono mb-3 overflow-hidden"
            style={{ color: agent.color }}
          >
            "{agent.statusMessage}"
          </motion.p>
        )}
      </AnimatePresence>

      {/* Skills */}
      <div className="flex flex-wrap gap-1 justify-center">
        {agent.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="rounded-full px-2 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: `${agent.color}20`,
              color: agent.color,
              border: `1px solid ${agent.color}40`,
            }}
          >
            #{skill}
          </span>
        ))}
      </div>

      {/* Click hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        className="mt-3 text-center text-xs text-white/30"
      >
        Clique para ver perfil completo →
      </motion.div>
    </motion.div>
  );
}