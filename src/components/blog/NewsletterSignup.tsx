'use client';

import { useState, useRef, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface NewsletterSignupProps {
  locale: string;
  variant?: 'sidebar' | 'inline' | 'hero';
  className?: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterSignup({
  locale,
  variant = 'sidebar',
  className = '',
}: NewsletterSignupProps) {
  const t = useTranslations('Newsletter');
  const [email, setEmail] = useState('');
  const [consentLgpd, setConsentLgpd] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const tsRef = useRef<number>(Date.now());

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !consentLgpd) {
      setErrorMsg(t('form.lgpdError'));
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          consent_lgpd: consentLgpd,
          consent_marketing: consentMarketing,
          locale,
          _ts: tsRef.current,
          website: '', // honeypot
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setEmail('');
        setConsentLgpd(false);
        setConsentMarketing(false);
      } else {
        setErrorMsg(data.error || t('form.genericError'));
        setStatus('error');
      }
    } catch {
      setErrorMsg(t('form.connectionError'));
      setStatus('error');
    }
  }

  // Success state
  if (status === 'success') {
    return (
      <div
        className={`rounded-xl p-6 text-center ${className}`}
        style={{
          background: 'rgba(0,255,65,0.05)',
          border: '1px solid rgba(0,255,65,0.15)',
        }}
      >
        <CheckCircle2
          className="mx-auto mb-3 h-10 w-10"
          style={{ color: '#00FF41' }}
        />
        <h3 className="mb-2 text-lg font-bold text-white">
          {t('form.successTitle')}
        </h3>
        <p className="text-sm text-white/60">{t('form.successMessage')}</p>
      </div>
    );
  }

  const isCompact = variant === 'sidebar';

  return (
    <div
      className={`rounded-xl overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.08))',
        border: '1px solid rgba(139,92,246,0.2)',
      }}
    >
      {/* Header */}
      <div className={`px-5 ${isCompact ? 'pt-5 pb-3' : 'pt-6 pb-4'}`}>
        <div className="flex items-center gap-2 mb-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: 'rgba(139,92,246,0.15)' }}
          >
            <Mail className="h-4 w-4" style={{ color: '#8B5CF6' }} />
          </div>
          <h3
            className={`font-bold text-white ${isCompact ? 'text-base' : 'text-lg'}`}
          >
            {t('title')}
          </h3>
        </div>
        <p className={`text-white/50 ${isCompact ? 'text-xs' : 'text-sm'}`}>
          {t('description')}
        </p>
      </div>

      {/* Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`px-5 ${isCompact ? 'pb-5' : 'pb-6'} space-y-3`}
      >
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
          aria-hidden="true"
        />

        {/* Email */}
        <div>
          <label htmlFor="newsletter-email" className="sr-only">
            {t('form.email')}
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('form.emailPlaceholder')}
            required
            autoComplete="email"
            className="w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 focus:ring-2"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          />
        </div>

        {/* LGPD Consent */}
        <label className="flex items-start gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={consentLgpd}
            onChange={(e) => setConsentLgpd(e.target.checked)}
            required
            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-emerald-500 cursor-pointer"
          />
          <span className="text-xs text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
            {t('form.lgpd')}
          </span>
        </label>

        {/* Marketing Consent */}
        <label className="flex items-start gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={consentMarketing}
            onChange={(e) => setConsentMarketing(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-violet-500 cursor-pointer"
          />
          <span className="text-xs text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
            {t('form.marketing')}
          </span>
        </label>

        {/* Error */}
        {status === 'error' && errorMsg && (
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs"
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.2)',
              color: '#FCA5A5',
            }}
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {errorMsg}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{
            background: '#8B5CF6',
            color: '#fff',
          }}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t('form.submitting')}
            </>
          ) : (
            t('form.submit')
          )}
        </button>
      </form>
    </div>
  );
}
