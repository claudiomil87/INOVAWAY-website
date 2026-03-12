"use client";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

interface CounterProps {
  from: number;
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function AnimatedCounter({ from, to, suffix = "", prefix = "", duration = 2 }: CounterProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const statsData = [
  { label: "0", prefix: "", value: 8, suffix: "", display: "8" },
  { label: "1", prefix: "", value: 24, suffix: "/7", display: "24/7" },
  { label: "2", prefix: "< ", value: 1, suffix: "h", display: "< 1h" },
];

export default function SquadStats() {
  const t = useTranslations("SquadStats");

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {statsData.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          className="rounded-xl border border-white/10 bg-[#1E293B]/60 p-6 text-center"
        >
          <div className="text-4xl font-bold text-transparent bg-clip-text mb-2" style={{ backgroundImage: "linear-gradient(135deg, #06B6D4, #8B5CF6)" }}>
            {stat.display}
          </div>
          <p className="text-white/60 text-sm">{t(`stats.${stat.label}.label`)}</p>
        </motion.div>
      ))}
    </div>
  );
}
