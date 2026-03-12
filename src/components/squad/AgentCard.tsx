"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Agent } from "./agents-data";

interface AgentCardProps {
  agent: Agent;
  index: number;
  onSelect: (agent: Agent) => void;
}

export default function AgentCard({ agent, index, onSelect }: AgentCardProps) {
  const t = useTranslations("AgentCard");
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
      className="group relative cursor-pointer rounded-2xl border bg-[#1E293B] p-5 transition-shadow flex flex-row sm:flex-col items-center sm:items-stretch gap-4 sm:gap-0"
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
        <span className="hidden sm:inline text-xs text-green-400 font-mono">{t("online")}</span>
      </div>

      {/* Avatar — shrink-0 on mobile so it doesn't flex-shrink */}
      <div className="relative shrink-0 mx-auto sm:mx-auto mb-0 sm:mb-4 h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-[#1E293B]" style={{ boxShadow: `0 0 12px ${agent.color}60, 0 0 0 2px ${agent.color}` }}>
        <Image src={agent.avatar} alt={`${agent.name} avatar`} fill className="object-cover" sizes="80px" loading="lazy" />
      </div>

      {/* Content — takes remaining space on mobile row */}
      <div className="flex-1 min-w-0">
        {/* Name */}
        <div className="text-left sm:text-center mb-1">
          <span className="text-base sm:text-lg font-bold text-white">{agent.emoji} {agent.name}</span>
        </div>

        {/* Role */}
        <p className="text-left sm:text-center text-xs text-white/50 mb-2 sm:mb-3 leading-tight">{agent.role}</p>

        {/* Status message */}
        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-left sm:text-center text-xs font-mono mb-3 overflow-hidden"
              style={{ color: agent.color }}
            >
              &quot;{agent.statusMessage}&quot;
            </motion.p>
          )}
        </AnimatePresence>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 justify-start sm:justify-center">
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
          className="mt-2 text-left sm:text-center text-xs text-white/30"
        >
          {t("clickHintFull")}
        </motion.div>
      </div>
    </motion.div>
  );
}
