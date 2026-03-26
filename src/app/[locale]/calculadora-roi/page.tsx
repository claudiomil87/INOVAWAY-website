"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Calculator,
  TrendingUp,
  Clock,
  DollarSign,
  Zap,
  CheckCircle,
} from "lucide-react";

// Cost of implementation by team size (R$ / USD)
const IMPL_COSTS: Record<string, number> = {
  "1-5": 5000,
  "6-15": 15000,
  "16-50": 40000,
  "50+": 80000,
};

function formatCurrency(value: number, locale: string) {
  if (locale === "en") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

interface ResultCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}

function ResultCard({ icon, label, value, accent }: ResultCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl p-5 border"
      style={{
        background: accent
          ? "rgba(0,255,65,0.07)"
          : "rgba(255,255,255,0.04)",
        borderColor: accent
          ? "rgba(0,255,65,0.25)"
          : "rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="mt-0.5 p-2 rounded-lg shrink-0"
          style={{
            background: accent
              ? "rgba(0,255,65,0.15)"
              : "rgba(6,182,212,0.15)",
          }}
        >
          {icon}
        </div>
        <div>
          <p className="text-xs text-white/55 mb-1">{label}</p>
          <p
            className="text-xl font-bold"
            style={{ color: accent ? "#00FF41" : "#06B6D4" }}
          >
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function CalculadoraROIPage() {
  const t = useTranslations("ROICalculator");
  const locale = useLocale();

  // Form state
  const [atendimentos, setAtendimentos] = useState(500);
  const [custo, setCusto] = useState(15);
  const [horas, setHoras] = useState(20);
  const [equipe, setEquipe] = useState("6-15");
  const [setor, setSetor] = useState("Tech");

  // Results state
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<{
    monthly: number;
    annual: number;
    hoursRecovered: number;
    roi: number;
    payback: number;
    implCost: number;
    beforeMonthly: number;
  } | null>(null);

  // Lead capture state
  const [email, setEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  function calculate() {
    const implCost = IMPL_COSTS[equipe] ?? 15000;
    const beforeMonthly = atendimentos * custo;
    const monthly = beforeMonthly * 0.65;
    const annual = monthly * 12;
    const hoursRecovered = horas * 4 * 0.7;
    const roi = ((annual - implCost) / implCost) * 100;
    const payback = implCost / monthly;

    setResults({ monthly, annual, hoursRecovered, roi, payback, implCost, beforeMonthly });
    setShowResults(true);

    setTimeout(() => {
      document
        .getElementById("roi-results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  async function sendLead() {
    if (!email || !results) return;
    setLeadStatus("sending");

    const payload = {
      email,
      locale,
      estimatedSaving: formatCurrency(results.annual, locale),
    };

    try {
      const res = await fetch("/api/roi-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("API error");
      setLeadStatus("success");
    } catch (error) {
      console.error("Failed to send ROI lead:", error);
      setLeadStatus("error");
    }
  }

  const atendimentosPct = ((atendimentos - 50) / (10000 - 50)) * 100;
  const horasPct = ((horas - 5) / (80 - 5)) * 100;

  const baseInputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
  };

  const inputClass =
    "w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all focus:ring-2 focus:ring-[#00FF41]/50";

  return (
    <main
      className="min-h-screen"
      style={{ background: "#0F172A", color: "#ffffff" }}
    >
      {/* ─── Hero ─── */}
      <section className="pt-24 pb-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            {/* Scout badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-medium"
              style={{
                background: "rgba(0,255,65,0.1)",
                border: "1px solid rgba(0,255,65,0.2)",
                color: "#00FF41",
              }}
            >
              {t("hero.badge")}
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-3">
              {t("hero.title")}
              <span
                className="block text-2xl md:text-3xl font-normal mt-2"
                style={{ color: "#06B6D4" }}
              >
                {t("hero.subtitle")}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-white/60 max-w-2xl mx-auto"
            >
              {t("hero.description")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── Form + Results ─── */}
      <section className="px-4 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* ── Form Card ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl p-6 md:p-8 sticky top-24"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Calculator size={20} style={{ color: "#00FF41" }} />
                {t("form.title")}
              </h2>

              <div className="space-y-6">
                {/* Atendimentos — slider */}
                <div>
                  <label className="flex justify-between text-sm font-medium text-white/80 mb-3">
                    <span>{t("form.atendimentos.label")}</span>
                    <span className="font-bold" style={{ color: "#00FF41" }}>
                      {atendimentos.toLocaleString()}
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min={50}
                      max={10000}
                      step={50}
                      value={atendimentos}
                      onChange={(e) => setAtendimentos(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer outline-none"
                      style={{
                        background: `linear-gradient(to right, #00FF41 0%, #00FF41 ${atendimentosPct}%, rgba(255,255,255,0.15) ${atendimentosPct}%, rgba(255,255,255,0.15) 100%)`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-white/35 mt-1">
                    <span>50</span>
                    <span>10.000</span>
                  </div>
                  <p className="text-xs text-white/40 mt-1">
                    {t("form.atendimentos.help")}
                  </p>
                </div>

                {/* Custo por atendimento */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    {t("form.custo.label")}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={custo}
                    onChange={(e) => setCusto(Number(e.target.value))}
                    placeholder={t("form.custo.placeholder")}
                    className={inputClass}
                    style={baseInputStyle}
                  />
                  <p className="text-xs text-white/40 mt-1">
                    {t("form.custo.help")}
                  </p>
                </div>

                {/* Horas repetitivas — slider */}
                <div>
                  <label className="flex justify-between text-sm font-medium text-white/80 mb-3">
                    <span>{t("form.horas.label")}</span>
                    <span className="font-bold" style={{ color: "#06B6D4" }}>
                      {horas}h
                    </span>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={80}
                    step={1}
                    value={horas}
                    onChange={(e) => setHoras(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer outline-none"
                    style={{
                      background: `linear-gradient(to right, #06B6D4 0%, #06B6D4 ${horasPct}%, rgba(255,255,255,0.15) ${horasPct}%, rgba(255,255,255,0.15) 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-white/35 mt-1">
                    <span>5h</span>
                    <span>80h</span>
                  </div>
                  <p className="text-xs text-white/40 mt-1">
                    {t("form.horas.help")}
                  </p>
                </div>

                {/* Tamanho da equipe */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    {t("form.equipe.label")}
                  </label>
                  <select
                    value={equipe}
                    onChange={(e) => setEquipe(e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                    style={{ ...baseInputStyle, colorScheme: "dark" }}
                  >
                    {(["1-5", "6-15", "16-50", "50+"] as const).map((key) => (
                      <option key={key} value={key}>
                        {t(`form.equipe.options.${key}`)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Setor */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    {t("form.setor.label")}
                  </label>
                  <select
                    value={setor}
                    onChange={(e) => setSetor(e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                    style={{ ...baseInputStyle, colorScheme: "dark" }}
                  >
                    {(
                      [
                        "Varejo",
                        "Saude",
                        "Financeiro",
                        "Juridico",
                        "Tech",
                        "Outro",
                      ] as const
                    ).map((key) => (
                      <option key={key} value={key}>
                        {t(`form.setor.options.${key}`)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Calculate Button */}
                <motion.button
                  onClick={calculate}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl font-bold text-base transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #00FF41 0%, #06B6D4 100%)",
                    color: "#0F172A",
                    boxShadow: "0 0 24px rgba(0,255,65,0.25)",
                  }}
                >
                  {t("form.calculate")}
                </motion.button>
              </div>
            </motion.div>

            {/* ── Results Panel ── */}
            <div id="roi-results" className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {showResults && results ? (
                  <motion.div
                    key="results"
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="space-y-4"
                  >
                    <motion.h2
                      variants={fadeUp}
                      className="text-xl font-bold flex items-center gap-2 mb-6"
                    >
                      <TrendingUp size={20} style={{ color: "#00FF41" }} />
                      {t("results.title")}
                    </motion.h2>

                    {/* Metric cards */}
                    <ResultCard
                      icon={
                        <DollarSign
                          size={18}
                          style={{ color: "#00FF41" }}
                        />
                      }
                      label={t("results.monthly")}
                      value={formatCurrency(results.monthly, locale)}
                      accent
                    />
                    <ResultCard
                      icon={
                        <Zap size={18} style={{ color: "#06B6D4" }} />
                      }
                      label={t("results.annual")}
                      value={formatCurrency(results.annual, locale)}
                    />
                    <ResultCard
                      icon={
                        <Clock size={18} style={{ color: "#06B6D4" }} />
                      }
                      label={t("results.hours")}
                      value={`${Math.round(results.hoursRecovered)} ${t(
                        "results.hoursUnit"
                      )}`}
                    />
                    <ResultCard
                      icon={
                        <TrendingUp
                          size={18}
                          style={{ color: "#00FF41" }}
                        />
                      }
                      label={t("results.roi")}
                      value={`${Math.round(results.roi)}%`}
                      accent
                    />
                    <ResultCard
                      icon={
                        <Calculator
                          size={18}
                          style={{ color: "#06B6D4" }}
                        />
                      }
                      label={t("results.payback")}
                      value={`${Math.round(results.payback)} ${t(
                        "results.paybackUnit"
                      )}`}
                    />

                    {/* Bar chart: Before vs After */}
                    <motion.div
                      variants={fadeUp}
                      className="rounded-2xl p-5"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <p className="text-xs font-medium text-white/50 mb-4 uppercase tracking-wider">
                        {locale === "en"
                          ? "Cost Comparison / Month"
                          : "Comparação de Custo / Mês"}
                      </p>
                      <div className="space-y-4">
                        {/* Before */}
                        <div>
                          <div className="flex justify-between text-xs text-white/50 mb-1.5">
                            <span>{t("results.chart.before")}</span>
                            <span>
                              {formatCurrency(results.beforeMonthly, locale)}
                            </span>
                          </div>
                          <div
                            className="h-7 rounded-lg overflow-hidden"
                            style={{ background: "rgba(255,255,255,0.06)" }}
                          >
                            <div
                              className="h-full rounded-lg"
                              style={{
                                width: "100%",
                                background: "rgba(239,68,68,0.55)",
                              }}
                            />
                          </div>
                        </div>
                        {/* After */}
                        <div>
                          <div className="flex justify-between text-xs text-white/50 mb-1.5">
                            <span>{t("results.chart.after")}</span>
                            <span>
                              {formatCurrency(
                                results.beforeMonthly * 0.35,
                                locale
                              )}
                            </span>
                          </div>
                          <div
                            className="h-7 rounded-lg overflow-hidden"
                            style={{ background: "rgba(255,255,255,0.06)" }}
                          >
                            <motion.div
                              className="h-full rounded-lg"
                              initial={{ width: 0 }}
                              animate={{ width: "35%" }}
                              transition={{ duration: 0.9, delay: 0.2 }}
                              style={{
                                background:
                                  "linear-gradient(to right, #00FF41, #06B6D4)",
                              }}
                            />
                          </div>
                        </div>
                        {/* Savings indicator */}
                        <div
                          className="flex items-center gap-2 text-xs font-medium pt-1"
                          style={{ color: "#00FF41" }}
                        >
                          <TrendingUp size={14} />
                          <span>
                            {locale === "en" ? "65% cost reduction" : "65% de redução de custos com AI Agents"}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Scout Intelligence badge */}
                    <motion.div
                      variants={fadeUp}
                      className="text-center"
                    >
                      <span
                        className="text-xs px-3 py-1.5 rounded-full"
                        style={{
                          background: "rgba(0,255,65,0.08)",
                          color: "#00FF41",
                          border: "1px solid rgba(0,255,65,0.2)",
                        }}
                      >
                        {t("results.badge")}
                      </span>
                    </motion.div>

                    <motion.p
                      variants={fadeUp}
                      className="text-xs text-white/35 text-center"
                    >
                      {t("results.disclaimer")}
                    </motion.p>

                    {/* CTA to contact */}
                    <motion.div
                      variants={fadeUp}
                      className="rounded-2xl p-6 text-center"
                      style={{
                        background: "rgba(0,255,65,0.06)",
                        border: "1px solid rgba(0,255,65,0.2)",
                      }}
                    >
                      <p className="font-semibold mb-3 text-sm">
                        {t("results.cta.title")}
                      </p>
                      <Link
                        href="/contato"
                        className="inline-block px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, #00FF41, #06B6D4)",
                          color: "#0F172A",
                        }}
                      >
                        {t("results.cta.button")}
                      </Link>
                    </motion.div>

                    {/* Lead Capture */}
                    <motion.div
                      variants={fadeUp}
                      className="rounded-2xl p-6"
                      style={{
                        background: "rgba(6,182,212,0.05)",
                        border: "1px solid rgba(6,182,212,0.2)",
                      }}
                    >
                      <h3
                        className="font-bold text-base mb-1"
                        style={{ color: "#06B6D4" }}
                      >
                        {t("lead.title")}
                      </h3>
                      <p className="text-xs text-white/55 mb-4">
                        {t("lead.description")}
                      </p>

                      {leadStatus === "success" ? (
                        <div
                          className="flex items-center gap-2 text-sm py-2"
                          style={{ color: "#00FF41" }}
                        >
                          <CheckCircle size={16} />
                          {t("lead.success")}
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t("lead.emailPlaceholder")}
                            className="flex-1 rounded-xl px-4 py-3 text-white text-sm outline-none focus:ring-2 focus:ring-[#06B6D4]/50"
                            style={{
                              background: "rgba(255,255,255,0.08)",
                              border: "1px solid rgba(255,255,255,0.12)",
                            }}
                            onKeyDown={(e) =>
                              e.key === "Enter" && sendLead()
                            }
                          />
                          <motion.button
                            onClick={sendLead}
                            disabled={leadStatus === "sending"}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap disabled:opacity-60 transition-opacity"
                            style={{
                              background:
                                "linear-gradient(135deg, #06B6D4, #0891B2)",
                              color: "#ffffff",
                            }}
                          >
                            {leadStatus === "sending"
                              ? t("lead.sending")
                              : t("lead.button")}
                          </motion.button>
                        </div>
                      )}
                      {leadStatus === "error" && (
                        <p className="text-xs text-red-400 mt-2">
                          {t("lead.error")}
                        </p>
                      )}
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full min-h-[480px] text-center rounded-2xl p-8"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px dashed rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      className="p-5 rounded-full mb-5"
                      style={{ background: "rgba(0,255,65,0.08)" }}
                    >
                      <Calculator
                        size={44}
                        style={{ color: "#00FF41", opacity: 0.7 }}
                      />
                    </div>
                    <p className="text-white/35 text-sm max-w-xs leading-relaxed">
                      {locale === "en"
                        ? 'Fill in the form and click "Calculate my ROI" to see your personalized results here.'
                        : 'Preencha o formulário e clique em "Calcular meu ROI" para ver seus resultados personalizados aqui.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
