"use client";

import { CalendarClock } from "lucide-react";
import { formatDate } from "@/lib/blog";

interface LastUpdatedBadgeProps {
  date: string;
  updatedAt?: string;
  locale: string;
}

export default function LastUpdatedBadge({ date, updatedAt, locale }: LastUpdatedBadgeProps) {
  // Only show if the post was actually updated (updatedAt differs from date)
  const effectiveUpdated = updatedAt && updatedAt !== date ? updatedAt : null;
  if (!effectiveUpdated) return null;

  const label = locale === "pt" ? "Última Atualização" : "Last Updated";

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md"
      style={{
        background: "rgba(139,92,246,0.12)",
        color: "#8B5CF6",
        border: "1px solid rgba(139,92,246,0.25)",
      }}
    >
      <CalendarClock className="h-3.5 w-3.5" style={{ color: "#8B5CF6" }} />
      {label}: {formatDate(effectiveUpdated, locale)}
    </span>
  );
}