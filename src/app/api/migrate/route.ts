import { NextResponse } from 'next/server'
import pg from 'pg'

const MIGRATION_SECRET = 'inovaway-migrate-2026-03-25-temp'

export async function POST(req: Request) {
  try {
    const { secret } = await req.json()
    if (secret !== MIGRATION_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabaseUrl = process.env.SUPABASE_URL
    if (!supabaseUrl) {
      return NextResponse.json({ error: 'SUPABASE_URL not set' }, { status: 500 })
    }

    // Extract project ref from URL
    const projectRef = new URL(supabaseUrl).hostname.split('.')[0]
    
    // Connect via Supabase's direct connection (IPv6) or pooler
    // Vercel supports IPv6, so direct connection should work from Vercel!
    const databaseUrl = process.env.DATABASE_URL || 
      `postgresql://postgres:${process.env.SUPABASE_DB_PASSWORD}@db.${projectRef}.supabase.co:5432/postgres`

    const client = new pg.Client({
      connectionString: databaseUrl,
      ssl: { rejectUnauthorized: false }
    })

    await client.connect()

    const migration = `
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TABLE IF NOT EXISTS public.comments (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        post_slug TEXT NOT NULL,
        author_name TEXT NOT NULL,
        author_email TEXT NOT NULL,
        author_company TEXT,
        content TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'spam')),
        parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
        crm_synced BOOLEAN NOT NULL DEFAULT false,
        crm_contact_id TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        approved_at TIMESTAMPTZ,
        ip_address TEXT
      );

      CREATE INDEX IF NOT EXISTS idx_comments_post_slug ON public.comments(post_slug);
      CREATE INDEX IF NOT EXISTS idx_comments_status ON public.comments(status);
      CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON public.comments(parent_id);
      CREATE INDEX IF NOT EXISTS idx_comments_author_email ON public.comments(author_email);
      CREATE INDEX IF NOT EXISTS idx_comments_created_at ON public.comments(created_at DESC);

      CREATE TABLE IF NOT EXISTS public.comment_consents (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        comment_id UUID NOT NULL REFERENCES public.comments(id) ON DELETE CASCADE,
        email TEXT NOT NULL,
        consent_text TEXT NOT NULL,
        consent_marketing BOOLEAN NOT NULL DEFAULT false,
        ip_address TEXT,
        consented_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE INDEX IF NOT EXISTS idx_consents_comment_id ON public.comment_consents(comment_id);
      CREATE INDEX IF NOT EXISTS idx_consents_email ON public.comment_consents(email);

      ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.comment_consents ENABLE ROW LEVEL SECURITY;

      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can read approved comments') THEN
          CREATE POLICY "Public can read approved comments" ON public.comments FOR SELECT USING (status = 'approved');
        END IF;
      END $$;

      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'No anonymous inserts') THEN
          CREATE POLICY "No anonymous inserts" ON public.comments FOR INSERT WITH CHECK (false);
        END IF;
      END $$;

      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'No anonymous inserts on consents') THEN
          CREATE POLICY "No anonymous inserts on consents" ON public.comment_consents FOR INSERT WITH CHECK (false);
        END IF;
      END $$;
    `

    await client.query(migration)
    await client.end()

    return NextResponse.json({ 
      success: true, 
      message: 'Migration completed successfully. Tables created: comments, comment_consents',
      note: 'DELETE THIS ROUTE AFTER USE - /api/migrate'
    })
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      hint: 'Make sure SUPABASE_DB_PASSWORD or DATABASE_URL env var is set'
    }, { status: 500 })
  }
}
