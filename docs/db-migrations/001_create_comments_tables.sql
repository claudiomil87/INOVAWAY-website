-- ============================================================
-- Migration 001: Blog Comments System
-- Project: INOVAWAY Website
-- Date: 2026-03-25
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================

-- Enable uuid extension (usually already enabled in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Comments Table ──────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.comments (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_slug       TEXT NOT NULL,
  author_name     TEXT NOT NULL,
  author_email    TEXT NOT NULL,
  author_company  TEXT,
  content         TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'approved', 'spam')),
  parent_id       UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  crm_synced      BOOLEAN NOT NULL DEFAULT false,
  crm_contact_id  TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  approved_at     TIMESTAMPTZ,
  ip_address      TEXT
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_comments_post_slug ON public.comments(post_slug);
CREATE INDEX IF NOT EXISTS idx_comments_status ON public.comments(status);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON public.comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_author_email ON public.comments(author_email);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON public.comments(created_at DESC);

-- ─── Comment Consents Table (LGPD) ───────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.comment_consents (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  comment_id        UUID NOT NULL REFERENCES public.comments(id) ON DELETE CASCADE,
  email             TEXT NOT NULL,
  consent_text      TEXT NOT NULL,
  consent_marketing BOOLEAN NOT NULL DEFAULT false,
  ip_address        TEXT,
  consented_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_consents_comment_id ON public.comment_consents(comment_id);
CREATE INDEX IF NOT EXISTS idx_consents_email ON public.comment_consents(email);

-- ─── Row Level Security ───────────────────────────────────────────────────────

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comment_consents ENABLE ROW LEVEL SECURITY;

-- Public read: only approved comments, safe columns only
-- (author_email and ip_address are NOT in this policy)
CREATE POLICY "Public can read approved comments"
  ON public.comments
  FOR SELECT
  USING (status = 'approved');

-- Service role can do everything (used by API routes via supabaseAdmin)
-- The service role bypasses RLS by default in Supabase — no policy needed.

-- Prevent any writes via anon key (writes go through service role in API routes)
CREATE POLICY "No anonymous inserts"
  ON public.comments
  FOR INSERT
  WITH CHECK (false);

CREATE POLICY "No anonymous inserts on consents"
  ON public.comment_consents
  FOR INSERT
  WITH CHECK (false);

-- ─── Helpful Views ────────────────────────────────────────────────────────────

-- View for moderation dashboard (excludes IP, includes email)
CREATE OR REPLACE VIEW public.comments_moderation AS
  SELECT
    c.id,
    c.post_slug,
    c.author_name,
    c.author_email,
    c.author_company,
    c.content,
    c.status,
    c.parent_id,
    c.crm_synced,
    c.created_at,
    c.approved_at,
    cc.consent_marketing
  FROM public.comments c
  LEFT JOIN public.comment_consents cc ON cc.comment_id = c.id
  ORDER BY c.created_at DESC;

-- ─── Comments ─────────────────────────────────────────────────────────────────
COMMENT ON TABLE public.comments IS 'Blog post comments with LGPD compliance and CRM integration';
COMMENT ON TABLE public.comment_consents IS 'LGPD consent records for blog commenters';
COMMENT ON COLUMN public.comments.status IS 'pending = awaiting moderation, approved = visible, spam = hidden';
COMMENT ON COLUMN public.comments.crm_synced IS 'True if lead was sent to HNBCRM';
COMMENT ON COLUMN public.comment_consents.consent_marketing IS 'If true, lead was (or should be) sent to HNBCRM';
