import { useTranslations } from "next-intl";
import { Post, formatDate } from "@/lib/blog";
import { Link } from "@/i18n/navigation";
import { Clock, Calendar } from "lucide-react";

interface RelatedPostsProps {
  posts: Post[];
  locale: string;
}

export default function RelatedPosts({ posts, locale }: RelatedPostsProps) {
  const t = useTranslations("Blog");

  if (!posts.length) return null;

  return (
    <section className="mt-16 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <h2 className="text-2xl font-bold text-white mb-6">{t("relatedPosts")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}` as never}
            className="group flex flex-col rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {post.tags.length > 0 && (
              <span
                className="mb-2 inline-flex w-fit items-center rounded-full px-2 py-0.5 text-xs font-medium"
                style={{
                  background: "rgba(6,182,212,0.1)",
                  color: "#06B6D4",
                  border: "1px solid rgba(6,182,212,0.2)",
                }}
              >
                {post.tags[0]}
              </span>
            )}
            <h3 className="text-sm font-semibold text-white line-clamp-2 mb-2 group-hover:text-[#00FF41] transition-colors duration-200">
              {post.title}
            </h3>
            <div className="flex items-center gap-3 mt-auto text-xs text-white/40">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(post.date, locale)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readingTime}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
