"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Agent } from "./agents-data";

interface AgentModalProps {
  agent: Agent | null;
  onClose: () => void;
}

export default function AgentModal({ agent, onClose }: AgentModalProps) {
  const tAgents = useTranslations("Agents");
  return (
    <AnimatePresence>
      {agent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative w-full max-w-md rounded-2xl border bg-[#0F172A] p-6"
            style={{ borderColor: `${agent.color}60`, boxShadow: `0 0 40px ${agent.color}30` }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors text-xl">
              ✕
            </button>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-full mb-3" style={{ boxShadow: `0 0 20px ${agent.color}80` }}>
                <Image src={agent.avatar} alt={agent.name} fill className="object-cover" sizes="96px" />
              </div>
              <h2 className="text-2xl font-bold text-white">{agent.emoji} {agent.name}</h2>
              <p className="text-sm mt-1" style={{ color: agent.color }}>{tAgents(`${agent.name}.role`)}</p>
            </div>

            {/* Status */}
            <div className="rounded-lg p-3 mb-4 font-mono text-sm text-center" style={{ backgroundColor: `${agent.color}15`, color: agent.color }}>
              "{tAgents(`${agent.name}.statusMessage`)}"
            </div>

            {/* Bio */}
            <p className="text-white/70 text-sm leading-relaxed mb-4">{tAgents(`${agent.name}.bio`)}</p>

            {/* All skills */}
            <div className="flex flex-wrap gap-1.5">
              {agent.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full px-2.5 py-1 text-xs font-medium"
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}