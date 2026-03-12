"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

const statsConfig = [
  { value: "+200", numeric: 200, prefix: "+", suffix: "", color: "#00FF41" },
  { value: "24h", color: "#06B6D4" },
  { value: "98%", numeric: 98, suffix: "%", color: "#8B5CF6" },
  { value: "9", numeric: 9, suffix: "", color: "#00FF41" },
];

function AnimatedNumber({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration: 1.5,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [inView, value, motionValue]);

  return (
    <motion.span ref={ref}>
      {prefix}<motion.span>{rounded}</motion.span>{suffix}
    </motion.span>
  );
}

export default function StatsSection() {
  const t = useTranslations("StatsSection");

  const stats = statsConfig.map((cfg, i) => ({
    ...cfg,
    label: t(`stats.${i}.label`),
  }));

  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center"
        >
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {t("title")}{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #00FF41, #06B6D4)",
              }}
            >
              {t("titleGradient")}
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/50">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
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
                  <AnimatedNumber value={stat.numeric} suffix={stat.suffix} prefix={stat.prefix} />
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
