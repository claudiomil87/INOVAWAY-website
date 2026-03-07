"use client";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface GlowCardProps {
  children: ReactNode;
  glowColor?: string;
  className?: string;
}

export default function GlowCard({
  children,
  glowColor = "#00FF41",
  className = "",
}: GlowCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`rounded-xl border bg-white/5 transition-all duration-300 ${className}`}
      style={{
        borderColor: hovered ? `${glowColor}40` : "rgba(255,255,255,0.08)",
        boxShadow: hovered ? `0 0 24px ${glowColor}20, 0 0 48px ${glowColor}10` : "none",
      }}
    >
      {children}
    </motion.div>
  );
}
