import { MetadataRoute } from "next";

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
  ] as const;

  const entries: MetadataRoute.Sitemap = pages.flatMap(({ path, priority, freq }) => {
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

  return entries;
}
