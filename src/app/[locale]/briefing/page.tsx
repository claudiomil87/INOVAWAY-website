"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, Terminal, AlertTriangle, CheckCircle, ChevronRight } from "lucide-react";

// ──────────────────────────────────────────────
// Typing animation hook
// ──────────────────────────────────────────────
function useTypewriter(text: string, speed = 40, start = true) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!start) return;
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);
  return displayed;
}

// ──────────────────────────────────────────────
// Blinking cursor
// ──────────────────────────────────────────────
function Cursor({ visible = true }: { visible?: boolean }) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setOn((v) => !v), 500);
    return () => clearInterval(id);
  }, [visible]);
  return (
    <span
      className="inline-block w-2 h-4 ml-0.5 align-middle"
      style={{
        backgroundColor: "#00FF41",
        opacity: on && visible ? 1 : 0,
        transition: "opacity 0.1s",
      }}
    />
  );
}

// ──────────────────────────────────────────────
// Animated noise / scan-line overlay
// ──────────────────────────────────────────────
function ScanlineOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.015) 2px, rgba(0,255,65,0.015) 4px)",
      }}
    />
  );
}

// ──────────────────────────────────────────────
// Terminal badge
// ──────────────────────────────────────────────
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-mono font-bold uppercase tracking-widest"
      style={{
        backgroundColor: "rgba(0,255,65,0.08)",
        border: "1px solid rgba(0,255,65,0.3)",
        color: "#00FF41",
      }}
    >
      {children}
    </span>
  );
}

// ──────────────────────────────────────────────
// Form state types
// ──────────────────────────────────────────────
type FormState = "idle" | "loading" | "success" | "error";

