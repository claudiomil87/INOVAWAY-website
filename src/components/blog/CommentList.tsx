'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Comment } from '@/types/comments';
import CommentForm from './CommentForm';

interface CommentListProps {
  postSlug: string;
  comments: Comment[];
  locale?: string;
  onReplySuccess?: () => void;
}

function getAvatarColor(name: string): string {
  const colors = ['#00FF41', '#06B6D4', '#8B5CF6'];
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

interface CommentItemProps {
  comment: Comment;
  postSlug: string;
  locale: string;
  depth?: number;
  onReplySuccess?: () => void;
}

function CommentItem({ comment, postSlug, locale, depth = 0, onReplySuccess }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const avatarColor = getAvatarColor(comment.author_name);

  const handleReplySuccess = () => {
    setShowReplyForm(false);
    onReplySuccess?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={depth > 0 ? 'ml-6 sm:ml-10 border-l-2 pl-4 py-2' : 'py-2'}
      style={depth > 0 ? { borderLeftColor: '#06B6D4' } : {}}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-slate-900"
          style={{ backgroundColor: avatarColor }}
        >
          {getInitials(comment.author_name)}
        </div>

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
          </div>

          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </p>

          {depth === 0 && (
            <button
              onClick={() => setShowReplyForm((v) => !v)}
              className="mt-2 text-xs font-medium transition-colors"
              style={{ color: '#06B6D4' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00FF41')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#06B6D4')}
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
            <div className="mt-4 p-4 rounded-lg" style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(6,182,212,0.2)' }}>
              <CommentForm
                postSlug={postSlug}
                locale={locale}
                parentId={comment.id}
                onSuccess={handleReplySuccess}
              />
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postSlug={postSlug}
              locale={locale}
              depth={depth + 1}
              onReplySuccess={onReplySuccess}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function CommentList({ postSlug, comments, locale = 'pt', onReplySuccess }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 rounded-xl" style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-slate-400 text-sm">
          {locale === 'pt' ? 'Seja o primeiro a comentar!' : 'Be the first to comment!'}
        </p>
        <p className="text-slate-500 text-xs mt-1">
          {locale === 'pt'
            ? 'Compartilhe seus pensamentos sobre este post.'
            : 'Share your thoughts about this post.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 divide-y divide-slate-800">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postSlug={postSlug}
          locale={locale}
          depth={0}
          onReplySuccess={onReplySuccess}
        />
      ))}
    </div>
  );
}
