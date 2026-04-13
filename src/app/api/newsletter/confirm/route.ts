/**
 * Newsletter Confirmation API
 *
 * GET /api/newsletter/confirm?token=<uuid>
 *
 * Confirms a newsletter subscription via double opt-in token.
 * Redirects to the confirmation page on success/failure.
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { notifyDiscord } from '@/lib/discord-notify';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://inovaway.org';
const DISCORD_WEBHOOK_LEADS = process.env.DISCORD_WEBHOOK_LEADS;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(`${SITE_URL}/newsletter/confirmacao?status=error&reason=missing_token`);
  }

  // UUID validation
  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!UUID_REGEX.test(token)) {
    return NextResponse.redirect(`${SITE_URL}/newsletter/confirmacao?status=error&reason=invalid_token`);
  }

  try {
    // Find subscriber by token
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: subscriber, error: findError } = await (supabaseAdmin as any)
      .from('newsletter_subscribers')
      .select('id, email, status, locale')
      .eq('confirmation_token', token)
      .maybeSingle() as { data: { id: string; email: string; status: string; locale: string } | null; error: Error | null };

    if (findError || !subscriber) {
      return NextResponse.redirect(`${SITE_URL}/newsletter/confirmacao?status=error&reason=not_found`);
    }

    if (subscriber.status === 'confirmed') {
      return NextResponse.redirect(`${SITE_URL}/newsletter/confirmacao?status=already_confirmed`);
    }

    // Confirm the subscriber
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: updateError } = await (supabaseAdmin as any)
      .from('newsletter_subscribers')
      .update({
        status: 'confirmed',
        confirmed_at: new Date().toISOString(),
        confirmation_token: null,
      })
      .eq('id', subscriber.id) as { error: Error | null };

    if (updateError) {
      console.error('[Newsletter Confirm] Update error:', updateError);
      return NextResponse.redirect(`${SITE_URL}/newsletter/confirmacao?status=error&reason=update_failed`);
    }

    // Discord notification
    if (DISCORD_WEBHOOK_LEADS) {
      void notifyDiscord(DISCORD_WEBHOOK_LEADS, {
        embeds: [{
          title: '✅ Newsletter — Inscrição Confirmada',
          description: `**📧 Email:** ${subscriber.email}\n**🌍 Locale:** ${subscriber.locale || 'pt'}`,
          color: 0x00FF41,
          timestamp: new Date().toISOString(),
          footer: { text: 'INOVAWAY Newsletter • confirmed' },
        }],
      });
    }

    return NextResponse.redirect(`${SITE_URL}/newsletter/confirmacao?status=success`);
  } catch (err) {
    console.error('[Newsletter Confirm] Unexpected error:', err);
    return NextResponse.redirect(`${SITE_URL}/newsletter/confirmacao?status=error&reason=server_error`);
  }
}
