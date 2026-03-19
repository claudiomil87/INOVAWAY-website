import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { routing } from "@/i18n/routing";
import PostHeader from "@/components/blog/PostHeader";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedPosts from "@/components/blog/RelatedPosts";
import { mdxComponents } from "@/components/blog/MDXComponents";
import MDXContent from "@/components/blog/MDXContent";
import Image from "next/image";

interface PostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    const posts = getAllPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) return {};

  const baseUrl = "https://inovaway.org";
  const canonicalUrl = locale === "pt"
    ? `${baseUrl}/blog/${slug}`
    : `${baseUrl}/en/blog/${slug}`;

  return {
    title: `${post.title} — INOVAWAY Blog`,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        pt: `${baseUrl}/blog/${slug}`,
        en: `${baseUrl}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, locale, 3);
  const baseUrl = "https://inovaway.org";
  const postUrl = locale === "pt"
    ? `${baseUrl}/blog/${slug}`
    : `${baseUrl}/en/blog/${slug}`;

  return (
    <main
      className="min-h-screen pt-24 pb-20"
      style={{ background: "#0F172A" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero image */}
        {post.image && (
          <div className="relative mb-10 h-64 sm:h-80 lg:h-96 w-full overflow-hidden rounded-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 40%, rgba(15,23,42,0.9))",
              }}
            />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main content */}
          <article className="min-w-0 flex-1">
            <PostHeader post={post} locale={locale} />

            {/* MDX content */}
            <div className="prose prose-invert max-w-none">
              <MDXContent code={post.body} components={mdxComponents} />
            </div>

            {/* Share buttons */}
            <div
              className="mt-10 pt-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <ShareButtons title={post.title} url={postUrl} />
            </div>

            {/* Related posts */}
            <RelatedPosts posts={relatedPosts} locale={locale} />
          </article>

          {/* Sidebar — TOC */}
          {post.toc && post.toc.length > 0 && (
            <aside className="hidden lg:block w-64 shrink-0">
              <TableOfContents toc={post.toc} />
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
