import { NextRequest, NextResponse } from 'next/server';

const HNBCRM_API_URL = 'https://tacit-chicken-195.convex.site/api/v1/inbound/lead';
const HNBCRM_API_KEY = process.env.HNBCRM_API_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nome e email são obrigatórios.' },
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
        title: `[BRIEFING] Lead Newsletter Classificada: ${name}`,
        contact: {
          firstName: name.split(' ')[0] || name,
          lastName: name.split(' ').slice(1).join(' ') || '',
          email: email,
        },
        message: `Lead capturado via página de Briefing Classificado INOVAWAY.\n\nNome: ${name}\nEmail: ${email}`,
        channel: 'briefing-landing',
        tags: ['newsletter', 'briefing-classificado', 'lead-magnet', 'inovaway'],
        temperature: 'hot',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('HNBCRM error:', data);
      return NextResponse.json(
        { error: data.error || 'Erro ao registrar lead.' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, leadId: data.leadId });
  } catch (error) {
    console.error('Briefing API error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
