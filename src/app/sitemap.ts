import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://inovaway.org";
  const lastModified = new Date("2026-03-07");

  const ptPages = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/servicos", priority: 0.9, freq: "monthly" },
    { path: "/produtos", priority: 0.9, freq: "monthly" },
    { path: "/sobre", priority: 0.7, freq: "monthly" },
    { path: "/contato", priority: 0.8, freq: "yearly" },
    { path: "/privacidade", priority: 0.3, freq: "yearly" },
    { path: "/termos", priority: 0.3, freq: "yearly" },
  ] as const;

  const ptEntries: MetadataRoute.Sitemap = ptPages.map(({ path, priority, freq }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: freq,
    priority,
  }));

  const enEntries: MetadataRoute.Sitemap = ptPages.map(({ path, priority, freq }) => ({
    url: `${baseUrl}/en${path}`,
    lastModified,
    changeFrequency: freq,
    priority: priority * 0.9, // slightly lower for EN
  }));

  return [...ptEntries, ...enEntries];
}