// ──────────────────────────────────────────────
// Main page component
// ──────────────────────────────────────────────
export default function BriefingPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [bootDone, setBootDone] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);

  // Boot sequence
  const bootText = useTypewriter(
    "> SISTEMA ATIVO. ACESSO RESTRITO. NÍVEL: CLASSIFICADO",
    28,
    true
  );

  useEffect(() => {
    const t = setTimeout(() => setBootDone(true), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (bootDone && nameRef.current) nameRef.current.focus();
  }, [bootDone]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setFormState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Erro ao solicitar acesso. Tente novamente.");
        setFormState("error");
        return;
      }

      setFormState("success");
    } catch {
      setErrorMsg("Falha de conexão. Verifique sua rede e tente novamente.");
      setFormState("error");
    }
  }

  const inputClass =
    "w-full bg-transparent border rounded-sm px-4 py-3 font-mono text-sm outline-none transition-all duration-200 placeholder:text-white/30";
  const inputStyle = (focused: boolean) => ({
    borderColor: focused ? "#00FF41" : "rgba(255,255,255,0.12)",
    color: "#e2e8f0",
    boxShadow: focused ? "0 0 12px rgba(0,255,65,0.15)" : "none",
  });

  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  return (
    <>
      <ScanlineOverlay />

      {/* Background glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,255,65,0.04) 0%, transparent 70%)",
        }}
      />

      <main
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16"
        style={{ backgroundColor: "#0A1020" }}
      >
        {/* ── BOOT LINE ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center"
        >
          <p
            className="font-mono text-xs md:text-sm tracking-widest"
            style={{ color: "rgba(0,255,65,0.6)" }}
          >
            {bootText}
            <Cursor visible={!bootDone} />
          </p>
        </motion.div>

        {/* ── CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: bootDone ? 1 : 0, y: bootDone ? 0 : 24 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          {/* Card container */}
          <div
            className="rounded-md overflow-hidden"
            style={{
              backgroundColor: "#0F172A",
              border: "1px solid rgba(0,255,65,0.2)",
              boxShadow:
                "0 0 40px rgba(0,255,65,0.06), 0 0 1px rgba(0,255,65,0.3) inset",
            }}
          >
            {/* Terminal title bar */}
            <div
              className="flex items-center gap-2 px-4 py-2.5 border-b"
              style={{
                backgroundColor: "#0a1020",
                borderColor: "rgba(0,255,65,0.12)",
              }}
            >
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28C840" }} />
              </div>
              <span
                className="flex-1 text-center font-mono text-xs"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                briefing-classificado.sh
              </span>
              <Terminal className="w-3.5 h-3.5" style={{ color: "rgba(0,255,65,0.4)" }} />
            </div>

            {/* Card body */}
            <div className="px-6 pt-8 pb-10 md:px-10">
              {/* Badge */}
              <div className="mb-5 flex items-center gap-3">
                <Badge>
                  <Shield className="w-3 h-3" />
                  CLASSIFICADO
                </Badge>
                <Badge>
                  <Lock className="w-3 h-3" />
                  ACESSO RESTRITO
                </Badge>
              </div>

              {/* Headline */}
              <h1
                className="font-mono font-bold text-2xl md:text-3xl leading-tight mb-3"
                style={{ color: "#e2e8f0" }}
              >
                Newsletter{" "}
                <span style={{ color: "#00FF41" }}>Briefing</span>{" "}
                Classificado
              </h1>

              {/* Subheadline */}
              <p
                className="font-mono text-sm leading-relaxed mb-8"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {">"} Inteligência estratégica sobre IA, automação e growth.
                Direto ao ponto, sem ruído.{" "}
                <span style={{ color: "rgba(0,255,65,0.6)" }}>
                  Apenas para quem age.
                </span>
              </p>

              {/* Separator */}
              <div
                className="w-full h-px mb-7"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,255,65,0.3) 0%, transparent 100%)",
                }}
              />

              {/* ── FORM / STATES ── */}
              <AnimatePresence mode="wait">
                {/* ── SUCCESS ── */}
                {formState === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center text-center py-4 gap-4"
                  >
                    <CheckCircle
                      className="w-14 h-14"
                      style={{ color: "#00FF41" }}
                    />
                    <div>
                      <p
                        className="font-mono font-bold text-lg"
                        style={{ color: "#00FF41" }}
                      >
                        ACESSO SOLICITADO
                      </p>
                      <p
                        className="font-mono text-sm mt-2"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        Missão recebida.{" "}
                        <span style={{ color: "#e2e8f0" }}>
                          Verifique seu email
                        </span>{" "}
                        — o briefing está a caminho.
                      </p>
                    </div>
                    <div
                      className="w-full rounded-sm px-4 py-3 font-mono text-xs"
                      style={{
                        backgroundColor: "rgba(0,255,65,0.06)",
                        border: "1px solid rgba(0,255,65,0.2)",
                        color: "rgba(0,255,65,0.7)",
                      }}
                    >
                      $ lead_status: registered ✓<br />
                      $ delivery_queue: active<br />
                      $ eta: próxima edição
                    </div>
                  </motion.div>
                )}

                {/* ── DEFAULT / LOADING / ERROR ── */}
                {formState !== "success" && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    noValidate
                  >
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="font-mono text-xs tracking-widest uppercase"
                        style={{ color: "rgba(0,255,65,0.6)" }}
                        htmlFor="briefing-name"
                      >
                        {">"} IDENTIFICAÇÃO (nome)
                      </label>
                      <input
                        id="briefing-name"
                        ref={nameRef}
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Ex: Eric Milfont"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}
                        disabled={formState === "loading"}
                        className={inputClass}
                        style={inputStyle(nameFocus)}
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="font-mono text-xs tracking-widest uppercase"
                        style={{ color: "rgba(0,255,65,0.6)" }}
                        htmlFor="briefing-email"
                      >
                        {">"} CANAL SEGURO (email)
                      </label>
                      <input
                        id="briefing-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        disabled={formState === "loading"}
                        className={inputClass}
                        style={inputStyle(emailFocus)}
                      />
                    </div>

                    {/* Error message */}
                    <AnimatePresence>
                      {formState === "error" && errorMsg && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-start gap-2 rounded-sm px-4 py-3 font-mono text-xs"
                          style={{
                            backgroundColor: "rgba(255,59,59,0.08)",
                            border: "1px solid rgba(255,59,59,0.3)",
                            color: "#ff6b6b",
                          }}
                        >
                          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                          <span>{errorMsg}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={formState === "loading" || !name.trim() || !email.trim()}
                      whileHover={
                        formState !== "loading"
                          ? { scale: 1.01, boxShadow: "0 0 24px rgba(0,255,65,0.25)" }
                          : {}
                      }
                      whileTap={formState !== "loading" ? { scale: 0.99 } : {}}
                      className="w-full flex items-center justify-center gap-2 rounded-sm py-3.5 font-mono font-bold text-sm tracking-widest uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: formState === "loading" ? "rgba(0,255,65,0.15)" : "#00FF41",
                        color: formState === "loading" ? "#00FF41" : "#0A1020",
                        border: "1px solid #00FF41",
                      }}
                    >
                      {formState === "loading" ? (
                        <>
                          <span className="animate-pulse">PROCESSANDO</span>
                          <Cursor visible />
                        </>
                      ) : (
                        <>
                          Solicitar Acesso ao Briefing
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>

                    {/* Privacy note */}
                    <p
                      className="text-center font-mono text-xs"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                    >
                      <Lock className="w-3 h-3 inline-block mr-1 mb-0.5" />
                      Seus dados são criptografados e nunca compartilhados.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Footer note */}
          <p
            className="mt-6 text-center font-mono text-xs"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            © INOVAWAY · Briefing Classificado · Acesso mediante cadastro
          </p>
        </motion.div>
      </main>
    </>
  );
}
