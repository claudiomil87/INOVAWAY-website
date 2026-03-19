import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://inovaway.org";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts("en");

  const items = posts
    .map((post) => {
      const url = `${BASE_URL}/en/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const description = escapeXml(post.description);
      const title = escapeXml(post.title);
      const author = escapeXml(post.author);
      const tags = post.tags.map((t) => `<category>${escapeXml(t)}</category>`).join("\n      ");
      const imageUrl = post.image
        ? (post.image.startsWith("http") ? post.image : `${BASE_URL}${post.image}`)
        : null;
      const imageMime = imageUrl?.endsWith(".png")
        ? "image/png"
        : imageUrl?.endsWith(".webp")
        ? "image/webp"
        : "image/jpeg";
      const image = imageUrl
        ? `<enclosure url="${escapeXml(imageUrl)}" type="${imageMime}" length="0" />`
        : "";

      return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${author}</author>
      ${tags}
      ${image}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>INOVAWAY Blog (English)</title>
    <link>${BASE_URL}/en/blog</link>
    <description>Articles about AI Agents, automation and technology for businesses — INOVAWAY</description>
    <language>en-US</language>
    <managingEditor>contact@inovaway.org (INOVAWAY)</managingEditor>
    <webMaster>contact@inovaway.org (INOVAWAY)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed-en.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/logo.png</url>
      <title>INOVAWAY Blog</title>
      <link>${BASE_URL}/en/blog</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
