import { Post, formatDate } from "@/lib/blog";
import { Clock, Calendar, User } from "lucide-react";
import LastUpdatedBadge from "./LastUpdatedBadge";

interface PostHeaderProps {
  post: Post;
  locale: string;
}

export default function PostHeader({ post, locale }: PostHeaderProps) {
  return (
    <header className="mb-10">
      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
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
      <h1
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
        style={{ letterSpacing: "-0.02em" }}
      >
        {post.title}
      </h1>

      {/* Description */}
      <p className="text-lg text-white/70 mb-6 leading-relaxed">
        {post.description}
      </p>

      {/* Meta row */}
      <div
        className="flex flex-wrap items-center gap-4 py-4 text-sm text-white/50"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <span className="flex items-center gap-2">
          <User className="h-4 w-4" style={{ color: "#00FF41" }} />
          <span className="text-white/70 font-medium">{post.author}</span>
        </span>
        <span className="flex items-center gap-2">
          <Calendar className="h-4 w-4" style={{ color: "#06B6D4" }} />
          {formatDate(post.date, locale)}
        </span>
        <span className="flex items-center gap-2">
          <Clock className="h-4 w-4" style={{ color: "#06B6D4" }} />
          {post.readingTime}
        </span>
      </div>
      {/* Last Updated badge — shows only when updatedAt differs from date */}
      <LastUpdatedBadge date={post.date} updatedAt={post.updatedAt} locale={locale} />
    </header>
  );
}
