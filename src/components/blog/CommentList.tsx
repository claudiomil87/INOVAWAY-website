'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Comment } from '@/types/comments';
import CommentForm from './CommentForm';

// ── Types ─────────────────────────────────────────────────────────────────────

type SortOrder = 'newest' | 'oldest';

interface OptimisticFormData {
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
}

interface CommentListProps {
  postSlug: string;
  comments: Comment[];
  locale?: string;
  latestCommentId?: string | null;
  onOptimisticSubmit?: (data: OptimisticFormData, onReset: () => void) => Promise<void>;
  /** Legacy callback — kept for backwards compat */
  onReplySuccess?: () => void;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getDiceBearUrl(name: string): string {
  const encoded = encodeURIComponent(name);
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encoded}&backgroundColor=6366f1,06b6d4,059669&backgroundType=solid&fontFamily=Arial`;
}

function getAvatarFallbackColor(name: string): string {
  const colors = ['#6366f1', '#06B6D4', '#059669', '#8B5CF6'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatRelativeTime(dateString: string, locale: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSec < 60) return locale === 'pt' ? 'agora mesmo' : 'just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60)
    return locale === 'pt'
      ? `há ${diffMin} min${diffMin > 1 ? 's' : ''}`
      : `${diffMin} min${diffMin > 1 ? 's' : ''} ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24)
    return locale === 'pt'
      ? `há ${diffH} hora${diffH > 1 ? 's' : ''}`
      : `${diffH} hour${diffH > 1 ? 's' : ''} ago`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 30)
    return locale === 'pt'
      ? `há ${diffD} dia${diffD > 1 ? 's' : ''}`
      : `${diffD} day${diffD > 1 ? 's' : ''} ago`;
  const diffM = Math.floor(diffD / 30);
  if (diffM < 12)
    return locale === 'pt'
      ? `há ${diffM} mês${diffM > 1 ? 'es' : ''}`
      : `${diffM} month${diffM > 1 ? 's' : ''} ago`;
  const diffY = Math.floor(diffM / 12);
  return locale === 'pt'
    ? `há ${diffY} ano${diffY > 1 ? 's' : ''}`
    : `${diffY} year${diffY > 1 ? 's' : ''} ago`;
}

// ── Avatar component with DiceBear + initials fallback ───────────────────────

