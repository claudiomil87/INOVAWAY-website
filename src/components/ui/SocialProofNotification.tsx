"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const notifications = [
  "Uma empresa acabou de pedir um diagnóstico grátis",
  "Novo projeto de site profissional iniciado agora",
  "Empresa do setor de saúde solicitou orçamento",
  "Alguém pediu ajuda com identidade visual há pouco",
  "Nova solicitação de proteção digital recebida",
  "Empresa do ramo alimentício contratou o Elite Squad",
  "Pedido de site com funil de vendas recebido agora",
  "Empresa do setor educacional acabou de se cadastrar",
  "Novo pedido de diagnóstico gratuito há 2 minutos",
  "Empresa do varejo solicitou marketing digital",
  "Alguém pediu um site profissional agora mesmo",
  "Nova solicitação de CRM integrado recebida",
  "Empresa do setor imobiliário pediu orçamento",
  "Pedido de identidade visual completa recebido",
  "Empresa do setor jurídico contratou proteção digital",
  "Novo pedido de funil de vendas há 3 minutos",
  "Alguém acabou de solicitar marketing que vende",
  "Empresa do ramo de moda pediu diagnóstico grátis",
  "Nova solicitação de site e CRM integrado recebida",
  "Pedido de pacote completo recebido agora mesmo",
];

const timeLabels = [
  "agora mesmo",
  "há 1 minuto",
  "há 2 minutos",
  "há 3 minutos",
  "há 5 minutos",
  "há 7 minutos",
  "há 10 minutos",
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min) * 1000;
}

export default function SocialProofNotification() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({ message: "", time: "" });
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());

  const showNext = useCallback(() => {
    // Pick a message not recently shown
    let idx = Math.floor(Math.random() * notifications.length);
    let attempts = 0;
    while (usedIndices.has(idx) && attempts < 10) {
      idx = Math.floor(Math.random() * notifications.length);
      attempts++;
    }
    setUsedIndices((prev) => {
      const next = new Set(prev);
      next.add(idx);
      if (next.size > 5) {
        // Reset after 5 to allow re-use
        return new Set([idx]);
      }
      return next;
    });

    setCurrent({
      message: notifications[idx],
      time: getRandomItem(timeLabels),
    });
    setVisible(true);

    // Hide after 4 seconds
    setTimeout(() => setVisible(false), 4000);
  }, [usedIndices]);

  useEffect(() => {
    // Initial delay before first notification (8-15s)
    const initialDelay = getRandomInterval(8, 15);

    const schedule = () => {
      showNext();
      // Schedule next notification
      const nextDelay = getRandomInterval(6, 40);
      return setTimeout(schedule, nextDelay + 4200); // +4.2s for display time
    };

    const initialTimer = setTimeout(schedule, initialDelay);
    return () => clearTimeout(initialTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed bottom-6 left-4 z-[900] max-w-xs pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={current.message}
            initial={{ opacity: 0, x: -60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0F172A]/95 px-4 py-3 shadow-2xl backdrop-blur-sm pointer-events-auto"
            style={{
              boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,255,65,0.08)",
            }}
          >
            {/* Green accent bar */}
            <div
              className="absolute left-0 top-0 h-full w-1 rounded-l-xl"
              style={{ background: "linear-gradient(180deg, #00FF41, #06B6D4)" }}
            />

            <div className="flex items-start gap-3 pl-2">
              <span className="text-lg shrink-0 mt-0.5">🔔</span>
              <div>
                <p className="text-sm text-white/90 leading-snug">{current.message}</p>
                <p className="mt-1 text-xs text-white/40">{current.time}</p>
              </div>
            </div>

            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5"
              style={{ background: "linear-gradient(90deg, #00FF41, #06B6D4)" }}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 4, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
