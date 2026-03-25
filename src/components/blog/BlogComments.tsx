"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import type { GetCommentsResponse, Comment, CreateCommentResponse } from '@/types/comments';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { useRealtimeComments } from '@/hooks/useRealtimeComments';

interface BlogCommentsProps {
  postSlug: string;
  locale?: string;
}

export default function BlogComments({ postSlug, locale = 'pt' }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentCount, setCommentCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [latestCommentId, setLatestCommentId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // ── Supabase Realtime subscription ──────────────────────────────────────
  useRealtimeComments(postSlug, setComments);

  // ── Initial data fetch ───────────────────────────────────────────────────
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?slug=${encodeURIComponent(postSlug)}`);
        const data: GetCommentsResponse = await response.json();

        if (data.success) {
          setCommentCount(data.total);
          setComments(data.comments);
        } else {
          setError(data.error || (locale === 'pt' ? 'Erro ao carregar comentários' : 'Error loading comments'));
        }
      } catch {
        setError(locale === 'pt' ? 'Erro de conexão' : 'Connection error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [postSlug, locale]);

  // ── Intersection Observer for lazy visibility ────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Optimistic submit handler ────────────────────────────────────────────
  const handleOptimisticSubmit = useCallback(
    async (
      formData: {
        author_name: string;
        author_email: string;
        author_company?: string;
        content: string;
        consent_lgpd: boolean;
        consent_marketing: boolean;
        website: string;
        _ts: number;
        _turnstile?: string;
        parent_id?: string;
      },
      onFormReset: () => void
    ) => {
      const tempId = `temp-${Date.now()}`;
      const optimisticComment: Comment = {
        id: tempId,
        post_slug: postSlug,
        author_name: formData.author_name,
        author_company: formData.author_company || null,
        content: formData.content,
        parent_id: formData.parent_id || null,
        created_at: new Date().toISOString(),
        replies: [],
        is_pending: true,
      };

      // 1. Add optimistic comment immediately
      if (!formData.parent_id) {
        setComments((prev) => [optimisticComment, ...prev]);
      } else {
        setComments((prev) =>
          prev.map((c) => {
            if (c.id === formData.parent_id) {
              return { ...c, replies: [...(c.replies ?? []), optimisticComment] };
            }
            return c;
          })
        );
      }

      try {
        const response = await fetch('/api/comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            post_slug: postSlug,
            author_name: formData.author_name.trim(),
            author_email: formData.author_email.trim().toLowerCase(),
            author_company: formData.author_company?.trim() || undefined,
            content: formData.content.trim(),
            parent_id: formData.parent_id,
            consent_lgpd: formData.consent_lgpd,
            consent_marketing: formData.consent_marketing,
            website: formData.website,
            _ts: formData._ts,
            _turnstile: formData._turnstile,
          }),
        });

        const result: CreateCommentResponse = await response.json();

        if (result.success && result.comment) {
          const realComment = { ...result.comment, replies: [], is_pending: false };

          // Replace temp with real comment
          if (!formData.parent_id) {
            setComments((prev) =>
              prev.map((c) => (c.id === tempId ? realComment : c))
            );
          } else {
            setComments((prev) =>
              prev.map((c) => {
                if (c.id === formData.parent_id) {
                  return {
                    ...c,
                    replies: (c.replies ?? []).map((r) =>
                      r.id === tempId ? realComment : r
                    ),
                  };
                }
                return c;
              })
            );
          }

          setCommentCount((n) => n + 1);
          setLatestCommentId(realComment.id);
          toast.success(
            locale === 'pt' ? 'Comentário enviado com sucesso! 🎉' : 'Comment submitted successfully! 🎉'
          );
          onFormReset();
        } else {
          throw new Error(result.error || 'Unknown error');
        }
      } catch (err: unknown) {
        // Rollback: remove optimistic comment
        if (!formData.parent_id) {
          setComments((prev) => prev.filter((c) => c.id !== tempId));
        } else {
          setComments((prev) =>
            prev.map((c) => {
              if (c.id === formData.parent_id) {
                return {
                  ...c,
                  replies: (c.replies ?? []).filter((r) => r.id !== tempId),
                };
              }
              return c;
            })
          );
        }

        const msg = err instanceof Error ? err.message : String(err);
        toast.error(
          msg.includes('rápido') || msg.includes('Too fast')
            ? (locale === 'pt' ? 'Envio muito rápido. Tente novamente.' : 'Submission too fast. Try again.')
            : (locale === 'pt' ? 'Erro ao enviar. Tente novamente.' : 'Error sending. Please try again.')
        );
      }
    },
    [postSlug, locale]
  );

  const getCommentText = (count: number) => {
    if (locale === 'pt') return count === 1 ? '1 comentário' : `${count} comentários`;
    return count === 1 ? '1 comment' : `${count} comments`;
  };

  return (
    <div
      ref={sectionRef}
      className="mt-12 pt-8 border-t border-slate-800"
      style={{
        borderTop: '1px solid transparent',
        backgroundImage: 'linear-gradient(to right, transparent, #06b6d4, #059669, transparent)',
        backgroundClip: 'content-box',
        backgroundOrigin: 'border-box',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {locale === 'pt' ? 'Comentários' : 'Comments'}
          </h2>
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-slate-400">
                {locale === 'pt' ? 'Carregando comentários...' : 'Loading comments...'}
              </span>
            </div>
          ) : error ? (
            <div className="text-red-400">{error}</div>
          ) : (
            <p className="text-slate-400">{getCommentText(commentCount)}</p>
          )}
        </div>

        {isVisible && (
          <div className="space-y-8">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <CommentList
                postSlug={postSlug}
                comments={comments}
                locale={locale}
                latestCommentId={latestCommentId}
                onOptimisticSubmit={handleOptimisticSubmit}
              />
            </div>

            <div className="h-px bg-slate-800 my-8" />

            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold text-white mb-4">
                {locale === 'pt' ? 'Deixe um comentário' : 'Leave a comment'}
              </h3>
              <CommentForm
                postSlug={postSlug}
                locale={locale}
                onOptimisticSubmit={handleOptimisticSubmit}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