function CommentAvatar({ name }: { name: string }) {
  const [imgFailed, setImgFailed] = useState(false);
  const dicebearUrl = getDiceBearUrl(name);
  const fallbackColor = getAvatarFallbackColor(name);

  if (imgFailed) {
    return (
      <div
        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
        style={{ backgroundColor: fallbackColor }}
        aria-label={name}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={dicebearUrl}
      alt={name}
      width={36}
      height={36}
      className="flex-shrink-0 w-9 h-9 rounded-full"
      onError={() => setImgFailed(true)}
    />
  );
}

// ── Single comment item ───────────────────────────────────────────────────────

interface CommentItemProps {
  comment: Comment;
  postSlug: string;
  locale: string;
  depth?: number;
  isNew?: boolean;
  onOptimisticSubmit?: (data: OptimisticFormData, onReset: () => void) => Promise<void>;
  onReplySuccess?: () => void;
}

function CommentItem({
  comment,
  postSlug,
  locale,
  depth = 0,
  isNew = false,
  onOptimisticSubmit,
  onReplySuccess,
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  // Scroll-to + highlight for new comment
  useEffect(() => {
    if (!isNew || !itemRef.current) return;

    const el = itemRef.current;
    el.classList.add('comment-new');

    const scrollTimer = setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);

    const highlightTimer = setTimeout(() => {
      el.classList.remove('comment-new');
    }, 3000);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(highlightTimer);
    };
  }, [isNew]);

  const handleReplySubmit = useCallback(
    async (data: OptimisticFormData, onReset: () => void) => {
      if (onOptimisticSubmit) {
        await onOptimisticSubmit({ ...data, parent_id: comment.id }, () => {
          onReset();
          setShowReplyForm(false);
          onReplySuccess?.();
        });
      }
    },
    [comment.id, onOptimisticSubmit, onReplySuccess]
  );

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={[
        depth > 0 ? 'ml-6 sm:ml-10 border-l-2 pl-4 py-2' : 'py-2',
        comment.is_pending ? 'opacity-60' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={depth > 0 ? { borderLeftColor: '#06B6D4' } : {}}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <CommentAvatar name={comment.author_name} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1">
            <span className="text-white font-medium text-sm">{comment.author_name}</span>
            {comment.author_company && (
              <span className="text-slate-400 text-xs">· {comment.author_company}</span>
            )}
            <span className="text-slate-500 text-xs">
              · {formatRelativeTime(comment.created_at, locale)}
            </span>
            {comment.is_pending && (
              <span className="text-slate-500 text-xs animate-pulse">
                · {locale === 'pt' ? 'Enviando...' : 'Sending...'}
              </span>
            )}
          </div>

          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </p>

          {depth === 0 && !comment.is_pending && (
            <button
              onClick={() => setShowReplyForm((v) => !v)}
              className="mt-2 text-xs font-medium transition-colors"
              style={{ color: '#06B6D4' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#00FF41')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#06B6D4')}
            >
              {showReplyForm
                ? locale === 'pt'
                  ? 'Cancelar'
                  : 'Cancel'
                : locale === 'pt'
                  ? 'Responder'
                  : 'Reply'}
            </button>
          )}

          {showReplyForm && (
            <div
              className="mt-4 p-4 rounded-lg"
              style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(6,182,212,0.2)' }}
            >
              <CommentForm
                postSlug={postSlug}
                locale={locale}
                parentId={comment.id}
                onOptimisticSubmit={handleReplySubmit}
                onSuccess={() => setShowReplyForm(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postSlug={postSlug}
              locale={locale}
              depth={depth + 1}
              onOptimisticSubmit={onOptimisticSubmit}
              onReplySuccess={onReplySuccess}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ── CommentList (main export) ─────────────────────────────────────────────────

export default function CommentList({
  postSlug,
  comments,
  locale = 'pt',
  latestCommentId,
  onOptimisticSubmit,
  onReplySuccess,
}: CommentListProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  // Client-side sort via useMemo (only top-level; replies always chronological)
  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => {
      const ta = new Date(a.created_at).getTime();
      const tb = new Date(b.created_at).getTime();
      return sortOrder === 'newest' ? tb - ta : ta - tb;
    });
  }, [comments, sortOrder]);

  if (comments.length === 0) {
    return (
      <div className="text-center py-6">
        <span className="text-2xl mb-3 block" aria-hidden="true">💬</span>
        <p className="text-slate-500 text-sm">
          {locale === 'pt' ? 'Seja o primeiro a comentar!' : 'Be the first to comment!'}
        </p>
        <p className="text-slate-600 text-xs mt-1">
          {locale === 'pt'
            ? 'Compartilhe seus pensamentos sobre este post.'
            : 'Share your thoughts about this post.'}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Sort toggle */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-slate-500">
          {locale === 'pt' ? 'Ordenar:' : 'Sort:'}
        </span>
        {(['newest', 'oldest'] as SortOrder[]).map((order) => (
          <button
            key={order}
            onClick={() => setSortOrder(order)}
            className={[
              'text-sm px-3 py-1 rounded-full transition-colors',
              sortOrder === order
                ? 'bg-cyan-900/50 text-cyan-400 border border-cyan-700'
                : 'text-slate-400 hover:text-slate-200 border border-transparent',
            ].join(' ')}
          >
            {order === 'newest'
              ? locale === 'pt'
                ? 'Mais recentes'
                : 'Newest first'
              : locale === 'pt'
                ? 'Mais antigos'
                : 'Oldest first'}
          </button>
        ))}
      </div>

      <div className="space-y-6 divide-y divide-slate-800">
        {sortedComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            postSlug={postSlug}
            locale={locale}
            depth={0}
            isNew={comment.id === latestCommentId}
            onOptimisticSubmit={onOptimisticSubmit}
            onReplySuccess={onReplySuccess}
          />
        ))}
      </div>
    </div>
  );
}
