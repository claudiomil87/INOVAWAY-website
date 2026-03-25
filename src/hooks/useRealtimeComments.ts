'use client';

/**
 * useRealtimeComments — Subscribe to live comment inserts via Supabase Realtime.
 *
 * Usage:
 *   const { addRealtimeComment } = useRealtimeComments(postSlug, setComments);
 *
 * Requirements (in Supabase SQL):
 *   ALTER PUBLICATION supabase_realtime ADD TABLE comments;
 *
 * Env vars needed (NEXT_PUBLIC_* for client-side access):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * Graceful degradation: if env vars are missing, hook is a no-op.
 */

import { useEffect } from 'react';
import type { Comment } from '@/types/comments';

type SetComments = React.Dispatch<React.SetStateAction<Comment[]>>;

// Realtime uses NEXT_PUBLIC_ env vars (exposed to the browser)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Lazy singleton Supabase client for Realtime (browser-only, anon key)
let realtimeClient: ReturnType<typeof import('@supabase/supabase-js').createClient> | null = null;

function getRealtimeClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  if (!realtimeClient) {
    // Dynamic require to avoid SSR issues
    const { createClient } = require('@supabase/supabase-js');
    realtimeClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return realtimeClient;
}

export function useRealtimeComments(postSlug: string, setComments: SetComments) {
  useEffect(() => {
    const client = getRealtimeClient();
    if (!client) {
      // Graceful degradation: no Realtime if env vars not configured
      return;
    }

    const channelName = `comments:${postSlug}`;
    const channel = client
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `post_slug=eq.${postSlug}`,
        },
        (payload: { new: unknown }) => {
          const newComment = payload.new as Comment;

          setComments((prev) => {
            // Deduplication: if this comment already exists (optimistic or previous realtime),
            // replace it (in case optimistic was pending). If brand new, prepend.
            const exists = prev.find((c) => c.id === newComment.id);
            if (exists) {
              // Replace existing (e.g., replace optimistic with real)
              return prev.map((c) => (c.id === newComment.id ? { ...newComment, replies: c.replies } : c));
            }
            // New comment from another user — prepend to top-level (parent_id check)
            if (!newComment.parent_id) {
              return [{ ...newComment, replies: [] }, ...prev];
            }
            // Reply: add to parent's replies
            return prev.map((c) => {
              if (c.id === newComment.parent_id) {
                return {
                  ...c,
                  replies: [...(c.replies ?? []), newComment],
                };
              }
              return c;
            });
          });
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, [postSlug, setComments]);
}
