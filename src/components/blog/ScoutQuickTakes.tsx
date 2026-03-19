"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

interface ScoutQuickTakesProps {
  insight: string;
}

export default function ScoutQuickTakes({ insight }: ScoutQuickTakesProps) {
  const t = useTranslations("Scout");

  if (!insight) return null;

  return (
    <div
      className="my-10 rounded-xl overflow-hidden"
      style={{
        background: "#0F172A",
        borderLeft: "4px solid #00FF41",
        border: "1px solid rgba(0,255,65,0.2)",
        borderLeftWidth: "4px",
        borderLeftColor: "#00FF41",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-6 py-4"
        style={{ borderBottom: "1px solid rgba(0,255,65,0.15)" }}
      >
        <div className="relative h-10 w-10 flex-shrink-0">
          <Image
            src="/blog/scout-avatar.png"
            alt="Scout"
            width={40}
            height={40}
            className="rounded-full"
            style={{ border: "2px solid rgba(0,255,65,0.4)" }}
          />
        </div>
        <span
          className="text-sm font-bold uppercase tracking-widest"
          style={{ color: "#00FF41", fontFamily: "monospace" }}
        >
          🔍 {t("quickTakesTitle")}
        </span>
      </div>

      {/* Divider line */}
      <div
        className="mx-6 my-0"
        style={{ height: "1px", background: "rgba(0,255,65,0.1)" }}
      />

      {/* Content */}
      <div className="px-6 py-5">
        <p
          className="text-base leading-relaxed"
          style={{ color: "#E2E8F0" }}
        >
          {insight}
        </p>

        <p
          className="mt-4 text-sm"
          style={{ color: "rgba(0,255,65,0.7)", fontFamily: "monospace" }}
        >
          — Scout, 🔍 {t("quickTakesSignature")}
        </p>
      </div>
    </div>
  );
}
