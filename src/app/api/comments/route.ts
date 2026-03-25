/**
 * Blog Comments API
 *
 * POST /api/comments — Create a new comment
 * GET  /api/comments?slug=<post_slug> — List approved comments for a post
 *
 * ─── POST Body (CreateCommentRequest) ────────────────────────────────────────
 * {
 *   post_slug: string        — URL slug of the blog post
 *   author_name: string      — Commenter's name
 *   author_email: string     — Commenter's email (not exposed in GET)
 *   author_company?: string  — Optional company name
 *   content: string          — Comment text (max 2000 chars)
 *   parent_id?: string       — UUID of parent comment (for threading)
 *   consent_lgpd: true       — LGPD consent (required)
 *   consent_marketing?: bool — Marketing consent → triggers CRM lead
 *   website?: string         — Honeypot field (must be empty)
 * }
 *
 * ─── GET Query ───────────────────────────────────────────────────────────────
 * ?slug=<post_slug>   — Required: the post slug to fetch comments for
 *
 * ─── Security ────────────────────────────────────────────────────────────────
 * - Honeypot: 'website' field must be empty
 * - Rate limiting: max 3 comments/email/day (in-memory)
 * - Spam detection: excessive links, spam keywords
 * - Input sanitization: HTML/XSS stripped
 * - CORS: same-origin only
 * - LGPD consent stored separately in comment_consents table
 *
 * ─── Environment Variables ───────────────────────────────────────────────────
 * SUPABASE_URL         — Supabase project URL
 * SUPABASE_ANON_KEY    — Supabase anon key (public)
 * SUPABASE_SERVICE_KEY — Supabase service role key (secret, server-only)
 * HNBCRM_API_KEY       — HNBCRM API key for lead submission
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendCommentLeadToCRM } from '@/lib/hnbcrm';
import {
  checkSpam,
  isRateLimited,
  sanitizeText,
  isValidEmail,
  getClientIp,
} from '@/lib/comment-utils';
import type {
  CreateCommentRequest,
  CreateCommentResponse,
  GetCommentsResponse,
  Comment,
} from '@/types/comments';

// Local type for Supabase row data (used internally)
interface CommentRowResult {
  id: string;
  post_slug: string;
  author_name: string;
  author_company: string | null;
  content: string;
  parent_id: string | null;
  created_at: string;
}

// ─── CORS Headers ────────────────────────────────────────────────────────────

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://inovaway.org',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

// ─── POST /api/comments ──────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse<CreateCommentResponse>> {
  try {
    const body = (await request.json()) as CreateCommentRequest;
    const ip = getClientIp(request);

    // 1a. Classic honeypot check — bots fill the "website" field
    if (body.website && body.website.trim().length > 0) {
      // Return 200 to not reveal the honeypot to bots
      return NextResponse.json(
        { success: true },
        { status: 200, headers: CORS_HEADERS }
      );
    }

    // 1b. Timing honeypot — reject submissions faster than 3 seconds
    if (body._ts) {
      const elapsed = Date.now() - Number(body._ts);
      if (elapsed < 3000) {
        return NextResponse.json(
          { success: false, error: 'Envio muito rápido. Por favor, tente novamente.' },
          { status: 400, headers: CORS_HEADERS }
        );
      }
    }

    // 1c. Cloudflare Turnstile validation (only if secret key is configured)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      const token = body._turnstile;
      if (!token) {
        return NextResponse.json(
          { success: false, error: 'Verificação de segurança necessária.' },
          { status: 400, headers: CORS_HEADERS }
        );
      }
      const clientIp = getClientIp(request);
      const turnstileParams: Record<string, string> = {
        secret: turnstileSecret,
        response: token,
      };
      if (clientIp) turnstileParams.remoteip = clientIp;
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: new URLSearchParams(turnstileParams),
      });
      const verifyData = (await verifyRes.json()) as { success: boolean };
      if (!verifyData.success) {
        return NextResponse.json(
          { success: false, error: 'Verificação de segurança falhou. Tente novamente.' },
          { status: 403, headers: CORS_HEADERS }
        );
      }
    }

    // 2. Required fields validation
    const requiredFields: (keyof CreateCommentRequest)[] = [
      'post_slug', 'author_name', 'author_email', 'content',
    ];
    for (const field of requiredFields) {
      if (!body[field] || String(body[field]).trim() === '') {
        return NextResponse.json(
          { success: false, error: `Campo obrigatório ausente: ${field}` },
          { status: 400, headers: CORS_HEADERS }
        );
      }
    }

    // 3. LGPD consent required
    if (!body.consent_lgpd) {
      return NextResponse.json(
        { success: false, error: 'Consentimento LGPD é obrigatório.' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // 4. Email validation
    if (!isValidEmail(body.author_email)) {
      return NextResponse.json(
        { success: false, error: 'Email inválido.' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // 5. Content length
    if (body.content.length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Comentário muito longo (máximo 2000 caracteres).' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // 6. Rate limiting
    if (isRateLimited(body.author_email)) {
      return NextResponse.json(
        { success: false, error: 'Limite de comentários atingido. Tente novamente amanhã.' },
        { status: 429, headers: CORS_HEADERS }
      );
    }

    // 7. Sanitize inputs
    const sanitizedName = sanitizeText(body.author_name).slice(0, 100);
    const sanitizedContent = sanitizeText(body.content);
    const sanitizedCompany = body.author_company
      ? sanitizeText(body.author_company).slice(0, 100)
      : null;

    // 8. Spam check
    const spamResult = checkSpam(sanitizedContent);
    const status = spamResult.isSpam ? 'spam' : 'approved';

    // 9. Insert comment into Supabase
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: comment, error: insertError } = await (supabaseAdmin as any)
      .from('comments')
      .insert({
        post_slug: sanitizeText(body.post_slug).slice(0, 200),
        author_name: sanitizedName,
        author_email: body.author_email.toLowerCase().trim(),
        author_company: sanitizedCompany,
        content: sanitizedContent,
        status,
        parent_id: body.parent_id || null,
        crm_synced: false,
        crm_contact_id: null,
        approved_at: status === 'approved' ? new Date().toISOString() : null,
        ip_address: ip,
      })
      .select()
      .single() as { data: { id: string; post_slug: string; author_name: string; author_company: string | null; content: string; parent_id: string | null; created_at: string } | null; error: Error | null };

    if (insertError || !comment) {
      console.error('[Comments API] Insert error:', insertError);
      return NextResponse.json(
        { success: false, error: 'Erro ao salvar comentário. Tente novamente.' },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    // 10. Save LGPD consent record
    const consentText =
      'Ao comentar, você concorda com a nossa Política de Privacidade e autoriza o armazenamento dos seus dados para fins de moderação e resposta ao seu comentário.';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: consentError } = await (supabaseAdmin as any)
      .from('comment_consents')
      .insert({
        comment_id: comment.id,
        email: body.author_email.toLowerCase().trim(),
        consent_text: consentText,
        consent_marketing: body.consent_marketing ?? false,
        ip_address: ip,
      }) as { error: Error | null };

    if (consentError) {
      console.error('[Comments API] Consent insert error:', consentError);
      // Non-fatal — comment was saved, log the error
    }

    // 11. HNBCRM lead — only if user consented to marketing AND comment is not spam
    if (body.consent_marketing && status === 'approved') {
      // Fire-and-forget — never block the response
      const commentId = comment.id;
      void sendCommentLeadToCRM({
        authorName: sanitizedName,
        authorEmail: body.author_email.toLowerCase().trim(),
        authorCompany: sanitizedCompany,
        postSlug: comment.post_slug,
        commentExcerpt: sanitizedContent,
      }).then(() => {
        // Mark as CRM synced after successful submission
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (supabaseAdmin as any)
          .from('comments')
          .update({ crm_synced: true })
          .eq('id', commentId)
          .then(({ error }: { error: Error | null }) => {
            if (error) console.error('[Comments API] CRM sync update failed:', error);
          });
      });
    }

    // 12. Return public-safe comment (no email)
    const publicComment: Comment = {
      id: comment.id,
      post_slug: comment.post_slug,
      author_name: comment.author_name,
      author_company: comment.author_company,
      content: comment.content,
      parent_id: comment.parent_id,
      created_at: comment.created_at,
    };

    return NextResponse.json(
      { success: true, comment: publicComment },
      { status: 201, headers: CORS_HEADERS }
    );
  } catch (err) {
    console.error('[Comments API] Unexpected error:', err);
    return NextResponse.json(
      { success: false, error: 'Erro interno. Tente novamente.' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// ─── GET /api/comments?slug=xxx ──────────────────────────────────────────────

export async function GET(request: NextRequest): Promise<NextResponse<GetCommentsResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug || slug.trim() === '') {
      return NextResponse.json(
        { success: false, comments: [], total: 0, error: 'Parâmetro slug é obrigatório.' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const { data: rows, error } = await supabaseAdmin
      .from('comments')
      .select('id, post_slug, author_name, author_company, content, parent_id, created_at')
      .eq('post_slug', slug)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Comments API] Fetch error:', error);
      return NextResponse.json(
        { success: false, comments: [], total: 0, error: 'Erro ao buscar comentários.' },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    // Build threaded structure
    const comments = buildThreadedComments((rows ?? []) as CommentRowResult[]);

    return NextResponse.json(
      { success: true, comments, total: rows?.length ?? 0 },
      {
        status: 200,
        headers: {
          ...CORS_HEADERS,
          // No CDN caching — comments are dynamic (Realtime) and stale reads after submit
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache',
        },
      }
    );
  } catch (err) {
    console.error('[Comments API] Unexpected GET error:', err);
    return NextResponse.json(
      { success: false, comments: [], total: 0, error: 'Erro interno.' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Converts a flat list of comment rows into a nested thread structure.
 * Top-level comments contain their replies in the `replies` array.
 * Ordered: top-level DESC by created_at, replies ASC.
 */
function buildThreadedComments(rows: CommentRowResult[]): Comment[] {
  const map = new Map<string, Comment>();

  // First pass: create all Comment objects
  for (const row of rows) {
    map.set(row.id, {
      id: row.id,
      post_slug: row.post_slug,
      author_name: row.author_name,
      author_company: row.author_company,
      content: row.content,
      parent_id: row.parent_id,
      created_at: row.created_at,
      replies: [],
    });
  }

  const topLevel: Comment[] = [];

  // Second pass: attach replies to parents
  for (const comment of map.values()) {
    if (comment.parent_id && map.has(comment.parent_id)) {
      const parent = map.get(comment.parent_id)!;
      parent.replies = parent.replies ?? [];
      parent.replies.push(comment);
    } else {
      topLevel.push(comment);
    }
  }

  // Sort replies ascending (chronological order)
  for (const comment of map.values()) {
    if (comment.replies && comment.replies.length > 0) {
      comment.replies.sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }
  }

  return topLevel;
}
