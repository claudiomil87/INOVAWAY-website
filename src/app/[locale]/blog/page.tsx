import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAllPosts, getAllTags } from "@/lib/blog";
import PostCard from "@/components/blog/PostCard";
import TagFilter from "@/components/blog/TagFilter";
import { Link } from "@/i18n/navigation";

const POSTS_PER_PAGE = 9;

interface BlogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; tag?: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });

  return {
    title: t("pageTitle"),
    description: t("description"),
    alternates: {
      canonical: locale === "pt" ? "/blog" : "/en/blog",
      languages: {
        pt: "/blog",
        en: "/en/blog",
      },
    },
    openGraph: {
      title: t("pageTitle"),
      description: t("description"),
    },
  };
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params;
  const { page: pageParam, tag: tagParam } = await searchParams;

  const t = await getTranslations({ locale, namespace: "Blog" });
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10));

  const allPosts = getAllPosts(locale);
  const allTags = getAllTags(locale);

  // Filter by tag if provided
  const filteredPosts = tagParam
    ? allPosts.filter((post) => post.tags.includes(tagParam))
    : allPosts;

  // Pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const pagePosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <main
      className="min-h-screen pt-24 pb-20"
      style={{ background: "#0F172A" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span
            className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{
              background: "rgba(0,255,65,0.1)",
              color: "#00FF41",
              border: "1px solid rgba(0,255,65,0.2)",
            }}
          >
            Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Tag filter - Mobile: horizontal scroll, Desktop: smart collapse */}
        {allTags.length > 0 && (
          <TagFilter
            tags={allTags}
            currentTag={tagParam}
            allPostsLabel={t("allPosts")}
          />
        )}

        {/* Posts grid */}
        {pagePosts.length === 0 ? (
          <div className="text-center py-20 text-white/40">
            <p className="text-lg">{t("noResults")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {pagePosts.map((post) => (
              <PostCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
            {currentPage > 1 && (
              <Link
                href={`/blog?page=${currentPage - 1}${tagParam ? `&tag=${tagParam}` : ""}` as never}
                className="rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                ← {t("pagination.prev")}
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <Link
                key={num}
                href={`/blog?page=${num}${tagParam ? `&tag=${tagParam}` : ""}` as never}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: num === currentPage ? "rgba(0,255,65,0.15)" : "rgba(255,255,255,0.05)",
                  border: num === currentPage ? "1px solid rgba(0,255,65,0.3)" : "1px solid rgba(255,255,255,0.1)",
                  color: num === currentPage ? "#00FF41" : "rgba(255,255,255,0.7)",
                }}
              >
                {num}
              </Link>
            ))}
            {currentPage < totalPages && (
              <Link
                href={`/blog?page=${currentPage + 1}${tagParam ? `&tag=${tagParam}` : ""}` as never}
                className="rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {t("pagination.next")} →
              </Link>
            )}
          </nav>
        )}
      </div>
    </main>
  );
}
