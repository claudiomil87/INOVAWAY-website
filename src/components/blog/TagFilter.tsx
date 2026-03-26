"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";

interface TagFilterProps {
  tags: string[];
  currentTag?: string;
  allPostsLabel: string;
}

export default function TagFilter({ tags, currentTag, allPostsLabel }: TagFilterProps) {
  const [expanded, setExpanded] = useState(false);
  
  // Show only first 12 tags when collapsed
  const visibleTags = expanded ? tags : tags.slice(0, 12);
  const hiddenCount = tags.length - 12;
  const hasMoreThan12 = tags.length > 12;

  return (
    <div className="mb-8 relative">
      {/* Fade gradients for mobile scroll indication */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 md:hidden"
        style={{ background: "linear-gradient(to right, #0F172A, transparent)" }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 md:hidden"
        style={{ background: "linear-gradient(to left, #0F172A, transparent)" }}
      />

      {/* Mobile: horizontal scroll / Desktop: wrap with expand/collapse */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 md:flex-wrap md:justify-center md:overflow-visible md:pb-0">
        {/* "All posts" button */}
        <Link
          href={"/blog" as never}
          className="rounded-full px-3 py-1 text-sm font-medium transition-all duration-200 snap-start shrink-0"
          style={{
            background: !currentTag ? "rgba(0,255,65,0.15)" : "rgba(255,255,255,0.05)",
            color: !currentTag ? "#00FF41" : "rgba(255,255,255,0.5)",
            border: !currentTag ? "1px solid rgba(0,255,65,0.3)" : "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {allPostsLabel}
        </Link>

        {/* Tags */}
        {visibleTags.map((tag) => (
          <Link
            key={tag}
            href={`/blog?tag=${tag}` as never}
            className="rounded-full px-3 py-1 text-sm font-medium transition-all duration-200 snap-start shrink-0"
            style={{
              background: currentTag === tag ? "rgba(6,182,212,0.15)" : "rgba(255,255,255,0.05)",
              color: currentTag === tag ? "#06B6D4" : "rgba(255,255,255,0.5)",
              border: currentTag === tag ? "1px solid rgba(6,182,212,0.3)" : "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {tag}
          </Link>
        ))}

        {/* Expand/Collapse button - Desktop only */}
        {hasMoreThan12 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="hidden md:flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 ease-out cursor-pointer"
            style={{
              background: "rgba(0,255,65,0.15)",
              border: "1px solid rgba(0,255,65,0.3)",
              color: "#00FF41",
            }}
          >
            {expanded ? (
              <>
                <span>Mostrar menos</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                <span>+{hiddenCount} tags</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}