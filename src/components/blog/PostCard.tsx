'use client';

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Post, formatDate } from "@/lib/blog";
import { useTranslations } from "next-intl";
import { Clock, Calendar } from "lucide-react";

interface PostCardProps {
  post: Post;
  locale: string;
}

export default function PostCard({ post, locale }: PostCardProps) {
  const t = useTranslations("Blog");
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/blog/${post.slug}` as never}
      className="block cursor-pointer h-full"
      aria-label={post.title}
    >
      <article
        className="group flex flex-col h-full rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
        }}
      >
        {/* Image */}
        {post.image && (
          <div className="relative w-full overflow-hidden aspect-[16/9]">
            {imgError ? (
              <div
                className="w-full h-full flex items-center justify-center absolute inset-0"
                style={{ background: "linear-gradient(135deg, #0F172A, #1E293B)" }}
              >
                <span className="text-white/30 text-lg font-bold">INOVAWAY</span>
              </div>
            ) : (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            )}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 60%, rgba(15,23,42,0.8))",
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    background: "rgba(6,182,212,0.1)",
                    color: "#06B6D4",
                    border: "1px solid rgba(6,182,212,0.2)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[#00FF41] transition-colors duration-200">
            {post.title}
          </h2>

          {/* Description */}
          <p className="text-sm text-white/60 line-clamp-3 mb-4 flex-1">
            {post.description}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between mt-auto pt-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3 text-xs text-white/40">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(post.date, locale)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readingTime}
              </span>
            </div>
            <span
              className="text-xs font-semibold transition-colors duration-200"
              style={{ color: "#00FF41" }}
            >
              {t("readMore")} →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
