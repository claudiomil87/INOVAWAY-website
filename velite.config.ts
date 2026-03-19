import { defineConfig, defineCollection, s } from "velite";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(200),
      slug: s.string(),
      date: s.isodate(),
      author: s.string().default("INOVAWAY"),
      description: s.string().max(500),
      tags: s.array(s.string()).default([]),
      image: s.string().optional(),
      locale: s.enum(["pt", "en"]),
      translationSlug: s.string().optional(),
      readingTime: s.string().optional(),
      body: s.markdown(),
      toc: s.toc(),
    })
    .transform((data) => ({
      ...data,
      // Use provided readingTime or default to 5 min
      readingTime: data.readingTime ?? "5 min",
    })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["anchor"],
          },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          keepBackground: false,
        },
      ],
    ],
  },
});
