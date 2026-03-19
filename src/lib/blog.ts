import { posts } from "@velite";

export type Post = (typeof posts)[number];

/**
 * Get all posts for a given locale, sorted by date descending.
 */
export function getAllPosts(locale: string): Post[] {
  return posts
    .filter((post) => post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single post by slug and locale.
 */
export function getPostBySlug(slug: string, locale: string): Post | undefined {
  return posts.find((post) => post.slug === slug && post.locale === locale);
}

/**
 * Get all unique tags for a locale.
 */
export function getAllTags(locale: string): string[] {
  const allTags = getAllPosts(locale).flatMap((post) => post.tags);
  return [...new Set(allTags)].sort();
}

/**
 * Get related posts (same tags), excluding current post, limited to `limit`.
 */
export function getRelatedPosts(slug: string, locale: string, limit = 3): Post[] {
  const current = getPostBySlug(slug, locale);
  if (!current) return [];

  const currentTags = new Set(current.tags);

  return getAllPosts(locale)
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      commonTags: post.tags.filter((tag) => currentTags.has(tag)).length,
    }))
    .filter(({ commonTags }) => commonTags > 0)
    .sort((a, b) => b.commonTags - a.commonTags)
    .slice(0, limit)
    .map(({ post }) => post);
}

/**
 * Format a date string to locale-appropriate format.
 */
export function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
