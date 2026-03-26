"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import PostHeader from "./PostHeader";
import MDXContent from "./MDXContent";
import ScoutBadge from "./ScoutBadge";
import ScoutQuickTakes from "./ScoutQuickTakes";
import AuthorBox from "./AuthorBox";
import ShareButtons from "./ShareButtons";
import FAQSection from "@/components/sections/FAQSection";
import BlogCommentsLoader from "./BlogCommentsLoader";
import RelatedPosts from "./RelatedPosts";
import Image from "next/image";
import { Post } from "@/lib/blog";
import { getFAQs } from "@/lib/faq-data";
import { getScoutInsight } from "@/lib/scout-insights";
import { ChevronDown, Loader2 } from "lucide-react";

const BASE_URL = "https://inovaway.org";
const MAX_AUTO_LOAD = 5;

interface LoadedPost extends Post {
  locale: "pt" | "en";
  postUrl: string;
  faqs: ReturnType<typeof getFAQs>;
  scoutInsight: ReturnType<typeof getScoutInsight>;
  relatedPosts: Post[];
}

interface InfinitePostLoaderProps {
  initialPost: Post;
  initialLocale: "pt" | "en";
  nextPosts: Post[];
}

export default function InfinitePostLoader({
  initialPost,
  initialLocale,
  nextPosts,
}: InfinitePostLoaderProps) {
  const pathname = usePathname();
  const [loadedPosts, setLoadedPosts] = useState<LoadedPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [manualLoadCount, setManualLoadCount] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadTriggerRef = useRef<HTMLDivElement>(null);
  const postRefs = useRef<(HTMLElement | null)[]>([]);

  // Track post view for analytics
  const trackPostView = useCallback((post: Post, index: number) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "post_view", {
        event_category: "engagement",
        event_label: post.slug,
        value: index,
        post_title: post.title,
      });
    }
  }, []);

  // Update URL when scrolling to different post
  const updateUrlForPost = useCallback((post: LoadedPost, index: number) => {
    if (index === 0) return;
    
    const newPath = post.locale === "pt" 
      ? `/blog/${post.slug}` 
      : `/en/blog/${post.slug}`;
    
    if (pathname !== newPath) {
      window.history.replaceState(
        { postIndex: index, scrollPosition: window.scrollY },
        post.title,
        newPath
      );
      document.title = `${post.title} — INOVAWAY Blog`;
    }
  }, [pathname]);

  // Load next post
  const loadNextPost = useCallback(async () => {
    const totalLoaded = loadedPosts.length;
    const nextIndex = totalLoaded;

    if (nextIndex >= nextPosts.length || isLoading) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const post = nextPosts[nextIndex];
    const locale = initialLocale;
    const postUrl =
      locale === "pt"
        ? `${BASE_URL}/blog/${post.slug}`
        : `${BASE_URL}/en/blog/${post.slug}`;

    const newLoadedPost: LoadedPost = {
      ...post,
      locale,
      postUrl,
      faqs: getFAQs(post.slug, locale),
      scoutInsight: getScoutInsight(post.slug, locale),
      relatedPosts: [],
    };

    setLoadedPosts((prev) => [...prev, newLoadedPost]);
    setIsLoading(false);
    trackPostView(post, nextIndex + 1);

    if (totalLoaded + 1 >= MAX_AUTO_LOAD) {
      setHasMore(false);
    }
  }, [loadedPosts.length, nextPosts, initialLocale, isLoading, trackPostView]);

  // Manual load more
  const handleManualLoad = useCallback(async () => {
    const startIndex = MAX_AUTO_LOAD + manualLoadCount;
    const postsToLoad = nextPosts.slice(startIndex, startIndex + 3);

    if (postsToLoad.length === 0) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newPosts: LoadedPost[] = postsToLoad.map((post) => ({
      ...post,
      locale: initialLocale,
      postUrl:
        initialLocale === "pt"
          ? `${BASE_URL}/blog/${post.slug}`
          : `${BASE_URL}/en/blog/${post.slug}`,
      faqs: getFAQs(post.slug, initialLocale),
      scoutInsight: getScoutInsight(post.slug, initialLocale),
      relatedPosts: [],
    }));

    setLoadedPosts((prev) => [...prev, ...newPosts]);
    setManualLoadCount((prev) => prev + postsToLoad.length);
    setIsLoading(false);

    postsToLoad.forEach((post, idx) => {
      trackPostView(post, startIndex + idx + 1);
    });

    if (startIndex + postsToLoad.length >= nextPosts.length) {
      setHasMore(false);
    }
  }, [manualLoadCount, nextPosts, initialLocale, trackPostView]);

  // Setup intersection observer for auto-loading
  useEffect(() => {
    if (!loadTriggerRef.current || loadedPosts.length >= MAX_AUTO_LOAD) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          loadNextPost();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observerRef.current.observe(loadTriggerRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loadedPosts.length, isLoading, hasMore, loadNextPost]);

  // Setup intersection observer for URL updates
  useEffect(() => {
    const urlObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = postRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1 && index < loadedPosts.length) {
              updateUrlForPost(loadedPosts[index], index);
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
    );

    postRefs.current.forEach((ref) => {
      if (ref) urlObserver.observe(ref);
    });

    return () => urlObserver.disconnect();
  }, [loadedPosts, updateUrlForPost]);

  // Render separator between posts
  const PostSeparator = ({ index }: { index: number }) => (
    <div className="relative py-12 my-8">
      <div className="absolute inset-0 flex items-center">
        <div 
          className="w-full border-t" 
          style={{ borderColor: "rgba(255,255,255,0.1)" }} 
        />
      </div>
      <div className="relative flex justify-center">
        <div 
          className="px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2"
          style={{ 
            background: "rgba(0,255,65,0.1)",
            border: "1px solid rgba(0,255,65,0.2)",
            color: "#00FF41"
          }}
        >
          <ChevronDown className="w-4 h-4" />
          Continuando leitura
        </div>
      </div>
    </div>
  );

  // Render individual post
  const renderPost = (post: LoadedPost | Post, index: number, isInitial: boolean) => {
    const loadedPost = isInitial 
      ? { ...initialPost, locale: initialLocale, postUrl: initialLocale === "pt" ? `${BASE_URL}/blog/${initialPost.slug}` : `${BASE_URL}/en/blog/${initialPost.slug}`, faqs: getFAQs(initialPost.slug, initialLocale), scoutInsight: getScoutInsight(initialPost.slug, initialLocale), relatedPosts: [] }
      : post as LoadedPost;

    return (
      <article 
        key={isInitial ? `initial-${loadedPost.slug}` : loadedPost.slug}
        ref={(el) => { postRefs.current[index] = el; }}
        className="min-w-0 flex-1 scroll-mt-24"
        data-post-slug={loadedPost.slug}
      >
        {!isInitial && <PostSeparator index={index} />}
        
        {/* Hero image */}
        {loadedPost.image && (
          <div className="relative mb-10 h-64 sm:h-80 lg:h-96 w-full overflow-hidden rounded-2xl">
            <Image
              src={loadedPost.image}
              alt={loadedPost.title}
              fill
              className="object-cover"
              priority={isInitial}
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, transparent 40%, rgba(15,23,42,0.9))",
              }}
            />
          </div>
        )}

        <PostHeader post={loadedPost} locale={loadedPost.locale} />
        <div className="mb-6">
          <ScoutBadge locale={loadedPost.locale} />
        </div>

        {/* MDX content */}
        <div className="prose prose-invert max-w-none">
          <MDXContent code={loadedPost.body} />
        </div>

        {/* Scout Quick Takes */}
        {loadedPost.scoutInsight && (
          <ScoutQuickTakes insight={loadedPost.scoutInsight} />
        )}

        {/* Author box */}
        <AuthorBox locale={loadedPost.locale} />

        {/* Share buttons */}
        <div
          className="mt-10 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <ShareButtons title={loadedPost.title} url={loadedPost.postUrl} />
        </div>

        {/* FAQ */}
        {loadedPost.faqs.length > 0 && (
          <FAQSection slug={loadedPost.slug} />
        )}

        <BlogCommentsLoader postSlug={loadedPost.slug} locale={loadedPost.locale} />

        {/* Related posts only for initial post */}
        {isInitial && loadedPost.relatedPosts && loadedPost.relatedPosts.length > 0 && (
          <RelatedPosts posts={loadedPost.relatedPosts} locale={loadedPost.locale} />
        )}
      </article>
    );
  };

  const totalPosts = 1 + loadedPosts.length;
  const remainingPosts = nextPosts.length - loadedPosts.length;

  return (
    <div className="flex flex-col gap-0">
      {/* Initial post */}
      {renderPost(initialPost, 0, true)}

      {/* Dynamically loaded posts */}
      {loadedPosts.map((post, idx) => renderPost(post, idx + 1, false))}

      {/* Loading trigger / indicator */}
      <div ref={loadTriggerRef} className="py-8">
        {isLoading && (
          <div className="flex justify-center items-center gap-3 py-8">
            <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#00FF41" }} />
            <span className="text-white/60 text-sm">Carregando próximo post...</span>
          </div>
        )}
      </div>

      {/* Manual load button (after 5 auto-loaded posts) */}
      {!hasMore && remainingPosts > 0 && (
        <div className="flex flex-col items-center gap-4 py-12">
          <p className="text-white/40 text-sm">
            {remainingPosts} posts disponíveis
          </p>
          <button
            onClick={handleManualLoad}
            disabled={isLoading}
            className="px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center gap-2"
            style={{
              background: "rgba(0,255,65,0.15)",
              border: "1px solid rgba(0,255,65,0.3)",
              color: "#00FF41",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,255,65,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,255,65,0.15)";
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Carregando...
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Carregar mais posts
              </>
            )}
          </button>
        </div>
      )}

      {/* End of content message */}
      {remainingPosts === 0 && loadedPosts.length > 0 && (
        <div className="text-center py-12">
          <p className="text-white/40 text-sm">
            Você leu {totalPosts} posts. Fim do conteúdo disponível.
          </p>
        </div>
      )}
    </div>
  );
}
