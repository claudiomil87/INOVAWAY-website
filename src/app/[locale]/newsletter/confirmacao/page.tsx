'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CheckCircle2, XCircle, AlertCircle, Mail } from 'lucide-react';

export default function NewsletterConfirmPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'success';
  const t = useTranslations('Newsletter.confirmation');

  const configs: Record<string, {
    icon: React.ReactNode;
    title: string;
    message: string;
    color: string;
    bg: string;
  }> = {
    success: {
      icon: <CheckCircle2 className="w-16 h-16" />,
      title: t('successTitle'),
      message: t('successMessage'),
      color: '#00FF41',
      bg: 'rgba(0,255,65,0.08)',
    },
    already_confirmed: {
      icon: <AlertCircle className="w-16 h-16" />,
      title: t('alreadyTitle'),
      message: t('alreadyMessage'),
      color: '#06B6D4',
      bg: 'rgba(6,182,212,0.08)',
    },
    error: {
      icon: <XCircle className="w-16 h-16" />,
      title: t('errorTitle'),
      message: t('errorMessage'),
      color: '#EF4444',
      bg: 'rgba(239,68,68,0.08)',
    },
  };

  const config = configs[status] || configs.error;

  return (
    <main
      className="min-h-screen pt-24 pb-20 flex items-center justify-center"
      style={{ background: '#0F172A' }}
    >
      <div className="mx-auto max-w-lg px-4 text-center">
        {/* Icon */}
        <div
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full"
          style={{ background: config.bg, color: config.color }}
        >
          {config.icon}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          {config.title}
        </h1>

        {/* Message */}
        <p className="text-lg text-white/60 mb-8 leading-relaxed">
          {config.message}
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200"
            style={{
              background: 'rgba(0,255,65,0.1)',
              border: '1px solid rgba(0,255,65,0.3)',
              color: '#00FF41',
            }}
          >
            <Mail className="w-4 h-4" />
            {t('backToBlog')}
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {t('backToHome')}
          </Link>
        </div>
      </div>
    </main>
  );
}
