import { NextRequest, NextResponse } from 'next/server';
import { notifyDiscord } from '@/lib/discord-notify';

const HNBCRM_API_URL = 'https://tacit-chicken-195.convex.site/api/v1/inbound/lead';
const HNBCRM_API_KEY = process.env.HNBCRM_API_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, locale, estimatedSaving } = body;

    if (!email || !estimatedSaving) {
      return NextResponse.json(
        { error: 'Email e economia estimada são obrigatórios.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido.' },
        { status: 400 }
      );
    }

    const response = await fetch(HNBCRM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': HNBCRM_API_KEY,
      },
      body: JSON.stringify({
        title: `[ROI Calculator] Lead: ${email}`,
        contact: {
          email: email,
        },
        message: `Lead capturado via Calculadora de ROI INOVAWAY.\n\nEmail: ${email}\nEconomia estimada: ${estimatedSaving}\nLocale: ${locale || 'pt'}`,
        channel: 'roi-calculator',
        tags: ['roi-calculator', 'lead-magnet', 'inovaway', `locale:${locale || 'pt'}`],
        temperature: 'hot',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('HNBCRM error:', data);
      return NextResponse.json(
        { error: data.error || 'Erro ao registrar lead do ROI.' },
        { status: response.status }
      );
    }

    const DISCORD_WEBHOOK_LEADS = process.env.DISCORD_WEBHOOK_LEADS;
    if (DISCORD_WEBHOOK_LEADS) {
      void notifyDiscord(DISCORD_WEBHOOK_LEADS, {
        embeds: [{
          title: '🎯 Novo Lead — Calculadora ROI',
          description: `**📧 Email:** ${email}\n**🔥 Temperatura:** Hot\n**📝 Origem:** Calculadora de ROI\n**📊 Resultado:** ${estimatedSaving}`,
          color: 0x00FF41, // green - ROI lead
          timestamp: new Date().toISOString(),
          footer: { text: 'INOVAWAY Leads • roi-calculator' },
        }],
      });
    }

    return NextResponse.json({ success: true, leadId: data.leadId });
  } catch (error) {
    console.error('ROI Lead API error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
