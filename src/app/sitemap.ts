import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://inovaway.org";
  const lastModified = new Date("2026-03-07");

  const pages = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/servicos", priority: 0.9, freq: "monthly" },
    { path: "/produtos", priority: 0.9, freq: "monthly" },
    { path: "/sobre", priority: 0.7, freq: "monthly" },
    { path: "/contato", priority: 0.8, freq: "yearly" },
    { path: "/privacidade", priority: 0.3, freq: "yearly" },
    { path: "/termos", priority: 0.3, freq: "yearly" },
    { path: "/blog", priority: 0.8, freq: "weekly" },
  ] as const;

  const staticEntries: MetadataRoute.Sitemap = pages.flatMap(({ path, priority, freq }) => {
    const ptUrl = `${baseUrl}${path}`;
    const enUrl = `${baseUrl}/en${path}`;

    const sharedAlternates = {
      languages: {
        "pt-BR": ptUrl,
        en: enUrl,
        "x-default": ptUrl,
      },
    };

    return [
      {
        url: ptUrl,
        lastModified,
        changeFrequency: freq,
        priority,
        alternates: sharedAlternates,
      },
      {
        url: enUrl,
        lastModified,
        changeFrequency: freq,
        priority: priority * 0.9,
        alternates: sharedAlternates,
      },
    ];
  });

  // Blog post entries — both PT and EN, with hreflang alternates
  // We use the `translationSlug` frontmatter field for accurate cross-locale slug mapping.
  const ptPosts = getAllPosts("pt");
  const enPosts = getAllPosts("en");

  // Build a slug → EN post map for fast lookup
  const enBySlug = new Map(enPosts.map((p) => [p.slug, p]));

  // Track EN slugs already covered by a PT post's translationSlug mapping
  const coveredEnSlugs = new Set<string>();

  const blogEntries: MetadataRoute.Sitemap = ptPosts.flatMap((ptPost) => {
    const ptUrl = `${baseUrl}/blog/${ptPost.slug}`;
    const postDate = new Date(ptPost.date);

    // Prefer translationSlug for accurate EN URL; fallback to same-slug lookup
    const enSlug = ptPost.translationSlug ?? ptPost.slug;
    const enPost = enBySlug.get(enSlug);
    const enUrl = enPost ? `${baseUrl}/en/blog/${enPost.slug}` : `${baseUrl}/en/blog`;

    if (enPost) coveredEnSlugs.add(enPost.slug);

    const alternates = {
      languages: {
        "pt-BR": ptUrl,
        en: enUrl,
        "x-default": ptUrl,
      },
    };

    const entries: MetadataRoute.Sitemap = [
      {
        url: ptUrl,
        lastModified: postDate,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates,
      },
    ];

    if (enPost) {
      entries.push({
        url: enUrl,
        lastModified: new Date(enPost.date),
        changeFrequency: "monthly",
        priority: 0.63,
        alternates,
      });
    }

    return entries;
  });

  // Also add EN-only posts (those without a PT counterpart via translationSlug)
  const enOnlyEntries: MetadataRoute.Sitemap = enPosts
    .filter((p) => !coveredEnSlugs.has(p.slug))
    .map((enPost) => {
      const enUrl = `${baseUrl}/en/blog/${enPost.slug}`;
      // Check if EN post has a translationSlug pointing to a PT post
      const ptSlug = enPost.translationSlug;
      const ptPost = ptSlug ? ptPosts.find((p) => p.slug === ptSlug) : undefined;
      const ptUrl = ptPost ? `${baseUrl}/blog/${ptPost.slug}` : undefined;

      return {
        url: enUrl,
        lastModified: new Date(enPost.date),
        changeFrequency: "monthly" as const,
        priority: 0.63,
        alternates: {
          languages: {
            en: enUrl,
            ...(ptUrl ? { "pt-BR": ptUrl, "x-default": ptUrl } : { "x-default": enUrl }),
          },
        },
      };
    });

  return [...staticEntries, ...blogEntries, ...enOnlyEntries];
}
