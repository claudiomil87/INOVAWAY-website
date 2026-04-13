/**
 * Newsletter Subscribe API
 *
 * POST /api/newsletter/subscribe
 *
 * Body:
 * {
 *   email: string              — subscriber email (required)
 *   consent_lgpd: boolean      — LGPD consent (required)
 *   consent_marketing: boolean  — marketing opt-in (optional)
 *   locale?: string            — 'pt' | 'en' (default: 'pt')
 *   website?: string           — honeypot (must be empty)
 * }
 *
 * Flow:
 * 1. Validate input + honeypot
 * 2. Check for duplicate email
 * 3. Insert into newsletter_subscribers (Supabase)
 * 4. Send double opt-in confirmation email (Resend)
 * 5. Notify Discord (fire-and-forget)
 *
 * Env vars:
 *   SUPABASE_URL, SUPABASE_SERVICE_KEY
 *   RESEND_API_KEY
 *   DISCORD_WEBHOOK_LEADS (optional)
 *   NEXT_PUBLIC_SITE_URL (for confirmation link)
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { notifyDiscord } from '@/lib/discord-notify';
import { isValidEmail, sanitizeText, getClientIp } from '@/lib/comment-utils';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://inovaway.org';
const DISCORD_WEBHOOK_LEADS = process.env.DISCORD_WEBHOOK_LEADS;

// ─── CORS ────────────────────────────────────────────────────────────────────

const ALLOWED_ORIGINS = ['https://inovaway.org', 'https://www.inovaway.org'];

function getCorsHeaders(request?: NextRequest): Record<string, string> {
  const origin = request?.headers.get('origin') ?? '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: getCorsHeaders(request) });
}

// ─── POST /api/newsletter/subscribe ──────────────────────────────────────────

interface SubscribeRequest {
  email: string;
  consent_lgpd: boolean;
  consent_marketing?: boolean;
  locale?: string;
  website?: string;
  _ts?: number;
}

interface SubscribeResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<SubscribeResponse>> {
  const corsHeaders = getCorsHeaders(request);

  try {
    const body = (await request.json()) as SubscribeRequest;
    const locale = body.locale === 'en' ? 'en' : 'pt';
    const ip = getClientIp(request);

    // ── 1. Honeypot ──
    if (body.website && body.website.trim().length > 0) {
      return NextResponse.json({ success: true }, { status: 200, headers: corsHeaders });
    }

    // ── 2. Timing check ──
    if (body._ts) {
      const elapsed = Date.now() - Number(body._ts);
      if (elapsed < 2000) {
        return NextResponse.json(
          { success: false, error: locale === 'pt' ? 'Envio muito rápido.' : 'Submission too fast.' },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    // ── 3. Validate email ──
    if (!body.email || !isValidEmail(body.email)) {
      return NextResponse.json(
        {
          success: false,
          error: locale === 'pt' ? 'Email inválido.' : 'Invalid email.',
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const email = body.email.toLowerCase().trim();

    // ── 4. LGPD consent required ──
    if (!body.consent_lgpd) {
      return NextResponse.json(
        {
          success: false,
          error: locale === 'pt'
            ? 'Você precisa aceitar a Política de Privacidade.'
            : 'You must accept the Privacy Policy.',
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // ── 5. Check for duplicate ──
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existing, error: checkError } = await (supabaseAdmin as any)
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', email)
      .maybeSingle() as { data: { id: string; status: string } | null; error: Error | null };

    if (checkError) {
      console.error('[Newsletter API] Check error:', checkError);
      return NextResponse.json(
        { success: false, error: 'Erro interno. Tente novamente.' },
        { status: 500, headers: corsHeaders }
      );
    }

    if (existing) {
      if (existing.status === 'confirmed') {
        return NextResponse.json(
          {
            success: false,
            error: locale === 'pt'
              ? 'Este email já está inscrito na newsletter.'
              : 'This email is already subscribed.',
          },
          { status: 409, headers: corsHeaders }
        );
      }
      // Pending — resend confirmation
      if (existing.status === 'pending') {
        // Re-send confirmation email
        void sendConfirmationEmail(email, locale);
        return NextResponse.json(
          {
            success: true,
            message: locale === 'pt'
              ? 'Email de confirmação reenviado! Verifique sua caixa de entrada.'
              : 'Confirmation email resent! Check your inbox.',
          },
          { status: 200, headers: corsHeaders }
        );
      }
    }

    // ── 6. Generate confirmation token ──
    const confirmationToken = crypto.randomUUID();

    // ── 7. Insert subscriber ──
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: insertError } = await (supabaseAdmin as any)
      .from('newsletter_subscribers')
      .insert({
        email,
        status: 'pending',
        consent_lgpd: true,
        consent_marketing: body.consent_marketing ?? false,
        confirmation_token: confirmationToken,
        ip_address: ip,
        locale,
      }) as { error: Error | null };

    if (insertError) {
      console.error('[Newsletter API] Insert error:', insertError);
      return NextResponse.json(
        { success: false, error: 'Erro ao cadastrar. Tente novamente.' },
        { status: 500, headers: corsHeaders }
      );
    }

    // ── 8. Send confirmation email (fire-and-forget) ──
    void sendConfirmationEmail(email, locale, confirmationToken);

    // ── 9. Discord notification (fire-and-forget) ──
    if (DISCORD_WEBHOOK_LEADS) {
      void notifyDiscord(DISCORD_WEBHOOK_LEADS, {
        embeds: [{
          title: '📬 Nova Inscrição na Newsletter',
          description:
            `**📧 Email:** ${email}\n` +
            `**🌍 Locale:** ${locale}\n` +
            `**📊 Status:** ⏳ Pendente (double opt-in)\n` +
            `**🎯 Marketing:** ${body.consent_marketing ? 'Sim' : 'Não'}`,
          color: 0x8B5CF6, // purple
          timestamp: new Date().toISOString(),
          footer: { text: 'INOVAWAY Newsletter • newsletter-subscribe' },
        }],
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: locale === 'pt'
          ? 'Verifique seu email para confirmar a inscrição!'
          : 'Check your email to confirm your subscription!',
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.error('[Newsletter API] Unexpected error:', err);
    return NextResponse.json(
      { success: false, error: 'Erro interno.' },
      { status: 500, headers: getCorsHeaders() }
    );
  }
}

// ─── Confirmation Email via Resend ───────────────────────────────────────────

async function sendConfirmationEmail(
  email: string,
  locale: string,
  token?: string
): Promise<void> {
  if (!RESEND_API_KEY) {
    console.warn('[Newsletter API] RESEND_API_KEY not configured — skipping email');
    return;
  }

  const isEn = locale === 'en';
  const confirmUrl = token
    ? `${SITE_URL}/api/newsletter/confirm?token=${token}`
    : `${SITE_URL}/api/newsletter/confirm?email=${encodeURIComponent(email)}`;

  const subject = isEn
    ? 'Confirm your subscription — INOVAWAY Intelligence'
    : 'Confirme sua inscrição — INOVAWAY Intelligence';

  const html = `
<!DOCTYPE html>
<html lang="${isEn ? 'en' : 'pt-BR'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#0F172A;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0F172A;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <span style="font-size:28px;font-weight:800;color:#00FF41;letter-spacing:-0.5px;">INOVAWAY</span>
            </td>
          </tr>
          <!-- Card -->
          <tr>
            <td style="background:#1E293B;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px 32px;">
              <h1 style="color:#F1F5F9;font-size:24px;margin:0 0 16px;">
                ${isEn ? '🔐 Confirm your subscription' : '🔐 Confirme sua inscrição'}
              </h1>
              <p style="color:#94A3B8;font-size:16px;line-height:1.6;margin:0 0 24px;">
                ${isEn
                  ? 'You signed up for the <strong style="color:#00FF41;">INOVAWAY Intelligence</strong> newsletter. Click below to confirm:'
                  : 'Você se inscreveu na newsletter <strong style="color:#00FF41;">INOVAWAY Intelligence</strong>. Clique abaixo para confirmar:'}
              </p>
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto 24px;">
                <tr>
                  <td style="background:#00FF41;border-radius:8px;">
                    <a href="${confirmUrl}" target="_blank" style="display:inline-block;padding:14px 32px;color:#0F172A;font-size:16px;font-weight:700;text-decoration:none;border-radius:8px;">
                      ${isEn ? 'Confirm Subscription →' : 'Confirmar Inscrição →'}
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color:#64748B;font-size:13px;line-height:1.5;margin:0;">
                ${isEn
                  ? 'This link expires in 24 hours. If you didn\'t request this, ignore this email.'
                  : 'Este link expira em 24 horas. Se você não solicitou, ignore este email.'}
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="color:#475569;font-size:12px;margin:0;">
                INOVAWAY Intelligence · ${SITE_URL}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'INOVAWAY Intelligence <newsletter@inovaway.org>',
        to: [email],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[Newsletter API] Resend error:', res.status, errText);
    }
  } catch (err) {
    console.error('[Newsletter API] Resend exception:', err);
  }
}
