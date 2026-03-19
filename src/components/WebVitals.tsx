"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === "development") {
      console.log("[WebVitals]", metric.name, metric.value.toFixed(2), metric);
      return;
    }

    // Production: send to GA4 if available
    if (typeof window !== "undefined" && "gtag" in window) {
      const gtag = window.gtag as (
        command: string,
        action: string,
        params: Record<string, unknown>
      ) => void;

      gtag("event", metric.name, {
        event_category: "Web Vitals",
        event_label: metric.id,
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value
        ),
        non_interaction: true,
      });
    }
  });

  return null;
}
