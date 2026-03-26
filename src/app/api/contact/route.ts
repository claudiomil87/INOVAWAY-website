import { NextRequest, NextResponse } from 'next/server';
import { notifyDiscord } from '@/lib/discord-notify';

const HNBCRM_API_URL = 'https://tacit-chicken-195.convex.site/api/v1/inbound/lead';
const HNBCRM_API_KEY = process.env.HNBCRM_API_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const localeLabel = body.locale === 'en' ? 'English' : 'Português';
    const localeTag = body.locale === 'en' ? '[EN]' : '[PT]';

    const response = await fetch(HNBCRM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': HNBCRM_API_KEY,
      },
      body: JSON.stringify({
        title: `${localeTag} Lead Site INOVAWAY: ${body.name}`,
        contact: {
          firstName: body.name?.split(' ')[0] || body.name,
          lastName: body.name?.split(' ').slice(1).join(' ') || '',
          email: body.email,
          phone: body.phone,
          company: body.company,
        },
        message: [
          body.company ? `Empresa: ${body.company}` : null,
          `Serviços de interesse: ${body.services?.length ? body.services.join(', ') : 'Não especificado'}`,
          `Orçamento aproximado: ${body.budget || 'Não informado'}`,
          `Idioma do site: ${localeLabel}`,
          `\nMensagem do lead:\n${body.message || 'Sem mensagem adicional'}`,
        ].filter(Boolean).join('\n'),
        channel: 'webchat',
        tags: ['website', 'inovaway.org', `locale:${body.locale || 'pt'}`],
        temperature: 'warm',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Erro ao enviar' },
        { status: response.status }
      );
    }

    const DISCORD_WEBHOOK_LEADS = process.env.DISCORD_WEBHOOK_LEADS;
    if (DISCORD_WEBHOOK_LEADS) {
      void notifyDiscord(DISCORD_WEBHOOK_LEADS, {
        embeds: [{
          title: '🎯 Novo Lead — Formulário de Contato',
          description: `**👤 Nome:** ${body.name}\n**📧 Email:** ${body.email}\n**📱 Telefone:** ${body.phone || 'N/A'}\n**🏢 Empresa:** ${body.company || 'N/A'}\n**🔧 Serviços:** ${body.services?.join(', ') || 'N/A'}\n**💰 Orçamento:** ${body.budget || 'N/A'}\n**💬 Mensagem:** "${(body.message || '').slice(0, 200)}"\n**Locale:** ${localeLabel}`,
          color: 0xFF6B00, // orange - hot lead
          timestamp: new Date().toISOString(),
          footer: { text: 'INOVAWAY Leads • formulário de contato' },
        }],
      });
    }

    return NextResponse.json({ success: true, leadId: data.leadId });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
