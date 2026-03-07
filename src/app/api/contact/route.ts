import { NextRequest, NextResponse } from 'next/server';

const HNBCRM_API_URL = 'https://tacit-chicken-195.convex.site/api/v1/inbound/lead';
const HNBCRM_API_KEY = process.env.HNBCRM_API_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(HNBCRM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': HNBCRM_API_KEY,
      },
      body: JSON.stringify({
        title: `Lead Site INOVAWAY: ${body.name}`,
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
          `\nMensagem do lead:\n${body.message || 'Sem mensagem adicional'}`,
        ].filter(Boolean).join('\n'),
        channel: 'website',
        tags: ['website', 'inovaway.org'],
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

    return NextResponse.json({ success: true, leadId: data.leadId });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
