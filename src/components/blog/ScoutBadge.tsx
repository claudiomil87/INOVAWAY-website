"use client";

import { useTranslations } from "next-intl";

interface ScoutBadgeProps {
  locale?: string;
}

export default function ScoutBadge({ locale: _locale }: ScoutBadgeProps) {
  const t = useTranslations("Scout");

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold uppercase tracking-widest rounded-full"
      style={{
        background: "rgba(15,23,42,0.8)",
        border: "1px solid rgba(0,255,65,0.5)",
        color: "#00FF41",
        fontFamily: "monospace",
      }}
    >
      🔍 {t("badge")}
    </span>
  );
}
