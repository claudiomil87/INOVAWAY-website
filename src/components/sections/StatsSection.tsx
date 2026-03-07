"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatItem {
  value: string;
  label: string;
  numeric?: number;
  suffix?: string;
  color: string;
}

const stats: StatItem[] = [
  {
    value: "9",
    numeric: 9,
    suffix: "",
    label: "AI Agents especializados",
    color: "#00FF41",
  },
  {
    value: "24/7",
    label: "Operação contínua",
    color: "#06B6D4",
  },
  {
    value: "Horas",
    label: "Tempo de entrega",
    color: "#8B5CF6",
  },
  {
    value: "100%",
    numeric: 100,
    suffix: "%",
    label: "Automatizado",
    color: "#00FF41",
  },
];

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Números que{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #00FF41, #06B6D4)",
              }}
            >
              falam
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 text-center"
            >
              <div
                className="mb-2 text-4xl font-bold tracking-tight md:text-5xl"
                style={{ color: stat.color }}
              >
                {stat.numeric !== undefined ? (
                  <AnimatedNumber value={stat.numeric} suffix={stat.suffix} />
                ) : (
                  stat.value
                )}
              </div>
              <p className="text-sm text-white/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
