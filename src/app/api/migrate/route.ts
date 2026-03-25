import { NextResponse } from 'next/server'
import pg from 'pg'

const MIGRATION_SECRET = 'inovaway-migrate-2026-03-25-temp'

export async function POST(req: Request) {
  try {
    const { secret } = await req.json()
    if (secret !== MIGRATION_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbPassword = process.env.SUPABASE_DB_PASSWORD
    const projectRef = 'iqrucqeanmbdpscohtoj'

    if (!dbPassword) {
      return NextResponse.json({ error: 'SUPABASE_DB_PASSWORD not set' }, { status: 500 })
    }

    const regions = ['aws-0-sa-east-1', 'aws-0-us-east-1', 'aws-0-us-east-2', 'aws-0-us-west-1', 'aws-0-eu-central-1']
    const connectionStrings: string[] = []

    for (const region of regions) {
      connectionStrings.push(
        `postgresql://postgres.${projectRef}:${dbPassword}@${region}.pooler.supabase.com:5432/postgres?sslmode=require`
      )
      connectionStrings.push(
        `postgresql://postgres.${projectRef}:${dbPassword}@${region}.pooler.supabase.com:6543/postgres?sslmode=require`
      )
    }
    // Direct connection (IPv6)
    connectionStrings.push(
      `postgresql://postgres:${dbPassword}@db.${projectRef}.supabase.co:5432/postgres?sslmode=require`
    )

    const errors: string[] = []

    for (const connStr of connectionStrings) {
      try {
        const client = new pg.Client({
          connectionString: connStr,
          ssl: { rejectUnauthorized: false },
          connectionTimeoutMillis: 8000,
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
        `

        await client.query(migration)

        // Create RLS policies (ignore if already exist)
        const policyQueries = [
          `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can read approved comments') THEN CREATE POLICY "Public can read approved comments" ON public.comments FOR SELECT USING (status = 'approved'); END IF; END $$`,
          `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'No anonymous inserts') THEN CREATE POLICY "No anonymous inserts" ON public.comments FOR INSERT WITH CHECK (false); END IF; END $$`,
          `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'No anonymous inserts on consents') THEN CREATE POLICY "No anonymous inserts on consents" ON public.comment_consents FOR INSERT WITH CHECK (false); END IF; END $$`,
        ]

        for (const pq of policyQueries) {
          await client.query(pq)
        }

        // Verify
        const { rows } = await client.query(
          "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('comments', 'comment_consents')"
        )

        await client.end()

        const host = connStr.split('@')[1]?.split('/')[0] || 'unknown'

        return NextResponse.json({
          success: true,
          tables: rows.map((r: { table_name: string }) => r.table_name),
          connection: host,
          message: 'Migration completed! DELETE this route now.',
        })
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e)
        const host = connStr.split('@')[1]?.split('?')[0] || 'unknown'
        errors.push(host + ': ' + msg)
        continue
      }
    }

    return NextResponse.json(
      {
        error: 'Could not connect to any database endpoint',
        attempts: errors,
        hint: 'Check SUPABASE_DB_PASSWORD and project region',
      },
      { status: 500 }
    )
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
