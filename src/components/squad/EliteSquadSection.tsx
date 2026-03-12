"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SquadHero from "./SquadHero";
import AgentCard from "./AgentCard";
import AgentModal from "./AgentModal";
import SquadTerminal from "./SquadTerminal";
import SquadStats from "./SquadStats";
import { agents, type Agent } from "./agents-data";

export default function EliteSquadSection() {
  const t = useTranslations("EliteSquadSection");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <>
      {/* Hero */}
      <SquadHero />

      <div className="px-4 pb-20">
        <div className="mx-auto max-w-6xl space-y-16">
          {/* Stats */}
          <SquadStats />

          {/* Agent Grid */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-white mb-8 text-center"
            >
              {t("agentsTitle")}{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #06B6D4, #8B5CF6)" }}>
                {t("agentsGradient")}
              </span>
            </motion.h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {agents.map((agent, i) => (
                <AgentCard key={agent.name} agent={agent} index={i} onSelect={setSelectedAgent} />
              ))}
            </div>
          </div>

          {/* Terminal */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-white mb-6 text-center"
            >
              {t("terminalTitle")}{" "}
              <span className="text-[#00FF41]">{t("terminalGradient")}</span>
            </motion.h2>
            <SquadTerminal />
          </div>
        </div>
      </div>

      {/* Modal */}
      <AgentModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
    </>
  );
}
