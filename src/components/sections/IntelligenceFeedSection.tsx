"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import PostCard from "@/components/blog/PostCard";
import type { Post } from "@/lib/blog";

interface IntelligenceFeedSectionProps {
  posts: Post[];
  locale: string;
}

export default function IntelligenceFeedSection({
  posts,
  locale,
}: IntelligenceFeedSectionProps) {
  const t = useTranslations("IntelligenceFeed");

  if (posts.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "#0F172A" }}
    >
      {/* Subtle grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,65,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow accents */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2"
        style={{
          width: 600,
          height: 400,
          background:
            "radial-gradient(ellipse at center, rgba(0,255,65,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          {/* Live badge */}
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{
              background: "rgba(0,255,65,0.08)",
              border: "1px solid rgba(0,255,65,0.3)",
              color: "#00FF41",
              fontFamily: "monospace",
            }}
          >
            <span
              className="inline-block h-2 w-2 animate-pulse rounded-full"
              style={{ background: "#FF3B3B" }}
            />
            {t("liveBadge")}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            📡{" "}
            <span style={{ color: "#00FF41" }}>INOVAWAY</span>{" "}
            Intelligence
          </h2>

          <p className="max-w-2xl text-lg text-white/60 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold transition-all duration-300"
            style={{
              background: "rgba(0,255,65,0.1)",
              border: "1px solid rgba(0,255,65,0.4)",
              color: "#00FF41",
            }}
          >
            {t("cta")}
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
