/**
 * Comment System — TypeScript Types
 *
 * Shared between API routes (backend) and React components (frontend).
 * Import from '@/types/comments'.
 */

// ─── Database Row Types ──────────────────────────────────────────────────────

export type CommentStatus = 'pending' | 'approved' | 'spam';

export interface CommentRow {
  id: string;
  post_slug: string;
  author_name: string;
  author_email: string;
  author_company: string | null;
  content: string;
  status: CommentStatus;
  parent_id: string | null;
  crm_synced: boolean;
  crm_contact_id: string | null;
  created_at: string;
  approved_at: string | null;
  ip_address: string | null;
}

export interface CommentConsentRow {
  id: string;
  comment_id: string;
  email: string;
  consent_text: string;
  consent_marketing: boolean;
  ip_address: string | null;
  consented_at: string;
}

// ─── API Request / Response Types ───────────────────────────────────────────

/** Body for POST /api/comments */
export interface CreateCommentRequest {
  post_slug: string;
  author_name: string;
  author_email: string;
  author_company?: string;
  content: string;
  parent_id?: string;
  /** LGPD consent — must be true to submit */
  consent_lgpd: boolean;
  /** Marketing consent for CRM lead capture */
  consent_marketing?: boolean;
  /** Honeypot — must be empty (bots fill it) */
  website?: string;
}

/** Public comment returned by GET /api/comments */
export interface Comment {
  id: string;
  post_slug: string;
  author_name: string;
  /** Email is NOT returned in public API — only stored server-side */
  author_company: string | null;
  content: string;
  parent_id: string | null;
  created_at: string;
  /** Nested replies (populated by threading logic) */
  replies?: Comment[];
}

/** Response from POST /api/comments */
export interface CreateCommentResponse {
  success: boolean;
  comment?: Comment;
  error?: string;
}

/** Response from GET /api/comments?slug=xxx */
export interface GetCommentsResponse {
  success: boolean;
  comments: Comment[];
  total: number;
  error?: string;
}

// ─── Supabase Database Type (for typed client) ───────────────────────────────

export type Database = {
  public: {
    Tables: {
      comments: {
        Row: CommentRow;
        Insert: Omit<CommentRow, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<CommentRow>;
      };
      comment_consents: {
        Row: CommentConsentRow;
        Insert: Omit<CommentConsentRow, 'id' | 'consented_at'> & {
          id?: string;
          consented_at?: string;
        };
        Update: Partial<CommentConsentRow>;
      };
    };
  };
};
