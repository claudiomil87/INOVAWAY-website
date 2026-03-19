"use client";

import { useEffect, useState } from "react";

// Velite's TOC structure uses nested items (no depth field)
interface TocItem {
  title: string;
  url: string;
  items?: TocItem[];
}

interface FlatTocItem {
  title: string;
  url: string;
  level: number; // 0 = top, 1 = nested, 2 = deeply nested
}

interface TableOfContentsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toc: any[];
  label?: string;
}

function flattenToc(items: TocItem[], level = 0): FlatTocItem[] {
  const flat: FlatTocItem[] = [];
  for (const item of items) {
    flat.push({ title: item.title, url: item.url, level });
    if (item.items?.length) {
      flat.push(...flattenToc(item.items, level + 1));
    }
  }
  return flat;
}

export default function TableOfContents({ toc, label = "Conteúdo" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const flatItems = flattenToc(toc as TocItem[]);

  useEffect(() => {
    if (!flatItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0.1 }
    );

    flatItems.forEach((item) => {
      const id = item.url.replace("#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [flatItems]);

  if (!flatItems.length) return null;

  return (
    <nav
      className="max-h-[calc(100vh-8rem)] overflow-y-auto rounded-xl p-5"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      aria-label="Table of contents"
    >
      <p
        className="mb-3 text-xs font-semibold uppercase tracking-wider"
        style={{ color: "#06B6D4" }}
      >
        {label}
      </p>
      <ul className="space-y-1">
        {flatItems.map((item, i) => {
          const id = item.url.replace("#", "");
          const isActive = activeId === id;

          return (
            <li key={`${item.url}-${i}`}>
              <a
                href={item.url}
                className="block py-1 text-sm transition-all duration-150 leading-snug"
                style={{
                  color: isActive ? "#00FF41" : "rgba(255,255,255,0.5)",
                  fontWeight: isActive ? 600 : 400,
                  textShadow: isActive ? "0 0 8px rgba(0,255,65,0.3)" : "none",
                  borderLeft: isActive
                    ? "2px solid #00FF41"
                    : "2px solid transparent",
                  paddingLeft: item.level === 0 ? "8px" : `${8 + item.level * 12}px`,
                }}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
