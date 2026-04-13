import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getTranslations } from "next-intl/server";
import { getAllPosts, getPostBySlug, getRelatedPosts, getTranslatedPost, getPreviousPosts } from "@/lib/blog";
import { routing } from "@/i18n/routing";
import TableOfContents from "@/components/blog/TableOfContents";
import InfinitePostLoader from "@/components/blog/InfinitePostLoader";
import TranslationSlugSetter from "@/components/blog/TranslationSlugSetter";
import NewsletterSignup from "@/components/blog/NewsletterSignup";

const BASE_URL = "https://inovaway.org";

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

  const canonicalUrl =
    locale === "pt"
      ? `${BASE_URL}/blog/${slug}`
      : `${BASE_URL}/en/blog/${slug}`;

  const ogLocale = locale === "pt" ? "pt_BR" : "en_US";
  const ogAlternateLocale = locale === "pt" ? "en_US" : "pt_BR";

  // Resolve the correct translated slug via the translationSlug frontmatter field
  const translatedPost = getTranslatedPost(slug, locale);
  const ptSlug = locale === "pt" ? slug : (translatedPost?.slug ?? slug);
  const enSlug = locale === "en" ? slug : (translatedPost?.slug ?? slug);
  const ptUrl = `${BASE_URL}/blog/${ptSlug}`;
  const enUrl = `${BASE_URL}/en/blog/${enSlug}`;

  return {
    title: `${post.title} — INOVAWAY Blog`,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "pt-BR": ptUrl,
        en: enUrl,
        "x-default": ptUrl,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: canonicalUrl,
      siteName: "INOVAWAY",
      publishedTime: post.date,
      authors: [post.author],
      locale: ogLocale,
      alternateLocale: ogAlternateLocale,
      images: post.image
        ? [
            {
              url: post.image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [
            {
              url: locale === "en" ? "/og-en.png" : "/og-pt.png",
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [locale === "en" ? "/og-en.png" : "/og-pt.png"],
      creator: "@inovaway",
      site: "@inovaway",
    },
  };
}

function getBlogPostingSchema(
  post: ReturnType<typeof getPostBySlug>,
  locale: string,
  postUrl: string
) {
  if (!post) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: postUrl,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Organization",
      name: post.author,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "INOVAWAY",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    image: post.image
      ? {
          "@type": "ImageObject",
          url: post.image.startsWith("http") ? post.image : `${BASE_URL}${post.image}`,
        }
      : {
          "@type": "ImageObject",
          url: locale === "en" ? `${BASE_URL}/og-en.png` : `${BASE_URL}/og-pt.png`,
        },
    inLanguage: locale === "pt" ? "pt-BR" : "en-US",
    keywords: post.tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };
}

function getBreadcrumbSchema(post: ReturnType<typeof getPostBySlug>, locale: string, postUrl: string) {
  if (!post) return null;

  const blogUrl = locale === "pt" ? `${BASE_URL}/blog` : `${BASE_URL}/en/blog`;
  const homeUrl = locale === "pt" ? BASE_URL : `${BASE_URL}/en`;
  const homeLabel = locale === "pt" ? "Início" : "Home";
  const blogLabel = "Blog";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: blogLabel,
        item: blogUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "Blog" });
  const relatedPosts = getRelatedPosts(slug, locale, 3);
  const previousPosts = getPreviousPosts(slug, locale, 20); // Get up to 20 previous posts for infinite scroll
  const translatedPost = getTranslatedPost(slug, locale);
  const postUrl =
    locale === "pt"
      ? `${BASE_URL}/blog/${slug}`
      : `${BASE_URL}/en/blog/${slug}`;

  const blogPostingSchema = getBlogPostingSchema(post, locale, postUrl);
  const breadcrumbSchema = getBreadcrumbSchema(post, locale, postUrl);

  // Add related posts to initial post
  const initialPostWithRelated = {
    ...post,
    relatedPosts,
  };

  return (
    <main
      className="min-h-screen pt-24 pb-20"
      style={{ background: "#0F172A" }}
    >
      <TranslationSlugSetter translationSlug={translatedPost?.slug ?? null} />
      {/* Schema.org JSON-LD */}
      {blogPostingSchema && (
        <Script
          id="schema-blogposting"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <Script
          id="schema-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main content with infinite scroll */}
          <div className="min-w-0 flex-1">
            <InfinitePostLoader
              initialPost={initialPostWithRelated}
              initialLocale={locale as "pt" | "en"}
              nextPosts={previousPosts}
            />
          </div>

          {/* Sidebar — TOC + Newsletter */}
          <aside className="hidden lg:block w-64 shrink-0 self-start sticky top-24 space-y-6">
            {post.toc && post.toc.length > 0 && (
              <TableOfContents toc={post.toc} label={t("tocTitle")} />
            )}
            <NewsletterSignup locale={locale} variant="sidebar" />
          </aside>
        </div>
      </div>
    </main>
  );
}
