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
  // We get PT posts and find matching EN slugs
  const ptPosts = getAllPosts("pt");
  const enPosts = getAllPosts("en");

  // Build a slug → EN post map for fast lookup
  const enBySlug = new Map(enPosts.map((p) => [p.slug, p]));

  const blogEntries: MetadataRoute.Sitemap = ptPosts.flatMap((ptPost) => {
    const ptUrl = `${baseUrl}/blog/${ptPost.slug}`;
    const postDate = new Date(ptPost.date);

    // Try to find matching EN post (same slug)
    const enPost = enBySlug.get(ptPost.slug);
    const enUrl = enPost ? `${baseUrl}/en/blog/${enPost.slug}` : `${baseUrl}/en/blog`;

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

  // Also add EN-only posts (those without a PT counterpart)
  const ptSlugs = new Set(ptPosts.map((p) => p.slug));
  const enOnlyEntries: MetadataRoute.Sitemap = enPosts
    .filter((p) => !ptSlugs.has(p.slug))
    .map((enPost) => {
      const enUrl = `${baseUrl}/en/blog/${enPost.slug}`;
      return {
        url: enUrl,
        lastModified: new Date(enPost.date),
        changeFrequency: "monthly" as const,
        priority: 0.63,
        alternates: {
          languages: {
            en: enUrl,
            "x-default": enUrl,
          },
        },
      };
    });

  return [...staticEntries, ...blogEntries, ...enOnlyEntries];
}
